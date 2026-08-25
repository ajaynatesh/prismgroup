export const TL_COLOUR = 5 as const;
export const tlAccent = `var(--prism-colour-${TL_COLOUR})`;

export type ChatMsg = {
  from: "customer" | "business" | "system";
  text?: string;
  buttons?: string[];
  card?: { title: string; rows: [string, string][]; actions?: string[] };
  attachment?: string;
};

/** 1. Hero conversation */
export const heroThread: ChatMsg[] = [
  { from: "customer", text: "Hi, can you give me a quote for a bathroom renovation?" },
  {
    from: "business",
    text: "Absolutely. What type of work do you need?",
    buttons: ["Renovation", "Repair", "New installation"],
  },
  { from: "customer", text: "Renovation" },
  {
    from: "business",
    text: "Great. When would you like us to visit?",
    buttons: ["Tomorrow", "This week", "Choose date"],
  },
  { from: "customer", text: "This week" },
  { from: "system", text: "Booking confirmed — Thursday, 9:30 AM" },
  {
    from: "business",
    card: {
      title: "Estimate — Bathroom renovation",
      rows: [
        ["Scope", "Full renovation, 1 bathroom"],
        ["Site visit", "Thursday 9:30 AM"],
        ["Estimate", "$14,800 – $17,200"],
        ["Valid until", "30 days"],
      ],
      actions: ["Accept quote", "Ask a question"],
    },
  },
  { from: "system", text: "Payment link sent — 10% deposit" },
  { from: "system", text: "Job confirmed. Added to the schedule." },
];

/** 2. Market problem */
export const ownerHats = [
  "Salesperson",
  "Receptionist",
  "Scheduler",
  "Estimator",
  "Customer service",
  "Collections",
  "Administrator",
  "CRM",
];

export const patchwork = [
  "WhatsApp",
  "Phone calls",
  "SMS",
  "Email",
  "Paper",
  "Notes",
  "Spreadsheets",
  "Calendar",
  "Banking apps",
];

export const frictionChain = [
  "Customer message",
  "Owner's phone",
  "Manual response",
  "Note",
  "Calendar",
  "Quote",
  "Follow-up",
  "Payment",
  "Spreadsheet",
  "More messages",
];

/** 3. Thesis */
export const thesis = [
  {
    title: "WhatsApp-first",
    copy: "The conversation is the interface. No new app for the customer to learn, download or log into.",
  },
  {
    title: "Mobile-first",
    copy: "No desktop dependency. The business runs from the same phone that's already in the owner's pocket.",
  },
  {
    title: "Business-first",
    copy: "Every interaction should move the business forward — a lead, a booking, a quote, a payment, a repeat customer.",
  },
];

/** 4. Business loop */
export const businessLoop = [
  { key: "attract", title: "Attract", copy: "Customer finds the business — ad, QR code, website, van, referral." },
  { key: "engage", title: "Engage", copy: "The customer starts a WhatsApp conversation. No form, no wait." },
  { key: "qualify", title: "Qualify", copy: "TradeLink captures the information the business needs to respond properly." },
  { key: "book", title: "Book", copy: "Appointment, site visit or service booked straight from the chat." },
  { key: "quote", title: "Quote", copy: "Quote or estimate sent as a structured message the customer can accept." },
  { key: "pay", title: "Pay", copy: "Deposit or payment requested through a secure payment link." },
  { key: "deliver", title: "Deliver", copy: "The job runs. Status updates flow back into the conversation." },
  { key: "followup", title: "Follow up", copy: "Thank you, review request, next-service reminder — automatically." },
  { key: "retain", title: "Retain", copy: "The customer becomes a relationship, not a one-off transaction." },
];

/** 5. Interface actions */
export const customerActions = ["Book", "Quote", "Order", "Pay", "Reschedule", "Upload", "Confirm", "Ask", "Review"];
export const businessActions = ["Capture", "Qualify", "Assign", "Follow up", "Remind", "Collect", "Upsell", "Retain"];

/** 6. Lead capture */
export const leadFields: [string, string][] = [
  ["Name", "John Smith"],
  ["Phone", "+61 4•• ••• 219"],
  ["Service", "Electrical — power fault"],
  ["Location", "Glen Waverley, VIC"],
  ["Preferred time", "Today, after 3 PM"],
  ["Urgency", "High"],
  ["Job details", "Half the house has no power since this morning"],
];

export const leadStages = ["New", "Qualified", "Quoted", "Booked", "Won"];

/** 7. Qualification */
export const qualifyQuestions = [
  "What service do you need?",
  "Where is the property?",
  "What type of issue are you experiencing?",
  "When would you like us to attend?",
  "Can you send a photo?",
  "What's the best time to contact you?",
];

/** 8. Booking */
export const bookingSteps = ["Service", "Location", "Date", "Time", "Your details", "Confirm"];
export const bookingExtras = [
  "Appointment reminders",
  "Rescheduling",
  "Cancellation",
  "Location and directions",
  "Assigned person",
  "Job details",
];

/** 10. Payments */
export const paymentChain = [
  "Quote accepted",
  "Payment request",
  "Payment link",
  "Payment confirmed",
  "Receipt",
  "Job status updated",
];
export const paymentCapabilities = [
  "Deposits",
  "Full payment",
  "Outstanding balances",
  "Payment reminders",
  "Receipts",
  "Payment status",
];

/** 11. CRM */
export const customerProfile = {
  name: "John Smith",
  status: "Repeat",
  history: [
    ["Conversations", "12"],
    ["Bookings", "4"],
    ["Invoices", "3"],
    ["Completed jobs", "2"],
    ["Outstanding payments", "1"],
  ] as [string, string][],
  details: [
    ["Address", "14 Rosedale Ave, Glen Waverley"],
    ["Preferred service", "Electrical maintenance"],
    ["Last interaction", "3 days ago"],
    ["Last purchase", "Switchboard upgrade"],
    ["Next follow-up", "In 21 days"],
  ] as [string, string][],
  statuses: ["New", "Active", "Repeat", "At risk", "VIP"],
};

/** 12. Job management */
export const jobStages = ["Lead", "Booking", "Assigned", "On the way", "In progress", "Completed", "Paid", "Review"];
export const jobBoard = [
  { customer: "J. Smith", trade: "Electrician", job: "Power fault", stage: "On the way" },
  { customer: "A. Patel", trade: "Plumber", job: "Hot water unit", stage: "In progress" },
  { customer: "M. Nguyen", trade: "Builder", job: "Deck rebuild", stage: "Booking" },
  { customer: "L. Rossi", trade: "Landscaper", job: "Garden refresh", stage: "Completed" },
  { customer: "T. Brown", trade: "HVAC", job: "Split system service", stage: "Paid" },
  { customer: "S. Kaur", trade: "Cleaner", job: "End of lease", stage: "Review" },
];
export const tradeTypes = [
  "Electrician",
  "Plumber",
  "Builder",
  "Landscaper",
  "Cleaner",
  "HVAC",
  "Pest control",
  "Painter",
  "Handyman",
  "Auto service",
  "Beauty",
  "Home services",
];

/** 13. Follow-up */
export const quoteFollowUp = ["Quote sent", "No response", "Follow-up", "Still no response", "Reminder", "Final follow-up"];
export const serviceFollowUp = [
  "Job completed",
  "Thank you",
  "Review request",
  "Referral request",
  "Next service reminder",
  "Repeat business",
];

/** 14. Re-engagement */
export const segments = [
  { title: "Due for service", copy: "Customers whose next service window has arrived." },
  { title: "Haven't returned", copy: "Customers with no activity in the last 12 months." },
  { title: "Quoted, not booked", copy: "Customers who asked for a price and never converted." },
  { title: "One-time customers", copy: "A single job, never followed up." },
  { title: "Upcoming renewals", copy: "Contracts, warranties or recurring services approaching." },
  { title: "Promotion eligible", copy: "Customers who opted in and match the offer." },
];

/** 16. QR use cases */
export const qrUseCases = [
  "Vehicle",
  "Business card",
  "Shopfront",
  "Van",
  "Worksite",
  "Flyer",
  "Invoice",
  "Website",
  "Social media",
];

/** 17. Documents */
export const docTypes = [
  { title: "Photo", copy: "\u201cSend us a photo of the issue.\u201d" },
  { title: "Document", copy: "\u201cSend the site plan.\u201d" },
  { title: "Invoice", copy: "\u201cUpload your previous invoice.\u201d" },
  { title: "Receipt", copy: "\u201cUpload your receipt.\u201d" },
  { title: "Location", copy: "\u201cShare the property location.\u201d" },
  { title: "Job details", copy: "\u201cTell us what needs doing.\u201d" },
];

/** 18. AI behind the conversation */
export const aiTasks = [
  "Lead qualification",
  "Information extraction",
  "Conversation summarisation",
  "Customer classification",
  "Next-best action",
  "Follow-up",
  "Document extraction",
  "FAQ responses",
  "Booking assistance",
  "Customer segmentation",
];

/** 19. Owner dashboard */
export const ownerToday: [string, string][] = [
  ["New leads", "8"],
  ["Bookings", "5"],
  ["Quotes pending", "3"],
  ["Payments outstanding", "2"],
  ["Follow-ups", "4"],
];
export const ownerAttention = [
  "High-value lead waiting 2 hours.",
  "Quote awaiting response since Monday.",
  "Payment overdue — 14 days.",
  "Tomorrow's schedule nearly full.",
];

/** 20. Team */
export const teamRoles = [
  { title: "Owner", copy: "Sees everything. Steps in when it matters." },
  { title: "Admin", copy: "Handles bookings, documents and payment follow-up." },
  { title: "Sales", copy: "Picks up quotes and high-value enquiries." },
  { title: "Technician", copy: "Gets the job, the address and the context." },
  { title: "Customer service", copy: "Answers questions and manages changes." },
];
export const teamCapabilities = [
  "Assignment",
  "Internal notes",
  "Status",
  "Escalation",
  "Conversation history",
  "Customer context",
];

/** 21. Automation */
export const automations = [
  { trigger: "New lead", condition: "Qualified by AI", action: "Create customer", outcome: "Notify owner" },
  { trigger: "Quote accepted", condition: "Deposit required", action: "Create booking", outcome: "Send payment request" },
  { trigger: "Job completed", condition: "Payment settled", action: "Request review", outcome: "Schedule follow-up" },
  { trigger: "Payment overdue", condition: "7 days past due", action: "Send reminder", outcome: "Escalate to owner" },
  { trigger: "No response to quote", condition: "48 hours elapsed", action: "Send follow-up", outcome: "Re-open the lead" },
];

/** 22 & 23. Integrations and stack */
export const integrationTargets = [
  "CRM",
  "Calendar",
  "Payments",
  "Accounting",
  "Job management",
  "Email",
  "Analytics",
  "ERP",
];

export const stack = [
  { index: "01", title: "Conversation", items: ["WhatsApp"] },
  { index: "02", title: "Experience", items: ["Flows", "Buttons", "Forms", "Menus", "Media"] },
  { index: "03", title: "Intelligence", items: ["AI", "Qualification", "Recommendations", "Summaries"] },
  { index: "04", title: "Automation", items: ["Workflows", "Bookings", "Payments", "Follow-ups"] },
  {
    index: "05",
    title: "Integration",
    items: ["CRM", "Calendar", "Accounting", "Payments", "Business systems"],
  },
];

/** 24. Industries */
export const industries = [
  {
    key: "trades",
    title: "Trades",
    copy: "The highest-fit starting market: mobile, quote-driven, job-based work.",
    items: ["Quotes", "Jobs", "Bookings", "Payments", "Photos"],
  },
  {
    key: "home",
    title: "Home services",
    copy: "Recurring, schedule-driven work where reminders drive repeat revenue.",
    items: ["Appointments", "Recurring services", "Customer reminders"],
  },
  {
    key: "auto",
    title: "Automotive",
    copy: "Service bookings and job updates handled without phone tag.",
    items: ["Service bookings", "Quotes", "Job updates", "Follow-ups"],
  },
  {
    key: "prof",
    title: "Professional services",
    copy: "Enquiries, appointments and document exchange in one thread.",
    items: ["Enquiries", "Appointments", "Documents", "Payments"],
  },
  {
    key: "beauty",
    title: "Beauty & wellness",
    copy: "Appointment-led businesses where rebooking is the growth engine.",
    items: ["Bookings", "Reminders", "Rebooking", "Promotions"],
  },
  {
    key: "health",
    title: "Health & wellbeing",
    copy: "General appointment and communication workflows only. Clinical and regulated data workflows require separate assessment — TradeLink is not automatically compliant for clinical information.",
    items: ["Appointments", "Reminders", "Customer communications"],
  },
];

/** 25. Plumber journey */
export const plumberJourney: ChatMsg[] = [
  { from: "customer", text: "Hi, my hot water isn't working." },
  { from: "business", text: "Let's get this sorted. Can you send us a photo of the unit?" },
  { from: "customer", attachment: "Photo — hot water unit", text: "Here you go." },
  { from: "business", text: "Thanks. What's your suburb?" },
  { from: "customer", text: "Ringwood East" },
  { from: "business", text: "How urgent is this?", buttons: ["Emergency", "Today", "This week"] },
  { from: "customer", text: "Today" },
  { from: "system", text: "Lead qualified — hot water, Ringwood East, today" },
  { from: "system", text: "Technician assigned — Dave M." },
  { from: "business", text: "Dave can be there between 2 and 4 PM today. Shall I lock that in?", buttons: ["Confirm", "Choose another time"] },
  { from: "customer", text: "Confirm" },
  { from: "system", text: "Booking confirmed. Technician notified." },
  {
    from: "business",
    card: {
      title: "Quote — Hot water repair",
      rows: [
        ["Callout & diagnosis", "$180"],
        ["Element & thermostat", "$240"],
        ["Labour (1.5 hrs)", "$210"],
        ["Total", "$630 inc. GST"],
      ],
      actions: ["Accept quote", "Ask a question"],
    },
  },
  { from: "customer", text: "Accept quote" },
  { from: "system", text: "Payment link sent — pay on completion" },
  { from: "system", text: "Job completed. Receipt sent." },
  { from: "business", text: "Thanks John. Would you mind leaving a quick review?", buttons: ["Leave review", "Maybe later"] },
  { from: "system", text: "90-day maintenance reminder scheduled" },
];

/** 26/27. Experience contrast */
export const beforeAfter = {
  before: ["Messages", "Calls", "Notes", "Calendar", "Quotes", "Invoices", "Payments", "Follow-ups"],
  after: ["One conversation-led workflow"],
};

/** 28. Value levers */
export const valueLevers = [
  { title: "Respond faster", copy: "More leads converted, because the first reply happens in seconds, not hours." },
  { title: "Book more", copy: "Less friction between \u201chow much?\u201d and a confirmed job in the diary." },
  { title: "Collect faster", copy: "Payment requests, reminders and receipts happen without chasing." },
  { title: "Retain more", copy: "Automated follow-up turns one-off jobs into recurring relationships." },
];

export const valueDimensions = [
  { title: "Revenue", up: ["Conversion", "Repeat business"], down: [] as string[] },
  { title: "Cost", up: [] as string[], down: ["Admin", "Manual follow-up"] },
  { title: "Experience", up: ["Responsiveness", "Convenience"], down: [] as string[] },
  { title: "Productivity", up: ["Jobs handled"], down: ["Owner dependency"] },
];

/** 29. Digital front desk */
export const frontDesk = [
  "Enquiries",
  "Lead qualification",
  "Bookings",
  "Reminders",
  "Quotes",
  "Payments",
  "Follow-ups",
  "Customer information",
];

/** 30. Simple by design */
export const behindTheScenes = ["AI", "APIs", "Automation", "CRM", "Payments", "Analytics", "Integrations"];

/** 31. Trust */
export const trustPillars = [
  { title: "Customer consent", copy: "Opt-in is captured and respected. Business-initiated messaging follows WhatsApp and Meta messaging policies, approved templates and customer opt-out." },
  { title: "Message governance", copy: "Templates, tone and frequency are controlled so customers get relevance, not noise." },
  { title: "Access controls", copy: "Role-based access to conversations, customer records and payment activity." },
  { title: "Conversation history", copy: "A single retained thread per customer, available to the people who need it." },
  { title: "Auditability", copy: "Who changed what, when — across leads, bookings, quotes and payments." },
  { title: "Data protection", copy: "Data handling designed around least privilege and purpose limitation. We do not claim certifications we do not hold." },
  { title: "Human escalation", copy: "Any conversation can be handed to a person at any point. Automation never traps the customer." },
  { title: "Integration controls", copy: "Scoped, revocable connections to the systems the business already runs." },
];

/** 32. Flywheel */
export const flywheel = [
  "More conversations",
  "More leads",
  "More bookings",
  "More transactions",
  "More customer data",
  "Better follow-up",
  "More repeat business",
];

/** 33. Why TradeLink */
export const whyTradeLink = [
  { title: "WhatsApp-first", copy: "Built around the customer's preferred conversation channel." },
  { title: "Mobile-first", copy: "Designed for businesses that operate from the field." },
  { title: "Simple", copy: "No unnecessary complexity, configuration or training." },
  { title: "Intelligent", copy: "AI and automation work behind the scenes, not in the customer's face." },
  { title: "Connected", copy: "Integrates with the systems the business already uses." },
];

/** 34. Comparison */
export const comparison = {
  traditional: ["Download", "Login", "Learn", "Configure", "Navigate", "Update", "Manage"],
  tradelink: ["Message", "Choose", "Confirm", "Book", "Pay", "Done"],
};

/** 39. Demo tabs + 41. FAQ */
export const faqs = [
  {
    q: "Is Prism TradeLink a chatbot?",
    a: "No. A chatbot answers questions. TradeLink connects a WhatsApp conversation to real business actions — a lead record, a booking in the calendar, a quote the customer can accept, a payment request, a customer history and an automated follow-up. The conversation is the interface; the workflow is the product.",
  },
  {
    q: "Do my customers need to download an app or create a login?",
    a: "The core customer experience needs nothing beyond the WhatsApp they already use. Some steps that leave the conversation — for example completing a card payment with a payment provider, or opening a signed document — will follow that provider's own secure flow.",
  },
  {
    q: "Can customers pay inside WhatsApp?",
    a: "TradeLink is designed around secure payment links and integrations with established payment providers. Native in-app payment features exist in parts of the Meta ecosystem but availability varies by market and product configuration, so we design the payment journey to work reliably wherever your business operates.",
  },
  {
    q: "Can TradeLink send messages to past customers?",
    a: "Yes, within WhatsApp's rules. Business-initiated messages use approved message templates and require customer opt-in, with easy opt-out. We build re-engagement around permission, relevance and genuine customer value rather than bulk promotion.",
  },
  {
    q: "Does TradeLink replace my existing systems?",
    a: "It does not need to. TradeLink usually sits in front of what you already run — calendar, accounting, payments, job management or CRM — as the conversational layer between your customers and those systems. Where a business has nothing in place, TradeLink can act as its lightweight lead, booking and customer record.",
  },
  {
    q: "Is TradeLink only for tradies?",
    a: "Trades are the highest-fit initial market because the work is mobile, quote-driven and job-based. The same pattern applies to home services, automotive, professional services, beauty and wellness, and other appointment-led businesses.",
  },
  {
    q: "How does AI fit in?",
    a: "AI works behind the conversation: qualifying leads, extracting details from messages and documents, summarising history, classifying customers, suggesting the next best action and drafting follow-ups. The customer just sees a clear, helpful WhatsApp conversation.",
  },
  {
    q: "What about privacy and regulated industries?",
    a: "TradeLink is built with consent capture, access controls, auditability and human escalation. It is not automatically compliant for clinical or other regulated data — those workflows need a separate assessment before implementation.",
  },
];
