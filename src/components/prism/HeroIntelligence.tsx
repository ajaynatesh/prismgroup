import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const inputs = ["Operations", "Customers", "Finance", "Systems", "Signals"];
const outputs = ["Opportunity", "Decision", "Action", "Outcome"];

/**
 * Hero visual: enterprise signals enter a precision-cut intelligence layer and
 * leave as decisions. Proprietary, restrained, built from brand tokens only.
 */
export function HeroIntelligence({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 55% 45%, color-mix(in oklab, var(--accent-electric) 20%, transparent), transparent 70%)",
        }}
      />

      <div className="glass relative overflow-hidden p-5 md:p-7">
        <div className="flex items-center justify-between text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Intelligence layer</span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-emerald)" }}
            />
            Live
          </span>
        </div>

        <svg
          viewBox="0 0 520 340"
          className="mt-5 h-auto w-full"
          role="img"
          aria-label="Enterprise signals refracting through the Prism intelligence layer into decisions"
        >
          <defs>
            <linearGradient id="hero-slab" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-electric)" stopOpacity="0.5" />
              <stop offset="55%" stopColor="var(--prism-colour-5)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity="0.42" />
            </linearGradient>
            <linearGradient id="hero-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-foreground)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--color-foreground)" stopOpacity="0.75" />
            </linearGradient>
            <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent-electric)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-electric)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="250" cy="170" r="150" fill="url(#hero-halo)" />

          {/* enterprise signal grid */}
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2].map((c) => (
              <motion.circle
                key={`${r}-${c}`}
                cx={16 + c * 26}
                cy={48 + r * 60}
                r="2"
                fill="var(--color-muted-foreground)"
                initial={reduce ? { opacity: 0.5 } : { opacity: 0.2 }}
                animate={reduce ? { opacity: 0.5 } : { opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 3.4, delay: (r + c) * 0.22, repeat: Infinity }}
              />
            )),
          )}

          {/* converging signals */}
          {[48, 108, 168, 228, 288].map((y, i) => (
            <g key={y}>
              <motion.path
                d={`M74 ${y} C 140 ${y}, 168 170, 212 170`}
                fill="none"
                stroke="url(#hero-beam)"
                strokeWidth="1"
                initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.09, ease: "easeOut" }}
              />
              {reduce ? null : (
                <motion.circle
                  r="2.4"
                  fill="var(--color-foreground)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.6, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <animateMotion
                    dur="2.6s"
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                    path={`M74 ${y} C 140 ${y}, 168 170, 212 170`}
                  />
                </motion.circle>
              )}
            </g>
          ))}

          {/* the intelligence layer — precision-cut slab */}
          <g>
            <rect
              x="212"
              y="66"
              width="72"
              height="208"
              rx="8"
              fill="url(#hero-slab)"
              stroke="var(--color-border-strong)"
              strokeWidth="1"
            />
            <rect
              x="220"
              y="74"
              width="56"
              height="192"
              rx="6"
              fill="none"
              stroke="oklch(1 0 0 / 12%)"
              strokeWidth="0.6"
            />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.rect
                key={i}
                x="224"
                y={84 + i * 26}
                width="48"
                height="2.5"
                rx="1.25"
                fill={`var(--prism-colour-${i + 1})`}
                initial={reduce ? { opacity: 0.75 } : { opacity: 0.2 }}
                animate={reduce ? { opacity: 0.75 } : { opacity: [0.2, 0.95, 0.2] }}
                transition={{ duration: 3.8, delay: i * 0.26, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </g>

          {/* refracted decisions */}
          {[86, 142, 198, 254].map((y, i) => (
            <motion.path
              key={y}
              d={`M284 170 C 330 170, 350 ${y}, 430 ${y}`}
              fill="none"
              stroke={`var(--prism-colour-${i + 3})`}
              strokeWidth="1.4"
              strokeOpacity="0.8"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.7 + i * 0.1, ease: "easeOut" }}
            />
          ))}
          {[86, 142, 198, 254].map((y, i) => (
            <circle key={`n-${y}`} cx="430" cy={y} r="3" fill={`var(--prism-colour-${i + 3})`} />
          ))}
        </svg>

        <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">Inputs</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {inputs.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-2.5 py-1 text-[0.6875rem] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">Outputs</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {outputs.map((s, i) => (
                <li
                  key={s}
                  className="rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium text-foreground"
                  style={{
                    borderColor: `color-mix(in oklab, var(--prism-colour-${i + 3}) 45%, transparent)`,
                    background: `color-mix(in oklab, var(--prism-colour-${i + 3}) 9%, transparent)`,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
