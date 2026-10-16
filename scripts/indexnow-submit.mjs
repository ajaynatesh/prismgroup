// IndexNow submission for https://prismgroup.au
//
// Usage:
//   node scripts/indexnow-submit.mjs <url> [<url>...]   # manual submission
//   node scripts/indexnow-submit.mjs --changed <base> <head>   # CI: diff two git refs
//   node scripts/indexnow-submit.mjs --initial          # one-time activation submission
//
// The key is read from the public/<KEY>.txt verification file, so there is a
// single source of truth and the key is never duplicated in code or secrets.

import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const HOST = "prismgroup.au";
const SITE = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function loadKey() {
  const file = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!file) throw new Error("IndexNow key file not found in public/ (expected <32-hex>.txt)");
  const key = readFileSync(`public/${file}`, "utf8").trim();
  if (file !== `${key}.txt`) throw new Error("IndexNow key file contents do not match its filename");
  return key;
}

// Canonical public content URLs only — no assets, APIs, previews or non-indexable paths.
function isEligible(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" || u.host !== HOST) return false;
    const p = u.pathname;
    if (p.startsWith("/assets/") || p.startsWith("/api/")) return false;
    if (/\.(js|css|map|png|jpg|jpeg|webp|svg|ico|txt|xml|json|woff2?)$/i.test(p)) return false;
    return true;
  } catch {
    return false;
  }
}

// Map a changed source file to the public URLs it materially affects.
// Route files map to their own URL; shared chrome/SEO/home modules map to the
// full sitemap set because they change every page.
const ROUTE_TO_URL = {
  "src/routes/index.tsx": "/",
  "src/routes/about.tsx": "/about",
  "src/routes/capabilities.index.tsx": "/capabilities",
  "src/routes/capabilities.ai-transformation.tsx": "/capabilities/ai-transformation",
  "src/routes/capabilities.enterprise-technology.tsx": "/capabilities/enterprise-technology",
  "src/routes/case-studies.index.tsx": "/case-studies",
  "src/routes/case-studies.intelligent-procurement.tsx": "/case-studies/intelligent-procurement",
  "src/routes/case-studies.intelligent-supply-chain.tsx": "/case-studies/intelligent-supply-chain",
  "src/routes/case-studies.continuous-risk-compliance.tsx": "/case-studies/continuous-risk-compliance",
  "src/routes/case-studies.intelligent-finance-operations.tsx": "/case-studies/intelligent-finance-operations",
  "src/routes/case-studies.tradelink-whatsapp.tsx": "/case-studies/tradelink-whatsapp",
  "src/routes/case-studies.decisioniq-mining.tsx": "/case-studies/decisioniq-mining",
  "src/routes/ventures.index.tsx": "/ventures",
  "src/routes/ventures.spectraiq.tsx": "/ventures/spectraiq",
  "src/routes/ventures.decisioniq.tsx": "/ventures/decisioniq",
  "src/routes/ventures.tradelink.tsx": "/ventures/tradelink",
  "src/routes/ventures.alwayson.tsx": "/ventures/alwayson",
  "src/routes/ventures.prism-diagnostics.tsx": "/ventures/prism-diagnostics",
  "src/routes/technology.tsx": "/technology",
  "src/routes/ai-opportunity-advisor.tsx": "/ai-opportunity-advisor",
  "src/routes/insights.tsx": "/insights",
  "src/routes/contact.tsx": "/contact",
  "src/routes/privacy.tsx": "/privacy",
  "src/routes/terms.tsx": "/terms",
  "src/routes/security.tsx": "/security",
};

const ALL_URLS = Object.values(ROUTE_TO_URL);

// Files whose change materially affects every page (shared layout, SEO, styles).
const GLOBAL_PREFIXES = [
  "src/routes/__root.tsx",
  "src/components/site/",
  "src/lib/seo.ts",
  "src/styles.css",
];

function urlsForChangedFiles(files) {
  const urls = new Set();
  let globalChange = false;
  for (const f of files) {
    if (GLOBAL_PREFIXES.some((g) => f === g || f.startsWith(g))) {
      globalChange = true;
      continue;
    }
    if (ROUTE_TO_URL[f]) {
      urls.add(ROUTE_TO_URL[f]);
      continue;
    }
    // Homepage content modules only affect the homepage.
    if (f === "src/lib/home.ts" || f.startsWith("src/components/prism/HeroIntelligence")) {
      urls.add("/");
    }
    // Deleted route file: notify the old canonical URL.
    // (Handled by the diff status 'D' — the path is still in ROUTE_TO_URL above.)
  }
  if (globalChange) for (const u of ALL_URLS) urls.add(u);
  return [...urls];
}

function changedFiles(base, head) {
  const out = execSync(`git diff --name-only ${base} ${head}`, { encoding: "utf8" });
  return out.split("\n").map((l) => l.trim()).filter(Boolean);
}

async function submit(urls, key) {
  const urlList = [...new Set(urls)].filter(isEligible);
  if (urlList.length === 0) {
    console.log("[indexnow] no eligible changed URLs — nothing to submit");
    return 0;
  }
  const payload = {
    host: HOST,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList,
  };
  console.log(`[indexnow] submitting ${urlList.length} URL(s):`);
  for (const u of urlList) console.log(`  ${u}`);

  // One attempt, then a single backoff retry for 429/5xx. Never throw:
  // an IndexNow failure must not fail the deployment.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const text = await res.text().catch(() => "");
      console.log(`[indexnow] HTTP ${res.status}${text ? ` — ${text.slice(0, 300)}` : ""}`);
      if (res.status === 200 || res.status === 202) return 0;
      if (res.status === 429 || res.status >= 500) {
        if (attempt === 1) {
          console.log("[indexnow] rate limited / server error — retrying once after 30s");
          await new Promise((r) => setTimeout(r, 30_000));
          continue;
        }
      }
      // 400/403/422 or repeated failure: log and exit non-zero for visibility,
      // but the workflow step is continue-on-error so the deploy stands.
      return 1;
    } catch (err) {
      console.error(`[indexnow] request failed: ${err?.message ?? err}`);
      if (attempt === 1) {
        await new Promise((r) => setTimeout(r, 30_000));
        continue;
      }
      return 1;
    }
  }
  return 1;
}

async function main() {
  const args = process.argv.slice(2);
  const key = loadKey();

  if (args[0] === "--changed") {
    const [, base, head] = args;
    if (!base || !head) throw new Error("usage: --changed <base-sha> <head-sha>");
    const files = changedFiles(base, head);
    console.log(`[indexnow] ${files.length} file(s) changed between ${base}..${head}`);
    process.exit(await submit(urlsForChangedFiles(files), key));
  }

  if (args[0] === "--initial") {
    const initial = [
      "/",
      "/ai-opportunity-advisor",
      "/capabilities",
      "/capabilities/ai-transformation",
      "/case-studies",
      "/about",
      "/contact",
    ].map((p) => `${SITE}${p === "/" ? "/" : p}`);
    process.exit(await submit(initial, key));
  }

  if (args.length === 0) {
    console.error("usage: indexnow-submit.mjs <url>... | --changed <base> <head> | --initial");
    process.exit(2);
  }
  process.exit(await submit(args, key));
}

main().catch((err) => {
  console.error(`[indexnow] ${err?.message ?? err}`);
  process.exit(1);
});
