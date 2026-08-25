/**
 * Content model for the flagship AI Transformation pillar page.
 * All copy lives here so the page components stay presentational.
 */

export const AIX_COLOUR = 1;

export const heroOutcomes = [
  { title: "Grow revenue", copy: "Find, qualify and convert more of the demand you already have." },
  { title: "Reduce cost", copy: "Remove manual effort from the workflows that consume capacity." },
  { title: "Increase profitability", copy: "Compound both into margin, not just activity." },
];

export const engineInputs = ["Business data", "Processes", "People", "Systems"];
export const engineOutputs = ["Growth", "Efficiency", "Decisions", "Automation"];

export const openQuestions = [
  { q: "Where should we use AI?", a: "We map your value chain and score every process for AI leverage." },
  { q: "Which opportunities will actually generate ROI?", a: "Each opportunity is modelled economically before anything is built." },
  { q: "What should we automate?", a: "High volume, rules-bound, document-heavy work goes first." },
  { q: "Can our data support it?", a: "A data foundation review tells you what is usable today." },
  { q: "Which AI tools should we use?", a: "We are technology agnostic — buy, build, integrate or augment." },
  { q: "How do we integrate AI into existing systems?", a: "ERP, CRM and finance systems become the system of action." },
  { q: "How do we manage AI risk?", a: "Guardrails, oversight and auditability are designed in, not added later." },
  { q: "How do we get employees to actually use it?", a: "Workflows are redesigned around the people who run them." },
  { q: "How do we measure whether it worked?", a: "Baseline first, then track value realisation continuously." },
];

export const transformationDimensions = [
  { title: "Strategy", copy: "Where AI changes the basis of competition." },
  { title: "Revenue", copy: "Demand capture, conversion, pricing and retention." },
  { title: "Customer", copy: "Response, personalisation and service economics." },
  { title: "Operations", copy: "Throughput, cost to serve and exception handling." },
  { title: "People", copy: "Roles, capability and how work is actually done." },
  { title: "Technology", copy: "Platforms, applications and integration." },
  { title: "Data", copy: "Quality, access, context and semantics." },
  { title: "Risk", copy: "Governance, privacy, security and oversight." },
  { title: "Operating model", copy: "Decision rights, process ownership and scale." },
];

export type EngineStage = {
  n: string;
  name: string;
  tagline: string;
  copy: string;
  assess?: string[];
  outputs: string[];
};

export const valueEngine: EngineStage[] = [
  {
    n: "01",
    name: "Discover",
    tagline: "Find where AI can actually matter.",
    copy: "A structured read of the business — not a technology audit. We look for where effort, error, delay and lost demand concentrate.",
    assess: [
      "Business strategy",
      "Processes",
      "Customer journeys",
      "Technology",
      "Data",
      "Workforce",
      "Cost base",
      "Revenue opportunities",
    ],
    outputs: ["AI readiness profile", "Opportunity map", "Process heatmap", "AI risk profile"],
  },
  {
    n: "02",
    name: "Quantify",
    tagline: "Put an economic value on AI.",
    copy: "Every opportunity is modelled before it is built: what it releases, what it costs, when it pays back.",
    assess: [
      "Revenue upside",
      "Cost reduction",
      "Productivity gain",
      "Capacity released",
      "Error reduction",
      "Customer value",
      "Implementation effort",
      "Technology investment",
      "Payback",
      "ROI",
    ],
    outputs: ["Value model", "Business case", "Payback profile"],
  },
  {
    n: "03",
    name: "Prioritise",
    tagline: "Sequence value, not enthusiasm.",
    copy: "Opportunities are ranked on value, effort, data readiness and risk to form a portfolio that self-funds its next stage.",
    outputs: ["Opportunity portfolio", "Sequenced roadmap", "Funding logic"],
  },
  {
    n: "04",
    name: "Design",
    tagline: "Reimagine the workflow.",
    copy: "Future-state workflows are designed around intelligence and exception handling rather than paving over the old process.",
    outputs: ["Future-state workflows", "Human + AI role split", "Integration design"],
  },
  {
    n: "05",
    name: "Build",
    tagline: "AI, automation and agents.",
    copy: "Engineering the intelligence layer: models, document understanding, orchestration and agents with defined guardrails.",
    outputs: ["Working solution", "Guardrails & evaluations", "Runbook"],
  },
  {
    n: "06",
    name: "Deploy",
    tagline: "People, process and technology together.",
    copy: "Integration into live operations, with adoption treated as a delivery workstream rather than a training afterthought.",
    outputs: ["Production integration", "Adoption plan", "Support model"],
  },
  {
    n: "07",
    name: "Scale",
    tagline: "From solution to capability.",
    copy: "Shared platforms, governance and measurement turn individual wins into an enterprise AI operating model.",
    outputs: ["AI platform", "Governance framework", "Value dashboard"],
  },
];

export const valueEquation = ["Revenue upside", "Cost optimisation", "Productivity", "Decision value"];

export type MapGroup = {
  group: string;
  blurb: string;
  functions: { name: string; opportunities: string[] }[];
};

export const opportunityMap: MapGroup[] = [
  {
    group: "Grow",
    blurb: "Demand, conversion and customer value.",
    functions: [
      {
        name: "Sales",
        opportunities: [
          "AI lead qualification",
          "Next-best action",
          "Proposal generation",
          "Sales forecasting",
          "CRM automation",
          "Opportunity scoring",
          "Dead lead revival",
        ],
      },
      {
        name: "Marketing",
        opportunities: [
          "Content generation",
          "Personalisation",
          "Campaign optimisation",
          "Customer intelligence",
          "Channel attribution",
        ],
      },
      {
        name: "Customer",
        opportunities: ["AI service agents", "Voice & WhatsApp engagement", "Retention signals", "Sentiment analysis"],
      },
      {
        name: "Pricing",
        opportunities: ["Margin analysis", "Quote optimisation", "Discount governance", "Win/loss intelligence"],
      },
      {
        name: "Retention",
        opportunities: ["Churn prediction", "Renewal automation", "Follow-up orchestration", "Lifecycle triggers"],
      },
    ],
  },
  {
    group: "Operate",
    blurb: "Throughput, cost to serve and capacity.",
    functions: [
      {
        name: "Operations",
        opportunities: [
          "Workflow automation",
          "Scheduling",
          "Exception management",
          "Predictive maintenance",
          "Document processing",
          "Quality control",
        ],
      },
      {
        name: "Supply chain",
        opportunities: ["Demand forecasting", "Procurement automation", "Supplier intelligence", "Inventory optimisation"],
      },
      { name: "Service", opportunities: ["Triage & routing", "Diagnostics", "Field scheduling", "Knowledge retrieval"] },
      { name: "Workforce", opportunities: ["Capacity modelling", "Rostering", "Productivity analytics", "Task assistance"] },
      { name: "Procurement", opportunities: ["Contract review", "Spend analytics", "Supplier onboarding", "Compliance checks"] },
    ],
  },
  {
    group: "Control",
    blurb: "Finance, risk and reporting.",
    functions: [
      {
        name: "Finance",
        opportunities: [
          "Invoice processing",
          "Reconciliation",
          "FP&A",
          "Cash forecasting",
          "Expense review",
          "Variance analysis",
          "Management reporting",
        ],
      },
      { name: "Risk", opportunities: ["Control monitoring", "Anomaly detection", "Third-party risk", "Incident triage"] },
      { name: "Compliance", opportunities: ["Obligation mapping", "Evidence collection", "Regulatory intelligence", "Audit support"] },
      { name: "Reporting", opportunities: ["Narrative generation", "Board packs", "KPI commentary", "Data quality checks"] },
    ],
  },
  {
    group: "Enable",
    blurb: "The functions that carry everything else.",
    functions: [
      { name: "IT", opportunities: ["Service management", "Knowledge assistance", "Development acceleration", "Cybersecurity triage"] },
      { name: "HR", opportunities: ["Recruitment screening", "Employee support", "Policy knowledge", "Workforce analytics"] },
      { name: "Knowledge", opportunities: ["Semantic search", "Document intelligence", "Summarisation", "Institutional memory"] },
      { name: "Administration", opportunities: ["Inbox triage", "Data entry removal", "Scheduling", "Records management"] },
    ],
  },
];

export const valueLevels = [
  {
    n: "01",
    name: "Assist",
    statement: "AI helps people work faster.",
    items: ["Copilots", "Content generation", "Search", "Summarisation", "Knowledge retrieval"],
  },
  {
    n: "02",
    name: "Augment",
    statement: "AI improves human decisions.",
    items: ["Recommendations", "Predictive analytics", "Decision support", "Risk detection"],
  },
  {
    n: "03",
    name: "Automate",
    statement: "AI performs defined workflows.",
    items: ["Document processing", "Customer service", "Reporting", "Reconciliation"],
  },
  {
    n: "04",
    name: "Agent",
    statement: "AI executes multi-step processes.",
    items: ["Sales agents", "Service agents", "Finance agents", "Operations agents"],
  },
  {
    n: "05",
    name: "Transform",
    statement: "AI changes how the business operates.",
    items: [
      "AI-native operating models",
      "Autonomous workflows",
      "New customer experiences",
      "New revenue models",
      "AI-enabled organisations",
    ],
  },
];

export const humanAi = {
  humans: ["Strategy", "Judgement", "Relationships", "Creativity", "Accountability"],
  ai: ["Analysis", "Prediction", "Automation", "Execution", "Monitoring"],
};

export const workflowBefore = ["Email", "Spreadsheet", "Manual review", "Approval", "Data entry", "Report", "Follow-up"];
export const workflowAfter = ["AI intake", "Intelligence", "Decision", "Automation", "Human exception", "System update"];

export const autonomySteps = [
  { name: "Rule", copy: "If X happens, do Y." },
  { name: "Automation", copy: "A system performs a defined task." },
  { name: "AI", copy: "A system understands unstructured information." },
  {
    name: "Agent",
    copy: "A system understands the objective, plans actions, uses tools and executes a workflow within defined guardrails.",
  },
];

export const agentExamples = [
  { name: "Sales agent", flow: ["Find", "Qualify", "Engage", "Update CRM", "Follow up"] },
  { name: "Service agent", flow: ["Understand", "Diagnose", "Book", "Escalate", "Close"] },
  { name: "Finance agent", flow: ["Extract", "Validate", "Reconcile", "Flag", "Route"] },
  { name: "Operations agent", flow: ["Monitor", "Identify exception", "Investigate", "Recommend", "Act"] },
];

export const dataStack = [
  {
    layer: "Systems",
    items: ["ERP", "CRM", "HR", "Finance", "Operations", "Documents", "Email", "Web", "Customer data"],
  },
  { layer: "Data foundation", items: ["Integration", "Quality", "Governance", "Semantic layer"] },
  { layer: "AI intelligence", items: ["LLMs", "Predictive AI", "Generative AI", "Agents"] },
  { layer: "Business action", items: ["Decision", "Automation", "Customer", "Employee", "Revenue"] },
];

export const techStack = [
  {
    layer: "Experience",
    copy: "Where the business and its customers meet the intelligence.",
    items: ["Web", "Mobile", "WhatsApp", "Voice", "SMS", "Copilots"],
  },
  {
    layer: "Applications",
    copy: "Purpose-built surfaces that turn intelligence into work.",
    items: ["AI applications", "Agents", "Decision systems", "Automation"],
  },
  {
    layer: "Intelligence",
    copy: "The models that read, predict, generate and reason.",
    items: ["Generative AI", "Predictive AI", "Agentic AI", "Document intelligence", "Computer vision"],
  },
  {
    layer: "Orchestration",
    copy: "How work is sequenced, tooled and escalated safely.",
    items: ["Workflow", "Tools", "APIs", "Rules", "Human escalation"],
  },
  {
    layer: "Data",
    copy: "The proprietary business context that makes AI useful.",
    items: ["Structured data", "Unstructured data", "Documents", "Knowledge"],
  },
  {
    layer: "Enterprise systems",
    copy: "The systems of record that must remain the source of truth.",
    items: ["ERP", "CRM", "Finance", "HR", "Operations"],
  },
];

export const domains = [
  { name: "Sales", items: ["Lead management", "Sales intelligence", "Proposal automation", "Forecasting", "CRM automation"] },
  { name: "Marketing", items: ["Content", "Personalisation", "Campaign optimisation", "Customer intelligence"] },
  { name: "Customer experience", items: ["AI service", "Personalisation", "Retention", "Voice", "WhatsApp"] },
  { name: "Operations", items: ["Workflow automation", "Process optimisation", "Exception management", "Scheduling"] },
  { name: "Finance", items: ["Invoice processing", "Reconciliation", "FP&A", "Forecasting", "Collections"] },
  { name: "HR", items: ["Recruitment", "Employee support", "Knowledge", "Workforce analytics"] },
  { name: "Supply chain", items: ["Demand forecasting", "Procurement", "Supplier intelligence", "Inventory optimisation"] },
  { name: "Risk & compliance", items: ["Monitoring", "Controls", "Evidence", "Regulatory intelligence"] },
  { name: "IT", items: ["Service management", "Knowledge", "Development", "Cybersecurity"] },
];

export const sourcingOptions = [
  { name: "Buy", copy: "Use an existing platform where the category is solved." },
  { name: "Build", copy: "Create a proprietary solution where the advantage is yours." },
  { name: "Integrate", copy: "Connect technologies you already own." },
  { name: "Augment", copy: "Add intelligence to an existing workflow or system." },
  { name: "Replace", copy: "Redesign a process that has outlived its logic." },
];

export const governanceItems = [
  "AI governance",
  "Privacy",
  "Security",
  "Model risk",
  "Data governance",
  "Human oversight",
  "Access controls",
  "Auditability",
  "AI testing",
  "Responsible AI",
  "Regulatory considerations",
  "Model monitoring",
];

export const maturity = [
  { n: "01", name: "Experimenting", copy: "Individual AI tools used informally." },
  { n: "02", name: "Adopting", copy: "Teams using AI in day-to-day work." },
  { n: "03", name: "Embedding", copy: "AI integrated into core workflows." },
  { n: "04", name: "Scaling", copy: "An enterprise AI platform and governance." },
  { n: "05", name: "Transforming", copy: "An AI-native operating model." },
];

export const roadmap = [
  { when: "0–30 days", name: "Discover", items: ["AI readiness", "Opportunity assessment", "Value pools"] },
  { when: "30–90 days", name: "Prove", items: ["High-value pilots", "ROI validation", "Workflow redesign"] },
  { when: "3–6 months", name: "Deploy", items: ["Production solutions", "Integration", "Adoption"] },
  { when: "6–12 months", name: "Scale", items: ["Enterprise rollout", "AI operating model", "Governance"] },
  { when: "12+ months", name: "Transform", items: ["AI-enabled business model", "Autonomous workflows", "Continuous optimisation"] },
];

export const accelerators = [
  { name: "AI Invoice Intelligence", flow: ["Extract", "Validate", "Match", "Approve"] },
  { name: "Export Workflow Intelligence", flow: ["Documents", "Approvals", "Milestones", "Visibility"] },
  { name: "ComplianceIQ", flow: ["Obligations", "Evidence", "Alerts", "Reporting"] },
  { name: "AI Reimbursement Review", flow: ["Claims", "Policy", "Duplicate detection", "Exceptions"] },
];

export const beforeAfter = {
  before: ["People search.", "People reconcile.", "People copy.", "People chase.", "People report.", "People wait."],
  after: ["AI finds.", "AI reconciles.", "AI updates.", "AI follows up.", "AI monitors.", "AI recommends."],
};

export const valueRealisation = ["Baseline", "Deploy", "Measure", "Optimise", "Scale"];
export const valueMetrics = ["Revenue", "Cost", "Productivity", "Quality", "Speed", "Customer experience", "Risk"];

export const caseStudyFields = [
  "Business problem",
  "AI opportunity",
  "Solution",
  "Technology",
  "Workflow before",
  "Workflow after",
  "Value created",
  "Lessons",
];

export const flywheel = ["Discover", "Quantify", "Build", "Deploy", "Measure", "Learn", "Optimise", "Scale"];

export const faqs = [
  {
    q: "Where does an AI transformation actually start?",
    a: "With the business, not the technology. We assess where effort, error, delay and lost demand concentrate, then model which of those opportunities carry real economic value.",
  },
  {
    q: "How do you decide what to automate first?",
    a: "High-volume, rules-bound and document-heavy workflows usually pay back fastest. We rank candidates on value, effort, data readiness and risk so the first stage funds the next.",
  },
  {
    q: "What if our data isn't ready?",
    a: "Most organisations have more usable context than they think and less clean data than they hope. The discovery stage tells you what can be used now and what needs a data foundation first.",
  },
  {
    q: "Do you build solutions or only advise?",
    a: "Both. Prism models the opportunity and then engineers, integrates and operates the solution — including agents, document intelligence and workflow automation.",
  },
  {
    q: "How is AI risk managed?",
    a: "Guardrails, human oversight, access controls, auditability and model monitoring are designed into the workflow rather than added after deployment.",
  },
  {
    q: "How do you prove value?",
    a: "A baseline is captured before deployment and tracked afterwards across revenue, cost, productivity, quality, speed, customer experience and risk.",
  },
  {
    q: "Are the ROI figures on this page guarantees?",
    a: "No. Any modelling shown here is illustrative. Actual value depends on the business, the process, the data and the quality of implementation.",
  },
];
