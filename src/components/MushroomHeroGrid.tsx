import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMushrooms } from "@/lib/useMushrooms";

function MushroomHeroGridBase() {
  const navigate = useNavigate();
  const { data: mushrooms = [] } = useMushrooms();
  const items = mushrooms.slice(0, 10);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2.5 rounded-[2rem] border-2 border-[#9A7B56] bg-[#132219] p-3 sm:gap-3 sm:p-4 md:gap-4 md:p-6">
      {items.map((m) => (
        <button
          key={m.id}
          onClick={() => navigate({ to: "/lexicon/$id", params: { id: m.id } })}
          className="tactile flex h-24 min-h-[96px] flex-col justify-center rounded-xl border-2 border-[#9A7B56] bg-[#1F3327] p-3 text-left transition-transform hover:border-[#D97D3E] active:scale-[0.97]"
        >
          <span className="break-words text-sm font-bold leading-tight tracking-tight text-[#EADECC] hyphens-auto">
            {m.name_de}
          </span>
          <span className="mt-1 truncate font-mono text-[11px] font-semibold italic text-[#BCA385]">
            {m.name_lat}
          </span>
        </button>
      ))}
    </div>

  );
}

export const MushroomHeroGrid = React.memo(MushroomHeroGridBase);
export default MushroomHeroGrid;
