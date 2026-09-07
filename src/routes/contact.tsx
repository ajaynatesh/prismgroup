import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";
import { Mail, Phone } from "lucide-react";

const title = "Talk to Prism — Contact Prism Group";
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
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.18]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(45% 100% at 25% 0%, var(--prism-colour-5), transparent 70%), radial-gradient(40% 100% at 70% 0%, var(--prism-colour-6), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Talk to Prism</p>
            <h1 className="display-xl mt-6">Have a problem worth solving?</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Reach out directly. We typically respond the same business day.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <div className="mx-auto grid max-w-2xl gap-5 md:grid-cols-2">
              <a
                href="tel:+61408065993"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-7 text-center transition-all hover:bg-surface"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground/80">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Mobile</p>
                  <p className="mt-1 font-display text-2xl font-medium tracking-tight">+61 408 065 993</p>
                </div>
              </a>
              <a
                href="mailto:ajay@spectraiq.ai"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-background p-7 text-center transition-all hover:bg-surface"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground/80">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
                  <p className="mt-1 font-display text-2xl font-medium tracking-tight">ajay@spectraiq.ai</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <Section className="pt-0">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal>
              <div>
                <p className="eyebrow">Capabilities</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  AI Transformation &amp; Automation · Enterprise AI &amp; Technology Transformation
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <p className="eyebrow">Portfolio</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SpectraIQ.ai · Prism DecisionIQ · Prism TradeLink · Prism AlwaysOn AI · Prism Diagnostics
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow">Our approach</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Discover → Intelligently model → Engineer → Deploy → Scale
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-16">
            <div className="spectrum-rule" />
          </div>
        </div>
      </Section>
    </>
  );
}
