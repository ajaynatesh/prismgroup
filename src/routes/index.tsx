import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PillarPortfolio, PillarLedger } from "@/components/prism/PillarPortfolio";
import { HeroIntelligence } from "@/components/prism/HeroIntelligence";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { commercialOutcomes, methodology, whyPrism } from "@/lib/home";
import { industries, insights } from "@/lib/prism";

const title = "Prism Group — Unleash the potential of AI";
const description =
  "Prism Group helps organisations turn AI from ambition into measurable business impact — growing revenue, optimising cost and increasing profitability across seven strategic pillars.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* 02 — HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="ambient-navy pointer-events-none absolute inset-0 opacity-90" aria-hidden="true" />
        <div
          className="grain-grid pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{ maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent)" }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-emerald)" }} />
                Prism Group · Enterprise AI &amp; intelligence
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display-xl mt-7 uppercase">
                Unleash the
                <br />
                potential of{" "}
                <span
                  style={{
                    background: "var(--gradient-enterprise)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  AI
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl font-display text-lg font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
                Transform your business. Accelerate growth. Increase profitability.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Prism helps organisations move from AI ambition to measurable business impact —
                identifying where AI can create value, building the right solutions and embedding
                intelligence into the way businesses operate.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-3">
                <PrimaryLink to="/ventures">Explore Our Portfolio</PrimaryLink>
                <GhostLink to="/contact">Talk to Prism</GhostLink>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { k: "07", v: "Strategic pillars" },
                  { k: "AI + Data", v: "Engineering depth" },
                  { k: "ROI first", v: "Before we build" },
                ].map((m) => (
                  <div key={m.v}>
                    <dt className="metric-figure text-foreground">{m.k}</dt>
                    <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="relative z-10">
            <HeroIntelligence />
          </Reveal>
        </div>
      </section>

      {/* 02b — PROBLEM FRAME */}
      <section className="relative">
        <div className="shell">
          <div className="rule-fade" />
          <Reveal>
            <p className="mx-auto max-w-3xl py-10 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              Most organisations know AI will change their business. Few know where to start, what to
              prioritise, or how to turn AI into measurable commercial value.
            </p>
          </Reveal>
          <div className="rule-fade" />
        </div>
      </section>

      {/* 03 — BUSINESS OUTCOME */}
      <Section tone="raised" className="py-16 md:py-20 lg:py-24">
        <div className="shell">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto_1fr_auto_1.2fr] md:gap-6">
            {[
              { k: "Grow", sub: "Revenue & opportunity", colour: 2 },
              { k: "Optimise", sub: "Cost & efficiency", colour: 5 },
            ].map((o, i) => (
              <div key={o.k} className="contents">
                <Reveal delay={i * 0.08} className="hidden md:block">
                  <span className="font-display text-3xl text-muted-foreground/40">{i === 0 ? "" : "+"}</span>
                </Reveal>
                <Reveal delay={i * 0.08 + 0.04}>
                  <div className="glass glass-hover p-7 md:p-8">
                    <span
                      className="block h-px w-10"
                      style={{ background: `var(--prism-colour-${o.colour})` }}
                    />
                    <h2 className="mt-5 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                      {o.k}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">{o.sub}</p>
                  </div>
                </Reveal>
              </div>
            ))}
            <Reveal delay={0.2} className="hidden md:block">
              <span className="font-display text-3xl text-muted-foreground/40">=</span>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="glass glass-hover relative overflow-hidden p-7 md:p-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{ background: "var(--gradient-enterprise)" }}
                />
                <span className="spectrum-rule relative block w-24" />
                <h2 className="mt-5 font-display text-4xl font-semibold uppercase tracking-tight md:text-5xl">
                  Accelerate
                </h2>
                <p className="mt-2 text-sm text-foreground/80">Profitability &amp; growth</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 04 — PORTFOLIO */}
      <Section id="portfolio">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="The portfolio"
              title={
                <span className="uppercase">
                  Seven pillars.
                  <br />
                  One prism.
                </span>
              }
            />
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                From AI transformation and enterprise technology to decision intelligence, customer
                engagement and healthcare diagnostics, Prism brings together seven strategic capabilities
                designed to help organisations unlock more value from technology and AI.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 md:mt-20">
            <PillarPortfolio />
          </div>
        </div>
      </Section>

      {/* 05 — PILLAR DETAIL */}
      <Section tone="raised" id="pillars">
        <div className="shell">
          <SectionHeading
            eyebrow="Pillar detail"
            title="Depth behind every colour."
            copy="Seven pillars, each with its own domain, technology and commercial thesis — and one shared objective: measurable business value."
          />
          <div className="mt-14">
            <PillarLedger />
          </div>
        </div>
      </Section>

      {/* 06 — METHODOLOGY */}
      <Section id="methodology">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionHeading
              eyebrow="The Prism method"
              title={<span className="uppercase">From AI ambition to business impact.</span>}
            />
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                The challenge isn't whether AI will transform business. The challenge is knowing where to
                start, what to build and how to turn AI into measurable value.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground">
                {["Business problem", "Opportunity", "AI", "Transformation", "Measurable outcome"].map(
                  (s, i) => (
                    <span key={s} className="inline-flex items-center gap-3">
                      {i > 0 ? <span className="text-muted-foreground/40">→</span> : null}
                      {s}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {methodology.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="group h-full bg-background p-7 transition-colors hover:bg-surface md:p-9">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xs tracking-[0.18em] text-muted-foreground">
                      {s.n}
                    </span>
                    <span
                      className="h-px w-8 transition-all duration-500 group-hover:w-14"
                      style={{ background: `var(--prism-colour-${i + 1})` }}
                    />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold uppercase tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 07 — COMMERCIAL IMPACT */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Commercial impact"
            title={<span className="uppercase">AI should not be a cost centre.</span>}
            copy='The objective is not to "do something with AI". The objective is to create measurable business value.'
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr_1.4fr]">
            {commercialOutcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.08}>
                <div className="glass glass-hover h-full p-8">
                  <span
                    className="block h-px w-10"
                    style={{ background: `var(--prism-colour-${o.colour})` }}
                  />
                  <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-tight">
                    {o.label}
                  </h3>
                  <ul className="mt-6 space-y-2.5">
                    {o.points.map((pt) => (
                      <li key={pt} className="text-sm leading-relaxed text-muted-foreground">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="glass relative h-full overflow-hidden p-8 md:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.14]"
                  style={{ background: "var(--gradient-spectrum)" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <span className="spectrum-rule block w-20" />
                  <h3 className="display-md mt-6 uppercase">Increase profitability</h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/85">
                    Revenue growth + cost optimisation + better decisions. Compounding, measurable and
                    designed to scale across the organisation.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>Revenue</span>
                    <span>Cost</span>
                    <span>Decisions</span>
                    <span className="text-foreground">Profitability</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Core promise */}
          <Reveal>
            <div className="mt-20 grid gap-10 border-t border-border pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <h3 className="display-md uppercase">We start with the outcome.</h3>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                We don't begin with technology. We begin with the business problem, quantify the
                opportunity and then determine where AI, automation, data and technology can create the
                greatest impact.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 08 — WHY PRISM */}
      <Section>
        <div className="shell">
          <SectionHeading eyebrow="Why Prism" title={<span className="uppercase">Why Prism exists.</span>} />
          <div className="mt-16 grid gap-px overflow-hidden border-y border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {whyPrism.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="h-full bg-background p-8 transition-colors hover:bg-surface md:p-9">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: `var(--prism-colour-${i + 2})` }}
                  />
                  <h3 className="mt-8 font-display text-lg font-semibold uppercase tracking-tight">
                    {w.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 09 — ABOUT PRISM */}
      <Section tone="raised" id="about">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="About Prism Group"
            title={<span className="uppercase">Intelligence → impact.</span>}
          />
          <Reveal delay={0.08}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Prism Group is a technology and AI group that combines domain expertise, data, artificial
                intelligence, automation and application engineering to create measurable outcomes across
                seven strategic pillars.
              </p>
              <p className="text-foreground/90">
                <span className="eyebrow block">Vision</span>
                <span className="mt-3 block">
                  A world where every organisation can unlock the full potential of artificial intelligence
                  to operate smarter, grow faster and create greater value.
                </span>
              </p>
              <p className="text-foreground/90">
                <span className="eyebrow block">Mission</span>
                <span className="mt-3 block">
                  To help organisations turn AI from an ambition into measurable business impact —
                  combining strategy, technology, intelligence and execution to accelerate growth,
                  optimise costs and improve profitability.
                </span>
              </p>
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <p className="eyebrow">Industries</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <li
                    key={ind}
                    className="rounded-full border border-border px-3 py-1.5 text-[0.75rem] text-muted-foreground"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <GhostLink to="/about">More about Prism</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 10 — INSIGHTS */}
      <Section>
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title="Prism thinking." />
            <Reveal>
              <GhostLink to="/insights">All insights</GhostLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border-y border-border bg-border md:grid-cols-3">
            {insights.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <Link
                  to="/insights"
                  className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface md:p-9"
                >
                  <span
                    className="text-[0.6875rem] uppercase tracking-[0.18em]"
                    style={{ color: `var(--prism-colour-${a.colour})` }}
                  >
                    {a.category}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                  <span className="mt-auto pt-8 text-xs text-muted-foreground">{a.read}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 11 — FINAL CTA */}
      <Section tone="raised" className="py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <motion.div className="glass ambient-navy relative overflow-hidden p-10 md:p-16">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "var(--gradient-spectrum)" }}
                aria-hidden="true"
              />
              <h2 className="display-lg max-w-3xl uppercase">
                Have an AI opportunity worth exploring?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Let's turn it into measurable value — starting with the outcome, the economics and the
                opportunity.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <PrimaryLink to="/contact">Talk to Prism</PrimaryLink>
                <a
                  href="https://spectraiq.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  spectraiq.ai <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-border pt-8 text-sm text-muted-foreground">
                <Link to="/ventures" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  Portfolio <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/capabilities" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  Capabilities <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link to="/technology" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  Technology <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
