import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, CalendarDays, Flame } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useMushrooms } from "@/lib/useMushrooms";
import {
  MONTH_SHORT_DE,
  MONTH_LABELS_DE,
  seasonMonthsArray,
  peakMonthsArray,
} from "@/lib/seasonMonths";

export const Route = createFileRoute("/saisonkalender")({
  head: () => ({
    meta: [
      { title: "Saisonkalender · FungaStarter" },
      { name: "description", content: "Ganzjährige Pilz-Saisontabelle: wann welche Art im Wald wächst, mit Hochsaison-Markierung." },
      { property: "og:title", content: "Saisonkalender · FungaStarter" },
      { property: "og:description", content: "Wann wächst was? Ganzjähriger Pilz-Saisonkalender." },
    ],
  }),
  component: SaisonkalenderPage,
});

function SaisonkalenderPage() {
  const { data: mushrooms = [] } = useMushrooms();
  const currentMonth = new Date().getMonth();

  const rows = useMemo(() => {
    return (mushrooms ?? [])
      .map((m) => ({
        m,
        months: seasonMonthsArray(m.season),
        peaks: new Set(peakMonthsArray(m.season)),
      }))
      .filter((r) => r.months.length > 0)
      .sort((a, b) => a.m.name_de.localeCompare(b.m.name_de, "de"));
  }, [mushrooms]);

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
            <CalendarDays className="h-3.5 w-3.5" /> Wann wächst was?
          </div>
          <h1 className="font-display text-3xl font-bold text-[#E9A15A] md:text-4xl">
            Saisonkalender · ganzjährig
          </h1>
          <p className="text-sm font-semibold text-[#BCA385]">
            {rows.length} Arten · aktueller Monat ist <strong className="text-[#EADECC]">{MONTH_LABELS_DE[currentMonth]}</strong>.
            Orange = Saison, gefüllt + Flamme = Hochsaison.
          </p>
        </header>

        <div className="overflow-x-auto rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] shadow-[var(--shadow-soft)]">
          <table className="w-full min-w-[680px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[#1F3327] px-4 py-3 text-left font-display text-xs font-black uppercase tracking-[0.14em] text-[#BCA385]">
                  Pilz
                </th>
                {MONTH_SHORT_DE.map((label, i) => (
                  <th
                    key={label}
                    className={`px-2 py-3 text-center text-[11px] font-black uppercase tracking-wider ${
                      i === currentMonth ? "text-[#E9A15A]" : "text-[#BCA385]"
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ m, months, peaks }) => {
                const set = new Set(months);
                return (
                  <tr key={m.id} className="border-t border-[#4A5D52]/60">
                    <td className="sticky left-0 z-10 bg-[#1F3327] px-4 py-2">
                      <Link
                        to="/lexicon/$id"
                        params={{ id: m.id }}
                        className="block hover:text-[#E9A15A]"
                      >
                        <p className="font-display text-sm font-bold text-[#EADECC]">{m.name_de}</p>
                        <p className="truncate text-[11px] italic text-[#BCA385]">{m.name_lat}</p>
                      </Link>
                    </td>
                    {MONTH_SHORT_DE.map((_, i) => {
                      const inSeason = set.has(i);
                      const peak = peaks.has(i);
                      const isNow = i === currentMonth;
                      return (
                        <td key={i} className="px-1 py-2 text-center align-middle">
                          <div
                            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-md border-2 transition ${
                              peak
                                ? "border-[#D97D3E] bg-[#D97D3E] text-white"
                                : inSeason
                                ? "border-[#E9A15A] bg-[#E9A15A]/30 text-[#E9A15A]"
                                : "border-[#4A5D52] bg-[#1A2E23]/60"
                            } ${isNow ? "ring-2 ring-[#E9A15A] ring-offset-2 ring-offset-[#1F3327]" : ""}`}
                            aria-label={
                              peak ? "Hochsaison" : inSeason ? "Saison" : "ausserhalb der Saison"
                            }
                          >
                            {peak && <Flame className="h-3.5 w-3.5" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-4 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-4 text-xs font-bold text-[#EADECC]">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border-2 border-[#D97D3E] bg-[#D97D3E] text-white">
              <Flame className="h-3 w-3" />
            </span>
            Hochsaison
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 rounded-md border-2 border-[#E9A15A] bg-[#E9A15A]/30" />
            Saison
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 rounded-md border-2 border-[#4A5D52] bg-[#1A2E23]/60" />
            ausserhalb
          </div>
          <div className="ml-auto text-[#BCA385]">
            Daten ökol. abgeleitet aus dem Saison-Feld der Lexikon-Einträge.
          </div>
        </div>
      </section>
    </AppShell>
  );
}
