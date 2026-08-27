import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight, Check, Phone, Smartphone, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import {
  businessActions,
  customerActions,
  customerProfile,
  frontDesk,
  ownerHats,
  patchwork,
  paymentCapabilities,
  paymentChain,
  qualifyQuestions,
  thesis,
  tradeTypes,
  trustPillars,
  valueDimensions,
  valueLevers,
  whyTradeLink,
  TL_COLOUR,
  tlAccent,
} from "@/lib/tradelink";

const soft = (pct: number) => `color-mix(in oklab, ${tlAccent} ${pct}%, transparent)`;

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}

function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] tracking-tight",
        active ? "text-foreground" : "border-border text-muted-foreground",
      )}
      style={active ? { borderColor: soft(45), background: soft(10) } : undefined}
    >
      {children}
    </span>
  );
}

function Chain({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ol className="space-y-0">
      {items.map((item, i) => (
        <li key={item}>
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
            className="rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm tracking-tight"
          >
            <span className="mr-2.5 text-[0.625rem] tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </motion.div>
          {i < items.length - 1 ? (
            <div className="flex h-4 items-center justify-center" aria-hidden="true">
              <ArrowRight className="h-3 w-3 -rotate-90" style={{ color: soft(80) }} />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** 2. The owner-hat problem. */
export function MarketProblem() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-2">
      <Panel>
        <p className="eyebrow">The problem</p>
        <h3 className="display-sm mt-4">The small-business owner wears every hat.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Sales, scheduling, quoting, customer service, collections and admin all flow through one person — usually on
          their personal phone, across disconnected apps and messages.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {ownerHats.map((h) => (
            <Tag key={h}>{h}</Tag>
          ))}
        </div>
      </Panel>
      <Panel>
        <p className="eyebrow">The patchwork</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {patchwork.map((p) => (
            <Tag key={p} active={p === "WhatsApp"}>
              {p}
            </Tag>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          WhatsApp is already where customers are. The opportunity is to make it the business system, not just another
          inbox.
        </p>
      </Panel>
    </Reveal>
  );
}

/** 3. Thesis blocks. */
export function ThesisBlocks() {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {thesis.map((t, i) => (
          <motion.div
            key={t.title}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
            className="panel p-6"
          >
            <div
              className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{ borderColor: soft(45), background: soft(10) }}
            >
              {i === 0 ? <Smartphone className="h-4 w-4" style={{ color: tlAccent }} /> : i === 1 ? <Phone className="h-4 w-4" style={{ color: tlAccent }} /> : <Wallet className="h-4 w-4" style={{ color: tlAccent }} />}
            </div>
            <h3 className="font-display text-base font-semibold tracking-tight">{t.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
          </motion.div>
        ))}
      </div>
    </Reveal>
  );
}

/** 5. Customer + business actions. */
export function ActionCloud() {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2">
      <Panel>
        <p className="eyebrow">Customer can</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {customerActions.map((a) => (
            <Tag key={a} active>
              {a}
            </Tag>
          ))}
        </div>
      </Panel>
      <Panel>
        <p className="eyebrow">Business can</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {businessActions.map((a) => (
            <Tag key={a} active>
              {a}
            </Tag>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}

/** 7. Qualification. */
export function QualificationBlock() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow">Qualification</p>
        <h3 className="display-sm mt-4">Capture what matters, automatically.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          TradeLink asks the questions a good receptionist would ask — service, location, urgency, timing, photos — and
          structures the answer into a lead record.
        </p>
      </div>
      <div className="panel p-6">
        <ul className="space-y-2">
          {qualifyQuestions.map((q, i) => (
            <li key={q} className="flex items-start gap-3 text-sm">
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.625rem] font-medium text-background"
                style={{ background: tlAccent }}
              >
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** 8. Booking + payments. */
export function BookingPayments() {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2">
      <Panel>
        <p className="eyebrow">Bookings</p>
        <div className="mt-5">
          <Chain items={["Service", "Location", "Date", "Time", "Your details", "Confirm"]} />
        </div>
      </Panel>
      <Panel>
        <p className="eyebrow">Payments</p>
        <div className="mt-5">
          <Chain items={paymentChain} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {paymentCapabilities.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
      </Panel>
    </Reveal>
  );
}

/** 9. CRM / customer profile. */
export function CrmBlock() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-2">
      <Panel>
        <p className="eyebrow">CRM</p>
        <h3 className="display-sm mt-4">A customer record built from conversations.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Every message, booking, quote and payment becomes part of a living customer profile — no manual data entry
          required.
        </p>
      </Panel>
      <div className="panel p-6">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold text-background"
            style={{ background: tlAccent }}
          >
            {customerProfile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">{customerProfile.name}</p>
            <p className="text-xs text-muted-foreground">{customerProfile.status} customer</p>
          </div>
        </div>
        <dl className="mt-5 grid gap-2 sm:grid-cols-2">
          {customerProfile.history.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border bg-surface/30 p-3">
              <dt className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-display text-xl font-semibold tracking-tight">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

/** 12. Job management. */
export function JobBoard() {
  return (
    <Reveal>
      <div className="panel p-5">
        <p className="eyebrow">Job board</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="pb-3 font-normal">Customer</th>
                <th className="pb-3 font-normal">Trade</th>
                <th className="pb-3 font-normal">Job</th>
                <th className="pb-3 font-normal">Stage</th>
              </tr>
            </thead>
            <tbody>
              {tradeTypes.slice(0, 6).map((trade, i) => (
                <tr key={trade} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium">{["J. Smith", "A. Patel", "M. Nguyen", "L. Rossi", "T. Brown", "S. Kaur"][i]}</td>
                  <td className="py-3 text-muted-foreground">{trade}</td>
                  <td className="py-3 text-muted-foreground">
                    {["Power fault", "Hot water unit", "Deck rebuild", "Garden refresh", "Split system service", "End of lease"][i]}
                  </td>
                  <td className="py-3">
                    <Tag active>{["On the way", "In progress", "Booking", "Completed", "Paid", "Review"][i]}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

/** 13. Follow-up. */
export function FollowUpBlock() {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2">
      <Panel>
        <p className="eyebrow">Quote follow-up</p>
        <div className="mt-5">
          <Chain items={["Quote sent", "No response", "Follow-up", "Still no response", "Reminder", "Final follow-up"]} />
        </div>
      </Panel>
      <Panel>
        <p className="eyebrow">Service follow-up</p>
        <div className="mt-5">
          <Chain items={["Job completed", "Thank you", "Review request", "Referral request", "Next service reminder", "Repeat business"]} />
        </div>
      </Panel>
    </Reveal>
  );
}

/** 17. AI behind the conversation. */
export function AiBehind() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow">Intelligence</p>
        <h3 className="display-sm mt-4">AI works behind the chat.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The customer sees a simple WhatsApp message. Behind it, AI extracts details, classifies intent, suggests next
          actions and keeps the workflow moving.
        </p>
      </div>
      <div className="panel p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Lead qualification",
            "Information extraction",
            "Conversation summarisation",
            "Customer classification",
            "Next-best action",
            "Document extraction",
            "FAQ responses",
            "Booking assistance",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 rounded-lg border border-border bg-surface/30 px-3 py-2 text-sm">
              <Check className="h-3.5 w-3.5 shrink-0" style={{ color: tlAccent }} aria-hidden="true" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** 20. Team roles. */
export function TeamRoles() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Owner", copy: "Sees everything. Steps in when it matters." },
          { title: "Admin", copy: "Handles bookings, documents and payment follow-up." },
          { title: "Sales", copy: "Picks up quotes and high-value enquiries." },
          { title: "Technician", copy: "Gets the job, the address and the context." },
          { title: "Customer service", copy: "Answers questions and manages changes." },
        ].map((r) => (
          <div key={r.title} className="panel p-5">
            <p className="font-display text-sm font-semibold tracking-tight">{r.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 24. Digital front desk. */
export function FrontDesk() {
  return (
    <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="eyebrow">Digital front desk</p>
        <h3 className="display-sm mt-4">Everything a receptionist does, in one thread.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          TradeLink handles the repetitive front-of-house work so the owner can focus on the job, not the inbox.
        </p>
      </div>
      <div className="panel p-6">
        <div className="flex flex-wrap gap-2">
          {frontDesk.map((f) => (
            <Tag key={f} active>
              {f}
            </Tag>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** 28. Value levers. */
export function ValueLevers() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {valueLevers.map((v) => (
          <div key={v.title} className="panel p-6">
            <p className="font-display text-base font-semibold tracking-tight">{v.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 29. Value dimensions. */
export function ValueDimensions() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {valueDimensions.map((d) => (
          <div key={d.title} className="panel p-5">
            <p className="eyebrow">{d.title}</p>
            <div className="mt-4 space-y-3">
              {d.up.length ? (
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Up</p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {d.up.map((u) => (
                      <li key={u}>
                        <Tag active>{u}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {d.down.length ? (
                <div>
                  <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">Down</p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {d.down.map((x) => (
                      <li key={x}>
                        <Tag>{x}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 31. Trust pillars. */
export function TrustPillars() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trustPillars.map((p) => (
          <div key={p.title} className="panel p-5">
            <p className="font-display text-sm font-semibold tracking-tight">{p.title}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 33. Why TradeLink. */
export function WhyTradeLink() {
  return (
    <Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {whyTradeLink.map((w) => (
          <div key={w.title} className="panel p-5">
            <p className="font-display text-sm font-semibold tracking-tight">{w.title}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{w.copy}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 35. Manifesto. */
export function Manifesto() {
  return (
    <Reveal>
      <div
        className="rounded-2xl border p-8 text-center md:p-14"
        style={{ borderColor: soft(45), background: soft(8) }}
      >
        <h3 className="display-md">Your business. In your pocket.</h3>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          TradeLink turns the channel customers already use into the operating system a mobile-first business needs —
          without adding complexity, cost or another app to manage.
        </p>
      </div>
    </Reveal>
  );
}
