import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const stages = ["Signals", "Intelligence", "Action", "Outcomes"] as const;

/** Signal nodes on the left, feeding four staged columns. */
const signals = [40, 92, 144, 196, 248];
const columnX = [92, 186, 280, 372];

/**
 * A living representation of the Prism ecosystem: Australian business signals
 * move through the intelligence layer into action and measurable outcomes.
 * GPU-friendly (opacity/transform only) with a static reduced-motion fallback.
 */
export function EcosystemPulse({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("panel relative aspect-4/3 overflow-hidden", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          background:
            "radial-gradient(60% 70% at 20% 30%, var(--accent-electric), transparent 70%), radial-gradient(55% 70% at 85% 75%, var(--accent-emerald), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 420 300"
        className="relative h-full w-full"
        role="img"
        aria-label="Australian business signals flowing through the Prism intelligence layer into action and measurable outcomes"
      >
        <defs>
          <linearGradient id="pulse-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* stage rails */}
        {columnX.map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="34"
            x2={x}
            y2="266"
            stroke="currentColor"
            strokeOpacity={i === 1 ? 0.18 : 0.08}
            strokeWidth="1"
          />
        ))}

        {/* signal pathways */}
        {signals.map((y, i) => (
          <g key={y}>
            <motion.path
              d={`M14 ${y} C 70 ${y}, 120 150, 186 150 C 250 150, 300 ${y}, 406 ${y}`}
              fill="none"
              stroke="url(#pulse-line)"
              strokeWidth="1"
              initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.1, ease: "easeOut" }}
            />
            {reduce ? null : (
              <circle r="2.6" fill={`var(--prism-colour-${i + 2})`}>
                <animateMotion
                  dur="6s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                  path={`M14 ${y} C 70 ${y}, 120 150, 186 150 C 250 150, 300 ${y}, 406 ${y}`}
                />
                <animate
                  attributeName="opacity"
                  dur="6s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                  values="0;1;1;0"
                />
              </circle>
            )}
          </g>
        ))}

        {/* intelligence core */}
        <g>
          <motion.circle
            cx="186"
            cy="150"
            r="34"
            fill="none"
            stroke="var(--accent-electric)"
            strokeOpacity="0.35"
            initial={reduce ? { scale: 1, opacity: 0.4 } : { scale: 0.9, opacity: 0.15 }}
            animate={reduce ? { scale: 1, opacity: 0.4 } : { scale: [0.9, 1.12, 0.9], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "186px 150px" }}
          />
          <circle cx="186" cy="150" r="20" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.rect
              key={i}
              x="174"
              y={138 + i * 3.4}
              width="24"
              height="1.6"
              rx="0.8"
              fill={`var(--prism-colour-${i + 1})`}
              initial={reduce ? { opacity: 0.8 } : { opacity: 0.25 }}
              animate={reduce ? { opacity: 0.8 } : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 3.4, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* outcome nodes */}
        {signals.map((y, i) => (
          <motion.circle
            key={`o-${y}`}
            cx="406"
            cy={y}
            r="3.4"
            fill={`var(--prism-colour-${i + 2})`}
            initial={reduce ? { opacity: 1 } : { opacity: 0.3 }}
            animate={reduce ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3.2, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between gap-2 border-t border-border bg-background/60 px-4 py-3 text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur sm:text-[0.625rem]">
        {stages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
