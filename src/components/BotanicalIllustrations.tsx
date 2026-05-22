// Premium Minimalist Line-Art illustrations for the 10 taxonomy groups.
// - Ultra-thin continuous strokes (1 / 1.5) in dimmed gold (#D4A373).
// - Offset organic color-blob behind each piece, tone-driven by safetyTone.
// - Self-contained, responsive viewBox, fade-in on mount.

import { useEffect, useRef, useState } from "react";
import type { SafetyTone, TaxonomyId } from "@/lib/taxonomy";

const STROKE = "#D4A373";

/** Tone-driven gradient stops for the offset background blob. */
const TONE_PALETTE: Record<SafetyTone, { a: string; b: string; bg: string }> = {
  // Edible / Beginner — warm chanterelle amber halo
  safe:   { a: "#F2C16B", b: "#D4A373", bg: "rgba(212,163,115,0.10)" },
  // Psychoactive / caution — mystical crimson + forest emerald
  warn:   { a: "#B85C6A", b: "#2E5A4E", bg: "rgba(184,92,106,0.10)" },
  // Deadly — luxury violet + charcoal aura
  danger: { a: "#7A5BA0", b: "#26222E", bg: "rgba(122,91,160,0.12)" },
  // Research / wood-dwellers — dimmed brass + bark
  info:   { a: "#C8A878", b: "#4A3A2A", bg: "rgba(200,168,120,0.08)" },
};

/** IntersectionObserver fade-in. */
function useInView<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setSeen(true), io.disconnect())),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

/** Shared SVG shell with the offset color-blob behind the line art. */
function Plate({
  id, tone, children, viewBox = "0 0 160 160", className = "",
}: { id: string; tone: SafetyTone; children: React.ReactNode; viewBox?: string; className?: string }) {
  const p = TONE_PALETTE[tone];
  const { ref, seen } = useInView<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={`${className} transition-opacity duration-[1200ms] ease-out ${seen ? "opacity-100" : "opacity-0"}`}
      style={{ transform: seen ? "translateY(0)" : "translateY(6px)", transition: "opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.16,1,0.3,1)" }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-blob`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={p.a} stopOpacity="0.55" />
          <stop offset="55%" stopColor={p.b} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.b} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-aura`} cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor={p.a} stopOpacity="0.15" />
          <stop offset="100%" stopColor={p.a} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Offset organic blob — asymmetrical, slightly displaced from the line art */}
      <path
        d="M28 70 C24 38, 70 14, 102 26 C140 40, 144 90, 118 116 C92 142, 40 138, 26 110 C18 96, 32 90, 28 70 Z"
        fill={`url(#${id}-blob)`}
        transform="translate(8 -6) rotate(-6 80 80)"
      />
      <circle cx="80" cy="86" r="64" fill={`url(#${id}-aura)`} />

      {/* Line art — sits crisp above the blob */}
      <g
        fill="none"
        stroke={STROKE}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

/* ============================================================
 * 10 GROUP ILLUSTRATIONS
 * Each: silhouette + spore-bearing surface, drawn as continuous line art
 * ============================================================ */

function Roehrlinge({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-roehr" tone={tone}>
      {/* Cap */}
      <path d="M32 78 C36 50, 76 36, 112 50 C130 58, 132 74, 128 82 L32 82 Z" />
      {/* Cap highlight curve */}
      <path d="M48 64 C66 54, 92 54, 110 62" strokeWidth="0.8" opacity="0.7" />
      {/* Stem */}
      <path d="M68 82 C66 100, 64 122, 70 134 L92 134 C98 122, 96 104, 94 82" />
      {/* Tube layer */}
      <path d="M34 84 L128 84" strokeWidth="1.4" />
      {/* Pore dots — the iconic sponge surface */}
      {Array.from({ length: 26 }).map((_, i) => (
        <circle key={i} cx={38 + (i % 13) * 7.2} cy={i < 13 ? 90 : 96} r="0.9" fill={STROKE} stroke="none" />
      ))}
    </Plate>
  );
}

function Lamellenpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-lam" tone={tone}>
      {/* Bell cap */}
      <path d="M28 76 C30 44, 78 26, 118 44 C134 52, 134 74, 128 84 L32 84 Z" />
      {/* Ring */}
      <path d="M64 92 C72 96, 92 96, 100 92" />
      {/* Stem with volva */}
      <path d="M72 84 C70 104, 68 124, 74 134 L90 134 C96 124, 94 104, 92 84" />
      <path d="M70 134 C66 138, 98 138, 94 134" />
      {/* Radiating gills */}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 36 + i * 7;
        return <line key={i} x1={x} y1="86" x2={32 + i * 7.3} y2="92" strokeWidth="0.7" />;
      })}
    </Plate>
  );
}

function Leistenpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-leist" tone={tone}>
      {/* Funnel cap (chanterelle silhouette) */}
      <path d="M40 56 C48 80, 56 88, 62 96 C66 116, 96 116, 100 96 C106 88, 114 80, 122 56 C108 46, 54 46, 40 56 Z" />
      {/* Inner depression */}
      <path d="M58 60 C72 54, 90 54, 104 60 C100 70, 62 70, 58 60 Z" strokeWidth="0.8" />
      {/* Forked ridges underneath */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = 50 + i * 12;
        return <path key={i} d={`M${x} 96 Q${x - 2} 110 ${x - 6} 124 M${x} 96 Q${x + 2} 110 ${x + 6} 124`} strokeWidth="0.8" />;
      })}
      {/* Stem base */}
      <path d="M78 124 C76 132, 88 132, 86 124" />
    </Plate>
  );
}

function Schlauchpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-asco" tone={tone}>
      {/* Morel honeycomb cap */}
      <path d="M58 36 C46 50, 46 86, 58 100 C66 106, 94 106, 102 100 C114 86, 114 50, 102 36 C90 24, 70 24, 58 36 Z" />
      {/* Honeycomb cells */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const cx = 64 + col * 10 + (row % 2 ? 5 : 0);
          const cy = 44 + row * 16;
          if (cx > 100 || cy > 96) return null;
          return (
            <path
              key={`${row}-${col}`}
              d={`M${cx - 4} ${cy} L${cx - 2} ${cy - 4} L${cx + 2} ${cy - 4} L${cx + 4} ${cy} L${cx + 2} ${cy + 4} L${cx - 2} ${cy + 4} Z`}
              strokeWidth="0.7"
            />
          );
        }),
      )}
      {/* Hollow stem */}
      <path d="M68 100 C66 116, 66 130, 72 136 L88 136 C94 130, 94 116, 92 100" />
    </Plate>
  );
}

function Bauchpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-bauch" tone={tone}>
      {/* Puffball orb */}
      <circle cx="80" cy="86" r="38" />
      {/* Surface texture stippling */}
      {Array.from({ length: 22 }).map((_, i) => {
        const a = (i / 22) * Math.PI * 2;
        const r = 28 + (i % 3) * 3;
        return <circle key={i} cx={80 + Math.cos(a) * r} cy={86 + Math.sin(a) * r * 0.95} r="0.6" fill={STROKE} stroke="none" />;
      })}
      {/* Apex opening */}
      <path d="M72 50 C76 44, 84 44, 88 50" strokeWidth="0.8" />
      {/* Spore puff */}
      <path d="M80 46 C78 36, 84 30, 80 22" strokeWidth="0.7" opacity="0.7" />
      <path d="M76 40 C72 32, 70 28, 64 24" strokeWidth="0.7" opacity="0.55" />
      <path d="M84 40 C88 32, 90 28, 96 24" strokeWidth="0.7" opacity="0.55" />
      {/* Base attachment */}
      <path d="M64 122 C72 126, 88 126, 96 122" />
    </Plate>
  );
}

function Stachelpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-stach" tone={tone}>
      {/* Cap */}
      <path d="M34 76 C40 50, 80 36, 116 52 C132 62, 130 78, 126 84 L34 84 Z" />
      {/* Stem */}
      <path d="M72 84 C70 104, 70 124, 76 134 L88 134 C94 124, 94 104, 92 84" />
      {/* Hanging spines */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 38 + i * 6.8;
        const len = 8 + ((i * 7) % 5);
        return <line key={i} x1={x} y1="84" x2={x} y2={84 + len} strokeWidth="0.8" />;
      })}
    </Plate>
  );
}

function Porlinge({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-pol" tone={tone}>
      {/* Tree trunk */}
      <path d="M120 18 C118 60, 118 110, 122 142" />
      <path d="M132 18 C134 60, 134 110, 130 142" />
      {/* Two bracket shelves */}
      <path d="M120 60 C92 60, 60 64, 38 78 C42 84, 60 86, 88 84 C108 82, 120 78, 120 70 Z" />
      <path d="M120 96 C100 96, 74 100, 56 112 C62 118, 78 120, 100 118 C114 116, 120 112, 120 106 Z" />
      {/* Zonate growth rings */}
      <path d="M50 76 C70 74, 100 72, 118 70" strokeWidth="0.6" opacity="0.7" />
      <path d="M58 80 C76 78, 102 76, 118 74" strokeWidth="0.6" opacity="0.7" />
      <path d="M66 110 C82 108, 108 106, 118 104" strokeWidth="0.6" opacity="0.7" />
    </Plate>
  );
}

function Gallertpilze({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-gal" tone={tone}>
      {/* Wood branch */}
      <path d="M22 124 C60 118, 110 116, 142 122" />
      <path d="M28 130 C66 126, 108 126, 138 130" strokeWidth="0.7" opacity="0.7" />
      {/* Jelly ear lobes */}
      <path d="M48 80 C42 96, 48 118, 70 122 C76 118, 78 110, 76 96 C74 84, 60 70, 48 80 Z" />
      <path d="M58 96 C60 102, 62 110, 66 116" strokeWidth="0.7" opacity="0.7" />
      <path d="M92 70 C84 84, 88 110, 108 118 C118 114, 122 102, 118 90 C114 76, 102 60, 92 70 Z" />
      <path d="M100 88 C102 96, 102 106, 104 114" strokeWidth="0.7" opacity="0.7" />
    </Plate>
  );
}

function Korallen({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-kor" tone={tone}>
      {/* Base */}
      <path d="M62 130 C72 134, 92 134, 102 130" />
      {/* Central stalk + branching coral */}
      <path d="M82 130 L82 96" />
      <path d="M82 96 L70 80 L62 64" />
      <path d="M82 96 L94 80 L102 64" />
      <path d="M70 80 L60 72 L52 60" />
      <path d="M70 80 L74 70 L72 56" />
      <path d="M94 80 L106 72 L114 60" />
      <path d="M94 80 L90 70 L92 56" />
      <path d="M62 64 L56 50" />
      <path d="M62 64 L66 50" />
      <path d="M102 64 L98 50" />
      <path d="M102 64 L108 50" />
      <path d="M72 56 L70 42" />
      <path d="M72 56 L76 44" />
      <path d="M92 56 L94 42" />
      <path d="M92 56 L88 44" />
    </Plate>
  );
}

function Hoernlinge({ tone }: { tone: SafetyTone }) {
  return (
    <Plate id="bot-horn" tone={tone}>
      {/* Deadwood log */}
      <path d="M18 124 C60 118, 112 118, 146 124" />
      <path d="M22 132 C62 126, 110 126, 142 132" strokeWidth="0.7" opacity="0.7" />
      <line x1="40" y1="122" x2="42" y2="130" strokeWidth="0.5" opacity="0.6" />
      <line x1="92" y1="120" x2="94" y2="130" strokeWidth="0.5" opacity="0.6" />
      {/* Two antler-like horns */}
      <path d="M52 122 C50 100, 56 84, 60 70" />
      <path d="M60 70 C58 60, 64 56, 66 50" />
      <path d="M60 70 C66 64, 64 56, 70 50" />
      <path d="M96 122 C98 100, 102 80, 108 66" />
      <path d="M108 66 C108 56, 114 52, 118 46" />
      <path d="M108 66 C114 58, 110 52, 116 44" />
    </Plate>
  );
}

/* ============================================================
 * PUBLIC API
 * ============================================================ */

const MAP: Record<TaxonomyId, (props: { tone: SafetyTone }) => React.ReactElement> = {
  "Röhrlinge": Roehrlinge,
  "Lamellenpilze": Lamellenpilze,
  "Leistenpilze": Leistenpilze,
  "Schlauchpilze": Schlauchpilze,
  "Bauchpilze": Bauchpilze,
  "Stachelpilze": Stachelpilze,
  "Porlinge & Schichtpilze": Porlinge,
  "Gallertpilze": Gallertpilze,
  "Korallen & Keulen": Korallen,
  "Hörnlinge": Hoernlinge,
};

export function BotanicalPlate({
  id, tone, className = "h-24 w-24",
}: { id: TaxonomyId; tone: SafetyTone; className?: string }) {
  const Cmp = MAP[id];
  return (
    <div className={className}>
      <Cmp tone={tone} />
    </div>
  );
}
