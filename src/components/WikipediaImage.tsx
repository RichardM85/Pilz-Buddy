import { useEffect, useState } from "react";
import { Leaf, WifiOff } from "lucide-react";

/**
 * Offline-first Wikipedia image fetcher (REST summary endpoint).
 *
 * Reads/writes the shared `funga_image_cache` localStorage object keyed by
 * the scientific (Latin) name. Bypasses the network entirely on cache hit.
 * On miss + offline, renders a graceful dark-themed offline placeholder.
 */

const CACHE_KEY = "funga_image_cache";

type State = { url: string | null; loading: boolean; failed: boolean; offline: boolean };

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
      /* ignore quota */
    }
  };
  if (typeof queueMicrotask === "function") queueMicrotask(flush);
  else setTimeout(flush, 0);
}
function readCache(key: string): string | null | undefined {
  const obj = loadCache();
  if (!(key in obj)) return undefined;
  return obj[key] === "" ? null : obj[key];
}
function writeCache(key: string, value: string | null) {
  const obj = loadCache();
  obj[key] = value ?? "";
  scheduleFlush();
}

function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine !== false;
}

async function fetchWikiImage(scientificName: string): Promise<string | null> {
  const slug = encodeURIComponent(scientificName.replace(/\s+/g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`;
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      signal: ctrl?.signal,
    });
    if (timer) clearTimeout(timer);
    if (!res.ok) return null;
    const json = (await res.json()) as {
      originalimage?: { source?: string };
      thumbnail?: { source?: string };
    };
    return json.originalimage?.source ?? json.thumbnail?.source ?? null;
  } catch {
    if (timer) clearTimeout(timer);
    return null;
  }
}

export function WikipediaImage({
  scientificName,
  alt,
  className = "",
}: {
  scientificName: string;
  alt: string;
  className?: string;
}) {
  const [state, setState] = useState<State>(() => {
    const cached = readCache(scientificName);
    if (cached !== undefined) {
      return { url: cached, loading: false, failed: cached === null, offline: false };
    }
    if (!isOnline()) return { url: null, loading: false, failed: true, offline: true };
    return { url: null, loading: true, failed: false, offline: false };
  });

  useEffect(() => {
    let active = true;
    const cached = readCache(scientificName);
    if (cached !== undefined) {
      setState({ url: cached, loading: false, failed: cached === null, offline: false });
      return;
    }
    if (!isOnline()) {
      setState({ url: null, loading: false, failed: true, offline: true });
      return;
    }
    setState({ url: null, loading: true, failed: false, offline: false });
    fetchWikiImage(scientificName)
      .then((url) => {
        if (!active) return;
        writeCache(scientificName, url);
        setState({ url, loading: false, failed: url === null, offline: false });
      })
      .catch(() => {
        if (!active) return;
        setState({ url: null, loading: false, failed: true, offline: !isOnline() });
      });
    return () => {
      active = false;
    };
  }, [scientificName]);

  return (
    <div
      className={`w-full aspect-[4/3] bg-[#1F3327] border-2 border-[#9A7B56] rounded-2xl overflow-hidden shadow-sm relative ${className}`}
    >
      {state.url && !state.failed ? (
        <img
          src={state.url}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => {
            writeCache(scientificName, null);
            setState({ url: null, loading: false, failed: true, offline: !isOnline() });
          }}
        />
      ) : state.offline ? (
        <OfflinePlaceholder />
      ) : (
        <Placeholder loading={state.loading} />
      )}
    </div>
  );
}

function Placeholder({ loading }: { loading: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1F3327] to-[#132219] px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D97D3E]/60 bg-[#1F3327]">
        <Leaf className="h-8 w-8 text-[#D97D3E]" />
      </div>
      <p className="max-w-xs text-sm font-bold leading-snug text-[#EADECC]">
        {loading
          ? "Botanische Illustration wird geladen…"
          : "Botanische Illustration wird geladen / Offline-Modus"}
      </p>
    </div>
  );
}

function OfflinePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#1F3327] border-2 border-[#9A7B56] rounded-2xl px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D97D3E]/70 bg-[#132219]">
        <WifiOff className="h-8 w-8 text-[#D97D3E]" />
      </div>
      <p className="max-w-xs text-sm font-bold leading-snug text-[#EADECC]">
        Offline-Modus: Bild wird geladen, sobald wieder Netzempfang vorhanden ist.
      </p>
    </div>
  );
}
