import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "07")!;
const title = "Prism Diagnostics — Healthcare diagnostics technology";
const description = "Prism Diagnostics brings advanced diagnostic technology, AI-enabled reporting and clinical solutions to healthcare professionals across the vestibular and balance ecosystem.";

export const Route = createFileRoute("/ventures/prism-diagnostics")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures/prism-diagnostics" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures/prism-diagnostics" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: pillar.name,
          description: pillar.copy,
          ...(pillar.external ? { url: pillar.external } : {}),
          brand: { "@type": "Organization", name: "Prism Group" },
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return <PillarPage pillar={pillar} journeyLabel="How it works" extra={<Extra />} />;
}

