export type ModuleStatus = "live" | "roadmap";

export type SiqModule = {
  id: string;
  name: string;
  group: string;
  status: ModuleStatus;
  statement: string;
  positioning: string;
  solves: string[];
  capabilities: string[];
  flow: string[];
  matters: string;
  colour: number;
};

export const siqGroups = [
  { id: "sales", label: "Sales", colour: 1, copy: "Response, qualification, prioritisation and follow-up across every enquiry." },
  { id: "service", label: "Service", colour: 4, copy: "Retention, bookings and proactive maintenance engagement." },
  { id: "parts", label: "Parts", colour: 3, copy: "Enquiry handling and parts operations intelligence." },
  { id: "cx", label: "Customer experience", colour: 5, copy: "Always-on engagement and structured complaint resolution." },
  { id: "marketing", label: "Marketing", colour: 7, copy: "Segmentation, campaign intelligence and re-engagement." },
] as const;

export const siqModules: SiqModule[] = [
  {
    id: "leads",
    name: "AI Leads Management",
    group: "sales",
    status: "live",
    colour: 1,
    statement: "Never miss a lead.",
    positioning:
      "AI responds, qualifies, prioritises and follows up with every enquiry so high-value opportunities don't disappear into the pipeline.",
    solves: [
      "Enquiries that sit unanswered outside showroom hours",
      "Uneven qualification depending on who picks up the lead",
      "High-intent buyers treated identically to browsers",
      "Follow-up that stops after the first attempt",
    ],
    capabilities: [
      "Rapid enquiry response",
      "Lead qualification",
      "Intent detection",
      "Budget signals",
      "Vehicle preference",
      "Trade-in intent",
      "Appointment opportunity",
      "Automated follow-up",
      "Lead prioritisation",
      "CRM intelligence",
    ],
    flow: [
      "Lead arrives",
      "AI understands",
      "Lead scored",
      "Next best action",
      "Human or AI engagement",
      "Appointment",
      "Sale",
    ],
    matters:
      "Speed and consistency of first response are among the few levers a dealership controls on every single enquiry.",
  },
  {
    id: "sales-accelerator",
    name: "AI Sales Accelerator",
    group: "sales",
    status: "live",
    colour: 2,
    statement: "Accelerate the entire sales funnel.",
    positioning:
      "Faster response, sharper qualification, intelligent prioritisation, AI-guided workflows and automated follow-up across the full funnel.",
    solves: [
      "Pipeline visibility that arrives too late to act on",
      "Consultants unsure who to call next",
      "Appointments that never convert into test drives",
      "Follow-up cadence that depends on memory",
    ],
    capabilities: [
      "Intent and budget scoring",
      "Next-best-action guidance",
      "Automated multi-touch follow-up",
      "AI-guided sales workflows",
      "Test-drive conversion support",
      "Real-time pipeline visibility",
    ],
    flow: [
      "Enquiry",
      "Qualification",
      "Engagement",
      "Appointment",
      "Test drive",
      "Negotiation",
      "Close",
      "Retention",
    ],
    matters:
      "Small conversion gains compound at every stage of the funnel, which is where most dealership profit is created or lost.",
  },
  {
    id: "dead-leads",
    name: "AI Dead Leads Revival",
    group: "sales",
    status: "live",
    colour: 3,
    statement: "Your dead pipeline isn't dead.",
    positioning:
      "Years of historical enquiries can contain unrealised commercial value. SpectraIQ identifies, segments and intelligently re-engages dormant opportunities.",
    solves: [
      "Historical CRM records that are never worked again",
      "No way to tell which dormant leads are worth a call",
      "Manual re-engagement that is too slow to be viable",
      "Marketing spend chasing new leads instead of owned data",
    ],
    capabilities: [
      "Dormant data analysis",
      "Segmentation",
      "Opportunity scoring",
      "Personalised re-engagement",
      "Response handling",
      "Hand-off to consultants",
    ],
    flow: [
      "Dormant CRM",
      "AI analysis",
      "Opportunity score",
      "Personalised re-engagement",
      "Response",
      "Sales opportunity",
    ],
    matters:
      "This is opportunity created from data the dealership already owns, rather than from additional acquisition spend.",
  },
  {
    id: "service-advisor",
    name: "AI Service Advisor",
    group: "service",
    status: "roadmap",
    colour: 4,
    statement: "The dealership doesn't end at the sale.",
    positioning:
      "Conversational support for service customers — answering questions, providing service information, supporting bookings and handling follow-up.",
    solves: [
      "Service phone lines that overflow at peak times",
      "Booking friction for routine work",
      "Inconsistent follow-up after a service visit",
    ],
    capabilities: ["Customer questions", "Service information", "Booking support", "Follow-up"],
    flow: [
      "Vehicle ownership",
      "Service reminder",
      "Booking",
      "Customer communication",
      "Service interaction",
      "Retention",
      "Next vehicle opportunity",
    ],
    matters: "Service retention is the strongest predictor of the next vehicle sale.",
  },
  {
    id: "predictive-maintenance",
    name: "AI Predictive Maintenance",
    group: "service",
    status: "roadmap",
    colour: 5,
    statement: "Engage before the customer has to ask.",
    positioning:
      "Identify patterns across service history to surface maintenance opportunities and create proactive customer engagement.",
    solves: [
      "Maintenance opportunities discovered only when a customer calls",
      "Retention decay after the warranty period",
      "No prioritisation of which owners to contact",
    ],
    capabilities: [
      "Identify patterns",
      "Predict maintenance opportunities",
      "Improve retention",
      "Proactive customer engagement",
    ],
    flow: ["Service history", "Pattern detection", "Predicted need", "Proactive outreach", "Booking", "Retention"],
    matters: "Proactive contact converts service capacity into planned, profitable workshop hours.",
  },
  {
    id: "parts-desk",
    name: "AI Parts Desk",
    group: "parts",
    status: "roadmap",
    colour: 3,
    statement: "Turn parts data into operational intelligence.",
    positioning:
      "Support parts enquiry handling end to end — identification, availability, pricing, ordering and customer communication.",
    solves: [
      "Parts enquiries queued behind counter traffic",
      "Repeat questions consuming skilled parts staff",
      "Slow responses to trade and retail customers",
    ],
    capabilities: [
      "Part identification",
      "Availability checks",
      "Pricing information",
      "Order support",
      "Customer communication",
    ],
    flow: ["Enquiry", "Part identification", "Availability", "Pricing", "Order", "Customer communication"],
    matters: "Parts is a high-volume, high-repetition environment — exactly where AI leverage is highest.",
  },
  {
    id: "concierge",
    name: "AI Digital Concierge",
    group: "cx",
    status: "roadmap",
    colour: 6,
    statement: "Every customer interaction becomes intelligence.",
    positioning:
      "An always-on front door that understands the customer, responds accurately and routes or acts on the request.",
    solves: [
      "After-hours enquiries with no response path",
      "Customers repeating themselves across channels",
      "Requests routed to the wrong department",
    ],
    capabilities: ["Customer understanding", "Accurate response", "Routing", "Action hand-off"],
    flow: ["Customer asks", "AI understands", "AI responds", "AI routes or acts"],
    matters: "Every interaction becomes structured data the rest of the platform can use.",
  },
  {
    id: "complaints",
    name: "AI Complaints Care",
    group: "cx",
    status: "roadmap",
    colour: 7,
    statement: "Resolve issues before they become reputation.",
    positioning:
      "Structured handling of complaints with sentiment and intent detection, prioritisation, resolution workflow and human escalation.",
    solves: [
      "Complaints tracked in inboxes rather than workflows",
      "No visibility of unresolved customer issues",
      "Escalation that depends on who noticed",
    ],
    capabilities: [
      "Sentiment and intent detection",
      "Priority assignment",
      "Resolution workflow",
      "Human escalation",
      "Outcome tracking",
    ],
    flow: [
      "Complaint received",
      "Sentiment + intent",
      "Priority",
      "Resolution workflow",
      "Human escalation",
      "Outcome tracking",
    ],
    matters: "Complaint handling is a measurable driver of retention, OEM scores and referral.",
  },
  {
    id: "marketing-studio",
    name: "AI Marketing Studio",
    group: "marketing",
    status: "roadmap",
    colour: 7,
    statement: "Turn customer data into better marketing.",
    positioning:
      "The marketing intelligence layer — segmentation, campaign intelligence, personalisation and re-engagement built on dealership data.",
    solves: [
      "Campaigns built on broad lists rather than intent",
      "Owned customer data left unused",
      "Nurture that stops when the campaign ends",
    ],
    capabilities: [
      "Customer segmentation",
      "Campaign intelligence",
      "Personalisation",
      "Re-engagement",
      "Lead nurturing",
      "Marketing workflow automation",
    ],
    flow: ["Customer data", "Segmentation", "Campaign intelligence", "Personalised engagement", "Response", "Measured outcome"],
    matters: "Marketing becomes an intelligence function rather than a production function.",
  },
];

export const dataSources = [
  "CRM",
  "DMS",
  "Lead channels",
  "Website",
  "Phone",
  "Sales activity",
  "Service",
  "Parts",
  "Marketing",
  "Customer interactions",
  "Workforce",
  "Finance",
  "OEM systems",
];

export const actionOutputs = ["Prioritise", "Engage", "Follow up", "Convert", "Retain", "Optimise"];

export const prismChain = [
  "Identify opportunity",
  "Connect intelligence",
  "Automate action",
  "Measure value",
  "Scale impact",
];

export const decisionLoop = [
  { step: "See", q: "What is happening?" },
  { step: "Understand", q: "Why is it happening?" },
  { step: "Predict", q: "What is likely to happen?" },
  { step: "Recommend", q: "What should we do?" },
  { step: "Act", q: "Execute the next action." },
  { step: "Learn", q: "Measure the result." },
];

export const personas = [
  {
    id: "dp",
    role: "Dealer Principal",
    question: "What is driving profitability?",
    lens: "Group profitability, department contribution and the levers moving margin this month.",
    tiles: [
      { label: "Profit drivers", value: "Front + back gross by department" },
      { label: "Biggest leak", value: "Unworked enquiries in the last 7 days" },
      { label: "Trend", value: "Conversion vs prior period" },
    ],
  },
  {
    id: "gm",
    role: "General Manager",
    question: "Where is the biggest opportunity?",
    lens: "Ranked opportunity across sales, service, parts and dormant data.",
    tiles: [
      { label: "Ranked opportunity", value: "Dormant pipeline, then appointment conversion" },
      { label: "Constraint", value: "Follow-up capacity in BDC" },
      { label: "Action", value: "Reallocate to highest-intent segments" },
    ],
  },
  {
    id: "sm",
    role: "Sales Manager",
    question: "Which leads need attention now?",
    lens: "Live queue of scored enquiries and stalled deals.",
    tiles: [
      { label: "Now", value: "High-intent leads awaiting contact" },
      { label: "At risk", value: "Appointments without confirmation" },
      { label: "Coach", value: "Consultants below response benchmark" },
    ],
  },
  {
    id: "sc",
    role: "Sales Consultant",
    question: "Who should I call next?",
    lens: "A prioritised call list with context and suggested next action.",
    tiles: [
      { label: "Next best call", value: "Scored list with vehicle and intent context" },
      { label: "Why", value: "Signals behind the score" },
      { label: "Suggested action", value: "Message, call or appointment offer" },
    ],
  },
  {
    id: "bdc",
    role: "BDC Manager",
    question: "Where are we losing opportunities?",
    lens: "Response, contact and conversion performance by channel and shift.",
    tiles: [
      { label: "Leakage", value: "Response times by channel and hour" },
      { label: "Coverage", value: "After-hours enquiry handling" },
      { label: "Outcome", value: "Contact-to-appointment rate" },
    ],
  },
  {
    id: "svc",
    role: "Service Manager",
    question: "Where is service performance leaking?",
    lens: "Bookings, retention and proactive engagement opportunities.",
    tiles: [
      { label: "Retention", value: "Owners overdue for service" },
      { label: "Capacity", value: "Unfilled workshop hours" },
      { label: "Engagement", value: "Reminders and follow-up completion" },
    ],
  },
  {
    id: "mkt",
    role: "Marketing",
    question: "Which customers should we engage?",
    lens: "Segments built from live dealership behaviour rather than static lists.",
    tiles: [
      { label: "Segments", value: "Intent, vehicle and lifecycle based" },
      { label: "Re-engagement", value: "Dormant enquiries worth a campaign" },
      { label: "Attribution", value: "Campaign to enquiry to outcome" },
    ],
  },
  {
    id: "group",
    role: "Multi-Rooftop Group",
    question: "Which rooftop is outperforming and why?",
    lens: "Comparable performance across rooftops, drillable to department and person.",
    tiles: [
      { label: "Ranking", value: "Rooftop performance on shared measures" },
      { label: "Explanation", value: "Which behaviours differ" },
      { label: "Transfer", value: "Playbooks to replicate" },
    ],
  },
];

export const stackLayers = [
  { name: "Experience", items: ["Dashboards", "AI interfaces", "Customer interaction"], colour: 7 },
  { name: "AI applications", items: ["Leads", "Sales", "Service", "Parts", "Marketing", "CX"], colour: 6 },
  { name: "Intelligence", items: ["LLMs", "Predictive models", "Rules", "Scoring", "Recommendations"], colour: 5 },
  { name: "Orchestration", items: ["Workflows", "APIs", "Automation", "Human escalation"], colour: 4 },
  { name: "Data", items: ["CRM", "DMS", "Customer", "Operational data"], colour: 3 },
];

export const trustPillars = [
  { title: "Data residency", copy: "Hosted in AWS Sydney, keeping dealership data in Australia." },
  { title: "Privacy", copy: "Privacy Act 1988 controls applied at the data plane." },
  { title: "Compliance", copy: "ACMA obligations considered in customer communication workflows." },
  { title: "Security", copy: "Enterprise security architecture; SOC 2 programme in progress." },
  { title: "Governance", copy: "Controlled AI workflows with defined scope and escalation." },
  { title: "Auditability", copy: "Traceable interactions and decisions where applicable." },
];

export const method = [
  { n: "01", name: "Discover", copy: "Understand the dealership environment, systems and commercial priorities." },
  { n: "02", name: "Connect", copy: "Map systems and data, assessed case by case for each dealership." },
  { n: "03", name: "Configure", copy: "Deploy the relevant AI modules for the opportunity identified." },
  { n: "04", name: "Activate", copy: "Train teams and launch workflows with human oversight in place." },
  { n: "05", name: "Measure", copy: "Track commercial impact against the baseline agreed up front." },
  { n: "06", name: "Optimise", copy: "Continuously improve scoring, workflows and coverage." },
];

export const maturity = [
  { level: "01", name: "AI experimentation", copy: "Individual tools used by individual people." },
  { level: "02", name: "AI assistance", copy: "Teams use copilots alongside existing processes." },
  { level: "03", name: "AI workflows", copy: "AI is embedded inside dealership processes." },
  { level: "04", name: "AI intelligence", copy: "AI connects data and decisions across departments." },
  { level: "05", name: "AI-native dealership", copy: "AI becomes part of the operating model." },
];

export const whySpectraIQ = [
  { title: "Built for dealerships", copy: "Not generic enterprise software adapted to automotive." },
  { title: "One intelligence layer", copy: "Multiple AI capabilities working together, not isolated tools." },
  { title: "Commercial first", copy: "Start with measurable business opportunity, not technology." },
  { title: "Australian context", copy: "Built around Australian dealership requirements and obligations." },
  { title: "Modular", copy: "Deploy the modules that matter to the opportunity identified." },
  { title: "Scalable", copy: "Extend across departments and rooftops on one fabric." },
];

export const beforeAfter = {
  before: [
    "Leads waiting",
    "Spreadsheets",
    "Manual follow-up",
    "Disconnected systems",
    "Reactive reporting",
    "Human bottlenecks",
    "Lost opportunities",
  ],
  after: [
    "Rapid response",
    "AI qualification",
    "Automated follow-up",
    "Connected intelligence",
    "Proactive alerts",
    "AI-assisted workflows",
    "Visible opportunity",
  ],
};

export const genericVsSpectra = {
  generic: ["Answers questions", "Generates content", "Assists users"],
  spectra: [
    "Understands dealership context",
    "Connects business data",
    "Identifies opportunities",
    "Recommends action",
    "Automates workflows",
    "Measures commercial impact",
  ],
};

export const siqFaqs = [
  {
    q: "How fast can a dealership go live?",
    a: "Timelines depend on the dealership environment. Many customers are operational within days, with implementation planned collaboratively based on existing systems and workflows.",
  },
  {
    q: "What about the Privacy Act?",
    a: "Data is hosted in AWS Sydney with Privacy Act 1988 controls applied at the data plane.",
  },
  {
    q: "Does SpectraIQ replace the BDC?",
    a: "No. It is designed to support overflow, after-hours and cold-lead work so the best agents stay on the highest-intent customers.",
  },
  {
    q: "Which dealer systems are supported?",
    a: "Every dealership environment is different. Integration and deployment are assessed case by case to determine the most appropriate approach for each customer.",
  },
  {
    q: "Which modules are live today?",
    a: "AI Leads Management, AI Sales Accelerator and AI Dead Leads Revival are live. The service, parts, customer experience and marketing modules are on the roadmap.",
  },
];

export const SIQ_URL = "https://spectraiq.ai/";
