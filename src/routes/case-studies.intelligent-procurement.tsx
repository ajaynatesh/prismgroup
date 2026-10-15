import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import {
  CaseStudyShell, Chapter, ClosingLine, Controls, Faq, PainGrid, Phases, RelatedCaseStudies,
, CaseCta } from "@/components/case/Kit";
import {
  BeforeAfter, ClauseHeatmap, ExceptionWorkbench, OnboardingTracker, ProcurementCockpit, ProcurementImpact, PurchaseJourney, SpendTreemap,
} from "@/components/case/procurement/Demo";

const path = "/case-studies/intelligent-procurement";
const title = "Procurement, Reimagined — Intelligent procurement case study | Prism Group";
const description =
  "An interactive solution blueprint connecting contract intelligence, spend visibility, supplier onboarding and policy controls in one governed procurement workflow.";

export const Route = createFileRoute("/case-studies/intelligent-procurement")({
  head: () => ({
    meta: pageMeta({ title, description, path, ogTitle: "Procurement, Reimagined — Prism Group" }),
    links: canonical(path),
    scripts: ldScripts(
      breadcrumbLd([{ name: "Case Studies", path: "/case-studies" }, { name: "Procurement, Reimagined", path }]),
      webPageLd({ name: title, description, path }),
    ),
  }),
  component: Page,
});

const chapters = [
  { id: "challenge", label: "Challenge" },
  { id: "demo", label: "Experience it" },
  { id: "deep-dives", label: "Inside the intelligence" },
  { id: "exceptions", label: "Exceptions & trace" },
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
      title="Procurement, Reimagined"
      status="Illustrative solution blueprint"
      headline={<>PROCUREMENT,<br />REIMAGINED.</>}
      sub="From contracts and suppliers to spend and compliance — one intelligent workflow."
      copy="Connect contract intelligence, spend visibility, supplier onboarding and policy controls to reduce friction and bring every procurement decision into focus."
      visual={<ProcurementCockpit />}
      chapters={chapters}
    >
      <Chapter id="challenge" eyebrow="The business challenge" title="Procurement breaks in the gaps between systems."
        copy="Most friction is not in any single task — it is in the handoffs between documents, data and approvals.">
        <PainGrid items={[
          { title: "Disconnected repositories", copy: "Contracts sit in PDFs and shared drives, invisible to the people approving spend." },
          { title: "Manual clause checks", copy: "Every agreement is read line by line against a playbook held in someone's memory." },
          { title: "Inconsistent vendor data", copy: "The same supplier exists under several names, hiding concentration and duplicates." },
          { title: "Opaque spend", copy: "GL, card and AP data use different categories, so off-contract spend goes unseen." },
          { title: "Slow onboarding", copy: "Document chasing and fragmented approvals stretch supplier setup into weeks." },
          { title: "Late evidence", copy: "Renewals surprise teams and compliance evidence is assembled only when audit arrives." },
        ]} />
        <div className="mt-12"><BeforeAfter /></div>
      </Chapter>

      <Chapter id="demo" eyebrow="Experience the solution" title="Follow one purchase, end to end." raised
        copy="Eight connected stages, each with a sample document, AI findings, risk flags and an action log. Every figure is synthetic.">
        <PurchaseJourney />
      </Chapter>

      <Chapter id="deep-dives" eyebrow="Inside the intelligence" title="Four capabilities, one operating picture.">
        <div className="space-y-16">
          <div>
            <h3 className="font-display text-2xl">Contract Intelligence</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Designed to extract clauses, compare them with your playbook, suggest redlines, build an obligation register and renewal calendar, and check invoice prices against contract rates. Multilingual documents are supported with human validation.</p>
            <div className="mt-6"><ClauseHeatmap /></div>
          </div>
          <div>
            <h3 className="font-display text-2xl">Spend Command Centre</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Vendor entity resolution, category taxonomy, maverick spend, contract leakage, duplicate invoices and consolidation opportunities — by business unit and period.</p>
            <div className="mt-6"><SpendTreemap /></div>
          </div>
          <div>
            <h3 className="font-display text-2xl">Supplier Lifecycle</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Guided onboarding, missing-document chasing, tiered due diligence, approval workflows, periodic refresh and offboarding.</p>
            <div className="mt-6"><OnboardingTracker /></div>
          </div>
          <div>
            <h3 className="font-display text-2xl">Compliance by Design</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Policy checks, delegation of authority, segregation of duties and evidence capture built into the workflow. Sanctions and third-party screening require integration with a licensed, current data source.</p>
          </div>
        </div>
      </Chapter>

      <Chapter id="exceptions" eyebrow="Exception workbench" title="Every exception owned. Every decision traceable." raised
        copy="Exceptions are grouped by criticality, owner and due date. Select one to see the path from original source to approval.">
        <ExceptionWorkbench />
      </Chapter>

      <Chapter id="value" eyebrow="Value levers" title="Model the opportunity — not a promise."
        copy="Change the assumptions to explore scenario ranges. Formulas are shown beneath every output.">
        <ProcurementImpact />
      </Chapter>

      <Chapter id="governance" eyebrow="Governance by design" title="Architecture and controls." raised>
        <div className="mb-10 overflow-x-auto">
          <ol className="flex min-w-max items-center gap-2 text-xs">
            {["ERP / AP / contracts / supplier portal", "Secure connectors", "Extraction & classification", "Rules engine", "AI reasoning with evidence links", "Risk scoring", "Human approval", "ERP updates", "Audit log"].map((s, i, a) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-full border border-border px-3 py-2">{s}</span>
                {i < a.length - 1 ? <span aria-hidden="true" className="text-muted-foreground">→</span> : null}
              </li>
            ))}
          </ol>
        </div>
        <Controls items={[
          { title: "Access control", copy: "Role-based permissions across contracts, spend and supplier data." },
          { title: "Human legal review", copy: "AI clause findings are suggestions; Legal confirms every deviation." },
          { title: "Approval thresholds", copy: "Delegation of authority decides routing; high risk is never auto-approved." },
          { title: "Document provenance", copy: "Every extracted field links back to its source document and version." },
          { title: "Privacy & retention", copy: "Retention schedules and minimisation for supplier and personal data." },
          { title: "Model quality testing", copy: "Extraction accuracy measured against reviewed samples before and after go-live." },
        ]} />
      </Chapter>

      <Chapter id="implement" eyebrow="How to implement" title="Pilot first. Scale on evidence.">
        <Phases steps={[
          { title: "Discover", copy: "Map spend taxonomy, policies and approval paths." },
          { title: "Focus", copy: "Select one category; configure the contract playbook." },
          { title: "Pilot", copy: "Integrate one source; run exception handling with Procurement and Legal." },
          { title: "Expand", copy: "Add supplier lifecycle; monitor realised KPIs." },
        ]} />
        <div className="mt-10 flex flex-wrap gap-2">
          {["Cycle time", "First-pass completeness", "Off-contract spend %", "Exceptions per 100 invoices", "Renewal alerts acted on", "Reviewer time", "Supplier onboarding time"].map((k) => (
            <span key={k} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">{k}</span>
          ))}
        </div>
      </Chapter>

      <Chapter id="faq" eyebrow="Questions answered" title="Frequently asked." raised>
        <Faq items={[
          { q: "Is this a completed client project?", a: "No. This is an illustrative solution blueprint with synthetic data, showing how the workflow is designed to operate." },
          { q: "Does AI approve contracts or suppliers?", a: "No. AI extracts and suggests; deterministic rules route; people approve. High-risk items always need human sign-off." },
          { q: "Which systems can it connect to?", a: "The design assumes connectors to your ERP, AP, contract repository and supplier portal. Integrations are scoped per engagement; the demo here is fully simulated." },
          { q: "Can it run sanctions screening?", a: "Only when integrated with a licensed, current screening provider. Without one, checks are shown as missing, never as passed." },
          { q: "Where do we start?", a: "One category, one data source and one contract playbook — validated with Procurement and Legal before expanding." },
        ]} />
      </Chapter>

      <CaseCta heading="What could intelligent procurement unlock for your business?" copy="Whether your priority is accelerating contract reviews, improving spend visibility, strengthening supplier governance or automating procurement workflows, Prism can help identify and prioritise the opportunities with the strongest business case." cta="Discuss your procurement transformation" />
      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-8">Related</p>
          <RelatedCaseStudies slugs={["intelligent-finance-operations", "continuous-risk-compliance"]} pillarTo="/capabilities/ai-transformation" pillarName="AI Transformation & Automation" />
        </div>
      </section>
      <ClosingLine lines={["EVERY CONTRACT UNDERSTOOD.", "EVERY DOLLAR VISIBLE.", "EVERY SUPPLIER ACCOUNTABLE."]} />
    </CaseStudyShell>
  );
}
