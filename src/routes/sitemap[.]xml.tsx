import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/seo";

const routes: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/capabilities", priority: "0.9", changefreq: "monthly" },
  { path: "/capabilities/ai-transformation", priority: "0.9", changefreq: "monthly" },
  { path: "/capabilities/enterprise-technology", priority: "0.9", changefreq: "monthly" },
  { path: "/ventures", priority: "0.9", changefreq: "monthly" },
  { path: "/ventures/spectraiq", priority: "0.8", changefreq: "monthly" },
  { path: "/ventures/decisioniq", priority: "0.8", changefreq: "monthly" },
  { path: "/ventures/tradelink", priority: "0.8", changefreq: "monthly" },
  { path: "/ventures/alwayson", priority: "0.8", changefreq: "monthly" },
  { path: "/ventures/prism-diagnostics", priority: "0.7", changefreq: "monthly" },
  { path: "/technology", priority: "0.7", changefreq: "monthly" },
  { path: "/insights", priority: "0.6", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/security", priority: "0.4", changefreq: "yearly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${absUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
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
