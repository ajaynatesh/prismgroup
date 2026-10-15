import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { CaseStudyShell, Chapter, ClosingLine, Controls, Faq, PainGrid, Phases, RelatedCaseStudies, CaseCta } from "@/components/case/Kit";
import { ArchStrip, Cockpit, Exceptions, ImpactModel, Journey, KpiChips, fmtAud, fmtNum } from "@/components/case/Generic";

const path = "/case-studies/intelligent-finance-operations";
const title = "Finance Without the Friction — Intelligent finance operations case study | Prism Group";
const description =
  "An interactive solution blueprint for invoice capture, three-way matching, fraud controls, governed approvals and reconciliation in one finance workflow.";

export const Route = createFileRoute("/case-studies/intelligent-finance-operations")({
  head: () => ({
    meta: pageMeta({ title, description, path, ogTitle: "Finance Without the Friction — Prism Group" }),
    links: canonical(path),
    scripts: ldScripts(
      breadcrumbLd([{ name: "Case Studies", path: "/case-studies" }, { name: "Finance Without the Friction", path }]),
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
      title="Finance Without the Friction"
      status="Proposed illustrative solution blueprint"
      headline={<>FINANCE<br />WITHOUT THE FRICTION.</>}
      sub="From invoice to reconciliation — one intelligent, governed workflow."
      copy="Capture invoices in any format, match them to orders and receipts, stop duplicates and bank-detail fraud, and route only genuine exceptions to the people who need to decide."
      visual={
        <Cockpit
          title="Accounts payable cockpit · Month to date"
          tiles={[
            { label: "Invoices received", value: "8,412", note: "PDF, email, EDI, paper" },
            { label: "Touchless match", value: "71%", note: "Three-way matched" },
            { label: "Exceptions", value: "318", note: "Price, quantity, missing PO", tone: "warn" },
            { label: "Held for review", value: "6", note: "Bank detail changes", tone: "alert" },
          ]}
          barsLabel="Invoices by day — current month (hundreds)"
          bars={[3.1, 3.4, 2.9, 3.8, 4.2, 1.1, 0.8, 3.6, 3.9, 4.4, 5.2, 6.1].map((v, i) => ({ label: `${i + 1}`, value: v, flag: i >= 10 }))}
        />
      }
      chapters={chapters}
    >
      <Chapter id="challenge" eyebrow="The business challenge" title="Finance teams spend their time fixing data, not using it."
        copy="Every invoice that arrives in a new format, misses a PO or changes bank details becomes rework, delay and risk.">
        <PainGrid items={[
          { title: "Manual keying", copy: "Invoices in many formats are re-typed into the ERP, introducing errors at the very first step." },
          { title: "Match failures", copy: "Small price and quantity variances stall payment while teams email back and forth." },
          { title: "Duplicate payments", copy: "The same invoice arrives twice with slightly different numbers and is paid twice." },
          { title: "Bank-detail fraud", copy: "Change requests arrive by email and are hard to verify under time pressure." },
          { title: "Slow month-end", copy: "Reconciliations are completed manually in spreadsheets at the last minute." },
          { title: "Weak visibility", copy: "Leaders cannot see liabilities, accruals or early-payment opportunities in real time." },
        ]} />
      </Chapter>

      <Chapter id="demo" eyebrow="Experience the solution" title="Follow one invoice, end to end." raised
        copy="Six connected stages, from inbox to reconciled ledger. Every figure and supplier is synthetic.">
        <Journey stages={[
          {
            name: "Capture",
            input: { label: "Incoming invoice", rows: [["Channel", "ap@ inbox, PDF"], ["Supplier", "Synthetic Logistics Pty Ltd"], ["Invoice no.", "INV-20931"], ["Total (inc GST)", "A$48,312.50"]] },
            finding: "Header and 14 line items extracted. ABN, GST and totals reconcile. Two fields fall below the confidence threshold.",
            checks: [{ label: "ABN valid", status: "pass" }, { label: "GST arithmetic", status: "pass" }, { label: "Low-confidence fields", status: "flag" }],
            action: "Send the two low-confidence fields for quick validation.",
            trace: [
              { kind: "Trigger", text: "Email with PDF attachment received." },
              { kind: "AI interpretation", text: "Document classified as tax invoice; fields extracted with confidence scores." },
              { kind: "Deterministic check", text: "ABN format, GST and line totals validated." },
            ],
          },
          {
            name: "Duplicate check",
            input: { label: "Similar invoices", rows: [["INV-20931", "This invoice"], ["INV20931-A", "Received 3 days ago"], ["Amount match", "Exact"], ["Status of match", "Unpaid"]] },
            finding: "A near-identical invoice with a suffixed number was received three days earlier. Likely duplicate.",
            checks: [{ label: "Duplicate risk", status: "missing" }],
            action: "Hold and confirm with the supplier before posting.",
            trace: [
              { kind: "Deterministic check", text: "Fuzzy match on supplier, amount, date and invoice number." },
              { kind: "System update", text: "Invoice placed on hold with reason code DUP." },
            ],
          },
          {
            name: "Three-way match",
            input: { label: "Match result", rows: [["PO", "PO-55102"], ["Goods receipt", "GR-88231 (13 of 14 lines)"], ["Price variance", "+2.4% line 7"], ["Tolerance", "±1.0%"]] },
            finding: "13 lines match. Line 7 price exceeds the contracted rate and tolerance; one line has no goods receipt yet.",
            checks: [{ label: "Quantity", status: "flag" }, { label: "Price", status: "missing" }, { label: "PO linked", status: "pass" }],
            action: "Route price variance to the budget owner; wait for receipt on line 14.",
            trace: [
              { kind: "Deterministic check", text: "Line-level comparison of invoice, PO and receipt." },
              { kind: "AI interpretation", text: "Variance explained against contract rate card." },
            ],
          },
          {
            name: "Bank-detail check",
            input: { label: "Payment details", rows: [["Vendor master BSB", "062-***"], ["Invoice BSB", "083-***"], ["Change request", "None on file"], ["Risk", "High"]] },
            finding: "Bank details on the invoice differ from the vendor master and no verified change request exists. Payment is blocked.",
            checks: [{ label: "Bank match", status: "missing" }, { label: "Call-back verification", status: "missing" }],
            action: "Block payment; trigger independent call-back verification.",
            approval: { who: "AP Manager + Treasury", reason: "Bank-detail changes require independent verification and dual approval. Never automated." },
            trace: [
              { kind: "Deterministic check", text: "Invoice bank details compared with vendor master." },
              { kind: "Human decision", text: "Treasury verifies via known contact, not invoice details." },
            ],
          },
          {
            name: "Approval",
            input: { label: "Approval routing", rows: [["Cost centre", "CC-410 Distribution"], ["Approver", "Operations Manager"], ["Limit", "A$50,000"], ["Variance note", "Fuel surcharge per clause 6.2"]] },
            finding: "Within the approver's limit. The summary explains the variance and links the contract clause so the decision takes seconds, not emails.",
            checks: [{ label: "Delegation of authority", status: "pass" }, { label: "Segregation of duties", status: "pass" }],
            action: "Approver accepts or rejects the variance.",
            approval: { who: "Operations Manager", reason: "Price variance above tolerance needs budget-owner approval." },
            trace: [
              { kind: "Deterministic check", text: "Approver selected by cost centre and amount." },
              { kind: "Human decision", text: "Budget owner approves with evidence attached." },
            ],
          },
          {
            name: "Post & reconcile",
            input: { label: "Ledger", rows: [["Posted", "AP journal 77120"], ["Payment run", "Thursday"], ["Bank statement", "Auto-matched"], ["Reconciliation", "Complete"]] },
            finding: "Invoice posted, paid in the scheduled run and matched to the bank statement. Full trace retained.",
            checks: [{ label: "ERP posting", status: "pass" }, { label: "Bank reconciliation", status: "pass" }],
            action: "No action required.",
            trace: [
              { kind: "System update", text: "Journal and payment posted to ERP." },
              { kind: "Audit record", text: "Source document, checks, approvals and payment linked." },
            ],
          },
        ]} />
      </Chapter>

      <Chapter id="exceptions" eyebrow="Exception workbench" title="Only genuine exceptions reach people."
        copy="Select an exception to see why it was raised and who owns it.">
        <Exceptions items={[
          { id: "AP-901", title: "Bank detail mismatch · Synthetic Logistics", severity: "High", owner: "Treasury", due: "Today", detail: "Invoice bank details differ from vendor master. Payment blocked pending call-back.", trace: [{ kind: "Deterministic check", text: "Bank details compared with master record." }, { kind: "Human decision", text: "Independent verification required." }] },
          { id: "AP-907", title: "Possible duplicate · A$48,312.50", severity: "High", owner: "AP Lead", due: "Today", detail: "Near-identical invoice received 3 days earlier.", trace: [{ kind: "Deterministic check", text: "Fuzzy duplicate rule matched." }] },
          { id: "AP-913", title: "Price variance 2.4% · PO-55102", severity: "Medium", owner: "Operations Manager", due: "Wed", detail: "Line 7 above contracted rate; fuel surcharge clause may apply.", trace: [{ kind: "AI interpretation", text: "Contract clause 6.2 identified as possible justification." }, { kind: "Human decision", text: "Budget owner decides." }] },
          { id: "AP-920", title: "Missing PO · Facilities", severity: "Low", owner: "Facilities", due: "Fri", detail: "Non-PO invoice under policy threshold; requires cost-centre coding.", trace: [{ kind: "AI interpretation", text: "Suggested GL and cost centre from history." }] },
        ]} />
      </Chapter>

      <Chapter id="value" eyebrow="Value levers" title="Model the opportunity — not a promise." raised
        copy="Change the assumptions to explore scenario ranges. Formulas are shown beneath every output.">
        <ImpactModel
          note="Processing saving = invoices × (manual cost − automated cost) × touchless %. Duplicate prevention = AP spend × duplicate rate × capture %. All inputs are yours; nothing is benchmarked."
          inputs={[
            { key: "inv", label: "Invoices per year", min: 5000, max: 500000, step: 5000, value: 100000, format: fmtNum },
            { key: "cost", label: "Manual cost per invoice", min: 5, max: 40, value: 15, format: (v) => `A$${v}` },
            { key: "touch", label: "Touchless rate assumption", min: 0, max: 90, value: 60, format: (v) => `${v}%` },
            { key: "spend", label: "Annual AP spend", min: 10e6, max: 2e9, step: 10e6, value: 250e6, format: fmtAud },
            { key: "dup", label: "Duplicate payment rate", min: 0, max: 0.5, step: 0.01, value: 0.05, format: (v) => `${v.toFixed(2)}%` },
          ]}
          outputs={[
            { label: "Processing cost avoided", formula: "inv × cost × 75% × touch", compute: (v) => v.inv * v.cost * 0.75 * (v.touch / 100), format: fmtAud },
            { label: "Duplicates prevented", formula: "spend × dup × 80% capture", compute: (v) => v.spend * (v.dup / 100) * 0.8, format: fmtAud },
            { label: "Invoices needing a person", formula: "inv × (1 − touch)", compute: (v) => v.inv * (1 - v.touch / 100), format: fmtNum },
            { label: "Hours released (8 min each)", formula: "inv × touch × 8 / 60", compute: (v) => (v.inv * (v.touch / 100) * 8) / 60, format: (n) => `${fmtNum(n)} h` },
          ]}
        />
      </Chapter>

      <Chapter id="governance" eyebrow="Governance by design" title="Architecture and controls.">
        <ArchStrip steps={["Email / EDI / portal / scan", "Secure ingestion", "Extraction & validation", "Match & fraud rules", "AI variance explanations", "Delegated approval", "ERP posting", "Bank reconciliation", "Audit log"]} />
        <Controls items={[
          { title: "No automated bank changes", copy: "Vendor bank details change only after independent verification and dual approval." },
          { title: "Delegation of authority", copy: "Approval routing follows your DoA matrix, by amount and cost centre." },
          { title: "Segregation of duties", copy: "Those who create vendors or POs cannot approve their payments." },
          { title: "Confidence thresholds", copy: "Low-confidence extractions are always validated by a person." },
          { title: "Source traceability", copy: "Every posted field links back to the original document." },
          { title: "Retention", copy: "Records kept to your statutory and tax retention requirements." },
        ]} />
      </Chapter>

      <Chapter id="implement" eyebrow="How to implement" title="Pilot first. Scale on evidence." raised>
        <Phases steps={[
          { title: "Discover", copy: "Baseline invoice volumes, channels, exception types and cycle times." },
          { title: "Focus", copy: "Select top suppliers by volume and one entity or business unit." },
          { title: "Pilot", copy: "Run capture and matching in parallel with the current process." },
          { title: "Expand", copy: "Add fraud controls, approvals and reconciliation." },
        ]} />
        <KpiChips items={["Touchless rate", "Cost per invoice", "Invoice cycle time", "Exceptions per 100 invoices", "Duplicates detected", "Days to close", "Early-payment discounts captured"]} />
      </Chapter>

      <Chapter id="faq" eyebrow="Questions answered" title="Frequently asked.">
        <Faq items={[
          { q: "Is this a completed client project?", a: "No. This is a proposed illustrative solution blueprint with synthetic data, showing how the workflow is designed to operate." },
          { q: "Does AI approve or release payments?", a: "No. AI extracts and explains; rules match and route; people approve. Payments follow your existing controls." },
          { q: "Which ERPs does it work with?", a: "The design assumes connectors to your ERP and banking platform. Integrations are scoped per engagement; this demo is fully simulated." },
          { q: "Can it handle paper and handwritten invoices?", a: "Scanned documents can be processed, with lower-confidence fields always routed for human validation." },
          { q: "Where do we start?", a: "One entity, the highest-volume suppliers and a clear baseline — validated with Finance and Internal Audit." },
        ]} />
      </Chapter>

      <CaseCta heading="What could frictionless finance unlock for your business?" copy="Whether your priority is invoice automation, payment controls, faster close or working-capital visibility, Prism can help identify and prioritise the opportunities with the strongest business case." cta="Discuss your finance transformation" />
      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Related</p>
          <RelatedCaseStudies slugs={["intelligent-procurement", "continuous-risk-compliance"]} pillarTo="/capabilities/ai-transformation" pillarName="AI Transformation & Automation" />
        </div>
      </section>
      <ClosingLine lines={["EVERY INVOICE UNDERSTOOD.", "EVERY PAYMENT PROTECTED.", "EVERY LEDGER RECONCILED."]} />
    </CaseStudyShell>
  );
}
