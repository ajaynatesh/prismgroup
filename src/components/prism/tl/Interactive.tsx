import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, DollarSign, Phone, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import { Phone as PhoneShell, ChatThread } from "./Phone";
import {
  aiTasks,
  automations,
  beforeAfter,
  customerProfile,
  industries,
  jobBoard,
  jobStages,
  ownerAttention,
  ownerToday,
  plumberJourney,
  qrUseCases,
  segments,
  TL_COLOUR,
  tlAccent,
  tradeTypes,
  type ChatMsg,
} from "@/lib/tradelink";

const soft = (pct: number) => `color-mix(in oklab, ${tlAccent} ${pct}%, transparent)`;
const accentBg = (pct: number) => `color-mix(in oklab, ${tlAccent} ${pct}%, var(--background))`;

function TabList<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: T; label: string }[];
  active: T;
  onChange: (k: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] transition-colors",
            active === t.key ? "text-foreground" : "border-border text-muted-foreground hover:text-foreground",
          )}
          style={active === t.key ? { borderColor: soft(55), background: soft(12) } : undefined}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}

function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] tracking-tight",
        active ? "text-foreground" : "border-border text-muted-foreground",
      )}
      style={active ? { borderColor: soft(45), background: soft(10) } : undefined}
    >
      {children}
    </span>
  );
}

/** 7. WhatsApp simulator — choose a scenario and watch it run. */
export function WhatsAppSimulator() {
  const [scenario, setScenario] = useState<"plumber" | "quote" | "payment">("plumber");
  const reduce = useReducedMotion();

  const scenarios: Record<string, ChatMsg[]> = {
    plumber: plumberJourney,
    quote: [
      { from: "customer", text: "Can I get a quote for a deck extension?" },
      { from: "business", text: "Of course. Roughly what size?", buttons: ["Small", "Medium", "Large"] },
      { from: "customer", text: "Medium" },
      { from: "business", text: "What material are you thinking?", buttons: ["Timber", "Composite"] },
      { from: "customer", text: "Composite" },
      { from: "system", text: "Lead qualified — deck, medium, composite" },
      {
        from: "business",
        card: {
          title: "Estimate — Deck extension",
          rows: [
            ["Size", "Medium (approx. 20m²)"],
            ["Material", "Composite"],
            ["Estimate", "$18,500 – $22,000"],
            ["Site visit", "Recommended"],
          ],
          actions: ["Book site visit", "Ask a question"],
        },
      },
      { from: "customer", text: "Book site visit" },
      { from: "system", text: "Site visit booked — Saturday 10 AM" },
    ],
    payment: [
      { from: "business", text: "Hi John, your invoice for the electrical work is ready." },
      { from: "business", card: { title: "Invoice #1042", rows: [["Amount", "$1,240.00"], ["Due", "Today"]], actions: ["Pay now"] } },
      { from: "customer", text: "Pay now" },
      { from: "system", text: "Payment link sent" },
      { from: "system", text: "Payment confirmed — $1,240.00" },
      { from: "business", text: "Thanks John. Receipt has been emailed." },
    ],
  };

  return (
    <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <div>
          <p className="eyebrow">See it work</p>
          <h3 className="display-sm mt-4">One conversation. The whole workflow.</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Pick a scenario and watch TradeLink turn a WhatsApp thread into a qualified lead, booking, quote or payment —
            without the business owner doing it manually.
          </p>
        </div>
        <TabList
          tabs={[
            { key: "plumber", label: "Service booking" },
            { key: "quote", label: "Quote request" },
            { key: "payment", label: "Payment" },
          ]}
          active={scenario}
          onChange={setScenario}
        />
        <ul className="flex flex-wrap gap-2">
          {["Qualify", "Book", "Quote", "Pay", "Follow up"].map((t) => (
            <li key={t}>
              <Tag active>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        key={scenario}
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PhoneShell title="Prism TradeLink" subtitle="Business account · online">
          <ChatThread thread={scenarios[scenario]!} autoplay interval={1600} height="28rem" />
        </PhoneShell>
      </motion.div>
    </Reveal>
  );
}

/** 15. Industry explorer. */
export function IndustryExplorer() {
  const [active, setActive] = useState(industries[0]!.key);
  const selected = industries.find((i) => i.key === active)!;
  const reduce = useReducedMotion();

  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-4">
        {industries.map((ind) => (
          <button
            key={ind.key}
            type="button"
            onClick={() => setActive(ind.key)}
            className={cn(
              "w-full rounded-xl border p-4 text-left transition-colors",
              active === ind.key ? "text-foreground" : "border-border bg-surface/30 text-muted-foreground hover:text-foreground",
            )}
            style={active === ind.key ? { borderColor: soft(50), background: soft(10) } : undefined}
          >
            <p className="font-display text-sm font-semibold tracking-tight">{ind.title}</p>
            <p className="mt-1 text-xs leading-relaxed opacity-80">{ind.copy}</p>
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="panel p-6 md:p-8"
      >
        <p className="eyebrow">{selected.title}</p>
        <h4 className="display-xs mt-3">Built for this workflow</h4>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {selected.items.map((it) => (
            <li key={it} className="flex items-center gap-2 text-sm">
              <Check className="h-3.5 w-3.5 shrink-0" style={{ color: tlAccent }} aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-lg border border-dashed border-border p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            TradeLink turns the most common customer conversations — enquiries, bookings, quotes and follow-ups — into a
            structured workflow the business can run from its phone.
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

/** 19. Owner dashboard mockup. */
export function OwnerDashboard() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <Panel>
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Owner view</p>
            <h3 className="display-sm mt-3">The business, at a glance.</h3>
          </div>
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-[0.625rem] font-semibold text-background"
            style={{ background: tlAccent }}
          >
            TL
          </span>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {ownerToday.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-surface/40 p-3">
              <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tracking-tight">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 space-y-2">
          <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Needs attention</p>
          {ownerAttention.map((a) => (
            <div key={a} className="flex items-center gap-3 rounded-lg border border-border bg-surface/30 px-3 py-2 text-xs">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tlAccent }} aria-hidden="true" />
              {a}
            </div>
          ))}
        </div>
      </Panel>
      <div className="space-y-4">
        <div className="panel p-5">
          <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Job board</p>
          <div className="mt-4 space-y-2">
            {jobBoard.map((job) => (
              <div key={job.customer} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs">
                <div>
                  <p className="font-medium">{job.customer}</p>
                  <p className="text-[0.625rem] text-muted-foreground">
                    {job.trade} · {job.job}
                  </p>
                </div>
                <Tag active>{job.stage}</Tag>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">Pipeline</p>
          <div className="mt-4 flex items-center justify-between">
            {jobStages.map((s, i) => (
              <div key={s} className="flex flex-1 items-center">
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-[0.625rem] font-medium"
                  style={{ background: i < 5 ? soft(20) : "var(--muted)", color: i < 5 ? tlAccent : "var(--muted-foreground)" }}
                >
                  {i + 1}
                </span>
                {i < jobStages.length - 1 ? <span className="h-px flex-1 bg-border" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[0.625rem] text-muted-foreground">
            {jobStages.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** 10. Customer profile card. */
export function CustomerMemory() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-2">
      <Panel>
        <p className="eyebrow">Customer memory</p>
        <h3 className="display-sm mt-4">Every thread remembers.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          When a customer returns, TradeLink already knows their history, preferences and open jobs — so the conversation
          continues, it doesn't restart.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {customerProfile.statuses.map((s) => (
            <Tag key={s} active={s === customerProfile.status}>
              {s}
            </Tag>
          ))}
        </div>
      </Panel>
      <div className="panel p-6">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold text-background"
            style={{ background: tlAccent }}
          >
            {customerProfile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">{customerProfile.name}</p>
            <p className="text-xs text-muted-foreground">{customerProfile.status} customer</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {customerProfile.details.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-surface/30 p-3">
              <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-xs font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-lg border border-dashed border-border p-3">
          <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Last conversation</p>
          <p className="mt-1 text-xs italic text-muted-foreground">
            \u201cPower fault in Glen Waverley. Dave attended. Switchboard upgrade completed. Next follow-up in 21
            days.\u201d
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** 11. Re-engagement segment builder. */
export function SegmentBuilder() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-3">
        <p className="eyebrow">Re-engagement</p>
        <h3 className="display-sm mt-4">Turn quiet customers into repeat revenue.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          TradeLink segments customers automatically, then starts the right WhatsApp follow-up at the right time.
        </p>
      </div>
      <div className="panel p-5">
        <div className="flex flex-wrap gap-2">
          {segments.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[0.6875rem] transition-colors",
                active === i ? "text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
              style={active === i ? { borderColor: soft(55), background: soft(12) } : undefined}
            >
              {s.title}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 rounded-lg border border-border bg-surface/30 p-4"
        >
          <p className="font-display text-sm font-semibold tracking-tight">{segments[active].title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{segments[active].copy}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Segment matched</span>
            <ArrowRight className="h-3 w-3" style={{ color: tlAccent }} aria-hidden="true" />
            <span style={{ color: tlAccent }}>Send personalised message</span>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

/** 21. Automation rule cards. */
export function AutomationRules() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {automations.map((rule, i) => (
          <div key={i} className="panel p-5">
            <div className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: tlAccent }} aria-hidden="true" />
              Trigger
            </div>
            <p className="mt-2 text-sm font-medium">{rule.trigger}</p>
            <div className="my-3 h-px bg-border" aria-hidden="true" />
            <div className="space-y-2 text-xs">
              <p>
                <span className="text-muted-foreground">If</span> {rule.condition}
              </p>
              <p>
                <span className="text-muted-foreground">Then</span> {rule.action}
              </p>
              <p>
                <span className="text-muted-foreground">Outcome</span> {rule.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 37. ROI calculator. */
export function RoiCalculator() {
  const [inbound, setInbound] = useState(120);
  const [missedRate, setMissedRate] = useState(35);
  const [leadValue, setLeadValue] = useState(850);
  const [conversion, setConversion] = useState(22);

  const recovered = Math.round(inbound * (missedRate / 100));
  const leads = Math.round(recovered * (conversion / 100));
  const opportunity = leads * leadValue;

  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <Panel>
        <p className="eyebrow">Opportunity model</p>
        <h3 className="display-sm mt-4">What does a faster response earn?</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Adjust the inputs to estimate how many enquiries, leads and revenue TradeLink could recover by answering every
          message instead of missing it.
        </p>
        <div className="mt-8 space-y-6">
          {[
            { label: "Monthly inbound enquiries", val: inbound, set: setInbound, max: 500, unit: "" },
            { label: "Missed enquiry rate", val: missedRate, set: setMissedRate, max: 80, unit: "%" },
            { label: "Average lead value", val: leadValue, set: setLeadValue, max: 5000, unit: "$" },
            { label: "Lead-to-customer conversion", val: conversion, set: setConversion, max: 60, unit: "%" },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{f.label}</span>
                <span className="font-display font-semibold tabular-nums">
                  {f.unit === "$" ? `$${f.val.toLocaleString()}` : `${f.val}${f.unit}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={f.max}
                value={f.val}
                onChange={(e) => f.set(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--prism-colour-5)]"
                style={{ accentColor: tlAccent }}
              />
            </div>
          ))}
        </div>
        <p className="mt-6 text-[0.625rem] leading-relaxed text-muted-foreground">
          Illustrative model only. Actual outcomes depend on workflow, customer behaviour and business economics.
        </p>
      </Panel>
      <div className="panel flex flex-col justify-between p-6 md:p-8" style={{ background: accentBg(8) }}>
        <div>
          <p className="eyebrow">Estimated monthly impact</p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Recovered conversations</p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-tight">{recovered}</p>
            </div>
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Additional leads</p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-tight">{leads}</p>
            </div>
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Potential opportunity</p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-tight">${opportunity.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-dashed border-border p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This is not a guarantee. It shows the revenue left on the table when enquiries are missed or slow to convert.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** 38. Before / after toggle. */
export function BeforeAfter() {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2">
      <Panel>
        <p className="eyebrow">Before TradeLink</p>
        <ul className="mt-5 space-y-2">
          {beforeAfter.before.map((b, i) => (
            <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-[0.625rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {b}
            </li>
          ))}
        </ul>
      </Panel>
      <div className="rounded-xl border p-6 md:p-8" style={{ borderColor: soft(50), background: soft(10) }}>
        <p className="eyebrow">With TradeLink</p>
        <div className="mt-5 flex flex-col items-start gap-4">
          {beforeAfter.after.map((a) => (
            <span key={a} className="flex items-center gap-2 text-lg font-display font-semibold tracking-tight">
              <Check className="h-4 w-4" style={{ color: tlAccent }} aria-hidden="true" />
              {a}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** 39. AI task grid. */
export function AiTaskGrid() {
  return (
    <Reveal>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {aiTasks.map((t) => (
          <div key={t} className="flex items-center gap-3 rounded-lg border border-border bg-surface/30 px-4 py-3 text-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: tlAccent }} aria-hidden="true" />
            {t}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 40. QR-to-conversion moment. */
export function QrUseCases() {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-2">
        {qrUseCases.map((u) => (
          <Tag key={u} active>
            {u}
          </Tag>
        ))}
      </div>
    </Reveal>
  );
}
