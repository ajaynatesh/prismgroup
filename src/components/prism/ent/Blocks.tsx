import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { Chip, Panel } from "@/components/prism/ent/Visuals";
import {
  ENT_COLOUR,
  accelerators,
  adoptionAreas,
  appCapabilities,
  dataCapabilities,
  dataJourney,
  degradationChain,
  erpAiExamples,
  erpWorkstreams,
  financeCapabilities,
  implementationSteps,
  problemSymptoms,
  riskAdditions,
  riskPillars,
  thesisPrinciples,
  transformationEngine,
  valueOutcomes,
  whyPrism,
  beforeState,
  afterState,
} from "@/lib/enterprise-technology";

const accent = `var(--prism-colour-${ENT_COLOUR})`;

export function SymptomGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
      {problemSymptoms.map((s, i) => (
        <div key={s.title} className="bg-background p-6 transition-colors hover:bg-surface">
          <span className="font-display text-[0.6875rem] tracking-[0.18em] text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 font-display text-sm font-semibold tracking-tight">{s.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
        </div>
      ))}
    </div>
  );
}

/** Fragmentation cascade — fragmented technology down to missed opportunity. */
export function DegradationCascade() {
  return (
    <ol className="mx-auto max-w-md space-y-2">
      {degradationChain.map((s, i) => (
        <Reveal key={s} delay={i * 0.06}>
          <li
            className="rounded-lg border border-border px-5 py-4 text-center font-display text-sm font-medium uppercase tracking-[0.12em]"
            style={{
              background: `color-mix(in oklab, ${accent} ${2 + i * 1.6}%, transparent)`,
              opacity: 1 - i * 0.06,
            }}
          >
            {s}
          </li>
          {i < degradationChain.length - 1 ? (
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}

export function ThesisPrinciples() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {thesisPrinciples.map((p) => (
        <div key={p.title} className="bg-background p-7 transition-colors hover:bg-surface md:p-8">
          <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
          <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.14em]">{p.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function ErpAiExamples() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {erpAiExamples.map((e) => (
        <div key={e.title} className="bg-background p-6 transition-colors hover:bg-surface">
          <p className="font-display text-sm font-semibold tracking-tight">{e.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{e.copy}</p>
        </div>
      ))}
    </div>
  );
}

/** Data sources → foundation → intelligence → action. */
export function DataJourney() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {dataJourney.map((stage, i) => (
        <Reveal key={stage.title} delay={i * 0.07}>
          <div className="panel h-full p-6">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6" style={{ background: accent }} aria-hidden="true" />
              <span className="font-display text-[0.6875rem] tracking-[0.18em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.12em]">
              {stage.title}
            </p>
            <ul className="mt-5 space-y-2">
              {stage.items.map((it) => (
                <li key={it} className="text-sm text-muted-foreground">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function TagCloud({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((c) => (
        <li key={c}>
          <Chip active>{c}</Chip>
        </li>
      ))}
    </ul>
  );
}

export function DataCapabilities() {
  return <TagCloud items={dataCapabilities} />;
}

export function AppCapabilities() {
  return <TagCloud items={appCapabilities} />;
}

export function FinanceCapabilities() {
  return <TagCloud items={financeCapabilities} />;
}

export function AdoptionAreas() {
  return <TagCloud items={adoptionAreas} />;
}

export function ErpWorkstreams() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4 lg:grid-cols-7">
      {erpWorkstreams.map((w) => (
        <div key={w} className="bg-background px-4 py-5 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em]">{w}</p>
        </div>
      ))}
    </div>
  );
}

export function ImplementationSteps() {
  return (
    <div className="hairline">
      {implementationSteps.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.04}>
          <div className="grid gap-4 border-b border-border py-6 md:grid-cols-[6rem_12rem_1fr] md:items-baseline md:gap-8">
            <span className="font-display text-2xl font-semibold tracking-tight text-muted-foreground/45">
              {s.n}
            </span>
            <p className="font-display text-base font-semibold uppercase tracking-[0.12em]">{s.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function RiskPillars() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {riskPillars.map((p) => (
          <div key={p.title} className="bg-background p-7 transition-colors hover:bg-surface">
            <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
            <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.14em]">{p.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <TagCloud items={riskAdditions} />
      </div>
    </div>
  );
}

export function Accelerators() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {accelerators.map((a, i) => (
        <Reveal key={a.name} delay={i * 0.05}>
          <div className="panel h-full p-6">
            <p className="font-display text-sm font-semibold tracking-tight">{a.name}</p>
            <ul className="mt-5 space-y-2">
              {a.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-px w-3 shrink-0" style={{ background: accent }} aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function TransformationEngine() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {transformationEngine.map((s) => (
        <li key={s.n} className="group bg-background p-7 transition-colors hover:bg-surface">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[0.6875rem] tracking-[0.18em]" style={{ color: accent }}>
              {s.n}
            </span>
            <p className="font-display text-base font-semibold uppercase tracking-[0.1em]">{s.title}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
          <span
            className="mt-6 block h-px w-8 transition-all duration-500 group-hover:w-16"
            style={{ background: accent }}
            aria-hidden="true"
          />
        </li>
      ))}
    </ol>
  );
}

export function ValueOutcomes() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {valueOutcomes.map((o) => (
        <div key={o.title} className="bg-background p-7 transition-colors hover:bg-surface md:p-8">
          <p className="font-display text-lg font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>
            {o.title}
          </p>
          <ul className="mt-5 space-y-2.5">
            {o.items.map((it) => (
              <li key={it} className="text-sm leading-relaxed text-muted-foreground">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function BeforeAfter() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
      <Panel>
        <p className="eyebrow">Before</p>
        <ul className="mt-5 space-y-2.5">
          {beforeState.map((s) => (
            <li key={s} className="text-sm leading-relaxed text-muted-foreground">
              {s}
            </li>
          ))}
        </ul>
      </Panel>
      <div className="flex flex-col items-center gap-3 py-2">
        <span
          className="rounded-full border px-4 py-2 text-center font-display text-[0.625rem] uppercase tracking-[0.18em]"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
            background: `color-mix(in oklab, ${accent} 9%, transparent)`,
          }}
        >
          Prism transformation
        </span>
      </div>
      <div
        className="rounded-lg border p-6 md:p-8"
        style={{
          borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
          background: `color-mix(in oklab, ${accent} 7%, transparent)`,
        }}
      >
        <p className="eyebrow">After</p>
        <ul className="mt-5 space-y-2.5">
          {afterState.map((s) => (
            <li key={s} className="text-sm leading-relaxed text-foreground/90">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WhyPrism() {
  return (
    <div className="hairline">
      {whyPrism.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.04}>
          <div className="grid gap-4 border-b border-border py-7 md:grid-cols-[4rem_18rem_1fr] md:items-baseline md:gap-8">
            <span className="font-display text-[0.6875rem] tracking-[0.18em]" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-base font-semibold uppercase tracking-[0.1em]">{p.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
