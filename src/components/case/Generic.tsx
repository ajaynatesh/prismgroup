import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ControlPanel, ControlSlider, DecisionTrace, DemoBadge, HumanApproval, LogicNote, WorkflowStepper, type TraceStep } from "@/components/case/Kit";

/* ---------- Hero cockpit ---------- */
export type CockpitTile = { label: string; value: string; note: string; tone?: "ok" | "warn" | "alert" };
export function Cockpit({ title, tiles, bars, barsLabel }: { title: string; tiles: CockpitTile[]; bars: { label: string; value: number; flag?: boolean }[]; barsLabel: string }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div className="glass overflow-hidden p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium">{title}</p>
        <DemoBadge />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl border border-border p-3 md:p-4">
            <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">{t.label}</p>
            <p className={cn("mt-2 font-display text-2xl tabular-nums md:text-3xl", t.tone === "alert" && "text-prism-1", t.tone === "warn" && "text-prism-3")}>{t.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-border p-4">
        <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">{barsLabel}</p>
        <div className="mt-4 flex h-32 items-end gap-1.5 md:gap-2">
          {bars.map((b) => (
            <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className="w-full rounded-t-md transition-all duration-700"
                style={{ height: `${(b.value / max) * 100}%`, background: b.flag ? "var(--prism-colour-3)" : "color-mix(in oklab, var(--case) 70%, transparent)" }}
                title={`${b.label}: ${b.value}`}
              />
              <span className="text-[0.625rem] text-muted-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Journey ---------- */
export type JourneyStage = {
  name: string;
  input: { label: string; rows: [string, string][] };
  finding: string;
  checks: { label: string; status: "pass" | "flag" | "missing" }[];
  action: string;
  approval?: { who: string; reason: string };
  trace: TraceStep[];
};

const statusStyle = {
  pass: "border-prism-5/40 text-prism-5",
  flag: "border-prism-3/50 text-prism-3",
  missing: "border-prism-1/50 text-prism-1",
} as const;
const statusLabel = { pass: "Passed", flag: "Flagged", missing: "Missing" } as const;

export function Journey({ stages }: { stages: JourneyStage[] }) {
  const [active, setActive] = useState(0);
  const s = stages[active];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><DemoBadge /></div>
      <WorkflowStepper steps={stages.map((x) => x.name)} active={active} onChange={setActive} />
      <div key={active} className="grid gap-4 animate-in fade-in duration-300 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-border p-5">
          <p className="eyebrow">{s.input.label}</p>
          <dl className="mt-4 divide-y divide-border text-sm">
            {s.input.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border p-5">
            <p className="eyebrow" style={{ color: "var(--case)" }}>AI finding</p>
            <p className="mt-3 text-sm leading-relaxed">{s.finding}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.checks.map((c) => (
                <span key={c.label} className={cn("rounded-full border px-3 py-1 text-xs", statusStyle[c.status])}>
                  {c.label} · {statusLabel[c.status]}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground"><span className="font-medium text-foreground">Next action: </span>{s.action}</p>
          </div>
          {s.approval ? <HumanApproval who={s.approval.who} reason={s.approval.reason} state="required" /> : null}
          <DecisionTrace steps={s.trace} />
        </div>
      </div>
      <div className="flex justify-between">
        <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className="min-h-11 rounded-full border border-border px-4 text-sm disabled:opacity-40">Previous</button>
        <button type="button" disabled={active === stages.length - 1} onClick={() => setActive(active + 1)} className="min-h-11 rounded-full bg-foreground px-4 text-sm text-background disabled:opacity-40">Next stage</button>
      </div>
    </div>
  );
}

/* ---------- Exception workbench ---------- */
export type ExceptionItem = { id: string; title: string; severity: "High" | "Medium" | "Low"; owner: string; due: string; detail: string; trace: TraceStep[] };
export function Exceptions({ items }: { items: ExceptionItem[] }) {
  const [sel, setSel] = useState(items[0].id);
  const [filter, setFilter] = useState<"All" | ExceptionItem["severity"]>("All");
  const shown = items.filter((i) => filter === "All" || i.severity === filter);
  const cur = items.find((i) => i.id === sel) ?? items[0];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-xl border border-border">
        <div className="flex gap-1.5 overflow-x-auto border-b border-border p-3">
          {(["All", "High", "Medium", "Low"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={cn("min-h-9 shrink-0 rounded-full border px-3 text-xs", filter === f ? "border-transparent bg-foreground text-background" : "border-border text-muted-foreground")}>{f}</button>
          ))}
        </div>
        <ul className="divide-y divide-border">
          {shown.map((i) => (
            <li key={i.id}>
              <button type="button" onClick={() => setSel(i.id)} aria-pressed={sel === i.id}
                className={cn("flex w-full items-start justify-between gap-3 p-4 text-left text-sm transition-colors", sel === i.id ? "bg-surface" : "hover:bg-surface/50")}>
                <span><span className="block font-medium">{i.title}</span><span className="text-xs text-muted-foreground">{i.owner} · due {i.due}</span></span>
                <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[0.6875rem]", i.severity === "High" ? statusStyle.missing : i.severity === "Medium" ? statusStyle.flag : statusStyle.pass)}>{i.severity}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border border-border p-5">
          <p className="eyebrow">{cur.id}</p>
          <p className="mt-2 font-display text-xl">{cur.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cur.detail}</p>
        </div>
        <DecisionTrace steps={cur.trace} title="Decision trace" />
      </div>
    </div>
  );
}

/* ---------- Assumption-based value model ---------- */
export type ImpactInput = { key: string; label: string; min: number; max: number; step?: number; value: number; format?: (v: number) => string };
export type ImpactOutput = { label: string; formula: string; compute: (v: Record<string, number>) => number; format: (n: number) => string };
export function ImpactModel({ inputs, outputs, note }: { inputs: ImpactInput[]; outputs: ImpactOutput[]; note: string }) {
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(inputs.map((i) => [i.key, i.value])));
  const results = useMemo(() => outputs.map((o) => o.compute(vals)), [vals, outputs]);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <ControlPanel>
        {inputs.map((i) => (
          <ControlSlider key={i.key} label={i.label} min={i.min} max={i.max} step={i.step} value={vals[i.key]} format={i.format}
            onChange={(v) => setVals((p) => ({ ...p, [i.key]: v }))} />
        ))}
      </ControlPanel>
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {outputs.map((o, idx) => (
            <div key={o.label} className="rounded-xl border border-border p-5">
              <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">{o.label}</p>
              <p className="mt-2 font-display text-3xl tabular-nums" style={{ color: "var(--case)" }}>{o.format(results[idx])}</p>
              <p className="mt-2 font-mono text-[0.6875rem] text-muted-foreground">{o.formula}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Scenario estimate from your assumptions — not a forecast or guarantee. <LogicNote>{note}</LogicNote></p>
      </div>
    </div>
  );
}

export const fmtAud = (n: number) => (n >= 1e6 ? `A$${(n / 1e6).toFixed(1)}m` : `A$${Math.round(n / 1e3)}k`);
export const fmtNum = (n: number) => Math.round(n).toLocaleString("en-AU");

/* ---------- Architecture strip ---------- */
export function ArchStrip({ steps }: { steps: string[] }) {
  return (
    <div className="mb-10 overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-xs">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="rounded-full border border-border px-3 py-2">{s}</span>
            {i < steps.length - 1 ? <span aria-hidden="true" className="text-muted-foreground">→</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function KpiChips({ items }: { items: string[] }) {
  return (
    <div className="mt-10 flex flex-wrap gap-2">
      {items.map((k) => <span key={k} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">{k}</span>)}
    </div>
  );
}
