import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

// lastmod reflects genuine content changes; update only when a page's content materially changes.
const routes: Array<{ path: string; priority: string; changefreq: string; lastmod: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-10-16" },
  { path: "/about", priority: "0.8", changefreq: "monthly", lastmod: "2026-10-01" },
  { path: "/capabilities", priority: "0.9", changefreq: "monthly", lastmod: "2026-09-20" },
  { path: "/capabilities/ai-transformation", priority: "0.9", changefreq: "monthly", lastmod: "2026-10-10" },
  { path: "/capabilities/enterprise-technology", priority: "0.9", changefreq: "monthly", lastmod: "2026-09-20" },
  { path: "/case-studies", priority: "0.8", changefreq: "monthly", lastmod: "2026-10-05" },
  { path: "/case-studies/intelligent-procurement", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-25" },
  { path: "/case-studies/intelligent-supply-chain", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-28" },
  { path: "/case-studies/continuous-risk-compliance", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-28" },
  { path: "/case-studies/intelligent-finance-operations", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-28" },
  { path: "/case-studies/tradelink-whatsapp", priority: "0.7", changefreq: "monthly", lastmod: "2026-10-02" },
  { path: "/case-studies/decisioniq-mining", priority: "0.7", changefreq: "monthly", lastmod: "2026-10-02" },
  { path: "/ventures", priority: "0.9", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ventures/spectraiq", priority: "0.8", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ventures/decisioniq", priority: "0.8", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ventures/tradelink", priority: "0.8", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ventures/alwayson", priority: "0.8", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ventures/prism-diagnostics", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/technology", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-15" },
  { path: "/ai-opportunity-advisor", priority: "0.9", changefreq: "monthly", lastmod: "2026-10-16" },
  { path: "/insights", priority: "0.6", changefreq: "weekly", lastmod: "2026-09-15" },
  { path: "/contact", priority: "0.8", changefreq: "yearly", lastmod: "2026-09-10" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly", lastmod: "2026-09-01" },
  { path: "/terms", priority: "0.3", changefreq: "yearly", lastmod: "2026-09-01" },
  { path: "/security", priority: "0.4", changefreq: "yearly", lastmod: "2026-09-01" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${absUrl(r.path)}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
