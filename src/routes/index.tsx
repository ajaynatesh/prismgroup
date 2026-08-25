import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PrismBeams } from "@/components/prism/PrismBeams";
import { Spectrum } from "@/components/prism/Spectrum";
import { Reveal } from "@/components/prism/Reveal";
import {
  FlowRail,
  GhostLink,
  PrimaryLink,
  Section,
  SectionHeading,
  VentureLabel,
} from "@/components/prism/ui";
import {
  ecosystemLayers,
  industries,
  insights,
  principles,
  valueSteps,
  ventures,
} from "@/lib/prism";

const title = "Prism Group — One Prism. Seven ways to transform what's possible.";
const description =
  "Prism Group builds and scales intelligent businesses combining AI, technology, domain expertise and innovation across enterprise transformation, decision intelligence and healthcare diagnostics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden pb-16 pt-32 md:min-h-svh md:items-center md:pb-0">
        <div className="absolute inset-0 text-foreground">
          <PrismBeams activeColour={active} />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent"
          aria-hidden="true"
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Prism Group</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-6 max-w-4xl">
              One prism.
              <br />
              <span className="text-muted-foreground">Seven ways to transform</span>
              <br />
              what's possible.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Prism Group builds and scales intelligent businesses that combine AI, technology, domain
              expertise and innovation to transform how organisations operate, decide, connect and grow.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryLink to="/capabilities">Explore Prism</PrimaryLink>
              <GhostLink to="/ventures">Meet Our Ventures</GhostLink>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-14 flex flex-wrap gap-1.5" onMouseLeave={() => setActive(null)}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Prism colour ${n}`}
                  onMouseEnter={() => setActive(n)}
                  onFocus={() => setActive(n)}
                  onClick={() => setActive(n)}
                  className="h-1 w-12 rounded-full transition-all duration-300 hover:h-1.5"
                  style={{
                    background: `var(--prism-colour-${n})`,
                    opacity: active == null || active === n ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — WHAT IS PRISM */}
      <Section id="what" tone="raised">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="What is Prism" title="We build what's next." />
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Prism Group is a technology and innovation group building intelligent solutions across AI,
                enterprise transformation, decision intelligence, mobile-first business platforms,
                AI-powered customer engagement and healthcare diagnostics.
              </p>
              <p>
                We combine strategic thinking with engineering capability and domain expertise to turn
                complex problems into scalable solutions with measurable outcomes.
              </p>
            </div>
            <div className="mt-10">
              <FlowRail
                steps={["Idea", "Intelligence", "Engineering", "Deployment", "Outcome", "Scale"]}
                colour={4}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 03 + 04 — SEVEN COLOURS, ONE PRISM */}
      <Section id="pillars">
        <div className="shell">
          <SectionHeading
            eyebrow="The portfolio"
            title={
              <>
                Seven colours.
                <br />
                One prism.
              </>
            }
            copy="Seven businesses and capabilities. One shared philosophy: use intelligence, technology and innovation to create measurable outcomes."
          />
          <div className="mt-16">
            <Spectrum />
          </div>
          <Reveal className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
            <div>
              <p className="eyebrow">Parent company</p>
              <p className="mt-3 font-display text-lg font-semibold tracking-tight">Prism Group</p>
            </div>
            <div>
              <p className="eyebrow">Capabilities</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                AI Transformation &amp; Automation · Enterprise AI &amp; Technology Transformation
              </p>
            </div>
            <div>
              <p className="eyebrow">Owned ventures</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                SpectraIQ.ai · Prism DecisionIQ · Prism TradeLink · Prism AlwaysOn AI · Prism Diagnostics
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 05 — VALUE */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="How Prism creates value"
            title="From complexity to clarity."
            copy="We don't pursue technology for technology's sake. We start with the problem, quantify the opportunity and build toward measurable outcomes."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
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

      {/* 06 — THE PRISM DIFFERENCE */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The Prism difference"
            title="Technology is only valuable when it changes the outcome."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="bg-background p-7 transition-colors hover:bg-surface md:p-9">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 07 — OWNED VENTURES */}
      <Section tone="raised">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Owned ventures"
              title="Built inside Prism."
              copy="Proprietary Prism Group businesses and platforms — distinct from our advisory and engineering capabilities."
            />
            <Reveal>
              <GhostLink to="/ventures">All ventures</GhostLink>
            </Reveal>
          </div>
          <div className="mt-14 space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {ventures.map((v, i) => (
              <Reveal key={v.index} delay={i * 0.04}>
                <Link
                  to={v.href as never}
                  className="group flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-surface md:flex-row md:items-center md:justify-between md:p-8"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                      style={{ background: `var(--prism-colour-${v.colour})` }}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                        {v.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{v.headline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:pl-8">
                    <VentureLabel />
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — TECHNOLOGY ECOSYSTEM */}
      <Section id="ecosystem">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Technology ecosystem"
            title="Data. AI. Intelligence. Automation. Outcomes."
            copy="Cognitive engineering: the integration of domain expertise, data, artificial intelligence, automation and application engineering into systems that understand information, automate complex workflows, strengthen decision-making and continuously improve outcomes."
          />
          <Reveal delay={0.1}>
            <ol className="relative">
              <span
                className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: "var(--gradient-spectrum-v)", opacity: 0.65 }}
                aria-hidden="true"
              />
              {ecosystemLayers.map((l, i) => (
                <li key={l} className="relative flex items-center gap-5 py-4 pl-0">
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

      {/* 09 — INDUSTRIES */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Industries" title="Where we work." />
          <div className="mt-12 flex flex-wrap gap-2.5">
            {industries.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <span className="panel inline-flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/90">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                    aria-hidden="true"
                  />
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 10 — INSIGHTS */}
      <Section>
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title="Thinking from the group." />
            <Reveal>
              <GhostLink to="/insights">All insights</GhostLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {insights.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <article className="panel group h-full p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong">
                  <span
                    className="block h-px w-10 transition-all duration-500 group-hover:w-20"
                    style={{ background: `var(--prism-colour-${a.colour})` }}
                    aria-hidden="true"
                  />
                  <p className="mt-6 eyebrow">{a.category}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                  <p className="mt-6 text-xs text-muted-foreground">{a.read}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 11 — ABOUT */}
      <Section tone="raised">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="About Prism"
            title="We're building the intelligence layer for what comes next."
          />
          <Reveal delay={0.1} className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Prism Group brings together entrepreneurs, technologists, AI specialists, domain experts,
              engineers, healthcare innovators and transformation professionals — a group that builds and
              scales solutions rather than advising from the sidelines.
            </p>
            <div className="hairline pt-8">
              <p className="eyebrow">Built to think global</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Prism builds technology and intellectual property with the ambition to solve problems that
                exist across industries and markets.
              </p>
            </div>
            <GhostLink to="/about">More about Prism</GhostLink>
          </Reveal>
        </div>
      </Section>

      {/* 12 — FINAL CTA */}
      <Section className="overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 100%, var(--prism-colour-5), transparent 70%), radial-gradient(40% 60% at 20% 100%, var(--prism-colour-7), transparent 70%)",
          }}
        />
        <div className="shell relative text-center">
          <Reveal>
            <div className="spectrum-rule mx-auto max-w-40" />
            <h2 className="display-lg mx-auto mt-10 max-w-3xl">Have a problem worth solving?</h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you are looking to transform an operation, deploy AI, modernise technology, improve
              decision-making or explore one of our ventures, let's start with the problem.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
              <GhostLink to="/ventures">Explore Our Ventures</GhostLink>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <a
                href="https://spectraiq.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 hover:text-foreground"
              >
                spectraiq.ai <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href="https://prismdiagnostics.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 hover:text-foreground"
              >
                prismdiagnostics.com.au <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
