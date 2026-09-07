import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";

const title = "Privacy Policy — Prism Group";
const description = "How Prism Group handles personal information collected through this website and our platforms.";

const sections = [
  { h: "Information we collect", p: "We collect information you choose to provide through our enquiry forms, such as your name, company, email address, phone number and the details of your enquiry." },
  { h: "How we use information", p: "Information is used to respond to enquiries, provide requested information about our capabilities and ventures, and improve our services." },
  { h: "Data protection", p: "We apply access controls, encryption in transit and internal governance to protect the information we hold." },
  { h: "Third parties", p: "We do not sell personal information. Information may be processed by service providers who support our operations under confidentiality obligations." },
  { h: "Your choices", p: "You may request access to, correction of, or deletion of your personal information by contacting us through this website." },
  { h: "Updates", p: "This policy may be updated from time to time. The current version is always published on this page." },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/privacy" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <header className="pt-32 pb-8 md:pt-44 md:pb-12">
        <div className="shell">
          <Reveal>
            <div className="spectrum-rule max-w-24" />
            <h1 className="display-lg mt-8">Privacy Policy</h1>
          </Reveal>
        </div>
      </header>
      <Section className="pt-4 md:pt-6">
        <div className="shell max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <h2 className="font-display text-lg font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
