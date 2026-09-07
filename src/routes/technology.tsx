import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { motion } from "motion/react";
import { Reveal } from "@/components/prism/Reveal";
import { FlowRail, GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { ecosystemLayers } from "@/lib/prism";

const title = "Technology — Cognitive engineering at Prism Group";
const description =
  "Prism Group's technology ecosystem: data, AI, intelligence, automation, applications and people working together to produce measurable outcomes.";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/technology" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: Technology,
});

const stack = [
  {
    title: "Data foundations",
    items: ["Data engineering", "Integration", "Governance", "Quality & lineage"],
  },
  {
    title: "AI layer",
    items: ["Generative AI", "Agentic AI", "Predictive models", "Document intelligence"],
  },
  {
    title: "Intelligence layer",
    items: ["Decision intelligence", "Root cause analysis", "Scenario simulation", "Alerting"],
  },
  {
    title: "Automation layer",
    items: ["Workflow automation", "Orchestration", "Human-in-the-loop", "Escalation"],
  },
  {
    title: "Applications",
    items: ["Product engineering", "Executive interfaces", "Conversational channels", "Integrations"],
  },
  {
    title: "Assurance",
    items: ["AI governance", "Audit trails", "Access controls", "Performance measurement"],
  },
];

function Technology() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.13]"
          aria-hidden="true"
          style={{
            background: "radial-gradient(45% 100% at 30% 0%, var(--prism-colour-4), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Technology</p>
            <h1 className="display-xl mt-6 max-w-4xl">Cognitive engineering.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The integration of domain expertise, data, artificial intelligence, automation and application
              engineering to create intelligent systems that understand information, automate complex
              workflows, strengthen decision-making and continuously improve outcomes.
            </p>
          </Reveal>
        </div>
      </header>

      <Section tone="raised" className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Architecture" title="How intelligence flows." />
          <Reveal delay={0.1}>
            <ol className="relative">
              <span
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: "var(--gradient-spectrum-v)", opacity: 0.65 }}
                aria-hidden="true"
              />
              {ecosystemLayers.map((l, i) => (
                <li key={l} className="relative flex items-center gap-5 py-4">
                  <motion.span
                    className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full"
                    style={{ background: `var(--prism-colour-${i + 1})` }}
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-lg font-semibold tracking-tight md:text-xl">{l}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading eyebrow="The stack" title="What we engineer." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((g, i) => (
              <div key={g.title} className="bg-background p-6 transition-colors hover:bg-surface md:p-8">
                <span
                  className="block h-px w-8"
                  style={{ background: `var(--prism-colour-${i + 1})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-sm font-semibold tracking-tight">{g.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="text-sm leading-relaxed text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Delivery"
            title="From problem to production."
            copy="Every build follows the same discipline, whether it becomes an internal capability or a Prism venture."
          />
          <div className="mt-12">
            <FlowRail
              steps={["Discover", "Model", "Engineer", "Deploy", "Measure", "Scale"]}
              colour={6}
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="shell text-center">
          <Reveal>
            <div className="spectrum-rule mx-auto max-w-32" />
            <h2 className="display-lg mx-auto mt-10 max-w-2xl">Have a problem worth solving?</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
              <GhostLink to="/capabilities">What We Do</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
