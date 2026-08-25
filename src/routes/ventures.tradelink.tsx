import { createFileRoute } from "@tanstack/react-router";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "05")!;
const title = "Prism TradeLink — WhatsApp-first business platform";
const description = "Prism TradeLink brings intelligent bookings, quotes, payments, CRM and automation to WhatsApp — the platform mobile-first businesses already use every day.";

export const Route = createFileRoute("/ventures/tradelink")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures/tradelink" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures/tradelink" }],
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
  return <PillarPage pillar={pillar} journeyLabel="Customer journey" extra={<Extra />} />;
}

