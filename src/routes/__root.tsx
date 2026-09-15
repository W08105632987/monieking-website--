import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

// TODO: replace with your real production domain once you've picked a host
// (used for canonical/OG URLs and structured data — see DEPLOYMENT.md).
const SITE_URL = "https://www.monieking.com";
const GA_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { title: "MonieKing | Digital Adashi, Ajo & Esusu" },
      {
        name: "description",
        content:
          "Save with Food Cards or flexible Contribution Cards, backed by a trusted Zone Officer or fully digital — plus wallet, airtime/data, bill payments, and identity verification in one app.",
      },
      {
        name: "keywords",
        content:
          "Adashi, Ajo, Esusu, contribution savings, Nigeria, digital cooperative savings, MonieKing",
      },
      { name: "author", content: "MonieKing" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0b0b0f" },

      { property: "og:title", content: "MonieKing | The Adashi you know, now digital" },
      {
        property: "og:description",
        content:
          "Transparent contribution records, a trusted Zone Officer, wallet services, bill payments, and community support — all in one app.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MonieKing" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MonieKing | The Adashi you know, now digital" },
      {
        name: "twitter:description",
        content:
          "Save, borrow trust, and manage bills — the community contribution system you grew up with, now in an app.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },

      // Structured data so search engines understand this is a real business
      // with a support channel (helps rich results / knowledge panel).
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MonieKing",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon.png`,
          description: "MonieKing is a digital Adashi/Ajo/Esusu contribution savings platform.",
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: "+234-803-899-5252",
              email: "joinmonieking@gmail.com",
              areaServed: "NG",
            },
          ],
        },
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "canonical", href: SITE_URL },
    ],
    // Google Analytics only loads when VITE_GA_MEASUREMENT_ID is set (e.g. in
    // production), so local dev traffic never hits your GA property.
    scripts: GA_ID
      ? [
          { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
          {
            children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
          },
        ]
      : [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
