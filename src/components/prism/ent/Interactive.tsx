import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import { Chain, Chip, Panel } from "@/components/prism/ent/Visuals";
import {
  ENT_COLOUR,
  architecture,
  capabilities,
  enterpriseMap,
  faqs,
  maturityLevels,
  processAfter,
  processBefore,
  sourcingOptions,
} from "@/lib/enterprise-technology";

const accent = `var(--prism-colour-${ENT_COLOUR})`;

/** 04 — the seven capability areas, explorable. */
export function CapabilityPortfolio() {
  const [i, setI] = useState(0);
  const active = capabilities[i]!;
  return (
    <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-16">
      <ul className="hairline space-y-px">
        {capabilities.map((c, idx) => {
          const on = idx === i;
          return (
            <li key={c.index}>
              <button
                type="button"
                onClick={() => setI(idx)}
                onMouseEnter={() => setI(idx)}
                onFocus={() => setI(idx)}
                aria-pressed={on}
                className="group flex w-full items-center gap-4 border-b border-border py-4 text-left transition-colors"
              >
                <span
                  className="h-6 w-px shrink-0 transition-all duration-500"
                  style={{ background: accent, opacity: on ? 1 : 0.25, height: on ? 28 : 16 }}
                  aria-hidden="true"
                />
                <span className="font-display text-[0.6875rem] tracking-[0.18em] text-muted-foreground">
                  {c.index}
                </span>
                <span
                  className={cn(
                    "font-display text-sm font-medium tracking-tight transition-colors",
                    on ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="min-h-[24rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">
              {active.index} — {active.name}
            </p>
            <h3 className="display-md mt-5 max-w-2xl">{active.positioning}</h3>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {active.detail}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {active.items.map((it) => (
                <li key={it}>
                  <Chip active>{it}</Chip>
                </li>
              ))}
            </ul>
            {active.note ? (
              <p className="mt-7 max-w-2xl border-l border-border pl-4 text-xs leading-relaxed text-muted-foreground/80">
                {active.note}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** 06 — interactive layered enterprise architecture. */
export function ArchitectureLayers() {
  const [i, setI] = useState(2);
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:gap-12">
      <div className="space-y-2">
        {architecture.map((l, idx) => {
          const on = idx === i;
          return (
            <button
              key={l.name}
              type="button"
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              onClick={() => setI(idx)}
              aria-pressed={on}
              className="flex w-full flex-col items-stretch rounded-lg border p-5 text-left transition-all duration-300 md:flex-row md:items-center md:gap-6"
              style={{
                borderColor: on ? `color-mix(in oklab, ${accent} 50%, transparent)` : "var(--border)",
                background: on ? `color-mix(in oklab, ${accent} 7%, transparent)` : "transparent",
              }}
            >
              <span className="min-w-[13rem] font-display text-sm font-semibold tracking-tight">
                {l.name}
              </span>
              <span className="mt-3 flex flex-wrap gap-1.5 md:mt-0">
                {l.items.map((it) => (
                  <span key={it} className="text-[0.75rem] text-muted-foreground">
                    {it}
                    <span className="px-1.5 text-muted-foreground/40">·</span>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Panel>
          <p className="eyebrow">What Prism does here</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {architecture[i]!.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {architecture[i]!.prism}
              </p>
            </motion.div>
          </AnimatePresence>
        </Panel>
      </div>
    </div>
  );
}

/** 08 — before/after process transformation. */
export function ProcessTransform() {
  const [after, setAfter] = useState(false);
  return (
    <div>
      <div className="inline-flex rounded-full border border-border p-1">
        {[
          { k: false, label: "Today" },
          { k: true, label: "Redesigned" },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => setAfter(o.k)}
            aria-pressed={after === o.k}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium tracking-tight transition-colors",
              after === o.k ? "text-foreground" : "text-muted-foreground",
            )}
            style={
              after === o.k ? { background: `color-mix(in oklab, ${accent} 14%, transparent)` } : undefined
            }
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={after ? "after" : "before"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <Chain steps={after ? processAfter : processBefore} emphasiseLast={after} />
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {after
                ? "Intake is digital, extraction is automated, validation is rules-based and people are involved only where judgement is required — with visibility available continuously rather than monthly."
                : "Work moves between inboxes, spreadsheets and systems. Each handover adds delay, rework and a chance for the numbers to diverge."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** 11 — build vs buy vs integrate vs augment vs replace. */
export function SourcingFramework() {
  const [i, setI] = useState(0);
  const active = sourcingOptions[i]!;
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {sourcingOptions.map((o, idx) => {
          const on = idx === i;
          return (
            <button
              key={o.name}
              type="button"
              onClick={() => setI(idx)}
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              aria-pressed={on}
              className="rounded-lg border px-5 py-6 text-left transition-all duration-300"
              style={{
                borderColor: on ? `color-mix(in oklab, ${accent} 50%, transparent)` : "var(--border)",
                background: on ? `color-mix(in oklab, ${accent} 8%, transparent)` : "transparent",
              }}
            >
              <p className="font-display text-sm font-semibold uppercase tracking-[0.14em]">{o.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.when}</p>
            </button>
          );
        })}
      </div>
      <Panel className="mt-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={active.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl text-sm leading-relaxed text-muted-foreground"
          >
            {active.detail}
          </motion.p>
        </AnimatePresence>
      </Panel>
    </div>
  );
}

/** 20 — combined technology + AI maturity ladder. */
export function MaturityLadder() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-5">
        {maturityLevels.map((l, idx) => {
          const on = idx === i;
          return (
            <button
              key={l.n}
              type="button"
              onClick={() => setI(idx)}
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              aria-pressed={on}
              className="flex w-full flex-col items-stretch justify-start pt-4 text-left"
            >
              <span
                className="block h-[3px] w-full rounded-full transition-all duration-500"
                style={{
                  background: accent,
                  opacity: idx <= i ? 1 : 0.22,
                  boxShadow: on ? `0 0 20px color-mix(in oklab, ${accent} 60%, transparent)` : "none",
                }}
              />
              <span className="mt-4 font-display text-[0.6875rem] tracking-[0.18em] text-muted-foreground">
                {l.n}
              </span>
              <span
                className={cn(
                  "mt-1.5 font-display text-sm font-medium tracking-tight transition-colors",
                  on ? "text-foreground" : "text-muted-foreground/70",
                )}
              >
                {l.title}
              </span>
            </button>
          );
        })}
      </div>
      <Panel className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-display text-base font-semibold tracking-tight">
              {maturityLevels[i]!.title} — {maturityLevels[i]!.copy}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {maturityLevels[i]!.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </Panel>
    </div>
  );
}

/** 21 — interactive enterprise map. */
export function EnterpriseMap() {
  const [open, setOpen] = useState<string | null>(enterpriseMap[0]!.title);
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {enterpriseMap.map((d) => {
        const on = open === d.title;
        return (
          <button
            key={d.title}
            type="button"
            onClick={() => setOpen(on ? null : d.title)}
            onMouseEnter={() => setOpen(d.title)}
            aria-expanded={on}
            className="bg-background p-6 text-left transition-colors md:p-7"
            style={on ? { background: `color-mix(in oklab, ${accent} 7%, transparent)` } : undefined}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-sm font-semibold tracking-tight">{d.title}</p>
              {on ? (
                <Minus className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <ul className="mt-4 space-y-2">
              {d.items.map((it) => (
                <li key={it} className="text-sm text-muted-foreground">
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

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="hairline">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.03}>
            <div className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-base font-medium tracking-tight">{f.q}</span>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", on && "rotate-180")}
                />
              </button>
              <AnimatePresence initial={false}>
                {on ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
