import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading, VentureLabel } from "@/components/prism/ui";
import { relationshipCopy, ventures } from "@/lib/prism";

const title = "Portfolio — SpectraIQ.ai, DecisionIQ, TradeLink, AlwaysOn AI, Prism Diagnostics";
const description =
  "The Prism Group portfolio: SpectraIQ.ai commercial intelligence (an independent company), Prism DecisionIQ decision intelligence, Prism TradeLink WhatsApp-first operations, Prism AlwaysOn AI voice & SMS, and Prism Diagnostics.";

export const Route = createFileRoute("/ventures/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/ventures" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ventures" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Prism Group portfolio",
          itemListElement: ventures.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: v.name,
            description: v.copy,
            url: v.external ?? v.href,
          })),
        }),
      },
    ],
  }),
  component: Ventures,
});

function Ventures() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.14]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(40% 100% at 20% 0%, var(--prism-colour-2), transparent 70%), radial-gradient(40% 100% at 55% 0%, var(--prism-colour-5), transparent 70%), radial-gradient(40% 100% at 85% 0%, var(--prism-colour-7), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h1 className="display-xl mt-6 max-w-4xl">The Prism portfolio.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Five platforms and businesses across the Prism portfolio — some built and operated by Prism
              Group, others independent companies connected to Prism through its founder — distinct from our
              advisory and engineering capabilities, and united by one intelligence philosophy.
            </p>
          </Reveal>
        </div>
      </header>

      <Section className="pt-4 md:pt-8">
        <div className="shell space-y-px overflow-hidden rounded-lg border border-border bg-border">
          {ventures.map((v, i) => (
            <Reveal key={v.index} delay={i * 0.04}>
              <Link
                to={v.href as never}
                className="group grid gap-6 bg-background p-8 transition-colors hover:bg-surface md:grid-cols-[1fr_1.2fr] md:p-12"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xs text-muted-foreground">{v.index}</span>
                    <span
                      className="h-px w-10 transition-all duration-500 group-hover:w-20"
                      style={{ background: `var(--prism-colour-${v.colour})` }}
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="display-md mt-5">{v.name}</h2>
                  <VentureLabel className="mt-5" label={relationshipCopy[v.kind] || "A Prism Group venture"} />
                </div>
                <div>
                  <p className="font-display text-base font-semibold tracking-tight">{v.headline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{v.copy}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
                    {v.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Brand architecture"
            title="Two capabilities. Five portfolio companies."
            copy="Capabilities describe how Prism Group works with organisations. Portfolio companies are the platforms and businesses Prism builds and operates, alongside independent companies — including SpectraIQ.ai, a Delaware C Corporation with multiple co-founders — where Prism's founder is a shareholder."
          />
        </div>
      </Section>

      <Section>
        <div className="shell text-center">
          <Reveal>
            <div className="spectrum-rule mx-auto max-w-32" />
            <h2 className="display-lg mx-auto mt-10 max-w-2xl">Have a problem worth solving?</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
              <GhostLink to="/capabilities">What We Do</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
