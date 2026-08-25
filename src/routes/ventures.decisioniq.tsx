import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "04")!;
const title = "Prism DecisionIQ — Leadership decision intelligence";
const description = "Prism DecisionIQ turns fragmented business data into a living intelligence layer for leadership: understand performance, simulate scenarios and decide with confidence.";

export const Route = createFileRoute("/ventures/decisioniq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures/decisioniq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures/decisioniq" }],
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
  return <PillarPage pillar={pillar} journeyLabel="Core architecture" extra={<Extra />} />;
}

