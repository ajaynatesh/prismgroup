import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "03")!;
const title = "Enterprise AI & Technology Transformation — Prism Group";
const description = "Modernise technology, implement enterprise systems and embed AI into core business operations with Prism's cognitive engineering approach.";

export const Route = createFileRoute("/capabilities/enterprise-technology")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/capabilities/enterprise-technology" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/capabilities/enterprise-technology" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: pillar.name,
          description: pillar.copy,
          ...(pillar.external ? { url: pillar.external } : {}),
          provider: { "@type": "Organization", name: "Prism Group" },
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return <PillarPage pillar={pillar} journeyLabel="How it works" extra={<Extra />} />;
}

