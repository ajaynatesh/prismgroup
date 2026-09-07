import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { Section, SectionHeading } from "@/components/prism/ui";
import {
  DataFoundationVisual,
  DecisionLoopVisual,
  DriverTreeVisual,
  FlywheelVisual,
  HumanAiVisual,
  IntelligenceStack,
  LegacyLoopVisual,
  Panel,
  PredictiveChainVisual,
  ValidationVisual,
  ValueEquationVisual,
} from "@/components/prism/diq/Visuals";
import {
  ArchitectureExplorer,
  Copilot,
  EnterpriseMap,
  Faqs,
  HealthScore,
  OpportunityBoard,
  PersonaLens,
  SignatureAsk,
  SimulationEngine,
  UseCaseGrid,
} from "@/components/prism/diq/Interactive";
import {
  Alerts,
  BiComparison,
  BoardPack,
  DataEverywhere,
  DecisionActions,
  GovernancePillars,
  ImplementationJourney,
  MaturityLadder,
  MorningBrief,
  Principles,
  ProvenCapability,
  RiskWatchlist,
} from "@/components/prism/diq/Blocks";
import {
  DIQ_COLOUR,
  decisionLoop,
  faqs,
  heroOutcomes,
  personas,
  useCases,
} from "@/lib/decisioniq";

const accent = `var(--prism-colour-${DIQ_COLOUR})`;
const title = "Prism DecisionIQ — The AI Operating System for Business Decisions";
const description =
  "Prism DecisionIQ is an AI-powered decision intelligence platform for leadership: governed data, AI reasoning, predictive intelligence, scenario simulation and ranked recommendations for CEOs, CFOs, COOs and boards.";
const url = "https://prismgroup.com.au/ventures/decisioniq";

export const Route = createFileRoute("/ventures/decisioniq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "decision intelligence, AI decision intelligence, executive decision intelligence, AI for CEOs, AI for CFOs, AI for COOs, FP&A intelligence, AI-powered FP&A, scenario planning, business simulation, predictive analytics, business intelligence, enterprise AI, executive dashboards, AI leadership copilot, enterprise performance management",
      },
      { property: "og:title", content: "See what matters. Understand why. Decide what's next. — Prism DecisionIQ" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "Prism DecisionIQ",
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "Decision intelligence platform",
              operatingSystem: "Web",
              description,
              brand: { "@type": "Organization", name: "Prism Group" },
              featureList: [
                "Business Health Score",
                "AI executive copilot",
                "Root cause and driver intelligence",
                "Predictive risk intelligence",
                "Opportunity intelligence",
                "Scenario simulation and composition",
                "Persona-based executive dashboards",
                "Governed semantic layer and data validation",
              ],
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

function AnchorCta({ href, children, primary }: { href: string; children: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className={
        primary
          ? "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          : "group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
      }
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Statement({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <Reveal>
      <h2 className="display-lg uppercase">{children}</h2>
      {sub ? <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{sub}</p> : null}
    </Reveal>
  );
}

function Page() {
  return (
    <div>
      {/* 01 / 02 — Hero + intelligence stack */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 70% at 78% 26%, color-mix(in oklab, ${accent} 11%, transparent) 0%, transparent 72%)`,
          }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <p className="eyebrow">Prism DecisionIQ</p>
            </div>
            <h1 className="display-xl mt-6 uppercase">
              See what matters.
              <br />
              Understand why.
              <br />
              Decide what&apos;s next.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Prism DecisionIQ transforms fragmented business data into a living intelligence layer for
              leadership — combining governed data, AI reasoning, predictive intelligence and scenario
              simulation to help leaders make faster, better-informed decisions.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              From boardroom strategy to operational action, DecisionIQ turns business information into
              decisions.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {heroOutcomes.map((o) => (
                <div key={o.title}>
                  <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
                  <dt className="mt-4 font-display text-sm font-semibold uppercase tracking-tight">{o.title}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.copy}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <AnchorCta href="#architecture" primary>
                Explore DecisionIQ
              </AnchorCta>
              <AnchorCta href="#copilot">Experience the intelligence layer</AnchorCta>
            </div>
          </div>

          <IntelligenceStack />
        </div>
      </section>

      {/* 03 — The problem */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="The problem"
            colour={DIQ_COLOUR}
            title={
              <>
                Your data is real-time.
                <br />
                Your decisions shouldn&apos;t be days behind.
              </>
            }
            copy="Most organisations already have enormous amounts of data. The constraint is not collection — it is the distance between what the business knows and what leadership can act on."
          />
          <div className="mt-14">
            <DataEverywhere />
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <LegacyLoopVisual />
            <Reveal delay={0.1}>
              <div>
                <h3 className="display-md uppercase">DecisionIQ changes the loop.</h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  In most organisations, intelligence travels through reports, analysis and meetings
                  before it reaches a decision — and by then the decision window has usually closed.
                  DecisionIQ collapses that chain. Governed data, computation, AI reasoning and
                  simulation sit in one layer, so the question and the answer occupy the same moment.
                </p>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  The result is not faster reporting. It is a shorter distance between a signal in the
                  business and a decision made about it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 04 — The decision loop */}
      <Section id="decision-loop">
        <div className="shell">
          <SectionHeading
            eyebrow="The decision loop"
            colour={DIQ_COLOUR}
            title="See. Understand. Predict. Simulate. Recommend. Act. Learn."
            copy="The DecisionIQ loop is the operating rhythm of the platform. Each step produces the input for the next, and the outcome of every decision returns to the intelligence layer."
          />
          <div className="mt-14">
            <DecisionLoopVisual steps={decisionLoop} />
          </div>
        </div>
      </Section>

      {/* 05 — The differentiator */}
      <Section tone="raised">
        <div className="shell">
          <Statement sub="Reporting describes the past. Decision intelligence changes the future. The difference is not the chart — it is whether the system can reason about drivers, model alternatives and recommend action.">
            Traditional BI tells you what happened.
            <br />
            DecisionIQ helps you decide what to do next.
          </Statement>
          <div className="mt-14">
            <BiComparison />
          </div>
        </div>
      </Section>

      {/* 06 — Five lenses */}
      <Section id="lenses">
        <div className="shell">
          <SectionHeading
            eyebrow="One platform. Five lenses. One truth."
            colour={DIQ_COLOUR}
            title={
              <>
                One platform.
                <br />
                Five lenses.
                <br />
                One truth.
              </>
            }
            copy="Every leader works from the same governed business reality — but sees the information, intelligence and recommendations most relevant to their role. Select a lens to change the intelligence environment."
          />
          <div className="mt-14">
            <PersonaLens />
          </div>
        </div>
      </Section>

      {/* 07-10 — Role experiences narrative */}
      <Section tone="raised">
        <div className="shell space-y-20">
          {[
            {
              head: (
                <>
                  The CEO doesn&apos;t need more reports.
                  <br />
                  They need to know what matters.
                </>
              ),
              copy: "DecisionIQ opens on business health, then narrows immediately: three things requiring attention, two emerging opportunities, one strategic decision. Ask it to summarise the business and it returns health, the biggest risk, the biggest opportunity and the recommended actions — in the language a board would use.",
              id: "ceo",
            },
            {
              head: (
                <>
                  From report consumer
                  <br />
                  to strategic CFO.
                </>
              ),
              copy: "A live P&L waterfall from revenue through gross profit and operating cost to EBITDA, with a margin bridge behind it. Ask what is driving the margin decline and the platform decomposes revenue, volume, price, cost, mix and variance — then proposes what to do about it. Budget-versus-actuals, wage exposure and financial scenarios sit in the same layer.",
              id: "cfo",
            },
            {
              head: (
                <>
                  See the operation.
                  <br />
                  Find the constraint.
                  <br />
                  Fix it.
                </>
              ),
              copy: "Regions, teams, customers, capacity, utilisation and productivity in one governed view. Ask which region has the biggest operational issue and DecisionIQ returns a ranked leaderboard with RAG status, root cause, financial impact and a 30/60/90-day action plan.",
              id: "coo",
            },
            {
              head: (
                <>
                  Board-ready intelligence.
                  <br />
                  On demand.
                </>
              ),
              copy: "Enterprise value framed the way investors frame it: revenue growth, EBITDA and margin, cash flow, revenue per FTE, risk and capital allocation. Ask what could materially change enterprise value over the next twelve months and the answer covers growth opportunity, margin risk, cash-flow risk, acquisition scenarios and operational constraints.",
              id: "board",
            },
          ].map((s, i) => (
            <div key={s.id} className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="display-md uppercase">{s.head}</h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{s.copy}</p>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Panel>
                  <p className="eyebrow">{personas[i]?.role} lens</p>
                  <p className="mt-5 text-sm font-medium">“{personas[i]?.question}”</p>
                  <ul className="mt-5 space-y-2.5">
                    {personas[i]?.answer.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Illustrative example
                  </p>
                </Panel>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* 11 — Copilot */}
      <Section id="copilot">
        <div className="shell">
          <SectionHeading
            eyebrow="AI executive copilot"
            colour={DIQ_COLOUR}
            title={
              <>
                Ask the business.
                <br />
                Get an answer.
              </>
            }
            copy="The copilot reasons over governed KPIs and role-scoped data. It is not a chat window bolted onto a dashboard — it is the conversational surface of the intelligence layer."
          />
          <div className="mt-14">
            <Copilot />
          </div>
        </div>
      </Section>

      {/* 38 — Signature interaction */}
      <Section tone="raised" id="ask">
        <div className="shell">
          <SectionHeading
            eyebrow="Ask → Understand → Simulate → Decide"
            colour={DIQ_COLOUR}
            title="The questions leadership actually asks."
            copy="Select a question to see how DecisionIQ answers it — driver analysis first, then the recommended action."
          />
          <div className="mt-14">
            <SignatureAsk />
          </div>
        </div>
      </Section>

      {/* 12 — Root cause */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Root cause intelligence"
            colour={DIQ_COLOUR}
            title={
              <>
                Don&apos;t just see the variance.
                <br />
                Find the driver.
              </>
            }
            copy="DecisionIQ walks the tree from metric to driver to root cause to impact to action — the step static dashboards leave to an analyst and a week."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <DriverTreeVisual />
            <Reveal delay={0.1}>
              <Panel>
                <p className="eyebrow">Why this matters</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  A variance is a symptom. Leadership cannot act on a symptom — it can only act on a
                  cause, in a specific place, with a specific owner. Driver decomposition turns a number
                  that moved into a decision that can be made.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Because decomposition runs on the governed semantic layer, the explanation is
                  consistent whoever asks the question and however they arrived at it.
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 13 — Predictive */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Predictive intelligence"
            colour={DIQ_COLOUR}
            title="See a risk before it becomes a result."
            copy="Today, trend, forecast, risk, action. DecisionIQ expresses exposure in business terms and attaches the intervention that would change the outcome."
          />
          <div className="mt-14">
            <PredictiveChainVisual />
          </div>
          <div className="mt-12">
            <RiskWatchlist />
          </div>
          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            Forecast and risk outputs depend on the quality, history and granularity of your data. Prism
            makes no generic accuracy claims.
          </p>
        </div>
      </Section>

      {/* 14 — Opportunity intelligence */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Opportunity intelligence"
            colour={DIQ_COLOUR}
            title={
              <>
                AI should find value.
                <br />
                Not just report it.
              </>
            }
            copy="Every opportunity carries value, confidence, owner, action and timeframe — because an opportunity without an owner is only an observation."
          />
          <div className="mt-14">
            <OpportunityBoard />
          </div>
        </div>
      </Section>

      {/* 15 / 16 — Simulation engine + composer */}
      <Section tone="raised" id="simulate">
        <div className="shell">
          <SectionHeading
            eyebrow="Simulation engine · Scenario composer"
            colour={DIQ_COLOUR}
            title={
              <>
                What if?
                <br />
                Answered in seconds.
              </>
            }
            copy="Build your own future. Move the levers that leadership actually controls — growth, pricing, wage inflation, churn, productivity, automation and headcount — and see revenue, EBITDA, margin and cash flow respond together."
          />
          <div className="mt-14">
            <SimulationEngine />
          </div>
        </div>
      </Section>

      {/* 17 — From scenario to decision */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="From scenario to decision"
            colour={DIQ_COLOUR}
            title="What should we do?"
            copy="Simulation is not the destination. DecisionIQ converts the chosen scenario into ranked actions, each with expected impact, owner, timeframe, dependencies and risk."
          />
          <div className="mt-14">
            <DecisionActions />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">
            {["Simulation", "Recommendation", "Execution"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {s}
                {i < 2 ? <ArrowRight className="h-3.5 w-3.5" /> : null}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 18 — Business health score */}
      <Section tone="raised" id="health">
        <div className="shell">
          <SectionHeading
            eyebrow="Business Health Score"
            colour={DIQ_COLOUR}
            title={
              <>
                One number.
                <br />
                A thousand signals behind it.
              </>
            }
            copy="Seven dimensions, each with a status and an explanation. Select a dimension to see what changed, why, what happens next and what to do."
          />
          <div className="mt-14">
            <HealthScore />
          </div>
        </div>
      </Section>

      {/* 19 — Alerts */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="AI alerts"
            colour={DIQ_COLOUR}
            title="Don't wait for the monthly report."
            copy="DecisionIQ surfaces what leadership needs to know before leadership asks — with the driver identified and the intervention attached."
          />
          <div className="mt-14">
            <Alerts />
          </div>
        </div>
      </Section>

      {/* 20 — Morning brief */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Executive morning brief"
            colour={DIQ_COLOUR}
            title="Start the day knowing what matters."
            copy="Three things to know. Three actions. Then, if the day requires it, run the scenarios behind them."
          />
          <div className="mt-14">
            <MorningBrief />
          </div>
        </div>
      </Section>

      {/* 21 — Board mode */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Board / investor mode"
            colour={DIQ_COLOUR}
            title="Board mode strips the noise."
            copy="Growth, EBITDA, cash, risk, enterprise value and strategic initiatives — with narrative support for the board pack rather than a rebuild of it."
          />
          <div className="mt-14">
            <BoardPack />
          </div>
        </div>
      </Section>

      {/* 22 — Architecture */}
      <Section tone="raised" id="architecture">
        <div className="shell">
          <SectionHeading
            eyebrow="The architecture"
            colour={DIQ_COLOUR}
            title="Ingestion. Computation. Intelligence. AI persona. Presentation. Simulation."
            copy="Six layers, engineered as one platform. Select a layer to see what happens inside it."
          />
          <div className="mt-14">
            <ArchitectureExplorer />
          </div>
        </div>
      </Section>

      {/* 23 — Data foundation */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The data foundation"
            colour={DIQ_COLOUR}
            title="One version of the truth."
            copy="DecisionIQ requires governed business data. Source-system auditing, semantic-layer design, pipeline engineering and data-quality validation are part of the platform, not a prerequisite left with the client."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <DataFoundationVisual />
            <Reveal delay={0.1}>
              <div>
                <h3 className="display-md uppercase">Semantics before dashboards.</h3>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Most disagreements in a leadership meeting are definitional, not analytical. When
                  margin, utilisation or revenue mean three different things in three systems, the
                  discussion becomes about the number rather than the decision.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  DecisionIQ resolves that first. Definitions are agreed, encoded in a semantic layer,
                  reconciled to source and then reused everywhere — by the dashboards, by the forecasts
                  and by the AI.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 24 — Data quality */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Data quality"
            colour={DIQ_COLOUR}
            title="Bad data should never become a boardroom decision."
            copy="Five categories of validation run before any figure becomes a governed KPI or reaches the AI layer."
          />
          <div className="mt-14">
            <ValidationVisual />
          </div>
        </div>
      </Section>

      {/* 25 — Governance */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Governance & security"
            colour={DIQ_COLOUR}
            title="Intelligence you can trust."
            copy="Six pillars, defined at design time and enforced in the platform. Residency, encryption standards and retention are agreed per deployment."
          />
          <div className="mt-14">
            <GovernancePillars />
          </div>
        </div>
      </Section>

      {/* 26 — Human + AI */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Human + AI"
            colour={DIQ_COLOUR}
            title={
              <>
                AI recommends.
                <br />
                Leaders decide.
              </>
            }
          />
          <div className="mt-14">
            <HumanAiVisual />
          </div>
        </div>
      </Section>

      {/* 27 — Across the enterprise */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="DecisionIQ across the enterprise"
            colour={DIQ_COLOUR}
            title="Every leadership function, one governed layer."
            copy="Each role opens its own intelligence environment — scoped by permission, consistent by definition."
          />
          <div className="mt-14">
            <EnterpriseMap />
          </div>
        </div>
      </Section>

      {/* 28 — Use cases */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Use cases"
            colour={DIQ_COLOUR}
            title={`${useCases.length} decision domains. One platform.`}
            copy="Select a domain to see where DecisionIQ is applied."
          />
          <div className="mt-14">
            <UseCaseGrid />
          </div>
        </div>
      </Section>

      {/* 29 — Maturity */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="From reporting to decision intelligence"
            colour={DIQ_COLOUR}
            title="Six levels. Most organisations stop at three."
            copy="Reporting, analytics and prediction describe the business. Simulation, decision intelligence and action intelligence change it."
          />
          <div className="mt-14">
            <MaturityLadder />
          </div>
        </div>
      </Section>

      {/* 30 — Implementation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Implementation journey"
            colour={DIQ_COLOUR}
            title="Discover to optimise."
            copy="The journey is consistent; the duration depends on source systems, data condition and decision scope. Prism does not promise a universal timeline."
          />
          <div className="mt-14">
            <ImplementationJourney />
          </div>
        </div>
      </Section>

      {/* 31 — Proven capability */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Proven capability"
            colour={DIQ_COLOUR}
            title="The architecture already operates at scale."
            copy="Anonymised examples of platforms Prism has delivered using the same architectural patterns that underpin DecisionIQ."
          />
          <div className="mt-14">
            <ProvenCapability />
          </div>
        </div>
      </Section>

      {/* 32 — Value creation */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Value creation"
            colour={DIQ_COLOUR}
            title="Better decisions compound."
            copy="Value does not come from the platform. It comes from the decisions the platform improves — and from making more of them, earlier, with less noise."
          />
          <div className="mt-14">
            <ValueEquationVisual />
          </div>
        </div>
      </Section>

      {/* 33 — Flywheel */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The DecisionIQ flywheel"
            colour={DIQ_COLOUR}
            align="center"
            title="Data. Understand. Intelligence. Decision. Action. Outcome. Learning."
            copy="Each turn of the loop makes the next decision better informed than the last."
          />
          <div className="mt-14">
            <FlywheelVisual />
          </div>
        </div>
      </Section>

      {/* 34 — Manifesto */}
      <Section tone="raised">
        <div className="shell max-w-4xl">
          <Reveal>
            <h2 className="display-lg uppercase">
              Business doesn&apos;t need more reports.
              <br />
              It needs better decisions.
            </h2>
            <div className="mt-10 space-y-2 text-base text-muted-foreground md:text-lg">
              {[
                "another spreadsheet.",
                "another dashboard.",
                "another analyst.",
                "another meeting.",
                "another report.",
              ].map((l) => (
                <p key={l}>Leaders shouldn&apos;t have to wait for {l}</p>
              ))}
            </div>
            <p className="mt-10 text-base leading-relaxed md:text-lg">
              DecisionIQ puts intelligence where decisions happen.
            </p>
            <p
              className="mt-12 font-display text-2xl font-semibold uppercase leading-tight tracking-tight md:text-4xl"
              style={{ color: `color-mix(in oklab, ${accent} 55%, var(--foreground))` }}
            >
              See what matters.
              <br />
              Understand why.
              <br />
              Decide what&apos;s next.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 35 — Why DecisionIQ */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Why DecisionIQ"
            colour={DIQ_COLOUR}
            title="Six principles behind the platform."
          />
          <div className="mt-14">
            <Principles />
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading eyebrow="Questions" colour={DIQ_COLOUR} title="What leaders ask us about DecisionIQ." />
          <div className="mt-12">
            <Faqs />
          </div>
        </div>
      </Section>

      {/* 36 — Final CTA */}
      <Section>
        <div className="shell">
          <Reveal>
            <h2 className="display-lg uppercase">
              What would you decide differently
              <br />
              if you could see the future?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {[
              { title: "Explore the platform", copy: "See the DecisionIQ architecture.", href: "#architecture" },
              { title: "Experience a scenario", copy: "Try the what-if simulator.", href: "#simulate" },
              { title: "Talk to Prism", copy: "Discuss your organisation's decision intelligence opportunity.", href: "/contact" },
            ].map((c) => (
              <div key={c.title} className="bg-background p-7 md:p-9">
                <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold uppercase tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                {c.href.startsWith("#") ? (
                  <a
                    href={c.href}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link
                    to={c.href as never}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <AnchorCta href="#architecture" primary>
              Explore DecisionIQ
            </AnchorCta>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Talk to Prism
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
