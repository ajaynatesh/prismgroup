import type { PrismColour } from "@/lib/prism";

export type Challenge =
  | "Manual work"
  | "Disconnected data"
  | "Poor forecasting"
  | "Compliance risk"
  | "Customer leakage"
  | "Slow decisions";

export const challenges: Challenge[] = [
  "Manual work",
  "Disconnected data",
  "Poor forecasting",
  "Compliance risk",
  "Customer leakage",
  "Slow decisions",
];

export type CaseCategory = "AI Transformation & Automation" | "Prism TradeLink" | "Prism DecisionIQ";

export type CaseStudy = {
  slug: string;
  to: string;
  title: string;
  category: CaseCategory;
  colour: PrismColour;
  signature: string;
  problem: string;
  chips: string[];
  challenges: Challenge[];
  status: string;
  /** Built and routable. Cases not yet live render as "In development" tiles. */
  live: boolean;
  pillarTo: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "intelligent-procurement",
    to: "/case-studies/intelligent-procurement",
    title: "Procurement, Reimagined",
    category: "AI Transformation & Automation",
    colour: 1,
    signature: "Contract-to-supplier-to-payment command centre",
    problem:
      "Contracts, spend and supplier records live in separate systems, so every purchase is slower, riskier and harder to evidence than it should be.",
    chips: ["Contract intelligence", "Spend visibility", "Supplier onboarding"],
    challenges: ["Manual work", "Disconnected data", "Compliance risk"],
    status: "Illustrative solution blueprint",
    live: true,
    pillarTo: "/capabilities/ai-transformation",
  },
  {
    slug: "intelligent-supply-chain",
    to: "/case-studies/intelligent-supply-chain",
    title: "The Predictive Supply Chain",
    category: "AI Transformation & Automation",
    colour: 1,
    signature: "Forecast-to-replenishment digital control tower",
    problem:
      "Demand moves faster than manual planning cycles, leaving capital tied up in the wrong stock while the right stock runs out.",
    chips: ["Demand sensing", "Inventory optimisation", "Supplier intelligence"],
    challenges: ["Poor forecasting", "Disconnected data", "Slow decisions"],
    status: "Illustrative solution blueprint",
    live: false,
    pillarTo: "/capabilities/ai-transformation",
  },
  {
    slug: "continuous-risk-compliance",
    to: "/case-studies/continuous-risk-compliance",
    title: "Compliance That Never Sleeps",
    category: "AI Transformation & Automation",
    colour: 1,
    signature: "Living risk graph and obligation-to-evidence trace",
    problem:
      "Obligations, controls and evidence are tracked in spreadsheets, so control failures surface at audit time instead of when they happen.",
    chips: ["Controls monitoring", "Third-party risk", "Audit readiness"],
    challenges: ["Compliance risk", "Manual work", "Disconnected data"],
    status: "Illustrative solution blueprint",
    live: false,
    pillarTo: "/capabilities/ai-transformation",
  },
  {
    slug: "intelligent-finance-operations",
    to: "/case-studies/intelligent-finance-operations",
    title: "Finance Without the Friction",
    category: "AI Transformation & Automation",
    colour: 1,
    signature: "Invoice-to-reconciliation intelligent workflow",
    problem:
      "Invoices arrive in every format, and each mismatch, duplicate or bank-detail change becomes manual rework and payment risk.",
    chips: ["Document processing", "Three-way match", "Governed approvals"],
    challenges: ["Manual work", "Compliance risk"],
    status: "Proposed illustrative solution blueprint",
    live: false,
    pillarTo: "/capabilities/ai-transformation",
  },
  {
    slug: "tradelink-whatsapp",
    to: "/case-studies/tradelink-whatsapp",
    title: "From Message to Money",
    category: "Prism TradeLink",
    colour: 5,
    signature: "WhatsApp-first end-to-end tradesperson journey",
    problem:
      "Tradespeople lose jobs between the first message and the final payment because enquiries, quotes and follow-ups live in their head.",
    chips: ["WhatsApp-first", "Quote to payment", "Repeat customers"],
    challenges: ["Customer leakage", "Manual work"],
    status: "Illustrative solution blueprint",
    live: false,
    pillarTo: "/ventures/tradelink",
  },
  {
    slug: "decisioniq-mining",
    to: "/case-studies/decisioniq-mining",
    title: "The Intelligent Mining Enterprise",
    category: "Prism DecisionIQ",
    colour: 4,
    signature: "Multi-persona executive mining intelligence cockpit",
    problem:
      "Production, cost, commercial and risk signals are reported in isolation, so leaders debate whose numbers are right instead of what to do.",
    chips: ["Executive personas", "Scenario engine", "Governed KPIs"],
    challenges: ["Slow decisions", "Disconnected data", "Poor forecasting"],
    status: "Anonymised project-inspired case narrative",
    live: false,
    pillarTo: "/ventures/decisioniq",
  },
];

export const caseCategories: ("All" | CaseCategory)[] = [
  "All",
  "AI Transformation & Automation",
  "Prism TradeLink",
  "Prism DecisionIQ",
];

export const caseCategoryLabel: Record<"All" | CaseCategory, string> = {
  All: "All",
  "AI Transformation & Automation": "AI Transformation & Automation",
  "Prism TradeLink": "TradeLink",
  "Prism DecisionIQ": "DecisionIQ",
};

export const findCase = (slug: string) => caseStudies.find((c) => c.slug === slug)!;
