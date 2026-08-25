import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import { ChainRail, FlowChips, StatusTag } from "@/components/prism/siq/Visuals";
import {
  beforeAfter,
  maturity,
  personas,
  siqGroups,
  siqModules,
  type SiqModule,
} from "@/lib/spectraiq";

/* ------------------------------------------------------------------ */
/* Platform map + module explorer                                      */
/* ------------------------------------------------------------------ */

export function PlatformExplorer() {
  const [group, setGroup] = useState<string>("sales");
  const groupModules = siqModules.filter((m) => m.group === group);
  const [moduleId, setModuleId] = useState<string>(groupModules[0]!.id);
  const active: SiqModule = siqModules.find((m) => m.id === moduleId) ?? groupModules[0]!;
  const activeGroup = siqGroups.find((g) => g.id === group)!;

  function pickGroup(id: string) {
    setGroup(id);
    const first = siqModules.find((m) => m.group === id);
    if (first) setModuleId(first.id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* department rail */}
      <div className="flex flex-wrap gap-px border-b border-border bg-border">
        {siqGroups.map((g) => {
          const on = g.id === group;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => pickGroup(g.id)}
              aria-pressed={on}
              className={cn(
                "flex-1 min-w-[150px] bg-background px-5 py-4 text-left transition-colors hover:bg-surface",
                on && "bg-surface",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform"
                  style={{ background: `var(--prism-colour-${g.colour})`, transform: on ? "scale(1.6)" : "scale(1)" }}
                />
                <span
                  className={cn(
                    "font-display text-sm font-medium tracking-tight",
                    on ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {g.label}
                </span>
              </span>
              <span className="mt-1.5 block text-[0.6875rem] leading-relaxed text-muted-foreground">{g.copy}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* module list */}
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <p className="px-6 pt-6 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
            {activeGroup.label} modules
          </p>
          <ul className="p-3">
            {groupModules.map((m) => {
              const on = m.id === moduleId;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => setModuleId(m.id)}
                    aria-pressed={on}
                    className={cn(
                      "w-full rounded-lg px-3.5 py-3.5 text-left transition-colors",
                      on ? "bg-surface" : "hover:bg-surface/60",
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-sm font-medium tracking-tight">{m.name}</span>
                      <StatusTag status={m.status} />
                    </span>
                    <span className="mt-1.5 block text-[0.6875rem] leading-relaxed text-muted-foreground">
                      {m.statement}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* module detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-9"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="h-px w-10"
                style={{ background: `var(--prism-colour-${active.colour})` }}
                aria-hidden="true"
              />
              <p className="eyebrow">{active.name}</p>
              <StatusTag status={active.status} />
            </div>
            <h3 className="display-md mt-4">{active.statement}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {active.positioning}
            </p>

            <div className="mt-9 grid gap-9 lg:grid-cols-2">
              <div>
                <p className="eyebrow">What we solve</p>
                <ul className="mt-4 space-y-2.5">
                  {active.solves.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: `var(--prism-colour-${active.colour})` }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">What it does</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.capabilities.map((c) => (
                    <span key={c} className="hairline rounded-full bg-surface/50 px-3 py-1.5 text-xs text-foreground/85">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-9">
              <p className="eyebrow">The flow</p>
              <div className="mt-4">
                <FlowChips steps={active.flow} colour={active.colour} />
              </div>
            </div>

            <div
              className="mt-9 rounded-lg border p-5"
              style={{
                borderColor: `color-mix(in oklab, var(--prism-colour-${active.colour}) 28%, transparent)`,
                background: `color-mix(in oklab, var(--prism-colour-${active.colour}) 6%, transparent)`,
              }}
            >
              <p className="eyebrow">Why it matters</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{active.matters}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Opportunity Studio                                                  */
/* ------------------------------------------------------------------ */

const BASE = {
  monthlyLeads: 320,
  grossPerUnit: 3800,
  dormantLeads: 9000,
  contactRate: 55,
  apptRate: 30,
  testDriveRate: 60,
  closeRate: 35,
  investment: 96000,
};

type Levers = {
  contact: number;
  appt: number;
  testDrive: number;
  close: number;
  revival: number;
  automation: number;
};

const ZERO: Levers = { contact: 0, appt: 0, testDrive: 0, close: 0, revival: 0, automation: 0 };

function model(inputs: typeof BASE, levers: Levers) {
  const annualLeads = inputs.monthlyLeads * 12;
  const baseUnits =
    annualLeads *
    (inputs.contactRate / 100) *
    (inputs.apptRate / 100) *
    (inputs.testDriveRate / 100) *
    (inputs.closeRate / 100);
  const impUnits =
    annualLeads *
    (Math.min(95, inputs.contactRate + levers.contact) / 100) *
    (Math.min(95, inputs.apptRate + levers.appt) / 100) *
    (Math.min(95, inputs.testDriveRate + levers.testDrive) / 100) *
    (Math.min(95, inputs.closeRate + levers.close) / 100);
  // dormant re-engagement: share contacted x an illustrative 1.5% conversion
  const dormantUnits = inputs.dormantLeads * (levers.revival / 100) * 0.015;
  const extraUnits = Math.max(0, impUnits - baseUnits) + dormantUnits;
  const grossUplift = extraUnits * inputs.grossPerUnit;
  // capacity: 4 routine touches per lead, 6 minutes each
  const capacityHours = (annualLeads * 4 * 6 * (levers.automation / 100)) / 60;
  const paybackMonths = grossUplift > 0 ? inputs.investment / (grossUplift / 12) : 0;
  return { annualLeads, baseUnits, impUnits, dormantUnits, extraUnits, grossUplift, capacityHours, paybackMonths };
}

const money = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
const num = (n: number, d = 0) => new Intl.NumberFormat("en-AU", { maximumFractionDigits: d }).format(n);

function Slider({
  label,
  value,
  onChange,
  max,
  suffix = "pp",
  colour,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  suffix?: string;
  colour: number;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium tracking-tight text-foreground/85">{label}</span>
        <span className="font-display text-sm tabular-nums" style={{ color: `var(--prism-colour-${colour})` }}>
          +{value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-border-strong accent-foreground"
        style={{ accentColor: `var(--prism-colour-${colour})` }}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <span className="mt-2 flex items-center gap-1.5 rounded-md border border-border bg-surface/40 px-3 py-2.5">
        {prefix ? <span className="text-xs text-muted-foreground">{prefix}</span> : null}
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-full bg-transparent font-display text-sm tabular-nums outline-none"
        />
      </span>
    </label>
  );
}

export function OpportunityStudio() {
  const [inputs, setInputs] = useState(BASE);
  const [levers, setLevers] = useState<Levers>({ contact: 8, appt: 5, testDrive: 4, close: 2, revival: 12, automation: 40 });
  const r = useMemo(() => model(inputs, levers), [inputs, levers]);

  const set = (k: keyof typeof BASE) => (v: number) => setInputs((p) => ({ ...p, [k]: v }));
  const lever = (k: keyof Levers) => (v: number) => setLevers((p) => ({ ...p, [k]: v }));

  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-background">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border-b border-border p-6 md:p-9 lg:border-b-0 lg:border-r">
          <p className="eyebrow">Your dealership baseline</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <NumberField label="Monthly enquiries" value={inputs.monthlyLeads} onChange={set("monthlyLeads")} />
            <NumberField label="Gross per unit" value={inputs.grossPerUnit} onChange={set("grossPerUnit")} prefix="$" />
            <NumberField label="Dormant CRM records" value={inputs.dormantLeads} onChange={set("dormantLeads")} />
            <NumberField label="Annual platform investment" value={inputs.investment} onChange={set("investment")} prefix="$" />
            <NumberField label="Contact rate %" value={inputs.contactRate} onChange={set("contactRate")} />
            <NumberField label="Appointment rate %" value={inputs.apptRate} onChange={set("apptRate")} />
            <NumberField label="Test-drive rate %" value={inputs.testDriveRate} onChange={set("testDriveRate")} />
            <NumberField label="Close rate %" value={inputs.closeRate} onChange={set("closeRate")} />
          </div>

          <p className="eyebrow mt-10">The levers</p>
          <div className="mt-5 space-y-5">
            <Slider label="Faster response → contact rate" value={levers.contact} onChange={lever("contact")} max={30} colour={1} />
            <Slider label="Appointment conversion" value={levers.appt} onChange={lever("appt")} max={25} colour={2} />
            <Slider label="Test-drive conversion" value={levers.testDrive} onChange={lever("testDrive")} max={25} colour={3} />
            <Slider label="Close rate" value={levers.close} onChange={lever("close")} max={15} colour={4} />
            <Slider
              label="Dormant records re-engaged"
              value={levers.revival}
              onChange={lever("revival")}
              max={60}
              suffix="%"
              colour={6}
            />
            <Slider
              label="Routine touches automated"
              value={levers.automation}
              onChange={lever("automation")}
              max={80}
              suffix="%"
              colour={7}
            />
          </div>
        </div>

        <div className="bg-surface/40 p-6 md:p-9">
          <p className="eyebrow">Modelled opportunity</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {[
              { label: "Annual gross upside", value: money(r.grossUplift), colour: 1 },
              { label: "Additional vehicles", value: num(r.extraUnits, 0), colour: 3 },
              { label: "Capacity released", value: `${num(r.capacityHours, 0)} hrs`, colour: 5 },
              {
                label: "Payback",
                value: r.paybackMonths > 0 ? `${num(Math.max(0.5, r.paybackMonths), 1)} months` : "—",
                colour: 6,
              },
            ].map((k) => (
              <div key={k.label} className="bg-background p-6">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{k.label}</p>
                <p
                  className="mt-3 font-display text-2xl font-semibold tabular-nums tracking-tight md:text-3xl"
                  style={{ color: `var(--prism-colour-${k.colour})` }}
                >
                  {k.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-2.5">
            {[
              { label: "Baseline units per year", value: num(r.baseUnits, 1) },
              { label: "Modelled units per year", value: num(r.impUnits + r.dormantUnits, 1) },
              { label: "From dormant re-engagement", value: num(r.dormantUnits, 1) },
              { label: "Annual enquiries", value: num(r.annualLeads) },
            ].map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-border pb-2.5">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="font-display text-sm tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>

          <details className="mt-7 rounded-lg border border-border bg-background p-5">
            <summary className="cursor-pointer text-xs font-medium tracking-tight text-foreground/85">
              How this is calculated
            </summary>
            <div className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
              <p>Units = annual enquiries × contact rate × appointment rate × test-drive rate × close rate.</p>
              <p>
                Opportunity = (modelled units − baseline units) × gross per unit, plus dormant records re-engaged × an
                illustrative 1.5% conversion.
              </p>
              <p>Capacity released = annual enquiries × 4 routine touches × 6 minutes × share automated.</p>
              <p>Payback = annual investment ÷ monthly gross upside.</p>
              <p className="text-foreground/70">
                All figures are illustrative examples for modelling purposes only. They are not a forecast, guarantee or
                claim of results.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* "What if?" scenario simulator                                       */
/* ------------------------------------------------------------------ */

const scenarios = [
  { id: "response", label: "Improve response time", note: "Contact rate +8pp", levers: { contact: 8 }, colour: 1 },
  { id: "appt", label: "Increase appointment conversion", note: "Appointment rate +5pp", levers: { appt: 5 }, colour: 3 },
  { id: "dormant", label: "Revive dormant leads", note: "20% of dormant records re-engaged", levers: { revival: 20 }, colour: 6 },
  { id: "close", label: "Improve close rate", note: "Close rate +2pp", levers: { close: 2 }, colour: 4 },
  { id: "auto", label: "Automate routine follow-up", note: "50% of routine touches automated", levers: { automation: 50 }, colour: 7 },
] satisfies { id: string; label: string; note: string; levers: Partial<Levers>; colour: number }[];

export function ScenarioSimulator() {
  const [on, setOn] = useState<string[]>(["response"]);
  const levers = useMemo(() => {
    const l: Levers = { ...ZERO };
    for (const s of scenarios) {
      if (!on.includes(s.id)) continue;
      for (const [k, v] of Object.entries(s.levers)) l[k as keyof Levers] += v as number;
    }
    return l;
  }, [on]);
  const r = useMemo(() => model(BASE, levers), [levers]);
  const gp = r.grossUplift;

  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="bg-background p-6 md:p-9">
        <p className="eyebrow">Choose what changes</p>
        <ul className="mt-5 space-y-2">
          {scenarios.map((s) => {
            const active = on.includes(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setOn((p) => (p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id]))}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-left transition-colors",
                    active ? "bg-surface" : "border-border hover:bg-surface/50",
                  )}
                  style={
                    active
                      ? { borderColor: `color-mix(in oklab, var(--prism-colour-${s.colour}) 45%, transparent)` }
                      : undefined
                  }
                >
                  <span>
                    <span className="block font-display text-sm font-medium tracking-tight">{s.label}</span>
                    <span className="mt-1 block text-[0.6875rem] text-muted-foreground">{s.note}</span>
                  </span>
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border"
                    style={{
                      borderColor: `var(--prism-colour-${s.colour})`,
                      background: active ? `var(--prism-colour-${s.colour})` : "transparent",
                    }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[0.6875rem] leading-relaxed text-muted-foreground">
          Modelled against an illustrative dealership: {BASE.monthlyLeads} enquiries per month, {money(BASE.grossPerUnit)}{" "}
          gross per unit, {num(BASE.dormantLeads)} dormant records.
        </p>
      </div>

      <div className="bg-background p-6 md:p-9">
        <p className="eyebrow">Opportunity changes</p>
        <div className="mt-6 space-y-5">
          {[
            { label: "Revenue opportunity", value: money(gp * 6), hint: "Illustrative revenue at a 6× gross multiple" },
            { label: "Gross profit opportunity", value: money(gp), hint: "Additional gross from modelled units" },
            {
              label: "Capacity opportunity",
              value: `${num(r.capacityHours, 0)} hours`,
              hint: "Routine follow-up effort returned to the team",
            },
          ].map((k, i) => (
            <div key={k.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-muted-foreground">{k.label}</span>
                <motion.span
                  key={k.value}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xl font-semibold tabular-nums tracking-tight md:text-2xl"
                  style={{ color: `var(--prism-colour-${i + 2})` }}
                >
                  {k.value}
                </motion.span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full"
                  style={{ background: `var(--prism-colour-${i + 2})` }}
                  animate={{ width: `${Math.min(100, (gp / 900000) * 100 + 4)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="mt-2 text-[0.6875rem] text-muted-foreground">{k.hint}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[0.6875rem] leading-relaxed text-foreground/60">
          Illustrative modelling only. Actual outcomes depend on the dealership environment, data quality and execution.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dealership Intelligence Centre mockup                               */
/* ------------------------------------------------------------------ */

export function IntelligenceCentre() {
  const steps = [
    {
      k: "Today",
      t: "Business health",
      rows: [
        ["Enquiries", "412"],
        ["Appointments", "126"],
        ["Deliveries", "48"],
      ],
      colour: 5,
    },
    {
      k: "What changed",
      t: "Variance",
      rows: [
        ["Contact rate", "+6pp"],
        ["Response time", "−41%"],
        ["Service retention", "−2pp"],
      ],
      colour: 3,
    },
    {
      k: "Why",
      t: "AI explanation",
      rows: [
        ["Driver", "After-hours coverage"],
        ["Channel", "Marketplace enquiries"],
        ["Constraint", "Service reminders unsent"],
      ],
      colour: 2,
    },
    {
      k: "What matters",
      t: "Priority",
      rows: [
        ["Rank 1", "38 high-intent leads"],
        ["Rank 2", "Unconfirmed appointments"],
        ["Rank 3", "Overdue service owners"],
      ],
      colour: 6,
    },
    {
      k: "What to do",
      t: "Recommended action",
      rows: [
        ["Now", "Call the scored top 20"],
        ["Today", "Confirm appointments by SMS"],
        ["This week", "Launch service recall list"],
      ],
      colour: 7,
    },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-background">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface/50 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--prism-colour-4)" }} />
          <p className="font-display text-xs font-medium tracking-tight">Dealership Intelligence Centre</p>
        </div>
        <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">Illustrative interface</p>
      </div>
      <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
        {steps.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.06}>
            <div className="h-full bg-background p-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--prism-colour-${s.colour})` }} />
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</p>
              </div>
              <p className="mt-3 font-display text-sm font-semibold tracking-tight">{s.t}</p>
              <dl className="mt-4 space-y-2">
                {s.rows.map(([a, b]) => (
                  <div key={a} className="flex items-baseline justify-between gap-3 border-b border-border/70 pb-2">
                    <dt className="text-[0.6875rem] text-muted-foreground">{a}</dt>
                    <dd className="font-display text-xs tabular-nums text-foreground">{b}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Role-based intelligence                                             */
/* ------------------------------------------------------------------ */

export function PersonaLens() {
  const [id, setId] = useState(personas[0]!.id);
  const active = personas.find((p) => p.id === id)!;
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-[300px_1fr]">
      <ul className="bg-background p-3">
        {personas.map((p, i) => {
          const on = p.id === id;
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setId(p.id)}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left transition-colors",
                  on ? "bg-surface" : "hover:bg-surface/60",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                  />
                  <span className="font-display text-sm font-medium tracking-tight">{p.role}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          className="bg-background p-6 md:p-9"
        >
          <p className="eyebrow">{active.role}</p>
          <h3 className="display-md mt-4">“{active.question}”</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{active.lens}</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {active.tiles.map((t, i) => (
              <div key={t.label} className="bg-surface/40 p-5">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{t.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{t.value}</p>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-8"
                  style={{ background: `var(--prism-colour-${i + 3})` }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after                                                      */
/* ------------------------------------------------------------------ */

export function BeforeAfterToggle() {
  const [after, setAfter] = useState(true);
  const reduce = useReducedMotion() ?? false;
  const list = after ? beforeAfter.after : beforeAfter.before;
  return (
    <div>
      <div className="inline-flex rounded-full border border-border-strong p-1">
        {[
          { on: false, label: "Before" },
          { on: true, label: "With SpectraIQ" },
        ].map((t) => (
          <button
            key={t.label}
            type="button"
            aria-pressed={after === t.on}
            onClick={() => setAfter(t.on)}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium tracking-tight transition-colors",
              after === t.on ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {list.map((item, i) => (
          <motion.div
            key={`${after}-${item}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="bg-background p-6"
          >
            <span
              className="block h-px w-8"
              style={{ background: after ? `var(--prism-colour-${(i % 7) + 1})` : "var(--color-border-strong)" }}
              aria-hidden="true"
            />
            <p
              className={cn(
                "mt-4 font-display text-sm font-medium tracking-tight",
                after ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Maturity ladder                                                     */
/* ------------------------------------------------------------------ */

export function MaturityLadder() {
  const [level, setLevel] = useState(2);
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-[1fr_1fr]">
      <ul className="bg-background p-3">
        {maturity.map((m, i) => {
          const on = i === level;
          return (
            <li key={m.level}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setLevel(i)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left transition-colors",
                  on ? "bg-surface" : "hover:bg-surface/60",
                )}
              >
                <span className="font-display text-xs tabular-nums text-muted-foreground">{m.level}</span>
                <span
                  className="h-px flex-1 max-w-[80px]"
                  style={{ background: `var(--prism-colour-${i + 2})`, opacity: on ? 1 : 0.35 }}
                  aria-hidden="true"
                />
                <span className={cn("font-display text-sm font-medium tracking-tight", !on && "text-muted-foreground")}>
                  {m.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="bg-background p-6 md:p-9">
        <p className="eyebrow">Level {maturity[level]!.level}</p>
        <h3 className="display-md mt-4">{maturity[level]!.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{maturity[level]!.copy}</p>
        <div className="mt-8">
          <p className="eyebrow">Where SpectraIQ helps</p>
          <div className="mt-4">
            <ChainRail
              dense
              colour={level + 2}
              steps={[
                { label: "Connect the data that already exists" },
                { label: "Embed AI inside the workflows that create value" },
                { label: "Make the decision, not just the dashboard" },
                { label: "Measure the commercial result and repeat" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
