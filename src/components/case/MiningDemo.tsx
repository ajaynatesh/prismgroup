import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ControlSlider, DecisionTrace, DemoBadge, HumanApproval } from "@/components/case/Kit";

const personas = [
  { name: "CEO", question: "What is putting this month’s plan at risk?", metric: "Plan attainment", value: "92%", interpretation: "A processing constraint, not ore availability, is the main driver of the production gap. Commercial exposure rises if the constraint persists.", action: "Align operations, finance and commercial owners on one recovery scenario." },
  { name: "CFO", question: "Where is margin moving — and why?", metric: "Unit cost", value: "A$76/t", interpretation: "Lower throughput spreads fixed costs over fewer tonnes. Energy and maintenance are separate cost drivers, not a single unexplained variance.", action: "Compare recovery cost with contribution upside before authorising spend." },
  { name: "COO", question: "Which operating constraint matters most?", metric: "Plant availability", value: "88%", interpretation: "Unplanned mill downtime constrains processing. A maintenance intervention may improve availability, but execution risk remains.", action: "Validate equipment evidence and test a maintenance recovery plan." },
  { name: "CMO", question: "Which markets present the strongest opportunity?", metric: "Markets under review", value: "3", interpretation: "Synthetic markets A, B and C differ in demand, price and freight exposure. Market B has the strongest price signal, but demand needs validation before repositioning supply.", action: "Review demand evidence and delivered economics with the commercial team." },
  { name: "CSO", question: "Which contracts offer the strongest margin opportunity?", metric: "Shipment cover", value: "11 days", interpretation: "Synthetic contract B has a stronger price spread than A, while C has higher freight exposure. Volume commitments and contract tolerances constrain any allocation change.", action: "Compare contribution, customer concentration and shipment obligations." },
  { name: "Board", question: "What must the board know before allocating capital?", metric: "Open strategic reviews", value: "2", interpretation: "The production gap affects the operating outlook. A recovery proposal and a growth investment require separate capacity, safety, cash-flow and risk assessments.", action: "Prepare a board intelligence brief with assumptions, evidence and unresolved risks." },
];

export function MiningCockpit() {
  const [active, setActive] = useState(0);
  const persona = personas[active];
  if (!persona) return null;
  return <div className="border-y border-border py-6 md:py-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><p className="font-display text-lg">DecisionIQ · mining intelligence</p><DemoBadge label="Illustrative demo — synthetic data" /></div>
    <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Executive personas">{personas.map((p, i) => <Button key={p.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} variant={active === i ? "default" : "outline"} className="min-h-11 shrink-0">{p.name}</Button>)}</div>
    <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" aria-live="polite">
      <div><p className="eyebrow">One governed dataset · {persona.name} lens</p><h2 className="mt-4 font-display text-2xl leading-snug md:text-3xl">{persona.question}</h2><p className="mt-8 text-xs text-muted-foreground">{persona.metric}</p><p className="mt-2 font-display text-5xl tabular-nums text-prism-4">{persona.value}</p></div>
      <div className="min-w-0"><div className="grid grid-cols-3 gap-3 border-b border-border pb-5">{[["Production", "46 kt"], ["Plan", "50 kt"], ["Gap", "−4 kt"]].map(([label, value]) => <div key={label}><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 font-display text-xl md:text-2xl">{value}</p></div>)}</div><p className="mt-5 text-sm leading-relaxed">{persona.interpretation}</p><p className="mt-4 flex items-start gap-2 text-sm text-prism-4"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />{persona.action}</p><div className="mt-5"><DecisionTrace title="Metric provenance" steps={[{ kind: "Trigger", text: "Synthetic month-to-date production is 46,000 tonnes against a 50,000-tonne plan." }, { kind: "Deterministic check", text: "Plan attainment = 46,000 ÷ 50,000 = 92%. Units, reporting period and metric definition are shared across personas." }, { kind: "AI interpretation", text: persona.interpretation }, { kind: "Human decision", text: persona.action }]} /></div></div>
    </div>
  </div>;
}

export function MiningScenario() {
  const [throughput, setThroughput] = useState(0);
  const [price, setPrice] = useState(100);
  const [cost, setCost] = useState(76);
  const [review, setReview] = useState(false);
  const tonnes = 46000 * (1 + throughput / 100);
  const contribution = tonnes * (price - cost);
  const delta = contribution - 46000 * 24;
  const money = (n: number) => `A$${Math.round(n).toLocaleString("en-AU")}`;
  function reset() { setThroughput(0); setPrice(100); setCost(76); setReview(false); }
  return <div className="space-y-6">
    <DemoBadge label="Illustrative demo — synthetic data" />
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="space-y-6"><p className="eyebrow">Scenario assumptions · one month</p><ControlSlider label="Throughput change" min={-15} max={15} value={throughput} onChange={(v) => { setThroughput(v); setReview(false); }} format={(v) => `${v > 0 ? "+" : ""}${v}%`} /><ControlSlider label="Realised price per tonne" min={70} max={130} value={price} onChange={(v) => { setPrice(v); setReview(false); }} format={money} /><ControlSlider label="Operating cost per tonne" min={60} max={95} value={cost} onChange={(v) => { setCost(v); setReview(false); }} format={money} /><Button variant="ghost" onClick={reset} className="min-h-11"><RotateCcw />Reset scenario</Button></div>
      <div aria-live="polite"><div className="grid gap-4 sm:grid-cols-2"><div className="border-b border-border pb-5"><p className="text-xs text-muted-foreground">Scenario output</p><p className="mt-3 font-display text-3xl text-prism-4">{Math.round(tonnes).toLocaleString("en-AU")} t</p><p className="mt-3 text-xs text-muted-foreground">46,000 × (1 + throughput change)</p></div><div className="border-b border-border pb-5"><p className="text-xs text-muted-foreground">Contribution sensitivity</p><p className="mt-3 break-words font-display text-3xl text-prism-4">{money(contribution)}</p><p className="mt-3 text-xs text-muted-foreground">Tonnes × (price − operating cost)</p></div></div><p className="mt-5 text-sm">Change from baseline: <span className="font-medium">{delta > 0 ? "+" : ""}{money(delta)}</span></p><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Simplified sensitivity model, not profit, a production forecast or a guaranteed outcome. Excludes royalties, freight, taxes, capital costs, quality changes and capacity constraints. Assumptions are adjustable, not benchmarks.</p><div className="mt-5"><HumanApproval who="Operations, Finance and Risk owners" reason="Validate capacity, safety, contract and cost assumptions before any operational change." state="required" /></div><Button variant="outline" className="mt-5 min-h-11" disabled={review} onClick={() => setReview(true)}>{review ? <Check /> : <ArrowRight />}{review ? "Added to demo review queue" : "Prepare decision brief"}</Button>{review ? <p role="status" className="mt-3 text-xs text-muted-foreground">Scenario saved to this on-screen review queue. No approval recorded and no systems updated.</p> : null}</div>
    </div>
  </div>;
}