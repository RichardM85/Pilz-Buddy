import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sparkles, TreePine, Shapes, BookOpen, GraduationCap, Home, CloudRain, ScanSearch, ShieldAlert, Compass, ChevronLeft, ChevronRight } from "lucide-react";
import { Mysterium } from "@/components/modules/Mysterium";
import { Lebensstile } from "@/components/modules/Lebensstile";
import { Formen } from "@/components/modules/Formen";
import { Guide } from "@/components/modules/Guide";
import { Quiz } from "@/components/modules/Quiz";
import { ForagingWidget } from "@/components/modules/ForagingWidget";
import { Bestimmung } from "@/components/modules/Bestimmung";
import { Mythen } from "@/components/modules/Mythen";
import { Grundlagen } from "@/components/modules/Grundlagen";
import { AppShell } from "@/components/AppShell";
import { SeasonTicker } from "@/components/SeasonTicker";
import { TAXONOMY, type TaxonomyId } from "@/lib/taxonomy";


type Tab = "home" | "grundlagen" | "wetter" | "mysterium" | "mythen" | "lebensstile" | "formen" | "guide" | "bestimmung" | "quiz";

type IndexSearch = { tab?: Tab | "lexikon"; cat?: string };

const VALID_TABS: Tab[] = ["home","grundlagen","wetter","mysterium","mythen","lebensstile","formen","guide","bestimmung","quiz"];

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): IndexSearch => ({
    tab: (VALID_TABS as string[]).includes(raw.tab as string) || raw.tab === "lexikon"
      ? (raw.tab as Tab | "lexikon")
      : undefined,
    cat: typeof raw.cat === "string" ? raw.cat : undefined,
  }),
  component: Index,
});

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Start", icon: Home },
  { id: "grundlagen", label: "Grundlagen", icon: Compass },
  { id: "wetter", label: "Wetter", icon: CloudRain },
  { id: "mysterium", label: "Mysterium", icon: Sparkles },
  { id: "mythen", label: "Mythen", icon: ShieldAlert },
  { id: "lebensstile", label: "Lebensstile", icon: TreePine },
  { id: "formen", label: "Formen", icon: Shapes },
];

function Hero({ onStart }: { onStart: (t: Tab) => void }) {
  const navigate = useNavigate({ from: "/" });

  const dust = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    bottom: `${(i * 17) % 40}%`,
    delay: `${(i * 0.7) % 6}s`,
    dur: `${8 + (i % 5) * 1.4}s`,
    dx: `${((i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8))}px`,
    size: 2 + (i % 3),
  }));

  return (
    <section className="space-y-8 md:space-y-12">
      {/* HERO — responsive forest background with mushroom anchored bottom-center */}
      <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-[#9A7B56] bg-[#132219] text-[#EADECC] shadow-[var(--shadow-soft)] md:rounded-[2.25rem]">
        {/* Background <picture>: single download per breakpoint, no layout shift */}
        <picture aria-hidden="true">
          <source media="(min-width: 1280px)" srcSet="/hero-bg-xl.png" />
          <source media="(min-width: 1024px)" srcSet="/hero-bg-l.png" />
          <source media="(min-width: 768px)" srcSet="/hero-bg-m.png" />
          <img
            src="/hero-bg-s.png"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-bottom"
          />
        </picture>
        {/* Top fog: near-solid espresso shield so text always sits on dark — WCAG-safe across all bg image sizes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[72%] bg-gradient-to-b from-[#132219] via-[#132219]/92 to-transparent"
        />
        {/* Left espresso vignette covering the text column on wider viewports */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-[#132219]/95 via-[#132219]/70 to-transparent md:block"
        />

        {/* Floating dust particles for ambient depth */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {dust.map((p, i) => (
            <span
              key={i}
              className="animate-dust absolute rounded-full bg-[#D97D3E]/60"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                ["--d" as string]: p.dur,
                ["--dx" as string]: p.dx,
              }}
            />
          ))}
        </div>

        {/* Bottom padding reserves space so the mushroom remains visible below content */}
        <div className="relative px-5 pt-6 pb-[62%] sm:pt-8 sm:pb-[56%] md:px-12 md:pt-12 md:pb-[48%] lg:pb-[40%] xl:pb-[36%]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#1F3327]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F0C9A8] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.18em]">
              🍄 Pilzkunde für komplette Neulinge
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.02] tracking-tight text-[#F0E0CC] drop-shadow-[0_2px_10px_rgba(47,29,23,0.95)] sm:text-5xl md:mt-5 md:text-7xl">
              FungaStarter
            </h1>
            <p className="mt-2 font-display text-xl font-semibold italic text-[#F0C9A8] drop-shadow-[0_2px_8px_rgba(47,29,23,0.9)] sm:text-2xl">
              Vom Waldrand bis in die Küche.
            </p>
            <p className="mt-4 max-w-lg text-[15px] font-semibold leading-relaxed text-[#EBD9C4] drop-shadow-[0_1px_6px_rgba(47,29,23,0.9)] md:text-lg">
              Dein smarter Begleiter durch die Pilzsaison. <strong className="text-[#F0E0CC]">Scanne dein Habitat</strong>, entdecke,
              was jetzt gerade wächst, und sammle deine Funde sicher mit <strong className="text-[#F0E0CC]">digitalem GPS</strong>.
              Werde vom Pilz-Neuling zum zertifizierten <strong className="text-[#F0C9A8]">Pilz-Kumpel</strong> – sicher,
              interaktiv und immer parat.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onStart("mysterium")}
                className="tactile rounded-full bg-[#D97D3E] px-7 py-3.5 font-bold text-white shadow-[var(--shadow-glow)]"
              >
                Los geht's →
              </button>
              <button
                onClick={() => onStart("quiz")}
                className="tactile rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-7 py-3.5 font-bold text-[#F0E0CC] hover:border-[#D97D3E]"
              >
                Direkt zum Quiz 🎓
              </button>
            </div>
          </div>


        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { n: "10", l: "Kapitel & Tools" },
          { n: "0", l: "Vorwissen nötig" },
          { n: "∞", l: "Wald-Abenteuer" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl px-8 py-6 text-center">
            <div className="font-display text-5xl font-semibold tracking-tight text-accent">{s.n}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>



      <div>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Dein Lernpfad durch den Wald</h2>
        <p className="mt-2 text-muted-foreground">Tippe auf ein Modul – oder geh der Reihe nach.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tabs.slice(1).map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onStart(t.id)}
                className="tactile group flex items-center gap-4 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-6 py-5 text-left hover:border-[#D97D3E] hover:shadow-[var(--shadow-glow)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-chanterelle-soft text-accent-foreground shadow-[var(--shadow-glow)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Modul {i + 1}</p>
                  <p className="mt-0.5 text-lg font-bold text-foreground">{t.label}</p>
                </div>
                <span className="text-2xl text-accent opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ModuleNav({ activeIdx, onSelect }: { activeIdx: number; onSelect: (i: number) => void }) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const c = containerRef.current;
    if (!c) return;
    setCanLeft(c.scrollLeft > 4);
    setCanRight(c.scrollLeft + c.clientWidth < c.scrollWidth - 4);
  };

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIdx];
    const c = containerRef.current;
    if (!el || !c) return;
    // Use layout offsets relative to the scroll container — these are
    // independent of current scrollLeft, so the pill stays glued to the
    // active tab while the strip is being scrolled.
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
    // Center the active tab horizontally without touching vertical scroll.
    const target = el.offsetLeft - (c.clientWidth - el.offsetWidth) / 2;
    c.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    // Arrows update after the scroll settles
    const t = setTimeout(updateArrows, 520);
    return () => clearTimeout(t);
  }, [activeIdx]);

  useEffect(() => {
    updateArrows();
    const c = containerRef.current;
    if (!c) return;
    const onScroll = () => updateArrows();
    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const nudge = (dir: -1 | 1) => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollBy({ left: dir * Math.max(180, c.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div className="relative mb-6 -mx-2 md:mx-0">
      {/* Left scroll arrow */}
      <button
        type="button"
        aria-label="Kategorien nach links scrollen"
        onClick={() => nudge(-1)}
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#9A7B56] bg-[#1F3327] text-[#E9A15A] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)] transition-opacity ${
          canLeft ? "opacity-100 hover:bg-[#243D2F]" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right scroll arrow */}
      <button
        type="button"
        aria-label="Kategorien nach rechts scrollen"
        onClick={() => nudge(1)}
        disabled={!canRight}
        className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#9A7B56] bg-[#1F3327] text-[#E9A15A] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)] transition-opacity ${
          canRight ? "opacity-100 hover:bg-[#243D2F]" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="px-11">
        <div
          ref={containerRef}
          className="no-scrollbar glass relative flex w-full items-center gap-0.5 overflow-x-auto rounded-full p-1.5"
          style={{ scrollbarWidth: "none" }}
        >
          {pill && (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-accent/95 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]"
              style={{
                left: pill.x,
                width: pill.w,
                height: "calc(100% - 12px)",
                transition: "left 450ms var(--ease-premium), width 450ms var(--ease-premium)",
              }}
            />
          )}
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const active = i === activeIdx;
            return (
              <button
                key={t.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                onClick={() => onSelect(i)}
                className={`relative z-10 flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold transition-colors duration-300 ${
                  active ? "text-accent-foreground" : "text-foreground/65 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}


function Index() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const isLegacyLexikon = search.tab === "lexikon";
  const initialTab: Tab = isLegacyLexikon ? "home" : ((search.tab as Tab) ?? "home");
  const [tab, setTab] = useState<Tab>(initialTab);
  const [formenActive, setFormenActive] = useState<TaxonomyId | undefined>(undefined);


  // Sync URL → state on back/forward
  useEffect(() => {
    if (search.tab && search.tab !== "lexikon" && search.tab !== tab) {
      setTab(search.tab as Tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.tab]);

  if (isLegacyLexikon) {
    return (
      <Navigate
        to="/lexicon"
        search={search.cat ? ({ cat: search.cat } as never) : (undefined as never)}
        replace
      />
    );
  }


  const updateTab = (t: Tab) => {
    setTab(t);
    navigate({
      search: (prev: IndexSearch) => {
        const next: IndexSearch = { ...prev };
        if (t === "home") delete next.tab;
        else next.tab = t;
        delete next.cat;
        return next;
      },
      replace: false,
    });
  };

  // Jump from Formen-module directly into the dedicated Lexikon route
  const jumpToLexikon = (typeId: TaxonomyId) => {
    navigate({ to: "/lexicon", search: { cat: typeId } });
  };

  const activeIdx = Math.max(0, tabs.findIndex((t) => t.id === tab));

  return (
    <AppShell>
      <div id="module-anchor" />
      <ModuleNav activeIdx={activeIdx} onSelect={(i) => updateTab(tabs[i].id)} />

      <div key={tab} className="animate-fade-slide space-y-8">
        {tab === "home" && <><Hero onStart={updateTab} /><SeasonTicker /></>}
        {tab === "grundlagen" && <Grundlagen />}
        {tab === "wetter" && <ForagingWidget />}
        {tab === "mysterium" && <Mysterium />}
        {tab === "mythen" && <Mythen />}
        {tab === "lebensstile" && <Lebensstile />}
        {tab === "formen" && <Formen onJumpToLexikon={jumpToLexikon} initialActive={formenActive} />}
        {tab === "guide" && <Guide />}
        {tab === "bestimmung" && <Bestimmung />}
        {tab === "quiz" && <Quiz />}
      </div>


      <footer className="mt-20 border-t border-[#9A7B56] pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Mit 🍄 für Wald-Neulinge gemacht. <strong className="text-foreground/80">Wichtig:</strong> Diese App ersetzt keinen Pilzberater. Sammle nur, was du sicher kennst.
      </footer>
    </AppShell>
  );
}
