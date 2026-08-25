import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import { Panel } from "@/components/prism/diq/Visuals";
import {
  DIQ_COLOUR,
  architecture,
  baseline,
  copilotScript,
  enterpriseMap,
  faqs,
  healthDimensions,
  opportunities,
  personas,
  scenarioLevers,
  scenarioPresets,
  signatureQuestions,
  useCases,
  type LeverId,
} from "@/lib/decisioniq";

const accent = `var(--prism-colour-${DIQ_COLOUR})`;

function Illustrative({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      Illustrative example
    </span>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
        active ? "text-foreground" : "border-border text-muted-foreground hover:text-foreground",
      )}
      style={
        active
          ? {
              borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
              background: `color-mix(in oklab, ${accent} 12%, transparent)`,
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------- 1. persona lenses */

const toneColour = { good: "oklch(0.72 0.14 155)", warn: "oklch(0.78 0.14 85)", bad: "oklch(0.65 0.19 25)" };

export function PersonaLens() {
  const [id, setId] = useState(personas[0].id);
  const p = personas.find((x) => x.id === id)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {personas.map((x) => (
          <TabButton key={x.id} active={x.id === id} onClick={() => setId(x.id)}>
            {x.role}
          </TabButton>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <Panel>
            <p className="eyebrow">{p.lens}</p>
            <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight">{p.role}</h3>
            <ul className="mt-6 space-y-2.5">
              {p.focus.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                  {f}
                </li>
              ))}
            </ul>
          </Panel>

          <div className="rounded-xl border border-border bg-surface/40 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">{p.role} intelligence view</p>
              <Illustrative />
            </div>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {p.tiles.map((t) => (
                <div key={t.label} className="bg-background p-5">
                  <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">{t.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-semibold tracking-tight">{t.value}</dd>
                  <dd className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: toneColour[t.tone] }}>
                    {t.tone === "good" ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : t.tone === "bad" ? (
                      <TrendingDown className="h-3.5 w-3.5" />
                    ) : (
                      <Minus className="h-3.5 w-3.5" />
                    )}
                    {t.delta}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-lg border border-border p-5">
              <p className="text-sm font-medium">“{p.question}”</p>
              <ul className="mt-4 space-y-2.5">
                {p.answer.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------- 2. executive copilot */

export function Copilot() {
  const [turns, setTurns] = useState(2);
  const visible = copilotScript.slice(0, turns);
  const more = turns < copilotScript.length;
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5 md:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="eyebrow">DecisionIQ executive copilot</p>
        <Illustrative />
      </div>
      <div className="mt-6 space-y-4">
        {visible.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn("flex", t.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg border px-4 py-3 text-sm leading-relaxed",
                t.role === "user" ? "border-border-strong" : "border-border text-muted-foreground",
              )}
              style={
                t.role === "ai"
                  ? { background: `color-mix(in oklab, ${accent} 7%, transparent)` }
                  : undefined
              }
            >
              <p className="mb-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
                {t.role === "user" ? "Leader" : "DecisionIQ"}
              </p>
              {t.text}
            </div>
          </motion.div>
        ))}
      </div>
      {more ? (
        <button
          type="button"
          onClick={() => setTurns((n) => Math.min(n + 2, copilotScript.length))}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-xs font-medium transition-colors hover:bg-accent"
        >
          Continue the conversation
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ) : (
        <p className="mt-6 text-xs text-muted-foreground">
          Every answer traces back to governed KPIs — the copilot reasons over defined measures, not
          free-form documents.
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------- 3. signature ask interaction */

export function SignatureAsk() {
  const [i, setI] = useState(0);
  const q = signatureQuestions[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col gap-2">
        {signatureQuestions.map((s, idx) => (
          <button
            key={s.q}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
              idx === i ? "text-foreground" : "border-border text-muted-foreground hover:text-foreground",
            )}
            style={
              idx === i
                ? {
                    borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
                    background: `color-mix(in oklab, ${accent} 10%, transparent)`,
                  }
                : undefined
            }
          >
            “{s.q}”
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={q.q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Panel>
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">DecisionIQ response</p>
              <Illustrative />
            </div>
            <p className="mt-6 text-base leading-relaxed">{q.a}</p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="eyebrow">Recommended action</p>
              <p className="mt-3 text-sm text-muted-foreground">{q.action}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {["Ask", "Understand", "Simulate", "Decide"].map((s, idx) => (
                <span key={s} className="flex items-center gap-2">
                  {s}
                  {idx < 3 ? <ArrowRight className="h-3 w-3" /> : null}
                </span>
              ))}
            </div>
          </Panel>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------ 4. simulation engine */

type Levers = Record<LeverId, number>;

const initialLevers = (): Levers =>
  Object.fromEntries(scenarioLevers.map((l) => [l.id, l.base])) as Levers;

function model(l: Levers) {
  const revenue = baseline.revenue * (1 + l.revenue / 100) * (1 + l.price / 100) * (1 - Math.max(l.churn, 0) / 200);
  const wageCost =
    baseline.revenue *
    (baseline.wageCostPct / 100) *
    (1 + l.wage / 100) *
    (1 + l.headcount / 100) *
    (1 - l.productivity / 100);
  const otherCost = baseline.revenue * (baseline.otherCostPct / 100) * (1 - l.automation / 100);
  const ebitda = revenue - wageCost - otherCost;
  const margin = (ebitda / revenue) * 100;
  const cash = ebitda * baseline.cashConversion;
  return { revenue, ebitda, margin, cash };
}

const fmt = (n: number) => `$${n.toFixed(1)}m`;

function ResultCard({
  label,
  result,
  base,
  highlight,
}: {
  label: string;
  result: ReturnType<typeof model>;
  base?: ReturnType<typeof model>;
  highlight?: boolean;
}) {
  const rows = [
    { k: "Revenue", v: fmt(result.revenue), d: base ? result.revenue - base.revenue : null },
    { k: "EBITDA", v: fmt(result.ebitda), d: base ? result.ebitda - base.ebitda : null },
    { k: "Margin", v: `${result.margin.toFixed(1)}%`, d: base ? result.margin - base.margin : null },
    { k: "Cash flow", v: fmt(result.cash), d: base ? result.cash - base.cash : null },
  ];
  return (
    <div
      className="rounded-lg border border-border bg-background p-5"
      style={
        highlight
          ? {
              borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
              background: `color-mix(in oklab, ${accent} 7%, transparent)`,
            }
          : undefined
      }
    >
      <p className="eyebrow">{label}</p>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-3">
            <dt className="text-xs text-muted-foreground">{r.k}</dt>
            <dd className="text-right">
              <span className="font-display text-lg font-semibold tracking-tight">{r.v}</span>
              {r.d !== null && Math.abs(r.d) > 0.05 ? (
                <span
                  className="ml-2 text-[0.6875rem]"
                  style={{ color: r.d > 0 ? toneColour.good : toneColour.bad }}
                >
                  {r.d > 0 ? "+" : ""}
                  {r.d.toFixed(1)}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SimulationEngine() {
  const [levers, setLevers] = useState<Levers>(initialLevers);
  const [preset, setPreset] = useState("custom");

  const base = useMemo(() => model(initialLevers()), []);
  const current = model(levers);
  const growth = useMemo(
    () => model({ ...initialLevers(), revenue: 12, price: 3, productivity: 8, churn: -8 }),
    [],
  );
  const stress = useMemo(
    () => model({ ...initialLevers(), revenue: -10, wage: 10, churn: 14, price: -4, headcount: 6 }),
    [],
  );

  const applyPreset = (id: string) => {
    const p = scenarioPresets.find((x) => x.id === id);
    if (!p) return;
    setPreset(id);
    setLevers({ ...initialLevers(), ...p.values } as Levers);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {scenarioPresets.map((p) => (
          <TabButton key={p.id} active={preset === p.id} onClick={() => applyPreset(p.id)}>
            {p.label}
          </TabButton>
        ))}
        <TabButton active={preset === "custom"} onClick={() => setPreset("custom")}>
          Custom
        </TabButton>
        <Illustrative className="ml-auto" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <Panel>
          <p className="eyebrow">Decision levers</p>
          <div className="mt-6 space-y-5">
            {scenarioLevers.map((l) => (
              <div key={l.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor={`lever-${l.id}`} className="text-sm">
                    {l.label}
                  </label>
                  <span className="font-display text-sm font-semibold tabular-nums">
                    {levers[l.id] > 0 ? "+" : ""}
                    {levers[l.id]}
                    {l.unit}
                  </span>
                </div>
                <input
                  id={`lever-${l.id}`}
                  type="range"
                  min={l.min}
                  max={l.max}
                  step={l.step}
                  value={levers[l.id]}
                  onChange={(e) => {
                    setPreset("custom");
                    setLevers((prev) => ({ ...prev, [l.id]: Number(e.target.value) }));
                  }}
                  className="mt-3 w-full accent-[var(--prism-colour-4)]"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setLevers(initialLevers());
              setPreset("base");
            }}
            className="mt-7 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Reset to base case
          </button>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label="Base case" result={base} />
          <ResultCard label="Your scenario" result={current} base={base} highlight />
          <ResultCard label="Growth case" result={growth} base={base} />
          <ResultCard label="Stress case" result={stress} base={base} />
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Illustrative model on indicative figures, shown to demonstrate how DecisionIQ expresses
        trade-offs. Values are not client results. In a live deployment the model runs on your governed
        data, unit economics and cost structure.
      </p>
      <p className="mt-6 font-display text-xl font-semibold uppercase tracking-tight md:text-3xl">
        See the trade-offs before you make the decision.
      </p>
    </div>
  );
}

/* ------------------------------------------------- 5. health score */

const statusColour: Record<string, string> = {
  green: toneColour.good,
  amber: toneColour.warn,
  red: toneColour.bad,
};

export function HealthScore() {
  const [name, setName] = useState<string>(healthDimensions[1].name);
  const d = healthDimensions.find((x) => x.name === name)!;
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <Panel className="flex flex-col items-center justify-center text-center">
        <p className="eyebrow">Business health</p>
        <motion.p
          className="mt-5 font-display text-6xl font-semibold tracking-tight md:text-7xl"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          78
          <span className="text-xl text-muted-foreground"> / 100</span>
        </motion.p>
        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          One number, composed from thousands of governed signals across seven dimensions — with the
          full explanation one click away.
        </p>
        <Illustrative className="mt-6" />
      </Panel>

      <div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {healthDimensions.map((h) => (
            <button
              key={h.name}
              type="button"
              onClick={() => setName(h.name)}
              className={cn(
                "bg-background p-5 text-left transition-colors hover:bg-surface",
                h.name === name && "bg-surface",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: statusColour[h.status] }} />
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{h.name}</span>
              </span>
              <span className="mt-3 block font-display text-2xl font-semibold tracking-tight">{h.score}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
          >
            {[
              { k: "What changed", v: d.changed },
              { k: "Why", v: d.why },
              { k: "What happens next", v: d.next },
              { k: "What to do", v: d.act },
            ].map((row) => (
              <div key={row.k} className="bg-background p-5">
                <p className="eyebrow">{row.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.v}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------- 6. architecture explorer */

export function ArchitectureExplorer() {
  const [i, setI] = useState(0);
  const layer = architecture[i];
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <ol className="flex flex-col gap-2">
        {architecture.map((a, idx) => (
          <li key={a.key}>
            <button
              type="button"
              onClick={() => setI(idx)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-4 py-4 text-left transition-colors",
                idx === i ? "text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
              style={
                idx === i
                  ? {
                      borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
                      background: `color-mix(in oklab, ${accent} 10%, transparent)`,
                    }
                  : undefined
              }
            >
              <span className="text-xs tabular-nums text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-tight">{a.key}</span>
              <ArrowRight className={cn("ml-auto h-4 w-4 transition-opacity", idx === i ? "opacity-100" : "opacity-0")} />
            </button>
          </li>
        ))}
      </ol>
      <AnimatePresence mode="wait">
        <motion.div
          key={layer.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Panel>
            <p className="eyebrow">Layer {String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight">{layer.key}</h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{layer.copy}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {layer.detail.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border px-3 py-1 text-[0.6875rem] text-muted-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Panel>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------ 7. opportunity board */

export function OpportunityBoard() {
  const groups = ["Revenue", "Cost", "Capital"];
  const [g, setG] = useState("Revenue");
  const rows = opportunities.filter((o) => o.group === g);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {groups.map((x) => (
          <TabButton key={x} active={g === x} onClick={() => setG(x)}>
            {x} opportunities
          </TabButton>
        ))}
        <Illustrative className="ml-auto" />
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {["Opportunity", "Value", "Confidence", "Owner", "Action", "Timeframe"].map((h) => (
                <th
                  key={h}
                  className="border-b border-border pb-3 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.name} className="align-top">
                <td className="border-b border-border py-4 pr-4 font-display text-sm font-semibold tracking-tight">
                  {o.name}
                </td>
                <td className="border-b border-border py-4 pr-4 text-muted-foreground">{o.value}</td>
                <td className="border-b border-border py-4 pr-4">
                  <span
                    className="rounded-full border px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em]"
                    style={{ borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }}
                  >
                    {o.confidence}
                  </span>
                </td>
                <td className="border-b border-border py-4 pr-4 text-muted-foreground">{o.owner}</td>
                <td className="border-b border-border py-4 pr-4 text-muted-foreground">{o.action}</td>
                <td className="border-b border-border py-4 text-muted-foreground">{o.timeframe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------- 8. enterprise map + use cases */

export function EnterpriseMap() {
  const [role, setRole] = useState(enterpriseMap[0].role);
  const active = enterpriseMap.find((x) => x.role === role)!;
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
      {enterpriseMap.map((m) => (
        <button
          key={m.role}
          type="button"
          onMouseEnter={() => setRole(m.role)}
          onFocus={() => setRole(m.role)}
          onClick={() => setRole(m.role)}
          className={cn("bg-background p-6 text-left transition-colors hover:bg-surface", m.role === active.role && "bg-surface")}
        >
          <span
            className="block h-px w-8"
            style={{ background: m.role === active.role ? accent : "var(--border)" }}
            aria-hidden="true"
          />
          <span className="mt-4 block font-display text-base font-semibold uppercase tracking-tight">
            {m.role}
          </span>
          <span className="mt-4 flex flex-wrap gap-2">
            {m.items.map((it) => (
              <span key={it} className="rounded-full border border-border px-2.5 py-1 text-[0.6875rem] text-muted-foreground">
                {it}
              </span>
            ))}
          </span>
        </button>
      ))}
    </div>
  );
}

export function UseCaseGrid() {
  const [open, setOpen] = useState<string | null>(useCases[0].group);
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {useCases.map((u) => {
        const isOpen = open === u.group;
        return (
          <button
            key={u.group}
            type="button"
            onClick={() => setOpen(isOpen ? null : u.group)}
            className="bg-background p-6 text-left transition-colors hover:bg-surface"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-display text-sm font-semibold uppercase tracking-tight">{u.group}</span>
              <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
            </span>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.span
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block overflow-hidden"
                >
                  <span className="mt-4 block space-y-2">
                    {u.items.map((it) => (
                      <span key={it} className="block text-sm text-muted-foreground">
                        {it}
                      </span>
                    ))}
                  </span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- 9. FAQs */

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.04}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 py-6 text-left"
          >
            <span className="font-display text-base font-semibold tracking-tight md:text-lg">{f.q}</span>
            <ChevronDown
              className={cn("mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform", open === i && "rotate-180")}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}
