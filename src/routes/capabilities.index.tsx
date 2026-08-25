import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading, VentureLabel } from "@/components/prism/ui";
import { capabilities, ventures, valueSteps } from "@/lib/prism";

const title = "What We Do — AI transformation & enterprise technology | Prism Group";
const description =
  "Prism Group's capabilities: AI transformation and automation, and enterprise AI and technology transformation — from ROI modelling to cognitive engineering.";

export const Route = createFileRoute("/capabilities/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/capabilities" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/capabilities" }],
  }),
  component: Capabilities,
});

function Capabilities() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-[0.13]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(45% 100% at 12% 0%, var(--prism-colour-1), transparent 70%), radial-gradient(40% 100% at 45% 0%, var(--prism-colour-3), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h1 className="display-xl mt-6 max-w-4xl">
              Intelligence, engineered into how organisations operate.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Two capabilities sit at the centre of the group — and five owned ventures extend them into
              products. Every engagement begins with the problem and the economics, not the technology.
            </p>
          </Reveal>
        </div>
      </header>

      <Section className="pt-4 md:pt-8">
        <div className="shell space-y-px overflow-hidden rounded-lg border border-border bg-border">
          {capabilities.map((c) => (
            <Reveal key={c.index}>
              <Link
                to={c.href as never}
                className="group block bg-background p-8 transition-colors hover:bg-surface md:p-12"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-xs text-muted-foreground">{c.index}</span>
                  <span
                    className="h-px w-10 transition-all duration-500 group-hover:w-20"
                    style={{ background: `var(--prism-colour-${c.colour})` }}
                    aria-hidden="true"
                  />
                  <span className="eyebrow">Capability</span>
                </div>
                <h2 className="display-md mt-6 max-w-3xl">{c.headline}</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{c.copy}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  {c.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="How Prism creates value"
            title="From complexity to clarity."
            copy="We don't pursue technology for technology's sake. We start with the problem, quantify the opportunity and build toward measurable outcomes."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {valueSteps.map((s, i) => (
              <div key={s.n} className="group bg-background p-6 md:p-7">
                <span
                  className="block h-px w-8 transition-all duration-500 group-hover:w-14"
                  style={{ background: `var(--prism-colour-${i + 1})` }}
                  aria-hidden="true"
                />
                <p className="mt-6 font-display text-xs text-muted-foreground">{s.n}</p>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Cognitive engineering"
            title="The Prism differentiator."
            copy="The integration of domain expertise, data, artificial intelligence, automation and application engineering to create intelligent systems that understand information, automate complex workflows, strengthen decision-making and continuously improve outcomes."
          />
          <div className="mt-14 flex flex-wrap gap-2.5">
            {["Domain expertise", "Data", "Artificial intelligence", "Automation", "Application engineering"].map(
              (t, i) => (
                <Reveal key={t} delay={i * 0.05}>
                  <span className="panel inline-flex items-center gap-2.5 px-5 py-3 text-sm">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: `var(--prism-colour-${i + 1})` }}
                      aria-hidden="true"
                    />
                    {t}
                  </span>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Owned ventures" title="Built inside Prism." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {ventures.map((v) => (
              <Link
                key={v.index}
                to={v.href as never}
                className="group bg-background p-6 transition-colors hover:bg-surface"
              >
                <span
                  className="block h-px w-8 transition-all duration-500 group-hover:w-16"
                  style={{ background: `var(--prism-colour-${v.colour})` }}
                  aria-hidden="true"
                />
                <p className="mt-5 font-display text-sm font-semibold leading-snug tracking-tight">
                  {v.name}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{v.short}</p>
                <VentureLabel className="mt-5" />
              </Link>
            ))}
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
              <GhostLink to="/ventures">Explore Our Ventures</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
