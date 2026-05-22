import { createFileRoute } from "@tanstack/react-router";
import { MushroomDetailPage } from "@/components/LexikonShared";

export const Route = createFileRoute("/lexicon/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Pilz · ${params.id.slice(0, 8)} · FungaStarter` },
    ],
  }),
  component: DetailPage,
});

function DetailPage() {
  const { id } = Route.useParams();
  return <MushroomDetailPage id={id} />;
}
