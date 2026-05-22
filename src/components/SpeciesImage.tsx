import { useEffect, useMemo, useState } from "react";
import { Sprout, WifiOff } from "lucide-react";
import { useWikimediaImage } from "@/lib/useWikimediaImage";
import { BotanicalPlate } from "@/components/BotanicalIllustrations";
import { TAXONOMY_IDS, type TaxonomyId, type SafetyTone } from "@/lib/taxonomy";


type Variant = "card" | "hero";

function difficultyTone(diff: string): SafetyTone {
  if (diff === "Giftig" || diff === "Tödlich Giftig") return "danger";
  if (diff === "Experte" || diff === "Ungenießbar") return "warn";
  if (diff === "Fortgeschritten") return "info";
  return "safe";
}

/**
 * Normalize any name (Latin or German) into a deterministic snake_case slug
 * suitable for an on-disk asset filename:
 *   "Clavaria zollingeri"            -> "clavaria_zollingeri"
 *   "Amethystfarbene Wiesenkoralle"  -> "amethystfarbene_wiesenkoralle"
 */
function snakeSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")     // strip diacritics
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Build the ordered list of image-source candidates we will try in sequence.
 *
 * Priority (highest → lowest):
 *   1. Explicit imageOverride (DB column or hard-coded asset path)
 *   2. Local asset keyed by **scientific (Latin) name** — definitive key
 *   3. Local asset keyed by German common name — convenience fallback
 *   4. Wikimedia Commons thumbnail (queried via Latin name only)
 *
 * Latin names are globally standardized, so they are always the most reliable
 * identifier for both local assets AND external lookups.
 */
function buildCandidates(opts: {
  imageOverride?: string | null;
  nameLat?: string | null;
  nameDe?: string | null;
  wikiSrc?: string | null;
}): string[] {
  const out: string[] = [];

  const push = (v: string | null | undefined) => {
    if (!v) return;
    const t = v.trim();
    if (!t) return;
    let resolved: string;
    if (/^(https?:|data:|blob:)/i.test(t)) resolved = t;
    else if (t.startsWith("/")) resolved = t;
    else resolved = `/${t}`;
    if (!out.includes(resolved)) out.push(resolved);
  };

  push(opts.imageOverride);

  const latSlug = opts.nameLat ? snakeSlug(opts.nameLat) : "";
  if (latSlug) {
    push(`/assets/${latSlug}.png`);
    push(`/assets/${latSlug}.jpg`);
    push(`/${latSlug}.png`);
  }

  const deSlug = opts.nameDe ? snakeSlug(opts.nameDe) : "";
  if (deSlug && deSlug !== latSlug) {
    push(`/assets/${deSlug}.png`);
    push(`/${deSlug}.png`);
  }

  push(opts.wikiSrc);

  return out;
}

export function SpeciesImage({
  nameLat,
  nameDe,
  type,
  difficulty = "",
  variant = "card",
  className = "",
  imageOverride,
}: {
  /** Scientific (Latin) name — definitive key for asset + Wikipedia lookup. */
  nameLat?: string | null;
  /** German common name — secondary, used only as a local-asset fallback. */
  nameDe?: string | null;
  type?: string | null;
  difficulty?: string | null;
  variant?: Variant;
  className?: string;
  imageOverride?: string | null;
}) {
  const safeLat = (nameLat ?? "").trim();
  const safeDe = (nameDe ?? "").trim();
  const safeType = (type ?? "").trim();

  // CRITICAL: pass scientific (Latin) name — never the German title — to
  // Wikimedia. Latin names are globally standardized and guarantee accurate
  // matches; German common names are ambiguous and often fail.
  const { src: wikiSrc, loading, offline } = useWikimediaImage(safeLat || null, safeDe || null);

  const candidates = useMemo(
    () => buildCandidates({ imageOverride, nameLat: safeLat, nameDe: safeDe, wikiSrc }),
    [imageOverride, safeLat, safeDe, wikiSrc],
  );

  const [idx, setIdx] = useState(0);
  // Reset cursor whenever the candidate list itself changes (e.g. wiki resolves)
  useEffect(() => { setIdx(0); }, [candidates.join("|")]);

  const taxId: TaxonomyId = (TAXONOMY_IDS as readonly string[]).includes(safeType)
    ? (safeType as TaxonomyId)
    : "Lamellenpilze";
  const tone = difficultyTone(difficulty ?? "");

  const finalSrc = candidates[idx] ?? null;
  const exhausted = idx >= candidates.length;
  const showImage = !!finalSrc && !exhausted;

  const base =
    variant === "hero"
      ? "relative h-56 w-full overflow-hidden rounded-2xl border border-[#9A7B56] bg-gradient-to-br from-[#1F3327] to-[#132219]"
      : "relative h-32 w-full overflow-hidden rounded-2xl border border-[#9A7B56] bg-gradient-to-br from-[#1F3327] to-[#132219]";

  return (
    <div className={`${base} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <BotanicalPlate id={taxId} tone={tone} className="h-full w-full" />
      </div>

      {loading && !showImage && <div className="shimmer-sweep absolute inset-0" aria-hidden />}

      {showImage && (
        <img
          key={finalSrc}
          src={finalSrc}
          alt={safeLat || safeDe || "Pilz"}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setIdx((i) => i + 1)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out animate-[fade-in_.6s_ease-out]"
        />
      )}

      {!loading && !showImage && offline && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center bg-[#1F3327] border-2 border-[#9A7B56] rounded-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D97D3E]/70 bg-[#132219]">
            <WifiOff className="h-5 w-5 text-[#D97D3E]" />
          </div>
          <p className="max-w-[90%] text-[11px] font-bold leading-snug text-[#EADECC]">
            Offline-Modus: Bild wird geladen, sobald wieder Netzempfang vorhanden ist.
          </p>
        </div>
      )}

      {!loading && !showImage && !offline && (() => {

        const ring =
          tone === "danger"
            ? "border-red-500/50 text-red-300 shadow-[0_0_40px_-5px_rgba(239,68,68,0.55)] animate-pulse"
            : tone === "warn"
              ? "border-amber-400/50 text-amber-200 shadow-[0_0_40px_-5px_rgba(251,191,36,0.5)]"
              : tone === "info"
                ? "border-sky-400/50 text-sky-200 shadow-[0_0_40px_-5px_rgba(56,189,248,0.5)]"
                : "border-emerald-400/50 text-emerald-200 shadow-[0_0_40px_-5px_rgba(52,211,153,0.55)] animate-pulse";
        const glow =
          tone === "danger"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.18),transparent_65%)]"
            : tone === "warn"
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.16),transparent_65%)]"
              : tone === "info"
                ? "bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.16),transparent_65%)]"
                : "bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.18),transparent_65%)]";
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
            <div className={`pointer-events-none absolute inset-0 ${glow}`} />
            <div className={`relative flex h-12 w-12 items-center justify-center rounded-full border bg-background/40 backdrop-blur-sm ${ring}`}>
              <Sprout className="h-5 w-5" />
            </div>
            <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Botanische Illustration<br />wird geladen…
            </p>
          </div>
        );
      })()}

      {/* overlays removed — they were dimming the actual photo / illustration */}

    </div>
  );
}
