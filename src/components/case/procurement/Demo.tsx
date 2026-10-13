import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ControlPanel, ControlSlider, DecisionTrace, DemoBadge, HumanApproval, LogicNote, WorkflowStepper, fmtMoney, fmtNum, type TraceStep,
} from "@/components/case/Kit";

/* ---------------- 8-stage purchase journey ---------------- */
const stages = ["Intake", "Contract review", "Spend intelligence", "Supplier onboarding", "Third-party screening", "Risk & approval", "Purchase-to-pay", "Monitoring"];

type Stage = { doc: { title: string; lines: [string, string][] }; findings: { text: string; flag?: "risk" | "info" | "ok" }[]; log: string[]; trace: TraceStep[]; human?: { who: string; reason: string } };

const S: Stage[] = [
  {
    doc: { title: "Purchase request PR-0418 (sample)", lines: [["Requester", "Ops Manager, Sample Co."], ["Category", "IT services · Managed cloud"], ["Expected spend", "$184,000 / 24 months"], ["Cost centre", "CC-2210"], ["Preferred supplier", "Northwind Cloud Pty Ltd (sample)"], ["Justification", "Replace end-of-life hosting"]] },
    findings: [{ text: "All mandatory fields extracted from free-text request", flag: "ok" }, { text: "Spend above $150k threshold — contract review required", flag: "info" }, { text: "Preferred supplier not in approved vendor list", flag: "risk" }],
    log: ["Request received via intake form", "Fields extracted and validated", "Routed to contract review"],
    trace: [{ kind: "Trigger", text: "Employee submits purchase request." }, { kind: "AI interpretation", text: "Free-text justification classified to category taxonomy; fields extracted." }, { kind: "Deterministic check", text: "Completeness rules + spend threshold ($150k) applied." }, { kind: "System update", text: "Request record created; routed to Legal queue." }, { kind: "Audit record", text: "Original request, extracted fields and rule version stored." }],
  },
  {
    doc: { title: "Master Services Agreement — synthetic", lines: [["Term", "24 months, auto-renews 12 months"], ["Termination notice", "90 days before renewal"], ["Liability cap", "Fees paid in prior 3 months"], ["Price escalator", "CPI + 4% annually"], ["Data protection", "Offshore processing permitted"], ["Governing law", "New South Wales"]] },
    findings: [{ text: "Liability cap below playbook minimum (12 months' fees)", flag: "risk" }, { text: "Price escalator exceeds playbook (CPI + 2%)", flag: "risk" }, { text: "Offshore data processing needs privacy review", flag: "risk" }, { text: "Auto-renewal detected — 90-day notice logged", flag: "info" }],
    log: ["Sample MSA preloaded", "10 clause types identified", "3 playbook deviations flagged"],
    trace: [{ kind: "Trigger", text: "Contract attached to request." }, { kind: "AI interpretation", text: "Clauses located and classified; each finding linked to clause text. AI suggestion — legal review required." }, { kind: "Deterministic check", text: "Extracted values compared with playbook thresholds." }, { kind: "Human decision", text: "Legal accepts, rejects or redlines each deviation." }, { kind: "Audit record", text: "Clause excerpt, playbook rule and reviewer decision stored." }],
    human: { who: "Legal", reason: "Three playbook deviations must be reviewed before the supplier can progress." },
  },
  {
    doc: { title: "Spend profile — IT services (sample, 12 months)", lines: [["Total category spend", "$2.41M"], ["Suppliers in category", "37 (after entity resolution: 29)"], ["Off-contract spend", "$312k"], ["Possible duplicate charges", "6 transactions · $18.4k"], ["Top-3 concentration", "61%"]] },
    findings: [{ text: "8 duplicate vendor records merged (e.g. 'Northwind Cloud' / 'NW Cloud P/L')", flag: "info" }, { text: "Existing supplier already holds similar contract — consolidation option", flag: "info" }, { text: "6 potential duplicate charges queued for AP review", flag: "risk" }],
    log: ["GL, PO, card and AP data normalised", "Merchant names resolved", "Spend categorised"],
    trace: [{ kind: "Trigger", text: "Category spend context requested." }, { kind: "AI interpretation", text: "Merchant names normalised and mapped to category taxonomy." }, { kind: "Deterministic check", text: "Duplicate rules: same amount, supplier and date window ±3 days." }, { kind: "System update", text: "Consolidation suggestion attached to request." }, { kind: "Audit record", text: "Source transactions and matching rule logged." }],
  },
  {
    doc: { title: "Supplier onboarding pack — Northwind Cloud (sample)", lines: [["Business registration", "Received · format valid"], ["Tax information", "Received"], ["Bank details", "Received · verification service not connected"], ["Insurance certificate", "Expires in 21 days"], ["ISO 27001 certificate", "Missing"], ["Declarations", "Signed"]] },
    findings: [{ text: "Insurance certificate expiring within 30 days", flag: "risk" }, { text: "Security certificate missing — automated chase sent", flag: "risk" }, { text: "Bank verification requires an integrated verification service", flag: "info" }],
    log: ["Onboarding portal link issued", "5 of 6 documents received", "Reminder scheduled"],
    trace: [{ kind: "Trigger", text: "Supplier invited to onboarding portal." }, { kind: "AI interpretation", text: "Documents classified and key fields read." }, { kind: "Deterministic check", text: "Format, completeness and expiry rules applied." }, { kind: "Human decision", text: "Procurement decides whether to proceed with missing items." }, { kind: "Audit record", text: "Document versions and check outcomes stored." }],
  },
  {
    doc: { title: "Third-party screening status (sample)", lines: [["Sanctions / PEP", "Not run — licensed source not connected"], ["Adverse media", "Not run — licensed source not connected"], ["Cyber & privacy questionnaire", "Completed · 2 gaps"], ["Conflict of interest", "Declared none"], ["ESG questionnaire", "Pending"]] },
    findings: [{ text: "Screening shown as missing, never as passed", flag: "risk" }, { text: "Questionnaire gaps: MFA coverage, breach notification time", flag: "risk" }, { text: "Conflict of interest declaration verified", flag: "ok" }],
    log: ["Questionnaires assessed", "Missing checks surfaced"],
    trace: [{ kind: "Trigger", text: "Onboarding completeness reached threshold." }, { kind: "AI interpretation", text: "Questionnaire answers summarised against control expectations." }, { kind: "Deterministic check", text: "Each check marked verified, missing or failed — no inference." }, { kind: "Audit record", text: "Check source and date recorded." }],
  },
  {
    doc: { title: "Illustrative risk score", lines: [] },
    findings: [],
    log: ["Score calculated with published weights", "Routed to approvers by threshold"],
    trace: [{ kind: "Deterministic check", text: "Weighted sum of five factor scores (0–100)." }, { kind: "Human decision", text: "High-risk items route to Legal, Finance and Procurement; never auto-approved." }, { kind: "Audit record", text: "Weights, inputs and any override with reason stored." }],
    human: { who: "Legal · Finance · Procurement", reason: "Score is high — joint approval required. Overrides need a documented reason." },
  },
  {
    doc: { title: "Purchase-to-pay handoff (simulated ERP)", lines: [["Supplier record", "Created in ERP (simulated)"], ["Requisition", "REQ-7720"], ["Purchase order", "PO-55102 · $92,000 year 1"], ["Receipt / milestone", "Milestone 1 accepted"], ["Invoice match", "Price matches contract rate"], ["Payment", "Awaiting authorisation"]] },
    findings: [{ text: "Invoice price checked against contract rate card", flag: "ok" }, { text: "Payment authorisation follows delegation of authority", flag: "info" }],
    log: ["Supplier pushed to ERP (simulated)", "PO raised", "Invoice matched"],
    trace: [{ kind: "Trigger", text: "Approval recorded." }, { kind: "System update", text: "Simulated ERP connector creates supplier, requisition and PO." }, { kind: "Deterministic check", text: "Invoice vs PO vs receipt vs contract price." }, { kind: "Human decision", text: "Payment authorised by delegated approver." }, { kind: "Audit record", text: "End-to-end trail linked to original request." }],
  },
  {
    doc: { title: "Continuous monitoring (sample alerts)", lines: [["Renewal", "Notice window opens in 640 days"], ["Insurance", "Certificate renewed · next expiry tracked"], ["Spend drift", "Run-rate 4% above PO value"], ["SLA", "Uptime target met (sample)"], ["Supplier risk", "No change since onboarding"]] },
    findings: [{ text: "Spend drift alert sent to category owner", flag: "info" }, { text: "Renewal reminder scheduled 120 days before notice deadline", flag: "ok" }],
    log: ["Monitors scheduled", "Evidence trail available for audit"],
    trace: [{ kind: "Trigger", text: "Scheduled monitors and incoming events." }, { kind: "Deterministic check", text: "Expiry, drift and SLA thresholds." }, { kind: "System update", text: "Alerts to owners; evidence pack updated." }, { kind: "Audit record", text: "Every alert and response retained." }],
  },
];

const factors = [
  { key: "exposure", label: "Financial exposure", weight: 0.25, base: 70 },
  { key: "contract", label: "Contract exceptions", weight: 0.25, base: 80 },
  { key: "concentration", label: "Concentration", weight: 0.15, base: 55 },
  { key: "compliance", label: "Compliance gaps", weight: 0.2, base: 65 },
  { key: "data", label: "Data access", weight: 0.15, base: 75 },
] as const;

function RiskScore() {
  const [vals, setVals] = useState<Record<string, number>>(Object.fromEntries(factors.map((f) => [f.key, f.base])));
  const score = Math.round(factors.reduce((s, f) => s + vals[f.key] * f.weight, 0));
  const band = score >= 65 ? "High" : score >= 40 ? "Medium" : "Low";
  return (
    <div className="space-y-4">
      {factors.map((f) => (
        <ControlSlider key={f.key} label={`${f.label} · weight ${f.weight * 100}%`} value={vals[f.key]} min={0} max={100} onChange={(v) => setVals((s) => ({ ...s, [f.key]: v }))} />
      ))}
      <div className="flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Weighted score = Σ factor × weight</span>
        <span className="font-display text-3xl tabular-nums">{score}<span className={cn("ml-2 text-sm", band === "High" ? "text-destructive" : band === "Medium" ? "text-prism-3" : "text-prism-4")}>{band}</span></span>
      </div>
      <p className="text-xs text-muted-foreground">Routing: Low → Procurement · Medium → Procurement + Finance · High → Legal + Finance + Procurement. Never auto-approved.</p>
    </div>
  );
}

export function PurchaseJourney() {
  const [i, setI] = useState(0);
  const st = S[i];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xl">Follow one purchase from request to approved supplier</p>
        <DemoBadge />
      </div>
      <WorkflowStepper steps={stages} active={i} onChange={setI} />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_0.8fr]" role="tabpanel" aria-label={stages[i]}>
        <div className="glass p-5">
          <p className="eyebrow">Sample document</p>
          <p className="mt-3 font-medium">{st.doc.title}</p>
          {i === 5 ? <div className="mt-4"><RiskScore /></div> : (
            <dl className="mt-4 divide-y divide-border text-sm">
              {st.doc.lines.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-2 max-sm:grid-cols-1 max-sm:gap-0"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
        </div>
        <div className="glass p-5">
          <div className="flex items-center justify-between"><p className="eyebrow">AI findings & flags</p><LogicNote>Findings are generated from the sample document using fixed rules and illustrative extraction. In production, each would link to its source and require reviewer confirmation.</LogicNote></div>
          <ul className="mt-4 space-y-3">
            {(i === 5 ? [{ text: "Score and weights fully visible; adjust factors to see routing change", flag: "info" as const }] : st.findings).map((f) => (
              <li key={f.text} className="flex gap-3 text-sm">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", f.flag === "risk" ? "bg-destructive" : f.flag === "ok" ? "bg-prism-4" : "bg-prism-5")} />
                {f.text}
              </li>
            ))}
          </ul>
          {st.human ? <div className="mt-5"><HumanApproval who={st.human.who} reason={st.human.reason} /></div> : null}
        </div>
        <div className="rounded-2xl border border-border p-5">
          <p className="eyebrow">Action log</p>
          <ol className="mt-4 space-y-3 text-sm">
            {S.slice(0, i + 1).flatMap((s, si) => s.log.map((l) => ({ l, si }))).slice(-7).map((e, k) => (
              <li key={k} className={cn("border-l-2 pl-3", e.si === i ? "border-[var(--case)]" : "border-border text-muted-foreground")}>{e.l}</li>
            ))}
          </ol>
        </div>
      </div>
      <DecisionTrace steps={st.trace} />
      <div className="flex justify-between">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="min-h-11 rounded-full border border-border px-5 text-sm disabled:opacity-40">Previous</button>
        <button type="button" disabled={i === S.length - 1} onClick={() => setI(i + 1)} className="min-h-11 rounded-full bg-primary px-5 text-sm text-primary-foreground disabled:opacity-40">Next stage</button>
      </div>
    </div>
  );
}

/* ---------------- Before / after slider ---------------- */
export function BeforeAfter() {
  const [x, setX] = useState(50);
  const before = ["Contracts in shared drives", "Manual clause checks", "Duplicate vendors", "Email approvals", "Renewal surprises", "Evidence gathered at audit"];
  const after = ["Clause register with source links", "Playbook deviations flagged", "Resolved supplier entities", "Threshold-based routing", "Renewal calendar & alerts", "Evidence captured as work happens"];
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <div className="grid gap-2 p-6 md:grid-cols-2">
          {after.map((a) => <div key={a} className="rounded-lg border border-[color-mix(in_oklab,var(--case)_40%,transparent)] bg-surface px-4 py-3 text-sm">{a}</div>)}
        </div>
        <div className="absolute inset-0 grid gap-2 bg-background p-6 md:grid-cols-2" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }} aria-hidden={x < 5}>
          {before.map((b) => <div key={b} className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground line-through decoration-destructive/50">{b}</div>)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-foreground" style={{ left: `${x}%` }} />
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span>Fragmented</span>
        <input type="range" min={0} max={100} value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Compare fragmented and intelligent procurement" className="h-6 flex-1 accent-[var(--case)]" />
        <span>Intelligent</span>
      </div>
    </div>
  );
}

/* ---------------- Clause heatmap ---------------- */
const clauses = [
  { name: "Limitation of liability", sev: 3, excerpt: "“…aggregate liability shall not exceed the Fees paid in the three (3) months preceding the claim.”", policy: "Playbook minimum: 12 months' fees.", action: "Propose redline to 12 months' fees; escalate if refused.", status: "Awaiting Legal" },
  { name: "Price escalation", sev: 3, excerpt: "“Fees increase annually by CPI plus four per cent (4%).”", policy: "Playbook maximum: CPI + 2%.", action: "Negotiate cap at CPI + 2% or fixed 24-month pricing.", status: "Awaiting Procurement" },
  { name: "Data protection", sev: 2, excerpt: "“Supplier may process Customer Data in any jurisdiction.”", policy: "Offshore processing requires privacy assessment.", action: "Request data-location schedule; route to Privacy.", status: "Awaiting Privacy" },
  { name: "Auto-renewal", sev: 2, excerpt: "“Renews for successive 12-month terms unless notice is given 90 days prior.”", policy: "Allowed; must be calendared.", action: "Add renewal reminder 120 days before deadline.", status: "Calendared" },
  { name: "Indemnities", sev: 1, excerpt: "“Each party indemnifies the other for third-party IP claims.”", policy: "Matches playbook.", action: "No action.", status: "Accepted" },
  { name: "Service levels", sev: 1, excerpt: "“99.9% monthly availability with service credits.”", policy: "Meets standard.", action: "Track monthly.", status: "Accepted" },
  { name: "Insurance", sev: 2, excerpt: "“Supplier maintains professional indemnity of $5M.”", policy: "Policy requires $10M for this tier.", action: "Request uplift or risk acceptance.", status: "Awaiting Procurement" },
  { name: "Governing law", sev: 1, excerpt: "“Governed by the laws of New South Wales.”", policy: "Matches playbook.", action: "No action.", status: "Accepted" },
];

export function ClauseHeatmap() {
  const [sel, setSel] = useState(0);
  const c = clauses[sel];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
      <div role="listbox" aria-label="Clauses" className="grid grid-cols-2 gap-2">
        {clauses.map((cl, i) => (
          <button key={cl.name} role="option" aria-selected={i === sel} onClick={() => setSel(i)}
            className={cn("min-h-16 rounded-lg border p-3 text-left text-xs transition-colors", i === sel ? "border-foreground" : "border-border hover:border-border-strong")}
            style={{ background: `color-mix(in oklab, ${cl.sev === 3 ? "var(--destructive)" : cl.sev === 2 ? "var(--prism-colour-3)" : "var(--prism-colour-4)"} ${cl.sev * 9}%, transparent)` }}>
            <span className="font-medium">{cl.name}</span>
            <span className="mt-1 block text-muted-foreground">{["", "Aligned", "Review", "Deviation"][cl.sev]}</span>
          </button>
        ))}
      </div>
      <div className="glass p-5 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-display text-lg">{c.name}</p><DemoBadge label="AI suggestion — legal review required" /></div>
        <blockquote className="mt-4 border-l-2 border-[var(--case)] pl-4 italic text-muted-foreground">{c.excerpt}</blockquote>
        <dl className="mt-4 space-y-3">
          <div><dt className="text-xs text-muted-foreground">Policy position</dt><dd>{c.policy}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Recommended action</dt><dd>{c.action}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Reviewer status</dt><dd>{c.status}</dd></div>
        </dl>
      </div>
    </div>
  );
}

/* ---------------- Spend treemap ---------------- */
const units = ["All", "Operations", "Corporate", "Technology"] as const;
const months = ["Full year", "H1", "H2"] as const;
const spend: Record<string, Record<(typeof units)[number], number>> = {
  "IT services": { All: 0, Operations: 420, Corporate: 310, Technology: 1680 },
  Facilities: { All: 0, Operations: 940, Corporate: 260, Technology: 40 },
  "Professional services": { All: 0, Operations: 180, Corporate: 720, Technology: 210 },
  Logistics: { All: 0, Operations: 860, Corporate: 20, Technology: 10 },
  Marketing: { All: 0, Operations: 30, Corporate: 390, Technology: 60 },
  Travel: { All: 0, Operations: 140, Corporate: 160, Technology: 90 },
};
const halfShare: Record<string, number> = { "IT services": 0.46, Facilities: 0.5, "Professional services": 0.58, Logistics: 0.47, Marketing: 0.62, Travel: 0.41 };

export function SpendTreemap() {
  const [u, setU] = useState<(typeof units)[number]>("All");
  const [m, setM] = useState<(typeof months)[number]>("Full year");
  const data = useMemo(() => {
    const rows = Object.entries(spend).map(([cat, v]) => {
      const year = u === "All" ? v.Operations + v.Corporate + v.Technology : v[u];
      const val = m === "Full year" ? year : m === "H1" ? year * halfShare[cat] : year * (1 - halfShare[cat]);
      return { cat, val: val * 1000 };
    });
    return rows.sort((a, b) => b.val - a.val);
  }, [u, m]);
  const total = data.reduce((s, d) => s + d.val, 0);
  let cum = 0;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {units.map((x) => <button key={x} onClick={() => setU(x)} aria-pressed={u === x} className={cn("min-h-10 rounded-full border px-3 text-xs", u === x ? "border-foreground" : "border-border text-muted-foreground")}>{x}</button>)}
        <span className="mx-1 w-px bg-border" />
        {months.map((x) => <button key={x} onClick={() => setM(x)} aria-pressed={m === x} className={cn("min-h-10 rounded-full border px-3 text-xs", m === x ? "border-foreground" : "border-border text-muted-foreground")}>{x}</button>)}
      </div>
      <div className="flex h-56 gap-1 overflow-hidden rounded-xl" role="img" aria-label={`Spend by category, total ${fmtMoney(total)}`}>
        {data.map((d, i) => (
          <div key={d.cat} className="flex min-w-0 flex-col justify-end rounded-md p-2 text-xs transition-all duration-500 motion-reduce:transition-none"
            style={{ flexGrow: d.val, flexBasis: 0, background: `color-mix(in oklab, var(--case) ${70 - i * 10}%, var(--surface))` }}>
            <span className="truncate font-medium">{d.cat}</span>
            <span className="truncate opacity-80">{fmtMoney(d.val)}</span>
          </div>
        ))}
      </div>
      <table className="w-full text-sm">
        <caption className="sr-only">Supplier category Pareto</caption>
        <thead><tr className="text-left text-xs text-muted-foreground"><th className="py-1 font-normal">Category</th><th className="font-normal text-right">Spend</th><th className="font-normal text-right">Cumulative %</th></tr></thead>
        <tbody>
          {data.map((d) => { cum += d.val; return (
            <tr key={d.cat} className="border-t border-border"><td className="py-2">{d.cat}</td><td className="text-right tabular-nums">{fmtMoney(d.val)}</td><td className="text-right tabular-nums">{total ? Math.round((cum / total) * 100) : 0}%</td></tr>
          ); })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Supplier onboarding tracker ---------------- */
const suppliers = [
  { name: "Northwind Cloud", docs: 5, status: "Incomplete", note: "ISO 27001 missing" },
  { name: "Harbour Facilities", docs: 6, status: "Compliant", note: "All checks current" },
  { name: "Redgum Logistics", docs: 6, status: "Flagged", note: "Bank details changed since last refresh" },
  { name: "Atlas Advisory", docs: 4, status: "Incomplete", note: "Insurance + tax info outstanding" },
  { name: "Southern Print Co.", docs: 6, status: "Compliant", note: "Refresh due in 5 months" },
  { name: "Coastal Staffing", docs: 6, status: "Flagged", note: "Questionnaire gap: privacy training" },
] as const;

export function OnboardingTracker() {
  const [f, setF] = useState<"All" | "Compliant" | "Incomplete" | "Flagged">("All");
  const list = suppliers.filter((s) => f === "All" || s.status === f);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", "Compliant", "Incomplete", "Flagged"] as const).map((x) => (
          <button key={x} onClick={() => setF(x)} aria-pressed={f === x} className={cn("min-h-10 rounded-full border px-3 text-xs", f === x ? "border-foreground" : "border-border text-muted-foreground")}>
            {x} {x !== "All" ? `(${suppliers.filter((s) => s.status === x).length})` : ""}
          </button>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
        {list.map((s) => (
          <li key={s.name} className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 sm:grid-cols-[1.2fr_1fr_1.4fr_auto]">
            <span className="font-medium">{s.name} <span className="text-xs text-muted-foreground">(sample)</span></span>
            <span className="hidden h-1.5 overflow-hidden rounded-full bg-muted sm:block"><span className="block h-full bg-[var(--case)]" style={{ width: `${(s.docs / 6) * 100}%` }} /></span>
            <span className="col-span-2 text-sm text-muted-foreground sm:col-span-1">{s.note}</span>
            <span className={cn("row-start-1 col-start-2 rounded-full px-2.5 py-1 text-xs sm:row-auto sm:col-auto", s.status === "Compliant" ? "bg-prism-4/15 text-prism-4" : s.status === "Flagged" ? "bg-destructive/15 text-destructive" : "bg-prism-3/15 text-prism-3")}>{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Exception workbench + traceability ---------------- */
const exceptions = [
  { id: "EX-101", crit: "High", title: "Liability cap below playbook", owner: "Legal", due: "2 days", disp: "Open", trace: ["MSA §14.2 (sample)", "Liability cap = 3 months' fees", "Rule P-LIAB-01: ≥ 12 months", "Deviation flagged", "Pending Legal", "—"] },
  { id: "EX-102", crit: "High", title: "Supplier bank details changed", owner: "Finance", due: "Today", disp: "Held", trace: ["Supplier portal update", "New BSB/account captured", "Rule F-BANK-02: dual authorisation", "Payment hold", "Pending 2 approvers", "—"] },
  { id: "EX-103", crit: "Medium", title: "Possible duplicate charge $3,120", owner: "AP", due: "5 days", disp: "Open", trace: ["Card txn #88213", "Same supplier/amount ±3 days", "Rule AP-DUP-01", "Queued for review", "Pending AP", "—"] },
  { id: "EX-104", crit: "Low", title: "Insurance certificate expiring", owner: "Procurement", due: "21 days", disp: "Chasing", trace: ["Certificate upload", "Expiry date read", "Rule S-INS-03: 30-day warning", "Reminder sent", "Auto (no approval needed)", "Logged"] },
];

export function ExceptionWorkbench() {
  const [sel, setSel] = useState<string | null>(null);
  const ex = exceptions.find((e) => e.id === sel);
  const labels = ["Original source", "Extracted field", "Rule", "Decision", "Approval", "Timestamp"];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[34rem] text-sm">
          <thead><tr className="text-left text-xs text-muted-foreground"><th className="p-3 font-normal">Criticality</th><th className="p-3 font-normal">Exception</th><th className="p-3 font-normal">Owner</th><th className="p-3 font-normal">Due</th><th className="p-3 font-normal">Disposition</th></tr></thead>
          <tbody>
            {exceptions.map((e) => (
              <tr key={e.id} className={cn("cursor-pointer border-t border-border hover:bg-accent", sel === e.id && "bg-accent")} onClick={() => setSel(e.id)} tabIndex={0} onKeyDown={(k) => k.key === "Enter" && setSel(e.id)}>
                <td className="p-3"><span className={cn("rounded-full px-2 py-0.5 text-xs", e.crit === "High" ? "bg-destructive/15 text-destructive" : e.crit === "Medium" ? "bg-prism-3/15 text-prism-3" : "bg-muted text-muted-foreground")}>{e.crit}</span></td>
                <td className="p-3">{e.title}</td><td className="p-3 text-muted-foreground">{e.owner}</td><td className="p-3 text-muted-foreground">{e.due}</td><td className="p-3">{e.disp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="glass p-5" aria-live="polite">
        <p className="eyebrow">Show the decision trail</p>
        {ex ? (
          <ol className="mt-4 space-y-3">
            {ex.trace.map((t, i) => (
              <li key={i} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm"><span className="text-xs text-muted-foreground">{labels[i]}</span><span>{t}</span></li>
            ))}
          </ol>
        ) : <p className="mt-4 text-sm text-muted-foreground">Select an exception to open its traceability drawer.</p>}
      </div>
    </div>
  );
}

/* ---------------- Impact model ---------------- */
const bands = { Conservative: 0.5, Base: 1, Ambitious: 1.5 } as const;

export function ProcurementImpact() {
  const [spendM, setSpend] = useState(40);
  const [contracts, setContracts] = useState(30);
  const [hrsReview, setHrsReview] = useState(4);
  const [onboard, setOnboard] = useState(20);
  const [rate, setRate] = useState(95);
  const [leak, setLeak] = useState(1.5);
  const [band, setBand] = useState<keyof typeof bands>("Base");
  const b = bands[band];
  const reviewHrs = contracts * 12 * hrsReview * 0.3 * b;
  const onboardHrs = onboard * 12 * 3 * 0.25 * b;
  const capacity = (reviewHrs + onboardHrs) * rate;
  const leakage = spendM * 1_000_000 * (leak / 100) * 0.4 * b;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <ControlPanel>
        <ControlSlider label="Annual addressable spend" value={spendM} min={5} max={500} step={5} onChange={setSpend} format={(v) => `$${v}M`} />
        <ControlSlider label="Contracts reviewed / month" value={contracts} min={5} max={200} onChange={setContracts} />
        <ControlSlider label="Analyst hours per review" value={hrsReview} min={1} max={12} step={0.5} onChange={setHrsReview} />
        <ControlSlider label="Supplier onboardings / month" value={onboard} min={0} max={150} onChange={setOnboard} />
        <ControlSlider label="Fully loaded labour cost / hour" value={rate} min={40} max={250} step={5} onChange={setRate} format={(v) => `$${v}`} />
        <ControlSlider label="Estimated addressable leakage" value={leak} min={0} max={5} step={0.1} onChange={setLeak} format={(v) => `${v.toFixed(1)}%`} />
      </ControlPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="radiogroup" aria-label="Scenario band" className="flex gap-1 rounded-full border border-border p-1">
            {(Object.keys(bands) as (keyof typeof bands)[]).map((k) => (
              <button key={k} role="radio" aria-checked={band === k} onClick={() => setBand(k)} className={cn("min-h-9 rounded-full px-3 text-xs", band === k ? "bg-foreground text-background" : "text-muted-foreground")}>{k}</button>
            ))}
          </div>
          <DemoBadge label="Scenario model · not a result" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Potential review hours released / yr", fmtNum(reviewHrs + onboardHrs), `contracts × 12 × hrs × 30% + onboardings × 12 × 3h × 25%, × ${b}`],
            ["Potential administrative capacity / yr", fmtMoney(capacity), "hours released × labour rate (capacity, not cash)"],
            ["Spend leakage opportunity / yr", fmtMoney(leakage), `spend × leakage % × 40% addressable, × ${b}`],
            ["Indicative avoided rework", fmtNum((reviewHrs + onboardHrs) * 0.1) + " hrs", "10% of released hours assumed rework (illustrative)"],
          ].map(([l, v, f]) => (
            <div key={l} className="glass p-5">
              <p className="text-xs text-muted-foreground">{l}</p>
              <p className="mt-2 font-display text-3xl tabular-nums">{v}</p>
              <p className="mt-2 text-[0.6875rem] text-muted-foreground">{f}</p>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">Outputs are not summed: capacity is time, leakage is an addressable opportunity, and neither equals realised savings. Validate every assumption against your own baseline during a pilot.</p>
      </div>
    </div>
  );
}

/* ---------------- Hero cockpit ---------------- */
export function ProcurementCockpit() {
  const panels = [
    { t: "Contracts", v: "128", s: "3 deviations awaiting Legal" },
    { t: "Spend", v: "$2.41M", s: "IT services · 12 months" },
    { t: "Suppliers", v: "29", s: "2 flagged · 2 incomplete" },
    { t: "Compliance", v: "94%", s: "Evidence current (sample)" },
  ];
  return (
    <div className="relative rounded-3xl border border-border bg-surface/50 p-4 md:p-8">
      <DemoBadge className="absolute right-4 top-4 md:right-6 md:top-6" />
      <div className="relative mt-10 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-[1fr_1fr_auto_1fr_1fr] md:items-center md:gap-4">
        {panels.slice(0, 2).map((p) => <Panel key={p.t} {...p} />)}
        <div className="col-span-2 order-last flex flex-col items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--case)_50%,transparent)] p-5 text-center md:order-none md:col-span-1 md:h-40 md:w-40 md:rounded-full">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--case)] motion-reduce:animate-none" />
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em]">Orchestration layer</p>
          <p className="mt-1 text-[0.6875rem] text-muted-foreground">Rules · AI · approvals</p>
        </div>
        {panels.slice(2).map((p) => <Panel key={p.t} {...p} />)}
      </div>
    </div>
  );
}
function Panel({ t, v, s }: { t: string; v: string; s: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <p className="eyebrow">{t}</p>
      <p className="mt-2 font-display text-2xl tabular-nums md:text-3xl">{v}</p>
      <p className="mt-1 text-xs text-muted-foreground">{s}</p>
    </div>
  );
}
