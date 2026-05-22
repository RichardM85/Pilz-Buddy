import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpen, Library } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ForagingWidget } from "@/components/modules/ForagingWidget";
import { Formen } from "@/components/modules/Formen";
import { Grundlagen } from "@/components/modules/Grundlagen";
import { Guide } from "@/components/modules/Guide";
import { Lebensstile } from "@/components/modules/Lebensstile";
import { Mysterium } from "@/components/modules/Mysterium";
import { Mythen } from "@/components/modules/Mythen";
import { Quiz } from "@/components/modules/Quiz";
import { useAppMode } from "@/lib/appMode";
import type { TaxonomyId } from "@/lib/taxonomy";

type LearnTab = "home" | "grundlagen" | "wetter" | "mysterium" | "mythen" | "lebensstile" | "formen" | "guide" | "quiz";
type LearnSearch = { tab?: LearnTab };

const VALID_LEARN_TABS: LearnTab[] = ["home", "grundlagen", "wetter", "mysterium", "mythen", "lebensstile", "formen", "guide", "quiz"];

export const Route = createFileRoute("/learn")({
  validateSearch: (raw: Record<string, unknown>): LearnSearch => ({
    tab: (VALID_LEARN_TABS as string[]).includes(raw.tab as string) && raw.tab !== "home"
      ? (raw.tab as LearnTab)
      : undefined,
  }),
  component: LearnRoute,
});

function LearnHome({ onStart }: { onStart: (tab: LearnTab) => void }) {
  const navigate = useNavigate({ from: "/learn" });

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border-2 border-[#9A7B56] bg-[#1F3327] p-6 text-[#EADECC] shadow-[var(--shadow-soft)] md:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#BCA385]">Lernmodus</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-tight text-[#F0E0CC] md:text-6xl">
          Pilzwissen aufbauen
        </h1>
        <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-[#D8C5AC] md:text-lg">
          Lerne Arten, Merkmale und Verwechslungen Schritt für Schritt, ohne den Feldworkflow zu überladen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onStart("grundlagen")}
            className="tactile inline-flex min-h-[52px] items-center gap-2 rounded-2xl bg-[#D97D3E] px-5 py-3 font-black text-white shadow-[var(--shadow-glow)]"
          >
            <BookOpen className="h-5 w-5" />
            Grundlagen starten
          </button>
          <button
            onClick={() => navigate({ to: "/lexicon" })}
            className="tactile inline-flex min-h-[52px] items-center gap-2 rounded-2xl border-2 border-[#9A7B56] bg-[#132219] px-5 py-3 font-black text-[#F0E0CC] hover:border-[#D97D3E]"
          >
            <Library className="h-5 w-5" />
            Lexikon öffnen
          </button>
        </div>
      </div>
    </section>
  );
}

function LearnRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/learn" });
  const { setMode } = useAppMode();
  const [tab, setTab] = useState<LearnTab>(search.tab ?? "home");

  useEffect(() => {
    setMode("learn");
  }, [setMode]);

  useEffect(() => {
    setTab(search.tab ?? "home");
  }, [search.tab]);

  const updateTab = (nextTab: LearnTab) => {
    setTab(nextTab);
    void navigate({
      search: nextTab === "home" ? {} : ({ tab: nextTab } as never),
      replace: false,
    });
  };

  const jumpToLexikon = (typeId: TaxonomyId) => {
    void navigate({ to: "/lexicon", search: { cat: typeId } });
  };

  return (
    <AppShell>
      <div id="module-anchor" />
      <div className="animate-fade-slide space-y-8">
        {tab === "home" && <LearnHome onStart={updateTab} />}
        {tab === "grundlagen" && <Grundlagen />}
        {tab === "wetter" && <ForagingWidget />}
        {tab === "mysterium" && <Mysterium />}
        {tab === "mythen" && <Mythen />}
        {tab === "lebensstile" && <Lebensstile />}
        {tab === "formen" && <Formen onJumpToLexikon={jumpToLexikon} />}
        {tab === "guide" && <Guide />}
        {tab === "quiz" && <Quiz />}
      </div>
      <footer className="mt-20 border-t border-[#9A7B56] pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Mit 🍄 für Wald-Neulinge gemacht. <strong className="text-foreground/80">Wichtig:</strong> Diese App ersetzt keinen Pilzberater. Sammle nur, was du sicher kennst.
      </footer>
    </AppShell>
  );
}
