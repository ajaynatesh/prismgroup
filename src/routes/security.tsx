import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";

const title = "Security — Prism Group";
const description = "How Prism Group approaches security, governance and data protection across its platforms and engagements.";

const sections = [
  { h: "Security by design", p: "Security, privacy and governance requirements are considered at design time across every Prism platform and engagement." },
  { h: "Access control", p: "Role-based access control, least-privilege principles and audit logging are applied to systems that process customer data." },
  { h: "Data protection", p: "Data is encrypted in transit and at rest on the platforms we operate, with environment separation between development and production." },
  { h: "AI governance", p: "AI systems are deployed with guardrails, human escalation paths, consent management and traceable audit trails." },
  { h: "Monitoring", p: "Platform activity is monitored, and incidents are triaged through defined response processes." },
  { h: "Responsible disclosure", p: "If you believe you have identified a security issue, please contact us through this website so we can investigate." },
];

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/security" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
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
            <h1 className="display-lg mt-8">Security</h1>
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
