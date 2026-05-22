import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Library, Search, GraduationCap, WifiOff, ShoppingBasket, Compass, ScanLine } from "lucide-react";
import pilzBuddy from "@/assets/pilz-buddy.png";
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
  action?: "search";
};

const navItems: NavItem[] = [
  { label: "Start", icon: Home, to: "/" },
  { label: "Lexikon", icon: Library, to: "/lexicon" },
  { label: "Suche", icon: Search, action: "search" },
  { label: "Quiz", icon: GraduationCap, to: "/", search: { tab: "quiz" } },
];

const sideExtras: NavItem[] = [
  { label: "KI-Pilzcheck", icon: ScanLine, to: "/", search: { tab: "bestimmung" } },
  { label: "Habitat-Scanner", icon: ScanLine, to: "/scanner" },
  { label: "Schlüssel", icon: Compass, to: "/schluessel" },
  { label: "Sammelkorb", icon: ShoppingBasket, to: "/basket" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isMobile = useIsMobile();
  const online = useOnlineStatus();
  const basket = useBasket();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as
    | { tab?: string }
    | undefined;

  const isActive = (it: NavItem) => {
    if (it.action === "search") return paletteOpen;
    if (!it.to) return false;
    if (it.to === "/lexicon") return path.startsWith("/lexicon");
    if (it.to === "/" && it.search?.tab === "quiz") {
      return path === "/" && search?.tab === "quiz";
    }
    if (it.to === "/") return path === "/" && search?.tab !== "quiz";
    return path === it.to;
  };

  const renderItem = (it: NavItem, variant: "side" | "bottom") => {
    const Icon = it.icon;
    const active = isActive(it);
    // Side: 48px+ row.  Bottom: 64px tap target — thumb-zone optimised.
    const baseSide =
      "group flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors duration-200";
    const baseBottom =
      "group flex min-h-[64px] min-w-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 active:scale-[0.97]";
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
        <button
          key={it.label}
          onClick={() => setPaletteOpen(true)}
          className={cls}
          aria-label="Pilz-Suche öffnen"
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        key={it.label}
        to={it.to!}
        search={it.search as never}
        className={cls}
      >
        {content}
      </Link>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient bg — disabled on mobile to save battery (see styles.css .ambient-bg) */}
      <div className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-chanterelle/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-moss/[0.05] blur-[140px]" />
      </div>

      {/* Top header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#9A7B56] bg-[#132219]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:pl-[15.5rem]">
          <Link to="/" className="tactile flex items-center gap-2.5">
            <img src={pilzBuddy} alt="Pilz-Kumpel" className="h-10 w-10 object-contain" />
            <div className="text-left leading-tight">
              <p className="font-display text-base font-bold tracking-tight text-[#EADECC]">
                FungaStarter
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BCA385]">
                Pilz-Kumpel · DE
              </p>
            </div>
          </Link>

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-full border-2 border-[#D97D3E] bg-[#1F3327] px-3 py-2 text-xs font-bold text-[#EADECC] transition hover:bg-[#9A7B56] md:inline-flex"
          >
            <Search className="h-3.5 w-3.5 text-[#D97D3E]" />
            <span>Pilz suchen…</span>
          </button>
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

      {/* Desktop sidebar */}
      <aside
        aria-label="Hauptnavigation"
        className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      >
        <div className="glass flex w-56 flex-col gap-1 rounded-3xl p-3 shadow-[var(--shadow-soft)]">
          <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Navigation
          </p>
          {navItems.map((it) => renderItem(it, "side"))}
          <div className="my-2 h-px bg-[#9A7B56]/40" />
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Feldhelfer
          </p>
          {sideExtras.map((it) => renderItem(it, "side"))}
        </div>
      </aside>

      <main className="mx-auto w-full max-w-6xl overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 sm:px-5 md:pb-14 md:pl-[15.5rem]">
        {children}
      </main>


      {/* Mobile glass bottom-nav — full-width thumb zone, safe-area aware */}
      <nav
        aria-label="Hauptnavigation"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-2 mb-2 flex items-stretch gap-1 rounded-[28px] border-t-2 border-x-2 border-b-2 border-[#9A7B56] bg-[#132219]/90 p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          {navItems.map((it) => renderItem(it, "bottom"))}
        </div>
      </nav>

      {isMobile ? (
        <MobileCommandSheet open={paletteOpen} onOpenChange={setPaletteOpen} />
      ) : (
        <CommandSearch open={paletteOpen} onOpenChange={setPaletteOpen} />
      )}

      <PilzKumpelChat />
    </div>
  );
}
