import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import { decisionLoop, stackLayers, type ModuleStatus } from "@/lib/spectraiq";

export function StatusTag({ status, className }: { status: ModuleStatus; className?: string }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.16em]",
        live ? "border-prism-4/40 text-prism-4" : "border-border-strong text-muted-foreground",
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: live ? "var(--prism-colour-4)" : "var(--color-muted-foreground)" }}
      />
      {live ? "Live" : "Roadmap"}
    </span>
  );
}

/** The signature SpectraIQ visual: dealership systems converge into one intelligence layer. */
export function IntelligenceLayer({
  inputs,
  outputs,
  centre = "SpectraIQ Intelligence Layer",
  compact = false,
}: {
  inputs: string[];
  outputs: string[];
  centre?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("relative w-full", compact ? "py-6" : "py-10")}>
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
        <ul className="space-y-1.5">
          {inputs.map((label, i) => (
            <motion.li
              key={label}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="hairline flex items-center justify-between gap-3 rounded-md bg-surface/40 px-3.5 py-2.5 text-xs tracking-tight text-foreground/85 md:text-[0.8125rem]"
            >
              <span className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </motion.li>
          ))}
        </ul>

        <div className="relative mx-auto w-full max-w-[280px] lg:w-[280px]">
          <svg viewBox="0 0 280 320" className="h-auto w-full" role="img" aria-label={centre}>
            <defs>
              <linearGradient id="siq-prism" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--prism-colour-7)" stopOpacity="0.85" />
                <stop offset="35%" stopColor="var(--prism-colour-5)" stopOpacity="0.7" />
                <stop offset="70%" stopColor="var(--prism-colour-3)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--prism-colour-1)" stopOpacity="0.75" />
              </linearGradient>
              <radialGradient id="siq-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--prism-colour-5)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--prism-colour-5)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="140" cy="160" r="130" fill="url(#siq-halo)" />

            {/* converging streams */}
            {[70, 100, 130, 160, 190, 220, 250].map((y, i) => (
              <motion.path
                key={y}
                d={`M0 ${y} C 60 ${y}, 80 160, 108 160`}
                fill="none"
                stroke={`var(--prism-colour-${(i % 7) + 1})`}
                strokeWidth="0.9"
                strokeOpacity="0.55"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: "easeOut" }}
              />
            ))}

            {/* the layer: a precision-cut slab */}
            <g>
              <rect
                x="108"
                y="76"
                width="64"
                height="168"
                rx="6"
                fill="url(#siq-prism)"
                fillOpacity="0.14"
                stroke="url(#siq-prism)"
                strokeWidth="1"
              />
              <rect x="108" y="76" width="64" height="168" rx="6" fill="none" stroke="var(--color-border-strong)" strokeWidth="0.4" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.rect
                  key={i}
                  x="112"
                  y={86 + i * 22}
                  width="56"
                  height="2"
                  rx="1"
                  fill={`var(--prism-colour-${i + 1})`}
                  initial={reduce ? { opacity: 0.7 } : { opacity: 0.15 }}
                  animate={reduce ? { opacity: 0.7 } : { opacity: [0.2, 0.85, 0.2] }}
                  transition={{ duration: 3.6, delay: i * 0.28, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </g>

            {/* refracted outputs */}
            {[92, 132, 172, 212].map((y, i) => (
              <motion.path
                key={y}
                d={`M172 160 C 205 160, 220 ${y}, 280 ${y}`}
                fill="none"
                stroke={`var(--prism-colour-${i + 3})`}
                strokeWidth="1.1"
                strokeOpacity="0.75"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 + i * 0.09, ease: "easeOut" }}
              />
            ))}
          </svg>
          <p className="mt-3 text-center text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">{centre}</p>
        </div>

        <ul className="space-y-1.5">
          {outputs.map((label, i) => (
            <motion.li
              key={label}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
              className="flex items-center gap-3 rounded-md border px-3.5 py-2.5 text-xs font-medium tracking-tight md:text-[0.8125rem]"
              style={{
                borderColor: `color-mix(in oklab, var(--prism-colour-${i + 3}) 40%, transparent)`,
                background: `color-mix(in oklab, var(--prism-colour-${i + 3}) 7%, transparent)`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--prism-colour-${i + 3})` }} />
              {label}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Vertical chain of labelled steps with a spectrum spine. */
export function ChainRail({
  steps,
  colour = 5,
  dense = false,
}: {
  steps: (string | { label: string; note?: string })[];
  colour?: number;
  dense?: boolean;
}) {
  const items = steps.map((s) => (typeof s === "string" ? { label: s } : s));
  return (
    <ol className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ background: `linear-gradient(to bottom, var(--prism-colour-${colour}), transparent)` }}
      />
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.05}>
          <li className={cn("relative", dense ? "py-2" : "py-3.5")}>
            <span
              aria-hidden="true"
              className="absolute -left-[26px] top-[1.05rem] h-[7px] w-[7px] rounded-full"
              style={{ background: `var(--prism-colour-${colour})` }}
            />
            <p className="font-display text-sm font-medium tracking-tight text-foreground">{s.label}</p>
            {s.note ? <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.note}</p> : null}
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/** Horizontal wrap-around flow with arrows. */
export function FlowChips({ steps, colour = 5 }: { steps: string[]; colour?: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((s, i) => (
        <Reveal key={s} delay={i * 0.05} className="flex items-center gap-2">
          <li
            className="rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight text-foreground/90"
            style={{
              borderColor: `color-mix(in oklab, var(--prism-colour-${colour}) 32%, transparent)`,
              background: `color-mix(in oklab, var(--prism-colour-${colour}) 6%, transparent)`,
            }}
          >
            {s}
          </li>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="text-xs text-muted-foreground">
              →
            </span>
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}

export function DecisionLoopVisual() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
      {decisionLoop.map((d, i) => (
        <motion.div
          key={d.step}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.07 }}
          className="group relative bg-background p-6 transition-colors hover:bg-surface"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: `var(--prism-colour-${i + 1})` }}
          />
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{d.step}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.q}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function StackDiagram() {
  return (
    <div className="space-y-2">
      {stackLayers.map((l, i) => (
        <Reveal key={l.name} delay={i * 0.06}>
          <div
            className="group grid gap-4 rounded-lg border p-5 transition-all duration-300 hover:translate-x-1 md:grid-cols-[200px_1fr] md:p-6"
            style={{
              borderColor: `color-mix(in oklab, var(--prism-colour-${l.colour}) 26%, var(--color-border))`,
              background: `linear-gradient(90deg, color-mix(in oklab, var(--prism-colour-${l.colour}) 8%, transparent), transparent 60%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-px" style={{ background: `var(--prism-colour-${l.colour})` }} aria-hidden="true" />
              <div>
                <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Layer {String(stackLayers.length - i).padStart(2, "0")}
                </p>
                <h3 className="font-display text-base font-semibold tracking-tight">{l.name}</h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {l.items.map((it) => (
                <span key={it} className="hairline rounded-full bg-surface/50 px-3 py-1 text-xs text-foreground/80">
                  {it}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function RooftopFabric() {
  const reduce = useReducedMotion() ?? false;
  const rooftops = ["Rooftop 01", "Rooftop 02", "Rooftop 03", "Rooftop 04"];
  return (
    <div className="space-y-8">
      <div className="grid gap-2 sm:grid-cols-4">
        {rooftops.map((r, i) => (
          <motion.div
            key={r}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="hairline rounded-md bg-surface/40 px-4 py-4 text-center"
          >
            <p className="font-display text-sm font-medium tracking-tight">{r}</p>
            <p className="mt-1 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              CRM · DMS · Service · Parts
            </p>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 800 90" className="h-16 w-full" aria-hidden="true">
        {[100, 300, 500, 700].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 0 C ${x} 45, 400 45, 400 90`}
            fill="none"
            stroke={`var(--prism-colour-${i + 2})`}
            strokeWidth="1"
            strokeOpacity="0.6"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.08 }}
          />
        ))}
      </svg>
      <div className="mx-auto max-w-md rounded-lg border border-border-strong bg-surface/60 p-6 text-center">
        <p className="spectrum-text font-display text-xl font-semibold tracking-tight">SpectraIQ</p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">One intelligence layer</p>
      </div>
      <div className="mx-auto max-w-md text-center">
        <span aria-hidden="true" className="mx-auto block h-8 w-px bg-border-strong" />
        <p className="mt-4 font-display text-lg font-semibold tracking-tight">Group intelligence</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Comparable performance across every rooftop, on shared definitions and one data model.
        </p>
      </div>
    </div>
  );
}

export function ScaleHierarchy() {
  const levels = [
    { label: "Group", note: "Portfolio performance and where to invest attention." },
    { label: "Rooftop", note: "Site-level performance against comparable measures." },
    { label: "Department", note: "Sales, service, parts and marketing contribution." },
    { label: "Employee", note: "Activity, response and conversion behaviour." },
    { label: "Customer", note: "The individual opportunity and next best action." },
  ];
  return (
    <div className="space-y-2">
      {levels.map((l, i) => (
        <Reveal key={l.label} delay={i * 0.06}>
          <div
            className="flex flex-col gap-2 rounded-lg border border-border bg-background p-5 sm:flex-row sm:items-center sm:gap-6"
            style={{ marginLeft: `calc(${i} * 1.75rem)` }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: `var(--prism-colour-${i + 2})` }}
                aria-hidden="true"
              />
              <p className="font-display text-sm font-semibold tracking-tight">{l.label}</p>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{l.note}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}
