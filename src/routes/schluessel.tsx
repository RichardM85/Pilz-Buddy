import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Compass, ArrowLeft, ArrowRight, RotateCcw, Skull, AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useMushrooms, type Mushroom } from "@/lib/useMushrooms";
import { MushroomLinkCard } from "@/components/LexikonShared";

export const Route = createFileRoute("/schluessel")({
  head: () => ({
    meta: [
      { title: "Bestimmungs-Schlüssel · FungaStarter" },
      { name: "description", content: "Geführter Ausschluss-Schlüssel für Pilz-Neulinge: Fruchtschicht, Sporenfarbe, Stiel — Schritt für Schritt." },
      { property: "og:title", content: "Bestimmungs-Schlüssel · FungaStarter" },
      { property: "og:description", content: "Geführter Ausschluss-Schlüssel für absolute Pilz-Neulinge." },
    ],
  }),
  component: SchluesselPage,
});

// ── Criteria types ──────────────────────────────────────────────────────────
type Fruchtschicht = "roehren" | "lamellen" | "leisten" | "stoppeln";
type Sporenpulver = "weiss" | "braun" | "rosa";
type StielMerkmale = "knolle" | "glatt";

interface Criteria {
  fruchtschicht: Fruchtschicht | "";
  sporenpulver: Sporenpulver | "";
  stielMerkmale: StielMerkmale | "";
}

const EMPTY_CRITERIA: Criteria = { fruchtschicht: "", sporenpulver: "", stielMerkmale: "" };

const STEP1_OPTIONS: Array<{ id: Fruchtschicht; label: string; hint: string }> = [
  { id: "roehren", label: "Röhren / Schwamm", hint: "Wie ein Schwamm — Steinpilz, Maronen" },
  { id: "lamellen", label: "Lamellen / Blätter", hint: "Strahlenförmige Plättchen — Champignon, Knollenblätterpilz" },
  { id: "leisten", label: "Leisten (fest verwachsen)", hint: "Niedrige, gabelnde Adern — Pfifferling, Trompete" },
  { id: "stoppeln", label: "Stoppeln / Stacheln", hint: "Spitze Zähnchen — Habichtspilz, Igel-Stachelbart" },
];

const STEP2_OPTIONS: Array<{ id: Sporenpulver; label: string; hint: string }> = [
  { id: "weiss", label: "Weiß / Hellcreme", hint: "Cremeweiß, gelblich, blass" },
  { id: "braun", label: "Braun / Dunkel", hint: "Tabakbraun, schwarzbraun, oliv" },
  { id: "rosa", label: "Rosa / Rötlich", hint: "Fleischrosa, kakao-rosa" },
];

const STEP3_OPTIONS: Array<{ id: StielMerkmale; label: string; hint: string }> = [
  { id: "knolle", label: "Mit Knolle, Scheide oder sackartiger Hülle", hint: "Verdickung, Häutchen, Eiertasse" },
  { id: "glatt", label: "Glatter Stiel / Ohne auffällige Knolle", hint: "Gleichmäßig dick, keine Scheide" },
];

// ── Matching against the Supabase data set ──────────────────────────────────
function hymTypeOf(m: Mushroom): Fruchtschicht | null {
  const t = (m.type ?? "").toLowerCase();
  if (/röhr|roehr/.test(t)) return "roehren";
  if (/lamell/.test(t)) return "lamellen";
  if (/leist|pfiff/.test(t)) return "leisten";
  if (/stachel|igel/.test(t)) return "stoppeln";
  return null;
}
function sporeBucket(m: Mushroom): Sporenpulver | null {
  const s = (m.sporenfarbe ?? "").toLowerCase();
  if (!s || s === "unbekannt") return null;
  if (/(rosa|rötlich|roetlich|fleischfarben|inkarnat)/.test(s)) return "rosa";
  if (/(braun|schwarz|oliv|purpur|tabak|rost)/.test(s)) return "braun";
  if (/(weiß|weiss|creme|hell|gelb|ocker|blass)/.test(s)) return "weiss";
  return null;
}
function hasBulb(m: Mushroom): boolean {
  const hay = `${m.merkmale?.join(" ") ?? ""} ${m.verwechslung ?? ""} ${m.fun_fact ?? ""}`.toLowerCase();
  return /knolle|scheide|volva|sackförmig|sackfoermig/.test(hay)
      || /amanita|knollenblätter|knollenblaetter|wulstling/.test((m.name_lat + m.name_de).toLowerCase());
}

function matches(m: Mushroom, c: Criteria): boolean {
  if (c.fruchtschicht) {
    const h = hymTypeOf(m);
    if (h && h !== c.fruchtschicht) return false;
  }
  if (c.sporenpulver) {
    const s = sporeBucket(m);
    if (s && s !== c.sporenpulver) return false;
  }
  if (c.stielMerkmale) {
    const bulb = hasBulb(m);
    if (c.stielMerkmale === "knolle" && !bulb) return false;
    if (c.stielMerkmale === "glatt" && bulb) return false;
  }
  return true;
}

// ── High-Alert: Knollenblätterpilz combo ────────────────────────────────────
function DeathAlert() {
  return (
    <div
      role="alert"
      className="animate-pulse rounded-lg border-2 border-[#FF4444] bg-[#4A1414] p-6 text-white font-bold shadow-[0_0_40px_-5px_rgba(255,68,68,0.7)]"
    >
      <div className="flex items-start gap-3">
        <Skull className="mt-0.5 h-8 w-8 shrink-0 text-red-200" />
        <div className="space-y-2">
          <p className="text-lg font-black uppercase tracking-wider sm:text-xl">
            !!! LEBENSGEFAHR !!!
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            Deine Auswahl entspricht exakt den Merkmalen der{" "}
            <strong className="underline">tödlich giftigen Knollenblätterpilze</strong>{" "}
            (<em>Amanita phalloides / verna</em>). Berühre den Pilz nicht weiter, wasche
            deine Hände und verzehre ihn unter <strong>keinen</strong> Umständen!
          </p>
        </div>
      </div>
    </div>
  );
}

function SchluesselPage() {
  const { data: mushrooms = [] } = useMushrooms();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [criteria, setCriteria] = useState<Criteria>(EMPTY_CRITERIA);

  const setFruchtschicht = (v: Fruchtschicht) => {
    setCriteria((prev) => ({ ...prev, fruchtschicht: v }));
    setCurrentStep(2);
  };
  const setSporenpulver = (v: Sporenpulver) => {
    setCriteria((prev) => ({ ...prev, sporenpulver: v }));
    setCurrentStep(3);
  };
  const setStielMerkmale = (v: StielMerkmale) => {
    setCriteria((prev) => ({ ...prev, stielMerkmale: v }));
    setCurrentStep(4);
  };

  const goBack = () => setCurrentStep((p) => Math.max(1, p - 1));
  const reset = () => { setCriteria(EMPTY_CRITERIA); setCurrentStep(1); };

  const dangerCombo =
    criteria.fruchtschicht === "lamellen" &&
    criteria.sporenpulver === "weiss" &&
    criteria.stielMerkmale === "knolle";

  const results = useMemo(() => {
    if (currentStep < 4) return [];
    return (mushrooms ?? []).filter((m) => m?.id && matches(m, criteria)).slice(0, 18);
  }, [currentStep, mushrooms, criteria]);

  return (
    <AppShell>
      <section className="space-y-6 pb-10">
        <Link
          to="/"
          className="tactile inline-flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-4 py-2 text-sm font-bold text-[#EADECC] hover:border-[#D97D3E]"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </Link>

        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#132219] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#E9A15A]">
            <Compass className="h-3.5 w-3.5" /> Ausschluss-Schlüssel
          </div>
          <h1 className="font-display text-3xl font-bold text-[#E9A15A] md:text-4xl">
            Was hast du da gefunden?
          </h1>
          <p className="text-sm font-semibold text-[#BCA385]">
            Drei einfache Fragen — wir grenzen für dich ein. Kein Bestimmungs-Ersatz, nur eine erste Hilfe.
          </p>
        </header>

        {/* Progress */}
        <ol className="flex items-center gap-2">
          {[1, 2, 3].map((i) => {
            const active = i === currentStep;
            const filled = i < currentStep;
            return (
              <li key={i} className="flex-1">
                <div
                  className={`h-2 w-full rounded-full transition ${
                    active ? "bg-[#D97D3E]" : filled ? "bg-[#E9A15A]" : "bg-[#1F3327]"
                  }`}
                  aria-label={`Schritt ${i}`}
                />
              </li>
            );
          })}
        </ol>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#BCA385]">
              Schritt 1 · Fruchtschicht
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#EADECC]">
              Wähle die Fruchtschicht der Hutunterseite:
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {STEP1_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFruchtschicht(opt.id)}
                  className={`tactile min-h-[88px] rounded-2xl border-2 p-4 text-left transition ${
                    criteria.fruchtschicht === opt.id
                      ? "border-[#D97D3E] bg-[#132219] shadow-[var(--shadow-glow)]"
                      : "border-[#9A7B56] bg-[#132219] hover:border-[#D97D3E]"
                  }`}
                >
                  <p className="font-display text-base font-bold text-[#EADECC]">{opt.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[#BCA385]">{opt.hint}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#BCA385]">
              Schritt 2 · Sporenpulver / Lamellen
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#EADECC]">
              Welche Farbe hat das Sporenpulver oder die Lamellen?
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {STEP2_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSporenpulver(opt.id)}
                  className={`tactile min-h-[88px] rounded-2xl border-2 p-4 text-left transition ${
                    criteria.sporenpulver === opt.id
                      ? "border-[#D97D3E] bg-[#132219] shadow-[var(--shadow-glow)]"
                      : "border-[#9A7B56] bg-[#132219] hover:border-[#D97D3E]"
                  }`}
                >
                  <p className="font-display text-base font-bold text-[#EADECC]">{opt.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[#BCA385]">{opt.hint}</p>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-start">
              <button
                type="button"
                onClick={goBack}
                className="tactile inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-[#9A7B56] bg-[#132219] px-4 py-2 text-sm font-bold text-[#EADECC] hover:border-[#D97D3E]"
              >
                <ArrowLeft className="h-4 w-4" /> Zurück
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#BCA385]">
              Schritt 3 · Stiel-Basis
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#EADECC]">
              Untersuche die Stielbasis ganz genau:
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {STEP3_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStielMerkmale(opt.id)}
                  className={`tactile min-h-[88px] rounded-2xl border-2 p-4 text-left transition ${
                    criteria.stielMerkmale === opt.id
                      ? "border-[#D97D3E] bg-[#132219] shadow-[var(--shadow-glow)]"
                      : "border-[#9A7B56] bg-[#132219] hover:border-[#D97D3E]"
                  }`}
                >
                  <p className="font-display text-base font-bold text-[#EADECC]">{opt.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[#BCA385]">{opt.hint}</p>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-start">
              <button
                type="button"
                onClick={goBack}
                className="tactile inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-[#9A7B56] bg-[#132219] px-4 py-2 text-sm font-bold text-[#EADECC] hover:border-[#D97D3E]"
              >
                <ArrowLeft className="h-4 w-4" /> Zurück
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 · RESULTS */}
        {currentStep >= 4 && (
          <div className="space-y-4">
            {dangerCombo && <DeathAlert />}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-4 py-3">
              <div className="text-sm font-bold text-[#EADECC]">
                {results.length === 0
                  ? "Keine eindeutigen Treffer."
                  : `${results.length} mögliche${results.length === 1 ? "r Treffer" : " Treffer"} in deiner Datenbank.`}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="tactile inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-[#9A7B56] bg-[#132219] px-3 py-2 text-xs font-bold text-[#EADECC] hover:border-[#D97D3E]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Zurück
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="tactile inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-[#D97D3E] bg-[#132219] px-3 py-2 text-xs font-black text-[#E9A15A] hover:bg-[#1F3327]"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Neu starten
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-2xl border-2 border-orange-700 bg-orange-950/40 p-3 text-xs font-bold text-orange-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Diese Eingrenzung ist nur eine Lern-Hilfe. Vor dem Verzehr <strong>immer</strong> einen
                geprüften Pilzsachverständigen (DGfM) konsultieren.
              </span>
            </div>

            {results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((m) => <MushroomLinkCard key={m.id} m={m} />)}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-6 text-center text-sm font-bold text-[#EADECC]">
                Probiere eine andere Kombination — oder fotografiere den Pilz für den KI-Check.
              </div>
            )}
          </div>
        )}
      </section>
    </AppShell>
  );
}
