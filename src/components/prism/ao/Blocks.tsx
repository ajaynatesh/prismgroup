import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Phone, MessageSquare, Clock, Zap, Shield, TrendingUp, Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { problem, capabilities, trustPillars, manifesto } from "@/lib/alwayson";
import { PrismColour } from "@/lib/prism";

const soft = (n: PrismColour, l = 70) => `oklch(${l}% 0.14 var(--prism-hue-${n}))`;
const glow = (n: PrismColour) => `var(--prism-colour-${n})`;

export function ProblemGrid({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/40">The cost of being offline</p>
        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{problem.title}</h3>
        <p className="mx-auto mt-3 max-w-2xl text-white/60">{problem.lead}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problem.pains.map((pain, i) => (
          <motion.div
            key={pain.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center backdrop-blur-sm"
          >
            <div className="mb-2 text-3xl font-bold" style={{ color: glow(colour) }}>{pain.stat}</div>
            <p className="text-sm leading-relaxed text-white/60">{pain.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-sm"
      >
        <p className="text-lg leading-relaxed text-white/80">{problem.thesis}</p>
      </motion.div>
    </div>
  );
}

export function CapabilityMatrix({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/40">Eight agent capabilities</p>
        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">What an AI workforce can do</h3>
      </div>

      <div className="space-y-3">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.06 }}
            className="grid items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm md:grid-cols-[140px_1fr_1fr]"
          >
            <div className="text-lg font-bold uppercase tracking-widest" style={{ color: glow(colour) }}>{cap.verb}</div>
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold"><Phone className="h-3.5 w-3.5" style={{ color: soft(colour) }} /> Voice</div>
              <p className="text-sm text-white/60">{cap.voice}</p>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold"><MessageSquare className="h-3.5 w-3.5" style={{ color: soft(colour) }} /> SMS</div>
              <p className="text-sm text-white/60">{cap.sms}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BeforeAfter({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const before = [
    "Missed calls go to voicemail",
    "After-hours enquiries go cold",
    "Staff spend hours on repetitive calls",
    "Follow-up is inconsistent",
    "Customers wait for answers",
    "Revenue leaks from slow response",
  ];

  const after = [
    "Every call answered or returned instantly",
    "24/7 voice and SMS engagement",
    "AI handles routine conversations",
    "Persistent, polite follow-up sequences",
    "Immediate answers and actions",
    "Faster response → higher conversion",
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/40">Before & after</p>
        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">From missed opportunities to captured revenue</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-white/40">
            <XCircle className="h-5 w-5" /> <span className="text-sm font-semibold uppercase tracking-widest">Before AlwaysOn AI</span>
          </div>
          <ul className="space-y-3">
            {before.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/60">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm" style={{ borderColor: soft(colour, 50) }}>
          <div className="mb-4 flex items-center gap-2" style={{ color: glow(colour) }}>
            <CheckCircle2 className="h-5 w-5" /> <span className="text-sm font-semibold uppercase tracking-widest">With AlwaysOn AI</span>
          </div>
          <ul className="space-y-3">
            {after.map((a) => (
              <li key={a} className="flex items-start gap-3 text-sm text-white/80">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: soft(colour) }} />
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export function TrustPillars({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/40">Trust & governance</p>
        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Built to be safe, brand-aligned and measurable</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trustPillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: soft(colour, 80) }}>
              <Shield className="h-4 w-4" style={{ color: "black" }} />
            </div>
            <h5 className="mb-2 text-base font-semibold">{p.title}</h5>
            <p className="text-sm leading-relaxed text-white/60">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ValueBlocks({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const blocks = [
    { icon: Clock, title: "Always available", description: "Answer and act 24/7 without adding headcount or shift work." },
    { icon: TrendingUp, title: "Capture revenue", description: "Recapture missed calls, respond faster and convert more enquiries." },
    { icon: Users, title: "Free your team", description: "Move people from repetitive calls to high-value work and relationships." },
    { icon: Zap, title: "Scale instantly", description: "Handle spikes, campaigns and seasonality without hiring or training lag." },
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: soft(colour, 80) }}>
              <b.icon className="h-5 w-5" style={{ color: "black" }} />
            </div>
            <h4 className="mb-2 text-lg font-semibold">{b.title}</h4>
            <p className="text-sm leading-relaxed text-white/60">{b.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Manifesto({ colour }: { colour: PrismColour }) {
  return (
    <div className="mx-auto w-full max-w-3xl text-center">
      <h3 className="mb-6 text-3xl font-semibold tracking-tight md:text-5xl" style={{ color: glow(colour) }}>{manifesto.title}</h3>
      <div className="space-y-4">
        {manifesto.paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-white/70 md:text-xl">{p}</p>
        ))}
      </div>
    </div>
  );
}
