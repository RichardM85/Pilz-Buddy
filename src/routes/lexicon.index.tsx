import { createFileRoute } from "@tanstack/react-router";
import { LexikonRouteView } from "@/components/LexikonShared";

export const Route = createFileRoute("/lexicon/")({
  component: LexikonIndexPage,
});

function LexikonIndexPage() {
  return <LexikonRouteView />;
}