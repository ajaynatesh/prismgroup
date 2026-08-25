import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";
import { Mail, Phone } from "lucide-react";

const title = "Contact Prism Group — Start with the problem";
const description =
  "Talk to Prism Group about AI transformation, enterprise technology, decision intelligence, TradeLink, AlwaysOn AI, SpectraIQ.ai or Prism Diagnostics.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px] opacity-[0.14]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(45% 100% at 25% 0%, var(--prism-colour-5), transparent 70%), radial-gradient(40% 100% at 70% 0%, var(--prism-colour-6), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display-xl mt-6 max-w-3xl">Have a problem worth solving?</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Whether you are looking to transform an operation, deploy AI, modernise technology, improve
              decision-making or explore one of our ventures, let's start with the problem.
            </p>
          </Reveal>
        </div>
      </header>

      <Section className="pt-8 md:pt-10">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Capabilities</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  AI Transformation &amp; Automation · Enterprise AI &amp; Technology Transformation
                </p>
              </div>
              <div className="hairline pt-8">
                <p className="eyebrow">Ventures</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SpectraIQ.ai · Prism DecisionIQ · Prism TradeLink · Prism AlwaysOn AI · Prism Diagnostics
                </p>
              </div>
              <div className="hairline pt-8">
                <p className="eyebrow">Our approach</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Discover → Intelligently model → Engineer → Deploy → Scale
                </p>
              </div>
              <div className="spectrum-rule max-w-40" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel p-6 md:p-9">
              <p className="eyebrow">Direct contact</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Reach out directly to start a conversation. We typically respond the same business day.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="tel:+61408065993"
                  className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-surface"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Mobile</p>
                    <p className="mt-0.5 font-display text-lg font-medium tracking-tight">+61 408 065 993</p>
                  </div>
                </a>
                <a
                  href="mailto:ajay@spectraiq.ai"
                  className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-surface"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
                    <p className="mt-0.5 font-display text-lg font-medium tracking-tight">ajay@spectraiq.ai</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
