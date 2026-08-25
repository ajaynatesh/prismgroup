import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "01")!;
const title = "AI Transformation & Automation — Prism Group";
const description = "Prism helps organisations identify, redesign and automate high-value workflows using AI, starting with ROI modelling and measurable business cases.";

export const Route = createFileRoute("/capabilities/ai-transformation")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/capabilities/ai-transformation" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/capabilities/ai-transformation" }],
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
  return <PillarPage pillar={pillar} journeyLabel="Core journey" extra={<Extra />} />;
}

