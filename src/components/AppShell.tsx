import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, GraduationCap, Home, Library, Search, ScanLine, ShoppingBasket, WifiOff } from "lucide-react";
import pilzBuddy from "@/assets/pilz-buddy.png";
import { useAppMode, type AppMode } from "@/lib/appMode";
import { useBasket } from "@/lib/basket";
import { CommandSearch } from "@/components/CommandSearch";
import { MobileCommandSheet } from "@/components/MobileCommandSheet";
import { PilzKumpelChat } from "@/components/PilzKumpelChat";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOnlineStatus } from "@/lib/useOnlineStatus";

type NavItem = {
  label: string;
  icon: typeof Home;
  to?: string;
  search?: Record<string, string>;
  action?: "search" | "switch-field" | "switch-learn";
};

type AppShellProps = {
  children: ReactNode;
  hideNavigation?: boolean;
};

const fieldNavItems: NavItem[] = [
  { label: "KI-Pilzcheck", icon: ScanLine, to: "/", search: { tab: "bestimmung" } },
  { label: "Habitat-Check", icon: ScanLine, to: "/scanner" },
  { label: "Schlüssel", icon: Compass, to: "/schluessel" },
  { label: "Sammelkorb", icon: ShoppingBasket, to: "/basket" },
];

const learnNavItems: NavItem[] = [
  { label: "Start", icon: Home, to: "/" },
  { label: "Lexikon", icon: Library, to: "/lexicon" },
  { label: "Suche", icon: Search, action: "search" },
  { label: "Quiz", icon: GraduationCap, to: "/", search: { tab: "quiz" } },
];

const switchItems: Record<AppMode, NavItem> = {
  field: { label: "Zum Lernmodus", icon: BookOpen, action: "switch-learn" },
  learn: { label: "Zum Feldmodus", icon: ScanLine, action: "switch-field" },
};

function inferMode(path: string, tab?: string): AppMode | null {
  if (path === "/scanner" || path === "/schluessel" || path === "/basket") return "field";
  if (path.startsWith("/lexicon") || path === "/saisonkalender") return "learn";
  if (path === "/" && tab === "bestimmung") return "field";
  if (path === "/" && tab) return "learn";
  return null;
}

export function AppShell({ children, hideNavigation = false }: AppShellProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navigate = useNavigate();
  const { mode, setMode } = useAppMode();
  const isMobile = useIsMobile();
  const online = useOnlineStatus();
  const basket = useBasket();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as { tab?: string } | undefined;

  const effectiveMode = mode ?? inferMode(path, search?.tab);
  const navItems = effectiveMode === "field" ? fieldNavItems : effectiveMode === "learn" ? learnNavItems : [];
  const subtitle =
    effectiveMode === "field"
      ? "Feldmodus · sicher prüfen"
      : effectiveMode === "learn"
        ? "Lernmodus · Wissen aufbauen"
        : "Feldhelfer · DE";

  const isActive = (it: NavItem) => {
    if (it.action === "search") return paletteOpen;
    if (it.action?.startsWith("switch")) return false;
    if (!it.to) return false;
    if (it.to === "/lexicon") return path.startsWith("/lexicon");
    if (it.to === "/" && it.search?.tab) return path === "/" && search?.tab === it.search.tab;
    if (it.to === "/") return path === "/" && !search?.tab;
    return path === it.to;
  };

  const switchMode = (nextMode: AppMode) => {
    setMode(nextMode);
    void navigate(
      nextMode === "field"
        ? { to: "/", search: { tab: "bestimmung" } as never }
        : { to: "/", search: {} as never },
    );
  };

  const renderItem = (it: NavItem, variant: "side" | "bottom") => {
    const Icon = it.icon;
    const active = isActive(it);
    const baseSide =
      "group flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors duration-200";
    const baseBottom =
      "group flex min-h-[64px] min-w-[58px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1.5 py-2 text-[10px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 active:scale-[0.97]";
    const activeCls = active
      ? "bg-accent text-accent-foreground shadow-[var(--shadow-glow)]"
      : variant === "bottom"
        ? "text-[#BCA385] hover:text-[#EADECC] hover:bg-[#9A7B56]/60"
        : "text-foreground/85 hover:text-foreground hover:bg-[#9A7B56]/60";
    const cls = `${variant === "side" ? baseSide : baseBottom} ${activeCls}`;

    const showBadge = it.to === "/basket" && basket.count > 0;
    const content = (
      <>
        <span className="relative">
          <Icon className={variant === "side" ? "h-5 w-5 shrink-0" : "h-6 w-6"} />
          {showBadge && (
            <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D97D3E] px-1 text-[10px] font-black text-white shadow">
              {basket.count}
            </span>
          )}
        </span>
        <span className={variant === "side" ? "" : "leading-none"}>{it.label}</span>
      </>
    );

    if (it.action === "search") {
      return (
        <button key={it.label} onClick={() => setPaletteOpen(true)} className={cls} aria-label="Pilz-Suche öffnen">
          {content}
        </button>
      );
    }

    if (it.action === "switch-field" || it.action === "switch-learn") {
      return (
        <button
          key={it.label}
          onClick={() => switchMode(it.action === "switch-field" ? "field" : "learn")}
          className={cls}
        >
          {content}
        </button>
      );
    }

    return (
      <Link key={it.label} to={it.to!} search={it.search as never} className={cls}>
        {content}
      </Link>
    );
  };

  const showModeNav = Boolean(effectiveMode && !hideNavigation);

  return (
    <div className="relative min-h-screen">
      <div className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-chanterelle/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-moss/[0.05] blur-[140px]" />
      </div>

      <header className="sticky top-0 z-40 border-b-2 border-[#9A7B56] bg-[#132219]/90 backdrop-blur-xl">
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-3 ${showModeNav ? "md:pl-[15.5rem]" : ""}`}>
          <Link to="/" className="tactile flex items-center gap-2.5">
            <img src={pilzBuddy} alt="Pilz-Kumpel" className="h-10 w-10 object-contain" />
            <div className="text-left leading-tight">
              <p className="font-display text-base font-bold tracking-tight text-[#EADECC]">FungaStarter</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BCA385]">{subtitle}</p>
            </div>
          </Link>

          {effectiveMode === "learn" && (
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#1F3327] px-3 py-2 text-xs font-bold text-[#EADECC] transition hover:bg-[#9A7B56] md:inline-flex"
            >
              <Search className="h-3.5 w-3.5 text-[#D97D3E]" />
              <span>Pilz suchen...</span>
            </button>
          )}
        </div>

        {!online && (
          <div
            role="status"
            className="flex items-center justify-center gap-2 border-t-2 border-orange-700 bg-orange-100 px-4 py-1.5 text-[12px] font-bold text-orange-950"
          >
            <WifiOff className="h-3.5 w-3.5" />
            Offline-Modus · Zeige gespeicherte Daten
          </div>
        )}
      </header>

      {showModeNav && (
        <aside aria-label="Hauptnavigation" className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 md:block">
          <div className="glass flex w-56 flex-col gap-1 rounded-3xl p-3 shadow-[var(--shadow-soft)]">
            <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {effectiveMode === "field" ? "Feldmodus" : "Lernmodus"}
            </p>
            {navItems.map((it) => renderItem(it, "side"))}
            <div className="my-2 h-px bg-[#9A7B56]/40" />
            {renderItem(switchItems[effectiveMode!], "side")}
          </div>
        </aside>
      )}

      <main
        className={`mx-auto w-full max-w-6xl overflow-x-hidden overflow-y-auto px-4 pt-6 sm:px-5 ${
          showModeNav ? "pb-28 md:pb-14 md:pl-[15.5rem]" : "pb-14"
        }`}
      >
        {children}
      </main>

      {showModeNav && (
        <nav
          aria-label="Hauptnavigation"
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="mx-2 mb-2 flex items-stretch gap-1 rounded-[28px] border-2 border-[#9A7B56] bg-[#132219]/90 p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            {[...navItems, switchItems[effectiveMode!]].map((it) => renderItem(it, "bottom"))}
          </div>
        </nav>
      )}

      {showModeNav && (
        isMobile ? (
          <MobileCommandSheet open={paletteOpen} onOpenChange={setPaletteOpen} />
        ) : (
          <CommandSearch open={paletteOpen} onOpenChange={setPaletteOpen} />
        )
      )}

      {showModeNav && <PilzKumpelChat />}
    </div>
  );
}
