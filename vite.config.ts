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

// Lovable hosting is the safe default. GitHub Actions opts into the separate
// static SPA build explicitly so missing environment variables can never make
// a Lovable production build emit GitHub-only output.
const githubPagesBuild = process.env["GITHUB_PAGES"] === "true";

// Set BASE_PATH=/repo-name/ when publishing to a project GitHub Pages site.
const basePath = process.env["BASE_PATH"] ?? "/";

export default defineConfig({
  ...(githubPagesBuild ? { nitro: false as const } : {}),
  vite: { base: basePath },
  tanstackStart: githubPagesBuild
    ? {
        // GitHub Pages receives a client-only shell plus prerendered route HTML.
        spa: {
          enabled: true,
          prerender: { outputPath: "/404", autoSubfolderIndex: false, crawlLinks: false },
        },
        pages: staticPages,
        prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
      }
    : {
        // Lovable hosting uses its normal server build and guarded SSR entry.
        server: { entry: "server" },
      },
});
