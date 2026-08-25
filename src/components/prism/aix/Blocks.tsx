import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import {
  AIX_COLOUR,
  accelerators,
  agentExamples,
  autonomySteps,
  beforeAfter,
  caseStudyFields,
  dataStack,
  flywheel,
  governanceItems,
  humanAi,
  maturity,
  roadmap,
  sourcingOptions,
  transformationDimensions,
  valueEngine,
  valueEquation,
  valueLevels,
  valueMetrics,
  valueRealisation,
} from "@/lib/ai-transformation";
import { cn } from "@/lib/utils";

const accent = `var(--prism-colour-${AIX_COLOUR})`;
const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, transparent)`;

export function DimensionLadder() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {transformationDimensions.map((d, i) => (
        <div key={d.title} className="bg-background p-6 transition-colors hover:bg-surface md:p-7">
          <p className="font-display text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="h-px w-6" style={{ background: accent }} aria-hidden="true" />
            <h3 className="font-display text-sm font-semibold tracking-tight">{d.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function ValueEngine() {
  return (
    <div className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
      {valueEngine.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.04}>
          <div className="grid gap-6 bg-background p-6 md:grid-cols-[minmax(0,20rem)_1fr] md:p-8">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold tabular-nums" style={{ color: tint(70) }}>
                  {s.n}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">{s.name}</h3>
              </div>
              <p className="mt-3 font-display text-sm font-medium" style={{ color: accent }}>
                {s.tagline}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {s.assess ? (
                <div>
                  <p className="eyebrow">We assess</p>
                  <ul className="mt-4 space-y-2">
                    {s.assess.map((a) => (
                      <li key={a} className="text-sm text-muted-foreground">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <p className="eyebrow">Outputs</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <li
                      key={o}
                      className="rounded-full border px-3 py-1.5 text-xs"
                      style={{ borderColor: tint(35), background: tint(7) }}
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ValueEquation() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-display text-sm font-semibold uppercase tracking-[0.14em]">AI value</span>
      <span className="text-muted-foreground">=</span>
      {valueEquation.map((v, i) => (
        <span key={v} className="flex items-center gap-3">
          <span
            className="rounded-md border px-4 py-2.5 font-display text-sm font-medium"
            style={{ borderColor: tint(38), background: tint(8) }}
          >
            {v}
          </span>
          {i < valueEquation.length - 1 ? <span className="text-muted-foreground">+</span> : null}
        </span>
      ))}
    </div>
  );
}

export function ValueLevels() {
  return (
    <div className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
      {valueLevels.map((l, i) => (
        <div
          key={l.n}
          className="grid gap-5 bg-background p-6 transition-colors hover:bg-surface md:grid-cols-[minmax(0,18rem)_1fr] md:p-8"
        >
          <div className="flex items-start gap-4">
            <span
              className="mt-1 block w-1 self-stretch rounded-full"
              style={{ background: tint(25 + i * 18) }}
              aria-hidden="true"
            />
            <span>
              <span className="block font-display text-xs text-muted-foreground">Level {l.n}</span>
              <span className="mt-1 block font-display text-lg font-semibold uppercase tracking-tight">
                {l.name}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{l.statement}</span>
            </span>
          </div>
          <ul className="flex flex-wrap items-start gap-2">
            {l.items.map((it) => (
              <li key={it} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function HumanPlusAi() {
  return (
    <div className="grid items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <Column title="Humans" items={humanAi.humans} />
      <Operator symbol="+" />
      <Column title="AI" items={humanAi.ai} accented />
      <Operator symbol="=" />
      <div className="flex flex-col justify-center bg-background p-6 md:p-8" style={{ background: tint(6) }}>
        <p className="eyebrow">Result</p>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight">AI-enabled workforce</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          People keep judgement, relationships and accountability. AI takes the analysis, execution and
          monitoring. Roles are redesigned, not deleted.
        </p>
      </div>
    </div>
  );
}

function Column({ title, items, accented }: { title: string; items: string[]; accented?: boolean }) {
  return (
    <div className="bg-background p-6 md:p-8">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span
              className="h-px w-4"
              style={{ background: accented ? accent : "var(--border)" }}
              aria-hidden="true"
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return (
    <div className="flex items-center justify-center bg-background px-4 py-3 text-lg text-muted-foreground">
      {symbol}
    </div>
  );
}

export function Autonomy() {
  return (
    <ol className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
      {autonomySteps.map((s, i) => (
        <li key={s.name} className="grid gap-4 bg-background p-6 md:grid-cols-[minmax(0,12rem)_1fr] md:p-7">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="font-display text-base font-semibold uppercase tracking-[0.1em]"
              style={{ color: i === autonomySteps.length - 1 ? accent : undefined }}
            >
              {s.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
        </li>
      ))}
    </ol>
  );
}

export function FlowCards({
  items,
  eyebrow,
}: {
  items: { name: string; flow: string[] }[];
  eyebrow?: string;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
      {items.map((a) => (
        <div key={a.name} className="bg-background p-6 md:p-7">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h3 className="mt-3 font-display text-base font-semibold tracking-tight">{a.name}</h3>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {a.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-2">
                <span
                  className="rounded-md border px-3 py-1.5 text-xs text-foreground/90"
                  style={{ borderColor: tint(30), background: tint(6) }}
                >
                  {f}
                </span>
                {i < a.flow.length - 1 ? (
                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export function DataFoundation() {
  return (
    <div className="space-y-3">
      {dataStack.map((l, i) => (
        <Reveal key={l.layer} delay={i * 0.06}>
          <div
            className="rounded-lg border p-6 md:p-7"
            style={{
              borderColor: i === dataStack.length - 1 ? tint(40) : "var(--border)",
              background: i === dataStack.length - 1 ? tint(7) : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-xs tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em]">{l.layer}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {l.items.map((it) => (
                <li key={it} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                  {it}
                </li>
              ))}
            </ul>
          </div>
          {i < dataStack.length - 1 ? (
            <div className="flex justify-center py-2" aria-hidden="true">
              <span className="h-6 w-px" style={{ background: tint(50) }} />
            </div>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}

export function Sourcing() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
      {sourcingOptions.map((s) => (
        <div key={s.name} className="bg-background p-6 transition-colors hover:bg-surface">
          <p className="font-display text-lg font-semibold uppercase tracking-tight" style={{ color: accent }}>
            {s.name}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function Governance() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,22rem)]">
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
        {governanceItems.map((g) => (
          <li key={g} className="bg-background px-5 py-5 text-sm text-muted-foreground transition-colors hover:bg-surface">
            <span className="mb-3 block h-px w-5" style={{ background: accent }} aria-hidden="true" />
            {g}
          </li>
        ))}
      </ul>
      <div className="rounded-lg border p-6 md:p-8" style={{ borderColor: tint(38), background: tint(6) }}>
        <p className="eyebrow">The balance</p>
        <div className="mt-6 flex items-center justify-between font-display text-sm font-semibold uppercase tracking-[0.12em]">
          <span>Innovation</span>
          <span className="mx-4 h-px flex-1" style={{ background: tint(60) }} aria-hidden="true" />
          <span>Control</span>
        </div>
        <p className="mt-6 font-display text-2xl font-semibold tracking-tight">Freedom within a framework.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Teams should be able to move quickly because the guardrails, oversight and audit trail already exist.
        </p>
      </div>
    </div>
  );
}

export function MaturityModel() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
      {maturity.map((m, i) => (
        <div key={m.n} className="bg-background p-6">
          <motion.span
            className="block h-1 rounded-full"
            style={{ background: tint(22 + i * 18) }}
            initial={reduce ? { width: "100%" } : { width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            aria-hidden="true"
          />
          <p className="mt-5 font-display text-xs text-muted-foreground">{m.n}</p>
          <h3 className="mt-2 font-display text-base font-semibold uppercase tracking-tight">{m.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function Roadmap() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
      {roadmap.map((r) => (
        <div key={r.name} className="bg-background p-6">
          <p className="font-display text-xs uppercase tracking-[0.14em]" style={{ color: accent }}>
            {r.when}
          </p>
          <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{r.name}</h3>
          <ul className="mt-4 space-y-2">
            {r.items.map((i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Accelerators() {
  return <FlowCards items={accelerators} eyebrow="Prism accelerator" />;
}

export function AgentExamples() {
  return <FlowCards items={agentExamples} eyebrow="Agent pattern" />;
}

export function BeforeAfter() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
      <div className="bg-background p-6 md:p-8">
        <p className="eyebrow">Before</p>
        <ul className="mt-6 space-y-3">
          {beforeAfter.before.map((b) => (
            <li key={b} className="font-display text-lg tracking-tight text-muted-foreground">
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-background p-6 md:p-8" style={{ background: tint(6) }}>
        <p className="eyebrow">After</p>
        <ul className="mt-6 space-y-3">
          {beforeAfter.after.map((a) => (
            <li key={a} className="font-display text-lg font-medium tracking-tight">
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Humans focus on decisions, relationships and exceptions.
        </p>
      </div>
    </div>
  );
}

export function ValueRealisation() {
  return (
    <div>
      <ol className="flex flex-wrap items-center gap-2">
        {valueRealisation.map((v, i) => (
          <li key={v} className="flex items-center gap-2">
            <span
              className="rounded-md border px-4 py-2.5 font-display text-sm font-medium"
              style={{ borderColor: tint(34), background: tint(7) }}
            >
              {v}
            </span>
            {i < valueRealisation.length - 1 ? (
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <p className="eyebrow">What we track</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {valueMetrics.map((m) => (
            <li key={m} className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CaseStudyFormat() {
  return (
    <div className="rounded-lg border border-border p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">Case study format</p>
        <span
          className="rounded-full border px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground"
          style={{ borderColor: tint(30) }}
        >
          Case studies coming soon
        </span>
      </div>
      <ol className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {caseStudyFields.map((f, i) => (
          <li key={f} className="bg-background p-5">
            <span className="font-display text-xs tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-display text-sm font-semibold tracking-tight">{f}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Prism publishes outcomes only where they can be evidenced and approved by the client. No invented
        metrics, ever.
      </p>
    </div>
  );
}

export function Flywheel() {
  const reduce = useReducedMotion() ?? false;
  const r = 128;
  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
      <div className="relative h-[22rem] w-[22rem] shrink-0">
        <motion.div
          className="absolute inset-6 rounded-full border"
          style={{ borderColor: tint(30) }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        {flywheel.map((f, i) => {
          const angle = (i / flywheel.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={f}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-background px-3 py-1.5 text-[0.7rem] font-medium"
              style={{
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
                borderColor: tint(36),
              }}
            >
              {f}
            </span>
          );
        })}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display text-sm font-semibold uppercase tracking-[0.14em]">
          AI value
          <br />
          flywheel
        </span>
      </div>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
        AI transformation is not a project with an end date. Each cycle produces evidence, and that evidence
        funds and directs the next one — until intelligence becomes a permanent business capability.
      </p>
    </div>
  );
}

export function JourneyChoices() {
  const choices = [
    {
      title: "I don't know where to start",
      action: "AI Opportunity Assessment",
      copy: "A structured discovery of where AI can create value in your business.",
    },
    {
      title: "I have a specific problem",
      action: "Explore an AI solution",
      copy: "Bring a workflow, a cost or a bottleneck and we will model the opportunity.",
    },
    {
      title: "I'm ready to transform",
      action: "Talk to Prism",
      copy: "Move straight into quantification, design and delivery.",
    },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
      {choices.map((c, i) => (
        <a
          key={c.title}
          href={`/contact?intent=${encodeURIComponent(c.action)}`}
          className={cn("group bg-background p-7 transition-colors hover:bg-surface md:p-8")}
          style={i === 2 ? { background: tint(7) } : undefined}
        >
          <p className="font-display text-lg font-semibold leading-snug tracking-tight">{c.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
          <span
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {c.action}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      ))}
    </div>
  );
}
