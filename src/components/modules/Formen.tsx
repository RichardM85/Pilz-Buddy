import { useEffect, useState } from "react";
import {
  Shapes, ShieldCheck, AlertTriangle, Info, ShieldAlert, ChevronRight,
  Layers, Network, Library,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TAXONOMY, type TaxonomyGroup, type TaxonomyId } from "@/lib/taxonomy";

// Mini-SVGs für Fruchtschicht-Muster (editorial, dezent)
function SporePattern({ id, className = "h-20 w-20" }: { id: TaxonomyId; className?: string }) {
  const fg = "currentColor";
  switch (id) {
    case "Röhrlinge":
      return (
        <svg viewBox="0 0 60 60" className={className}>
          {[...Array(36)].map((_, i) => (
            <circle key={i} cx={6 + (i % 6) * 10} cy={6 + Math.floor(i / 6) * 10} r="2.6" fill={fg} opacity={0.78} />
          ))}
        </svg>
      );
    case "Lamellenpilze":
      return (
        <svg viewBox="0 0 60 60" className={className}>
          {[...Array(11)].map((_, i) => (
            <line key={i} x1={6 + i * 5} y1="6" x2={6 + i * 5} y2="54" stroke={fg} strokeWidth="1.8" />
          ))}
        </svg>
      );
    case "Leistenpilze":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none" stroke={fg} strokeWidth="1.6">
          {[...Array(6)].map((_, i) => (
            <path key={i} d={`M${4 + i * 10} 6 Q${8 + i * 10} 30 ${6 + i * 10} 54`} />
          ))}
        </svg>
      );
    case "Schlauchpilze":
      return (
        <svg viewBox="0 0 60 60" className={className}>
          {[...Array(20)].map((_, i) => (
            <ellipse key={i} cx={6 + (i % 5) * 12} cy={8 + Math.floor(i / 5) * 12} rx="3.5" ry="2" fill={fg} opacity={0.7} />
          ))}
        </svg>
      );
    case "Bauchpilze":
      return (
        <svg viewBox="0 0 60 60" className={className}>
          <circle cx="30" cy="30" r="22" fill={fg} opacity={0.18} />
          <circle cx="30" cy="30" r="14" fill={fg} opacity={0.35} />
          <circle cx="30" cy="30" r="6" fill={fg} opacity={0.85} />
        </svg>
      );
    case "Stachelpilze":
      return (
        <svg viewBox="0 0 60 60" className={className} fill={fg}>
          {[...Array(8)].map((_, i) => (
            <polygon key={i} points={`${4 + i * 7},6 ${7 + i * 7},6 ${5.5 + i * 7},54`} opacity={0.8} />
          ))}
        </svg>
      );
    case "Porlinge & Schichtpilze":
      return (
        <svg viewBox="0 0 60 60" className={className} fill={fg}>
          <path d="M2 30 Q30 8 58 30 L58 42 Q30 32 2 42 Z" opacity={0.85} />
          {[...Array(14)].map((_, i) => (
            <circle key={i} cx={6 + (i % 7) * 8} cy={48} r="1.4" opacity={0.6} />
          ))}
        </svg>
      );
    case "Gallertpilze":
      return (
        <svg viewBox="0 0 60 60" className={className} fill={fg}>
          <path d="M8 22 Q20 6 32 18 Q44 4 54 20 Q56 38 40 42 Q26 56 14 44 Q2 38 8 22 Z" opacity={0.72} />
        </svg>
      );
    case "Korallen & Keulen":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none" stroke={fg} strokeWidth="2.2" strokeLinecap="round">
          <path d="M30 54 L30 38 M30 38 L22 24 M30 38 L38 22 M22 24 L16 14 M22 24 L28 14 M38 22 L34 12 M38 22 L46 14" />
        </svg>
      );
    case "Hörnlinge":
      return (
        <svg viewBox="0 0 60 60" className={className} fill={fg}>
          <path d="M14 52 Q12 28 22 14 L26 18 Q20 32 22 50 Z" opacity={0.85} />
          <path d="M34 52 Q32 30 42 14 L46 18 Q40 34 42 50 Z" opacity={0.85} />
        </svg>
      );
  }
}

const SAFETY_STYLES = {
  safe:   { Icon: ShieldCheck, ring: "border-moss/40",         glow: "from-moss/15",         text: "text-moss",         tag: "Anfänger-freundlich" },
  warn:   { Icon: AlertTriangle, ring: "border-accent/50",     glow: "from-accent/20",       text: "text-bark",         tag: "Mit Sorgfalt" },
  danger: { Icon: ShieldAlert, ring: "border-destructive/50",  glow: "from-destructive/15",  text: "text-destructive",  tag: "Hohe Verwechslungsgefahr" },
  info:   { Icon: Info, ring: "border-bark/40",                glow: "from-bark/15",         text: "text-bark",         tag: "Wissenschaftlich relevant" },
};

export function Formen({ onJumpToLexikon, initialActive }: { onJumpToLexikon?: (typeId: TaxonomyId) => void; initialActive?: TaxonomyId }) {
  const [active, setActive] = useState<TaxonomyId>(initialActive ?? TAXONOMY[0].id);
  const current = TAXONOMY.find((t) => t.id === active)!;

  useEffect(() => {
    if (initialActive) {
      setActive(initialActive);
      requestAnimationFrame(() => {
        document.getElementById("taxonomie-atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [initialActive]);

  return (
    <section id="taxonomie-atlas" className="space-y-8 pb-32">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <Shapes className="h-3.5 w-3.5" /> Modul 3 · Taxonomie-Atlas
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Die 10 großen Pilzgruppen</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Klassifiziert nach Fruchtschicht – dem präzisesten Bestimmungsmerkmal der Mykologie.
          Tippe eine Karte für Details und springe direkt ins gefilterte Lexikon.
        </p>
      </header>

      {/* Editorial-Grid: 10 Gruppen */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TAXONOMY.map((t) => {
          const isActive = t.id === active;
          return (
            <div
              key={t.id}
              role="button"
              tabIndex={0}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(t.id); } }}
              className={`tactile group relative flex min-h-[180px] cursor-pointer flex-col items-center overflow-hidden rounded-3xl border-2 px-5 pb-6 pt-7 text-center transition-colors duration-300 ease-out active:scale-[0.98] ${
                isActive
                  ? "border-[#D97D3E] bg-[#1F3327] shadow-[var(--shadow-glow)]"
                  : "border-[#9A7B56] bg-[#1F3327] hover:border-[#D97D3E]"
              }`}
            >
              <div className="relative flex w-full flex-col items-center">
                <div className="relative mx-auto mb-4 h-28 w-28">
                  <img
                    src={t.image}
                    alt={t.id}
                    loading="lazy"
                    className="h-full w-full object-contain "
                  />
                </div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#BCA385]">{t.subtitle}</span>
                <p className="font-serif text-lg font-bold text-[#EADECC]">{t.id}</p>
                <Link
                  to="/lexicon"
                  search={{ cat: t.id }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#9A7B56]/60 bg-[#132219] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D97D3E] transition hover:border-[#D97D3E] hover:bg-[#1A2E23]"
                >
                  <Library className="h-3 w-3" /> Lexikon
                </Link>
              </div>
            </div>
          );
        })}
      </div>


      <div key={current.id} className="animate-fade-slide">
        <DetailCard group={current} onJumpToLexikon={onJumpToLexikon} />
      </div>
    </section>
  );
}

function DetailCard({ group, onJumpToLexikon }: { group: TaxonomyGroup; onJumpToLexikon?: (id: TaxonomyId) => void }) {
  const safe = SAFETY_STYLES[group.safetyTone];
  const SafeIcon = safe.Icon;

  return (
    <article
      key={group.id}
      className="animate-pop-in overflow-hidden rounded-[2rem] border-2 border-[#9A7B56] bg-[#1F3327] shadow-[var(--shadow-soft)]"
    >
      {/* Hero */}
      <div className="relative grid gap-6 bg-[#132219] p-6 md:grid-cols-[auto_1fr] md:items-center md:p-10">
        <div className="flex justify-center">
          <div className="relative flex h-52 w-52 items-center justify-center rounded-[2rem] border-2 border-[#9A7B56] bg-[#1F3327]">
            <img
              src={group.image}
              alt={group.id}
              className="h-40 w-40 object-contain "
            />
            <span className="absolute left-3 top-3 text-[8px] font-bold tracking-[0.3em] text-[#BCA385]">FIG.</span>
            <span className="absolute right-3 top-3 font-mono text-[8px] font-bold tracking-wider text-[#BCA385]">
              {String((TAXONOMY.findIndex((t) => t.id === group.id) + 1)).padStart(2, "0")}/10
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{group.subtitle}</p>
          <h3 className="mt-1 text-3xl font-bold text-primary md:text-4xl">{group.id}</h3>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Layers className="h-3.5 w-3.5 text-accent" />
            <span className="text-foreground/80">Fruchtschicht:</span>
            <span className="text-primary">{group.fruchtschicht}</span>
          </div>

          <p className="mt-4 max-w-xl text-foreground/85">{group.description}</p>

          <div className={`mt-5 flex items-start gap-3 rounded-2xl border ${safe.ring} bg-card/80 p-4 backdrop-blur`}>
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card ${safe.text}`}>
              <SafeIcon className="h-4 w-4" />
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider ${safe.text}`}>Sicherheits-Fakt · {safe.tag}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">{group.safetyFact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indikatoren + CTA */}
      <div className="grid gap-6 border-t border-border/60 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Network className="h-3.5 w-3.5 text-accent" /> Schlüssel-Indikatorarten
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.indicators.map((ind) => (
              <li key={ind} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                {ind}
              </li>
            ))}
          </ul>
        </div>

        {onJumpToLexikon && (
          <button
            onClick={() => onJumpToLexikon(group.id)}
            className="group inline-flex items-center justify-center gap-2 self-end rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-forest-deep"
          >
            <Library className="h-4 w-4" />
            Alle {group.id} im Lexikon
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </article>
  );
}

// Re-export pour avoid unused warning

