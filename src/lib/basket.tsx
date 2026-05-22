import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface BasketCoords {
  lat: number;
  lon: number;
  accuracy?: number;
  capturedAt: string; // ISO
}

export interface BasketItem {
  id: string; // mushroom id
  name_de: string;
  name_lat: string;
  type?: string;
  difficulty?: string;
  quantity: number;
  addedAt: string; // ISO
  coords?: BasketCoords;
}

interface BasketContextValue {
  items: BasketItem[];
  count: number;
  add: (m: Omit<BasketItem, "quantity" | "addedAt"> & { coords?: BasketCoords }) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  updateCoords: (id: string, coords: BasketCoords | undefined) => void;
}

const LS_KEY = "funga_basket_v1";
const Ctx = createContext<BasketContextValue | null>(null);
const EMPTY_BASKET: BasketContextValue = {
  items: [],
  count: 0,
  add: () => undefined,
  inc: () => undefined,
  dec: () => undefined,
  remove: () => undefined,
  clear: () => undefined,
  updateCoords: () => undefined,
};

function readLS(): BasketItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const v = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter((item): item is BasketItem => (
      item != null
      && typeof item === "object"
      && typeof item.id === "string"
      && typeof item.name_de === "string"
      && typeof item.name_lat === "string"
      && Number.isFinite(item.quantity)
      && item.quantity > 0
    ));
  } catch {
    return [];
  }
}
function writeLS(items: BasketItem[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch { /* ignore */ }
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate AFTER mount → SSR-safe (no localStorage on the server)
  useEffect(() => {
    setItems((current) => (current.length > 0 ? current : readLS()));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) writeLS(items); }, [items, ready]);

  const value: BasketContextValue = {
    items,
    count: items.reduce((s, i) => s + Math.max(0, Number(i.quantity) || 0), 0),
    add: (m) => setItems((cur) => {
      const id = String(m.id || "");
      if (!id || !m.name_de || !m.name_lat) return cur;
      const idx = cur.findIndex((x) => x.id === id);
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = {
          ...next[idx],
          quantity: Math.max(1, Number(next[idx].quantity) || 1) + 1,
          coords: m.coords ?? next[idx].coords,
        };
        return next;
      }
      return [...cur, { ...m, id, quantity: 1, addedAt: new Date().toISOString() }];
    }),
    inc: (id) => setItems((cur) => cur.map((i) => i.id === id ? { ...i, quantity: Math.max(1, Number(i.quantity) || 1) + 1 } : i)),
    dec: (id) => setItems((cur) =>
      cur.flatMap((i) => i.id === id
        ? (Math.max(1, Number(i.quantity) || 1) > 1 ? [{ ...i, quantity: Math.max(1, Number(i.quantity) || 1) - 1 }] : [])
        : [i])),
    remove: (id) => setItems((cur) => cur.filter((i) => i.id !== id)),
    clear: () => setItems([]),
    updateCoords: (id, coords) => setItems((cur) => cur.map((i) => i.id === id ? { ...i, coords } : i)),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBasket() {
  const v = useContext(Ctx);
  return v ?? EMPTY_BASKET;
}

/** Promise-based geolocation wrapper with graceful fallback. */
export function captureGeolocation(): Promise<BasketCoords> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation wird von diesem Gerät nicht unterstützt."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        capturedAt: new Date().toISOString(),
      }),
      (err) => {
        const msg = err.code === err.PERMISSION_DENIED
          ? "Standort-Zugriff verweigert. Du kannst trotzdem speichern."
          : err.code === err.POSITION_UNAVAILABLE
            ? "Kein GPS-Signal (typisch im dichten Wald). Speichere ohne Koordinaten."
            : "GPS-Anfrage zu langsam. Versuche es nochmal oder speichere ohne.";
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    );
  });
}
