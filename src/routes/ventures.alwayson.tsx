import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, MessageSquare, Clock, Zap } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import {
  ArchitectureStack,
  AvailabilityGap,
  CapabilityRing,
  DecisionLoopVisual,
  HeroVisual,
} from "@/components/prism/ao/Visuals";
import {
  AgentSelector,
  ConversationSimulator,
  IndustryExplorer,
  MaturityLadder,
  ROICalculator,
} from "@/components/prism/ao/Interactive";
import {
  BeforeAfter,
  CapabilityMatrix,
  Manifesto,
  ProblemGrid,
  TrustPillars,
  ValueBlocks,
} from "@/components/prism/ao/Blocks";
import { faqs, headline, manifesto, subheadline, supportingStatement } from "@/lib/alwayson";
import { pillars } from "@/lib/prism";

const pillar = pillars.find((p) => p.index === "06")!;
const colour = pillar.colour;
const title = "Prism AlwaysOn AI — 24/7 AI voice & SMS workforce";
const description =
  "Prism AlwaysOn AI gives businesses intelligent AI agents that answer, engage, qualify, book, follow up and execute workflows 24/7 across voice and SMS — an always-on workforce measured on outcomes.";
const url = "https://prismgroup.com.au/ventures/alwayson";

export const Route = createFileRoute("/ventures/alwayson")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "AI voice agent, AI SMS agent, 24/7 AI workforce, voice AI Australia, SMS automation, AI receptionist, AI sales agent, AI appointment booking, intelligent call answering, conversational AI, business automation, AI customer service, missed call recovery",
      },
      { property: "og:title", content: "AN ALWAYS-ON AI WORKFORCE — Prism AlwaysOn AI" },
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
              name: "Prism AlwaysOn AI",
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "AI voice and SMS workforce platform",
              operatingSystem: "Web / Voice / SMS",
              description,
              brand: { "@type": "Organization", name: "Prism Group" },
              featureList: [
                "24/7 AI voice answering",
                "AI SMS conversations",
                "Natural language understanding",
                "Real-time system actions",
                "Appointment booking",
                "Payment collection",
                "Lead qualification",
                "Human escalation",
                "Conversation analytics",
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
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
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
        primary
          ? "bg-white text-black hover:bg-white/90"
          : "border border-white/20 text-white/80 hover:border-white/40 hover:text-white"
      }`}
    >
      {children} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function Page() {
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.14]"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 100% at 70% 0%, var(--prism-colour-${colour}), transparent 70%)`,
          }}
        />
        <div className="shell relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-muted-foreground">{pillar.index}</span>
                <span className="h-px w-12" style={{ background: `var(--prism-colour-${colour})` }} />
                <span className="eyebrow">{pillar.kind}</span>
              </div>
              <p className="mt-6 font-display text-sm font-medium tracking-tight text-muted-foreground">{pillar.name}</p>
              <h1 className="display-xl mt-3 max-w-3xl">{headline}</h1>
              <p className="mt-4 text-2xl font-light tracking-tight text-white/80">{subheadline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{supportingStatement}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <AnchorCta href="tel:+61408065993" primary>Talk to Prism</AnchorCta>
                <AnchorCta href="#simulator">See it work</AnchorCta>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex justify-center lg:justify-end">
                <HeroVisual colour={colour} />
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Problem */}
      <Section tone="raised">
        <div className="shell">
          <ProblemGrid colour={colour} />
        </div>
      </Section>

      {/* Availability gap */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="The 24-hour gap"
            title="Most businesses are only responsive one third of the day."
            subtitle="Customers and opportunities do not follow office hours. AlwaysOn AI closes the gap."
            centred
          />
          <div className="mt-10">
            <AvailabilityGap colour={colour} />
          </div>
        </div>
      </Section>

      {/* Capability ring */}
      <Section tone="raised">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Agent capabilities"
                title="LISTEN. UNDERSTAND. REASON. RESPOND. ACT. FOLLOW UP. ESCALATE. LEARN."
                subtitle="Eight capabilities that turn AI agents into a true workforce extension — not a simple bot."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Phone, label: "Voice AI" },
                  { icon: MessageSquare, label: "SMS AI" },
                  { icon: Clock, label: "24/7" },
                  { icon: Zap, label: "Real-time actions" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    <item.icon className="h-4 w-4" style={{ color: `var(--prism-colour-${colour})` }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <CapabilityRing colour={colour} />
          </div>
        </div>
      </Section>

      {/* Capability matrix */}
      <Section>
        <div className="shell">
          <CapabilityMatrix colour={colour} />
        </div>
      </Section>

      {/* Simulator */}
      <Section id="simulator" tone="raised">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="See it work"
                title="A conversation that actually gets things done."
                subtitle="Switch between voice and SMS to see how AlwaysOn AI handles a real customer journey — from first contact to booked job."
              />
              <div className="mt-8 space-y-3 text-sm text-white/60">
                <p>• Answers naturally, with context from prior messages.</p>
                <p>• Checks availability and books directly into the calendar.</p>
                <p>• Sends confirmations, payment links and follow-ups automatically.</p>
                <p>• Escalates to a human with full context when needed.</p>
              </div>
            </div>
            <ConversationSimulator colour={colour} />
          </div>
        </div>
      </Section>

      {/* Agent selector */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Agent roles"
            title="One platform. Many specialised agents."
            subtitle="Deploy the right AI agent for the job, or combine them into an end-to-end customer journey."
            centred
          />
          <div className="mt-10">
            <AgentSelector colour={colour} />
          </div>
        </div>
      </Section>

      {/* Decision loop */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="The decision loop"
            title="How an AI agent thinks and acts in real time."
            subtitle="From trigger to learning — a closed loop that improves with every conversation."
            centred
          />
          <div className="mt-10">
            <DecisionLoopVisual colour={colour} />
          </div>
        </div>
      </Section>

      {/* Before / after */}
      <Section>
        <div className="shell">
          <BeforeAfter colour={colour} />
        </div>
      </Section>

      {/* Industry explorer */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Industry use cases"
            title="Built for businesses that live in the conversation."
            subtitle="AlwaysOn AI adapts to the workflows, language and systems of each industry."
            centred
          />
          <div className="mt-10">
            <IndustryExplorer colour={colour} />
          </div>
        </div>
      </Section>

      {/* Architecture */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Architecture"
            title="A full-stack AI workforce, not a point solution."
            subtitle="Voice and SMS channels, conversation intelligence, memory, actions and governance — all connected."
            centred
          />
          <div className="mt-10">
            <ArchitectureStack colour={colour} />
          </div>
        </div>
      </Section>

      {/* ROI calculator */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Commercial impact"
            title="What does an always-on workforce mean for the bottom line?"
            subtitle="Adjust the assumptions to estimate recaptured revenue, conversion lift and admin savings."
            centred
          />
          <div className="mt-10">
            <ROICalculator colour={colour} />
          </div>
        </div>
      </Section>

      {/* Value blocks */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Business value"
            title="Availability, capture, capacity and scale."
            subtitle="The four value dimensions that make AlwaysOn AI a strategic investment, not a cost centre."
            centred
          />
          <div className="mt-10">
            <ValueBlocks colour={colour} />
          </div>
        </div>
      </Section>

      {/* Maturity */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Maturity model"
            title="From reactive answering to autonomous workforce."
            subtitle="A five-stage journey that matches investment to business readiness and ambition."
            centred
          />
          <div className="mt-10">
            <MaturityLadder colour={colour} />
          </div>
        </div>
      </Section>

      {/* Trust */}
      <Section>
        <div className="shell">
          <TrustPillars colour={colour} />
        </div>
      </Section>

      {/* Manifesto */}
      <Section tone="raised">
        <div className="shell">
          <Manifesto colour={colour} />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="shell max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" centred />
          <div className="mt-10 space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 open:bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                  {f.question}
                  <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Close */}
      <Section tone="raised">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">Start the conversation</p>
            <h2 className="display-md mx-auto mt-4 max-w-2xl">Your business. Always on.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Talk to Prism about a pilot. We start narrow, prove value, and expand the agent workforce across your customer journey.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <AnchorCta href="tel:+61408065993" primary>Call +61 408 065 993</AnchorCta>
              <AnchorCta href="mailto:ajay@spectraiq.ai">Email ajay@spectraiq.ai</AnchorCta>
              <GhostLink to="/ventures">Explore Portfolio</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
