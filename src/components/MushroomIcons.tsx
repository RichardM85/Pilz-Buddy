// SVG illustrations for mushroom morphology types
export function SpongeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs>
        <radialGradient id="cap1" cx="50%" cy="40%">
          <stop offset="0%" stopColor="oklch(0.55 0.12 50)" />
          <stop offset="100%" stopColor="oklch(0.38 0.10 45)" />
        </radialGradient>
      </defs>
      <path d="M15 55 Q60 5 105 55 Q105 70 60 70 Q15 70 15 55 Z" fill="url(#cap1)" />
      <rect x="48" y="68" width="24" height="38" rx="10" fill="oklch(0.86 0.05 80)" />
      {[...Array(18)].map((_, i) => (
        <circle key={i} cx={20 + (i % 6) * 14} cy={75 + Math.floor(i / 6) * 8} r="2.5" fill="oklch(0.74 0.16 65)" opacity="0.7" />
      ))}
    </svg>
  );
}

export function GillsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs>
        <radialGradient id="cap2" cx="50%" cy="40%">
          <stop offset="0%" stopColor="oklch(0.6 0.14 30)" />
          <stop offset="100%" stopColor="oklch(0.42 0.13 25)" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="50" rx="48" ry="32" fill="url(#cap2)" />
      <rect x="50" y="65" width="20" height="40" rx="8" fill="oklch(0.92 0.03 80)" />
      {[...Array(11)].map((_, i) => (
        <line key={i} x1={18 + i * 8.4} y1="68" x2={18 + i * 8.4} y2="78" stroke="oklch(0.3 0.04 60)" strokeWidth="1.8" />
      ))}
    </svg>
  );
}

export function BracketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <rect x="55" y="10" width="20" height="100" fill="oklch(0.38 0.05 50)" />
      <path d="M55 35 Q20 38 18 55 Q22 60 55 55 Z" fill="oklch(0.62 0.11 70)" />
      <path d="M55 55 Q15 60 12 78 Q18 82 55 75 Z" fill="oklch(0.55 0.10 65)" />
      <path d="M75 45 Q105 48 108 62 Q102 66 75 62 Z" fill="oklch(0.62 0.11 70)" />
    </svg>
  );
}

export function MyceliumIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className}>
      <ellipse cx="100" cy="60" rx="95" ry="55" fill="oklch(0.88 0.04 85)" opacity="0.4" />
      {[...Array(25)].map((_, i) => {
        const x = 20 + (i * 7) % 160;
        const y = 20 + ((i * 13) % 80);
        return <circle key={i} cx={x} cy={y} r={1.5 + (i % 3)} fill="oklch(0.74 0.16 65)" opacity="0.6" />;
      })}
      {[...Array(40)].map((_, i) => {
        const x1 = 20 + (i * 11) % 160;
        const y1 = 20 + ((i * 7) % 80);
        const x2 = x1 + ((i % 5) - 2) * 15;
        const y2 = y1 + ((i % 3) - 1) * 12;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.45 0.05 50)" strokeWidth="0.8" opacity="0.5" />;
      })}
    </svg>
  );
}

export function CuteMushroom({ className = "", color = "chanterelle" }: { className?: string; color?: "chanterelle" | "red" | "brown" }) {
  const caps = {
    chanterelle: ["oklch(0.78 0.16 65)", "oklch(0.62 0.15 55)"],
    red: ["oklch(0.62 0.22 28)", "oklch(0.45 0.20 25)"],
    brown: ["oklch(0.5 0.08 50)", "oklch(0.35 0.06 45)"],
  }[color];
  return (
    <svg viewBox="0 0 120 140" className={className}>
      <defs>
        <radialGradient id={`mc-${color}`} cx="50%" cy="35%">
          <stop offset="0%" stopColor={caps[0]} />
          <stop offset="100%" stopColor={caps[1]} />
        </radialGradient>
      </defs>
      <path d="M10 70 Q60 0 110 70 Q110 85 60 85 Q10 85 10 70 Z" fill={`url(#mc-${color})`} />
      {color === "red" && [...Array(7)].map((_, i) => (
        <ellipse key={i} cx={25 + i * 12} cy={45 + (i % 2) * 10} rx="4" ry="3" fill="oklch(0.97 0.01 80)" />
      ))}
      <path d="M45 85 Q42 130 50 132 L70 132 Q78 130 75 85 Z" fill="oklch(0.95 0.02 80)" />
      <circle cx="52" cy="105" r="2" fill="oklch(0.3 0.04 140)" />
      <circle cx="68" cy="105" r="2" fill="oklch(0.3 0.04 140)" />
      <path d="M55 112 Q60 116 65 112" stroke="oklch(0.3 0.04 140)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
