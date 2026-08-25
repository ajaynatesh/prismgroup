/**
 * Content model for the flagship Enterprise AI & Technology Transformation
 * pillar page (Prism pillar 03). All copy lives here so components stay
 * presentational.
 */

export const ENT_COLOUR = 3;

export const heroInputs = [
  "ERP",
  "CRM",
  "Finance",
  "HR",
  "Operations",
  "Data",
  "Documents",
  "Customer",
  "Applications",
];

export const heroOutputs = [
  "AI",
  "Automation",
  "Intelligence",
  "Applications",
  "Decisions",
  "Outcomes",
];

export const heroOutcomes = [
  { title: "Connected systems", copy: "One technology estate that behaves like a single environment." },
  { title: "Embedded AI", copy: "Intelligence inside the workflows that already run the business." },
  { title: "Measurable return", copy: "Technology investment tied to growth, cost, control and scale." },
];

export const problemSymptoms = [
  { title: "Legacy systems", copy: "Platforms that cannot support the way the business now operates." },
  { title: "Disconnected applications", copy: "Point solutions bought to solve one problem, integrated with none." },
  { title: "Fragmented data", copy: "The same customer, product or cost recorded differently in five places." },
  { title: "Manual processes", copy: "Skilled people moving information between systems by hand." },
  { title: "Multiple platforms", copy: "Overlapping licences, duplicated capability, unclear ownership." },
  { title: "Duplicated information", copy: "Re-entry and re-keying that quietly creates error and rework." },
  { title: "Inconsistent reporting", copy: "Two numbers for the same question, and no agreed source of truth." },
  { title: "Complex integrations", copy: "Brittle interfaces that make every change slow and expensive." },
  { title: "Security & compliance pressure", copy: "Controls retrofitted after the architecture was settled." },
  { title: "AI without foundations", copy: "Pilots that cannot reach production because the plumbing is missing." },
];

export const degradationChain = [
  "Fragmented technology",
  "Data silos",
  "Manual work",
  "Slow decisions",
  "Higher cost",
  "Missed opportunity",
];

export const thesisPrinciples = [
  { title: "Business first", copy: "Technology starts with the business outcome, not the platform shortlist." },
  { title: "AI by design", copy: "AI is embedded where it can create measurable value, not sprinkled on top." },
  { title: "Integration over isolation", copy: "Systems should work together as one operating environment." },
  { title: "Built for scale", copy: "Technology should evolve as the organisation grows and changes." },
];

export type Capability = {
  index: string;
  name: string;
  positioning: string;
  items: string[];
  detail: string;
  note?: string;
};

export const capabilities: Capability[] = [
  {
    index: "01",
    name: "AI enablement",
    positioning: "Embed AI into the workflows, decisions and customer experiences that matter most.",
    items: [
      "Generative AI",
      "Agentic AI",
      "AI copilots",
      "Intelligent workflows",
      "Predictive analytics",
      "Document intelligence",
      "AI applications",
      "Responsible AI governance",
    ],
    detail:
      "We start with the work: which decisions are slow, which processes are document-heavy, which experiences are inconsistent. AI is then applied to those specific points and connected back into the systems of record so an insight becomes an action rather than a slide.",
  },
  {
    index: "02",
    name: "ERP & core systems",
    positioning: "Modernise the systems that sit at the centre of the enterprise.",
    items: [
      "SAP",
      "Oracle",
      "Odoo",
      "Zoho",
      "ERP strategy",
      "Implementation advisory",
      "PMO support",
      "Data migration",
      "Systems integration",
      "Post-implementation support",
    ],
    detail:
      "Core systems carry the process, the controls and the data that everything else depends on. Prism works on the strategy, the selection logic, the target design, the data migration and the integration surface — and stays involved after go-live, where most of the value is either realised or lost.",
    note: "Prism advises on and works alongside these platforms. We do not represent ourselves as an authorised implementation partner for any vendor unless independently verified.",
  },
  {
    index: "03",
    name: "Digital transformation",
    positioning: "Turn manual, fragmented processes into connected digital workflows.",
    items: [
      "Process digitalisation",
      "Workflow automation",
      "Custom application development",
      "OCR",
      "Intelligent document processing",
      "Business process transformation",
      "Digital operating models",
    ],
    detail:
      "Digitalisation only pays when the process itself is reconsidered. We map the current flow, remove the steps that exist only because of a system limitation, then rebuild the workflow with digital intake, automated validation and exception-based human involvement.",
  },
  {
    index: "04",
    name: "Data, analytics & intelligence",
    positioning: "Turn fragmented information into a reliable foundation for intelligence and decision-making.",
    items: [
      "Data engineering",
      "Data integration",
      "Data management",
      "Management reporting",
      "Executive dashboards",
      "Decision-support analytics",
      "Data quality",
      "Data foundations",
    ],
    detail:
      "A data foundation is not a dashboard project. It is the integration, definition and governance work that lets the organisation agree on one number — and lets AI reason over business context instead of generic text.",
  },
  {
    index: "05",
    name: "Risk, governance & cybersecurity",
    positioning: "Build intelligent organisations without compromising control, security or trust.",
    items: [
      "Enterprise risk",
      "Financial risk",
      "Operational risk",
      "IT risk",
      "Compliance",
      "Internal controls",
      "Cybersecurity",
      "Data privacy",
      "Third-party risk",
      "Business continuity",
      "AI governance",
    ],
    detail:
      "Control design is part of architecture, not a review at the end. We work through identity, access, data handling, model oversight, third-party exposure and continuity so that speed and assurance are not competing objectives.",
    note: "Prism does not make regulatory approval or certification claims on behalf of clients or itself.",
  },
  {
    index: "06",
    name: "Accounting & finance transformation",
    positioning: "Modernise finance operations and improve visibility, control and decision-making.",
    items: [
      "Accounting support",
      "Financial reporting",
      "Working-capital optimisation",
      "Cash-flow forecasting",
      "Taxation",
      "Reconciliation",
      "Transfer pricing",
      "Finance process automation",
      "FP&A",
    ],
    detail:
      "Finance holds the clearest view of enterprise performance and often the heaviest manual load. Automating reconciliation, close and reporting releases capacity, which is then redirected into forecasting, scenario work and commercial support.",
  },
  {
    index: "07",
    name: "Application engineering",
    positioning: "Build the applications and digital experiences required to turn strategy into execution.",
    items: [
      "Custom applications",
      "Enterprise applications",
      "AI-powered applications",
      "Workflow applications",
      "Integration layers",
      "API development",
      "User experiences",
      "Application modernisation",
    ],
    detail:
      "Some capability is genuinely differentiating and has to be built. Prism engineers the applications, integration layers and interfaces that sit between packaged platforms and the way the business actually needs to work.",
  },
];

export const cognitiveInputs = [
  { title: "Domain expertise", copy: "How the industry, function and process actually behave." },
  { title: "Data", copy: "Structured records, documents, knowledge and external signals." },
  { title: "AI", copy: "Generative, predictive and agentic capability applied to real work." },
  { title: "Automation", copy: "Orchestration, rules, workflow and escalation." },
  { title: "Application engineering", copy: "Interfaces and integration that put it into production." },
];

export const cognitiveLoop = ["Understand", "Reason", "Decide", "Act", "Learn"];

export type ArchLayer = {
  name: string;
  items: string[];
  prism: string;
};

export const architecture: ArchLayer[] = [
  {
    name: "Experience layer",
    items: ["Web", "Mobile", "Customer portals", "Employee interfaces", "AI copilots", "Conversational interfaces"],
    prism: "We design and build the interfaces where people meet the enterprise — including copilots and conversational surfaces that sit over core systems.",
  },
  {
    name: "Application layer",
    items: ["Enterprise applications", "Custom applications", "AI applications", "Workflow applications"],
    prism: "We modernise packaged applications, build custom and AI-native ones, and define which capability belongs where.",
  },
  {
    name: "Intelligence layer",
    items: ["Generative AI", "Predictive AI", "Agentic AI", "Decision intelligence", "Document intelligence"],
    prism: "We select and engineer the intelligence pattern per use case, with retrieval, evaluation and human oversight built in.",
  },
  {
    name: "Automation & orchestration",
    items: ["Workflows", "Agents", "Rules", "APIs", "Human escalation"],
    prism: "We orchestrate work across systems and agents, with explicit rules, retries and escalation paths for exceptions.",
  },
  {
    name: "Data layer",
    items: ["Structured data", "Unstructured data", "Documents", "Knowledge", "Analytics"],
    prism: "We build integration, modelling, quality and semantics so intelligence has trustworthy business context.",
  },
  {
    name: "Core systems",
    items: ["ERP", "CRM", "Finance", "HR", "Operations", "Supply chain"],
    prism: "We advise on, implement and integrate the systems of record so they remain the source of truth and the system of action.",
  },
  {
    name: "Infrastructure & security",
    items: ["Cloud", "Identity", "Cybersecurity", "Governance", "Monitoring"],
    prism: "We work through cloud foundations, identity, controls, observability and governance that hold the estate together.",
  },
];

export const erpAiChain = [
  "ERP data",
  "AI analysis",
  "Anomaly detection",
  "Recommendation",
  "Workflow",
  "Action",
];

export const erpAiExamples = [
  { title: "Finance variance analysis", copy: "Explain movement against budget and prior period, not just report it." },
  { title: "Cash-flow forecasting", copy: "Model collections, payables and seasonality from transaction history." },
  { title: "Procurement intelligence", copy: "Surface price variance, supplier concentration and off-contract spend." },
  { title: "Inventory optimisation", copy: "Balance service levels against working capital on real demand signals." },
  { title: "Workforce insights", copy: "Understand capacity, overtime and productivity patterns by function." },
  { title: "Automated reporting", copy: "Assemble recurring management reporting with commentary drafted for review." },
  { title: "Document processing", copy: "Read invoices, orders and contracts and post them into the system of record." },
  { title: "Exception management", copy: "Route only what genuinely needs a human, with the context attached." },
];

export const processBefore = [
  "Email",
  "Spreadsheet",
  "Manual entry",
  "Approval",
  "Reconciliation",
  "Report",
  "Follow-up",
];

export const processAfter = [
  "Digital intake",
  "AI extraction",
  "Validation",
  "Intelligent workflow",
  "Human exception",
  "System update",
  "Real-time visibility",
];

export const dataJourney = [
  { title: "Data sources", items: ["ERP", "CRM", "Finance", "Operations", "Documents", "Customer", "External"] },
  { title: "Data foundation", items: ["Integrate", "Clean", "Govern", "Structure"] },
  { title: "Intelligence", items: ["Analyse", "Predict", "Explain", "Recommend"] },
  { title: "Action", items: ["Decide", "Automate", "Optimise", "Measure"] },
];

export const dataCapabilities = [
  "Data engineering",
  "Data integration",
  "Data management",
  "Reporting",
  "Executive dashboards",
  "Decision analytics",
  "Predictive analytics",
  "AI-ready data foundations",
];

export const appPipeline = [
  "Idea",
  "Use case",
  "Prototype",
  "Application",
  "Integration",
  "Deployment",
  "Monitoring",
  "Scale",
];

export const appCapabilities = [
  "Custom AI applications",
  "AI copilots",
  "Agentic applications",
  "Workflow applications",
  "Internal business tools",
  "Customer-facing applications",
  "API integrations",
  "Enterprise system integration",
];

export const sourcingOptions = [
  {
    name: "Buy",
    when: "When a mature platform already solves the problem.",
    detail: "Configuration beats construction where the process is standard and the market is proven. The work becomes selection discipline, data migration and adoption.",
  },
  {
    name: "Build",
    when: "When the capability is strategic or highly differentiated.",
    detail: "Where the process is your advantage, packaged software forces compromise. We build narrow, well-integrated applications rather than large monoliths.",
  },
  {
    name: "Integrate",
    when: "When value exists across existing systems.",
    detail: "Often the fastest return is connecting what you already own — one identity, one data flow, one workflow across three platforms.",
  },
  {
    name: "Augment",
    when: "When AI can dramatically improve an existing workflow.",
    detail: "Keep the system of record and add intelligence around it: extraction, drafting, triage, prediction and recommendation inside the current process.",
  },
  {
    name: "Replace",
    when: "When legacy technology is actively constraining the business.",
    detail: "Replacement is the most expensive answer and sometimes the only one. We test it against value, risk, data complexity and change capacity before recommending it.",
  },
];

export const erpJourney = [
  "Discover",
  "Assess",
  "Design",
  "Select",
  "Implement",
  "Migrate",
  "Integrate",
  "Adopt",
  "Optimise",
];

export const erpWorkstreams = [
  "Strategy",
  "Architecture",
  "Data",
  "People",
  "Process",
  "Technology",
  "Governance",
];

export const implementationSteps = [
  { n: "01", title: "Discover", copy: "Business and technology assessment." },
  { n: "02", title: "Design", copy: "Target architecture and future-state operating model." },
  { n: "03", title: "Build", copy: "Configure, develop and integrate." },
  { n: "04", title: "Migrate", copy: "Move and validate data." },
  { n: "05", title: "Test", copy: "Functional, integration and user testing." },
  { n: "06", title: "Deploy", copy: "Production launch and change management." },
  { n: "07", title: "Stabilise", copy: "Post-implementation support." },
  { n: "08", title: "Optimise", copy: "Continuous improvement." },
];

export const adoptionAreas = [
  "Change management",
  "Workforce readiness",
  "Training",
  "Adoption",
  "Process redesign",
  "Operating-model change",
  "AI literacy",
  "Leadership alignment",
  "Performance measurement",
];

export const riskPillars = [
  { title: "Cybersecurity", copy: "Protect systems, identities and information." },
  { title: "Data privacy", copy: "Protect sensitive information and establish appropriate controls." },
  { title: "AI governance", copy: "Establish responsible AI policies, controls and oversight." },
  { title: "Enterprise risk", copy: "Identify and manage operational, financial, technology and third-party risks." },
];

export const riskAdditions = [
  "Compliance",
  "Internal controls",
  "Business continuity",
  "Third-party risk",
  "Auditability",
];

export const financeChain = ["Transaction", "Data", "Reconciliation", "Analysis", "Forecast", "Decision"];

export const financeCapabilities = [
  "Accounting",
  "Financial reporting",
  "FP&A",
  "Cash-flow forecasting",
  "Working capital",
  "Reconciliation",
  "Taxation",
  "Transfer pricing",
  "Finance automation",
];

export const accelerators = [
  {
    name: "AI-based invoice processing",
    items: ["Extraction", "Validation", "Matching", "Exception identification", "Approval workflows"],
  },
  {
    name: "Export workflow management",
    items: ["Documentation", "Approvals", "Shipment milestones", "Workflow management", "Visibility"],
  },
  {
    name: "ComplianceIQ",
    items: ["Obligations", "Evidence", "Alerts", "Monitoring", "Management reporting"],
  },
  {
    name: "AI-based reimbursement review",
    items: ["Claim review", "Policy validation", "Duplicate detection", "Exceptions", "Approval support"],
  },
];

export const transformationEngine = [
  { n: "01", title: "Discover", copy: "Understand the business." },
  { n: "02", title: "Design", copy: "Define the future state." },
  { n: "03", title: "Engineer", copy: "Build the technology." },
  { n: "04", title: "Integrate", copy: "Connect the ecosystem." },
  { n: "05", title: "Enable", copy: "Prepare people and processes." },
  { n: "06", title: "Govern", copy: "Control risk and intelligence." },
  { n: "07", title: "Optimise", copy: "Measure and improve." },
  { n: "08", title: "Scale", copy: "Expand the impact." },
];

export const valueOutcomes = [
  { title: "Grow", items: ["New revenue", "Better customer experience", "New capabilities"] },
  { title: "Optimise", items: ["Lower cost", "Higher productivity", "Less manual work"] },
  { title: "Control", items: ["Lower risk", "Better governance", "Greater visibility"] },
  { title: "Scale", items: ["Reusable technology", "Connected systems", "Faster innovation"] },
];

export const maturityLevels = [
  { n: "01", title: "Fragmented", copy: "Disconnected systems. Manual workflows.", detail: "Information is reconciled by people. Reporting is retrospective and contested." },
  { n: "02", title: "Digitised", copy: "Core processes digitised.", detail: "Work happens in systems rather than inboxes, but the systems do not yet talk." },
  { n: "03", title: "Connected", copy: "Systems and data integrated.", detail: "One agreed data foundation. Workflows cross system boundaries without re-entry." },
  { n: "04", title: "Intelligent", copy: "AI embedded into workflows and decisions.", detail: "Extraction, prediction and recommendation operate inside production processes." },
  { n: "05", title: "Adaptive", copy: "Technology continuously learns, optimises and evolves.", detail: "Feedback from outcomes improves models, workflows and the operating model itself." },
];

export const enterpriseMap = [
  { title: "Customer", items: ["Experience", "Engagement", "Service"] },
  { title: "Operations", items: ["Workflow", "Productivity", "Automation"] },
  { title: "Finance", items: ["Reporting", "Forecasting", "Control"] },
  { title: "People", items: ["Workforce", "Knowledge", "Productivity"] },
  { title: "Technology", items: ["ERP", "Applications", "Integration"] },
  { title: "Data", items: ["Analytics", "Intelligence", "Governance"] },
  { title: "Risk", items: ["Cybersecurity", "Compliance", "Controls"] },
  { title: "Leadership", items: ["Decision intelligence", "Scenarios", "Performance"] },
];

export const beforeState = [
  "Disconnected systems",
  "Manual workflows",
  "Data silos",
  "Reactive reporting",
  "Legacy applications",
  "Limited AI",
  "High operational friction",
];

export const afterState = [
  "Connected ecosystem",
  "Intelligent workflows",
  "Unified data",
  "Real-time intelligence",
  "Modern applications",
  "Embedded AI",
  "Continuous optimisation",
];

export const whyPrism = [
  { title: "Business outcome first", copy: "Start with the problem, not the technology." },
  { title: "AI + enterprise technology", copy: "Bring AI into the systems that actually run the business." },
  { title: "Strategy + engineering", copy: "Bridge strategic thinking and practical implementation." },
  { title: "Integration + intelligence", copy: "Connect systems, data, workflows and decisions." },
  { title: "Value realisation", copy: "Measure whether transformation is actually creating value." },
];

export const faqs = [
  {
    q: "Is this an IT services engagement?",
    a: "No. Prism works on the business outcome first — the operating model, the process, the decision — and then on the systems, data, applications and AI required to support it. Implementation capability is part of the offer, not the whole of it.",
  },
  {
    q: "Do we need to replace our ERP to embed AI?",
    a: "Usually not. In most cases the faster path is to integrate and augment: keep the system of record, build the data foundation around it, and apply AI to the workflows and decisions that surround it.",
  },
  {
    q: "Where do most technology transformations lose value?",
    a: "After go-live. Value is lost in data quality, integration gaps, unclear process ownership and low adoption — which is why change, governance and post-implementation optimisation are part of the Prism approach.",
  },
  {
    q: "How does Prism decide between build, buy, integrate, augment or replace?",
    a: "Against business value, complexity, risk and scalability. We are technology agnostic, so the recommendation is the option that creates value fastest and remains defensible over time.",
  },
  {
    q: "How does this pillar relate to Prism AI Transformation and SpectraIQ.ai?",
    a: "AI Transformation answers where AI creates value and how the business changes around it. SpectraIQ.ai is Prism's proprietary intelligence platform. This pillar builds, modernises, integrates and governs the technology foundation that makes both real.",
  },
  {
    q: "Can Prism work alongside our existing vendors and internal teams?",
    a: "Yes. Prism frequently operates in an advisory, architecture, PMO or engineering capacity alongside incumbent platform partners and internal technology teams.",
  },
];
