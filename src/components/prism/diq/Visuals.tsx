import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import {
  DIQ_COLOUR,
  dataFoundation,
  driverTree,
  flywheel,
  heroStack,
  humanAi,
  legacyLoop,
  predictiveChain,
  validationStages,
  valueEquation,
} from "@/lib/decisioniq";

const accent = `var(--prism-colour-${DIQ_COLOUR})`;

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}

export function Chip({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] tracking-tight",
        active ? "text-foreground" : "border-border text-muted-foreground",
      )}
      style={
        active
          ? {
              borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
              background: `color-mix(in oklab, ${accent} 10%, transparent)`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

/** Hero: DATA → COMPUTATION → INTELLIGENCE → DECISIONIQ → DECISION */
export function IntelligenceStack() {
  const reduce = useReducedMotion();
  return (
    <Reveal className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `radial-gradient(55% 55% at 50% 50%, color-mix(in oklab, ${accent} 12%, transparent) 0%, transparent 72%)`,
        }}
      />
      <div className="rounded-xl border border-border bg-surface/40 p-6 md:p-8">
        {heroStack.slice(0, 3).map((layer, li) => (
          <div key={layer.key}>
            <p className="eyebrow">{layer.label}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {layer.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: reduce ? 0 : li * 0.18 + i * 0.04 }}
                >
                  <Chip active={li === 2}>{it}</Chip>
                </motion.li>
              ))}
            </ul>
            <div className="my-5 flex items-center gap-2" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="block w-px rounded-full"
                  style={{ background: accent, height: 22 }}
                  initial={reduce ? { opacity: 0.5 } : { opacity: 0.12, scaleY: 0.4 }}
                  animate={
                    reduce ? { opacity: 0.5 } : { opacity: [0.12, 0.8, 0.12], scaleY: [0.4, 1, 0.4] }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: reduce ? 0 : Infinity,
                    delay: i * 0.1 + li * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}

        <div
          className="rounded-lg border px-5 py-6 text-center"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
            background: `color-mix(in oklab, ${accent} 9%, transparent)`,
            boxShadow: `0 0 70px -22px color-mix(in oklab, ${accent} 60%, transparent)`,
          }}
        >
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em]">Prism DecisionIQ</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Governed data · Computation · AI reasoning · Simulation
          </p>
        </div>

        <div className="my-5 flex justify-center" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <p className="eyebrow">Decision</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {heroStack[3].items.map((it) => (
            <li key={it}>
              <Chip active>{it}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** The legacy loop: data everywhere → reports → analysis → meetings → decisions */
export function LegacyLoopVisual() {
  return (
    <Panel>
      <p className="eyebrow">How it works today</p>
      <ol className="mt-6 space-y-3">
        {legacyLoop.map((s, i) => (
          <Reveal key={s} delay={i * 0.06}>
            <li className="flex items-center gap-3">
              <span className="w-8 text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="flex-1 rounded-md border border-border px-4 py-3 text-sm"
                style={i === legacyLoop.length - 1 ? { borderColor: `color-mix(in oklab, ${accent} 40%, transparent)` } : undefined}
              >
                {s}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
      <p className="mt-6 border-t border-border pt-5 font-display text-sm font-semibold uppercase tracking-tight">
        The intelligence arrives after the decision window.
      </p>
    </Panel>
  );
}

/** Continuously animating seven-step decision loop. */
export function DecisionLoopVisual({ steps }: { steps: { step: string; q: string; copy: string }[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          className="relative bg-background p-6 md:p-7"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.07 }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: accent }}
            animate={reduce ? { opacity: 0.4 } : { opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 3.5, repeat: reduce ? 0 : Infinity, delay: i * 0.45 }}
          />
          <p className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-display text-base font-semibold uppercase tracking-tight">{s.step}</h3>
          <p className="mt-2 text-sm" style={{ color: `color-mix(in oklab, ${accent} 70%, var(--foreground))` }}>
            {s.q}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
        </motion.div>
      ))}
      <div className="flex items-center gap-3 bg-background p-6 md:p-7">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Learn feeds back into See. The loop never stops — which is what makes DecisionIQ a decision
          system rather than a reporting layer.
        </p>
      </div>
    </div>
  );
}

/** Metric → driver → root cause → impact → action tree. */
export function DriverTreeVisual() {
  const tone = (kind: string) =>
    kind === "metric"
      ? { borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`, background: `color-mix(in oklab, ${accent} 10%, transparent)` }
      : kind === "action"
        ? { borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }
        : undefined;
  return (
    <div className="relative">
      <ol className="space-y-2">
        {driverTree.map((n, i) => (
          <Reveal key={n.label} delay={i * 0.05}>
            <li style={{ paddingLeft: `${Math.min(i, 6) * 14}px` }}>
              <div className="flex items-start gap-3 rounded-md border border-border px-4 py-3" style={tone(n.kind)}>
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                <div>
                  <p className="font-display text-sm font-semibold tracking-tight">{n.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.detail}</p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
        {["Metric", "Driver", "Root cause", "Impact", "Action"].map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            {s}
            {i < 4 ? <ArrowRight className="h-3 w-3" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Today → trend → forecast → risk → action */
export function PredictiveChainVisual() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
      {predictiveChain.map((p, i) => (
        <Reveal key={p.step} delay={i * 0.06} className="bg-background p-6">
          <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
          <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-tight">{p.step}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Source systems → data foundation → DecisionIQ → trusted intelligence */
export function DataFoundationVisual() {
  return (
    <Panel>
      <p className="eyebrow">Source systems</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {dataFoundation.sources.map((s) => (
          <li key={s}>
            <Chip>{s}</Chip>
          </li>
        ))}
      </ul>
      <div className="my-5 flex justify-center" aria-hidden="true">
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="eyebrow">Data foundation</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {dataFoundation.foundation.map((s) => (
          <li key={s}>
            <Chip active>{s}</Chip>
          </li>
        ))}
      </ul>
      <div className="my-5 flex justify-center" aria-hidden="true">
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <div
        className="rounded-lg border px-5 py-5 text-center"
        style={{
          borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
          background: `color-mix(in oklab, ${accent} 8%, transparent)`,
        }}
      >
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">Prism DecisionIQ</p>
      </div>
      <div className="my-5 flex justify-center" aria-hidden="true">
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-center font-display text-lg font-semibold uppercase tracking-tight">
        Trusted intelligence
      </p>
    </Panel>
  );
}

export function ValidationVisual() {
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {validationStages.map((v, i) => (
          <Reveal key={v.name} delay={i * 0.05} className="bg-background p-6">
            <p className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-tight">{v.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.copy}</p>
          </Reveal>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {["Validated data", "Trusted KPI", "AI intelligence"].map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            <span
              className="rounded-full border px-4 py-2 text-xs font-medium"
              style={{ borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }}
            >
              {s}
            </span>
            {i < 2 ? <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HumanAiVisual() {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <Panel>
        <p className="eyebrow">AI</p>
        <ul className="mt-4 space-y-2">
          {humanAi.ai.map((a) => (
            <li key={a} className="text-sm text-muted-foreground">
              {a}
            </li>
          ))}
        </ul>
      </Panel>
      <span className="justify-self-center font-display text-2xl text-muted-foreground">+</span>
      <Panel>
        <p className="eyebrow">Leaders</p>
        <ul className="mt-4 space-y-2">
          {humanAi.leaders.map((a) => (
            <li key={a} className="text-sm text-muted-foreground">
              {a}
            </li>
          ))}
        </ul>
      </Panel>
      <span className="justify-self-center font-display text-2xl text-muted-foreground">=</span>
      <div
        className="rounded-xl border p-6 md:p-8"
        style={{
          borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
          background: `color-mix(in oklab, ${accent} 8%, transparent)`,
        }}
      >
        <p className="font-display text-xl font-semibold uppercase tracking-tight">Better decisions</p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          DecisionIQ is decision support with governance — never uncontrolled autonomous
          decision-making.
        </p>
      </div>
    </div>
  );
}

export function ValueEquationVisual() {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {valueEquation.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.07}>
            <Panel>
              <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-tight">{v.title}</h3>
              <ul className="mt-4 space-y-2">
                {v.items.map((it) => (
                  <li key={it} className="text-sm text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center font-display text-2xl font-semibold uppercase tracking-tight md:text-4xl">
        Enterprise value creation
      </p>
    </div>
  );
}

/** Signature animated flywheel. */
export function FlywheelVisual() {
  const reduce = useReducedMotion();
  const r = 132;
  return (
    <div className="mx-auto w-full max-w-xl">
      <svg viewBox="0 0 360 360" className="h-auto w-full" role="img" aria-label="DecisionIQ flywheel">
        <defs>
          <radialGradient id="diq-fly" cx="50%" cy="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="180" cy="180" r="150" fill="url(#diq-fly)" />
        <circle cx="180" cy="180" r={r} fill="none" stroke="currentColor" strokeOpacity="0.14" />
        <motion.circle
          cx="180"
          cy="180"
          r={r}
          fill="none"
          stroke={accent}
          strokeOpacity="0.7"
          strokeDasharray="40 790"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: reduce ? 0 : Infinity, ease: "linear" }}
          style={{ originX: "180px", originY: "180px" }}
        />
        {flywheel.map((f, i) => {
          const a = (i / flywheel.length) * Math.PI * 2 - Math.PI / 2;
          const x = 180 + Math.cos(a) * r;
          const y = 180 + Math.sin(a) * r;
          return (
            <g key={f}>
              <circle cx={x} cy={y} r="4" fill={accent} />
              <text
                x={x + Math.cos(a) * 20}
                y={y + Math.sin(a) * 20}
                textAnchor={Math.abs(Math.cos(a)) < 0.3 ? "middle" : Math.cos(a) > 0 ? "start" : "end"}
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="11"
                letterSpacing="1.4"
                style={{ textTransform: "uppercase" }}
              >
                {f}
              </text>
            </g>
          );
        })}
        <text
          x="180"
          y="176"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          letterSpacing="2.4"
          fontWeight="600"
        >
          DECISIONIQ
        </text>
        <text x="180" y="196" textAnchor="middle" fill="currentColor" fontSize="9" opacity="0.6" letterSpacing="1.2">
          BETTER DECISIONS COMPOUND
        </text>
      </svg>
    </div>
  );
}
