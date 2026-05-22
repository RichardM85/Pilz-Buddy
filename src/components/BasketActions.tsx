import { useState } from "react";
import { ShoppingBasket, MapPin, Check, Loader2, AlertTriangle } from "lucide-react";
import { useBasket, captureGeolocation, type BasketCoords } from "@/lib/basket";
import type { Mushroom } from "@/lib/useMushrooms";

interface Props {
  mushroom: Pick<Mushroom, "id" | "name_de" | "name_lat" | "type" | "difficulty">;
  compact?: boolean;
}

export function BasketActions({ mushroom, compact = false }: Props) {
  const { add, items } = useBasket();
  const [gpsOn, setGpsOn] = useState(false);
  const [gpsBusy, setGpsBusy] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const inBasket = items.find((i) => i.id === mushroom.id);

  const handleAdd = async () => {
    let coords: BasketCoords | undefined;
    if (gpsOn) {
      setGpsBusy(true);
      setGpsError(null);
      try {
        coords = await captureGeolocation();
      } catch (e) {
        setGpsError(e instanceof Error ? e.message : "GPS-Fehler");
      } finally {
        setGpsBusy(false);
      }
    }
    add({
      id: mushroom.id,
      name_de: mushroom.name_de,
      name_lat: mushroom.name_lat,
      type: mushroom.type,
      difficulty: mushroom.difficulty,
      coords,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-3 rounded-2xl border-2 border-[#9A7B56] bg-[#1F3327] p-4"}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={gpsBusy}
          className="tactile inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D97D3E] px-4 py-3 text-sm font-black text-white shadow-[var(--shadow-glow)] hover:bg-[#E9A15A] disabled:opacity-60 sm:text-base"
        >
          {gpsBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : justAdded ? <Check className="h-5 w-5" /> : <ShoppingBasket className="h-5 w-5" />}
          <span>
            {gpsBusy ? "GPS wird gesucht …" : justAdded ? "Im Korb!" : inBasket ? `Nochmal in den Korb (${inBasket.quantity})` : "In den Korb legen"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setGpsOn((v) => !v); setGpsError(null); }}
          aria-pressed={gpsOn}
          className={`tactile inline-flex min-h-[48px] items-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-bold transition ${
            gpsOn
              ? "border-[#D97D3E] bg-[#132219] text-[#E9A15A]"
              : "border-[#9A7B56] bg-[#132219] text-[#EADECC] hover:border-[#D97D3E]"
          }`}
        >
          <MapPin className={`h-4 w-4 ${gpsOn ? "text-[#E9A15A]" : "text-[#BCA385]"}`} />
          <span>Fundort merken (GPS) {gpsOn ? "· an" : ""}</span>
        </button>
      </div>

      {gpsError && (
        <div className="flex items-start gap-2 rounded-xl border-2 border-orange-700 bg-orange-950/50 px-3 py-2 text-xs font-bold text-orange-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {!compact && (
        <p className="text-[11px] font-semibold leading-snug text-[#BCA385]">
          Dein Korb wird lokal auf diesem Gerät gespeichert — auch ohne Empfang im Wald.
        </p>
      )}
    </div>
  );
}
