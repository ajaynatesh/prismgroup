export type PrismColour = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const colourVar = (n: PrismColour) => `var(--prism-colour-${n})`;

export type Pillar = {
  index: string;
  colour: PrismColour;
  name: string;
  short: string;
  kind: "Capability" | "Owned venture" | "Independent company";
  headline: string;
  copy: string;
  href: string;
  external?: string;
  cta: string;
  journey?: string[];
  groups: { title: string; items: string[] }[];
};

export const pillars: Pillar[] = [
  {
    index: "01",
    colour: 1,
    name: "AI Transformation & Automation",
    short: "AI transformation",
    kind: "Capability",
    headline: "Turn operational inefficiency into intelligent growth.",
    copy: "Prism helps organisations identify, redesign and automate high-value workflows using AI. The approach starts with ROI modelling and focuses on solutions designed to become self-funding and generate measurable, scalable returns.",
    href: "/capabilities/ai-transformation",
    cta: "Explore AI Transformation",
    journey: ["Discover", "Model", "Build", "Automate", "Measure", "Scale"],
    groups: [
      {
        title: "Automation",
        items: [
          "AI workflow automation",
          "Intelligent document processing",
          "AI-enabled operations",
          "Workflow optimisation",
        ],
      },
      {
        title: "Transformation",
        items: ["Process transformation", "Process intelligence", "ROI modelling", "Custom AI solutions"],
      },
    ],
  },
  {
    index: "02",
    colour: 2,
    name: "SpectraIQ.ai",
    short: "SpectraIQ.ai",
    kind: "Independent company",
    headline: "Intelligence that moves business forward.",
    copy: "SpectraIQ.ai is an AI-powered commercial intelligence platform designed to help organisations turn operational data into actionable intelligence, identify opportunities and accelerate business performance.",
    href: "/ventures/spectraiq",
    external: "https://spectraiq.ai/",
    cta: "Visit SpectraIQ.ai",
    groups: [
      {
        title: "Commercial intelligence",
        items: [
          "AI-powered commercial intelligence",
          "Opportunity identification",
          "Commercial opportunity assessment",
          "Business performance intelligence",
        ],
      },
      {
        title: "Revenue acceleration",
        items: ["AI sales acceleration", "AI lead management", "Dead lead revival", "ROI modelling & intelligent workflows"],
      },
    ],
  },
  {
    index: "03",
    colour: 3,
    name: "Enterprise AI & Technology Transformation",
    short: "Enterprise technology",
    kind: "Capability",
    headline: "From systems to intelligence.",
    copy: "Prism helps organisations modernise technology, implement enterprise systems and embed AI into core business operations — through cognitive engineering rather than isolated tooling.",
    href: "/capabilities/enterprise-technology",
    cta: "Explore Enterprise Transformation",
    groups: [
      {
        title: "AI enablement",
        items: [
          "Generative AI",
          "Agentic AI",
          "Intelligent workflows",
          "Predictive analytics",
          "Document intelligence",
          "AI governance",
        ],
      },
      {
        title: "ERP & core systems",
        items: [
          "SAP",
          "Oracle",
          "Odoo",
          "Zoho",
          "Implementation advisory",
          "PMO support",
          "Data migration",
          "Systems integration",
          "Post-implementation support",
        ],
      },
      {
        title: "Digital & data",
        items: [
          "Digital transformation",
          "Process digitalisation",
          "Application development",
          "Data engineering",
          "System integration",
          "Analytics",
          "Executive dashboards",
          "Intelligent document processing",
        ],
      },
      {
        title: "Risk & governance",
        items: [
          "Enterprise risk",
          "IT risk",
          "Cybersecurity",
          "Compliance",
          "Data privacy",
          "Internal controls",
          "Third-party risk",
          "Business continuity",
        ],
      },
      {
        title: "Finance & tax",
        items: [
          "Accounting",
          "Financial reporting",
          "FP&A",
          "Working-capital optimisation",
          "Cash-flow forecasting",
          "Taxation",
          "Reconciliation",
          "Transfer pricing",
        ],
      },
    ],
  },
  {
    index: "04",
    colour: 4,
    name: "Prism DecisionIQ",
    short: "DecisionIQ",
    kind: "Owned venture",
    headline: "See what matters. Understand why. Decide what's next.",
    copy: "Prism DecisionIQ transforms fragmented business data into a living intelligence layer for leadership — helping executives understand business performance, identify risks and opportunities, simulate scenarios and act with confidence.",
    href: "/ventures/decisioniq",
    cta: "Discover DecisionIQ",
    journey: ["Data", "Computation", "Intelligence", "AI Persona", "Presentation", "Simulation"],
    groups: [
      {
        title: "Core capabilities",
        items: [
          "Business Health Intelligence",
          "AI Leadership Copilot",
          "Scenario & Simulation",
          "Root Cause Intelligence",
        ],
      },
      {
        title: "Intelligence & governance",
        items: [
          "Predictive Risk & Opportunity Alerts",
          "Action Intelligence",
          "Board & Investor Intelligence",
          "Governed Intelligence Layer",
        ],
      },
    ],
  },
  {
    index: "05",
    colour: 5,
    name: "Prism TradeLink",
    short: "TradeLink",
    kind: "Owned venture",
    headline: "Your business. Powered by WhatsApp.",
    copy: "Prism TradeLink brings intelligent business operations to the platform small and mobile-first businesses already use every day — WhatsApp.",
    href: "/ventures/tradelink",
    cta: "Discover TradeLink",
    journey: [
      "WhatsApp message",
      "AI understands",
      "Lead created",
      "Booking",
      "Quote",
      "Payment",
      "CRM",
      "Repeat engagement",
    ],
    groups: [
      {
        title: "Customer engagement",
        items: [
          "Enquiry capture",
          "Lead qualification",
          "Automated responses",
          "Customer information",
          "CRM creation",
        ],
      },
      {
        title: "Bookings",
        items: [
          "Appointment booking",
          "Availability",
          "Confirmations",
          "Reminders",
          "Rescheduling",
          "Cancellation",
        ],
      },
      {
        title: "Quotes & payments",
        items: [
          "Quote generation",
          "Quote acceptance",
          "Secure payment links",
          "Payment confirmation",
          "Invoice communication",
          "Payment reminders",
        ],
      },
      {
        title: "CRM",
        items: [
          "Customer records",
          "Conversation history",
          "Job history",
          "Follow-ups",
          "Customer segmentation",
          "Repeat-business opportunities",
        ],
      },
      {
        title: "Automation",
        items: [
          "AI-driven workflows",
          "Customer routing",
          "Human escalation",
          "CRM integration",
          "Booking integration",
          "Payment integration",
          "Accounting integration",
        ],
      },
    ],
  },
  {
    index: "06",
    colour: 6,
    name: "Prism AlwaysOn AI",
    short: "AlwaysOn AI",
    kind: "Owned venture",
    headline: "Your business never sleeps. Neither does your AI workforce.",
    copy: "Prism AlwaysOn AI provides 24/7 AI-powered voice and SMS agents that answer, engage, qualify, book, support, follow up and take action — even when your team is offline.",
    href: "/ventures/alwayson",
    cta: "Explore AlwaysOn AI",
    journey: [
      "Customer calls",
      "AI answers",
      "Understands",
      "Reasons",
      "Acts",
      "Updates systems",
      "Follows up",
    ],
    groups: [
      {
        title: "AI voice",
        items: [
          "Natural conversations",
          "Intent recognition",
          "Context awareness",
          "Interruptions / barge-in",
          "Multilingual conversations",
          "Customer identification",
          "Real-time actions",
        ],
      },
      {
        title: "AI SMS",
        items: [
          "Lead response",
          "Appointment reminders",
          "Follow-up",
          "Payment reminders",
          "Customer engagement",
          "Re-engagement",
        ],
      },
      {
        title: "AI actions",
        items: [
          "CRM updates",
          "Booking",
          "Rescheduling",
          "Ticket creation",
          "Quote workflows",
          "Payment links",
          "Notifications",
          "Human escalation",
        ],
      },
      {
        title: "Intelligence",
        items: [
          "Customer memory",
          "Conversation context",
          "Business knowledge",
          "Workflow reasoning",
          "Personalised engagement",
        ],
      },
      {
        title: "Governance",
        items: [
          "Role-based controls",
          "Audit trails",
          "Data protection",
          "Consent management",
          "Human escalation",
          "AI guardrails",
        ],
      },
    ],
  },
  {
    index: "07",
    colour: 7,
    name: "Prism Diagnostics",
    short: "Prism Diagnostics",
    kind: "Owned venture",
    headline: "Advancing diagnostics. Improving clinical decisions.",
    copy: "Prism Diagnostics brings advanced diagnostic technology, AI-enabled reporting and clinical solutions to healthcare professionals, helping expand diagnostic capability and support better clinical decision-making.",
    href: "/ventures/prism-diagnostics",
    external: "https://prismdiagnostics.com.au/",
    cta: "Visit Prism Diagnostics",
    groups: [
      {
        title: "Vestibular & balance diagnostics",
        items: ["VNG", "SVV", "vHIT", "CCG", "Computerised Posturography", "DVA", "Calorics", "VEMPs"],
      },
      {
        title: "Clinical enablement",
        items: ["AI-enabled reporting", "Clinical implementation", "Training", "Support"],
      },
    ],
  },
];

export const ventures = pillars.filter((p) => p.kind !== "Capability");

/** Accurate, neutral description of how a portfolio company relates to Prism. */
export const relationshipCopy: Record<Pillar["kind"], string | null> = {
  Capability: null,
  "Owned venture": "A Prism Group venture",
  "Independent company": "Independent company · Prism founder is a shareholder",
};

export const spectraiqRelationship =
  "SpectraIQ.ai is an independent Delaware C Corporation founded and operated by a team of co-founders, with strategic participation from Prism's founder. Prism Group and SpectraIQ.ai are separate corporate entities.";
export const capabilities = pillars.filter((p) => p.kind === "Capability");

export const valueSteps = [
  { n: "01", title: "Discover", copy: "Understand the problem." },
  { n: "02", title: "Intelligently model", copy: "Identify opportunity and quantify value." },
  { n: "03", title: "Engineer", copy: "Build the technology and intelligence layer." },
  { n: "04", title: "Deploy", copy: "Integrate into real-world operations." },
  { n: "05", title: "Scale", copy: "Measure, improve and expand." },
];

export const principles = [
  { title: "Outcome first", copy: "Every initiative begins with the business or clinical outcome." },
  { title: "ROI-led", copy: "Model the economics before building the solution." },
  { title: "Intelligence by design", copy: "AI is embedded into workflows, decisions and experiences." },
  { title: "Domain + technology", copy: "Deep domain understanding combined with engineering capability." },
  { title: "Human + AI", copy: "AI amplifies people rather than simply replacing them." },
  { title: "Built to scale", copy: "Solutions are designed for adoption, integration and continuous improvement." },
];

export const industries = [
  "Healthcare",
  "Professional Services",
  "Financial Services",
  "Retail",
  "Manufacturing",
  "Property & Real Estate",
  "Trades & Field Services",
  "Technology",
  "Industrial & Operations",
];

export const ecosystemLayers = [
  "Data",
  "AI",
  "Intelligence",
  "Automation",
  "Applications",
  "Humans",
  "Outcomes",
];

export const insights = [
  {
    slug: "roi-first-ai",
    category: "AI",
    title: "The ROI-first case for enterprise AI",
    excerpt:
      "Why the strongest AI programmes begin with an economic model, not a model deployment — and how to structure a self-funding roadmap.",
    read: "6 min read",
    colour: 1 as PrismColour,
  },
  {
    slug: "beyond-dashboards",
    category: "Decision Intelligence",
    title: "Beyond dashboards: the leadership intelligence layer",
    excerpt:
      "Traditional BI reports the past. Decision intelligence explains cause, simulates outcomes and recommends the next move.",
    read: "5 min read",
    colour: 4 as PrismColour,
  },
  {
    slug: "ai-in-clinical-workflows",
    category: "Healthcare",
    title: "Where AI genuinely helps clinical workflows",
    excerpt:
      "Diagnostic capability grows when technology reduces interpretation burden and returns time to clinicians.",
    read: "7 min read",
    colour: 7 as PrismColour,
  },
];

export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/ventures" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Technology", to: "/technology" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];
