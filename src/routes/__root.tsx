import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/400.css";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AgeGate } from "../components/AgeGate";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold tracking-tighter text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-bold">Η σελίδα δεν βρέθηκε</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
          >
            Επιστροφή στην αρχική
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight">Κάτι πήγε στραβά</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Δοκιμάστε να ανανεώσετε ή επιστρέψτε στην αρχική.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-widest"
          >
            Δοκιμή ξανά
          </button>
          <a href="/" className="border border-border px-4 py-2 text-sm font-medium">
            Αρχική
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ilektronikatsigara.gr — Ηλεκτρονικά Τσιγάρα, Disposables, Υγρά, Ναργιλέδες" },
      {
        name: "description",
        content:
          "Ο κορυφαίος ελληνικός προορισμός για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης και ναργιλέδες. Αυθεντικά προϊόντα και εξειδίκευση.",
      },
      { name: "author", content: "ilektronikatsigara.gr" },
      { name: "geo.region", content: "GR" },
      { name: "geo.country", content: "Greece" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ilektronikatsigara.gr" },
      { property: "og:locale", content: "el_GR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ilektronikatsigara.gr",
          url: "/",
          description:
            "Ηλεκτρονικά τσιγάρα, disposable vapes, υγρά αναπλήρωσης και ναργιλέδες στην Ελλάδα.",
          areaServed: "GR",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="el">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
      <AgeGate />
    </QueryClientProvider>
  );
}
