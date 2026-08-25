import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Minus, Plus } from "lucide-react";
import {
  AIX_COLOUR,
  domains,
  faqs,
  opportunityMap,
  openQuestions,
  techStack,
  workflowAfter,
  workflowBefore,
} from "@/lib/ai-transformation";
import { cn } from "@/lib/utils";

const accent = `var(--prism-colour-${AIX_COLOUR})`;
const tint = (pct: number) => `color-mix(in oklab, ${accent} ${pct}%, transparent)`;

/** 02 — The questions every leadership team is asking. */
export function ProblemGrid() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {openQuestions.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={item.q}
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            onMouseEnter={() => setOpen(i)}
            className={cn(
              "group flex min-h-[8.5rem] flex-col items-start bg-background p-6 text-left transition-colors",
              isOpen ? "bg-surface" : "hover:bg-surface/70",
            )}
          >
            <span
              className="h-px w-6 transition-all duration-500 group-hover:w-12"
              style={{ background: isOpen ? accent : "var(--border-strong, var(--border))" }}
              aria-hidden="true"
            />
            <span className="mt-5 font-display text-sm font-semibold leading-snug tracking-tight">
              “{item.q}”
            </span>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block overflow-hidden text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-3 block">{item.a}</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

/** 04 — AI opportunity map: pick a function, reveal the opportunities. */
export function OpportunityMap() {
  const [group, setGroup] = useState(0);
  const [fn, setFn] = useState(0);
  const current = opportunityMap[group]!;
  const active = current.functions[Math.min(fn, current.functions.length - 1)]!;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex flex-wrap gap-px bg-border">
        {opportunityMap.map((g, i) => (
          <button
            key={g.group}
            type="button"
            onClick={() => {
              setGroup(i);
              setFn(0);
            }}
            className={cn(
              "flex-1 bg-background px-5 py-4 text-left transition-colors",
              group === i ? "bg-surface" : "hover:bg-surface/60",
            )}
          >
            <span
              className="block h-px w-8"
              style={{ background: group === i ? accent : "var(--border)" }}
              aria-hidden="true"
            />
            <span className="mt-3 block font-display text-sm font-semibold uppercase tracking-[0.12em]">
              {g.group}
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">{g.blurb}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-px bg-border md:grid-cols-[minmax(0,15rem)_1fr]">
        <ul className="bg-background p-3">
          {current.functions.map((f, i) => {
            const isActive = active.name === f.name;
            return (
              <li key={f.name}>
                <button
                  type="button"
                  onMouseEnter={() => setFn(i)}
                  onFocus={() => setFn(i)}
                  onClick={() => setFn(i)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={isActive ? { background: tint(10) } : undefined}
                >
                  {f.name}
                  <ArrowRight
                    className={cn("h-3.5 w-3.5 transition-opacity", isActive ? "opacity-70" : "opacity-0")}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="bg-background p-6 md:p-8">
          <p className="eyebrow">AI opportunities — {active.name}</p>
          <AnimatePresence mode="wait">
            <motion.ul
              key={active.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {active.opportunities.map((o) => (
                <li
                  key={o}
                  className="rounded-full border px-3.5 py-1.5 text-xs text-foreground/90"
                  style={{ borderColor: tint(35), background: tint(7) }}
                >
                  {o}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every opportunity in this map is a candidate, not a commitment. Value, effort, data readiness and
            risk decide the sequence.
          </p>
        </div>
      </div>
    </div>
  );
}

/** 09 — Don't automate the old process. Reimagine the workflow. */
export function WorkflowTransform() {
  const [after, setAfter] = useState(false);
  const steps = after ? workflowAfter : workflowBefore;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-border p-1">
          {[
            { label: "Traditional workflow", v: false },
            { label: "AI-enabled workflow", v: true },
          ].map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setAfter(t.v)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                after === t.v ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              style={after === t.v ? { background: tint(14) } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {after ? "Six steps. Intelligence first, humans on the exceptions." : "Seven steps. Every one of them manual."}
        </p>
      </div>

      <ol className="mt-8 flex flex-wrap items-stretch gap-2">
        <AnimatePresence mode="popLayout">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              layout
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-md border px-4 py-3 text-xs font-medium tracking-tight md:text-sm"
              style={{
                borderColor: after ? tint(38) : "var(--border)",
                background: after ? tint(8) : "transparent",
              }}
            >
              <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}

/** 12 — Layered AI technology architecture with hover detail. */
export function TechStackLayers() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
      {techStack.map((l, i) => {
        const isActive = active === i;
        return (
          <button
            key={l.layer}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="grid gap-4 bg-background p-6 text-left transition-colors md:grid-cols-[minmax(0,14rem)_1fr] md:p-8"
            style={isActive ? { background: tint(6) } : undefined}
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-2 h-px shrink-0 transition-all duration-500"
                style={{ width: isActive ? 32 : 16, background: isActive ? accent : "var(--border)" }}
                aria-hidden="true"
              />
              <span>
                <span className="block font-display text-base font-semibold tracking-tight">{l.layer}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{l.copy}</span>
              </span>
            </div>
            <ul className="flex flex-wrap items-start gap-2">
              {l.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border px-3 py-1.5 text-xs transition-colors"
                  style={{
                    borderColor: isActive ? tint(35) : "var(--border)",
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {it}
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}

/** 13 — Transformation domains, each expanding to its AI opportunities. */
export function DomainGrid() {
  const [open, setOpen] = useState<string | null>(domains[0]!.name);
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {domains.map((d) => {
        const isOpen = open === d.name;
        return (
          <div key={d.name} className="bg-background">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : d.name)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-display text-sm font-semibold tracking-tight">{d.name}</span>
              <span className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                See AI opportunities
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                  style={{ color: isOpen ? accent : undefined }}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 px-6 pb-6">
                    {d.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span
                          className="mt-2 h-px w-3 shrink-0"
                          style={{ background: accent }}
                          aria-hidden="true"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const money = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}m`
    : `$${Math.round(n / 1000).toLocaleString("en-AU")}k`;

type NumField = { key: string; label: string; step: number; suffix?: string; prefix?: string };

const numFields: NumField[] = [
  { key: "revenue", label: "Annual revenue", step: 500_000, prefix: "$" },
  { key: "opex", label: "Annual operating costs", step: 250_000, prefix: "$" },
  { key: "employees", label: "Employees", step: 5 },
  { key: "manualHours", label: "Manual hours per week (team-wide)", step: 25 },
  { key: "labourCost", label: "Average labour cost per hour", step: 5, prefix: "$" },
];

/** 19 — Illustrative AI value model. */
export function ValueCalculator() {
  const reduce = useReducedMotion() ?? false;
  const [v, setV] = useState<Record<string, number>>({
    revenue: 25_000_000,
    opex: 18_000_000,
    employees: 120,
    manualHours: 400,
    labourCost: 55,
  });
  const [sliders, setSliders] = useState({ automation: 35, productivity: 20, revenueUplift: 2 });

  const result = useMemo(() => {
    const annualManualCost = v['manualHours']! * 52 * v['labourCost']!;
    const costOpportunity = annualManualCost * (sliders.automation / 100) + v['opex']! * (sliders.automation / 100) * 0.01;
    const capacityHours = v['manualHours']! * 52 * (sliders.productivity / 100);
    const productivityValue = capacityHours * v['labourCost']!;
    const revenueOpportunity = v['revenue']! * (sliders.revenueUplift / 100);
    const annualValue = costOpportunity + productivityValue + revenueOpportunity * 0.35;
    const investment = Math.max(120_000, annualValue * 0.3);
    const paybackMonths = annualValue > 0 ? Math.max(2, Math.round((investment / annualValue) * 12)) : 0;
    return { costOpportunity, capacityHours, productivityValue, revenueOpportunity, annualValue, paybackMonths };
  }, [v, sliders]);

  const step = (key: string, dir: 1 | -1, amount: number) =>
    setV((s) => ({ ...s, [key]: Math.max(0, (s[key] ?? 0) + dir * amount) }));

  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-[1.1fr_1fr]">
      <div className="bg-background p-6 md:p-8">
        <p className="eyebrow">Your business</p>
        <div className="mt-6 space-y-3">
          {numFields.map((f) => (
            <div key={f.key} className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <label className="text-sm text-muted-foreground">{f.label}</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Decrease ${f.label}`}
                  onClick={() => step(f.key, -1, f.step)}
                  className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="min-w-[6.5rem] text-right font-display text-sm font-semibold tabular-nums">
                  {f.prefix ?? ""}
                  {(v[f.key] ?? 0).toLocaleString("en-AU")}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${f.label}`}
                  onClick={() => step(f.key, 1, f.step)}
                  className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="eyebrow mt-8">Potential</p>
        <div className="mt-5 space-y-6">
          {[
            { key: "automation", label: "Automation potential", max: 80 },
            { key: "productivity", label: "AI productivity potential", max: 60 },
            { key: "revenueUplift", label: "Revenue uplift potential", max: 10 },
          ].map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor={`aix-${s.key}`} className="text-muted-foreground">
                  {s.label}
                </label>
                <span className="font-display font-semibold tabular-nums">
                  {sliders[s.key as keyof typeof sliders]}%
                </span>
              </div>
              <input
                id={`aix-${s.key}`}
                type="range"
                min={0}
                max={s.max}
                value={sliders[s.key as keyof typeof sliders]}
                onChange={(e) => setSliders((p) => ({ ...p, [s.key]: Number(e.target.value) }))}
                className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-foreground"
                style={{ accentColor: accent }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background p-6 md:p-8" style={{ background: tint(4) }}>
        <p className="eyebrow">Potential value</p>
        <motion.p
          key={Math.round(result.annualValue)}
          initial={reduce ? {} : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl"
          style={{ color: accent }}
        >
          {money(result.annualValue)}
        </motion.p>
        <p className="mt-2 text-sm text-muted-foreground">Estimated annual value</p>

        <dl className="mt-8 space-y-4">
          {[
            ["Revenue opportunity", money(result.revenueOpportunity)],
            ["Cost opportunity", money(result.costOpportunity)],
            ["Productivity capacity", `${Math.round(result.capacityHours).toLocaleString("en-AU")} hrs`],
            ["Capacity value", money(result.productivityValue)],
            ["Indicative payback", `${result.paybackMonths} months`],
          ].map(([k, val]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="font-display text-sm font-semibold tabular-nums">{val}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Illustrative modelling only — actual value depends on the business, process, data and implementation.
          Prism replaces these assumptions with a validated model during Quantify.
        </p>
      </div>
    </div>
  );
}

/** 22 — FAQs. */
export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-surface/60"
            >
              <span className="font-display text-sm font-semibold tracking-tight md:text-base">{f.q}</span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
                style={{ color: isOpen ? accent : undefined }}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
