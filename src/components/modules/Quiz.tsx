import { useMemo, useState } from "react";
import { GraduationCap, RotateCcw, Check, X as XIcon, Award, CheckSquare, Square, Sprout, Compass, Trophy } from "lucide-react";
import { Confetti } from "../Confetti";
import { CuteMushroom } from "../MushroomIcons";
import { quizQuestions, type QuizQuestion, type QuizDifficulty } from "@/data/quizQuestions";

/**
 * Pilz-Kumpel-Diplom — 30 zufällige Fragen pro Schwierigkeitstier.
 * Tiers: Anfänger (easy) · Fortgeschritten (medium) · Profi (hard).
 * Multi-correct: alle richtigen Antworten finden, keine falschen tippen.
 */

type Q = {
  id: string;
  q: string;
  options: string[];
  correct: number[];
  explanation?: string;
};

// Untagged legacy questions zählen als "intermediate" (Fortgeschritten).
const POOL: (Q & { difficulty: QuizDifficulty })[] = quizQuestions.map((q: QuizQuestion) => ({
  id: `q-${q.id}`,
  q: q.question,
  options: q.options,
  correct: q.correctAnswers,
  explanation: q.explanation,
  difficulty: (q.difficulty ?? "intermediate") as QuizDifficulty,
}));

const QUIZ_SIZE = 30;

function buildQuizSet(difficulty: QuizDifficulty): Q[] {
  const arr = POOL.filter((p) => p.difficulty === difficulty);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(QUIZ_SIZE, arr.length));
}

function sameSet(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

const TIERS: {
  key: QuizDifficulty;
  label: string;
  icon: typeof Sprout;
  blurb: string;
}[] = [
  { key: "beginner", label: "Anfänger", icon: Sprout, blurb: "Klare Grundregeln, unverwechselbare Merkmale, absolute No-Gos." },
  { key: "intermediate", label: "Fortgeschritten", icon: Compass, blurb: "Anatomie im Detail: Ringbewegung, Verfärbungen, Geruch." },
  { key: "expert", label: "Profi", icon: Trophy, blurb: "Taxonomie, lateinische Namen, Ökologie und Häufigkeitsskala." },
];

export function Quiz() {
  const [tier, setTier] = useState<QuizDifficulty | null>(null);
  const [runId, setRunId] = useState(0);
  const quizSet = useMemo(() => (tier ? buildQuizSet(tier) : []), [tier, runId]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // ---------- Tier selection screen ----------
  if (!tier) {
    return (
      <section className="space-y-6">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D97D3E]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E9A15A]">
            <GraduationCap className="h-3.5 w-3.5" /> Pilz-Kumpel-Diplom
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold text-[#E9A15A] md:text-5xl">
            Wähle dein Level
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#BCA385]">
            30 zufällige Fragen pro Runde – passend zu deinem Wissensstand.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map(({ key, label, icon: Icon, blurb }) => {
            const count = POOL.filter((p) => p.difficulty === key).length;
            return (
              <button
                key={key}
                onClick={() => {
                  setTier(key);
                  setIdx(0);
                  setPicked([]);
                  setLocked(false);
                  setScore(0);
                  setDone(false);
                  setRunId((r) => r + 1);
                }}
                className="group flex flex-col items-start gap-3 rounded-3xl border-2 border-[#9A7B56] bg-[#16271D] p-6 text-left transition hover:-translate-y-1 hover:border-[#D97D3E] hover:shadow-[var(--shadow-glow)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D97D3E]/20 text-[#E9A15A] transition group-hover:bg-[#D97D3E] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl font-bold text-[#E9A15A]">{label}</h3>
                <p className="text-sm text-[#EADECC]">{blurb}</p>
                <span className="mt-auto text-xs font-bold uppercase tracking-wider text-[#BCA385]">
                  {count} Fragen im Pool
                </span>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  const total = quizSet.length;
  const q = quizSet[idx];

  const backToTiers = () => setTier(null);

  // Fallback falls Pool für gewähltes Tier leer
  if (total === 0 || !q) {
    return (
      <section className="rounded-3xl border-2 border-[#9A7B56] bg-[#16271D] p-8 text-center">
        <p className="text-[#EADECC]">Für diese Stufe sind aktuell noch keine Fragen verfügbar.</p>
        <button
          onClick={backToTiers}
          className="mt-4 rounded-full bg-[#D97D3E] px-6 py-3 font-bold text-white"
        >
          Zurück zur Auswahl
        </button>
      </section>
    );
  }

  const toggle = (i: number) => {
    if (locked) return;
    setPicked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const submit = () => {
    if (picked.length === 0 || locked) return;
    setLocked(true);
    if (sameSet(picked, q.correct)) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked([]);
      setLocked(false);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked([]);
    setLocked(false);
    setScore(0);
    setDone(false);
    setRunId((r) => r + 1);
  };

  const tierLabel = TIERS.find((t) => t.key === tier)?.label ?? "";

  if (done) {
    const passed = score >= Math.ceil(total * 0.6);
    return (
      <section className="space-y-6">
        {passed && <Confetti />}
        <div className="animate-pop-in rounded-3xl border-2 border-[#9A7B56] bg-[#16271D] p-8 text-center shadow-[var(--shadow-glow)] md:p-12">
          <CuteMushroom className="mx-auto h-32 w-32 animate-float" color="red" />
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#D97D3E] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Award className="h-4 w-4" /> Pilz-Kumpel-Diplom · {tierLabel}
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold text-[#E9A15A] md:text-5xl">
            {passed ? "FungaStarter Buddy bestanden!" : "Fast Fun-gi!"}
          </h2>
          <p className="mt-3 text-lg text-[#EADECC]">
            {passed
              ? `Du hast ${score}/${total} richtig. Der Wald ruft – und du bist bereit.`
              : `${score}/${total} – noch ein bisschen Sporen sammeln, dann klappt's!`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full bg-[#D97D3E] px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              <RotateCcw className="h-4 w-4" /> Neuer Versuch
            </button>
            <button
              onClick={backToTiers}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#9A7B56] bg-[#1F3327] px-6 py-3 font-semibold text-[#EADECC] transition hover:border-[#D97D3E]"
            >
              Anderes Level wählen
            </button>
          </div>
        </div>
      </section>
    );
  }

  const progressPct = (idx / total) * 100;
  const multi = q.correct.length > 1;

  return (
    <section className="space-y-6">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D97D3E]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E9A15A]">
          <GraduationCap className="h-3.5 w-3.5" /> Pilz-Kumpel-Diplom · {tierLabel}
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold text-[#E9A15A] md:text-5xl">
          FungaStarter Buddy-Diplom
        </h2>
        <button
          onClick={backToTiers}
          className="mt-3 text-xs font-bold uppercase tracking-wider text-[#BCA385] underline-offset-4 hover:text-[#E9A15A] hover:underline"
        >
          ← Level wechseln
        </button>
      </header>

      <div className="flex items-center justify-between text-sm font-bold text-[#EADECC]">
        <span>
          Frage <span className="text-[#E9A15A]">{idx + 1}</span> von {total}
        </span>
        <span className="text-[#D97D3E]">Punkte: {score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#1F3327] border border-[#9A7B56]">
        <div
          className="h-full bg-gradient-to-r from-[#D97D3E] to-[#E9A15A] transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div
        key={q.id}
        className="animate-pop-in rounded-3xl border-2 border-[#9A7B56] bg-[#16271D] p-6 shadow-[var(--shadow-soft)] md:p-8"
      >
        {multi && (
          <p className="mb-3 inline-block rounded-full bg-[#1F3327] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#BCA385]">
            Mehrere Antworten möglich
          </p>
        )}
        <h3 className="font-display text-2xl font-bold text-[#E9A15A]">{q.q}</h3>

        <div className="mt-6 space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = q.correct.includes(i);
            const isPicked = picked.includes(i);

            let cls =
              "border-[#9A7B56] bg-[#1F3327] text-[#EADECC] hover:-translate-y-0.5 hover:border-[#D97D3E]";
            if (isPicked && !locked) {
              cls = "border-[#D97D3E] bg-[#D97D3E]/15 text-[#EADECC]";
            }
            if (locked) {
              if (isCorrect) cls = "border-emerald-400 bg-emerald-500/15 text-[#EADECC]";
              else if (isPicked) cls = "border-red-500 bg-red-500/15 text-[#EADECC]";
              else cls = "border-[#4A5D52] bg-[#1A2E23]/60 text-[#BCA385] opacity-70";
            }

            const Box = isPicked ? CheckSquare : Square;

            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                disabled={locked}
                className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left font-semibold transition ${cls}`}
              >
                <span className="flex items-center gap-3">
                  <Box className="h-5 w-5 shrink-0" />
                  <span>{opt}</span>
                </span>
                {locked && isCorrect && <Check className="h-5 w-5 text-emerald-400" />}
                {locked && isPicked && !isCorrect && <XIcon className="h-5 w-5 text-red-400" />}
              </button>
            );
          })}
        </div>

        {locked && (
          <div className="animate-pop-in mt-5 space-y-2 rounded-2xl border border-[#9A7B56]/60 bg-[#1F3327] p-4 text-sm text-[#EADECC]">
            <strong className="block text-[#E9A15A]">
              {sameSet(picked, q.correct)
                ? "🍄 Richtig!"
                : `Knapp daneben. Richtig: ${q.correct
                    .map((i) => q.options[i])
                    .join(" • ")}`}
            </strong>
            {q.explanation && (
              <p className="text-[#BCA385]">💡 {q.explanation}</p>
            )}
          </div>
        )}

        {!locked ? (
          <button
            onClick={submit}
            disabled={picked.length === 0}
            className="mt-5 w-full rounded-full bg-[#D97D3E] py-3 font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Antwort bestätigen
          </button>
        ) : (
          <button
            onClick={next}
            className="mt-5 w-full rounded-full bg-[#D97D3E] py-3 font-bold text-white transition hover:scale-[1.02]"
          >
            {idx + 1 >= total ? "Diplom ansehen 🎓" : "Nächste Frage →"}
          </button>
        )}
      </div>
    </section>
  );
}
