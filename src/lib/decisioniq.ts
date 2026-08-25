export const DIQ_COLOUR = 4;

/* ---------------------------------------------------------------- hero */

export const heroStack = [
  {
    key: "data",
    label: "Data",
    items: ["ERP", "CRM", "Finance", "Operations", "HR", "Sales", "Customers", "External data"],
  },
  { key: "computation", label: "Computation", items: ["KPIs", "Metrics", "Models", "Forecasts"] },
  {
    key: "intelligence",
    label: "Intelligence",
    items: ["AI reasoning", "Patterns", "Drivers", "Risks", "Opportunities"],
  },
  { key: "decision", label: "Decision", items: ["Recommend", "Simulate", "Act", "Monitor"] },
] as const;

export const heroOutcomes = [
  { title: "See", copy: "One governed view of business reality, refreshed continuously." },
  { title: "Understand", copy: "AI explains drivers and root causes, not just variances." },
  { title: "Decide", copy: "Simulate the trade-offs, then act on ranked recommendations." },
];

/* ------------------------------------------------------------- problem */

export const dataEverywhere = [
  "ERP systems",
  "CRM",
  "Spreadsheets",
  "Finance systems",
  "Operational platforms",
  "HR systems",
  "Power BI",
  "Dashboards",
  "Reports",
  "Analysts",
];

export const leadershipQuestions = [
  "What happened?",
  "Why did it happen?",
  "What is changing?",
  "What happens next?",
  "What should we do?",
  "What happens if we change something?",
];

export const legacyLoop = ["Data everywhere", "Reports", "Analysis", "Meetings", "Decisions"];

/* --------------------------------------------------------- decision loop */

export const decisionLoop = [
  { step: "See", q: "What is happening?", copy: "Governed KPIs across finance, operations, commercial and people — one consistent business reality." },
  { step: "Understand", q: "Why is it happening?", copy: "AI decomposes movement into drivers: volume, price, mix, cost, utilisation, churn, region and cohort." },
  { step: "Predict", q: "What is likely to happen?", copy: "Trend and forecast intelligence surfaces exposure before it lands in a reported result." },
  { step: "Simulate", q: "What happens if we change something?", copy: "Model levers across revenue, cost, workforce and capital and see the trade-offs in seconds." },
  { step: "Recommend", q: "What should we do?", copy: "Ranked actions with expected impact, owner, timeframe, dependencies and risk." },
  { step: "Act", q: "Execute the decision.", copy: "Decisions leave the platform as owned actions, not as slides in a deck." },
  { step: "Learn", q: "Measure the result.", copy: "Outcomes are measured against expectation and fed back into the intelligence layer." },
];

/* --------------------------------------------------------- BI vs DIQ */

export const biComparison = {
  bi: {
    title: "Traditional BI",
    items: [
      "What happened?",
      "Charts",
      "Dashboards",
      "Historical reporting",
      "Manual analysis",
      "Analyst dependency",
      "Reactive",
    ],
  },
  diq: {
    title: "DecisionIQ",
    items: [
      "What happened?",
      "Why did it happen?",
      "What happens next?",
      "What if?",
      "What should we do?",
      "What happened after we acted?",
      "AI-assisted, forward-looking, action-oriented",
    ],
  },
};

/* ------------------------------------------------------------- personas */

export type Persona = {
  id: string;
  role: string;
  lens: string;
  focus: string[];
  question: string;
  answer: string[];
  tiles: { label: string; value: string; delta: string; tone: "good" | "warn" | "bad" }[];
};

export const personas: Persona[] = [
  {
    id: "ceo",
    role: "CEO",
    lens: "Enterprise health",
    focus: ["Business health", "Growth", "Strategic risks", "Enterprise opportunities", "Scenario planning"],
    question: "Summarise the business.",
    answer: [
      "Business Health is 74/100 — stable, with margin the weakest dimension.",
      "Biggest risk: customer concentration in the top five accounts is approaching the board threshold.",
      "Biggest opportunity: demand in Segment B is growing faster than served capacity.",
      "Recommended: review pricing in Region A, release constrained capacity, prioritise Segment B pursuit.",
    ],
    tiles: [
      { label: "Business health", value: "74/100", delta: "-3 vs last month", tone: "warn" },
      { label: "Revenue growth", value: "+8.4%", delta: "YoY", tone: "good" },
      { label: "EBITDA margin", value: "12.6%", delta: "-1.8 pts", tone: "bad" },
      { label: "Cash conversion", value: "86%", delta: "+2 pts", tone: "good" },
    ],
  },
  {
    id: "cfo",
    role: "CFO",
    lens: "Financial performance",
    focus: ["Revenue", "Margin", "Cash flow", "Cost drivers", "Forecasts", "Variance", "Financial scenarios"],
    question: "What's driving the margin decline?",
    answer: [
      "Margin declined 1.8 points against prior quarter.",
      "Volume contributed +0.6 pts; price/mix -0.9 pts; direct wage cost -1.2 pts; overhead -0.3 pts.",
      "Two thirds of the wage impact sits in one region operating above planned overtime.",
      "Recommended: reprice the two lowest-margin service lines and reset the overtime threshold.",
    ],
    tiles: [
      { label: "Revenue", value: "$142.6m", delta: "+8.4%", tone: "good" },
      { label: "Gross profit", value: "$41.3m", delta: "-0.7 pts", tone: "warn" },
      { label: "EBITDA", value: "$17.9m", delta: "-4.1%", tone: "bad" },
      { label: "Forecast variance", value: "-2.3%", delta: "vs budget", tone: "warn" },
    ],
  },
  {
    id: "coo",
    role: "COO",
    lens: "Operational performance",
    focus: ["Operational performance", "Capacity", "Productivity", "Workforce", "Regional performance", "Operational risks"],
    question: "Which region has the biggest operational issue?",
    answer: [
      "Region A ranks lowest: utilisation 71% against a 84% target, RAG status red.",
      "Root cause: attrition in two delivery teams has driven overtime and rework.",
      "Estimated financial impact: material margin drag concentrated in one service line.",
      "Recommended 30/60/90: stabilise rostering, backfill two roles, re-baseline the schedule.",
    ],
    tiles: [
      { label: "Utilisation", value: "78.4%", delta: "-3.1 pts", tone: "warn" },
      { label: "Productivity index", value: "96", delta: "-4 vs plan", tone: "warn" },
      { label: "Capacity released", value: "1,240 hrs", delta: "quarter", tone: "good" },
      { label: "Attrition (12m)", value: "17.2%", delta: "+2.4 pts", tone: "bad" },
    ],
  },
  {
    id: "gm",
    role: "General Manager",
    lens: "Commercial performance",
    focus: ["Customers", "Commercial performance", "Service lines", "Growth opportunities", "Team performance"],
    question: "Where is growth coming from?",
    answer: [
      "Growth is concentrated in two service lines and one customer cohort.",
      "Cross-sell coverage in the mid-tier cohort is under half of comparable accounts.",
      "Win rate has improved, but average deal size is flat — pricing, not demand, is the constraint.",
      "Recommended: run the cross-sell play on the mid-tier cohort and lift entry pricing on new work.",
    ],
    tiles: [
      { label: "Pipeline", value: "$38.4m", delta: "+11%", tone: "good" },
      { label: "Win rate", value: "31%", delta: "+2 pts", tone: "good" },
      { label: "Avg deal size", value: "$186k", delta: "flat", tone: "warn" },
      { label: "Retention", value: "92%", delta: "-1 pt", tone: "warn" },
    ],
  },
  {
    id: "board",
    role: "Board / Investor",
    lens: "Enterprise value",
    focus: ["Enterprise value", "Growth", "EBITDA", "Cash flow", "Risk", "Capital allocation", "Strategic scenarios"],
    question: "What could materially change enterprise value over the next 12 months?",
    answer: [
      "Growth opportunity: Segment B expansion, if capacity is released to serve it.",
      "Margin risk: wage inflation above plan compresses EBITDA if pricing is not reset.",
      "Cash-flow risk: working capital lengthening in one region.",
      "Capital scenario: a bolt-on acquisition is accretive under the modelled base and upside cases.",
    ],
    tiles: [
      { label: "EBITDA CAGR", value: "14%", delta: "3-year", tone: "good" },
      { label: "Rule of 40", value: "21", delta: "+1", tone: "warn" },
      { label: "Revenue / FTE", value: "$248k", delta: "+3.6%", tone: "good" },
      { label: "Net leverage", value: "1.6x", delta: "stable", tone: "good" },
    ],
  },
];

/* ------------------------------------------------------------- copilot */

export const copilotScript: { role: "user" | "ai"; text: string }[] = [
  { role: "user", text: "How healthy is the business?" },
  {
    role: "ai",
    text: "Business Health is 74/100. Three areas require attention: margin in Region A, customer concentration in the top five accounts, and rising attrition in two delivery teams.",
  },
  { role: "user", text: "Why is margin falling?" },
  {
    role: "ai",
    text: "Margin declined 1.8 points. Direct wage cost contributes -1.2 pts and price/mix -0.9 pts, partly offset by +0.6 pts of volume. Two thirds of the wage impact is one region running above planned overtime.",
  },
  { role: "user", text: "What happens if revenue grows 10% but wages increase 5%?" },
  {
    role: "ai",
    text: "Under that illustrative scenario EBITDA moves from $17.9m to $19.4m and margin from 12.6% to 12.4% — growth carries the absolute result, wage inflation absorbs the margin gain.",
  },
  { role: "user", text: "What should I do?" },
  {
    role: "ai",
    text: "Three actions have the highest projected impact: reprice the two lowest-margin service lines, reset the overtime threshold in Region A, and prioritise the Segment B pursuit list.",
  },
];

export const signatureQuestions = [
  {
    q: "What is driving margin?",
    a: "Margin is down 1.8 pts. Bridge: volume +0.6, price/mix -0.9, direct wage -1.2, overhead -0.3. The wage component concentrates in one region.",
    action: "Reprice two service lines; reset overtime thresholds.",
  },
  {
    q: "Where is growth coming from?",
    a: "Two service lines and one mid-tier customer cohort account for most of the growth. Cross-sell coverage in that cohort is materially below comparable accounts.",
    action: "Run the cross-sell play on the mid-tier cohort.",
  },
  {
    q: "Which region needs attention?",
    a: "Region A: utilisation 71% against an 84% target, attrition rising in two teams, overtime above plan. RAG status red.",
    action: "Stabilise rostering, backfill two roles, re-baseline the schedule.",
  },
  {
    q: "What happens if wages increase 5%?",
    a: "Holding volume and price constant, EBITDA falls by roughly one margin point. Offsetting it requires either a pricing reset or a productivity gain of similar magnitude.",
    action: "Model the pricing and productivity offsets side by side.",
  },
  {
    q: "Where is our biggest opportunity?",
    a: "Segment B demand is growing faster than served capacity. The constraint is delivery capacity, not pipeline.",
    action: "Release capacity before adding pursuit effort.",
  },
  {
    q: "What's the biggest risk?",
    a: "Customer concentration. The top five accounts are approaching the threshold agreed with the board, and one is in a renewal window.",
    action: "Accelerate diversification in the mid-tier cohort; secure the renewal.",
  },
];

/* --------------------------------------------------------- driver tree */

export const driverTree = [
  { label: "EBITDA", detail: "Down 4.1% against prior quarter", kind: "metric" },
  { label: "Revenue", detail: "Growth below plan", kind: "driver" },
  { label: "Volume", detail: "Units delivered below forecast", kind: "driver" },
  { label: "Region A", detail: "Largest single contributor to the gap", kind: "driver" },
  { label: "Client churn", detail: "Churn rising in one cohort", kind: "cause" },
  { label: "Mid-tier segment", detail: "Concentrated in accounts under $500k", kind: "cause" },
  { label: "Account cohort", detail: "Onboarded in the last 18 months", kind: "cause" },
  { label: "Recommended action", detail: "Targeted retention programme plus service review", kind: "action" },
] as const;

/* -------------------------------------------------------- predictive */

export const predictiveChain = [
  { step: "Today", copy: "Current performance across governed KPIs." },
  { step: "Trend", copy: "Direction of travel over comparable periods." },
  { step: "Forecast", copy: "Expected outcome if nothing changes." },
  { step: "Risk", copy: "Probability and exposure, expressed in business terms." },
  { step: "Action", copy: "The recommended intervention, and when it must happen." },
];

export const riskWatchlist = [
  { name: "Revenue risk", copy: "Pipeline coverage below the conversion required to hold plan." },
  { name: "Margin risk", copy: "Cost growing faster than price in two service lines." },
  { name: "Cash-flow risk", copy: "Working capital cycle lengthening in one region." },
  { name: "Customer concentration", copy: "Top-account share approaching the board threshold." },
  { name: "Workforce risk", copy: "Key-role coverage thin in constrained teams." },
  { name: "Attrition", copy: "Twelve-month attrition trending above the internal benchmark." },
  { name: "Capacity", copy: "Demand growing faster than served capacity in one segment." },
  { name: "Cost inflation", copy: "Input and wage inflation ahead of contracted escalation." },
];

/* ------------------------------------------------------- opportunities */

export type Opportunity = {
  group: string;
  name: string;
  value: string;
  confidence: "High" | "Medium" | "Emerging";
  owner: string;
  action: string;
  timeframe: string;
};

export const opportunities: Opportunity[] = [
  { group: "Revenue", name: "Cross-sell", value: "Material", confidence: "High", owner: "GM Commercial", action: "Run cross-sell play on mid-tier cohort", timeframe: "0–90 days" },
  { group: "Revenue", name: "Upsell", value: "Moderate", confidence: "Medium", owner: "Sales lead", action: "Prioritise accounts with expanding demand", timeframe: "0–90 days" },
  { group: "Revenue", name: "Pricing", value: "Material", confidence: "High", owner: "CFO", action: "Reset entry pricing on lowest-margin lines", timeframe: "0–60 days" },
  { group: "Revenue", name: "Retention", value: "Material", confidence: "Medium", owner: "GM Commercial", action: "Targeted retention programme for at-risk cohort", timeframe: "0–120 days" },
  { group: "Revenue", name: "New customers", value: "Moderate", confidence: "Emerging", owner: "Sales lead", action: "Focus pursuit on Segment B demand", timeframe: "90–180 days" },
  { group: "Cost", name: "Productivity", value: "Material", confidence: "High", owner: "COO", action: "Close the utilisation gap in Region A", timeframe: "0–90 days" },
  { group: "Cost", name: "Route optimisation", value: "Moderate", confidence: "Medium", owner: "Ops lead", action: "Re-plan scheduling against demand density", timeframe: "60–120 days" },
  { group: "Cost", name: "Workforce", value: "Material", confidence: "Medium", owner: "CPO", action: "Reset overtime thresholds and roster design", timeframe: "0–90 days" },
  { group: "Cost", name: "Procurement", value: "Moderate", confidence: "Medium", owner: "CFO", action: "Consolidate spend across fragmented suppliers", timeframe: "90–180 days" },
  { group: "Cost", name: "Automation", value: "Material", confidence: "Medium", owner: "CIO", action: "Automate the highest-volume manual workflows", timeframe: "90–180 days" },
  { group: "Capital", name: "Acquisitions", value: "Strategic", confidence: "Emerging", owner: "CEO", action: "Model bolt-on scenarios against base case", timeframe: "6–18 months" },
  { group: "Capital", name: "Investment", value: "Strategic", confidence: "Medium", owner: "CFO", action: "Reallocate capex toward constrained capacity", timeframe: "6–12 months" },
  { group: "Capital", name: "Resource allocation", value: "Material", confidence: "High", owner: "Exec team", action: "Shift effort to the highest-return segments", timeframe: "0–90 days" },
];

/* ------------------------------------------------------------ scenarios */

export const scenarioLevers = [
  { id: "revenue", label: "Revenue growth", min: -10, max: 25, step: 1, unit: "%", base: 0 },
  { id: "wage", label: "Wage inflation", min: 0, max: 12, step: 0.5, unit: "%", base: 3 },
  { id: "churn", label: "Customer churn change", min: -15, max: 15, step: 1, unit: "%", base: 0 },
  { id: "price", label: "Pricing change", min: -5, max: 10, step: 0.5, unit: "%", base: 0 },
  { id: "productivity", label: "Productivity gain", min: 0, max: 20, step: 1, unit: "%", base: 0 },
  { id: "automation", label: "Automation savings", min: 0, max: 10, step: 0.5, unit: "%", base: 0 },
  { id: "headcount", label: "Headcount change", min: -10, max: 15, step: 1, unit: "%", base: 0 },
] as const;

export type LeverId = (typeof scenarioLevers)[number]["id"];

export const scenarioPresets: { id: string; label: string; values: Partial<Record<LeverId, number>> }[] = [
  { id: "base", label: "Base", values: {} },
  { id: "upside", label: "Upside", values: { revenue: 12, price: 3, productivity: 8, churn: -8 } },
  { id: "downside", label: "Downside", values: { revenue: -6, wage: 8, churn: 10, price: -2 } },
  { id: "stress", label: "Stress", values: { revenue: -10, wage: 10, churn: 14, price: -4, headcount: 6 } },
];

/** Illustrative base financials, in $m. */
export const baseline = {
  revenue: 142.6,
  grossMarginPct: 29.0,
  wageCostPct: 41.0,
  otherCostPct: 46.4,
  cashConversion: 0.86,
};

export const decisionActions = [
  {
    tier: "High impact",
    name: "Reset pricing on the two lowest-margin service lines",
    impact: "Recovers most of the price/mix drag",
    owner: "CFO",
    timeframe: "0–60 days",
    dependencies: "Contract review, commercial approval",
    risk: "Customer response in a competitive segment",
  },
  {
    tier: "Medium impact",
    name: "Close the utilisation gap in the constrained region",
    impact: "Releases capacity and reduces overtime cost",
    owner: "COO",
    timeframe: "0–90 days",
    dependencies: "Rostering change, two backfills",
    risk: "Short-term delivery disruption",
  },
  {
    tier: "Watch",
    name: "Customer concentration in the top five accounts",
    impact: "Protects enterprise value and board risk position",
    owner: "CEO",
    timeframe: "Ongoing",
    dependencies: "Mid-tier growth programme",
    risk: "Renewal timing outside our control",
  },
];

/* --------------------------------------------------------- health score */

export const healthDimensions = [
  { name: "Revenue", score: 82, status: "green", changed: "Growth of 8.4% year on year, ahead of the prior period.", why: "Two service lines and one customer cohort are driving most of the increase.", next: "Growth holds if capacity is released to serve Segment B demand.", act: "Prioritise the Segment B pursuit list." },
  { name: "Profitability", score: 61, status: "red", changed: "EBITDA margin fell 1.8 points.", why: "Direct wage cost and price/mix, concentrated in one region.", next: "Without a pricing or productivity offset, the gap persists.", act: "Reprice two service lines; reset overtime thresholds." },
  { name: "Cash", score: 76, status: "amber", changed: "Cash conversion is stable at 86%, but the cycle lengthened in one region.", why: "Invoicing delays following a system change.", next: "A further slip would move working capital outside plan.", act: "Clear the invoicing backlog and re-baseline terms." },
  { name: "Customers", score: 68, status: "amber", changed: "Retention slipped one point; concentration rose.", why: "Churn in a mid-tier cohort onboarded in the last 18 months.", next: "Concentration approaches the board threshold within two quarters.", act: "Run a targeted retention programme." },
  { name: "Operations", score: 71, status: "amber", changed: "Utilisation is 3.1 points below plan.", why: "Attrition and rework in two delivery teams.", next: "Capacity remains the constraint on growth.", act: "Stabilise rostering; backfill two roles." },
  { name: "People", score: 64, status: "red", changed: "Twelve-month attrition rose 2.4 points.", why: "Concentrated in two teams carrying above-plan overtime.", next: "Continued attrition compounds the capacity constraint.", act: "Address workload before adding headcount." },
  { name: "Risk", score: 79, status: "green", changed: "No new material compliance or control exceptions.", why: "Controls held through the period.", next: "Concentration risk is the item to monitor.", act: "Maintain the monthly risk review cadence." },
] as const;

/* ------------------------------------------------------------- alerts */

export const alerts = [
  { kind: "risk", title: "Margin risk", body: "Margin declined 2.1% in one service line. Driver identified: direct wage cost above planned overtime.", action: "Reset overtime threshold and reprice the affected line." },
  { kind: "opportunity", title: "Growth opportunity", body: "A customer segment is showing sustained increase in demand ahead of served capacity.", action: "Prioritise the segment in pursuit planning and release capacity." },
  { kind: "risk", title: "Workforce risk", body: "Attrition trend increasing in two delivery teams, with potential cost and capacity impact.", action: "Intervene on workload and rostering before backfilling." },
  { kind: "risk", title: "Concentration risk", body: "Top-five customer share is approaching the threshold agreed with the board.", action: "Accelerate mid-tier growth; secure the account in renewal." },
] as const;

export const morningBrief = {
  time: "08:45 AM",
  health: 74,
  know: [
    "Margin pressure in Region A.",
    "Customer concentration risk approaching threshold.",
    "Growth opportunity identified in Segment B.",
  ],
  actions: ["Review pricing.", "Address capacity.", "Prioritise top opportunities."],
};

export const boardPack = [
  { title: "AI-generated narrative", copy: "A plain-language account of the period: what moved, why, and what it means for the plan." },
  { title: "Key metrics", copy: "Growth, EBITDA, margin, cash flow, revenue per FTE and leverage, on one governed basis." },
  { title: "Material changes", copy: "The movements large enough to change the board's view, with their drivers attached." },
  { title: "Risks", copy: "Concentration, workforce, cash and compliance exposure, with trend and threshold." },
  { title: "Opportunities", copy: "Where value is available, with confidence, owner and timeframe." },
  { title: "Scenarios & actions", copy: "Modelled futures and the decisions that follow from them." },
];

/* -------------------------------------------------------- architecture */

export const architecture = [
  { key: "Ingestion", copy: "Connect the relevant business data — ERP, CRM, finance, operations, HR, customer and external sources — through engineered, monitored pipelines.", detail: ["Source-system audit", "Pipeline engineering", "Incremental and batch loads", "Connection monitoring"] },
  { key: "Computation", copy: "Standardise KPIs and calculations so every leader and every view works from the same definitions.", detail: ["Semantic layer", "KPI definitions", "Calculation governance", "Reconciliation to source"] },
  { key: "Intelligence", copy: "Identify patterns, drivers, risks and opportunities across the governed model.", detail: ["Driver analysis", "Anomaly detection", "Forecasting", "Opportunity identification"] },
  { key: "AI Persona", copy: "Present intelligence through the lens of each leader — the same truth, framed for the decision being made.", detail: ["Role-scoped context", "Persona prompts", "Permissioned data access", "Consistent narrative"] },
  { key: "Presentation", copy: "Dashboards, executive summaries and natural-language interaction across devices.", detail: ["Executive dashboards", "Narrative summaries", "Conversational queries", "Alerting"] },
  { key: "Simulation", copy: "Model possible futures and the outcomes of decisions before they are made.", detail: ["Lever-based modelling", "Scenario comparison", "EBITDA and cash impact", "Sensitivity views"] },
];

export const dataFoundation = {
  sources: ["ERP", "CRM", "Finance", "HR", "Operations", "Customer", "External"],
  foundation: ["Validation", "Standardisation", "Semantic layer", "Governance"],
};

export const validationStages = [
  { name: "Structural", copy: "Schema, types, keys and referential integrity behave as expected." },
  { name: "Completeness", copy: "Expected records, periods and entities are present — nothing silently missing." },
  { name: "Conformance", copy: "Values conform to agreed formats, codes, hierarchies and units." },
  { name: "Business rules", copy: "Domain logic holds: balances reconcile, dates sequence, statuses are valid." },
  { name: "Cross-source validation", copy: "The same fact agrees across systems before it becomes a KPI." },
];

export const governancePillars = [
  { name: "Data residency", copy: "Data is hosted in the agreed jurisdiction, with residency defined at design time." },
  { name: "Encryption", copy: "Protection in transit and at rest using current industry-standard encryption." },
  { name: "Role-based access", copy: "Each persona sees only the information they are authorised to see." },
  { name: "Audit trail", copy: "Queries, access and AI interactions are logged and traceable." },
  { name: "AI guardrails", copy: "AI operates against governed business information within defined boundaries." },
  { name: "Data minimisation", copy: "Only the information required for the decision is used." },
];

export const humanAi = {
  ai: ["Detects", "Analyses", "Predicts", "Simulates", "Recommends", "Monitors"],
  leaders: ["Judge", "Prioritise", "Approve", "Act", "Account"],
};

export const enterpriseMap = [
  { role: "CEO", items: ["Growth", "Profitability", "Risk", "Strategy"] },
  { role: "CFO", items: ["P&L", "Cash", "Margin", "Forecast"] },
  { role: "COO", items: ["Operations", "Capacity", "Productivity"] },
  { role: "Sales / GM", items: ["Customers", "Revenue", "Pipeline", "Growth"] },
  { role: "HR", items: ["Workforce", "Attrition", "Cost", "Capacity"] },
  { role: "Board", items: ["Enterprise value", "Growth", "Risk", "Capital"] },
];

export const useCases = [
  { group: "Performance", items: ["Business health", "KPI intelligence", "Variance analysis"] },
  { group: "Finance", items: ["FP&A", "Cash", "Margin", "Forecasting"] },
  { group: "Operations", items: ["Productivity", "Capacity", "Utilisation", "Cost"] },
  { group: "Commercial", items: ["Revenue", "Pricing", "Customers", "Cross-sell"] },
  { group: "People", items: ["Workforce", "Attrition", "FTE", "Productivity"] },
  { group: "Strategy", items: ["Scenarios", "Acquisitions", "Growth", "Capital allocation"] },
  { group: "Risk", items: ["Risk alerts", "Concentration", "Compliance", "Early warning"] },
];

export const maturity = [
  { level: "Reporting", q: "What happened?", copy: "Historic performance is visible, usually after period close." },
  { level: "Analytics", q: "Why did it happen?", copy: "Analysts decompose movement into contributing factors on request." },
  { level: "Predictive", q: "What will happen?", copy: "Forecasts and trends extend the view beyond the reported period." },
  { level: "Simulation", q: "What could happen?", copy: "Decision-makers model alternative futures across multiple levers." },
  { level: "Decision intelligence", q: "What should we do?", copy: "Intelligence produces ranked, owned recommendations." },
  { level: "Action intelligence", q: "Did it work?", copy: "Outcomes are measured against expectation and fed back into the model." },
];

export const implementation = [
  { step: "Discover", copy: "Understand systems, KPIs and the decisions leadership actually needs to make." },
  { step: "Blueprint", copy: "Define the architecture, personas and intelligence model." },
  { step: "Configure", copy: "Build the platform and the decision layer on top of governed definitions." },
  { step: "Integrate", copy: "Connect data sources through engineered, monitored pipelines." },
  { step: "Validate", copy: "Test KPIs, calculations and AI outputs against trusted references." },
  { step: "Enable", copy: "Train leadership and users on the decision workflow, not just the interface." },
  { step: "Go live", copy: "Launch the intelligence platform into the leadership operating rhythm." },
  { step: "Optimise", copy: "Continuously extend coverage, intelligence and decision quality." },
];

export const provenCapability = [
  { stat: "30+", label: "Data sources integrated", copy: "Engineered ingestion across finance, operations, commercial and workforce systems." },
  { stat: "200+", label: "Governed KPIs", copy: "Standardised definitions validated against existing enterprise measures." },
  { stat: "80+", label: "Dashboards delivered", copy: "Role-scoped views built on a single semantic layer." },
  { stat: "50+", label: "Automated pipelines", copy: "Monitored, scheduled and reconciled data flows." },
];

export const provenArchitecture = [
  "Business performance simulation platform with unit economics and scenario composition",
  "EBITDA-to-free-cash-flow modelling across multiple decision levers",
  "Governed KPI intelligence platform with a semantic layer at its core",
  "Persona-driven AI reasoning scoped to role and permission",
  "Validation of AI and platform outputs against existing enterprise measures",
  "Large-scale data integration across heterogeneous source systems",
];

export const valueEquation = [
  { title: "Revenue acceleration", items: ["Better opportunities", "Better pricing", "Better customer decisions"] },
  { title: "Cost optimisation", items: ["Productivity", "Workforce", "Process", "Operations"] },
  { title: "Capital intelligence", items: ["Investment", "Acquisitions", "Allocation"] },
];

export const flywheel = ["Data", "Understand", "Intelligence", "Decision", "Action", "Outcome", "Learning"];

export const principles = [
  { name: "One governed truth", copy: "Consistent KPIs and controlled data across every lens and every leader." },
  { name: "AI-native", copy: "Intelligence is embedded throughout the platform, not bolted on as a chat window." },
  { name: "Persona-driven", copy: "Every leader sees what matters to them, from the same underlying reality." },
  { name: "Forward-looking", copy: "Prediction and scenario modelling, not just historical reporting." },
  { name: "Action-oriented", copy: "Recommendations connect to owners, timeframes and measured outcomes." },
  { name: "Enterprise-grade", copy: "Governance, security, auditability and controlled access by design." },
];

export const faqs = [
  {
    q: "Is DecisionIQ a replacement for our BI platform?",
    a: "No. DecisionIQ sits above reporting. Existing BI answers what happened; DecisionIQ adds why it happened, what is likely to happen next, what happens under alternative scenarios, and what leadership should do. Where a BI estate already holds trusted measures, DecisionIQ validates against them rather than competing with them.",
  },
  {
    q: "What is decision intelligence?",
    a: "Decision intelligence is the discipline of connecting governed data, analytics, AI reasoning and simulation directly to the decisions an organisation makes — and then measuring whether those decisions produced the expected outcome. It treats the decision, not the dashboard, as the unit of value.",
  },
  {
    q: "What data do we need before we can start?",
    a: "You need source systems that can be connected and a willingness to agree definitions. Most organisations already have enough data; the work is validation, standardisation and semantics. DecisionIQ includes a five-stage validation approach so that data quality issues are caught before they reach a boardroom decision.",
  },
  {
    q: "How does the AI avoid making things up?",
    a: "The AI reasons over a governed semantic layer with defined KPIs and role-scoped access, not over free-form documents. Access is permissioned, interactions are logged, and outputs are traceable to the underlying measures.",
  },
  {
    q: "Does DecisionIQ make decisions automatically?",
    a: "No. AI detects, analyses, predicts, simulates, recommends and monitors. Leaders judge, prioritise, approve, act and remain accountable. DecisionIQ is decision support with governance, not autonomous decision-making.",
  },
  {
    q: "How long does an implementation take?",
    a: "It depends on the number of source systems, the state of the data and the breadth of the decision scope. The journey is always the same — discover, blueprint, configure, integrate, validate, enable, go live, optimise — and the first governed decision surface typically arrives well before full coverage.",
  },
  {
    q: "Who uses DecisionIQ day to day?",
    a: "CEOs, CFOs, COOs, general managers and boards, with analysts and finance teams operating the underlying model. Each persona sees the same governed truth framed for their decisions.",
  },
];
