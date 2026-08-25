import { Reveal } from "@/components/prism/Reveal";
import {
  CapabilityGroups,
  ExternalCta,
  FlowRail,
  GhostLink,
  PrimaryLink,
  Section,
  SectionHeading,
  VentureLabel,
} from "@/components/prism/ui";
import type { Pillar } from "@/lib/prism";

export function PillarPage({
  pillar,
  journeyLabel = "How it works",
  extra,
}: {
  pillar: Pillar;
  journeyLabel?: string;
  extra?: React.ReactNode;
}) {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.16]"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 100% at 20% 0%, var(--prism-colour-${pillar.colour}), transparent 70%)`,
          }}
        />
        <div className="shell relative">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display text-sm text-muted-foreground">{pillar.index}</span>
              <span
                className="h-px w-16"
                style={{ background: `var(--prism-colour-${pillar.colour})` }}
                aria-hidden="true"
              />
              <span className="eyebrow">{pillar.kind}</span>
              {pillar.kind === "Owned venture" ? <VentureLabel /> : null}
            </div>
            <p className="mt-8 font-display text-sm font-medium tracking-tight text-muted-foreground">
              {pillar.name}
            </p>
            <h1 className="display-xl mt-3 max-w-4xl">{pillar.headline}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{pillar.copy}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {pillar.external ? (
                <ExternalCta href={pillar.external}>{pillar.cta}</ExternalCta>
              ) : (
                <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
              )}
              <GhostLink to="/ventures">Explore Our Ventures</GhostLink>
            </div>
          </Reveal>
        </div>
      </header>

      {pillar.journey ? (
        <Section tone="raised" className="py-16 md:py-20">
          <div className="shell">
            <p className="eyebrow">{journeyLabel}</p>
            <div className="mt-8">
              <FlowRail steps={pillar.journey} colour={pillar.colour} />
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="shell">
          <SectionHeading eyebrow="Capabilities" title="What we build" colour={pillar.colour} />
          <div className="mt-14">
            <CapabilityGroups groups={pillar.groups} colour={pillar.colour} />
          </div>
        </div>
      </Section>

      {extra}
    </>
  );
}
