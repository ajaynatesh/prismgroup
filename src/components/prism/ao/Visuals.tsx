import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Phone, MessageSquare, Clock, Zap, Headphones, RefreshCw, ArrowUpRight, Mic } from "lucide-react";
import { capabilities, decisionLoop, architecture } from "@/lib/alwayson";
import { PrismColour } from "@/lib/prism";

const soft = (n: PrismColour, l = 70) => `oklch(${l}% 0.14 var(--prism-hue-${n}))`;
const glow = (n: PrismColour) => `var(--prism-colour-${n})`;

export function HeroVisual({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ringScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);

  return (
    <div ref={ref} className="relative flex aspect-square w-full max-w-[560px] items-center justify-center">
      {/* Ambient field */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${soft(colour, 50)} 0%, transparent 70%)` }}
      />

      {/* Rotating outer ring */}
      <motion.div
        className="absolute inset-[8%] rounded-full border"
        style={{
          borderColor: soft(colour, 60),
          opacity: ringOpacity,
          scale: ringScale,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              background: glow(colour),
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translate(50%, -50%)`,
              transformOrigin: "0 0",
              boxShadow: `0 0 12px ${glow(colour)}`,
            }}
          />
        ))}
      </motion.div>

      {/* Middle ring with channel icons */}
      <motion.div
        className="absolute inset-[22%] rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 120, 240].map((deg, i) => (
          <div
            key={i}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translate(130px, -50%)`,
            }}
          >
            {i === 0 ? <Phone className="h-4 w-4" style={{ color: soft(colour) }} /> : i === 1 ? <MessageSquare className="h-4 w-4" style={{ color: soft(colour) }} /> : <Clock className="h-4 w-4" style={{ color: soft(colour) }} />}
          </div>
        ))}
      </motion.div>

      {/* Core */}
      <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-black/60 shadow-2xl backdrop-blur-md">
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-xl"
          style={{ background: `radial-gradient(circle, ${glow(colour)} 0%, transparent 70%)` }}
        />
        <Zap className="relative z-10 h-10 w-10" style={{ color: glow(colour) }} />
      </div>

      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ background: soft(colour) }}
          animate={{
            x: [0, 120 * Math.cos((i * Math.PI) / 2), 0],
            y: [0, 120 * Math.sin((i * Math.PI) / 2), 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function CapabilityRing({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => setActive((a) => (a + 1) % capabilities.length), 2400);
    return () => clearInterval(interval);
  }, [inView]);

  const radius = 220;
  const center = 260;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 520 520" className="h-full w-full">
        {/* Background ring */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <circle cx={center} cy={center} r={radius - 40} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />

        {/* Active arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={glow(colour)}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ pathLength: 1, opacity: 0.6 }}
        />

        {/* Capability nodes */}
        {capabilities.map((cap, i) => {
          const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const isActive = i === active;
          return (
            <g key={cap.id}>
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 28 : 18}
                fill={isActive ? glow(colour) : "rgba(0,0,0,0.5)"}
                stroke={isActive ? glow(colour) : "rgba(255,255,255,0.2)"}
                strokeWidth={1}
                animate={{ r: isActive ? 28 : 18 }}
                transition={{ duration: 0.4 }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
              />
              <text
                x={x}
                y={y + (isActive ? 50 : 38)}
                textAnchor="middle"
                fill={isActive ? "white" : "rgba(255,255,255,0.5)"}
                fontSize={isActive ? 12 : 10}
                fontWeight={isActive ? 600 : 400}
                className="uppercase tracking-widest"
              >
                {cap.verb}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active detail card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-[220px] text-center">
          <motion.h4
            key={capabilities[active].verb}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-xl font-semibold tracking-tight"
          >
            {capabilities[active].title}
          </motion.h4>
          <motion.p
            key={capabilities[active].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm leading-relaxed text-white/60"
          >
            {capabilities[active].description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export function DecisionLoopVisual({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-5xl">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8">
        {decisionLoop.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 }}
            className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
          >
            <div
              className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: glow(colour), color: "black" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h5 className="mb-1 text-sm font-semibold">{step.label}</h5>
            <p className="text-xs leading-relaxed text-white/50">{step.description}</p>
            {i < decisionLoop.length - 1 && (
              <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 lg:block" style={{ background: soft(colour) }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureStack({ colour }: { colour: PrismColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl space-y-3">
      {architecture.map((layer, i) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
              style={{ background: soft(colour, 80), color: "black" }}
            >
              {i + 1}
            </div>
            <h4 className="text-lg font-semibold">{layer.name}</h4>
          </div>
          <p className="mb-3 text-sm text-white/60">{layer.purpose}</p>
          <div className="flex flex-wrap gap-2">
            {layer.components.map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AvailabilityGap({ colour }: { colour: PrismColour }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const businessHours = hours.filter((h) => h >= 9 && h < 17);
  const afterHours = hours.filter((h) => !businessHours.includes(h));

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">The 24-hour opportunity gap</h4>
          <p className="text-sm text-white/60">Most businesses are only responsive for one third of the day.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-white/20" />
            <span>Team available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ background: glow(colour) }} />
            <span>AlwaysOn AI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-24 gap-1">
        {hours.map((h) => {
          const isBusiness = businessHours.includes(h);
          const label = h === 0 ? "12am" : h === 12 ? "12pm" : h < 12 ? `${h}am` : `${h - 12}pm`;
          return (
            <div key={h} className="flex flex-col items-center gap-1">
              <div
                className="h-16 w-full rounded-sm"
                style={{ background: isBusiness ? "rgba(255,255,255,0.15)" : glow(colour), opacity: isBusiness ? 1 : 0.7 }}
              />
              {h % 3 === 0 && <span className="text-[10px] text-white/40">{label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
