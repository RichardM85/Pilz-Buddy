import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearch, useRouter } from "@tanstack/react-router";
import {
  Library, Search, Sparkles, MapPin, Calendar, AlertTriangle,
  Info, Network, Microscope, BookMarked, Recycle, Handshake,
  ExternalLink, ArrowLeft, Skull, ShieldAlert, ShieldCheck, Gauge, X,
} from "lucide-react";


function oekoIcon(o: string) {
  if (!o) return Network;
  // Mischformen: Parasit-Anteil dominiert (Skull); reine Saprobionten = Recycle.
  if (/parasit/i.test(o)) return Skull;
  if (/saprobiont/i.test(o)) return Recycle;
  if (/symbiont|mykorrhiza/i.test(o)) return Handshake;
  return Network;
}

// Normalisiert Difficulty-Strings (Umlaute, Klammerzusätze, Tippfehler).
function normalizeDifficulty(raw: string): string {
  const s = (raw || "").toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  if (s.includes("toedlich")) return "Tödlich Giftig";
  if (s.includes("giftig")) return "Giftig"; // inkl. "Giftig (Psychoaktiv)", "Experte (giftig!)"
  if (s.includes("idiotensicher") || s === "essbar" || s.includes("sehr einfach")) return "Idiotensicher";
  if (s.includes("anfaenger") || s.includes("einfach")) return "Anfänger";
  if (s.includes("fortgeschritten")) return "Fortgeschritten";
  if (s.includes("experte")) return "Experte";
  if (s.includes("ungenie") || s.includes("ungenue") || s.includes("unessbar")) return "Ungenießbar";
  return raw;
}
import { TAXONOMY_IDS } from "@/lib/taxonomy";
import { SafetyFooter } from "@/components/SafetyFooter";
import { SpeciesImage } from "@/components/SpeciesImage";
import { WikipediaImage } from "@/components/WikipediaImage";
import { useMushrooms, useMushroom, type Mushroom } from "@/lib/useMushrooms";
import { toCanonicalMushroom } from "@/data/mushroomCanonical";
import { BasketActions } from "@/components/BasketActions";

const SCROLL_KEY = "fk:lexikon:scroll";



const typeFilters = ["Alle", ...TAXONOMY_IDS] as const;
const difficultyFilters = [
  "Alle", "Idiotensicher", "Anfänger", "Fortgeschritten",
  "Experte", "Giftig", "Tödlich Giftig",
] as const;

function difficultyStyle(d: string) {
  const k = normalizeDifficulty(d);
  if (k === "Idiotensicher")
    return { cls: "bg-emerald-50 border-2 border-emerald-700 text-emerald-950 font-black", Icon: ShieldCheck, label: d };
  if (k === "Anfänger" || k === "Fortgeschritten")
    return { cls: "bg-green-50 border-2 border-green-600 text-green-950 font-bold", Icon: Sparkles, label: d };
  if (k === "Experte" || k === "Ungenießbar")
    return { cls: "bg-stone-100 border-2 border-stone-600 text-stone-900 font-medium", Icon: Info, label: d };
  if (k === "Tödlich Giftig")
    return { cls: "bg-red-50 border-2 border-red-700 text-red-950 font-black animate-pulse", Icon: Skull, label: d };
  if (k === "Giftig")
    return { cls: "bg-orange-50 border-2 border-orange-600 text-orange-950 font-extrabold", Icon: AlertTriangle, label: d };
  return { cls: "bg-stone-100 border-2 border-stone-600 text-stone-900 font-medium", Icon: AlertTriangle, label: d || "Aufpassen" };
}
function oekoStyle(o: string) {
  if (/parasit/i.test(o) && /saprobiont/i.test(o))
    return "bg-orange-50 border-2 border-orange-700 text-orange-950 font-bold";
  if (/parasit/i.test(o))
    return "bg-red-50 border-2 border-red-700 text-red-950 font-bold";
  if (/saprobiont/i.test(o))
    return "bg-stone-100 border-2 border-stone-600 text-stone-900 font-bold";
  if (/symbiont|mykorrhiza/i.test(o))
    return "bg-emerald-50 border-2 border-emerald-700 text-emerald-950 font-bold";
  return "bg-[#1F3327] border-2 border-[#9A7B56] text-[#EADECC] font-bold";
}

// ─── Ökologische Häufigkeits-Skala (DGfM/BfR) ──────────────────────────────
const HAEUFIGKEITS_STUFEN = [
  { n: 1, label: "Massenpilz", tone: "emerald", examples: "Champignon · Pfifferling · Steinpilz", text: "Sehr häufig in geeigneten Jahren & Habitaten. Rückgrat der Sammelpraxis (~60 Arten in DE-Leitsätzen)." },
  { n: 2, label: "Häufig", tone: "amber", examples: "Täublinge · Milchlinge · Grüner Knollenblätterpilz", text: "Regelmäßig in vielen Regionen. Achtung: auch der tödliche Knollenblätterpilz lebt hier (Jul–Okt, Laubwald & Park)." },
  { n: 3, label: "Mäßig häufig", tone: "amber", examples: "Satansröhrling (kalkhaltige Buchenwälder)", text: "Standort- und baumartgebunden. Lokal gut auffindbar, wirkt für Sammler oft 'selten'." },
  { n: 4, label: "Selten", tone: "orange", examples: "Rote-Liste-Arten · Satansröhrling in DE stark gefährdet", text: "Punktuelle Funde, kleine Populationen. Habitatverlust ist Hauptursache." },
  { n: 5, label: "Sehr selten", tone: "rose", examples: "Spezialisten enger Mikrohabitate", text: "Wenige Fundorte, hoher Naturschutzwert. Bestimmung > Sammeln." },
  { n: 6, label: "Extrem selten / verschollen", tone: "rose", examples: "Historische Nachweise · Kalkbuchenwald-Spezialisten", text: "Für Sammelpraxis irrelevant – wichtig für Monitoring & Biodiversitätsforschung." },
] as const;

function toneClasses(tone: string) {
  switch (tone) {
    case "emerald": return "border-emerald-700 bg-emerald-950/40 text-emerald-200";
    case "amber":   return "border-amber-700 bg-amber-950/40 text-amber-200";
    case "orange":  return "border-orange-700 bg-orange-950/40 text-orange-200";
    case "rose":    return "border-rose-800 bg-rose-950/40 text-rose-200";
    default:        return "border-[#9A7B56] bg-[#1F3327] text-[#EADECC]";
  }
}

function HaeufigkeitsSkala() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border-2 border-border bg-card shadow-[var(--shadow-soft)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left min-h-[48px]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent">
            DGfM · BfR
          </span>
          <span className="font-display text-base font-bold text-foreground md:text-lg">
            Ökologische Häufigkeits-Skala
          </span>
        </div>
        <span className="text-xs font-bold text-muted-foreground">{open ? "Schließen" : "6 Stufen ansehen"}</span>
      </button>
      {open && (
        <div className="space-y-3 border-t-2 border-border px-5 py-5">
          <p className="text-sm text-muted-foreground">
            Wie oft begegnen Sammler:innen Großpilzen wirklich? Diese 6-stufige Skala ergänzt die Taxonomie um die ökologische Realität.
            <strong className="ml-1 text-foreground">Wichtig:</strong> Häufigkeit ≠ Giftigkeit – der Knollenblätterpilz ist häufig, der Satansröhrling giftig aber nicht tödlich.
          </p>
          <ol className="space-y-2">
            {HAEUFIGKEITS_STUFEN.map((s) => (
              <li
                key={s.n}
                className={`rounded-2xl border-2 p-4 ${toneClasses(s.tone)}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-black tabular-nums">{s.n}</span>
                  <span className="text-sm font-black uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{s.text}</p>
                <p className="mt-1 text-xs italic opacity-90">Beispiele: {s.examples}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border-2 border-red-800 bg-red-950/40 p-4 text-xs font-semibold text-red-200">
            <strong className="font-black uppercase tracking-wider">Toxikologie:</strong> Knollenblätterpilze sind in DE für ≥80 % der tödlichen Pilzvergiftungen verantwortlich (BfR).
            Gifthäubling & Rauköpfe sind ebenfalls tödlich, aber selten in der Klinik. Quellen: DGfM, BfR, Rote Liste.
          </div>
        </div>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-border bg-card p-6">
      <div className="shimmer h-5 w-3/4 rounded" />
      <div className="shimmer mt-2 h-3 w-1/2 rounded" />
      <div className="mt-5 flex gap-2">
        <div className="shimmer h-6 w-20 rounded-full" />
        <div className="shimmer h-6 w-24 rounded-full" />
      </div>
      <div className="shimmer mt-6 h-3 w-full rounded" />
      <div className="shimmer mt-2 h-3 w-4/5 rounded" />
    </div>
  );
}

export function MushroomLinkCard({ m }: { m: Mushroom }) {
  const d = difficultyStyle(m.difficulty);
  const DIcon = d.Icon;
  return (
    <Link
      to="/lexicon/$id"
      params={{ id: m.id }}
      className="tactile group block min-h-[56px] text-left rounded-3xl border-2 border-border bg-card px-5 py-5 hover:border-accent hover:shadow-[var(--shadow-glow)]"
    >
      <SpeciesImage nameLat={m.name_lat} nameDe={m.name_de} type={m.type} difficulty={m.difficulty} variant="card" className="mb-4" />
      <span className="mb-2 inline-flex rounded-full border-2 border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
        {m.type}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-foreground">{m.name_de}</h3>
        <p className="truncate text-xs italic text-muted-foreground">{m.name_lat}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`inline-flex min-h-[28px] items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-[13px] font-bold ${d.cls}`}>
          <DIcon className="h-3.5 w-3.5" /> {d.label}
        </span>
        {(() => { const OIcon = oekoIcon(m.oekologie); return (
        <span className={`inline-flex min-h-[28px] items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-[13px] font-bold ${oekoStyle(m.oekologie)}`}>
          <OIcon className="h-3.5 w-3.5" /> {m.oekologie}
        </span>
        ); })()}
      </div>
      <p className="mt-4 line-clamp-2 text-sm font-medium leading-relaxed text-foreground/85">
        <Calendar className="mr-1 inline h-3.5 w-3.5 text-accent" />
        {m.season}
      </p>
      <p className="mt-1 line-clamp-1 text-xs font-semibold text-muted-foreground">
        <MapPin className="mr-1 inline h-3 w-3" />
        {m.habitat}
      </p>
    </Link>
  );
}


function FilterRow<T extends string>({
  label, items, value, onChange,
}: { label: string; items: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {items.map((i) => {
        const active = i === value;
        return (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`tactile min-h-[40px] rounded-full border-2 px-4 py-2 text-[13px] font-bold transition-colors duration-200 ${
              active
                ? "border-accent bg-accent text-accent-foreground shadow-[var(--shadow-glow)]"
                : "border-border bg-card text-foreground hover:border-accent hover:text-foreground"
            }`}
          >
            {i}
          </button>

        );
      })}
    </div>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D97D3E]" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pilz suchen (z. B. Steinpilz, Boletus, Morchel, Rotkappe...)"
        className="h-14 w-full rounded-2xl border-2 border-[#D97D3E] bg-[#1F3327] py-3 pl-11 pr-12 text-base font-semibold text-[#EADECC] placeholder:text-[#BCA385] outline-none transition focus:border-[#E9A15A]"
        inputMode="search"
        autoCorrect="off"
        autoCapitalize="off"
      />
      {value.length > 0 && (
        <button
          type="button"
          aria-label="Suche löschen"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onChange("");
            // Refocus immediately so the user can keep typing
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-[#D97D3E] text-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}


function matchesTypeFilter(m: Mushroom, f: string) {
  if (f === "Alle") return true;
  return (m?.type ?? "").trim().toLowerCase() === f.trim().toLowerCase();
}

/**
 * Incremental DOM hydration: render 24 cards initially, then auto-load the
 * next page when a sentinel scrolls into view. Keeps mobile DOM nodes low
 * (~24-72 vs 300+) — protects CPU + battery without breaking the responsive
 * CSS grid. Resets to page 1 whenever the filtered set changes.
 */
const PAGE = 24;
function PagedGrid({ mushrooms, isLoading }: { mushrooms: Mushroom[]; isLoading: boolean }) {
  const [shown, setShown] = useState(PAGE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { setShown(PAGE); }, [mushrooms]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || shown >= mushrooms.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown((s) => Math.min(s + PAGE, mushrooms.length));
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, mushrooms.length]);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (mushrooms.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-border bg-secondary p-10 text-center text-sm font-bold text-foreground/85">
        🔎 Kein Pilz gefunden. Probier einen anderen Suchbegriff!
      </div>
    );
  }

  const visible = mushrooms.slice(0, shown);
  const remaining = mushrooms.length - shown;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((m) => <MushroomLinkCard key={m.id} m={m} />)}
      </div>
      {remaining > 0 && (
        <div ref={sentinelRef} className="flex flex-col items-center gap-2 py-6">
          <button
            onClick={() => setShown((s) => Math.min(s + PAGE, mushrooms.length))}
            className="tactile min-h-[48px] rounded-full border-2 border-accent/50 bg-accent/15 px-6 py-3 text-sm font-bold text-foreground hover:border-accent hover:bg-accent/25"
          >
            Noch {remaining} Pilze laden
          </button>
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
            {shown} / {mushrooms.length} sichtbar
          </span>
        </div>
      )}
    </>
  );
}


export function LexikonRouteView() {
  const { data: mushrooms = [], isLoading, error } = useMushrooms();
  const search = useSearch({ from: "/lexicon" }) as {
    cat?: string; diff?: string; q?: string;
  };
  const navigate = useNavigate({ from: "/lexicon" });

  // Scroll-state preservation: restore on mount, persist on scroll.
  // Combined with TanStack Router's URL-driven filters, returning from a
  // detail page lands the user in the exact same place they left.
  useEffect(() => {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    const y = raw ? Number(raw) : 0;
    if (y > 0) {
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" }));
    }
    let tick = 0;
    const onScroll = () => {
      cancelAnimationFrame(tick);
      tick = requestAnimationFrame(() => {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(tick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const typeF = (typeFilters as readonly string[]).includes(search.cat ?? "")
    ? (search.cat as (typeof typeFilters)[number])
    : "Alle";
  const diffF = (difficultyFilters as readonly string[]).includes(search.diff ?? "")
    ? (search.diff as (typeof difficultyFilters)[number])
    : "Alle";
  const query = search.q ?? "";

  const setParam = (key: "cat" | "diff" | "q", value: string, defaultValue: string) => {
    navigate({
      search: (prev: Record<string, string | undefined>) => {
        const next = { ...prev };
        if (value === defaultValue || value === "") delete next[key];
        else next[key] = value;
        return next as never;
      },
      replace: false,
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mushrooms.filter((m) => {
      if (!matchesTypeFilter(m, typeF)) return false;
      if (diffF !== "Alle" && m.difficulty !== diffF) return false;
      if (q === "") return true;
      const syn = Array.isArray(m.synonyms) ? m.synonyms.join(" ") : "";
      return (
        m.name_de.toLowerCase().includes(q) ||
        m.name_lat.toLowerCase().includes(q) ||
        syn.toLowerCase().includes(q)
      );
    });
  }, [mushrooms, query, typeF, diffF]);

  return (
    <section className="space-y-6 pb-10">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <Library className="h-3.5 w-3.5" /> Lexikon ·{" "}
          <span suppressHydrationWarning>{mushrooms.length || "300+"}</span> Arten
        </div>
        <h1 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Das Pilz-Lexikon</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Filter, Suche und Deep-Links – jeder Status bleibt in der URL.
        </p>
      </header>

      <div className="space-y-3 rounded-3xl border-2 border-border bg-card p-4 shadow-[var(--shadow-soft)]">
        <SearchInput
          value={query}
          onChange={(v) => setParam("q", v, "")}
        />

        <FilterRow
          label="Gruppe"
          items={typeFilters}
          value={typeF}
          onChange={(v) => setParam("cat", v, "Alle")}
        />
        <FilterRow
          label="Schwierigkeit"
          items={difficultyFilters}
          value={diffF}
          onChange={(v) => setParam("diff", v, "Alle")}
        />
      </div>

      <HaeufigkeitsSkala />


      {error && (
        <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/15 p-4 text-sm font-bold text-destructive">
          Offline oder keine Antwort: {(error as Error).message}
        </div>
      )}

      <PagedGrid mushrooms={filtered} isLoading={isLoading} />


      <SafetyFooter />
    </section>
  );
}

// ─── Detail Page ────────────────────────────────────────────────────────────

const EDIBILITY_BANNER: Record<
  string,
  { cls: string; label: string; Icon: typeof ShieldCheck }
> = {
  choice_edible: {
    cls: "bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 font-black py-3 px-4 rounded-xl text-center text-base",
    label: "Speisepilz · Essbar",
    Icon: ShieldCheck,
  },
  edible: {
    cls: "bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 font-black py-3 px-4 rounded-xl text-center text-base",
    label: "Essbar",
    Icon: ShieldCheck,
  },
  inedible: {
    cls: "bg-[#1F3327] border-2 border-[#9A7B56] text-[#EADECC] font-bold py-3 px-4 rounded-xl text-center text-base",
    label: "Ungenießbar",
    Icon: Info,
  },
  poisonous: {
    cls: "bg-red-950/80 border-2 border-red-500 text-red-200 font-black py-3 px-4 rounded-xl text-center text-base uppercase tracking-wider",
    label: "Giftig — Nicht verzehren",
    Icon: ShieldAlert,
  },
  deadly: {
    cls: "bg-red-950/80 border-2 border-red-500 text-red-200 font-black py-3 px-4 rounded-xl text-center text-base uppercase tracking-wider animate-pulse",
    label: "Tödlich giftig",
    Icon: Skull,
  },
};

const TRAIT_LABELS: Record<string, string> = {
  capSurface: "Hut-Oberfläche",
  hymeniumType: "Hymenium",
  sporePrintColor: "Sporenfarbe",
};
const TRAIT_VALUES: Record<string, string> = {
  slimy: "schleimig",
  dry: "trocken",
  velvety: "samtig",
  scaly: "schuppig",
  gills: "Lamellen",
  tubes: "Röhren",
  ridges: "Leisten",
  spines: "Stacheln",
};

function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Calendar;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1F3327] border-2 border-[#9A7B56] rounded-xl p-4 space-y-3">
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#BCA385]">
        <Icon className="h-3.5 w-3.5 text-[#D97D3E]" /> {title}
      </h3>
      <div className="text-sm font-medium leading-relaxed text-[#EADECC]">
        {children}
      </div>
    </div>
  );
}

export function MushroomDetailPage({ id }: { id: string }) {
  const { data: m, isLoading, error } = useMushroom(id);
  const router = useRouter();

  // Scroll detail view to top on entry (the list's scroll is preserved
  // separately in sessionStorage and restored when the user navigates back).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const goBack = () => {
    // Prefer real browser back (restores TanStack URL state + scroll), with
    // a hard fallback to /lexicon when there is no history entry.
    if (window.history.length > 1) router.history.back();
    else router.navigate({ to: "/lexicon" });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-10">
        <div className="shimmer h-12 w-40 rounded-xl" />
        <div className="shimmer aspect-[4/3] w-full rounded-2xl" />
        <div className="shimmer h-8 w-2/3 rounded" />
        <div className="shimmer h-4 w-1/3 rounded" />
        <div className="shimmer h-16 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !m) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <button
          onClick={goBack}
          className="tactile mb-6 inline-flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-5 py-3 text-base font-bold text-[#EADECC] hover:border-[#D97D3E]"
        >
          <ArrowLeft className="h-5 w-5" /> Zurück zum Atlas
        </button>
        <h1 className="text-3xl font-bold text-[#EADECC]">Pilz nicht gefunden</h1>
        <p className="mt-2 text-sm font-semibold text-[#BCA385]">
          Dieser Eintrag ist im Myzel verschwunden.
        </p>
      </div>
    );
  }

  const canonical = toCanonicalMushroom(m);
  const banner = EDIBILITY_BANNER[canonical.edibility] ?? EDIBILITY_BANNER.edible;
  const BIcon = banner.Icon;
  const traits = canonical.traits ?? {};
  const traitEntries = Object.entries(traits).filter(([, v]) => Boolean(v));
  const merkmale = Array.isArray(m.merkmale) ? m.merkmale : [];

  return (
    <article className="mx-auto max-w-3xl pb-10 bg-[#132219]">
      {/* 1 ─ Back to Atlas */}
      <button
        onClick={goBack}
        aria-label="Zurück zum Atlas"
        className="tactile sticky top-2 z-20 mb-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#1F3327] bg-[#1F3327] px-5 py-3 text-base font-black text-[#EADECC] shadow-sm hover:border-[#D97D3E] hover:bg-[#132219] sm:w-auto"
      >
        <ArrowLeft className="h-6 w-6" />
        <span>Zurück zum Atlas</span>
      </button>

      {/* 2 ─ Hero image */}
      <WikipediaImage
        scientificName={m.name_lat}
        alt={`${m.name_de} (${m.name_lat})`}
      />

      {/* 2b ─ Primary taxonomy */}
      <header className="mt-5 space-y-1">
        {m.type && (
          <span className="inline-block rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#BCA385]">
            {m.type}
          </span>
        )}
        <h1 className="text-2xl font-serif font-bold leading-tight text-[#EADECC] sm:text-3xl">
          {m.name_de}
        </h1>
        <p className="text-sm font-mono italic text-[#BCA385]">{m.name_lat}</p>
      </header>

      {/* 3 ─ Edibility banner */}
      <div
        role="status"
        aria-live="polite"
        className={`mt-4 flex items-center justify-center gap-2 ${banner.cls}`}
      >
        <BIcon className="h-5 w-5" />
        <span>{banner.label}</span>
      </div>

      {/* 3b ─ Basket + GPS actions */}
      <div className="mt-4">
        <BasketActions mushroom={{ id: m.id, name_de: m.name_de, name_lat: m.name_lat, type: m.type, difficulty: m.difficulty }} />
      </div>

      {/* 4 ─ Information grid */}
      <div className="mt-6 space-y-4">
        {/* Synonyms */}
        {canonical.synonyms.length > 0 && (
          <InfoCard title="Synonyme" icon={BookMarked}>
            <div className="flex flex-wrap gap-1.5">
              {canonical.synonyms.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="bg-[#132219] border border-[#9A7B56] text-xs font-semibold px-2 py-1 rounded text-[#EADECC]"
                >
                  {s}
                </span>
              ))}
            </div>
          </InfoCard>
        )}

        {/* Look-alikes warning */}
        {canonical.lookAlikes.length > 0 && (
          <div className="border-l-4 border-orange-600 bg-orange-50/50 p-3 rounded-r-xl">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-orange-900">
              <AlertTriangle className="h-4 w-4" /> Verwechslungsgefahr
            </h3>
            <ul className="mt-2 space-y-1.5">
              {canonical.lookAlikes.map((la, i) => (
                <li
                  key={`${la}-${i}`}
                  className="flex gap-2 text-sm font-bold text-orange-950"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
                  <span>{la}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Anatomical traits */}
        {traitEntries.length > 0 && (
          <InfoCard title="Anatomische Merkmale" icon={Microscope}>
            <dl
              data-openai-traits="true"
              data-mushroom-id={canonical.id}
              className="grid grid-cols-2 gap-x-3 gap-y-2"
            >
              {traitEntries.map(([key, value]) => (
                <div
                  key={key}
                  data-trait-key={key}
                  data-trait-value={String(value)}
                  className="rounded-lg border border-[#9A7B56] bg-[#132219] p-2"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-[#BCA385]">
                    {TRAIT_LABELS[key] ?? key}
                  </dt>
                  <dd className="mt-0.5 text-sm font-bold text-[#EADECC]">
                    {TRAIT_VALUES[String(value)] ?? String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </InfoCard>
        )}

        {/* Habitat / Season */}
        <div className="grid gap-4 sm:grid-cols-2">
          {m.season && (
            <InfoCard title="Saison" icon={Calendar}>
              {m.season}
            </InfoCard>
          )}
          {m.habitat && (
            <InfoCard title="Lebensraum" icon={MapPin}>
              {m.habitat}
            </InfoCard>
          )}
        </div>

        {/* Ecology */}
        {m.oekologie && (
          <InfoCard title="Ökologie" icon={oekoIcon(m.oekologie)}>
            {m.oekologie}
          </InfoCard>
        )}

        {/* Häufigkeit */}
        {m.haeufigkeit && m.haeufigkeit !== "Unbekannt" && (
          <InfoCard title="Häufigkeit in Europa" icon={Gauge}>
            {m.haeufigkeit}
          </InfoCard>
        )}

        {/* Merkmale */}
        {merkmale.length > 0 && (
          <InfoCard title="Merkmale" icon={Sparkles}>
            <ul className="space-y-2">
              {merkmale.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D97D3E]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </InfoCard>
        )}

        {/* Verwechslung free text (kept if no parsed lookalikes) */}
        {m.verwechslung && canonical.lookAlikes.length === 0 && (
          <div className="border-l-4 border-orange-600 bg-orange-50/50 p-3 rounded-r-xl">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-orange-900">
              <AlertTriangle className="h-4 w-4" /> Verwechslungsgefahr
            </h3>
            <p className="mt-2 text-sm font-bold leading-relaxed text-orange-950">
              {m.verwechslung}
            </p>
          </div>
        )}

        {/* Mikroskopie */}
        {m.mikroskopie && (
          <InfoCard title="Mikroskopie & Bestimmung" icon={Microscope}>
            {m.mikroskopie}
          </InfoCard>
        )}

        {/* Fun fact */}
        {m.fun_fact && (
          <div className="bg-[#1F3327] border-2 border-[#9A7B56] rounded-xl p-4">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BCA385]">
              <Info className="h-3.5 w-3.5 text-[#D97D3E]" /> Fun-gi Fact
            </h3>
            <p className="mt-2 text-sm font-semibold italic text-[#EADECC]">
              „{m.fun_fact}"
            </p>
          </div>
        )}

        {/* Sources */}
        <div className="space-y-2 rounded-xl border-2 border-[#9A7B56] bg-[#1F3327] p-4 text-xs text-[#BCA385]">
          {m.quellen && (
            <div className="flex items-start gap-2">
              <BookMarked className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97D3E]" />
              <span>
                <strong className="text-[#EADECC]">Quellen:</strong> {m.quellen}
              </span>
            </div>
          )}
          <div className="border-t border-[#9A7B56] pt-2">
            <p className="font-bold text-[#EADECC]">Für tiefere Studien & Verzehrfreigaben:</p>
            <ul className="mt-1.5 space-y-1">
              <li><a href="https://www.pilzfinder.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-[#D97D3E] hover:underline">Pilzfinder.de <ExternalLink className="h-2.5 w-2.5" /></a></li>
              <li><a href="https://www.123pilze.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-[#D97D3E] hover:underline">123Pilze.de <ExternalLink className="h-2.5 w-2.5" /></a></li>
              <li><a href="https://www.dgfm-ev.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-[#D97D3E] hover:underline">DGfM <ExternalLink className="h-2.5 w-2.5" /></a></li>
            </ul>
          </div>
        </div>
      </div>

      <SafetyFooter />
    </article>
  );
}
