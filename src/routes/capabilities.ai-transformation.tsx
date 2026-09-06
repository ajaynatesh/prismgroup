import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Extra } from "@/components/prism/PillarExtra";
import { Reveal } from "@/components/prism/Reveal";
import { Section, SectionHeading } from "@/components/prism/ui";
import { TransformationEngine } from "@/components/prism/aix/TransformationEngine";
import {
  Faqs,
  DomainGrid,
  OpportunityMap,
  ProblemGrid,
  TechStackLayers,
  ValueCalculator,
  WorkflowTransform,
} from "@/components/prism/aix/Interactive";
import {
  Accelerators,
  AgentExamples,
  Autonomy,
  BeforeAfter,
  CaseStudyFormat,
  DataFoundation,
  DimensionLadder,
  Flywheel,
  Governance,
  HumanPlusAi,
  JourneyChoices,
  MaturityModel,
  Roadmap,
  Sourcing,
  ValueEngine,
  ValueEquation,
  ValueLevels,
  ValueRealisation,
} from "@/components/prism/aix/Blocks";
import { AIX_COLOUR, faqs, heroOutcomes, valueEngine } from "@/lib/ai-transformation";

const accent = `var(--prism-colour-${AIX_COLOUR})`;
const title = "AI Transformation — From AI Ambition to Business Impact | Prism Group";
const description =
  "Prism's AI transformation approach: identify high-value opportunities, model the economics, redesign workflows, deploy AI agents and automation, and measure value realisation.";
const path = "/capabilities/ai-transformation";
const url = absUrl(path);

export const Route = createFileRoute("/capabilities/ai-transformation")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path,
      ogTitle: "From AI ambition to business impact — Prism AI Transformation",
    }),
    links: canonical(path),
    scripts: [
      ...ldScripts(
        breadcrumbLd([
          { name: "Capabilities", path: "/capabilities" },
          { name: "AI Transformation", path },
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
              name: "AI Transformation & Automation",
              serviceType: "AI transformation consulting and delivery",
              description,
              provider: { "@type": "Organization", name: "Prism Group" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "The Prism AI Value Engine",
                itemListElement: valueEngine.map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s.name, description: s.tagline },
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

const articles = [
  "How to build an AI transformation roadmap",
  "How to identify high-ROI AI use cases",
  "AI readiness: what to assess first",
  "AI agents vs traditional automation",
  "How to calculate the ROI of AI automation",
  "How to redesign workflows for AI",
  "Building an AI operating model",
  "When to build vs buy AI",
  "AI governance for Australian businesses",
];

function Page() {
  return (
    <div>
      {/* 01 — Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 70% at 82% 30%, color-mix(in oklab, ${accent} 12%, transparent) 0%, transparent 72%)`,
          }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <p className="eyebrow">Prism AI Transformation</p>
            </div>
            <h1 className="display-xl mt-6">
              From AI ambition
              <br />
              to business impact.
            </h1>
            <p className="mt-7 max-w-xl font-display text-lg font-medium tracking-tight md:text-xl">
              Identify the opportunity. Quantify the value. Transform the way your business works.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              We help organisations identify where AI can create the greatest value, build the right solutions
              and transform the way their businesses operate.
            </p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {heroOutcomes.map((o) => (
                <div key={o.title} className="bg-background p-5">
                  <dt className="font-display text-sm font-semibold uppercase tracking-[0.1em]">{o.title}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.copy}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#value-engine"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                View the framework
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#opportunity-map"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore where AI creates value
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <TransformationEngine />
        </div>
      </section>

      {/* 02 — The problem */}
      <Section tone="raised" id="the-opportunity">
        <div className="shell">
          <SectionHeading
            eyebrow="The AI opportunity"
            colour={AIX_COLOUR}
            title={
              <>
                Everyone is talking about AI.
                <br />
                Few organisations know where to start.
              </>
            }
            copy="Most businesses know they need to do something with AI. The challenge is knowing where to start, what to prioritise, what to build and how to make the economics work."
          />
          <div className="mt-14">
            <ProblemGrid />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 font-display text-xl font-medium tracking-tight md:text-2xl">
              Prism answers these questions in one transformation journey.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 03 — Thesis */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Prism's transformation philosophy"
            colour={AIX_COLOUR}
            title={
              <>
                AI is not a technology project.
                <br />
                It is a business transformation.
              </>
            }
            copy="Value shows up when workflows, decisions, data and the operating model change together — which is why AI transformation touches far more than the technology function."
          />
          <div className="mt-14">
            <DimensionLadder />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              We don't sell AI. We transform businesses with it — Revenue × Cost × Productivity × Decisions.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 04/05 — Value engine */}
      <Section tone="raised" id="value-engine">
        <div className="shell">
          <SectionHeading
            eyebrow="Our framework"
            colour={AIX_COLOUR}
            title={<>The Prism AI Value Engine™</>}
            copy="An end-to-end methodology that moves an organisation from opportunity to enterprise capability: Discover → Quantify → Prioritise → Design → Build → Deploy → Scale."
          />
          <div className="mt-14">
            <ValueEngine />
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <p className="eyebrow">The value equation</p>
              <div className="mt-5">
                <ValueEquation />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 06 — Opportunity map */}
      <Section id="opportunity-map">
        <div className="shell">
          <SectionHeading
            eyebrow="AI value map"
            colour={AIX_COLOUR}
            title="Where can AI create value?"
            copy="Select a business function to reveal the AI opportunities Prism typically finds there."
          />
          <div className="mt-14">
            <OpportunityMap />
          </div>
        </div>
      </Section>

      {/* 07 — Five levels */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Levels of AI value"
            colour={AIX_COLOUR}
            title="AI transformation isn't just automation."
            copy="Value compounds as AI moves from assisting people to executing work and finally to changing how the business operates."
          />
          <div className="mt-14">
            <ValueLevels />
          </div>
        </div>
      </Section>

      {/* 08 — Human + AI */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Operating model"
            colour={AIX_COLOUR}
            title={
              <>
                The future isn't human or AI.
                <br />
                It's human + AI.
              </>
            }
          />
          <div className="mt-14">
            <HumanPlusAi />
          </div>
        </div>
      </Section>

      {/* 09 — Workflow redesign */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Workflow transformation"
            colour={AIX_COLOUR}
            title={
              <>
                Don't automate the old process.
                <br />
                Reimagine the workflow.
              </>
            }
            copy="Automating a broken process makes it faster, not better. Switch the view to see how the same outcome is delivered when intelligence comes first."
          />
          <div className="mt-14">
            <WorkflowTransform />
          </div>
        </div>
      </Section>

      {/* 10 — Agents */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Agentic AI"
            colour={AIX_COLOUR}
            title="From automation to autonomy."
            copy="The market is moving past isolated copilots toward agents that plan, use tools and execute whole workflows inside defined guardrails."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <Autonomy />
            <AgentExamples />
          </div>
        </div>
      </Section>

      {/* 11 — Data foundation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Data foundations"
            colour={AIX_COLOUR}
            title="AI is only as good as the business context behind it."
            copy="Proprietary context — your systems, documents and knowledge — is what separates a generic model from an intelligent business."
          />
          <div className="mt-14 max-w-3xl">
            <DataFoundation />
          </div>
        </div>
      </Section>

      {/* 12 — Technology architecture */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="AI technology architecture"
            colour={AIX_COLOUR}
            title="One architecture, six layers."
            copy="Hover a layer to see what sits inside it. Enterprise systems remain the source of truth; intelligence and orchestration sit above them."
          />
          <div className="mt-14">
            <TechStackLayers />
          </div>
        </div>
      </Section>

      {/* 13 — Domains */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Transformation domains"
            colour={AIX_COLOUR}
            title="Where we transform."
            copy="Open a domain to see the AI opportunities we most often deliver there."
          />
          <div className="mt-14">
            <DomainGrid />
          </div>
        </div>
      </Section>

      {/* 14 — Build vs buy */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Technology decisions"
            colour={AIX_COLOUR}
            title="Not every AI problem needs a new AI product."
            copy="Prism is technology agnostic and outcome-led. The right answer is whichever creates value fastest and holds up over time."
          />
          <div className="mt-14">
            <Sourcing />
          </div>
        </div>
      </Section>

      {/* 15 — Governance */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Responsible AI"
            colour={AIX_COLOUR}
            title="Move fast. Govern intelligently."
            copy="Governance is not a compliance appendix. It is the mechanism that lets an organisation deploy AI quickly and defend it afterwards."
          />
          <div className="mt-14">
            <Governance />
          </div>
        </div>
      </Section>

      {/* 16 — Maturity */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="AI maturity"
            colour={AIX_COLOUR}
            title="Where are you today?"
            copy="Prism helps you move from where you are to where you need to be — one stage at a time, with evidence at each step."
          />
          <div className="mt-14">
            <MaturityModel />
          </div>
        </div>
      </Section>

      {/* 17 — Roadmap */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Illustrative transformation journey"
            colour={AIX_COLOUR}
            title="What the first year can look like."
            copy="Indicative only — sequence and pace depend on readiness, data and the value at stake. Not a delivery commitment."
          />
          <div className="mt-14">
            <Roadmap />
          </div>
        </div>
      </Section>

      {/* 18 — Accelerators */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Prism accelerators"
            colour={AIX_COLOUR}
            title="Pre-engineered solutions that shorten the journey."
            copy="Accelerators are starting points, not the product. They shorten the distance from a quantified opportunity to a working implementation."
          />
          <div className="mt-14">
            <Accelerators />
          </div>
        </div>
      </Section>

      {/* 19 — ROI model */}
      <Section tone="raised" id="value-model">
        <div className="shell">
          <SectionHeading
            eyebrow="AI value model"
            colour={AIX_COLOUR}
            title="Model the economics before you build."
            copy="Adjust the inputs to see how automation, productivity and revenue uplift combine into an indicative annual value and payback."
          />
          <div className="mt-14">
            <ValueCalculator />
          </div>
        </div>
      </Section>

      {/* 20 — Before / after */}
      <Section>
        <div className="shell">
          <SectionHeading eyebrow="What changes?" colour={AIX_COLOUR} title="Before and after." />
          <div className="mt-14">
            <BeforeAfter />
          </div>
        </div>
      </Section>

      {/* 21 — Value realisation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Value realisation"
            colour={AIX_COLOUR}
            title={
              <>
                Implementation is not the finish line.
                <br />
                Value realisation is.
              </>
            }
            copy="A baseline is captured before deployment, then measured, optimised and scaled — so the business case is proven, not asserted."
          />
          <div className="mt-14">
            <ValueRealisation />
          </div>
          <div className="mt-14">
            <CaseStudyFormat />
          </div>
        </div>
      </Section>

      {/* 23 — Flywheel */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The Prism transformation flywheel"
            colour={AIX_COLOUR}
            title="AI transformation is a capability, not a project."
          />
          <div className="mt-14">
            <Flywheel />
          </div>
        </div>
      </Section>

      {/* 22 — FAQs */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Questions" colour={AIX_COLOUR} title="AI transformation, answered." />
          <div className="mt-14">
            <Faqs />
          </div>
        </div>
      </Section>

      {/* Thought leadership hub */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Prism thinking"
            colour={AIX_COLOUR}
            title="Going deeper."
            copy="Supporting perspectives on roadmaps, ROI, agents, workflow redesign and governance."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a}>
                <Link
                  to="/insights"
                  className="group flex h-full flex-col justify-between gap-6 bg-background p-6 transition-colors hover:bg-surface"
                >
                  <span className="font-display text-sm font-semibold leading-snug tracking-tight">{a}</span>
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Read on Insights
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 24 — Final CTA */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Start here"
            colour={AIX_COLOUR}
            title="Where should your AI journey start?"
            copy="Three ways in — depending on how far along you already are."
          />
          <div className="mt-14">
            <JourneyChoices />
          </div>
        </div>
      </Section>

      <Extra />
    </div>
  );
}
