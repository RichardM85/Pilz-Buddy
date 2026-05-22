import { useEffect, useState } from "react";
import { CloudRain, ThermometerSun, MapPin, RefreshCw, Sliders, Sparkles } from "lucide-react";

// Foraging algorithm:
// Temperature score: 1.0 when avg recent temp in [14, 22], drops linearly to 0 at <=4 or >=32.
// Rainfall score: optimal when 25-60mm rain occurred 3-5 days ago (the "Anregungs-Regen"),
// and recent days (0-2) are humid but not flooded.
function calcForagingFactor(tempC: number, rain7d: number, rainRecent: number) {
  let temp = 0;
  if (tempC >= 14 && tempC <= 22) temp = 1;
  else if (tempC > 22 && tempC < 32) temp = 1 - (tempC - 22) / 10;
  else if (tempC < 14 && tempC > 4) temp = 1 - (14 - tempC) / 10;
  temp = Math.max(0, Math.min(1, temp));

  // earlier rain (3-7 days ago): ideal around 30-60mm
  let earlier = 0;
  if (rain7d >= 20 && rain7d <= 70) earlier = 1;
  else if (rain7d > 70 && rain7d < 120) earlier = 1 - (rain7d - 70) / 50;
  else if (rain7d < 20) earlier = rain7d / 20;
  earlier = Math.max(0, Math.min(1, earlier));

  // recent rain: a little is good (humid), too much soaks the fruits
  let recent = 1;
  if (rainRecent > 30) recent = Math.max(0, 1 - (rainRecent - 30) / 40);
  if (rainRecent < 1 && rain7d < 10) recent = 0.5;

  const score = Math.round((temp * 0.4 + earlier * 0.45 + recent * 0.15) * 100);
  return Math.max(0, Math.min(100, score));
}

function commentary(score: number) {
  if (score >= 85) return { tone: "Spore-tacular!", text: "Korb schnappen und losrennen! Perfektes Pilzwetter.", color: "from-moss to-accent" };
  if (score >= 65) return { tone: "Sehr gut", text: "Heute könnte sich der Waldspaziergang richtig lohnen.", color: "from-accent to-chanterelle-soft" };
  if (score >= 45) return { tone: "Solide", text: "Ein paar Pilze warten sicher – Augen auf!", color: "from-chanterelle-soft to-secondary" };
  if (score >= 25) return { tone: "Mäßig", text: "Eher mager. Vielleicht eher Wandern als Sammeln?", color: "from-bark/40 to-secondary" };
  return { tone: "Zu trocken!", text: "Die Pilze schlafen noch. Warte auf den nächsten Regen.", color: "from-destructive/30 to-bark/30" };
}

type Mode = "live" | "sim";

export function ForagingWidget() {
  const [mode, setMode] = useState<Mode>("live");
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<{ temp: number; rain7: number; rainRecent: number; place: string } | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);

  // Simulation sliders
  const [simTemp, setSimTemp] = useState(17);
  const [simRain7, setSimRain7] = useState(35);
  const [simRecent, setSimRecent] = useState(5);

  const fetchLive = async (lat = 50.1109, lon = 8.6821, place = "Heimatwald (Frankfurt)") => {
    setLoading(true); setLiveError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&past_days=7&daily=temperature_2m_mean,precipitation_sum&forecast_days=1&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API nicht erreichbar");
      const json = await res.json();
      const temps: number[] = json.daily?.temperature_2m_mean ?? [];
      const rains: number[] = json.daily?.precipitation_sum ?? [];
      if (temps.length < 5) throw new Error("Zu wenige Daten");
      const recentTemps = temps.slice(-5, -1);
      const tempAvg = recentTemps.reduce((a, b) => a + b, 0) / recentTemps.length;
      const rain7 = rains.slice(0, -2).reduce((a, b) => a + b, 0);
      const rainRecent = rains.slice(-2).reduce((a, b) => a + b, 0);
      setLiveData({ temp: Math.round(tempAvg * 10) / 10, rain7: Math.round(rain7), rainRecent: Math.round(rainRecent), place });
    } catch (e) {
      setLiveError(e instanceof Error ? e.message : "Unbekannter Fehler");
      setMode("sim");
    } finally {
      setLoading(false);
    }
  };

  const tryGeolocation = () => {
    if (!("geolocation" in navigator)) { fetchLive(); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => fetchLive(p.coords.latitude, p.coords.longitude, "Dein Standort"),
      () => fetchLive(),
      { timeout: 5000 },
    );
  };

  useEffect(() => { fetchLive(); }, []);

  const data = mode === "live" && liveData
    ? liveData
    : { temp: simTemp, rain7: simRain7, rainRecent: simRecent, place: "Simulation" };

  const score = calcForagingFactor(data.temp, data.rain7, data.rainRecent);
  const c = commentary(score);

  return (
    <section className="space-y-6">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <CloudRain className="h-3.5 w-3.5" /> Live-Foraging-Faktor
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Ist heute Pilzwetter?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Wir checken Temperatur und Regen der letzten Tage und sagen dir, ob sich der Korb lohnt.
        </p>
      </header>

      <div className="overflow-hidden rounded-[2rem] border border-[#9A7B56] bg-card/40 backdrop-blur-xl shadow-[var(--shadow-soft)]">

        <div className={`relative bg-gradient-to-br ${c.color} px-8 py-10 text-center text-primary-foreground`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_60%)]" />
          <p className="relative text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">{data.place}</p>
          <div className="relative mx-auto mt-4 flex h-56 w-56 items-center justify-center">
            <GaugeDial score={score} />
          </div>
          <p className="relative mt-4 font-display text-2xl font-semibold italic tracking-tight">{c.tone}</p>
          <p className="relative mx-auto mt-1 max-w-md text-sm opacity-90">{c.text}</p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#9A7B56] border-t border-[#9A7B56]">
          <Stat icon={ThermometerSun} label="Ø Temperatur" value={`${data.temp}°C`} />
          <Stat icon={CloudRain} label="Regen 3–7 T." value={`${data.rain7} mm`} />
          <Stat icon={CloudRain} label="Regen 1–2 T." value={`${data.rainRecent} mm`} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-secondary/40 px-4 py-3">
          <div className="flex gap-1 rounded-full bg-card p-1">
            <button
              onClick={() => setMode("live")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${mode === "live" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <MapPin className="h-3 w-3" /> Live
            </button>
            <button
              onClick={() => setMode("sim")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${mode === "sim" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Sliders className="h-3 w-3" /> Simulation
            </button>
          </div>
          {mode === "live" && (
            <div className="flex gap-2">
              <button
                onClick={tryGeolocation}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:scale-105 disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> Mein Standort
              </button>
            </div>
          )}
        </div>

        {liveError && mode === "live" && (
          <div className="border-t border-destructive/20 bg-destructive/10 px-4 py-2 text-xs text-destructive">
            Wetterdaten nicht verfügbar ({liveError}) – wechsle zur Simulation!
          </div>
        )}
      </div>

      {mode === "sim" && (
        <div className="space-y-5 rounded-3xl border-2 border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
            <Sparkles className="h-4 w-4 text-accent" /> Schraube am Wetter
          </h3>
          <Slider label="Durchschnittstemperatur" suffix="°C" min={0} max={32} value={simTemp} onChange={setSimTemp} />
          <Slider label="Regen vor 3–7 Tagen" suffix=" mm" min={0} max={120} value={simRain7} onChange={setSimRain7} />
          <Slider label="Regen letzte 1–2 Tage" suffix=" mm" min={0} max={60} value={simRecent} onChange={setSimRecent} />
          <p className="text-xs text-muted-foreground">
            <strong>Tipp:</strong> Probiere 17°C + 35 mm vor 5 Tagen + 5 mm gestern. Pilz-Jackpot!
          </p>
        </div>
      )}
    </section>
  );
}

function GaugeDial({ score }: { score: number }) {
  // 3/4 arc from 135deg to 45deg (270deg sweep). Radius 78, stroke ~10.
  const R = 78;
  const C = 2 * Math.PI * R;
  const ARC = C * 0.75; // 270deg sweep
  const filled = ARC * (score / 100);
  return (
    <div className="relative h-56 w-56">
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-[135deg]">
        <circle
          cx="100" cy="100" r={R}
          fill="none"
          stroke="currentColor"
          className="text-[#EADECC]/15"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${ARC} ${C}`}
        />
        <circle
          cx="100" cy="100" r={R}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${C}`}
          style={{ transition: "stroke-dasharray 1.2s var(--ease-premium)" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDFCF0" stopOpacity="1" />
            <stop offset="100%" stopColor="#FDFCF0" stopOpacity="0.85" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-6xl font-black tracking-tight text-[#FDFCF0] drop-shadow-[0_2px_4px_rgba(62,39,35,0.5)] md:text-7xl">{score}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FDFCF0]/95">Foraging-Index</span>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof CloudRain; label: string; value: string }) {
  return (
    <div className="p-4 text-center">
      <Icon className="mx-auto h-5 w-5 text-accent" />
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-primary">{value}</p>
    </div>
  );
}

function Slider({ label, suffix, min, max, value, onChange }: { label: string; suffix: string; min: number; max: number; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-sm font-semibold text-foreground/85">{label}</label>
        <span className="text-sm font-bold text-accent">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}
