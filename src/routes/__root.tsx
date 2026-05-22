import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { BasketProvider } from "@/lib/basket";
import { AmbientLeaves } from "@/components/AmbientLeaves";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Diese Seite ist im Myzel verschwunden.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Zurück zum Wald</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold">Ups, ein Pilz im Getriebe.</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Nochmal versuchen</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FungaStarter – Pilzkunde für absolute Neulinge" },
      { name: "description", content: "Spore-tacular! Lerne spielerisch die Welt der Pilze kennen – mit interaktiven Modulen, Lebensstilen und einem Pilz-Kumpel-Diplom." },
      { property: "og:title", content: "FungaStarter – Pilzkunde für absolute Neulinge" },
      { property: "og:description", content: "Spore-tacular! Lerne spielerisch die Welt der Pilze kennen – mit interaktiven Modulen, Lebensstilen und einem Pilz-Kumpel-Diplom." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "FungaStarter – Pilzkunde für absolute Neulinge" },
      { name: "twitter:description", content: "Spore-tacular! Lerne spielerisch die Welt der Pilze kennen – mit interaktiven Modulen, Lebensstilen und einem Pilz-Kumpel-Diplom." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8370ead-d4d4-4b46-b7d6-53ad43b5ad95/id-preview-fa52756a--98df7747-cb12-44fd-89e8-faf7eb195520.lovable.app-1779281132559.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8370ead-d4d4-4b46-b7d6-53ad43b5ad95/id-preview-fa52756a--98df7747-cb12-44fd-89e8-faf7eb195520.lovable.app-1779281132559.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Nunito:wght@400;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <head><HeadContent /></head>
      <body style={{ fontFamily: "Nunito, system-ui, sans-serif" }}>
        <BasketProvider>{children}</BasketProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AmbientLeaves />
      <Outlet />
    </QueryClientProvider>
  );
}
