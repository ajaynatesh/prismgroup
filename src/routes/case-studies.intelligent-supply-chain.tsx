import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { CaseStudyShell, Chapter, ClosingLine, Controls, Faq, PainGrid, Phases, RelatedCaseStudies, CaseCta } from "@/components/case/Kit";
import { ArchStrip, Cockpit, Exceptions, ImpactModel, Journey, KpiChips, fmtAud, fmtNum } from "@/components/case/Generic";

const path = "/case-studies/intelligent-supply-chain";
const title = "The Predictive Supply Chain — Supply chain intelligence case study | Prism Group";
const description =
  "An interactive solution blueprint for demand sensing, inventory optimisation and supplier intelligence in one governed forecast-to-replenishment control tower.";

export const Route = createFileRoute("/case-studies/intelligent-supply-chain")({
  head: () => ({
    meta: pageMeta({ title, description, path, ogTitle: "The Predictive Supply Chain — Prism Group" }),
    links: canonical(path),
    scripts: ldScripts(
      breadcrumbLd([{ name: "Case Studies", path: "/case-studies" }, { name: "The Predictive Supply Chain", path }]),
      webPageLd({ name: title, description, path }),
    ),
  }),
  component: Page,
});

const chapters = [
  { id: "challenge", label: "Challenge" },
  { id: "demo", label: "Experience it" },
  { id: "exceptions", label: "Exceptions" },
  { id: "value", label: "Value levers" },
  { id: "governance", label: "Governance" },
  { id: "implement", label: "Implementation" },
  { id: "faq", label: "FAQ" },
];

function Page() {
  return (
    <CaseStudyShell
      colour={1}
      pillarName="AI Transformation & Automation"
      pillarTo="/capabilities/ai-transformation"
      title="The Predictive Supply Chain"
      status="Illustrative solution blueprint"
      headline={<>SEE DEMAND<br />BEFORE IT ARRIVES.</>}
      sub="From signal to shelf — one forecast-to-replenishment control tower."
      copy="Blend sales, promotions, supplier lead times and external signals to anticipate demand, rebalance stock and act on supply risk before it becomes a stock-out or a write-off."
      visual={
        <Cockpit
          title="Supply chain control tower · Week 32"
          tiles={[
            { label: "Forecast accuracy", value: "87%", note: "SKU-week, rolling 8 wks" },
            { label: "At-risk SKUs", value: "42", note: "Stock-out within 14 days", tone: "alert" },
            { label: "Excess stock", value: "A$1.9m", note: "> 120 days cover", tone: "warn" },
            { label: "Supplier OTIF", value: "91%", note: "Last 30 days" },
          ]}
          barsLabel="Forecast vs. plan — next 10 weeks (units, thousands)"
          bars={[18, 21, 19, 24, 31, 36, 28, 22, 20, 19].map((v, i) => ({ label: `W${33 + i}`, value: v, flag: i === 4 || i === 5 }))}
        />
      }
      chapters={chapters}
    >
      <Chapter id="challenge" eyebrow="The business challenge" title="Planning cycles move slower than demand."
        copy="Supply chains rarely fail for lack of data. They fail because signals arrive late, in different systems, and decisions wait for the next monthly cycle.">
        <PainGrid items={[
          { title: "Spreadsheet forecasting", copy: "Planners rebuild forecasts by hand each month, so promotions and seasonality are applied inconsistently." },
          { title: "Blind to external signals", copy: "Weather, events and competitor activity shift demand but never reach the plan." },
          { title: "Wrong stock, wrong place", copy: "One site runs out while another holds months of cover for the same SKU." },
          { title: "Lead-time surprises", copy: "Supplier delays are discovered when goods fail to arrive, not when risk first appears." },
          { title: "Capital tied up", copy: "Safety stock is set by rule of thumb, inflating working capital without improving service." },
          { title: "Slow escalation", copy: "Exceptions travel by email, and nobody can see who owns which decision." },
        ]} />
      </Chapter>

      <Chapter id="demo" eyebrow="Experience the solution" title="Follow one demand spike, end to end." raised
        copy="Six connected stages, from the first signal to a governed replenishment decision. Every figure is synthetic.">
        <Journey stages={[
          {
            name: "Signal detected",
            input: { label: "Incoming signals", rows: [["SKU", "SC-1042 Cold beverage 24pk"], ["POS trend", "+38% vs. baseline, 5 days"], ["Weather feed", "Heatwave, 6-day outlook"], ["Promotion", "Catalogue week 37"]] },
            finding: "Demand uplift is outside normal variance for this SKU in three metropolitan regions. The pattern matches prior heat-driven uplifts plus a scheduled promotion.",
            checks: [{ label: "Data freshness", status: "pass" }, { label: "Outlier review", status: "flag" }],
            action: "Re-forecast the affected SKU-region combinations.",
            trace: [
              { kind: "Trigger", text: "Daily POS feed exceeds variance band for SC-1042." },
              { kind: "AI interpretation", text: "Signal classified as weather + promotion uplift with supporting evidence." },
              { kind: "Deterministic check", text: "Feed completeness and timestamp validated." },
              { kind: "Audit record", text: "Signal and evidence logged against the SKU." },
            ],
          },
          {
            name: "Demand re-forecast",
            input: { label: "Forecast revision", rows: [["Previous forecast", "18,400 units"], ["Revised forecast", "25,100 units"], ["Confidence range", "22,300 – 27,600"], ["Horizon", "Weeks 36–38"]] },
            finding: "Revised forecast is +36% with a wide confidence band. Main drivers: temperature (52%), promotion (31%), trend (17%).",
            checks: [{ label: "Driver explainability", status: "pass" }, { label: "Range width", status: "flag" }],
            action: "Assess inventory position against the revised forecast.",
            trace: [
              { kind: "AI interpretation", text: "Model re-weights drivers and produces a forecast range, not a single point." },
              { kind: "Deterministic check", text: "Forecast change above 25% triggers planner visibility." },
              { kind: "Audit record", text: "Forecast version 14 saved with driver breakdown." },
            ],
          },
          {
            name: "Inventory position",
            input: { label: "Network stock", rows: [["DC Sydney", "4.2 days cover"], ["DC Melbourne", "21 days cover"], ["DC Brisbane", "3.1 days cover"], ["In transit", "6,000 units, ETA 9 days"]] },
            finding: "Sydney and Brisbane fall below safety stock in week 36. Melbourne holds surplus that can cover part of the gap.",
            checks: [{ label: "Safety stock", status: "missing" }, { label: "Transfer capacity", status: "pass" }],
            action: "Generate rebalance and replenishment options.",
            trace: [
              { kind: "Deterministic check", text: "Projected on-hand compared with safety stock per DC." },
              { kind: "AI interpretation", text: "Options ranked by service level, cost and lead time." },
            ],
          },
          {
            name: "Supplier risk",
            input: { label: "Supplier profile", rows: [["Supplier", "Synthetic Beverages Pty Ltd"], ["OTIF (90 days)", "84%"], ["Capacity note", "Line maintenance week 36"], ["Alternate", "Approved, +6% unit cost"]] },
            finding: "Primary supplier has a planned capacity constraint overlapping the uplift. An approved alternate is available at a higher unit cost.",
            checks: [{ label: "Alternate approved", status: "pass" }, { label: "Capacity confirmed", status: "flag" }],
            action: "Prepare a split-order recommendation.",
            trace: [
              { kind: "AI interpretation", text: "Supplier notes summarised from portal messages." },
              { kind: "Deterministic check", text: "Alternate supplier status checked against the approved list." },
            ],
          },
          {
            name: "Recommendation",
            input: { label: "Proposed actions", rows: [["Transfer", "3,500 units MEL → SYD"], ["Expedite", "PO 7781 +4,000 units"], ["Split order", "30% to alternate supplier"], ["Est. added cost", "A$18.6k"]] },
            finding: "The combined plan protects an estimated 96% service level against a 79% do-nothing scenario. Added cost exceeds the planner's approval limit.",
            checks: [{ label: "Budget threshold", status: "flag" }, { label: "Service target", status: "pass" }],
            action: "Route to Supply Chain Manager for approval.",
            approval: { who: "Supply Chain Manager", reason: "Added cost above A$10k delegation limit. AI recommends; a person decides." },
            trace: [
              { kind: "AI interpretation", text: "Scenarios compared on service, cost and risk." },
              { kind: "Deterministic check", text: "Delegation of authority applied to added cost." },
              { kind: "Human decision", text: "Supply Chain Manager reviews the recommendation and evidence." },
            ],
          },
          {
            name: "Execute & learn",
            input: { label: "Execution", rows: [["Transfer order", "TO-5520 created"], ["PO amendment", "Sent to supplier"], ["Alternate PO", "PO-7790 created"], ["Review date", "Week 39"]] },
            finding: "Actions written back to the ERP. Actual sales will be compared with the forecast to improve future uplift estimates.",
            checks: [{ label: "ERP write-back", status: "pass" }, { label: "Outcome tracking", status: "pass" }],
            action: "Monitor sell-through and close the loop at week 39.",
            trace: [
              { kind: "System update", text: "Transfer and purchase orders posted to ERP." },
              { kind: "Audit record", text: "Decision, approver, evidence and outcome linked in one record." },
            ],
          },
        ]} />
      </Chapter>

      <Chapter id="exceptions" eyebrow="Exception workbench" title="Every exception owned. Every decision traceable."
        copy="Exceptions are ranked by service and financial impact. Select one to see how it was raised and routed.">
        <Exceptions items={[
          { id: "EX-2207", title: "Stock-out risk · SKU SC-1042 Brisbane", severity: "High", owner: "Planner QLD", due: "Today", detail: "Projected on-hand reaches zero in 3 days. Transfer option available from Melbourne.", trace: [{ kind: "Trigger", text: "Projected cover below 4 days." }, { kind: "Deterministic check", text: "No open inbound PO within lead time." }, { kind: "Human decision", text: "Planner to approve transfer." }] },
          { id: "EX-2211", title: "Supplier delay · PO 7764", severity: "Medium", owner: "Procurement", due: "Tomorrow", detail: "Supplier portal shows revised ship date 5 days later than confirmed.", trace: [{ kind: "Trigger", text: "Ship date changed in supplier portal." }, { kind: "AI interpretation", text: "Impact assessed on 11 dependent SKUs." }] },
          { id: "EX-2215", title: "Slow mover · 140 days cover", severity: "Low", owner: "Category Manager", due: "Fri", detail: "Seasonal SKU holds excess stock. Markdown or transfer options suggested.", trace: [{ kind: "Deterministic check", text: "Cover above 120-day threshold." }, { kind: "AI interpretation", text: "Markdown elasticity estimate from synthetic history." }] },
          { id: "EX-2219", title: "Forecast bias · Snacks category", severity: "Medium", owner: "Demand Planning", due: "Thu", detail: "Forecast has over-predicted by 12% for six weeks running.", trace: [{ kind: "Deterministic check", text: "Bias metric outside tolerance." }, { kind: "Human decision", text: "Planner reviews driver weights." }] },
        ]} />
      </Chapter>

      <Chapter id="value" eyebrow="Value levers" title="Model the opportunity — not a promise." raised
        copy="Change the assumptions to explore scenario ranges. Formulas are shown beneath every output.">
        <ImpactModel
          note="Inventory release = inventory value × reduction %. Carrying saving = release × carrying cost %. Lost-sales recovery = revenue × stock-out rate × recovery %. All inputs are yours; nothing is benchmarked."
          inputs={[
            { key: "inv", label: "Average inventory value", min: 2e6, max: 100e6, step: 1e6, value: 20e6, format: fmtAud },
            { key: "red", label: "Inventory reduction assumption", min: 0, max: 25, value: 8, format: (v) => `${v}%` },
            { key: "carry", label: "Carrying cost (annual)", min: 10, max: 35, value: 20, format: (v) => `${v}%` },
            { key: "rev", label: "Annual revenue", min: 10e6, max: 500e6, step: 5e6, value: 120e6, format: fmtAud },
            { key: "oos", label: "Current stock-out rate", min: 1, max: 12, step: 0.5, value: 4, format: (v) => `${v}%` },
            { key: "rec", label: "Stock-outs recovered", min: 0, max: 50, value: 20, format: (v) => `${v}%` },
          ]}
          outputs={[
            { label: "Working capital released", formula: "inv × red", compute: (v) => v.inv * (v.red / 100), format: fmtAud },
            { label: "Annual carrying saving", formula: "inv × red × carry", compute: (v) => v.inv * (v.red / 100) * (v.carry / 100), format: fmtAud },
            { label: "Revenue protected", formula: "rev × oos × rec", compute: (v) => v.rev * (v.oos / 100) * (v.rec / 100), format: fmtAud },
            { label: "Stock-out rate after", formula: "oos × (1 − rec)", compute: (v) => v.oos * (1 - v.rec / 100) * 10, format: (n) => `${(n / 10).toFixed(1)}%` },
          ]}
        />
      </Chapter>

      <Chapter id="governance" eyebrow="Governance by design" title="Architecture and controls.">
        <ArchStrip steps={["ERP / WMS / POS / supplier portal", "External signals", "Secure connectors", "Data quality checks", "Forecast models with ranges", "Optimisation rules", "Human approval", "ERP write-back", "Audit log"]} />
        <Controls items={[
          { title: "Explainable forecasts", copy: "Every forecast shows its drivers and a confidence range, never a single unexplained number." },
          { title: "Delegated approvals", copy: "Cost and volume thresholds decide who approves each recommendation." },
          { title: "Planner override", copy: "Planners can override any recommendation; overrides are logged and learned from." },
          { title: "Data quality gates", copy: "Stale or incomplete feeds pause automated recommendations." },
          { title: "Model monitoring", copy: "Accuracy and bias tracked by category, with alerts on drift." },
          { title: "Supplier data privacy", copy: "Commercial terms visible only to authorised roles." },
        ]} />
      </Chapter>

      <Chapter id="implement" eyebrow="How to implement" title="Pilot first. Scale on evidence." raised>
        <Phases steps={[
          { title: "Discover", copy: "Map planning process, data sources and service targets." },
          { title: "Focus", copy: "Select one category and region with measurable volatility." },
          { title: "Pilot", copy: "Run forecasts in shadow mode beside the current plan." },
          { title: "Expand", copy: "Add replenishment recommendations and supplier signals." },
        ]} />
        <KpiChips items={["Forecast accuracy (WMAPE)", "Forecast bias", "Service level", "Days of cover", "Stock-out rate", "Excess & obsolete stock", "Planner time on exceptions"]} />
      </Chapter>

      <Chapter id="faq" eyebrow="Questions answered" title="Frequently asked.">
        <Faq items={[
          { q: "Is this a completed client project?", a: "No. This is an illustrative solution blueprint with synthetic data, showing how the workflow is designed to operate." },
          { q: "Does AI place orders automatically?", a: "Not by default. AI recommends; rules route; people approve. Low-risk automation can be enabled later, within agreed thresholds." },
          { q: "What data is needed to start?", a: "Typically two years of sales history, current inventory, open orders and supplier lead times for the pilot category." },
          { q: "Does it replace our planning system?", a: "No. It is designed to sit alongside your ERP and planning tools and write approved decisions back to them." },
          { q: "How is accuracy measured?", a: `Against a held-out period and your current forecast, using agreed metrics such as WMAPE and bias — reported by category, e.g. across ${fmtNum(1200)} SKUs in this synthetic demo.` },
        ]} />
      </Chapter>

      <CaseCta heading="What could a predictive supply chain unlock for your business?" copy="Whether your priority is forecast accuracy, working capital, service levels or supplier resilience, Prism can help identify and prioritise the opportunities with the strongest business case." cta="Discuss your supply chain transformation" />
      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Related</p>
          <RelatedCaseStudies slugs={["intelligent-procurement", "intelligent-finance-operations"]} pillarTo="/capabilities/ai-transformation" pillarName="AI Transformation & Automation" />
        </div>
      </section>
      <ClosingLine lines={["EVERY SIGNAL SEEN.", "EVERY SHELF READY.", "EVERY DOLLAR WORKING."]} />
    </CaseStudyShell>
  );
}
