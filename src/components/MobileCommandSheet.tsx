import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, Sparkles, Loader2, WifiOff } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { useMushrooms, type Mushroom } from "@/lib/useMushrooms";
import { useOnlineStatus } from "@/lib/useOnlineStatus";

/**
 * Mobile-only search sheet — swipe down to dismiss (vaul Drawer).
 * 56px+ tap targets, AAA contrast, no spinner overlay.
 */
export function MobileCommandSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { data: mushrooms = [], isLoading } = useMushrooms();
  const [query, setQuery] = useState("");
  const online = useOnlineStatus();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = !q
      ? mushrooms.slice(0, 40)
      : mushrooms
          .filter((m: Mushroom) => {
            const syn = Array.isArray(m.synonyms) ? m.synonyms.join(" ") : "";
            return `${m.name_de} ${m.name_lat} ${syn}`.toLowerCase().includes(q);
          })
          .slice(0, 60);
    return list;
  }, [mushrooms, query]);

  const go = (id: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to: "/lexicon/$id", params: { id } });
  };

  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-[#1F3327]/60" />
        <DrawerPrimitive.Content
          className="fixed inset-x-0 bottom-0 z-50 flex h-[88vh] flex-col rounded-t-3xl border-t-2 border-[#D97D3E] bg-[#1F3327] text-foreground outline-none"
          aria-describedby={undefined}
        >
          {/* grab handle */}
          <div className="mx-auto mt-2 mb-3 h-1.5 w-12 shrink-0 rounded-full bg-[#9A7B56]" />
          <DrawerPrimitive.Title className="sr-only">Pilz-Suche</DrawerPrimitive.Title>

          {!online && (
            <div className="mx-4 mb-2 flex items-center gap-2 rounded-xl border-2 border-orange-700 bg-orange-100 px-3 py-2 text-xs font-bold text-orange-950">
              <WifiOff className="h-4 w-4" />
              Offline-Modus · zeige gespeicherte Daten
            </div>
          )}

          <div className="relative mx-4 mb-3 shrink-0">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D97D3E]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Steinpilz, Boletus, Morchel…"
              className="h-14 w-full rounded-2xl border-2 border-[#D97D3E] bg-[#1F3327] pl-12 pr-4 text-base font-semibold text-[#EADECC] placeholder:text-[#BCA385] outline-none focus:border-[#1F3327]"
              inputMode="search"
              enterKeyHint="search"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-8">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 p-8 text-sm font-semibold text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Pilz-Datenbank lädt…
              </div>
            ) : results.length === 0 ? (
              <p className="p-8 text-center text-sm font-semibold text-muted-foreground">
                Kein Pilz gefunden.
              </p>
            ) : (
              <ul className="space-y-1">
                {results.map((m) => (
                  <li key={m.id}>
                    <button
                      onClick={() => go(m.id)}
                      className="flex w-full min-h-[56px] items-center gap-3 rounded-2xl border-2 border-transparent px-3 py-3 text-left transition active:scale-[0.99] active:border-[#D97D3E] active:bg-[#9A7B56]"
                    >
                      <Sparkles className="h-5 w-5 shrink-0 text-accent" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-bold text-foreground">
                          {m.name_de}
                        </div>
                        <div className="truncate text-xs italic text-muted-foreground">
                          {m.name_lat}
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border-2 border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
                        {m.type}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
