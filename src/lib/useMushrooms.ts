import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Mushroom = Tables<"mushrooms">;

const LS_LIST = "fk:mushrooms:list:v1";
const LS_ONE = "fk:mushroom:v1:";

function lsRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function lsWrite(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}

/**
 * Offline-first: hydrate instantly from permanent localStorage cache, then
 * background-refresh from Supabase. Cached payloads NEVER expire — once a
 * forager has loaded the lexicon at home, the full dataset survives a
 * zero-signal deep-forest session.
 */
export function useMushrooms() {
  return useQuery({
    queryKey: ["mushrooms"],
    initialData: () => lsRead<Mushroom[]>(LS_LIST) ?? undefined,
    queryFn: async (): Promise<Mushroom[]> => {
      const { data, error } = await supabase
        .from("mushrooms")
        .select("*")
        .order("name_de");
      if (error) {
        const cached = lsRead<Mushroom[]>(LS_LIST);
        if (cached) return cached; // graceful offline fallback
        throw error;
      }
      const rows = data ?? [];
      lsWrite(LS_LIST, rows);
      return rows;
    },
    staleTime: 5 * 60_000,
    networkMode: "offlineFirst",
  });
}

export function useMushroom(id: string | undefined) {
  return useQuery({
    queryKey: ["mushroom", id],
    enabled: !!id,
    initialData: () => (id ? lsRead<Mushroom>(LS_ONE + id) ?? undefined : undefined),
    queryFn: async (): Promise<Mushroom | null> => {
      const { data, error } = await supabase
        .from("mushrooms")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) {
        const cached = lsRead<Mushroom>(LS_ONE + id);
        if (cached) return cached;
        throw error;
      }
      if (data) lsWrite(LS_ONE + id, data);
      return data ?? null;
    },
    staleTime: 5 * 60_000,
    networkMode: "offlineFirst",
  });
}

