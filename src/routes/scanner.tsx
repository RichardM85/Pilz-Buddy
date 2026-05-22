import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Camera, Upload, ScanLine, Trees, Mountain, CalendarDays,
  Sparkles, ArrowRight, RotateCcw, Library,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Habitat-Check Demo · FungaStarter" },
      { name: "description", content: "Demo-Platzhalter für den künftigen Habitat-Check." },
      { property: "og:title", content: "Habitat-Check Demo · FungaStarter" },
      { property: "og:description", content: "Noch keine echte ökologische Foto-Analyse." },
    ],
  }),
  component: ScannerPage,
});

type Profile = {
  id: "buchen-kiefern" | "fichten-nadel" | "mischwald-eichen";
  bäume: string;
  boden: string;
  empfehlung: (month: number) => string;
  matches: string[]; // lexicon search terms (q)
};

const PROFILES: Profile[] = [
  {
    id: "buchen-kiefern",
    bäume: "75 % Rotbuchen · 25 % Kiefern",
    boden: "Sauer, nährstoffreich, bemoost",
    empfehlung: (m) =>
      m >= 3 && m <= 5
        ? "Perfektes Habitat! Halte Ausschau nach dem Maipilz im Moos oder frühen Hexenröhrlingen nahe den Buchen."
        : "Buchen-Mischwald: Steinpilz & Pfifferling (Jul-Okt), im Frühjahr Maipilz & Morcheln.",
    matches: ["Maipilz", "Hexenröhrling", "Steinpilz"],
  },
  {
    id: "fichten-nadel",
    bäume: "80 % Fichten · Nadelwald",
    boden: "Sauer, nadelstreubedeckt, humos",
    empfehlung: (m) =>
      m >= 3 && m <= 5
        ? "Nadelstreuboden erkannt. Ideale Zeit, um nach Speise-Morcheln an lichten Waldrändern zu suchen."
        : "Nadelwald: Maronen-Röhrling & Fichten-Steinpilz (Aug-Okt), an Lichtungen Pfifferling.",
    matches: ["Morchel", "Maronen", "Steinpilz"],
  },
  {
    id: "mischwald-eichen",
    bäume: "60 % Eichen · 40 % Birken",
    boden: "Lehmig, leicht sauer, laubbedeckt",
    empfehlung: (m) =>
      m >= 3 && m <= 5
        ? "Laubwald-Profil. Frühjahrslorcheln möglich — Vorsicht giftig! Bald Rotkappen & Birkenpilz."
        : "Klassisches Sammlerhabitat: Rotkappe, Birkenpilz & Eichen-Rotkappe (Jul-Okt).",
    matches: ["Rotkappe", "Birkenpilz"],
  },
];

const MONTHS_DE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

type Stage = "idle" | "scanning" | "result";

function ScannerPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const now = new Date();
  const monthIdx = now.getMonth();
  const monthLabel = `${MONTHS_DE[monthIdx]} ${now.getFullYear()}`;

  const runAnalysis = (imageDataUrl: string | null) => {
    setPreview(imageDataUrl);
    setStage("scanning");
    window.setTimeout(() => {
      const pick = PROFILES[Math.floor(Math.random() * PROFILES.length)];
      setProfile(pick);
      setStage("result");
    }, 2000);
  };

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => runAnalysis(String(e.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setStage("idle");
    setPreview(null);
    setProfile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <AppShell>
      <section className="space-y-6">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#D97D3E]">
            <ScanLine className="h-3.5 w-3.5" /> Demo-Platzhalter
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-[#E9A15A] md:text-5xl">
            Habitat-Check Demo
          </h1>
          <p className="max-w-2xl text-sm font-semibold text-[#EADECC]/90 md:text-base">
            Noch keine echte Analyse: Diese Ansicht simuliert Habitat-Ergebnisse mit Beispieldaten.
            Der echte MVP-Habitat-Check folgt als eigener manueller Fragebogen.
          </p>
        </header>

        {/* Viewfinder */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#9A7B56] bg-[#0D1A12] shadow-[var(--shadow-soft)]">
          <div className="relative aspect-[4/3] w-full">
            {preview ? (
              <img src={preview} alt="Scan-Vorschau" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,125,62,0.12),transparent_60%)]">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-[#9A7B56]" />
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#BCA385]">
                      Kamera-Sucher bereit
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Corner brackets */}
            {(["tl", "tr", "bl", "br"] as const).map((c) => (
              <span
                key={c}
                className={`pointer-events-none absolute h-8 w-8 border-[#D97D3E] ${
                  c === "tl" ? "left-3 top-3 border-l-4 border-t-4" :
                  c === "tr" ? "right-3 top-3 border-r-4 border-t-4" :
                  c === "bl" ? "bottom-3 left-3 border-b-4 border-l-4" :
                                "bottom-3 right-3 border-b-4 border-r-4"
                }`}
              />
            ))}

            {/* Scanning overlay */}
            {stage === "scanning" && (
              <div className="absolute inset-0 bg-[#132219]/70 backdrop-blur-[2px]">
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D97D3E] to-transparent shadow-[0_0_24px_4px_rgba(217,125,62,0.7)]"
                  style={{ animation: "scanLine 1.6s ease-in-out infinite" }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="rounded-2xl border-2 border-[#D97D3E] bg-[#1F3327]/90 px-5 py-3 text-center">
                    <p className="font-display text-lg font-bold text-[#E9A15A] animate-pulse">
                      Demo-Auswertung läuft…
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#BCA385]">
                      Simulierte Beispieldaten
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <style>{`@keyframes scanLine { 0% { top: 4%; } 50% { top: 92%; } 100% { top: 4%; } }`}</style>

        {/* Actions */}
        {stage === "idle" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => {
                runAnalysis(null);
              }}
              className="tactile flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-2 border-[#D97D3E] bg-[#D97D3E] px-5 py-3 text-base font-bold text-[#132219] shadow-[var(--shadow-glow)] transition hover:bg-[#E9A15A]"
            >
              <Camera className="h-5 w-5" /> Demo ohne Foto starten
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="tactile flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] px-5 py-3 text-base font-bold text-[#EADECC] hover:border-[#D97D3E]"
            >
              <Upload className="h-5 w-5 text-[#D97D3E]" /> Bild hochladen
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
              }}
            />
          </div>
        )}

        {/* Result dashboard */}
        {stage === "result" && profile && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <DataCard icon={Trees} label="Erkannte Bäume" value={profile.bäume} />
              <DataCard icon={Mountain} label="Bodenbeschaffenheit" value={profile.boden} />
              <DataCard icon={CalendarDays} label="Zeitfaktor" value={monthLabel} />
            </div>

            <div className="rounded-3xl border-2 border-[#D97D3E] bg-gradient-to-br from-[#1F3327] to-[#132219] p-6 shadow-[var(--shadow-glow)]">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[#E9A15A]" />
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D97D3E]">
                    Demo-Empfehlung · keine echte Konfidenz
                  </p>
                  <p className="font-display text-lg font-bold leading-snug text-[#EADECC] md:text-xl">
                    {profile.empfehlung(monthIdx)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {profile.matches.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border-2 border-[#9A7B56] bg-[#132219] px-3 py-1 text-xs font-bold text-[#EADECC]"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/lexicon"
                  search={{ q: profile.matches[0] }}
                  className="tactile inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#D97D3E] px-5 py-2.5 text-sm font-bold text-[#132219] hover:bg-[#E9A15A]"
                >
                  <Library className="h-4 w-4" />
                  Passende Pilze im Lexikon anzeigen
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={reset}
                  className="tactile inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-5 py-2.5 text-sm font-bold text-[#EADECC] hover:border-[#D97D3E]"
                >
                  <RotateCcw className="h-4 w-4" /> Neuen Scan starten
                </button>
              </div>
            </div>

          </div>
        )}
      </section>
    </AppShell>
  );
}

function DataCard({
  icon: Icon, label, value,
}: { icon: typeof Trees; label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-4">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#D97D3E]">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <p className="mt-2 font-display text-base font-bold leading-snug text-[#EADECC]">{value}</p>
    </div>
  );
}
