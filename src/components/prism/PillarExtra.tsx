import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { pillars } from "@/lib/prism";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/** Shared closing blocks for every pillar page: cross-navigation + CTA. */
export function Extra() {
  return (
    <>
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Seven colours. One prism."
            title="Part of a connected ecosystem."
            copy="Every Prism capability and venture shares one philosophy: use intelligence, technology and innovation to create measurable outcomes."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Link
                key={p.index}
                to={p.href as never}
                className="group bg-background p-6 transition-colors hover:bg-surface"
              >
                <span
                  className="block h-px w-8 transition-all duration-500 group-hover:w-16"
                  style={{ background: `var(--prism-colour-${p.colour})` }}
                  aria-hidden="true"
                />
                <p className="mt-5 font-display text-xs text-muted-foreground">{p.index}</p>
                <p className="mt-2 font-display text-sm font-semibold leading-snug tracking-tight">
                  {p.short}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {p.kind}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
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
              <GhostLink to="/capabilities">What We Do</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
