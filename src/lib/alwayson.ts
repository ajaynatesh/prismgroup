export type Capability = {
  id: string;
  verb: string;
  title: string;
  description: string;
  voice: string;
  sms: string;
};

export type AgentType = {
  id: string;
  name: string;
  role: string;
  icon: string;
  scenarios: string[];
  outcomes: string[];
};

export type Industry = {
  id: string;
  name: string;
  useCases: { title: string; description: string }[];
  stat: string;
  statLabel: string;
};

export type ArchitectureLayer = {
  id: string;
  name: string;
  purpose: string;
  components: string[];
};

export type MaturityLevel = {
  level: number;
  name: string;
  tagline: string;
  voice: string;
  sms: string;
  systems: string;
};

export type Faq = { question: string; answer: string };

export const headline = "AN ALWAYS-ON AI WORKFORCE.";
export const subheadline = "YOUR BUSINESS. ALWAYS ON.";
export const supportingStatement =
  "Customers don't operate 9–5. Opportunities don't wait for business hours. Prism AlwaysOn AI gives businesses intelligent AI agents that can answer, engage, qualify, book, follow up and execute workflows 24/7 — across voice and SMS.";

export const problem = {
  title: "Every missed call is a missed opportunity.",
  lead: "Small and growing businesses lose revenue, trust and momentum when the front door is closed — even for a few hours.",
  pains: [
    { stat: "47%", label: "of customers will not leave a voicemail; they call a competitor instead" },
    { stat: "After hours", label: "enquiries often go cold before the team can respond" },
    { stat: "Repetitive", label: "calls and messages consume capacity that should be spent on high-value work" },
    { stat: "Inconsistent", label: "follow-up means qualified leads leak from the funnel" },
  ],
  thesis:
    "AlwaysOn AI is not a chatbot or a voice bot. It is a workforce of autonomous agents that handle conversations, take action in systems, escalate intelligently and improve over time.",
};

export const capabilities: Capability[] = [
  {
    id: "listen",
    verb: "LISTEN",
    title: "Hear every channel",
    description: "Answer inbound calls, return missed calls and respond to SMS in real time — with natural tone, pacing and language.",
    voice: "Handles inbound and outbound calls with barge-in, pause handling and multilingual support.",
    sms: "Reads incoming messages, detects intent and replies instantly without templates that feel robotic.",
  },
  {
    id: "understand",
    verb: "UNDERSTAND",
    title: "Decode intent and context",
    description: "Go beyond keywords. Agents understand what the customer wants, what they have already said and what should happen next.",
    voice: "Intent recognition, entity extraction, sentiment and caller history in one context window.",
    sms: "Thread-aware replies that reference prior messages, bookings and purchases.",
  },
  {
    id: "reason",
    verb: "REASON",
    title: "Think before acting",
    description: "Agents reason through business rules, availability, priorities and next-best-actions before responding.",
    voice: "Checks calendars, stock, job status and eligibility before making commitments.",
    sms: "Routes complex requests to the right workflow or human based on urgency and value.",
  },
  {
    id: "respond",
    verb: "RESPOND",
    title: "Speak like your best team member",
    description: "Conversations feel human because they are grounded in your brand voice, knowledge base and real business data.",
    voice: "Warm, natural voice with custom persona, pronunciation and hold-music-free experiences.",
    sms: "Concise, on-brand messages with smart formatting and clear next steps.",
  },
  {
    id: "act",
    verb: "ACT",
    title: "Execute inside your systems",
    description: "Book, update, create, notify and charge — directly inside the tools the business already uses.",
    voice: "Takes bookings, confirms payments and updates CRM records during the call.",
    sms: "Sends payment links, reminders, quotes and forms, then records outcomes automatically.",
  },
  {
    id: "follow-up",
    verb: "FOLLOW UP",
    title: "Never drop the thread",
    description: "Persistent, polite follow-up that keeps customers moving toward a decision, appointment or payment.",
    voice: "Scheduled callback reminders and proactive status updates.",
    sms: "Timed sequences for quotes, appointments, payments and feedback.",
  },
  {
    id: "escalate",
    verb: "ESCALATE",
    title: "Hand off with full context",
    description: "Knows when a human is needed and transfers the conversation with a complete briefing, not a blank screen.",
    voice: "Warm transfer to the right person with spoken summary and screen-pop context.",
    sms: "Flags urgent threads, assigns owners and surfaces them in the operations dashboard.",
  },
  {
    id: "learn",
    verb: "LEARN",
    title: "Improve from every conversation",
    description: "Every interaction feeds a feedback loop that sharpens intent detection, responses and conversion paths.",
    voice: "Call transcripts and outcomes train the model toward higher resolution and lower escalation.",
    sms: "Response effectiveness, drop-off points and conversion are measured and tuned continuously.",
  },
];

export const agentTypes: AgentType[] = [
  {
    id: "receptionist",
    name: "AI Receptionist",
    role: "First point of contact",
    icon: "Phone",
    scenarios: ["Answers every call", "Handles FAQs", "Routes enquiries", "Takes messages"],
    outcomes: ["Zero missed calls", "Consistent greeting", "Instant triage"],
  },
  {
    id: "sales",
    name: "Sales Qualifier",
    role: "Qualifies and warms leads",
    icon: "Target",
    scenarios: ["Returns missed calls", "Asks qualifying questions", "Books consultations", "Scores intent"],
    outcomes: ["Faster lead response", "Higher conversion", "Better handoffs"],
  },
  {
    id: "booker",
    name: "Appointment Booker",
    role: "Schedules without back-and-forth",
    icon: "Calendar",
    scenarios: ["Checks live availability", "Confirms appointments", "Sends reminders", "Handles reschedules"],
    outcomes: ["More bookings", "Fewer no-shows", "Less admin"],
  },
  {
    id: "followup",
    name: "Follow-up Agent",
    role: "Keeps opportunities alive",
    icon: "RefreshCw",
    scenarios: ["Quote follow-up", "Proposal reminders", "Feedback collection", "Re-engagement"],
    outcomes: ["Higher close rate", "Shorter sales cycle", "Better retention"],
  },
  {
    id: "payments",
    name: "Payment Agent",
    role: "Collects revenue through conversation",
    icon: "CreditCard",
    scenarios: ["Sends payment links", "Takes phone payments", "Payment reminders", "Installment scheduling"],
    outcomes: ["Faster collections", "Lower arrears", "Cash-flow improvement"],
  },
  {
    id: "support",
    name: "Support Agent",
    role: "Resolves and deflects tickets",
    icon: "Headphones",
    scenarios: ["Status updates", "Troubleshooting", "Warranty checks", "Ticket creation"],
    outcomes: ["Lower ticket volume", "Faster resolution", "Happier customers"],
  },
  {
    id: "retention",
    name: "Recall & Retention Agent",
    role: "Drives repeat business",
    icon: "Heart",
    scenarios: ["Service reminders", "Recall campaigns", "Win-back offers", "Loyalty check-ins"],
    outcomes: ["Higher lifetime value", "Predictable recurring revenue"],
  },
  {
    id: "outbound",
    name: "Outbound Campaigner",
    role: "Proactive engagement at scale",
    icon: "Megaphone",
    scenarios: ["Appointment confirmations", "Promotions", "Surveys", "Event invitations"],
    outcomes: ["Scalable outreach", "Consistent messaging", "Measurable response"],
  },
];

export const decisionLoop = [
  { id: "trigger", label: "Trigger", description: "Inbound call, missed call, SMS or scheduled event" },
  { id: "listen", label: "Listen", description: "Capture voice or text with real-time transcription" },
  { id: "understand", label: "Understand", description: "Identify intent, sentiment, identity and context" },
  { id: "reason", label: "Reason", description: "Apply rules, check systems and decide next-best-action" },
  { id: "act", label: "Act", description: "Book, quote, charge, notify or update records" },
  { id: "confirm", label: "Confirm", description: "Close the loop with the customer clearly" },
  { id: "follow", label: "Follow up", description: "Schedule the next touchpoint automatically" },
  { id: "learn", label: "Learn", description: "Record outcome and improve the model" },
];

export const industries: Industry[] = [
  {
    id: "trades",
    name: "Trades & home services",
    useCases: [
      { title: "Quote requests", description: "Capture job details, photos and location; book site visits." },
      { title: "After-hours emergencies", description: "Triage urgent calls and dispatch the on-call team." },
      { title: "Payment collection", description: "Send secure links and confirm deposits after a job." },
    ],
    stat: "24/7",
    statLabel: "quote capture",
  },
  {
    id: "healthcare",
    name: "Healthcare & clinics",
    useCases: [
      { title: "Appointment booking", description: "Check provider availability and confirm by SMS." },
      { title: "Reminders & recalls", description: "Reduce no-shows with personalised reminders." },
      { title: "Patient triage", description: "Collect symptoms and route to the right clinician." },
    ],
    stat: "40%",
    statLabel: "no-show reduction",
  },
  {
    id: "automotive",
    name: "Automotive & dealerships",
    useCases: [
      { title: "Service bookings", description: "Schedule service from a missed call or SMS." },
      { title: "Recall campaigns", description: "Proactive outreach with personalised offers." },
      { title: "Sales qualification", description: "Qualify buyers before handing to consultants." },
    ],
    stat: "3×",
    statLabel: "lead response speed",
  },
  {
    id: "professional",
    name: "Professional services",
    useCases: [
      { title: "Client intake", description: "Capture matter details and book consultations." },
      { title: "Document follow-up", description: "Remind clients to return forms or signatures." },
      { title: "Billing reminders", description: "Gentle, persistent payment follow-up." },
    ],
    stat: "60%",
    statLabel: "admin time saved",
  },
  {
    id: "retail",
    name: "Retail & e-commerce",
    useCases: [
      { title: "Order support", description: "Track orders, returns and stock enquiries." },
      { title: "Cart recovery", description: "SMS follow-up for abandoned carts and offers." },
      { title: "Loyalty outreach", description: "Personalised win-back and upsell campaigns." },
    ],
    stat: "25%",
    statLabel: "cart recovery uplift",
  },
  {
    id: "hospitality",
    name: "Hospitality & events",
    useCases: [
      { title: "Reservations", description: "Take bookings and special requests by voice or SMS." },
      { title: "Concierge responses", description: "Answer common questions instantly." },
      { title: "Event follow-up", description: "Confirm attendance and collect feedback." },
    ],
    stat: "50%",
    statLabel: "fewer missed reservations",
  },
];

export const architecture: ArchitectureLayer[] = [
  {
    id: "channels",
    name: "Channels",
    purpose: "Voice and SMS surfaces where customers already communicate.",
    components: ["Inbound / outbound voice", "Missed-call return", "SMS threads", "Click-to-call"],
  },
  {
    id: "conversation",
    name: "Conversation engine",
    purpose: "Real-time speech-to-text, natural language understanding and response generation.",
    components: ["ASR / STT", "Intent & entity recognition", "LLM reasoning", "TTS voice synthesis", "Barge-in handling"],
  },
  {
    id: "memory",
    name: "Memory & context",
    purpose: "Every interaction is informed by history, identity and business rules.",
    components: ["Customer profile", "Conversation history", "Knowledge base", "Business rules"],
  },
  {
    id: "actions",
    name: "Action layer",
    purpose: "Agents execute tasks inside business systems instead of just answering questions.",
    components: ["CRM updates", "Booking APIs", "Payment gateways", "Ticketing", "Notifications", "Human escalation"],
  },
  {
    id: "intelligence",
    name: "AI & governance",
    purpose: "Continuous improvement with guardrails, observability and compliance.",
    components: ["Model fine-tuning", "Prompt versioning", "Safety filters", "Audit logs", "Analytics"],
  },
];

export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: "Reactive",
    tagline: "Answer the call",
    voice: "Simple IVR-style routing and voicemail replacement.",
    sms: "Auto-replies with business hours and links.",
    systems: "Standalone; limited system integration.",
  },
  {
    level: 2,
    name: "Informative",
    tagline: "Handle the FAQs",
    voice: "Answers common questions and captures messages with context.",
    sms: "Two-way responses for status, hours and basic enquiries.",
    systems: "Connected to knowledge base and CRM read access.",
  },
  {
    level: 3,
    name: "Conversational",
    tagline: "Hold real dialogue",
    voice: "Natural back-and-forth, interruptions and multilingual support.",
    sms: "Thread-aware, personalised SMS conversations.",
    systems: "Bi-directional sync with calendar and CRM.",
  },
  {
    level: 4,
    name: "Actionable",
    tagline: "Execute workflows",
    voice: "Books, quotes, takes payments and escalates during the call.",
    sms: "Sends payment links, forms and reminders with closed-loop outcomes.",
    systems: "Deep integration with booking, payments and ticketing.",
  },
  {
    level: 5,
    name: "Autonomous",
    tagline: "Self-improving workforce",
    voice: "Proactive outreach, predictive engagement and continuous optimisation.",
    sms: "Campaign orchestration with learning-driven personalisation.",
    systems: "Full platform orchestration with analytics and governance.",
  },
];

export const trustPillars = [
  {
    title: "Human handoff",
    description: "Agents know their limits. Complex, emotional or high-value conversations are escalated with full context.",
  },
  {
    title: "Brand voice control",
    description: "Tone, language, greetings and guardrails are configured to match the business, not a generic bot.",
  },
  {
    title: "Data privacy",
    description: "Conversations are encrypted, logged and handled under strict privacy and retention policies.",
  },
  {
    title: "Transparent AI",
    description: "Every call and message is reviewable. Business owners see exactly what the agent said and did.",
  },
  {
    title: "Measured outcomes",
    description: "Performance is tracked against business metrics: conversion, bookings, collections and customer satisfaction.",
  },
];

export const valueModel = {
  baseline: {
    monthlyCalls: 800,
    missedRate: 0.35,
    avgJobValue: 450,
    conversionRate: 0.22,
    hourlyAdminCost: 55,
    adminHoursPerWeek: 18,
  },
  levers: [
    { id: "missed", label: "Missed-call capture", rate: 0.6, appliesTo: "missed" },
    { id: "conversion", label: "Faster response → conversion", rate: 0.15, appliesTo: "total" },
    { id: "admin", label: "Admin hours saved", rate: 0.4, appliesTo: "admin" },
  ],
};

export const faqs: Faq[] = [
  {
    question: "Is this just a chatbot or voice bot?",
    answer:
      "No. AlwaysOn AI agents are outcome-oriented. They can hold natural conversations, take action in business systems, escalate intelligently and improve over time. The goal is not deflection — it is resolution, booking and revenue capture.",
  },
  {
    question: "Can the agent sound like our business?",
    answer:
      "Yes. We configure the agent's tone, greetings, scripts, pronunciation and escalation rules to match your brand. It can be warm and conversational, professional and concise, or anything in between.",
  },
  {
    question: "What systems can it integrate with?",
    answer:
      "AlwaysOn AI connects to CRMs, booking platforms, payment gateways, ticketing systems and custom databases through APIs. If a system has an endpoint, the agent can read from it and write to it.",
  },
  {
    question: "How does escalation work?",
    answer:
      "The agent recognises escalation triggers — complex requests, frustrated callers, high-value opportunities or rules you define. It transfers the call or assigns the SMS thread to the right person with a full transcript and context summary.",
  },
  {
    question: "Is customer data secure?",
    answer:
      "Yes. Conversations are encrypted in transit and at rest, access is controlled and logged, and retention policies are configured to meet your compliance requirements.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "A typical pilot is live within 2–4 weeks: discovery, voice/SMS configuration, knowledge-base setup, system integrations and a staged rollout. We start narrow, prove value, then expand.",
  },
];

export const manifesto = {
  title: "Your business. Always on.",
  paragraphs: [
    "The best businesses are present when their customers need them — not just during office hours.",
    "Prism AlwaysOn AI gives every business an intelligent workforce that answers, understands, reasons, acts and follows up. It works across voice and SMS, inside the tools you already use, with the guardrails and brand voice you define.",
    "This is not automation for its own sake. It is a measurable extension of your team that turns missed calls and quiet hours into captured opportunities.",
  ],
};
