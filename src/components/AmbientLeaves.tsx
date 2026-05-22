/**
 * Token-friendly ambient background — slowly falling autumn leaves.
 * Pure CSS, no assets, no JS animation loop. pointer-events-none + z-0.
 */
const LEAVES = [
  { e: "🍂", left: "6%",  delay: "0s",    dur: "18s", sway: "swirl-a", scale: 1.0, opacity: 0.28 },
  { e: "🍁", left: "18%", delay: "-7s",   dur: "22s", sway: "swirl-b", scale: 0.85, opacity: 0.22 },
  { e: "🍃", left: "32%", delay: "-14s",  dur: "16s", sway: "swirl-a", scale: 1.1,  opacity: 0.25 },
  { e: "🍂", left: "46%", delay: "-3s",   dur: "24s", sway: "swirl-b", scale: 0.7,  opacity: 0.20 },
  { e: "🍁", left: "60%", delay: "-11s",  dur: "20s", sway: "swirl-a", scale: 1.0,  opacity: 0.26 },
  { e: "🍃", left: "74%", delay: "-18s",  dur: "14s", sway: "swirl-b", scale: 0.9,  opacity: 0.22 },
  { e: "🍂", left: "86%", delay: "-5s",   dur: "23s", sway: "swirl-a", scale: 1.05, opacity: 0.24 },
];

export function AmbientLeaves() {
  return (
    <div
      aria-hidden="true"
      className="ambient-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="absolute -top-12 will-change-transform"
          style={{
            left: l.left,
            fontSize: `${l.scale * 1.5}rem`,
            opacity: l.opacity,
            animation: `falling-leaves ${l.dur} linear ${l.delay} infinite, ${l.sway} ${parseInt(l.dur) / 2}s ease-in-out ${l.delay} infinite`,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        >
          {l.e}
        </span>
      ))}
    </div>
  );
}
