import { useMemo } from "react";

export function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 2,
      color: ["#d98b3a", "#3f6b3a", "#e8b94a", "#b85c3a", "#7ba05b"][i % 5],
      size: 6 + Math.random() * 8,
      shape: i % 3,
    })),
  []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-20px",
            width: p.size,
            height: p.size * (p.shape === 1 ? 0.4 : 1),
            background: p.color,
            borderRadius: p.shape === 2 ? "50%" : "2px",
            animation: `confetti-fall ${p.duration}s ${p.delay}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}
