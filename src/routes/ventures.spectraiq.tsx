import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";
import spectraiqLogo from "@/assets/spectraiq-logo.png.asset.json";

const pillar = pillars.find((p) => p.index === "02")!;
const title = "SpectraIQ.ai — A Prism Group venture";
const description = "SpectraIQ.ai is an AI-powered commercial intelligence platform that turns operational data into actionable intelligence and accelerates business performance.";

export const Route = createFileRoute("/ventures/spectraiq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures/spectraiq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures/spectraiq" }],
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
  return (
    <PillarPage
      pillar={pillar}
      journeyLabel="How it works"
      extra={<Extra />}
      lockup={
        <img
          src={spectraiqLogo.url}
          alt="SpectraIQ.ai — Automobile Dealership AI Solutions"
          width={1131}
          height={384}
          className="h-16 w-auto md:h-20"
        />
      }
    />
  );
}

