import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Phone, MessageSquare, ArrowRight, TrendingUp, Clock, DollarSign, Users, Calendar, CreditCard, Headphones, Heart, Megaphone, Target, RefreshCw, Zap } from "lucide-react";
import { agentTypes, industries, valueModel, maturityLevels } from "@/lib/alwayson";
import { PrismColour } from "@/lib/prism";

const soft = (n: PrismColour, pct = 70) =>
  `color-mix(in oklab, var(--prism-colour-${n}) ${pct}%, white)`;
const glow = (n: PrismColour) => `var(--prism-colour-${n})`;

const iconMap: Record<string, React.ElementType> = {
  Phone,
  Target,
  Calendar,
  RefreshCw,
  CreditCard,
  Headphones,
  Heart,
  Megaphone,
};

/* =========================================================
   Voice / SMS Simulator
   ========================================================= */
const voiceScript = [
  { speaker: "customer", text: "Hi, I'd like to book a service appointment." },
  { speaker: "agent", text: "Of course. I can check availability right now. What's your registration or phone number?" },
  { speaker: "customer", text: "It's 0408 065 993." },
  { speaker: "agent", text: "Thank you. I found your vehicle. The next available slot is Thursday at 9:30 AM. Shall I book that in?" },
  { speaker: "customer", text: "Yes, please." },
  { speaker: "agent", text: "Done. I'll send a confirmation by SMS. Is there anything else I can help with?" },
];

const smsScript = [
  { speaker: "customer", text: "Can I get a quote for a bathroom renovation?" },
  { speaker: "agent", text: "Absolutely. A few quick questions: what suburb is the property in, and is it a full or partial renovation?" },
  { speaker: "customer", text: "Sydney, full renovation." },
  { speaker: "agent", text: "Thanks. Based on your location and scope, an estimator will visit this week. Would Tuesday 2 PM or Thursday 10 AM suit?" },
  { speaker: "customer", text: "Thursday 10 AM." },
  { speaker: "agent", text: "Booked. You'll receive a calendar invite and a photo-upload link shortly." },
];

export function ConversationSimulator({ colour }: { colour: PrismColour }) {
  const [mode, setMode] = useState<"voice" | "sms">("voice");
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const script = mode === "voice" ? voiceScript : smsScript;

  useEffect(() => {
    if (!inView) return;
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1 >= script.length ? 0 : i + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, [inView, mode, script.length]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-md">
      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-x-0 top-4 mx-auto h-5 w-20 rounded-full bg-black/80" />
        <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-4">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMode("voice")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${mode === "voice" ? "text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
                style={{ background: mode === "voice" ? glow(colour) : undefined }}
              >
                <Phone className="h-3 w-3" /> Voice
              </button>
              <button
                onClick={() => setMode("sms")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${mode === "sms" ? "text-black" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
                style={{ background: mode === "sms" ? glow(colour) : undefined }}
              >
                <MessageSquare className="h-3 w-3" /> SMS
              </button>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40">AlwaysOn AI</span>
          </div>

          {/* Messages */}
          <div className="flex h-[340px] flex-col gap-3 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {script.slice(0, index + 1).map((msg, i) => (
                <motion.div
                  key={`${mode}-${i}`}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.speaker === "agent" ? "self-start rounded-tl-sm bg-white/10 text-white/90" : "self-end rounded-tr-sm text-black"}`}
                  style={msg.speaker === "agent" ? {} : { background: soft(colour, 85) }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: glow(colour) }} />
            <span className="text-xs text-white/40">{mode === "voice" ? "AI agent is listening..." : "Type a message..."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ROI Calculator
   ========================================================= */
export function ROICalculator({ colour }: { colour: PrismColour }) {
  const [monthlyCalls, setMonthlyCalls] = useState(valueModel.baseline.monthlyCalls);
  const [missedRate, setMissedRate] = useState(valueModel.baseline.missedRate * 100);
  const [avgJobValue, setAvgJobValue] = useState(valueModel.baseline.avgJobValue);
  const [conversionRate, setConversionRate] = useState(valueModel.baseline.conversionRate * 100);
  const [adminHours, setAdminHours] = useState(valueModel.baseline.adminHoursPerWeek);

  const missedCalls = Math.round(monthlyCalls * (missedRate / 100));
  const recaptured = Math.round(missedCalls * valueModel.levers[0]!.rate);
  const conversionLift = Math.round(monthlyCalls * (conversionRate / 100) * valueModel.levers[1]!.rate);
  const revenueUplift = (recaptured + conversionLift) * avgJobValue;
  const adminSavings = adminHours * 4.33 * valueModel.baseline.hourlyAdminCost * valueModel.levers[2]!.rate;
  const totalMonthlyImpact = revenueUplift + adminSavings;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: soft(colour, 80) }}>
          <TrendingUp className="h-5 w-5" style={{ color: "black" }} />
        </div>
        <div>
          <h4 className="text-lg font-semibold">Commercial impact model</h4>
          <p className="text-sm text-white/50">Illustrative estimate based on typical small-business assumptions.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Monthly customer calls" value={monthlyCalls} min={100} max={5000} step={50} unit="" onChange={setMonthlyCalls} colour={colour} />
          <Slider label="Missed-call rate" value={missedRate} min={0} max={80} step={5} unit="%" onChange={setMissedRate} colour={colour} />
          <Slider label="Average job / customer value" value={avgJobValue} min={100} max={2000} step={50} unit="$" onChange={setAvgJobValue} colour={colour} />
          <Slider label="Lead-to-job conversion rate" value={conversionRate} min={5} max={60} step={5} unit="%" onChange={setConversionRate} colour={colour} />
          <Slider label="Admin hours per week on calls / messages" value={adminHours} min={0} max={60} step={2} unit="hrs" onChange={setAdminHours} colour={colour} />
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-black/30 p-5">
          <div className="space-y-4">
            <ImpactRow label="Missed calls recaptured" value={recaptured} colour={colour} />
            <ImpactRow label="Additional conversions from faster response" value={conversionLift} colour={colour} />
            <ImpactRow label="Estimated monthly revenue uplift" value={revenueUplift} prefix="$" colour={colour} />
            <ImpactRow label="Admin-hour savings per month" value={adminSavings} prefix="$" colour={colour} />
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-white/50">Estimated total monthly impact</p>
            <p className="mt-1 text-3xl font-bold tracking-tight" style={{ color: glow(colour) }}>
              ${Math.round(totalMonthlyImpact).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, unit, onChange, colour }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void; colour: PrismColour }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-medium" style={{ color: glow(colour) }}>
          {unit === "$" ? `$${value.toLocaleString()}` : `${value}${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-current"
        style={{ accentColor: glow(colour) }}
      />
    </div>
  );
}

function ImpactRow({ label, value, prefix = "", colour }: { label: string; value: number; prefix?: string; colour: PrismColour }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-white/60">{label}</span>
      <span className="font-semibold" style={{ color: soft(colour) }}>
        {prefix}${Math.round(value).toLocaleString()}
      </span>
    </div>
  );
}

/* =========================================================
   Agent Type Selector
   ========================================================= */
export function AgentSelector({ colour }: { colour: PrismColour }) {
  const [active, setActive] = useState(0);
  const agent = agentTypes[active]!;
  const Icon = iconMap[agent.icon] ?? Zap;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-wrap gap-2">
        {agentTypes.map((a, i) => {
          const AIcon = iconMap[a.icon] ?? Zap;
          return (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all ${active === i ? "border-transparent text-black" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
              style={{ background: active === i ? glow(colour) : undefined }}
            >
              <AIcon className="h-3 w-3" /> {a.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: soft(colour, 80) }}>
              <Icon className="h-6 w-6" style={{ color: "black" }} />
            </div>
            <div>
              <h4 className="text-xl font-semibold">{agent.name}</h4>
              <p className="text-sm text-white/50">{agent.role}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Typical scenarios</p>
              <ul className="space-y-2">
                {agent.scenarios.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-white/70">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: soft(colour) }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Outcomes</p>
              <ul className="space-y-2">
                {agent.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-white/70">
                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: soft(colour) }} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   Industry Explorer
   ========================================================= */
export function IndustryExplorer({ colour }: { colour: PrismColour }) {
  const [active, setActive] = useState(0);
  const industry = industries[active]!;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6 flex flex-wrap gap-2">
        {industries.map((ind, i) => (
          <button
            key={ind.id}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${active === i ? "border-transparent text-black" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}
            style={{ background: active === i ? glow(colour) : undefined }}
          >
            {ind.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {industry.useCases.map((uc) => (
          <div key={uc.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <h5 className="mb-2 text-base font-semibold">{uc.title}</h5>
            <p className="text-sm leading-relaxed text-white/60">{uc.description}</p>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <p className="text-4xl font-bold" style={{ color: glow(colour) }}>{industry.stat}</p>
          <p className="mt-1 text-sm uppercase tracking-widest text-white/50">{industry.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Maturity Ladder
   ========================================================= */
export function MaturityLadder({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mx-auto w-full max-w-4xl space-y-3">
      {maturityLevels.map((level, i) => (
        <motion.div
          key={level.level}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1 }}
          className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 md:grid-cols-[120px_1fr]"
        >
          <div>
            <div className="mb-1 text-3xl font-bold" style={{ color: glow(colour) }}>
              L{level.level}
            </div>
            <div className="text-sm font-semibold">{level.name}</div>
            <div className="text-xs text-white/50">{level.tagline}</div>
          </div>
          <div className="grid gap-2 text-sm text-white/60 md:grid-cols-3">
            <div><span className="block text-xs uppercase tracking-widest text-white/40">Voice</span>{level.voice}</div>
            <div><span className="block text-xs uppercase tracking-widest text-white/40">SMS</span>{level.sms}</div>
            <div><span className="block text-xs uppercase tracking-widest text-white/40">Systems</span>{level.systems}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
