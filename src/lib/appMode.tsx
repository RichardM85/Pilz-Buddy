import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppMode = "field" | "learn";

type AppModeContextValue = {
  mode: AppMode | null;
  setMode: (mode: AppMode | null) => void;
};

const STORAGE_KEY = "pf_app_mode";

const AppModeContext = createContext<AppModeContextValue | null>(null);

function readStoredMode(): AppMode | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "field" || stored === "learn" ? stored : null;
}

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode | null>(readStoredMode);

  const setMode = useCallback((nextMode: AppMode | null) => {
    setModeState(nextMode);
    if (typeof window === "undefined") return;
    if (nextMode) window.localStorage.setItem(STORAGE_KEY, nextMode);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const nextMode = readStoredMode();
    setModeState(nextMode);
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>;
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) throw new Error("useAppMode must be used within AppModeProvider");
  return context;
}
