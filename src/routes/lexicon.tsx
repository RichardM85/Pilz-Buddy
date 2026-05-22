import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

type LexikonSearch = { cat?: string; diff?: string; q?: string };

export const Route = createFileRoute("/lexicon")({
  validateSearch: (raw: Record<string, unknown>): LexikonSearch => ({
    cat: typeof raw.cat === "string" ? raw.cat : undefined,
    diff: typeof raw.diff === "string" ? raw.diff : undefined,
    q: typeof raw.q === "string" ? raw.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pilz-Lexikon · FungaStarter" },
      { name: "description", content: "Über 300 europäische Pilzarten, filterbar nach Gruppe und Schwierigkeit." },
      { property: "og:title", content: "Pilz-Lexikon · FungaStarter" },
      { property: "og:description", content: "Über 300 europäische Pilzarten, filterbar nach Gruppe und Schwierigkeit." },
    ],
  }),
  component: LexikonLayout,
});

function LexikonLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
