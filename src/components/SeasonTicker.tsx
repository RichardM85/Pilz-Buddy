import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarClock, Flame, ChevronRight } from "lucide-react";
import { useMushrooms } from "@/lib/useMushrooms";
import { isInSeason, isPeakSeason, MONTH_LABELS_DE } from "@/lib/seasonMonths";
import { SpeciesImage } from "@/components/SpeciesImage";

export function SeasonTicker() {
  const { data: mushrooms = [] } = useMushrooms();
  const month = new Date().getMonth();
  const monthLabel = MONTH_LABELS_DE[month];

  const inSeason = useMemo(() => {
    return mushrooms
      .map((m) => ({ m, peak: isPeakSeason(m.season, month) }))
      .filter(({ m }) => isInSeason(m.season, month))
      // peaks first, then alphabetical
      .sort((a, b) => (Number(b.peak) - Number(a.peak)) || a.m.name_de.localeCompare(b.m.name_de, "de"))
      .slice(0, 24);
  }, [mushrooms, month]);

  if (inSeason.length === 0) return null;

  return (
    <section
      aria-label={`Pilze in Saison im ${monthLabel}`}
      className="space-y-3 rounded-3xl border-2 border-[#9A7B56] bg-[#1F3327] p-5 shadow-[var(--shadow-soft)]"
    >
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#132219] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#E9A15A]">
            <CalendarClock className="h-3.5 w-3.5" /> Aktuell · {monthLabel}
          </div>
          <h2 className="mt-2 flex items-center gap-2 font-display text-2xl font-bold text-[#E9A15A] md:text-3xl">
            Das wächst JETZT gerade
            <Link
              to="/saisonkalender"
              aria-label="Ganzjähriger Saisonkalender"
              title="Ganzjähriger Saisonkalender"
              className="tactile inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#9A7B56] bg-[#132219] text-[#E9A15A] hover:border-[#D97D3E] hover:text-[#D97D3E]"
            >
              <CalendarClock className="h-4 w-4" />
            </Link>
          </h2>
          <p className="text-sm font-semibold text-[#BCA385]">
            {inSeason.length} Arten haben jetzt Saison im Wald.
          </p>
        </div>
        <Link
          to="/saisonkalender"
          className="tactile hidden items-center gap-1 rounded-full border-2 border-[#9A7B56] bg-[#132219] px-3 py-2 text-xs font-bold text-[#EADECC] hover:border-[#D97D3E] sm:inline-flex"
        >
          Ganzjahres-Kalender <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-2">
        {inSeason.map(({ m, peak }) => (
          <Link
            key={m.id}
            to="/lexicon/$id"
            params={{ id: m.id }}
            className="tactile group relative w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-[#9A7B56] bg-[#132219] hover:border-[#D97D3E] hover:shadow-[var(--shadow-glow)]"
          >
            <SpeciesImage
              nameLat={m.name_lat}
              nameDe={m.name_de}
              type={m.type}
              difficulty={m.difficulty}
              variant="card"
            />
            {peak && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#D97D3E] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                <Flame className="h-3 w-3" /> Hochsaison
              </span>
            )}
            <div className="p-3">
              <p className="truncate font-display text-sm font-bold text-[#EADECC]">{m.name_de}</p>
              <p className="truncate text-[11px] italic text-[#BCA385]">{m.name_lat}</p>
              <p className="mt-1 truncate text-[10px] font-semibold text-[#9A7B56]">{m.season}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
