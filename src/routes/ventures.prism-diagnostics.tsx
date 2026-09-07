import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { PillarPage } from "@/components/prism/PillarPage";
import { pillars } from "@/lib/prism";
import { Extra } from "@/components/prism/PillarExtra";

const pillar = pillars.find((p) => p.index === "07")!;
const title = "Prism Diagnostics — Healthcare diagnostics technology";
const description = "Prism Diagnostics brings advanced diagnostic technology, AI-enabled reporting and clinical solutions to healthcare professionals across the vestibular and balance ecosystem.";

const path = "/ventures/prism-diagnostics";

export const Route = createFileRoute("/ventures/prism-diagnostics")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: ldScripts(
      breadcrumbLd([
        { name: "Portfolio", path: "/ventures" },
        { name: "Prism Diagnostics", path },
      ]),
      webPageLd({ name: title, description, path }),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: pillar.name,
        description: pillar.copy,
        ...(pillar.external ? { url: pillar.external } : { url: absUrl(path) }),
        brand: { "@type": "Organization", name: "Prism Group" },
      },
    ),
  }),
  component: Page,
});


function Page() {
  return <PillarPage pillar={pillar} journeyLabel="How it works" extra={<Extra />} />;
}

