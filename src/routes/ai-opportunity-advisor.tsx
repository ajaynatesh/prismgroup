import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ChallengeAdviser } from "@/components/prism/ChallengeAdviser";
import { Reveal } from "@/components/prism/Reveal";
import { Section, SectionHeading } from "@/components/prism/ui";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";

const title = "AI Opportunity Advisor | Prism Group Global";
const description =
  "The Prism AI Opportunity Advisor helps organisations identify and prioritise high-value AI opportunities based on their business challenges, priorities and objectives.";

const sections = [
  {
    id: "what",
    heading: "What is the Prism AI Opportunity Advisor?",
    body: "The Prism AI Opportunity Advisor is an interactive assessment tool from Prism Group Global, an Australian AI transformation company. You describe an operational challenge in plain language, and the Advisor identifies which Prism capabilities and illustrated case studies are most relevant to that challenge — then summarises a concise next-step brief you can bring to a conversation with Prism.",
  },
  {
    id: "how",
    heading: "How does the AI opportunity assessment work?",
    body: "You write a short description of your business challenge — for example manual finance processes, missed customer enquiries or disconnected decision-making. The Advisor interprets that description against Prism's capability areas, including AI strategy, applied AI, intelligent automation, workflow automation and customer experience transformation. It then recommends the most relevant capabilities and matching case studies, with a short rationale for each.",
  },
  {
    id: "problems",
    heading: "What business problems can AI help solve?",
    body: "Common starting points include manual and error-prone processes, slow or inconsistent decisions, fragmented data across systems, missed customer enquiries, forecasting that ignores external signals, and compliance workloads that grow faster than teams. The Advisor is designed for exactly these kinds of operational, growth and customer experience challenges.",
  },
  {
    id: "prioritise",
    heading: "How does Prism prioritise AI opportunities?",
    body: "Prism prioritises AI opportunities by business value, feasibility and risk — not by novelty. The Advisor reflects that approach: it matches your challenge to the capability areas where AI is most likely to produce measurable impact, and points you to case studies that illustrate how similar problems are approached in practice.",
  },
  {
    id: "who",
    heading: "Who is the Opportunity Advisor designed for?",
    body: "The Advisor is designed for executives, founders and operational leaders who suspect AI could help their organisation but want a grounded starting point. You do not need technical knowledge — describe the problem in business terms and the Advisor does the mapping.",
  },
  {
    id: "after",
    heading: "What happens after opportunities are identified?",
    body: "The brief the Advisor produces is a starting point for a conversation, not a commitment. You can copy it, send it to Prism, and discuss which opportunities are worth pursuing. Prism then works with you to validate feasibility, size the value and plan a pragmatic implementation path.",
  },
  {
    id: "implementation",
    heading: "How can organisations move from AI opportunity to implementation?",
    body: "Prism's approach moves from opportunity identification to a focused pilot, then to scaled implementation with human oversight and governance built in. The case studies on this site illustrate that journey across procurement, supply chain, finance, compliance, customer engagement and executive decision-making.",
  },
] as const;

export const Route = createFileRoute("/ai-opportunity-advisor")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path: "/ai-opportunity-advisor",
      ogTitle: "AI Opportunity Advisor — Prism Group Global",
    }),
    links: canonical("/ai-opportunity-advisor"),
    scripts: ldScripts(
      webPageLd({
        name: "AI Opportunity Advisor",
        description,
        path: "/ai-opportunity-advisor",
      }),
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Prism AI Opportunity Advisor",
        description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        provider: { "@id": "https://prismgroup.au/#organization" },
        isPartOf: { "@id": "https://prismgroup.au/#website" },
      },
      breadcrumbLd([{ name: "AI Opportunity Advisor", path: "/ai-opportunity-advisor" }]),
    ),
  }),
  component: AdvisorPage,
});

function AdvisorPage() {
  return (
    <>
      <Section className="pt-24 md:pt-36">
        <Reveal>
          <span className="eyebrow">Prism Group Global · Interactive assessment</span>
          <h1 className="display-lg mt-4 max-w-3xl">AI Opportunity Advisor</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Identify and prioritise potential AI opportunities based on your business challenges,
            priorities and objectives. Describe your challenge below — the Advisor maps it to the
            Prism capabilities and case studies most relevant to you.
          </p>
        </Reveal>
        <div className="mt-10">
          <ChallengeAdviser />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="About the Advisor"
          title="How the AI Opportunity Advisor works"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {sections.map((s) => (
            <Reveal key={s.id}>
              <article className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground">{s.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-surface/60 p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-foreground">Ready to explore your AI opportunities?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Bring your Advisor brief to a conversation with Prism, or explore the capabilities and
            case studies behind the recommendations.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Talk to Prism <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Explore capabilities
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              See case studies
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
