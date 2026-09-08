import { createFileRoute } from "@tanstack/react-router";
import { ORG_ID, absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { EcosystemPulse } from "@/components/prism/EcosystemPulse";
import { Reveal } from "@/components/prism/Reveal";

import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { principles } from "@/lib/prism";

const title = "About Prism Group — Building the intelligence layer";
const description =
  "Prism Group is an Australia-native technology and AI group, bringing together entrepreneurs, technologists, AI specialists, domain experts, engineers and healthcare innovators to build intelligent businesses.";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path: "/about",
      ogTitle: "Australia-native. Builders, not bystanders. — About Prism Group",
    }),
    links: canonical("/about"),
    scripts: ldScripts(
      webPageLd({
        name: title,
        description,
        path: "/about",
        type: "AboutPage",
        extra: { mainEntity: { "@id": ORG_ID } },
      }),
      breadcrumbLd([{ name: "About", path: "/about" }]),
    ),
  }),
  component: About,
});


const people = [
  "Entrepreneurs",
  "Technologists",
  "AI specialists",
  "Domain experts",
  "Engineers",
  "Healthcare innovators",
  "Transformation professionals",
];

const leadershipPillars = [
  "Operator-founder focused on outcomes, not features",
  "Deep expertise across transformation, analytics, AI and customer experience",
  "Proven track record in operational excellence and high-performing teams",
  "Long-term, partnership-led approach to building sustainable business value",
];


function About() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.13]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(50% 100% at 15% 0%, var(--prism-colour-6), transparent 70%), radial-gradient(40% 100% at 60% 0%, var(--prism-colour-4), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">About Prism</p>
            <h1 className="display-xl mt-6 max-w-4xl">
              We're building the intelligence layer for what comes next.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Prism Group is an Australia-native technology and innovation group that builds, owns and
              operates technology-driven businesses across AI transformation, enterprise technology,
              decision intelligence, mobile-first business platforms, AI-powered customer engagement and
              healthcare diagnostics.
            </p>

          </Reveal>
        </div>
      </header>

      <Section tone="raised" className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="The group" title="Builders, not bystanders." />
          <Reveal delay={0.1} className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              The group builds and scales solutions rather than simply advising from the sidelines. Domain
              expertise, data, artificial intelligence, automation and application engineering come together
              to create measurable commercial and operational outcomes.
            </p>
            <ul className="flex flex-wrap gap-2.5 pt-2">
              {people.map((p, i) => (
                <li
                  key={p}
                  className="panel inline-flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/90"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading eyebrow="How we think" title="Six principles." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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

      <Section tone="raised">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Australia-first"
            title="Built in Australia, for Australian business."
            copy="Prism is Australia-native. We build technology and intellectual property around the realities of Australian businesses — local market dynamics, local operating conditions, local regulation and local customer behaviour — with architecture designed to scale well beyond it."
          />
          <Reveal delay={0.1}>
            <EcosystemPulse />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading eyebrow="Leadership" title="The founder behind Prism Group." colour={3} />
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="panel p-8 md:p-10">
                <div className="spectrum-rule max-w-16" />
                <h3 className="display-lg mt-8">Ajay Natesh (AJ)</h3>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Founder &amp; Managing Director
                </p>
                <p className="mt-8 text-base leading-relaxed text-foreground/90">
                  A transformational business leader and operator-founder with more than two decades of
                  senior leadership experience across healthcare, retail, analytics and AI.


                  His philosophy is simple: strategy matters, but execution creates the outcome.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                With 20+ years of commercial and general management leadership, AJ has built his career at
                the intersection of growth, transformation and execution.



                From global corporations to entrepreneurial ventures, he has led complex businesses, built
                high-performing teams, transformed commercial models and translated strategy into measurable
                results. His experience spans strategy, P&amp;L leadership, sales, marketing, operations,
                commercial excellence, digital transformation and AI, across multiple markets and industries.



                AJ has held senior leadership roles with PepsiCo, GSK Consumer Healthcare and Amplifon, most
                recently leading Retail Excellence for Amplifon Australia across a large national network. His
                work has focused on creating scalable operating models, strengthening commercial discipline,
                improving performance visibility and embedding execution cultures that deliver sustainable growth.



                Today, AJ brings that experience to Prism Group, where he is building businesses that combine
                healthcare expertise, technology, diagnostics, AI and intelligent automation to solve real-world
                problems and create measurable impact.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {leadershipPillars.map((p, i) => (
              <div key={p} className="bg-background p-7 transition-colors hover:bg-surface md:p-9">
                <div className="flex items-start gap-4">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{p}</p>
                </div>
              </div>
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
              <GhostLink to="/ventures">Explore the Portfolio</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
