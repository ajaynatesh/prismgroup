import { motion, useReducedMotion } from "motion/react";
import { engineInputs, engineOutputs, AIX_COLOUR } from "@/lib/ai-transformation";
import { cn } from "@/lib/utils";

const accent = `var(--prism-colour-${AIX_COLOUR})`;

/**
 * Hero visual: business inputs enter a prism-like intelligence layer and
 * emerge as business outcomes. Restrained, single-accent, continuously alive.
 */
export function TransformationEngine({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <ul className="space-y-2">
          {engineInputs.map((i, idx) => (
            <motion.li
              key={i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border border-border bg-surface/50 px-3 py-2 text-right text-[0.7rem] tracking-tight text-muted-foreground sm:text-xs"
            >
              {i}
            </motion.li>
          ))}
        </ul>

        <div className="relative flex h-56 w-24 items-center justify-center sm:h-72 sm:w-32">
          <svg viewBox="0 0 120 240" className="h-full w-full">
            <defs>
              <linearGradient id="aix-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.16" />
                <stop offset="55%" stopColor={accent} stopOpacity="0.14" />
                <stop offset="100%" stopColor="white" stopOpacity="0.04" />
              </linearGradient>
              <filter id="aix-blur" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            <motion.polygon
              points="60,26 106,214 14,214"
              fill={accent}
              opacity={0.18}
              filter="url(#aix-blur)"
              animate={reduce ? {} : { opacity: [0.1, 0.24, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <polygon
              points="60,26 106,214 14,214"
              fill="url(#aix-glass)"
              stroke="white"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            <line x1="60" y1="26" x2="60" y2="214" stroke="white" strokeOpacity="0.1" />

            {[0, 1, 2, 3].map((i) => (
              <motion.line
                key={i}
                x1="0"
                y1={70 + i * 34}
                x2="52"
                y2={120}
                stroke="white"
                strokeOpacity="0.35"
                strokeWidth="1"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: "easeOut" }}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <motion.line
                key={`o${i}`}
                x1="68"
                y1={120}
                x2="120"
                y2={70 + i * 34}
                stroke={accent}
                strokeOpacity={0.75 - i * 0.1}
                strokeWidth="1.4"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.7 + i * 0.12, ease: "easeOut" }}
              />
            ))}

            {!reduce
              ? [0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={`p${i}`}
                    r="2"
                    fill="white"
                    animate={{ cx: [0, 52], cy: [70 + i * 34, 120], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                  />
                ))
              : null}
          </svg>
        </div>

        <ul className="space-y-2">
          {engineOutputs.map((o, idx) => (
            <motion.li
              key={o}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border px-3 py-2 text-[0.7rem] font-medium tracking-tight sm:text-xs"
              style={{
                borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
                background: `color-mix(in oklab, ${accent} 9%, transparent)`,
              }}
            >
              {o}
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">
        Chaos → Prism intelligence → Action
      </p>
    </div>
  );
}
