import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ORG_ID, ORG_LEGAL_NAME, SITE_NAME, SITE_URL, WEBSITE_ID, absUrl, ldScripts } from "@/lib/seo";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="spectrum-rule mx-auto mb-8 max-w-24" />
        <h1 className="display-lg">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "Prism Group Global | AI Transformation & Applied AI Australia" },
      {
        name: "description",
        content:
          "Prism Group Global is an Australian AI transformation company helping organisations identify, prioritise and implement high-value AI opportunities across growth, operations and customer experience.",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_AU" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b0d14" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: ldScripts(
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: "Prism Group",
        legalName: ORG_LEGAL_NAME,
        description:
          "Prism Group Global is an Australian AI transformation company helping organisations identify, prioritise and implement high-value AI opportunities across growth, operations and customer experience.",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absUrl("/favicon.png"),
        },
        foundingLocation: { "@type": "Country", name: "Australia" },
        areaServed: { "@type": "Country", name: "Australia" },
        founder: {
          "@type": "Person",
          name: "Ajay Natesh",
          jobTitle: "Founder & Managing Director",
          worksFor: { "@id": ORG_ID },
        },
        knowsAbout: [
          "Artificial intelligence",
          "AI transformation",
          "Enterprise technology",
          "Decision intelligence",
          "Automation",
          "Healthcare diagnostics",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+61408065993",
            email: "ajay@spectraiq.ai",
            areaServed: "AU",
            availableLanguage: "English",
          },
        ],
        subOrganization: [
          { "@type": "Organization", name: "Prism Diagnostics", url: "https://prismdiagnostics.com.au/" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-AU",
        publisher: { "@id": ORG_ID },
      },
    ),
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
