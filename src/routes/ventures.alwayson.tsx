import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "06")!;
const title = "Prism AlwaysOn AI — AI voice & SMS workforce";
const description = "Prism AlwaysOn AI provides 24/7 AI voice and SMS agents that answer, engage, qualify, book, support and act — an AI workforce, measured on outcomes.";

export const Route = createFileRoute("/ventures/alwayson")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures/alwayson" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures/alwayson" }],
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
  return <PillarPage pillar={pillar} journeyLabel="Conversation flow" extra={<Extra />} />;
}

