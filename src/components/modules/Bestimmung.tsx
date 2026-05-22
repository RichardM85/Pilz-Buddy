import { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera, Upload, Scissors, Eye, Layers, Sparkles, Loader2, AlertTriangle,
  RefreshCw, CheckCircle2, X, MapPin, Calendar, ShieldCheck, Info, ScanSearch,
  ListChecks, ShieldAlert, BookMarked, ExternalLink, Skull,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { taxonomyById, type TaxonomyGroup } from "@/lib/taxonomy";
import { SafetyFooter } from "@/components/SafetyFooter";
import { identifyMushroom, type BestimmungResult } from "@/lib/bestimmung.functions";

type Mushroom = Tables<"mushrooms">;

type SlotId = "hut" | "unten" | "schnitt";
type Slot = {
  id: SlotId;
  title: string;
  hint: string;
  icon: typeof Camera;
};

const SLOTS: Slot[] = [
  { id: "hut", title: "1 · Hutseite", hint: "Aufsicht von oben – komplette Hutform sichtbar.", icon: Eye },
  { id: "unten", title: "2 · Fruchtschicht & Fuß", hint: "Unterseite (Röhren/Lamellen/Leisten/Poren) + Stielbasis.", icon: Layers },
  { id: "schnitt", title: "3 · Schnittbild", hint: "Längs durchgeschnitten – Verfärbungen im Fleisch?", icon: Scissors },
];

const SPINNER_MESSAGES = [
  "Myzel-Netzwerk wird abgefragt…",
  "Fruchtschicht-Geometrie wird analysiert…",
  "Stiel-Merkmale werden abgeglichen…",
  "Sporenfarbe wird berechnet…",
  "Vergleiche mit 300 Referenzarten…",
];

const DANGEROUS_DIFFICULTIES = new Set(["Giftig", "Tödlich Giftig"]);

function confidenceTone(c: number) {
  if (c >= 85) return { label: "Sehr sicher", cls: "bg-moss/15 text-moss border-moss/30" };
  if (c >= 70) return { label: "Ziemlich sicher", cls: "bg-accent/20 text-bark border-accent/40" };
  return { label: "Nur Tendenz", cls: "bg-destructive/10 text-destructive border-destructive/30" };
}

function PhotoSlot({
  slot, file, onPick, onClear, analyzing, index,
}: { slot: Slot; file: string | null; onPick: (f: File) => void; onClear: () => void; analyzing: boolean; index: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = slot.icon;
  const code = String(index + 1).padStart(2, "0");
  return (
    <div className="group rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-4 transition-all duration-500 hover:border-[#D97D3E]">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D97D3E]/15 text-[#D97D3E]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#EADECC]">{slot.title}</p>
          <p className="text-[11px] font-medium text-[#BCA385]">{slot.hint}</p>
        </div>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#BCA385]">{code}</span>
        {file && (
          <button onClick={onClear} className="rounded-full bg-[#132219] p-1 text-[#BCA385] hover:text-destructive" aria-label="Entfernen">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        onClick={() => inputRef.current?.click()}
        className="tactile viewfinder mt-3 block w-full overflow-hidden rounded-xl border-2 border-[#9A7B56] bg-[#132219]"
      >
        <span className="vf-bl" /><span className="vf-br" />
        {/* Scientific coordinate readouts */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[9px] font-bold tracking-[0.25em] text-[#BCA385]">FIG·{code}</span>
        <span className="pointer-events-none absolute right-3 top-3 z-10 font-mono text-[9px] font-bold tracking-[0.25em] text-[#BCA385]">{code}/03</span>
        <span className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[9px] font-bold tracking-[0.2em] text-[#BCA385]">N 50°06′ · E 08°41′</span>
        <span className="pointer-events-none absolute bottom-3 right-3 z-10 font-mono text-[9px] font-bold tracking-[0.2em] text-[#BCA385]">ISO·320 ƒ/2.8</span>
        {/* Center crosshair */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[10px] w-px -translate-x-1/2 -translate-y-1/2 bg-[#BCA385]/40" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[10px] -translate-x-1/2 -translate-y-1/2 bg-[#BCA385]/40" />

        {file ? (
          <div className="relative">
            <img src={file} alt={slot.title} className="h-44 w-full object-cover" />
            {analyzing && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent" />
                <div className="animate-scan pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_18px_4px_rgba(245,168,80,0.55)]" />
              </>
            )}
          </div>
        ) : (
          <div className="flex h-44 flex-col items-center justify-center gap-1.5 text-[#BCA385] transition group-hover:text-[#D97D3E]">
            <Upload className="h-6 w-6" />
            <span className="text-xs font-bold tracking-wide">Foto wählen</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70">Tap to capture</span>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function difficultyStyle(d: string) {
  if (d === "Idiotensicher") return { cls: "bg-emerald-50 border-2 border-emerald-700 text-emerald-950 font-black", Icon: ShieldCheck, label: d };
  if (d === "Anfänger" || d === "Fortgeschritten") return { cls: "bg-green-50 border-2 border-green-600 text-green-950 font-bold", Icon: ShieldCheck, label: d };
  if (d === "Experte" || d === "Ungenießbar") return { cls: "bg-stone-100 border-2 border-stone-600 text-stone-900 font-medium", Icon: Info, label: d };
  if (d === "Tödlich Giftig") return { cls: "bg-red-50 border-2 border-red-700 text-red-950 font-black animate-pulse", Icon: Skull, label: d };
  if (d === "Giftig") return { cls: "bg-orange-50 border-2 border-orange-600 text-orange-950 font-extrabold", Icon: AlertTriangle, label: d };
  return { cls: "bg-stone-100 border-2 border-stone-600 text-stone-900 font-medium", Icon: Info, label: d || "Aufpassen" };
}

export function Bestimmung() {
  const [photos, setPhotos] = useState<Record<SlotId, string | null>>({
    hut: null, unten: null, schnitt: null,
  });
  const photosB64 = useRef<Record<SlotId, string | null>>({
    hut: null, unten: null, schnitt: null,
  });
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [spinIdx, setSpinIdx] = useState(0);
  const [result, setResult] = useState<{
    mushroom: Mushroom;
    confidence: number;
    group?: TaxonomyGroup;
    ai?: BestimmungResult;
  } | null>(null);
  const [dangerAck, setDangerAck] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const identify = useServerFn(identifyMushroom);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("mushrooms").select("*");
      setMushrooms(data ?? []);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!analyzing) return;
    const t = setInterval(() => setSpinIdx((i) => (i + 1) % SPINNER_MESSAGES.length), 900);
    return () => clearInterval(t);
  }, [analyzing]);

  const allFilled = useMemo(
    () => photos.hut && photos.unten && photos.schnitt,
    [photos],
  );

  const fileToDataUrl = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => reject(r.error);
      r.readAsDataURL(f);
    });

  const pickFile = async (slot: SlotId, f: File) => {
    const url = URL.createObjectURL(f);
    setPhotos((p) => {
      if (p[slot]) URL.revokeObjectURL(p[slot]!);
      return { ...p, [slot]: url };
    });
    try {
      photosB64.current[slot] = await fileToDataUrl(f);
    } catch {
      photosB64.current[slot] = null;
    }
  };

  const clearSlot = (slot: SlotId) => {
    setPhotos((p) => {
      if (p[slot]) URL.revokeObjectURL(p[slot]!);
      return { ...p, [slot]: null };
    });
    photosB64.current[slot] = null;
  };

  const reset = () => {
    Object.values(photos).forEach((u) => u && URL.revokeObjectURL(u));
    setPhotos({ hut: null, unten: null, schnitt: null });
    photosB64.current = { hut: null, unten: null, schnitt: null };
    setResult(null);
    setDangerAck(false);
    setAiError(null);
  };

  const analyze = async () => {
    if (!allFilled || mushrooms.length === 0) return;
    setAnalyzing(true);
    setResult(null);
    setDangerAck(false);
    setAiError(null);
    try {
      const photosPayload = (["hut", "unten", "schnitt"] as SlotId[])
        .map((slot) => ({ slot, dataUrl: photosB64.current[slot] }))
        .filter((p): p is { slot: SlotId; dataUrl: string } => !!p.dataUrl);

      const candidates = mushrooms.map((m) => ({
        id: m.id,
        name_de: m.name_de,
        name_lat: m.name_lat,
        type: m.type,
        difficulty: m.difficulty,
        merkmale: Array.isArray(m.merkmale) ? (m.merkmale as string[]).slice(0, 4) : [],
      }));

      const ai = await identify({ data: { photos: photosPayload, candidates } });

      const pick = ai.id ? mushrooms.find((m) => m.id === ai.id) : null;
      if (!pick) {
        setAiError(
          "Die KI konnte keine sichere Zuordnung treffen. Probiere bessere Fotos (Tageslicht, Hut + Unterseite + Schnitt scharf) oder frag einen Pilzsachverständigen.",
        );
      } else {
        const group = taxonomyById(pick.type);
        setResult({ mushroom: pick, confidence: ai.confidence, group, ai });
      }
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Unbekannter KI-Fehler.");
    } finally {
      setAnalyzing(false);
    }
  };

  const isDangerous = result && DANGEROUS_DIFFICULTIES.has(result.mushroom.difficulty);

  return (
    <section className="space-y-6 pb-32">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
          <ScanSearch className="h-3.5 w-3.5" /> KI-Modul · Beta
        </div>
        <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Pilz-Bestimmung</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Drei Fotos, eine echte KI-Analyse (GPT-4o Vision) gegen unsere Lexikon-Arten — mit nachvollziehbarem Bestimmungspfad. Du bleibst kritisch.
        </p>
      </header>

      {/* Warnung */}
      <div className="flex items-start gap-3 rounded-2xl border-2 border-destructive/40 bg-destructive/10 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <p className="text-sm leading-relaxed text-foreground/85">
          <strong className="text-destructive">WICHTIG:</strong> Die KI ist ein Assistent, <strong>keine Verzehrfreigabe</strong>.
          Vergleiche IMMER mit den Merkmalen im Lexikon und frage im Zweifel einen Pilzsachverständigen (DGfM)!
        </p>
      </div>

      {/* Foto-Slots */}
      <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-bold text-primary">
            <Camera className="h-4 w-4 text-accent" /> Dein Foto-Trio
          </h3>
          {(photos.hut || photos.unten || photos.schnitt) && (
            <button onClick={reset} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-destructive">
              <RefreshCw className="h-3 w-3" /> Zurücksetzen
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {SLOTS.map((s, i) => (
            <PhotoSlot
              key={s.id}
              slot={s}
              file={photos[s.id]}
              onPick={(f) => pickFile(s.id, f)}
              onClear={() => clearSlot(s.id)}
              analyzing={analyzing}
              index={i}
            />
          ))}
        </div>

        <p className="text-[11px] italic text-muted-foreground">
          Tipp: Tageslicht, ruhiger Hintergrund, Hut wenn möglich nicht angefressen. Optional Sporenabdruck später dazu.
        </p>

        <button
          onClick={analyze}
          disabled={!allFilled || analyzing || loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> {SPINNER_MESSAGES[spinIdx]}
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              {allFilled ? "Pilz analysieren" : `Noch ${3 - Object.values(photos).filter(Boolean).length} Foto(s) fehlen`}
            </>
          )}
        </button>
      </div>

      {aiError && (
        <div className="flex items-start gap-3 rounded-2xl border-2 border-orange-700 bg-orange-50 p-4 text-sm font-bold text-orange-950">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{aiError}</span>
        </div>
      )}

      {/* Ergebnis */}
      {result && <ResultCard mushroom={result.mushroom} confidence={result.confidence} group={result.group} ai={result.ai} />}

      {/* Full-screen danger modal */}
      {isDangerous && !dangerAck && (
        <DangerModal mushroom={result!.mushroom} onAck={() => setDangerAck(true)} />
      )}

      <SafetyFooter />
    </section>
  );
}

function DangerModal({ mushroom, onAck }: { mushroom: Mushroom; onAck: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-destructive/85 p-6 backdrop-blur-md animate-[fade-in_.2s_ease-out]">
      <div className="max-w-md rounded-3xl border-4 border-destructive-foreground/30 bg-destructive p-8 text-center text-destructive-foreground shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive-foreground/15 ring-4 ring-destructive-foreground/30">
          <Skull className="h-10 w-10" />
        </div>
        <h3 className="mt-5 text-3xl font-black uppercase tracking-wide">🚨 Vorsicht!</h3>
        <p className="mt-3 text-base leading-relaxed">
          Die KI vermutet einen <strong>{mushroom.difficulty.toLowerCase() === "tödlich giftig" ? "TÖDLICH GIFTIGEN" : "GIFTIGEN"}</strong> Pilz:
        </p>
        <p className="mt-2 text-xl font-bold">{mushroom.name_de}</p>
        <p className="text-sm italic opacity-80">{mushroom.name_lat}</p>
        <p className="mt-5 text-sm font-semibold leading-relaxed">
          Niemals berühren oder essen, wenn du nicht zu 100 % sicher bist. Auch der bloße Hautkontakt mancher Arten ist riskant.
        </p>
        <button
          onClick={onAck}
          className="mt-6 w-full rounded-full bg-destructive-foreground px-6 py-3 font-bold text-destructive transition hover:scale-[1.02]"
        >
          Verstanden – Details ansehen
        </button>
      </div>
    </div>
  );
}

function ResultCard({ mushroom, confidence, group, ai }: { mushroom: Mushroom; confidence: number; group?: TaxonomyGroup; ai?: BestimmungResult }) {
  const tone = confidenceTone(confidence);
  const d = difficultyStyle(mushroom.difficulty);
  const DIcon = d.Icon;
  const dangerous = DANGEROUS_DIFFICULTIES.has(mushroom.difficulty);

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[var(--shadow-soft)] animate-pop-in">
      <div className={`p-6 text-primary-foreground ${dangerous ? "bg-gradient-to-br from-destructive via-destructive to-bark" : "bg-gradient-to-br from-primary via-forest to-forest-deep"}`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-90">
          <CheckCircle2 className="h-4 w-4" /> KI-Vermutung
        </div>
        <h3 className="mt-2 text-3xl font-bold">{mushroom.name_de}</h3>
        <p className="text-sm italic opacity-80">{mushroom.name_lat}</p>

        <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-card/15 px-4 py-2 backdrop-blur">
          <span className="text-2xl font-bold">{confidence}%</span>
          <span className={`rounded-full border bg-card/90 px-2 py-0.5 text-xs font-bold ${tone.cls}`}>{tone.label}</span>
        </div>

        {ai?.rationale && (
          <p className="mt-3 text-sm italic leading-relaxed opacity-95">„{ai.rationale}"</p>
        )}
      </div>

      <div className="space-y-5 p-6">
        {/* KI-Bestimmungspfad */}
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <ListChecks className="h-3.5 w-3.5 text-accent" /> Bestimmungspfad der KI
          </h4>
          <ol className="mt-3 space-y-2.5">
            <Step n="1" title="Fruchtschicht-Analyse">
              {ai?.reasoning.fruchtschicht ?? (group ? `Foto 2 zeigt: ${group.fruchtschicht}.` : "—")}
            </Step>
            <Step n="2" title="Gruppen-Einordnung" tone={group?.safetyTone}>
              {ai?.reasoning.gruppe ?? (group ? group.safetyFact : "—")}
            </Step>
            <Step n="3" title="Merkmals-Abgleich">
              {ai?.reasoning.merkmale ?? `Hut, Stiel & Schnittbild verglichen → Treffer: ${confidence}% ${mushroom.name_de}.`}
            </Step>
            {ai?.reasoning.warnung && (
              <Step n="!" title="Sicherheits-Hinweis" tone="danger">
                {ai.reasoning.warnung}
              </Step>
            )}
          </ol>
        </div>

        <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${d.cls}`}>
          <DIcon className="h-3.5 w-3.5" /> {d.label}
        </div>

        <Row icon={Calendar} label="Saison">{mushroom.season}</Row>
        <Row icon={MapPin} label="Lebensraum">{mushroom.habitat}</Row>

        <div className="rounded-2xl bg-secondary/50 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Merkmale aus dem Lexikon
          </h4>
          <ul className="mt-2 space-y-1.5">
            {mushroom.merkmale.map((m, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> Verwechslungsgefahr
          </h4>
          <p className="mt-2 text-sm leading-relaxed">{mushroom.verwechslung}</p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-chanterelle-soft/20 p-4">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bark">
            <Info className="h-3.5 w-3.5" /> Fun-gi Fact
          </h4>
          <p className="mt-1 text-sm italic">„{mushroom.fun_fact}"</p>
        </div>

        <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-4 text-xs">
          <p className="flex items-center gap-2 font-semibold text-foreground/80">
            <BookMarked className="h-3.5 w-3.5 text-primary" /> Für tiefere Studien & Verzehrfreigaben:
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://www.pilzfinder.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 font-semibold text-primary hover:bg-accent/20">
              Pilzfinder.de <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <a href="https://www.123pilze.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 font-semibold text-primary hover:bg-accent/20">
              123Pilze.de <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <a href="https://www.dgfm-ev.de" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 font-semibold text-primary hover:bg-accent/20">
              DGfM-Sachverständige <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/10 p-3 text-center text-xs font-semibold text-destructive">
          <ShieldAlert className="mr-1 inline h-3.5 w-3.5" />
          Keine Verzehrfreigabe! Im Zweifel immer Pilzsachverständigen fragen.
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, tone, children }: { n: string; title: string; tone?: "safe" | "warn" | "danger" | "info"; children: React.ReactNode }) {
  const toneCls =
    tone === "safe" ? "bg-moss text-primary-foreground" :
    tone === "danger" ? "bg-destructive text-destructive-foreground" :
    tone === "warn" ? "bg-accent text-accent-foreground" :
    "bg-primary text-primary-foreground";
  return (
    <li className="flex gap-3 text-sm">
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${toneCls}`}>{n}</span>
      <div>
        <p className="font-semibold text-primary">{title}</p>
        <p className="mt-0.5 text-foreground/85">{children}</p>
      </div>
    </li>
  );
}

function Row({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3 text-accent" /> {label}
      </h4>
      <p className="mt-0.5 text-sm">{children}</p>
    </div>
  );
}
