import { AlertTriangle, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { Panel } from "@/components/prism/diq/Visuals";
import {
  DIQ_COLOUR,
  alerts,
  biComparison,
  boardPack,
  dataEverywhere,
  decisionActions,
  governancePillars,
  implementation,
  leadershipQuestions,
  maturity,
  morningBrief,
  principles,
  provenArchitecture,
  provenCapability,
  riskWatchlist,
} from "@/lib/decisioniq";

const accent = `var(--prism-colour-${DIQ_COLOUR})`;

export function DataEverywhere() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow">What organisations already have</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {dataEverywhere.map((d) => (
            <li key={d} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
              {d}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="eyebrow">What leadership is still asking</p>
        <ul className="mt-5 space-y-3">
          {leadershipQuestions.map((q) => (
            <li key={q} className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
              <span className="font-display text-base font-semibold tracking-tight md:text-lg">{q}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function BiComparison() {
  const cols = [biComparison.bi, biComparison.diq];
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
      {cols.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.08} className="bg-background p-7 md:p-9">
          <span
            className="block h-px w-10"
            style={{ background: i === 1 ? accent : "var(--border-strong, var(--border))" }}
            aria-hidden="true"
          />
          <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-tight">{c.title}</h3>
          <ul className="mt-6 space-y-3">
            {c.items.map((it) => (
              <li
                key={it}
                className={i === 1 ? "text-sm text-foreground/90" : "text-sm text-muted-foreground"}
              >
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function RiskWatchlist() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {riskWatchlist.map((r, i) => (
        <Reveal key={r.name} delay={i * 0.04} className="bg-background p-6">
          <h3 className="font-display text-sm font-semibold tracking-tight">{r.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{r.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function DecisionActions() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {decisionActions.map((a, i) => (
        <Reveal key={a.name} delay={i * 0.07}>
          <Panel className="h-full">
            <p
              className="text-[0.625rem] uppercase tracking-[0.2em]"
              style={{ color: `color-mix(in oklab, ${accent} 70%, var(--foreground))` }}
            >
              {a.tier}
            </p>
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{a.name}</h3>
            <dl className="mt-6 space-y-3 text-xs">
              {[
                ["Expected impact", a.impact],
                ["Owner", a.owner],
                ["Timeframe", a.timeframe],
                ["Dependencies", a.dependencies],
                ["Risk", a.risk],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="w-28 shrink-0 uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                  <dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      ))}
    </div>
  );
}

export function Alerts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {alerts.map((a, i) => (
        <Reveal key={a.title} delay={i * 0.06}>
          <div
            className="rounded-lg border p-6"
            style={{
              borderColor:
                a.kind === "opportunity"
                  ? `color-mix(in oklab, ${accent} 45%, transparent)`
                  : "var(--border)",
            }}
          >
            <div className="flex items-center gap-2.5">
              {a.kind === "opportunity" ? (
                <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
              ) : (
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              )}
              <h3 className="font-display text-sm font-semibold uppercase tracking-tight">{a.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="uppercase tracking-[0.16em]">Recommended</span> — {a.action}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function MorningBrief() {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-7 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{morningBrief.time}</p>
        <p className="text-sm text-muted-foreground">
          Business health{" "}
          <span className="font-display text-2xl font-semibold text-foreground">{morningBrief.health}</span>
        </p>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <p className="eyebrow">Three things to know</p>
          <ol className="mt-5 space-y-4">
            {morningBrief.know.map((k, i) => (
              <li key={k} className="flex gap-4">
                <span className="font-display text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-relaxed">{k}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="eyebrow">Three actions</p>
          <ol className="mt-5 space-y-4">
            {morningBrief.actions.map((k, i) => (
              <li key={k} className="flex gap-4">
                <span className="font-display text-sm" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{k}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
        Then: run scenarios <ArrowRight className="h-3.5 w-3.5" />
      </p>
    </div>
  );
}

export function BoardPack() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {boardPack.map((b, i) => (
        <Reveal key={b.title} delay={i * 0.05} className="bg-background p-6 md:p-7">
          <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
          <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-tight">{b.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{b.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function GovernancePillars() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {governancePillars.map((g, i) => (
        <Reveal key={g.name} delay={i * 0.05} className="bg-background p-6 md:p-8">
          <h3 className="font-display text-sm font-semibold uppercase tracking-tight">{g.name}</h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{g.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function MaturityLadder() {
  return (
    <ol className="space-y-2">
      {maturity.map((m, i) => {
        const last = i >= maturity.length - 2;
        return (
          <Reveal key={m.level} delay={i * 0.05}>
            <li
              className="grid gap-3 rounded-lg border px-5 py-5 md:grid-cols-[10rem_12rem_1fr] md:items-center"
              style={{
                borderColor: last ? `color-mix(in oklab, ${accent} 50%, transparent)` : "var(--border)",
                background: last ? `color-mix(in oklab, ${accent} 7%, transparent)` : undefined,
              }}
            >
              <span className="font-display text-sm font-semibold uppercase tracking-tight">{m.level}</span>
              <span className="text-sm text-muted-foreground">{m.q}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">{m.copy}</span>
            </li>
          </Reveal>
        );
      })}
      <li className="pt-4 text-xs text-muted-foreground">
        DecisionIQ operates at the final two levels — decision intelligence and action intelligence.
      </li>
    </ol>
  );
}

export function ImplementationJourney() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {implementation.map((s, i) => (
        <Reveal key={s.step} delay={i * 0.04} className="bg-background p-6">
          <p className="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-tight">{s.step}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.copy}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function ProvenCapability() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {provenCapability.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.05} className="bg-background p-6 md:p-7">
            <p className="font-display text-3xl font-semibold tracking-tight" style={{ color: accent }}>
              {p.stat}
            </p>
            <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-tight">{p.label}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="eyebrow">Proven architecture patterns</p>
        <ul className="mt-5 space-y-3">
          {provenArchitecture.map((a) => (
            <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Anonymised capability examples drawn from delivered platforms. No client names, confidential
          financial information or proprietary details are disclosed.
        </p>
      </Reveal>
    </div>
  );
}

export function Principles() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.05} className="bg-background p-6 md:p-8">
          <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
          <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-tight">{p.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
        </Reveal>
      ))}
    </div>
  );
}
