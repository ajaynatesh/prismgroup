import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { CaseStudyShell, Chapter, ClosingLine, Controls, Faq, PainGrid, Phases, RelatedCaseStudies, CaseCta } from "@/components/case/Kit";
import { ArchStrip, Cockpit, Exceptions, ImpactModel, Journey, KpiChips, fmtAud, fmtNum } from "@/components/case/Generic";

const path = "/case-studies/continuous-risk-compliance";
const title = "Compliance That Never Sleeps — Continuous risk & compliance case study | Prism Group";
const description =
  "An interactive solution blueprint linking obligations, controls and evidence in a living risk graph, with continuous monitoring and audit-ready traceability.";

export const Route = createFileRoute("/case-studies/continuous-risk-compliance")({
  head: () => ({
    meta: pageMeta({ title, description, path, ogTitle: "Compliance That Never Sleeps — Prism Group" }),
    links: canonical(path),
    scripts: ldScripts(
      breadcrumbLd([{ name: "Case Studies", path: "/case-studies" }, { name: "Compliance That Never Sleeps", path }]),
      webPageLd({ name: title, description, path }),
    ),
  }),
  component: Page,
});

const chapters = [
  { id: "challenge", label: "Challenge" },
  { id: "demo", label: "Experience it" },
  { id: "exceptions", label: "Control failures" },
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
      title="Compliance That Never Sleeps"
      status="Illustrative solution blueprint"
      headline={<>COMPLIANCE<br />THAT NEVER SLEEPS.</>}
      sub="From obligation to evidence — one living, continuously tested risk graph."
      copy="Map every obligation to the controls that satisfy it and the evidence that proves it, then monitor those controls continuously so failures surface the day they happen — not at audit."
      visual={
        <Cockpit
          title="Risk & compliance overview · Synthetic entity"
          tiles={[
            { label: "Obligations mapped", value: "412", note: "Across 9 frameworks" },
            { label: "Controls tested", value: "96%", note: "Automated, last 24h" },
            { label: "Open failures", value: "7", note: "2 high severity", tone: "alert" },
            { label: "Evidence gaps", value: "14", note: "Due within 30 days", tone: "warn" },
          ]}
          barsLabel="Control health by domain (% passing)"
          bars={[["Access", 94], ["Change", 88], ["Privacy", 97], ["Vendors", 72], ["Finance", 91], ["Ops", 85], ["Safety", 99]].map(([l, v]) => ({ label: l as string, value: v as number, flag: (v as number) < 80 }))}
        />
      }
      chapters={chapters}
    >
      <Chapter id="challenge" eyebrow="The business challenge" title="Compliance is assembled, not operated."
        copy="Most organisations prove compliance retrospectively — collecting screenshots and spreadsheets weeks before an audit, long after a control has drifted.">
        <PainGrid items={[
          { title: "Spreadsheet registers", copy: "Obligations, risks and controls live in separate files that disagree with each other." },
          { title: "Point-in-time testing", copy: "Controls are sampled quarterly, so a failure can go unnoticed for months." },
          { title: "Regulatory change", copy: "New guidance is read by one person and slowly translated into controls." },
          { title: "Third-party blind spots", copy: "Supplier attestations expire quietly and fourth-party risk is invisible." },
          { title: "Evidence scramble", copy: "Audit preparation consumes weeks of senior time chasing proof." },
          { title: "No single owner view", copy: "Control owners cannot see what they own or what is overdue." },
        ]} />
      </Chapter>

      <Chapter id="demo" eyebrow="Experience the solution" title="Follow one regulatory change, end to end." raised
        copy="Six connected stages, from new guidance to tested control and audit-ready evidence. Every figure and entity is synthetic.">
        <Journey stages={[
          {
            name: "Change detected",
            input: { label: "Regulatory update", rows: [["Source", "Synthetic regulator bulletin"], ["Topic", "Third-party data handling"], ["Effective", "In 90 days"], ["Relevance", "Privacy, Vendors"]] },
            finding: "The update introduces a new requirement to review supplier data-handling attestations annually. Two existing obligations are affected.",
            checks: [{ label: "Source verified", status: "pass" }, { label: "Legal interpretation", status: "flag" }],
            action: "Draft obligation changes for Compliance review.",
            trace: [
              { kind: "Trigger", text: "Subscribed regulatory feed publishes a new bulletin." },
              { kind: "AI interpretation", text: "Requirements extracted and matched to existing obligations." },
              { kind: "Audit record", text: "Bulletin and extraction stored with version." },
            ],
          },
          {
            name: "Obligation mapping",
            input: { label: "Obligation register", rows: [["OB-118", "Supplier privacy assurance (amended)"], ["OB-231", "Annual attestation review (new)"], ["Linked risks", "R-07 Data leakage"], ["Owner", "Head of Privacy"]] },
            finding: "One new obligation and one amendment proposed. AI suggests wording; it does not interpret the law on your behalf.",
            checks: [{ label: "Owner assigned", status: "pass" }, { label: "Legal sign-off", status: "missing" }],
            action: "Route proposed wording to Legal.",
            approval: { who: "General Counsel", reason: "Regulatory interpretation always requires legal sign-off." },
            trace: [
              { kind: "AI interpretation", text: "Draft obligation text with citations to the source paragraph." },
              { kind: "Human decision", text: "Legal confirms or edits the interpretation." },
            ],
          },
          {
            name: "Control design",
            input: { label: "Control linkage", rows: [["Existing control", "C-044 Vendor due diligence"], ["Gap", "No annual refresh step"], ["Proposed", "C-044b Annual attestation check"], ["Test type", "Automated + quarterly sample"]] },
            finding: "Existing control covers onboarding only. A new periodic test is proposed, using supplier portal data as evidence.",
            checks: [{ label: "Coverage", status: "flag" }, { label: "Testability", status: "pass" }],
            action: "Activate the new control test.",
            trace: [
              { kind: "Deterministic check", text: "Obligation-to-control coverage matrix recalculated." },
              { kind: "Human decision", text: "Control owner approves design." },
            ],
          },
          {
            name: "Continuous test",
            input: { label: "Test run", rows: [["Suppliers in scope", "186"], ["Attestation current", "163"], ["Expired", "17"], ["Missing", "6"]] },
            finding: "23 suppliers fail the new test. Four handle sensitive personal data and are escalated as high severity.",
            checks: [{ label: "Test executed", status: "pass" }, { label: "Failures", status: "missing" }],
            action: "Raise exceptions and notify supplier owners.",
            trace: [
              { kind: "Deterministic check", text: "Attestation dates compared with the 12-month rule." },
              { kind: "System update", text: "Exceptions created with owners and due dates." },
            ],
          },
          {
            name: "Remediation",
            input: { label: "Remediation status", rows: [["Requests sent", "23"], ["Received", "15"], ["Under review", "5"], ["Escalated", "3"]] },
            finding: "Received attestations are summarised for reviewers, with clauses that differ from the standard template highlighted.",
            checks: [{ label: "SLA", status: "flag" }, { label: "Reviewer assigned", status: "pass" }],
            action: "Reviewers accept or reject each attestation.",
            approval: { who: "Privacy reviewer", reason: "Acceptance of supplier evidence is a human decision." },
            trace: [
              { kind: "AI interpretation", text: "Attestation summarised; deviations from template flagged." },
              { kind: "Human decision", text: "Reviewer accepts, rejects or requests more information." },
            ],
          },
          {
            name: "Audit-ready",
            input: { label: "Evidence pack", rows: [["Obligation", "OB-231"], ["Control", "C-044b"], ["Test history", "Daily, 30 runs"], ["Evidence items", "186 linked"]] },
            finding: "A complete trace from regulation to obligation, control, test and evidence is available on demand.",
            checks: [{ label: "Trace complete", status: "pass" }, { label: "Evidence retained", status: "pass" }],
            action: "Export the pack for internal audit.",
            trace: [
              { kind: "System update", text: "Evidence pack compiled with source links." },
              { kind: "Audit record", text: "Immutable log of every decision and approver." },
            ],
          },
        ]} />
      </Chapter>

      <Chapter id="exceptions" eyebrow="Control failure workbench" title="Failures surface the day they happen."
        copy="Select a failure to see what triggered it and who must act.">
        <Exceptions items={[
          { id: "CF-301", title: "Privileged access not reviewed · Finance ERP", severity: "High", owner: "IT Security", due: "Today", detail: "Quarterly access review overdue by 9 days; 4 dormant admin accounts detected.", trace: [{ kind: "Trigger", text: "Review due date passed." }, { kind: "Deterministic check", text: "Dormant account rule matched 4 users." }, { kind: "Human decision", text: "System owner revokes or justifies access." }] },
          { id: "CF-305", title: "Supplier attestation expired · 17 vendors", severity: "High", owner: "Head of Privacy", due: "Wed", detail: "Annual attestations lapsed for vendors processing personal data.", trace: [{ kind: "Deterministic check", text: "Attestation older than 12 months." }, { kind: "System update", text: "Requests sent to vendor owners." }] },
          { id: "CF-312", title: "Change without approval · 2 releases", severity: "Medium", owner: "Engineering", due: "Thu", detail: "Two production changes lack a linked approval ticket.", trace: [{ kind: "Trigger", text: "Deployment log compared with change tickets." }, { kind: "Human decision", text: "Change Advisory reviews retrospectively." }] },
          { id: "CF-318", title: "Policy acknowledgement below target", severity: "Low", owner: "People team", due: "Next week", detail: "Code of conduct acknowledgement at 91% against a 98% target.", trace: [{ kind: "Deterministic check", text: "Acknowledgement rate below threshold." }] },
        ]} />
      </Chapter>

      <Chapter id="value" eyebrow="Value levers" title="Model the opportunity — not a promise." raised
        copy="Change the assumptions to explore scenario ranges. Formulas are shown beneath every output.">
        <ImpactModel
          note="Testing hours saved = controls × tests per year × hours per test × automation %. Audit prep saved = audit prep hours × reduction %. Cost = hours × hourly rate. All inputs are yours."
          inputs={[
            { key: "ctl", label: "Controls in scope", min: 50, max: 1500, step: 10, value: 300, format: fmtNum },
            { key: "tpy", label: "Manual tests per control per year", min: 1, max: 12, value: 4 },
            { key: "hpt", label: "Hours per manual test", min: 0.5, max: 8, step: 0.5, value: 2 },
            { key: "auto", label: "Share of tests automated", min: 0, max: 80, value: 40, format: (v) => `${v}%` },
            { key: "prep", label: "Audit preparation hours per year", min: 100, max: 5000, step: 50, value: 1200, format: fmtNum },
            { key: "rate", label: "Blended hourly cost", min: 60, max: 300, step: 5, value: 140, format: (v) => `A$${v}` },
          ]}
          outputs={[
            { label: "Testing hours released", formula: "ctl × tpy × hpt × auto", compute: (v) => v.ctl * v.tpy * v.hpt * (v.auto / 100), format: (n) => `${fmtNum(n)} h` },
            { label: "Audit prep hours released", formula: "prep × 50% (assumed)", compute: (v) => v.prep * 0.5, format: (n) => `${fmtNum(n)} h` },
            { label: "Annual capacity value", formula: "(testing + prep hours) × rate", compute: (v) => (v.ctl * v.tpy * v.hpt * (v.auto / 100) + v.prep * 0.5) * v.rate, format: fmtAud },
            { label: "Detection window", formula: "from 1 / tpy year → daily", compute: (v) => 365 / v.tpy, format: (n) => `${Math.round(n)} → 1 day` },
          ]}
        />
      </Chapter>

      <Chapter id="governance" eyebrow="Governance by design" title="Architecture and controls.">
        <ArchStrip steps={["Regulatory feeds", "Policies & registers", "System logs & HRIS", "Supplier portal", "Obligation-control graph", "Automated tests", "Human review", "Evidence vault", "Audit log"]} />
        <Controls items={[
          { title: "Legal stays in charge", copy: "AI drafts obligation summaries with citations; legal interpretation is always human." },
          { title: "Evidence provenance", copy: "Every evidence item links to its source system, timestamp and version." },
          { title: "Segregation of duties", copy: "Control owners cannot approve their own test exceptions." },
          { title: "Immutable audit trail", copy: "Decisions, approvers and changes are recorded and cannot be edited." },
          { title: "Least-privilege access", copy: "Sensitive findings visible only to authorised roles." },
          { title: "Licensed data sources", copy: "Sanctions and adverse-media checks require a licensed, current provider." },
        ]} />
      </Chapter>

      <Chapter id="implement" eyebrow="How to implement" title="Pilot first. Scale on evidence." raised>
        <Phases steps={[
          { title: "Discover", copy: "Consolidate obligations, risks and controls into one register." },
          { title: "Focus", copy: "Choose one framework or domain with clear evidence sources." },
          { title: "Pilot", copy: "Automate a set of control tests and run in parallel with manual testing." },
          { title: "Expand", copy: "Add regulatory change monitoring and third-party risk." },
        ]} />
        <KpiChips items={["Controls continuously tested %", "Time to detect failure", "Time to remediate", "Evidence gaps", "Audit preparation hours", "Overdue actions", "Third-party coverage"]} />
      </Chapter>

      <Chapter id="faq" eyebrow="Questions answered" title="Frequently asked.">
        <Faq items={[
          { q: "Is this a completed client project?", a: "No. This is an illustrative solution blueprint with synthetic data, showing how the workflow is designed to operate." },
          { q: "Does AI decide whether we are compliant?", a: "No. AI extracts, maps and summarises; deterministic tests check controls; people interpret regulation and accept evidence." },
          { q: "Which frameworks does it support?", a: "The design is framework-agnostic. Specific frameworks are configured per engagement; no certification is implied." },
          { q: "Can it replace our GRC platform?", a: "It is designed to complement existing GRC tools by connecting them to live system evidence." },
          { q: "Where do we start?", a: "One domain, a small set of high-value controls and one evidence source — validated with Risk and Internal Audit." },
        ]} />
      </Chapter>

      <CaseCta heading="What could continuous compliance unlock for your business?" copy="Whether your priority is audit readiness, control assurance, regulatory change or third-party risk, Prism can help identify and prioritise the opportunities with the strongest business case." cta="Discuss your risk & compliance transformation" />
      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Related</p>
          <RelatedCaseStudies slugs={["intelligent-procurement", "intelligent-finance-operations"]} pillarTo="/capabilities/ai-transformation" pillarName="AI Transformation & Automation" />
        </div>
      </section>
      <ClosingLine lines={["EVERY OBLIGATION MAPPED.", "EVERY CONTROL TESTED.", "EVERY DECISION EVIDENCED."]} />
    </CaseStudyShell>
  );
}
