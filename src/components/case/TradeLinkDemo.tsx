import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecisionTrace, DemoBadge, HumanApproval } from "@/components/case/Kit";

const trades = [
  { name: "Plumber", service: "Hot water system inspection", enquiry: "Hi, my hot water system has stopped working.", qualification: "It’s electric, in Kew. Today would be ideal. I can share a photo.", reply: "Sorry to hear that. Is the system electric, gas or solar? What suburb are you in, and how urgent is it?", booking: "Today · 2:30pm", scope: "Inspect system; repair subject to approval" },
  { name: "Electrician", service: "Three ceiling fans", enquiry: "I need three ceiling fans installed.", qualification: "Three fans, a house in Kew, existing wiring. Next week please.", reply: "Could you confirm your property type, suburb, existing wiring and preferred date? Photos can help the electrician prepare an estimate.", booking: "Next week · 9–11am", scope: "Assess wiring and installation requirements" },
  { name: "Carpenter", service: "Deck repair inspection", enquiry: "I need a deck repaired.", qualification: "Around 20 square metres in Kew, with damaged boards. I can send photos.", reply: "What is the approximate deck size, damage and location? Share photos and a preferred inspection date if available.", booking: "Friday · 10–11am", scope: "Site inspection before repair quote" },
];

const stages = [
  { name: "Enquiry", message: "Hi, our kitchen tap is leaking. Are you available in Richmond tomorrow?", reply: "I can help arrange that. Is the leak under the sink or at the tap? Please share a photo if you can.", status: "New enquiry", signal: "Service intent, suburb and urgency extracted from the conversation.", action: "Capture a lead; ask for missing job details.", check: "Contact consent and service-area checks", record: [["Job", "TL-1042"], ["Service", "Plumbing · leaking tap"], ["Location", "Richmond, VIC"], ["Owner", "Unassigned"]] },
  { name: "Qualification", message: "It’s at the base of the tap. I’ve attached a photo. Tomorrow morning would be ideal.", reply: "Thanks. Your details are ready for the plumber’s review. No emergency hazard has been reported.", status: "Qualified · review pending", signal: "The photo and description suggest a tap repair, but diagnosis stays with the qualified tradesperson.", action: "Prepare a scoped job summary for owner review.", check: "Required fields and emergency escalation rules", record: [["Job", "TL-1042"], ["Scope", "Tap repair · provisional"], ["Evidence", "Photo + customer description"], ["Owner", "Business owner"]] },
  { name: "Quote", message: "Can you send me the scope before booking?", reply: "Your plumber has reviewed the request. The quote includes the agreed scope and exclusions. Please confirm acceptance before we book.", status: "Quote · awaiting acceptance", signal: "A draft quote is assembled from approved service templates; the owner approves scope and terms.", action: "Send the reviewed quote and record customer acceptance.", check: "Approved scope, exclusions and quote version", record: [["Job", "TL-1042"], ["Quote", "Q-1042 · reviewed"], ["Terms", "Owner-approved"], ["Acceptance", "Pending"]] },
  { name: "Booking", message: "I accept the scope. Please book tomorrow morning.", reply: "Confirmed: tomorrow, 9–11am. Your plumber will message when on the way. Would you like a reminder?", status: "Booked · assigned", signal: "The requested window is matched against the illustrative calendar and travel area.", action: "Reserve the slot, assign the job and send a consented reminder.", check: "Quote acceptance, availability and assignment", record: [["Job", "TL-1042"], ["Window", "Tomorrow · 9–11am"], ["Assigned to", "Demo technician 01"], ["Reminder", "Opted in"]] },
  { name: "Follow up", message: "Thank you for the service. Everything is working.", reply: "Thank you. Would you like to share a review of your experience? Your service history has been updated.", status: "Follow-up · review invited", signal: "A completion event creates a service follow-up; review requests respect messaging consent and policy controls.", action: "Request feedback without sending unconsented marketing.", check: "Completion event, message purpose and consent", record: [["Job", "TL-1042"], ["Review", "Invitation prepared"], ["History", "Completion attached"], ["Messaging", "Consent checked"]] },
  { name: "Job completed", message: "The plumber has finished and the tap is working. Thank you!", reply: "Your completion summary is ready. Please check the work details; any variation requires your approval.", status: "Completed · evidence saved", signal: "The technician’s completion note and customer confirmation are attached to the job record.", action: "Validate completion details before preparing the invoice.", check: "Completion evidence and variation approval", record: [["Job", "TL-1042"], ["Completion", "Customer confirmed"], ["Variation", "None recorded"], ["Evidence", "Technician note"]] },
  { name: "Payment", message: "Please send the invoice.", reply: "Your invoice is ready. In a connected deployment, a secure provider-hosted payment link would appear here.", status: "Payment · simulated confirmation", signal: "Payment status would come from a verified payment-provider event, never from a customer message alone.", action: "Simulate reconciliation against the correct invoice.", check: "Verified provider event and invoice reference", record: [["Job", "TL-1042"], ["Invoice", "INV-1042"], ["Payment", "Simulated · no funds moved"], ["Reconciliation", "Demo matched"]] },
  { name: "Repeat customer", message: "Yes, a reminder for future maintenance would be helpful.", reply: "Your preference is saved in this demonstration. You can withdraw consent at any time.", status: "Relationship · opted in", signal: "Customer history, completed work and communication preferences form a permissioned service record.", action: "Prepare a relevant follow-up, subject to recorded consent.", check: "Purpose-specific consent and opt-out rules", record: [["Job", "TL-1042 · closed"], ["History", "One completed service"], ["Follow-up", "Maintenance reminder"], ["Consent", "Explicit opt-in"]] },
];

export function TradeLinkDemo() {
  const [active, setActive] = useState(0);
  const [tradeIndex, setTradeIndex] = useState(0);
  const [quoteState, setQuoteState] = useState("Awaiting acceptance");
  const trade = trades[tradeIndex];
  const order = [0, 1, 3, 2, 6, 5, 4, 7];
  const sourceIndex = order[active];
  const source = sourceIndex === undefined ? undefined : stages[sourceIndex];
  if (!source || !trade) return null;
  const stage = { ...source, message: active === 0 ? trade.enquiry : active === 1 ? trade.qualification : active === 2 ? `Please book ${trade.booking.toLowerCase()}.` : source.message, reply: active === 0 ? trade.reply : active === 2 ? `Your illustrative appointment is confirmed: ${trade.booking}.` : source.reply, record: source.record.map(([label, value]) => [label, label === "Service" ? trade.service : label === "Scope" ? trade.scope : label === "Location" ? "Kew, VIC · synthetic" : label === "Window" ? trade.booking : label === "Acceptance" ? quoteState : value]) };
  const labels = ["Engage", "Qualify", "Book", "Quote", "Pay", "Deliver", "Follow up", "Retain"];
  return (
    <div className="space-y-6">
      <DemoBadge label="Illustrative demo — synthetic data" />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Business type">{trades.map((t, i) => <Button key={t.name} aria-pressed={tradeIndex === i} variant={tradeIndex === i ? "default" : "outline"} className="min-h-11" onClick={() => { setTradeIndex(i); setActive(0); setQuoteState("Awaiting acceptance"); }}>{t.name}</Button>)}</div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="TradeLink journey">
        {labels.map((label, i) => <Button key={label} role="tab" aria-selected={i === active} variant={i === active ? "default" : "outline"} onClick={() => setActive(i)} className="min-h-11 shrink-0"><span className="text-xs opacity-60">0{i + 1}</span>{label}</Button>)}
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border-strong bg-surface p-2">
          <div className="overflow-hidden rounded-2xl bg-background">
            <div className="flex items-center gap-3 border-b border-border p-5"><MessageCircle className="h-6 w-6 text-prism-5" /><div><p className="font-display text-sm font-semibold">TradeLink · demo business</p><p className="mt-1 text-xs text-muted-foreground">WhatsApp-first service journey</p></div></div>
            <div className="flex min-h-80 flex-col justify-center gap-5 p-4" role="log" aria-live="polite">
              <div className="ml-6 rounded-lg rounded-br-none bg-prism-5 p-4 text-sm leading-relaxed text-background">{stage.message}<CheckCheck className="ml-auto mt-2 h-4 w-4" aria-label="Delivered" /></div>
              <div className="mr-6 rounded-lg rounded-bl-none border border-border bg-surface p-4 text-sm leading-relaxed">{stage.reply}</div>
              <p className="flex items-center justify-center gap-2 text-xs text-prism-5"><Check className="h-3 w-3 shrink-0" />{stage.status}</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 space-y-6" aria-live="polite">
          <div className="border-b border-border pb-6"><p className="eyebrow">Behind the conversation · 0{active + 1}</p><h3 className="mt-3 font-display text-2xl">{labels[active]} · {trade.name}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stage.signal}</p></div>
          <dl className="grid gap-x-6 sm:grid-cols-2">{stage.record.map(([label, value]) => <div key={label} className="border-b border-border py-3"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 text-sm font-medium">{value}</dd></div>)}</dl>
          <p className="text-sm"><span className="text-prism-5">Next action · </span>{stage.action}</p>
          {active === 3 ? <div className="border-y border-border py-4"><p className="text-sm font-medium">{trade.service} · quote Q-1042</p><p className="mt-2 text-xs text-muted-foreground">{trade.scope}. Terms and any changes require owner approval. No charges or payment processing in this demo.</p><div className="mt-4 flex flex-wrap gap-2"><Button className="min-h-11" onClick={() => setQuoteState("Accepted · payment workflow ready")}>Accept</Button><Button variant="outline" className="min-h-11" onClick={() => setQuoteState("Change requested · owner review")}>Request change</Button><Button variant="outline" className="min-h-11" onClick={() => setQuoteState("Question sent · awaiting owner reply")}>Ask question</Button></div><p role="status" className="mt-3 text-xs text-prism-5">{quoteState}</p></div> : null}
          {active === 1 || active === 3 ? <HumanApproval who="Business owner / qualified tradesperson" reason="Review diagnosis, service scope and commercial terms before sending a quote." state="required" /> : null}
          <DecisionTrace steps={[{ kind: "Trigger", text: stage.message }, { kind: "AI interpretation", text: stage.signal }, { kind: "Deterministic check", text: stage.check }, { kind: "System update", text: `${stage.status}. This demonstration changes only on-screen state.` }, { kind: "Audit record", text: "Link conversation, job record, consent and approval evidence." }]} />
        </div>
      </div>
      <div className="flex justify-between gap-4"><Button variant="outline" className="min-h-11" disabled={active === 0} onClick={() => setActive(active - 1)}><ArrowLeft />Previous</Button><Button className="min-h-11" disabled={active === labels.length - 1} onClick={() => setActive(active + 1)}>Next stage<ArrowRight /></Button></div>
    </div>
  );
}