import type { PrismColour } from "@/lib/prism";

/**
 * Homepage content model. On the homepage the seven pillars are presented as
 * equals — no ownership, venture or capability distinction.
 */
export type HomePillar = {
  index: string;
  colour: PrismColour;
  name: string;
  statement: string;
  positioning: string;
  solves: string[];
  capabilities: string[];
  matters: string;
  cta: string;
  href: string;
  external?: string;
};

export const homePillars: HomePillar[] = [
  {
    index: "01",
    colour: 1,
    name: "AI Transformation & Automation",
    statement: "Turn AI potential into measurable business value.",
    positioning:
      "Prism helps organisations identify where AI can transform workflows, eliminate inefficiency and create measurable financial impact. We begin with the economics — modelling the opportunity, prioritising high-value use cases and designing solutions built to become self-funding and generate scalable ROI.",
    solves: [
      "AI ambition with no clear starting point or business case",
      "Manual, document-heavy processes consuming skilled capacity",
      "Pilots that never reach production or measurable value",
      "Operating costs rising faster than productivity",
    ],
    capabilities: [
      "AI workflow automation",
      "Process optimisation",
      "Intelligent document processing",
      "Workflow redesign",
      "AI-enabled operations",
      "ROI modelling",
      "Business process transformation",
      "Automation strategy",
    ],
    matters: "Lower cost to serve, higher throughput and an AI programme that funds its own expansion.",
    cta: "Explore AI Transformation",
    href: "/capabilities/ai-transformation",
  },
  {
    index: "02",
    colour: 2,
    name: "SpectraIQ.ai",
    statement: "Turn business data into commercial intelligence.",
    positioning:
      "SpectraIQ.ai is an independent, enterprise-grade AI commercial intelligence platform, built to help organisations surface opportunity inside their own data, improve commercial performance and accelerate growth across the full revenue cycle.",
    solves: [
      "Revenue opportunity buried in operational and CRM data",
      "Leads that go unworked, unqualified or cold",
      "Inconsistent commercial performance across teams",
      "No quantified view of where growth will actually come from",
    ],
    capabilities: [
      "AI commercial intelligence",
      "Opportunity identification",
      "AI lead management",
      "Sales acceleration",
      "Dead lead revival",
      "Commercial Opportunity Assessment",
      "ROI modelling",
      "AI workflows",
      "Business performance intelligence",
    ],
    matters: "More qualified opportunity, faster conversion and measurable revenue uplift from existing data.",
    cta: "Explore SpectraIQ.ai",
    href: "/ventures/spectraiq",
    external: "https://spectraiq.ai/",
  },
  {
    index: "03",
    colour: 3,
    name: "Enterprise AI & Technology Transformation",
    statement: "Modernise the technology that powers your business.",
    positioning:
      "Prism combines AI, enterprise technology, data and engineering to transform core systems and operations — cognitive engineering rather than isolated tooling.",
    solves: [
      "Fragmented core systems and disconnected data",
      "ERP programmes that stall or overrun",
      "AI initiatives without governance, controls or ownership",
      "Reporting that cannot support executive decisions",
    ],
    capabilities: [
      "Generative & agentic AI",
      "Intelligent workflows",
      "Predictive analytics",
      "AI governance",
      "SAP · Oracle · Odoo · Zoho",
      "Implementation advisory & PMO",
      "Data engineering & integration",
      "Analytics & dashboards",
      "Enterprise, IT & cyber risk",
      "Finance, FP&A & tax",
    ],
    matters: "A modern, governed technology core that AI and automation can safely scale on.",
    cta: "Explore Enterprise Transformation",
    href: "/capabilities/enterprise-technology",
  },
  {
    index: "04",
    colour: 4,
    name: "Prism DecisionIQ",
    statement: "See what matters. Understand why. Decide what's next.",
    positioning:
      "Prism DecisionIQ transforms fragmented business data into an AI-powered intelligence layer for leadership — helping executives understand performance, identify risk and opportunity, simulate scenarios and act with confidence. Traditional BI tells you what happened; DecisionIQ explains why, what happens next and what to do about it.",
    solves: [
      "Dashboards that report history but not cause",
      "Leadership decisions made on partial or lagging data",
      "No ability to simulate the impact of a decision",
      "Risks and opportunities identified too late",
    ],
    capabilities: [
      "Business Health Intelligence",
      "AI Leadership Copilot",
      "Scenario & simulation",
      "Root cause intelligence",
      "Predictive risk alerts",
      "Opportunity intelligence",
      "Action recommendations",
      "Board & investor intelligence",
    ],
    matters: "Faster, better-informed executive decisions with a quantified view of consequence.",
    cta: "Discover DecisionIQ",
    href: "/ventures/decisioniq",
  },
  {
    index: "05",
    colour: 5,
    name: "Prism TradeLink",
    statement: "Your business. Powered by WhatsApp.",
    positioning:
      "A WhatsApp-first business platform for mobile-first service businesses. TradeLink brings AI, automation and essential business workflows into the channel customers and owners already use every day. Don't make small businesses learn complicated software — make the tools they already use dramatically more powerful.",
    solves: [
      "Enquiries missed while the team is on the job",
      "Quotes and bookings managed manually across chats",
      "Payments chased inconsistently",
      "No customer record, history or follow-up",
    ],
    capabilities: [
      "Lead capture",
      "AI enquiry handling",
      "Customer qualification",
      "Booking & appointment management",
      "Quotes",
      "Payment links & communication",
      "CRM & customer history",
      "Follow-ups & review requests",
      "Re-engagement",
      "Workflow automation",
    ],
    matters: "Every enquiry captured and converted, with no new software for the business to learn.",
    cta: "Discover TradeLink",
    href: "/ventures/tradelink",
  },
  {
    index: "06",
    colour: 6,
    name: "Prism AlwaysOn AI",
    statement: "Your business never sleeps.",
    positioning:
      "AI-powered voice and SMS agents that keep businesses available, responsive and productive 24/7 — an AI workforce rather than a chatbot. Every call answered. Every message acknowledged. Every opportunity captured.",
    solves: [
      "Calls unanswered outside business hours",
      "Slow first response losing high-intent leads",
      "No-shows from missed reminders and follow-up",
      "Reception and support capacity constrained by headcount",
    ],
    capabilities: [
      "24/7 voice answering",
      "Natural conversation & intent recognition",
      "Customer identification",
      "Appointment booking & lead qualification",
      "SMS lead response & follow-up",
      "Appointment & payment reminders",
      "CRM updates, tickets & quotes",
      "Human escalation",
      "Customer memory & business knowledge",
    ],
    matters: "Continuous availability and captured demand without adding operational headcount.",
    cta: "Explore AlwaysOn AI",
    href: "/ventures/alwayson",
  },
  {
    index: "07",
    colour: 7,
    name: "Prism Diagnostics",
    statement: "Advanced technology. Better diagnostic decisions.",
    positioning:
      "Prism Diagnostics brings advanced diagnostic technology and AI-enabled reporting closer to healthcare professionals, expanding diagnostic capability and supporting better clinical decision-making.",
    solves: [
      "Limited access to advanced vestibular and balance diagnostics",
      "Interpretation and reporting burden on clinicians",
      "Technology adopted without clinical implementation support",
      "Capability gaps across clinical teams",
    ],
    capabilities: [
      "Vestibular diagnostics",
      "Balance diagnostics",
      "VNG",
      "SVV",
      "vHIT",
      "CCG",
      "Computerised Posturography",
      "DVA",
      "AI-enabled reporting",
      "Clinical implementation",
      "Training",
      "Support",
    ],
    matters: "Expanded diagnostic capability and time returned to clinicians.",
    cta: "Explore Prism Diagnostics",
    href: "/ventures/prism-diagnostics",
    external: "https://prismdiagnostics.com.au/",
  },
];

export const methodology = [
  { n: "01", title: "Identify", copy: "Find the highest-value opportunities." },
  { n: "02", title: "Quantify", copy: "Model revenue upside, cost opportunity and ROI." },
  { n: "03", title: "Engineer", copy: "Build the technology, intelligence and automation layer." },
  { n: "04", title: "Implement", copy: "Embed it into real business workflows." },
  { n: "05", title: "Optimise", copy: "Measure performance and continuously improve." },
  { n: "06", title: "Scale", copy: "Expand successful solutions across the organisation." },
];

export const whyPrism = [
  {
    title: "AI without the hype",
    copy: "Focus on practical business outcomes rather than experimentation for its own sake.",
  },
  {
    title: "ROI before implementation",
    copy: "Understand the economics of the opportunity before anything is built.",
  },
  {
    title: "Strategy + engineering",
    copy: "We bridge strategic thinking and real, production-grade implementation.",
  },
  {
    title: "Intelligence that works",
    copy: "AI becomes part of how the business actually operates, decides and grows.",
  },
];

export const commercialOutcomes = [
  {
    label: "Grow revenue",
    colour: 2 as PrismColour,
    points: ["More opportunities", "Better conversion", "Higher customer value", "New revenue streams"],
  },
  {
    label: "Reduce cost",
    colour: 5 as PrismColour,
    points: ["Automation", "Productivity", "Process optimisation", "Lower operational friction"],
  },
];
