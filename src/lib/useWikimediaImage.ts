import { useEffect, useState } from "react";

/**
 * Offline-First Wikipedia image fetch pipeline (Forest Offline Mode).
 *
 * Strategy:
 *  - Single consolidated cache object stored in `localStorage` under
 *    `funga_image_cache` as a plain string-keyed JSON map
 *    `{ [scientificName]: url | "" }`. Empty string = known-miss.
 *  - BEFORE any network fetch: consult the cache. On hit -> instant render,
 *    zero network.
 *  - On miss + online: run multi-stage Wikipedia pipeline, write-back the
 *    resolved URL (or empty string) into the cache.
 *  - On miss + offline (or fetch failure): resolve to null cleanly without
 *    throwing — UI renders graceful offline placeholder.
 */

type Lang = "de" | "en";

const CACHE_KEY = "funga_image_cache";
const memCache = new Map<string, string | null>();
const inflight = new Map<string, Promise<string | null>>();

// ---------- Consolidated localStorage cache ----------

let lsObject: Record<string, string> | null = null;
let writeScheduled = false;

function loadCache(): Record<string, string> {
  if (lsObject) return lsObject;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    lsObject = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    if (typeof lsObject !== "object" || lsObject === null) lsObject = {};
  } catch {
    lsObject = {};
  }
  return lsObject;
}

function scheduleFlush() {
  if (writeScheduled) return;
  writeScheduled = true;
  const flush = () => {
    writeScheduled = false;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(lsObject ?? {}));
    } catch {
      /* quota or disabled — ignore silently */
    }
  };
  // Defer to idle/microtask so render isn't blocked
  if (typeof queueMicrotask === "function") queueMicrotask(flush);
  else setTimeout(flush, 0);
}

function cacheGet(key: string): string | null | undefined {
  const obj = loadCache();
  if (!(key in obj)) return undefined;
  const v = obj[key];
  return v === "" ? null : v;
}

function cacheSet(key: string, value: string | null) {
  const obj = loadCache();
  obj[key] = value ?? "";
  scheduleFlush();
}

// ---------- Network ----------

function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  // navigator.onLine === false is reliably offline; true may be optimistic
  return navigator.onLine !== false;
}

async function pageimagesOriginal(lang: Lang, title: string): Promise<string | null> {
  const url =
    `https://${lang}.wikipedia.org/w/api.php` +
    `?action=query&prop=pageimages&piprop=original` +
    `&titles=${encodeURIComponent(title)}` +
    `&redirects=1&format=json&origin=*`;

  try {
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
    const res = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
    if (timer) clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    const pages = json?.query?.pages ?? {};
    for (const k of Object.keys(pages)) {
      const src = pages[k]?.original?.source;
      if (typeof src === "string" && src) return src;
    }
    return null;
  } catch {
    return null;
  }
}

function validateImage(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (/\.svg($|\?)/i.test(url)) return resolve(null);
    try {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.decoding = "async";
      const done = (ok: boolean) => {
        img.onload = null;
        img.onerror = null;
        resolve(ok ? url : null);
      };
      img.onload = () => {
        if (img.naturalWidth < 40 || img.naturalHeight < 40) return done(false);
        done(true);
      };
      img.onerror = () => done(false);
      img.src = url;
    } catch {
      resolve(null);
    }
  });
}

async function runPipeline(nameLat: string, nameDe?: string | null): Promise<string | null> {
  const stages: Array<{ lang: Lang; title: string }> = [{ lang: "de", title: nameLat }];
  if (nameDe && nameDe.trim() && nameDe.trim().toLowerCase() !== nameLat.trim().toLowerCase()) {
    stages.push({ lang: "de", title: nameDe.trim() });
  }
  stages.push({ lang: "en", title: nameLat });

  for (const s of stages) {
    try {
      const url = await pageimagesOriginal(s.lang, s.title);
      if (!url) continue;
      const ok = await validateImage(url);
      if (ok) return ok;
    } catch {
      /* swallow — try next stage */
    }
  }
  return null;
}

async function resolve(nameLat: string, nameDe?: string | null): Promise<string | null> {
  const key = nameLat;
  if (memCache.has(key)) return memCache.get(key)!;

  const cached = cacheGet(key);
  if (cached !== undefined) {
    memCache.set(key, cached);
    return cached;
  }

  // Offline & uncached → don't try to fetch, don't poison cache.
  if (!isOnline()) {
    memCache.set(key, null);
    return null;
  }

  if (inflight.has(key)) return inflight.get(key)!;

  const p = runPipeline(nameLat, nameDe)
    .catch(() => null)
    .then((url) => {
      memCache.set(key, url);
      // Only write-back on success or definitive miss while online; if a
      // transient failure produced null while online, still cache as miss
      // to avoid hammering the API — user can clear cache to retry.
      cacheSet(key, url);
      inflight.delete(key);
      return url;
    });
  inflight.set(key, p);
  return p;
}

export type WikimediaImageState = {
  src: string | null;
  loading: boolean;
  /** True when we have no image AND we're currently offline. */
  offline: boolean;
};

export function useWikimediaImage(
  nameLat: string | null | undefined,
  nameDe?: string | null,
): WikimediaImageState {
  const key = nameLat ? nameLat : null;

  const initial = (): WikimediaImageState => {
    if (!key) return { src: null, loading: false, offline: false };
    if (memCache.has(key)) {
      const v = memCache.get(key) ?? null;
      return { src: v, loading: false, offline: !v && !isOnline() };
    }
    const ls = cacheGet(key);
    if (ls !== undefined) {
      memCache.set(key, ls);
      return { src: ls, loading: false, offline: !ls && !isOnline() };
    }
    if (!isOnline()) return { src: null, loading: false, offline: true };
    return { src: null, loading: true, offline: false };
  };

  const [state, setState] = useState<WikimediaImageState>(initial);

  useEffect(() => {
    if (!nameLat) {
      setState({ src: null, loading: false, offline: false });
      return;
    }
    let active = true;
    const k = nameLat;

    if (memCache.has(k)) {
      const v = memCache.get(k) ?? null;
      setState({ src: v, loading: false, offline: !v && !isOnline() });
      return;
    }
    const ls = cacheGet(k);
    if (ls !== undefined) {
      setState({ src: ls, loading: false, offline: !ls && !isOnline() });
      return;
    }
    if (!isOnline()) {
      setState({ src: null, loading: false, offline: true });
      // Re-attempt when connection comes back
      const onOnline = () => {
        if (!active) return;
        setState({ src: null, loading: true, offline: false });
        resolve(nameLat, nameDe).then((url) => {
          if (!active) return;
          setState({ src: url, loading: false, offline: !url && !isOnline() });
        });
      };
      window.addEventListener("online", onOnline, { once: true });
      return () => {
        active = false;
        window.removeEventListener("online", onOnline);
      };
    }

    setState({ src: null, loading: true, offline: false });
    resolve(nameLat, nameDe).then((url) => {
      if (!active) return;
      setState({ src: url, loading: false, offline: !url && !isOnline() });
    });
    return () => {
      active = false;
    };
  }, [nameLat, nameDe]);

  return state;
}
