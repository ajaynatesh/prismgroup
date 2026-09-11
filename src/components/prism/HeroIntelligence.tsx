import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const inputs = [
  "Operations",
  "Customers",
  "Finance",
  "Systems",
  "Market signals",
  "People",
] as const;

const outputs = [
  "Opportunity",
  "Decision",
  "Automation",
  "Action",
  "Outcome",
  "Advantage",
] as const;

const ROWS = 6;
/** Row centres in a 0..600 viewBox with 6 equal rows — matches a 6-row CSS grid. */
const rowCentres = Array.from({ length: ROWS }, (_, i) => 50 + i * 100);

function Connectors({ direction }: { direction: "in" | "out" }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 600"
      preserveAspectRatio="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`conn-${direction}`} x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0%"
            stopColor="var(--color-foreground)"
            stopOpacity={direction === "in" ? 0 : 0.55}
          />
          <stop
            offset="100%"
            stopColor="var(--color-foreground)"
            stopOpacity={direction === "in" ? 0.55 : 0}
          />
        </linearGradient>
      </defs>
      {rowCentres.map((y, i) => {
        const d =
          direction === "in"
            ? `M0 ${y} C 55 ${y}, 45 300, 100 300`
            : `M0 300 C 55 300, 45 ${y}, 100 ${y}`;
        const stroke =
          direction === "out" ? `var(--prism-colour-${i + 1})` : `url(#conn-${direction})`;
        return (
          <g key={y}>
            <motion.path
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              strokeOpacity={direction === "out" ? 0.75 : 1}
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: "easeOut" }}
            />
            {reduce ? null : (
              <circle
                r="3"
                fill={
                  direction === "out"
                    ? `var(--prism-colour-${i + 1})`
                    : "var(--color-foreground)"
                }
                opacity="0.9"
              >
                <animateMotion
                  dur="3s"
                  begin={`${i * 0.45}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1"
                />
                <animate
                  attributeName="opacity"
                  dur="3s"
                  begin={`${i * 0.45}s`}
                  repeatCount="indefinite"
                  values="0;0.95;0"
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Chip({
  label,
  colour,
  emphasis,
}: {
  label: string;
  colour?: number;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-11 items-center gap-2 rounded-lg border border-border bg-surface/50 px-2.5 py-2 text-[0.6875rem] leading-tight transition-colors duration-300 active:border-border-strong sm:gap-2.5 sm:px-3 sm:text-[0.8125rem] md:hover:border-border-strong",
        emphasis ? "text-foreground" : "text-muted-foreground",
      )}
      style={
        emphasis && colour
          ? {
              borderColor: `color-mix(in oklab, var(--prism-colour-${colour}) 40%, transparent)`,
              background: `color-mix(in oklab, var(--prism-colour-${colour}) 8%, transparent)`,
            }
          : undefined
      }
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          background: colour
            ? `var(--prism-colour-${colour})`
            : "color-mix(in oklab, var(--color-foreground) 45%, transparent)",
        }}
        aria-hidden="true"
      />
      <span className="truncate">{label}</span>
    </div>
  );
}

function Core() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="glass relative flex h-full w-full flex-col justify-center overflow-hidden px-5 py-6 lg:w-[186px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ background: "var(--gradient-enterprise)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-spectrum)" }}
      />
      <div className="relative text-center">
        <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
          Prism core
        </p>
        <p className="mt-3 font-display text-lg font-semibold uppercase leading-tight tracking-tight">
          Intelligence
          <br />
          layer
        </p>
        <div className="mt-5 space-y-1.5" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.span
              key={i}
              className="block h-[3px] rounded-full"
              style={{ background: `var(--prism-colour-${i + 1})` }}
              initial={reduce ? { opacity: 0.8 } : { opacity: 0.25 }}
              animate={reduce ? { opacity: 0.8 } : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 3.6, delay: i * 0.24, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <p className="mt-5 text-[0.6875rem] leading-relaxed text-muted-foreground">
          Data · AI · Automation
        </p>
      </div>
    </div>
  );
}

/**
 * Hero visual: six enterprise signals enter the Prism intelligence layer and
 * leave as six commercial outcomes. Six rows on each side share one grid so the
 * connectors and cards stay perfectly aligned at every breakpoint.
 */
export function HeroIntelligence({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 opacity-50 sm:-inset-10 sm:opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 45%, color-mix(in oklab, var(--accent-electric) 18%, transparent), transparent 70%)",
        }}
      />

      <div className="glass relative overflow-hidden p-3.5 sm:p-6">
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

        {/* Desktop / large tablet: 6 → core → 6 */}
        <div className="mt-6 hidden items-stretch gap-0 lg:grid lg:grid-cols-[minmax(0,1fr)_52px_auto_52px_minmax(0,1fr)]">
          <div className="grid grid-rows-6 gap-2">
            {inputs.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </div>
          <div className="min-h-full">
            <Connectors direction="in" />
          </div>
          <Core />
          <div className="min-h-full">
            <Connectors direction="out" />
          </div>
          <div className="grid grid-rows-6 gap-2">
            {outputs.map((label, i) => (
              <Chip key={label} label={label} colour={i + 1} emphasis />
            ))}
          </div>
        </div>

        {/* Mobile / tablet: inputs → core → outputs */}
        <div className="mt-4 lg:hidden sm:mt-6">
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
            Signals in
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 min-[390px]:grid-cols-3 sm:mt-3 sm:gap-2">
            {inputs.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </div>
          <div className="flex justify-center py-2.5 sm:py-4" aria-hidden="true">
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-h-[124px] sm:min-h-[152px]">
            <Core />
          </div>
          <div className="flex justify-center py-2.5 sm:py-4" aria-hidden="true">
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
            Outcomes out
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 min-[390px]:grid-cols-3 sm:mt-3 sm:gap-2">
            {outputs.map((label, i) => (
              <Chip key={label} label={label} colour={i + 1} emphasis />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
