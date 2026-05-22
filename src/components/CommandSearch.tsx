import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, Loader2 } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMushrooms, type Mushroom } from "@/lib/useMushrooms";

export function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { data: mushrooms = [], isLoading } = useMushrooms();
  const [query, setQuery] = useState("");

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mushrooms.slice(0, 20);
    return mushrooms
      .filter((m: Mushroom) => {
        const syn = Array.isArray(m.synonyms) ? m.synonyms.join(" ") : "";
        const hay = `${m.name_de} ${m.name_lat} ${syn}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 30);
  }, [mushrooms, query]);

  const go = (id: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to: "/lexicon/$id", params: { id } });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Pilz suchen – z. B. Steinpilz, Boletus, Morchel…"
      />
      <CommandList>
        {isLoading && (
          <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Pilz-Datenbank lädt…
          </div>
        )}
        {!isLoading && (
          <>
            <CommandEmpty>Kein Pilz gefunden.</CommandEmpty>
            <CommandGroup heading={query ? "Treffer" : "Vorschläge"}>
              {results.map((m) => (
                <CommandItem
                  key={m.id}
                  value={`${m.name_de} ${m.name_lat}`}
                  onSelect={() => go(m.id)}
                  className="flex items-start gap-3"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-semibold text-foreground">
                      {m.name_de}
                    </div>
                    <div className="truncate text-xs italic text-muted-foreground">
                      {m.name_lat}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border-2 border-border bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
                    {m.type}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
