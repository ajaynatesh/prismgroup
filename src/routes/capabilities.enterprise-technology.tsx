import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { Section, SectionHeading } from "@/components/prism/ui";
import { ArchitectureFlow, Chain, ChangeEquation, CognitiveEngine, Panel } from "@/components/prism/ent/Visuals";
import {
  ArchitectureLayers,
  CapabilityPortfolio,
  EnterpriseMap,
  Faqs,
  MaturityLadder,
  ProcessTransform,
  SourcingFramework,
} from "@/components/prism/ent/Interactive";
import {
  Accelerators,
  AdoptionAreas,
  AppCapabilities,
  BeforeAfter,
  DataCapabilities,
  DataJourney,
  DegradationCascade,
  ErpAiExamples,
  ErpWorkstreams,
  FinanceCapabilities,
  ImplementationSteps,
  RiskPillars,
  SymptomGrid,
  ThesisPrinciples,
  TransformationEngine,
  ValueOutcomes,
  WhyPrism,
} from "@/components/prism/ent/Blocks";
import {
  ENT_COLOUR,
  appPipeline,
  capabilities,
  erpAiChain,
  erpJourney,
  faqs,
  financeChain,
  heroOutcomes,
} from "@/lib/enterprise-technology";

const accent = `var(--prism-colour-${ENT_COLOUR})`;
const title = "Enterprise AI & Technology Transformation — Build the Technology, Enable the Intelligence | Prism Group";
const description =
  "Prism modernises enterprise technology and embeds AI into core operations: ERP and core systems, data engineering, digital process transformation, application engineering, cybersecurity, risk and AI governance.";
const path = "/capabilities/enterprise-technology";
const url = absUrl(path);

export const Route = createFileRoute("/capabilities/enterprise-technology")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path,
      ogTitle: "Build the technology. Enable the intelligence. — Prism Enterprise Transformation",
    }),
    links: canonical(path),
    scripts: [
      ...ldScripts(
        breadcrumbLd([
          { name: "Capabilities", path: "/capabilities" },
          { name: "Enterprise AI & Technology Transformation", path },
        ]),
        webPageLd({ name: title, description, path }),
      ),
      {

        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Enterprise AI & Technology Transformation",
              serviceType:
                "Enterprise technology transformation, ERP advisory, data engineering, AI enablement, application engineering, cybersecurity and AI governance",
              description,
              provider: { "@type": "Organization", name: "Prism Group" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Prism enterprise technology capability portfolio",
                itemListElement: capabilities.map((c) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: c.name, description: c.positioning },
                })),
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
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

function Page() {
  return (
    <div>
      {/* 01 — Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 70% at 80% 28%, color-mix(in oklab, ${accent} 10%, transparent) 0%, transparent 72%)`,
          }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <p className="eyebrow">Prism Enterprise AI &amp; Technology Transformation</p>
            </div>
            <h1 className="display-xl mt-6 uppercase">
              Build the technology.
              <br />
              Enable the intelligence.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Transform the systems, data, processes and technology foundations that power your business
              — and embed AI where it can create measurable impact.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              From enterprise platforms and data foundations to AI, automation, applications,
              cybersecurity and governance, Prism helps organisations move from fragmented technology to
              an intelligent, connected enterprise.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {heroOutcomes.map((o) => (
                <div key={o.title}>
                  <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
                  <dt className="mt-4 font-display text-sm font-semibold tracking-tight">{o.title}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.copy}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#capability-portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Explore our capabilities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#transformation-engine"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore the Prism approach
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <ArchitectureFlow />
        </div>
      </section>

      {/* 02 — The core problem */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="The core problem"
            colour={ENT_COLOUR}
            title={
              <>
                Technology should connect the business.
                <br />
                Not complicate it.
              </>
            }
            copy="Most organisations did not choose fragmentation. It accumulated — one platform, one integration and one workaround at a time — until the technology estate became the constraint rather than the enabler."
          />
          <div className="mt-14">
            <SymptomGrid />
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <DegradationCascade />
            <Reveal delay={0.1}>
              <div>
                <h3 className="display-md uppercase">Prism connects the pieces.</h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Fragmentation is rarely a single technology failure. It is a chain: systems that cannot
                  share data, data that cannot be trusted, work that has to be done by hand, decisions
                  that arrive late, cost that quietly compounds and opportunity that is never seen at
                  all. Break the chain at the architecture level and every step downstream improves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 03 — Transformation thesis */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Prism's transformation thesis"
            colour={ENT_COLOUR}
            title={
              <>
                Modernisation is not about replacing technology.
                <br />
                It is about making technology work better.
              </>
            }
            copy="Prism takes a business-first approach to technology transformation. We understand the operating model, identify where technology is constraining performance, determine where AI and automation can create value, and design the architecture required to support the future state."
          />
          <div className="mt-14">
            <ThesisPrinciples />
          </div>
        </div>
      </Section>

      {/* 04 — Capability portfolio */}
      <Section tone="raised" id="capability-portfolio">
        <div className="shell">
          <SectionHeading
            eyebrow="Capability portfolio"
            colour={ENT_COLOUR}
            title="The technology foundation for an intelligent enterprise."
            copy="Seven capability areas that operate together — select one to see how Prism works within it."
          />
          <div className="mt-14">
            <CapabilityPortfolio />
          </div>
        </div>
      </Section>

      {/* 05 — Cognitive engineering */}
      <Section id="cognitive-engineering">
        <div className="shell">
          <SectionHeading
            eyebrow="Cognitive engineering"
            colour={ENT_COLOUR}
            title="Where domain expertise meets AI, data and engineering."
            copy="Cognitive engineering is the integration of domain expertise, data, artificial intelligence, automation and application engineering to create intelligent solutions that can understand information, automate complex workflows, strengthen decision-making and continuously improve business outcomes."
          />
          <div className="mt-14">
            <CognitiveEngine />
          </div>
        </div>
      </Section>

      {/* 06 — Enterprise transformation architecture */}
      <Section tone="raised" id="architecture">
        <div className="shell">
          <SectionHeading
            eyebrow="Enterprise transformation architecture"
            colour={ENT_COLOUR}
            title="One architecture. Seven layers."
            copy="Hover or select a layer to see what Prism does within it. Core systems remain the source of truth; data, intelligence and orchestration sit above them, and security runs through everything."
          />
          <div className="mt-14">
            <ArchitectureLayers />
          </div>
        </div>
      </Section>

      {/* 07 — AI + ERP */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="AI + ERP"
            colour={ENT_COLOUR}
            title={
              <>
                ERP should not just record the business.
                <br />
                It should help the business think.
              </>
            }
            copy="Enterprise systems already hold the transactional truth of the organisation. Connecting them to intelligence turns a system of record into a system of insight and action."
          />
          <div className="mt-12">
            <Chain steps={erpAiChain} emphasiseLast />
          </div>
          <div className="mt-12">
            <ErpAiExamples />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground/80">
              Examples are illustrative of the patterns Prism builds. Specific product functionality is
              confirmed against each platform and release during design.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 08 — Digital process transformation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Digital process transformation"
            colour={ENT_COLOUR}
            title={
              <>
                Don&apos;t digitise a broken process.
                <br />
                Redesign it.
              </>
            }
            copy="Prism combines process redesign, automation, AI and application engineering to create workflows that are faster, more intelligent and easier to scale."
          />
          <div className="mt-14">
            <ProcessTransform />
          </div>
        </div>
      </Section>

      {/* 09 — Data & analytics */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Data, analytics & intelligence"
            colour={ENT_COLOUR}
            title={
              <>
                From data fragmentation
                <br />
                to business intelligence.
              </>
            }
            copy="Intelligence is a consequence of foundations. Integration, quality, structure and governance are what make analysis, prediction and recommendation trustworthy enough to act on."
          />
          <div className="mt-14">
            <DataJourney />
          </div>
          <div className="mt-10">
            <DataCapabilities />
          </div>
        </div>
      </Section>

      {/* 10 — AI application engineering */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="AI application engineering"
            colour={ENT_COLOUR}
            title={
              <>
                From AI idea
                <br />
                to production system.
              </>
            }
            copy="Prism does not stop at strategy. The same team that frames the opportunity engineers, integrates, deploys and monitors the application that delivers it."
          />
          <div className="mt-12">
            <Chain steps={appPipeline} emphasiseLast />
          </div>
          <div className="mt-10">
            <AppCapabilities />
          </div>
        </div>
      </Section>

      {/* 11 — Build vs buy vs integrate */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Technology decisions"
            colour={ENT_COLOUR}
            title="The right technology isn't always the newest technology."
            copy="Prism's role is to determine the right technology strategy based on business value, complexity, risk and scalability."
          />
          <div className="mt-14">
            <SourcingFramework />
          </div>
        </div>
      </Section>

      {/* 12 — ERP transformation journey */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="ERP transformation journey"
            colour={ENT_COLOUR}
            title="ERP transformation is far more than software implementation."
            copy="Nine stages, seven parallel workstreams. The technology is one of them."
          />
          <div className="mt-12">
            <Chain steps={erpJourney} />
          </div>
          <div className="mt-10">
            <ErpWorkstreams />
          </div>
        </div>
      </Section>

      {/* 13 — Implementation capability */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Implementation capability"
            colour={ENT_COLOUR}
            title="Strategy is only valuable when it reaches production."
            copy="A consistent delivery approach from assessment through to continuous improvement. Sequence and duration depend on scope, data condition and change capacity — we do not promise universal timelines."
          />
          <div className="mt-12">
            <ImplementationSteps />
          </div>
        </div>
      </Section>

      {/* 14 — Change & adoption */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Change & adoption"
            colour={ENT_COLOUR}
            title={
              <>
                Technology doesn&apos;t transform businesses.
                <br />
                People using it do.
              </>
            }
            copy="Adoption is engineered, not hoped for. Roles, capability, process ownership and measurement change alongside the systems themselves."
          />
          <div className="mt-12">
            <AdoptionAreas />
          </div>
          <div className="mt-14">
            <ChangeEquation />
          </div>
        </div>
      </Section>

      {/* 15 — Risk, cybersecurity & governance */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Risk, cybersecurity & governance"
            colour={ENT_COLOUR}
            title={
              <>
                Move faster.
                <br />
                Without losing control.
              </>
            }
            copy="Control, security and oversight are designed into the architecture so speed and assurance are not competing objectives."
          />
          <div className="mt-14">
            <RiskPillars />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground/80">
              Prism makes no regulatory approval or certification claims on behalf of itself or clients.
              Applicable obligations are confirmed with your legal, audit and compliance functions.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 16 — Finance transformation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Finance transformation"
            colour={ENT_COLOUR}
            title={
              <>
                Turn finance from reporting
                <br />
                into intelligence.
              </>
            }
            copy="Automating the transactional load releases finance capacity, which is then redirected into forecasting, scenario analysis and commercial decision support."
          />
          <div className="mt-12">
            <Chain steps={financeChain} emphasiseLast />
          </div>
          <div className="mt-10">
            <FinanceCapabilities />
          </div>
          <Reveal delay={0.1}>
            <Panel className="mt-10">
              <p className="eyebrow">Connected pillar</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Where the requirement is decision intelligence for leadership — scenarios, performance
                and forward view — this work connects to Prism DecisionIQ.
              </p>
              <Link
                to="/ventures/decisioniq"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="link-underline">Explore Prism DecisionIQ</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Panel>
          </Reveal>
        </div>
      </Section>

      {/* 17 — Product-led accelerators */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Product-led accelerators"
            colour={ENT_COLOUR}
            title="Build on what already works."
            copy="Prism combines consulting with reusable accelerators and product-led solutions that can shorten the distance from problem identification to deployment."
          />
          <div className="mt-14">
            <Accelerators />
          </div>
        </div>
      </Section>

      {/* 18 — The Prism Transformation Engine */}
      <Section tone="raised" id="transformation-engine">
        <div className="shell">
          <SectionHeading
            eyebrow="Our framework"
            colour={ENT_COLOUR}
            title="The Prism Transformation Engine"
            copy="Discover → Design → Engineer → Integrate → Enable → Govern → Optimise → Scale. The same engine that drives Prism AI Transformation, applied to the technology foundation."
          />
          <div className="mt-14">
            <TransformationEngine />
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/capabilities/ai-transformation"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium"
            >
              <span className="link-underline">See how this connects to AI Transformation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 19 — Business value */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Business value"
            colour={ENT_COLOUR}
            title={
              <>
                Technology is an investment.
                <br />
                It should create a return.
              </>
            }
          />
          <div className="mt-14">
            <ValueOutcomes />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12 font-display text-2xl font-medium uppercase tracking-tight md:text-3xl">
              Better technology.
              <br />
              Better business.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 20 — Maturity */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Technology & AI maturity"
            colour={ENT_COLOUR}
            title="Where are you today?"
            copy="Fragmented, digitised, connected, intelligent, adaptive. Prism helps organisations move from their current state toward the state their strategy actually requires."
          />
          <div className="mt-14">
            <MaturityLadder />
          </div>
        </div>
      </Section>

      {/* 21 — What Prism can transform */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="What Prism can transform"
            colour={ENT_COLOUR}
            title="Eight domains of the enterprise."
            copy="Transformation rarely stays inside one function. Explore where the work usually lands."
          />
          <div className="mt-14">
            <EnterpriseMap />
          </div>
        </div>
      </Section>

      {/* 22 — Before / after */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Before / after"
            colour={ENT_COLOUR}
            title={
              <>
                From technology fragmentation
                <br />
                to intelligent enterprise.
              </>
            }
          />
          <div className="mt-14">
            <BeforeAfter />
          </div>
        </div>
      </Section>

      {/* 23 — Why Prism */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Why Prism"
            colour={ENT_COLOUR}
            title="Technology deployment is not transformation."
            copy="Prism brings together strategy, enterprise technology, data, AI, automation, engineering and governance to create technology that works as one intelligent system."
          />
          <div className="mt-12">
            <WhyPrism />
          </div>
        </div>
      </Section>

      {/* Questions */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Questions" colour={ENT_COLOUR} title="What organisations usually ask." />
          <div className="mt-12">
            <Faqs />
          </div>
        </div>
      </Section>

      {/* 24 — Close */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Next"
            colour={ENT_COLOUR}
            title="What should your technology enable next?"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
            {[
              {
                title: "Transform an existing process",
                copy: "Start where manual effort, delay and rework are already visible.",
                label: "Explore AI & automation",
                to: "/capabilities/ai-transformation",
              },
              {
                title: "Modernise your technology",
                copy: "Architecture, core systems, data foundations and integration.",
                label: "Explore enterprise transformation",
                to: "/capabilities",
              },
              {
                title: "Build something new",
                copy: "Applications, copilots and agentic systems engineered for production.",
                label: "Talk to Prism Engineering",
                to: "/contact",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to as never}
                className="group bg-background p-8 transition-colors hover:bg-surface md:p-10"
              >
                <span className="block h-px w-8 transition-all duration-500 group-hover:w-16" style={{ background: accent }} aria-hidden="true" />
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  <span className="link-underline">{c.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Talk to Prism
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Seven colours. One prism. One intelligent technology foundation behind them.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
