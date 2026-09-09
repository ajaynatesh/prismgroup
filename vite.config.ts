// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Every public route, prerendered to static HTML at build time so GitHub Pages can
// serve each URL with its own SEO metadata. Keep in sync with src/routes and the sitemap.
const staticPages = [
  "/",
  "/about",
  "/capabilities",
  "/capabilities/ai-transformation",
  "/capabilities/enterprise-technology",
  "/ventures",
  "/ventures/spectraiq",
  "/ventures/decisioniq",
  "/ventures/tradelink",
  "/ventures/alwayson",
  "/ventures/prism-diagnostics",
  "/technology",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
  "/security",
].map((path) => ({ path }));

// Inside Lovable the nitro deploy plugin is pinned by env; outside it (GitHub Actions)
// we want a purely static client build with no server bundle.
const insideLovable = Boolean(process.env["LOVABLE_NITRO_PRESET"]);

// Set BASE_PATH=/repo-name/ when publishing to a project GitHub Pages site.
const basePath = process.env["BASE_PATH"] ?? "/";

export default defineConfig({
  ...(insideLovable ? {} : { nitro: false as const }),
  vite: { base: basePath },
  tanstackStart: insideLovable
    ? {
        // Lovable hosting uses its normal server build and the guarded SSR entry.
        server: { entry: "server" },
      }
    : {
        // GitHub Pages receives a client-only shell plus prerendered route HTML.
        spa: {
          enabled: true,
          prerender: { outputPath: "/404", autoSubfolderIndex: false, crawlLinks: false },
        },
        pages: staticPages,
        prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
      },
});
