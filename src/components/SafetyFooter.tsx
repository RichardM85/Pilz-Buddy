import { ShieldAlert, BookMarked } from "lucide-react";

/**
 * Sticky, dezenter Luxus-Safety-Banner für alle Bestimmungs-Screens.
 * Wird unten am Viewport gepinnt – respektiert die Mobile-Bottom-Nav durch optionales `offset`.
 */
export function SafetyFooter({ offsetClass = "bottom-24 md:bottom-5" }: { offsetClass?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 ${offsetClass} z-30 flex justify-center px-4`}
      role="note"
      aria-label="Sicherheitshinweis"
    >
      <div className="glass pointer-events-auto flex max-w-3xl items-start gap-3 rounded-2xl px-5 py-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/20 text-destructive ring-1 ring-destructive/30">
          <ShieldAlert className="h-3.5 w-3.5" />
        </div>
        <p className="text-[11px] leading-relaxed text-foreground/75 md:text-xs">
          <strong className="font-semibold text-destructive">KI-Antworten können Fehler enthalten.</strong>{" "}
          Diese App ist eine <em className="font-semibold text-foreground/90">Bestimmungshilfe</em>, jedoch{" "}
          <strong className="font-semibold">niemals eine Verzehrfreigabe</strong>. Im Zweifel immer einem geprüften{" "}
          <span className="inline-flex items-center gap-1 whitespace-nowrap text-accent">
            <BookMarked className="h-3 w-3" />
            Pilzsachverständigen (DGfM)
          </span>{" "}
          vorlegen.
        </p>
      </div>
    </div>
  );
}
