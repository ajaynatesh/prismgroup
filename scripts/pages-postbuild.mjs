// Post-build step for static hosting on GitHub Pages.
// - copies the SPA shell to 404.html so deep links resolve client-side
// - writes a static sitemap.xml (the dynamic /sitemap.xml route needs a server)
// - adds .nojekyll so folders like /assets/_* are served as-is
import { existsSync, copyFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = existsSync("dist/client") ? "dist/client" : "dist";
const base = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "") || "";
const siteUrl = (process.env.SITE_URL ?? "https://prismgroup.lovable.app").replace(/\/+$/, "");

const shell = join(outDir, "404.html");
if (existsSync(shell)) {
  // shell already emitted by the SPA prerender
} else if (existsSync(join(outDir, "index.html"))) {
  copyFileSync(join(outDir, "index.html"), shell);
}

const pages = [
  ["/", "1.0", "weekly"],
  ["/about", "0.8", "monthly"],
  ["/capabilities", "0.9", "monthly"],
  ["/capabilities/ai-transformation", "0.9", "monthly"],
  ["/capabilities/enterprise-technology", "0.9", "monthly"],
  ["/ventures", "0.9", "monthly"],
  ["/ventures/spectraiq", "0.8", "monthly"],
  ["/ventures/decisioniq", "0.8", "monthly"],
  ["/ventures/tradelink", "0.8", "monthly"],
  ["/ventures/alwayson", "0.8", "monthly"],
  ["/ventures/prism-diagnostics", "0.7", "monthly"],
  ["/technology", "0.7", "monthly"],
  ["/insights", "0.6", "weekly"],
  ["/contact", "0.8", "yearly"],
  ["/privacy", "0.3", "yearly"],
  ["/terms", "0.3", "yearly"],
  ["/security", "0.4", "yearly"],
];

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([path, priority, changefreq]) =>
      `  <url>\n    <loc>${siteUrl}${base}${path === "/" ? "/" : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(outDir, "sitemap.xml"), sitemap);
writeFileSync(join(outDir, ".nojekyll"), "");

console.log(`[pages] static output ready in ${outDir} (404.html, sitemap.xml, .nojekyll)`);
