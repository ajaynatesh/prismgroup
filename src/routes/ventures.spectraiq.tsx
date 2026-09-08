import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { spectraiqRelationship } from "@/lib/prism";
import spectraiqLogo from "@/assets/spectraiq-logo.png";
import { Reveal } from "@/components/prism/Reveal";
import {
  ExternalCta,
  GhostLink,
  Section,
  SectionHeading,
  VentureLabel,
} from "@/components/prism/ui";
import {
  ChainRail,
  DecisionLoopVisual,
  FlowChips,
  IntelligenceLayer,
  RooftopFabric,
  ScaleHierarchy,
  StackDiagram,
  StatusTag,
} from "@/components/prism/siq/Visuals";
import {
  BeforeAfterToggle,
  IntelligenceCentre,
  MaturityLadder,
  OpportunityStudio,
  PersonaLens,
  PlatformExplorer,
  ScenarioSimulator,
} from "@/components/prism/siq/Interactive";
import {
  SIQ_URL,
  actionOutputs,
  dataSources,
  genericVsSpectra,
  method,
  prismChain,
  siqFaqs,
  siqGroups,
  siqModules,
  trustPillars,
  whySpectraIQ,
} from "@/lib/spectraiq";

const title = "SpectraIQ.ai — AI intelligence layer for Australian dealerships";
const description =
  "SpectraIQ.ai is an independent enterprise AI intelligence platform for Australian franchised automotive dealerships — connecting leads, sales, service, parts, marketing and customer data through one AI intelligence layer.";

const path = "/ventures/spectraiq";

export const Route = createFileRoute("/ventures/spectraiq")({
  head: () => ({
    meta: pageMeta({ title, description, path }),
    links: canonical(path),
    scripts: [
      ...ldScripts(
        breadcrumbLd([
          { name: "Portfolio", path: "/ventures" },
          { name: "SpectraIQ.ai", path },
        ]),
        webPageLd({ name: title, description, path }),
      ),
      {

        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "SpectraIQ.ai",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: SIQ_URL,
              description,
              audience: { "@type": "BusinessAudience", audienceType: "Automotive dealership executives" },
              brand: { "@type": "Organization", name: "Prism Group" },
              areaServed: { "@type": "Country", name: "Australia" },
            },
            {
              "@type": "FAQPage",
              mainEntity: siqFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function ExternalText({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function Page() {
  const live = siqModules.filter((m) => m.status === "live");
  const roadmap = siqModules.filter((m) => m.status === "roadmap");

  return (
    <>
      {/* 01 — HERO */}
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[540px] opacity-[0.18]"
          aria-hidden="true"
          style={{ background: "radial-gradient(65% 100% at 25% 0%, var(--prism-colour-5), transparent 70%)" }}
        />
        <div className="shell relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="eyebrow">SpectraIQ.ai</span>
              <VentureLabel label="Independent company · Prism founder is a shareholder" />
            </div>
            <img
              src={spectraiqLogo}
              alt="SpectraIQ.ai"
              width={1131}
              height={384}
              className="mt-8 h-14 w-auto md:h-16"
            />
            <h1 className="display-xl mt-8 max-w-3xl">
              Every lead.
              <br />
              Every customer.
              <br />
              <span className="spectrum-text">One intelligence layer.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              SpectraIQ.ai brings AI into the everyday operation of the dealership — connecting customer engagement,
              sales, service, parts, marketing and operational intelligence through one intelligent platform.
            </p>
            <p className="mt-5 font-display text-base font-medium tracking-tight text-foreground/85">
              Built for the way Australian dealerships actually operate.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#platform"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore the platform
              </a>
              <a
                href="#opportunity-studio"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                See the Opportunity Studio
              </a>
              <ExternalText href={SIQ_URL}>Visit SpectraIQ.ai</ExternalText>
            </div>
            <p className="mt-10 max-w-2xl border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
              {spectraiqRelationship}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <IntelligenceLayer
              inputs={["Leads", "Customers", "Sales", "Service", "Parts", "Marketing", "Data", "Workflows"]}
              outputs={["Insight", "Action", "Automation", "Growth"]}
            />
          </Reveal>
        </div>
      </header>

      {/* 02 — THE PROBLEM */}
      <Section tone="raised" id="problem">
        <div className="shell">
          <SectionHeading
            eyebrow="The problem"
            colour={1}
            title={
              <>
                Dealerships don't have a data problem.
                <br />
                They have an intelligence problem.
              </>
            }
            copy="Modern dealerships generate enormous amounts of information every day. The information is rarely the constraint — connecting it to a decision is."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <Reveal>
              <p className="eyebrow">Where the information lives</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {dataSources.map((d) => (
                  <span key={d} className="hairline rounded-full bg-background px-3 py-1.5 text-xs text-foreground/80">
                    {d}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                {["Data exists.", "Reports exist.", "Dashboards exist."].map((t) => (
                  <div key={t} className="bg-background p-5">
                    <p className="font-display text-sm font-medium tracking-tight text-muted-foreground">{t}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                But decisions are still slow.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <IntelligenceLayer
                compact
                inputs={["CRM", "DMS", "Lead sources", "Service", "Parts", "Marketing", "Customer"]}
                outputs={actionOutputs.slice(0, 4)}
                centre="SpectraIQ intelligence"
              />
              <div className="mt-4">
                <p className="eyebrow">Action</p>
                <div className="mt-4">
                  <FlowChips steps={actionOutputs} colour={4} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 03 — PRISM CONNECTION */}
      <Section>
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <Reveal>
              <p className="eyebrow">Built on the Prism philosophy</p>
              <h2 className="display-lg mt-5">AI that becomes part of how the business operates.</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                AI should not exist as a layer of experimentation around a business. It should become part of how the
                business operates — inside the workflows, decisions and measures that already run the dealership.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="panel p-7 md:p-9">
              <ChainRail steps={prismChain} colour={6} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 04 / 05 — PLATFORM + NINE MODULES */}
      <Section tone="raised" id="platform">
        <div className="shell">
          <SectionHeading
            eyebrow="The platform"
            colour={5}
            title={
              <>
                One platform.
                <br />
                One intelligence layer.
              </>
            }
            copy="One platform, nine modules across sales, service, parts, customer experience and marketing. Three sales modules are live today; the remainder are on the roadmap."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Nine modules", v: "One shared data model and one intelligence layer" },
              { k: "Three live", v: live.map((m) => m.name).join(" · ") },
              { k: "Six on roadmap", v: `${roadmap.length} modules across service, parts, CX and marketing` },
              { k: "Australian built", v: "AWS Sydney hosting and Privacy Act 1988 controls" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06} className="panel p-6">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">{s.v}</p>
              </Reveal>
            ))}
          </div>

          {/* platform map */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-5">
            {siqGroups.map((g) => (
              <div key={g.id} className="bg-background p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--prism-colour-${g.colour})` }} />
                  <p className="font-display text-sm font-semibold tracking-tight">{g.label}</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {siqModules
                    .filter((m) => m.group === g.id)
                    .map((m) => (
                      <li key={m.id} className="hairline rounded-md bg-surface/40 px-3.5 py-3">
                        <p className="text-xs font-medium tracking-tight text-foreground/90">{m.name}</p>
                        <StatusTag status={m.status} className="mt-2" />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 06/07/08/09/10 — module explorer */}
          <div className="mt-16">
            <Reveal>
              <p className="eyebrow">The dealership operating system</p>
              <h3 className="display-md mt-4 max-w-2xl">
                Select a department. Explore the module. See the flow it changes.
              </h3>
            </Reveal>
            <div className="mt-9">
              <PlatformExplorer />
            </div>
          </div>
        </div>
      </Section>

      {/* 06 — OPPORTUNITY STUDIO */}
      <Section id="opportunity-studio">
        <div className="shell">
          <SectionHeading
            eyebrow="Opportunity Studio"
            colour={3}
            title="Model the opportunity before you build it."
            copy="Opportunity Studio is a live executive decision engine that models the commercial opportunity created by improving key dealership performance levers — not a conventional calculator."
          />
          <div className="mt-12">
            <OpportunityStudio />
          </div>
        </div>
      </Section>

      {/* 16 — WHAT IF */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="What if?"
            colour={6}
            title="What if your dealership could see the opportunity before you act?"
            copy="Switch levers on and off to see how the modelled opportunity changes. Every figure here is an illustrative example."
          />
          <div className="mt-12">
            <ScenarioSimulator />
          </div>
        </div>
      </Section>

      {/* 17 — INTELLIGENCE CENTRE */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Dealership Intelligence Centre"
            colour={4}
            title="One view of the business."
            copy="The operational intelligence centre for the dealership: what happened, what changed, why it changed, what matters now and what to do next."
          />
          <div className="mt-12">
            <IntelligenceCentre />
          </div>
        </div>
      </Section>

      {/* 18 — ROLE-BASED INTELLIGENCE */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Role-based intelligence"
            colour={7}
            title={
              <>
                One platform.
                <br />
                Different lenses.
              </>
            }
            copy="Dealer principals, general managers, sales and BDC teams, service, parts, marketing, customer experience, multi-rooftop groups and OEMs each need a different answer from the same intelligence."
          />
          <div className="mt-12">
            <PersonaLens />
          </div>
        </div>
      </Section>

      {/* 19 — DECISION LOOP */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The AI decision loop"
            colour={2}
            title="From data to decision to action."
            copy="See, understand, predict, recommend, act, learn. The loop is the product."
          />
          <div className="mt-12">
            <DecisionLoopVisual />
          </div>
        </div>
      </Section>

      {/* 20 / 21 — ONE AI FABRIC + MULTI-ROOFTOP */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="One AI fabric"
            colour={5}
            title={
              <>
                Every module. Every rooftop.
                <br />
                One intelligence layer.
              </>
            }
          />
          <div className="mt-14">
            <RooftopFabric />
          </div>
          <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
            <Reveal>
              <p className="eyebrow">Multi-rooftop intelligence</p>
              <h3 className="display-md mt-5">
                See the group.
                <br />
                Manage the rooftops.
                <br />
                Act at the detail.
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                The same intelligence reads from group level down to the individual customer, so a group conversation and
                a consultant's next call are built on the same data.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ScaleHierarchy />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 22 / 23 — INTEGRATIONS + STACK */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Architecture & integrations"
            colour={6}
            title="Intelligence doesn't work in isolation."
            copy="Every dealership environment is different. Integration and deployment are assessed case by case to determine the most appropriate approach for each customer."
          />
          <div className="mt-14">
            <IntelligenceLayer
              inputs={["CRM", "DMS", "Website", "Lead sources", "Marketing", "Service", "Parts", "Customer data"]}
              outputs={["AI applications", "Dashboards", "Workflows", "Automation"]}
            />
          </div>
          <div className="mt-20">
            <Reveal>
              <p className="eyebrow">The technology stack</p>
              <h3 className="display-md mt-4 max-w-2xl">Five layers, one system of intelligence.</h3>
            </Reveal>
            <div className="mt-10">
              <StackDiagram />
            </div>
          </div>
        </div>
      </Section>

      {/* 24 / 25 — SECURITY + RESPONSIBLE AI */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Security & trust"
            colour={4}
            title="AI you can trust with your business."
            copy="Dealership data is customer data. It is treated accordingly."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {trustPillars.map((t, i) => (
              <div key={t.title} className="bg-background p-6 md:p-7">
                <span
                  className="block h-px w-8"
                  style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-sm font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            SOC 2 programme in progress. No certification is claimed until complete.
          </p>

          <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <Reveal>
              <p className="eyebrow">Responsible AI</p>
              <h3 className="display-md mt-5">
                AI should augment judgement.
                <br />
                Not replace accountability.
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                Recommendations are surfaced to people who remain accountable for the decision. Workflows are scoped,
                escalation paths are defined, and data protection is designed in rather than added later.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="panel p-7 md:p-9">
              <ChainRail
                colour={4}
                steps={[
                  { label: "AI recommendations", note: "Explainable signals behind every score." },
                  { label: "Human oversight", note: "People stay accountable for commercial decisions." },
                  { label: "Controlled workflows", note: "Scoped actions, not open-ended autonomy." },
                  { label: "Escalation", note: "Defined hand-off to the right team member." },
                  { label: "Governance", note: "Documented scope, review and change control." },
                  { label: "Data protection", note: "Australian hosting and Privacy Act controls." },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 26 — THE SPECTRAIQ METHOD */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The SpectraIQ method"
            colour={3}
            title="How implementation actually works."
            copy="Timelines depend on the dealership environment. Many customers are operational within days, with implementation planned collaboratively based on existing systems and workflows."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {method.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.05}>
                <div className="h-full bg-background p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs tabular-nums text-muted-foreground">{m.n}</span>
                    <span
                      className="h-px w-8"
                      style={{ background: `var(--prism-colour-${i + 2})` }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{m.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 27 / 28 — BUSINESS VALUE + BEFORE / AFTER */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Business value" colour={1} title="AI should pay for itself." />
          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {["More leads converted", "More customers retained", "More workflow capacity", "Less operational friction"].map(
              (t, i) => (
                <Reveal key={t} delay={i * 0.06} className="panel p-6">
                  <span
                    className="block h-px w-8"
                    style={{ background: `var(--prism-colour-${i + 1})` }}
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-display text-sm font-medium tracking-tight">{t}</p>
                </Reveal>
              ),
            )}
            <Reveal
              delay={0.3}
              className="rounded-lg border border-border-strong bg-background p-6"
            >
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">Equals</p>
              <p className="spectrum-text mt-4 font-display text-lg font-semibold tracking-tight">
                Greater dealership profitability
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-10 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground">
              SpectraIQ turns AI from an innovation project into a commercial performance system — which is exactly what
              Prism Group exists to do.
            </p>
          </Reveal>

          <div className="mt-20">
            <Reveal>
              <p className="eyebrow">Before / with SpectraIQ</p>
              <h3 className="display-md mt-4 max-w-2xl">The same dealership, operating differently.</h3>
            </Reveal>
            <div className="mt-9">
              <BeforeAfterToggle />
            </div>
          </div>
        </div>
      </Section>

      {/* 29 — MATURITY */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Dealership AI maturity"
            colour={5}
            title="From experimentation to an AI-native dealership."
            copy="Most dealerships sit between level one and level two. SpectraIQ exists to move them upward, one workflow at a time."
          />
          <div className="mt-12">
            <MaturityLadder />
          </div>
        </div>
      </Section>

      {/* 30 / 35 — WHY SPECTRAIQ + VS GENERIC AI */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Why SpectraIQ" colour={2} title="Vertical intelligence, not general-purpose AI." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whySpectraIQ.map((w, i) => (
              <div key={w.title} className="bg-background p-6 md:p-7">
                <span
                  className="block h-px w-8"
                  style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-sm font-semibold tracking-tight">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            <Reveal className="rounded-xl border border-border bg-background p-7 md:p-9">
              <p className="eyebrow">Generic AI</p>
              <ul className="mt-5 space-y-3">
                {genericVsSpectra.generic.map((g) => (
                  <li key={g} className="text-sm leading-relaxed text-muted-foreground">
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              delay={0.08}
              className="rounded-xl border border-border-strong bg-background p-7 md:p-9"
            >
              <p className="eyebrow">SpectraIQ</p>
              <ul className="mt-5 space-y-3">
                {genericVsSpectra.spectra.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-3 text-sm leading-relaxed text-foreground/90">
                    <span
                      className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: `var(--prism-colour-${i + 1})` }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 31 — MANIFESTO */}
      <Section>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden="true"
          style={{ background: "radial-gradient(50% 60% at 50% 50%, var(--prism-colour-7), transparent 70%)" }}
        />
        <div className="shell relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The SpectraIQ manifesto</p>
            <h2 className="display-lg mt-6">
              Dealerships don't need more software.
              <br />
              <span className="spectrum-text">They need better intelligence.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              They don't need another dashboard. They need to know:
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Who matters?",
              "What changed?",
              "Why did it change?",
              "What opportunity are we missing?",
              "What should we do next?",
              "And did it work?",
            ].map((q, i) => (
              <div key={q} className="bg-background p-7">
                <p className="font-display text-base font-medium tracking-tight" style={{ color: `var(--prism-colour-${i + 1})` }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
          <Reveal className="mx-auto mt-12 max-w-3xl text-center">
            <p className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              That is the SpectraIQ promise.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Questions dealers ask" colour={4} title="Straight answers." />
          <div className="mt-12 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
            {siqFaqs.map((f) => (
              <details key={f.q} className="group p-6 md:p-7">
                <summary className="cursor-pointer font-display text-sm font-medium tracking-tight md:text-base">
                  {f.q}
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 36 — FINAL CTA */}
      <Section>
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Next</p>
            <h2 className="display-lg mt-5">See what your dealership could unlock.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
            {[
              {
                title: "Model the opportunity",
                copy: "Open the Opportunity Studio and model the levers on your own numbers.",
                href: "#opportunity-studio",
                colour: 3,
                internal: true,
              },
              {
                title: "Explore the platform",
                copy: "Walk the nine modules across sales, service, parts, CX and marketing.",
                href: "#platform",
                colour: 5,
                internal: true,
              },
              {
                title: "See it on your data",
                copy: "Book a guided demonstration with the SpectraIQ team.",
                href: SIQ_URL,
                colour: 7,
                internal: false,
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                {...(c.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="group bg-background p-7 transition-colors hover:bg-surface md:p-9"
              >
                <span
                  className="block h-px w-8 transition-all duration-300 group-hover:w-14"
                  style={{ background: `var(--prism-colour-${c.colour})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              </a>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <ExternalCta href={SIQ_URL}>Visit SpectraIQ.ai</ExternalCta>
            <GhostLink to="/ventures">Explore the seven pillars</GhostLink>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            SpectraIQ.ai — an independent enterprise intelligence company.
          </p>
        </div>
      </Section>
    </>
  );
}
