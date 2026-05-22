import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Camera, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bestimmung } from "@/components/modules/Bestimmung";
import { useAppMode } from "@/lib/appMode";

type FieldTab = "home" | "bestimmung";
type FieldSearch = { tab?: FieldTab };

export const Route = createFileRoute("/field")({
  validateSearch: (raw: Record<string, unknown>): FieldSearch => ({
    tab: raw.tab === "bestimmung" ? "bestimmung" : undefined,
  }),
  component: FieldRoute,
});

function FieldHome({ onStart }: { onStart: (tab: FieldTab) => void }) {
  const navigate = useNavigate({ from: "/field" });

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border-2 border-[#D97D3E] bg-gradient-to-br from-[#D97D3E] to-[#8F432A] p-6 text-white shadow-[var(--shadow-glow)] md:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/75">Feldmodus</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-tight md:text-6xl">Fund im Feld prüfen</h1>
        <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-white/90 md:text-lg">
          Schneller, mobiler Ablauf für draußen: erst Bildcheck, dann Habitat und Merkmale einordnen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => onStart("bestimmung")}
            className="tactile inline-flex min-h-[52px] items-center gap-2 rounded-2xl bg-[#132219] px-5 py-3 font-black text-[#F0E0CC] hover:bg-[#1F3327]"
          >
            <Camera className="h-5 w-5" />
            KI-Pilzcheck starten
          </button>
          <button
            onClick={() => navigate({ to: "/scanner" })}
            className="tactile inline-flex min-h-[52px] items-center gap-2 rounded-2xl border-2 border-white/40 bg-white/12 px-5 py-3 font-black text-white hover:bg-white/20"
          >
            <MapPin className="h-5 w-5" />
            Habitat-Check öffnen
          </button>
        </div>
      </div>
    </section>
  );
}

function FieldRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/field" });
  const { setMode } = useAppMode();
  const [tab, setTab] = useState<FieldTab>(search.tab ?? "home");

  useEffect(() => {
    setMode("field");
  }, [setMode]);

  useEffect(() => {
    setTab(search.tab ?? "home");
  }, [search.tab]);

  const updateTab = (nextTab: FieldTab) => {
    setTab(nextTab);
    void navigate({
      search: nextTab === "home" ? {} : ({ tab: nextTab } as never),
      replace: false,
    });
  };

  return (
    <AppShell>
      <div id="module-anchor" />
      <div className="animate-fade-slide space-y-8">
        {tab === "home" && <FieldHome onStart={updateTab} />}
        {tab === "bestimmung" && <Bestimmung />}
      </div>
      <footer className="mt-20 border-t border-[#9A7B56] pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Mit 🍄 für Wald-Neulinge gemacht. <strong className="text-foreground/80">Wichtig:</strong> Diese App ersetzt keinen Pilzberater. Sammle nur, was du sicher kennst.
      </footer>
    </AppShell>
  );
}
