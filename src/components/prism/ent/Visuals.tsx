import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import {
  ENT_COLOUR,
  cognitiveInputs,
  cognitiveLoop,
  heroInputs,
  heroOutputs,
} from "@/lib/enterprise-technology";

const accent = `var(--prism-colour-${ENT_COLOUR})`;

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}

export function Chip({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1.5 text-[0.75rem] leading-none transition-colors",
        className,
      )}
      style={{
        borderColor: active
          ? `color-mix(in oklab, ${accent} 55%, transparent)`
          : "var(--border)",
        background: active ? `color-mix(in oklab, ${accent} 10%, transparent)` : "transparent",
        color: active ? "var(--foreground)" : undefined,
      }}
    >
      {children}
    </span>
  );
}

/** Hero visual — fragmented systems converge into the Prism transformation layer. */
export function ArchitectureFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: `radial-gradient(55% 45% at 50% 50%, color-mix(in oklab, ${accent} 14%, transparent) 0%, transparent 70%)`,
        }}
      />
      <div className="panel p-6 md:p-8">
        <p className="eyebrow">Enterprise inputs</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {heroInputs.map((s, i) => (
            <motion.li
              key={s}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05 }}
            >
              <Chip>{s}</Chip>
            </motion.li>
          ))}
        </ul>

        <div className="my-6 flex flex-col items-center gap-1" aria-hidden="true">
          <div className="flex items-end gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.span
                key={i}
                className="block w-px rounded-full"
                style={{ background: accent, height: 34 }}
                initial={reduce ? { opacity: 0.6 } : { opacity: 0.15, scaleY: 0.4 }}
                animate={reduce ? { opacity: 0.6 } : { opacity: [0.15, 0.85, 0.15], scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: reduce ? 0 : Infinity, delay: i * 0.14, ease: "easeInOut" }}
              />
            ))}
          </div>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <div
          className="rounded-lg border px-5 py-6 text-center"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
            background: `color-mix(in oklab, ${accent} 8%, transparent)`,
            boxShadow: `0 0 60px -20px color-mix(in oklab, ${accent} 55%, transparent)`,
          }}
        >
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
            Prism transformation layer
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Architecture · Integration · Data · AI · Governance
          </p>
        </div>

        <div className="my-6 flex justify-center" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <p className="eyebrow">Business outputs</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {heroOutputs.map((s, i) => (
            <motion.li
              key={s}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.4 + i * 0.06 }}
            >
              <Chip active>{s}</Chip>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A horizontal / vertical chain of labelled steps. */
export function Chain({
  steps,
  orientation = "horizontal",
  emphasiseLast,
}: {
  steps: string[];
  orientation?: "horizontal" | "vertical";
  emphasiseLast?: boolean;
}) {
  const vertical = orientation === "vertical";
  return (
    <ol className={cn("flex gap-2", vertical ? "flex-col items-stretch" : "flex-wrap items-center")}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Reveal key={s} delay={i * 0.05} className={cn("flex items-center gap-2", vertical && "flex-col")}>
            <li
              className={cn(
                "panel px-4 py-3 text-xs font-medium tracking-tight md:text-sm",
                vertical && "w-full text-center",
              )}
              style={
                emphasiseLast && last
                  ? {
                      borderColor: `color-mix(in oklab, ${accent} 50%, transparent)`,
                      background: `color-mix(in oklab, ${accent} 9%, transparent)`,
                    }
                  : undefined
              }
            >
              {s}
            </li>
            {!last ? (
              vertical ? (
                <ArrowDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              )
            ) : null}
          </Reveal>
        );
      })}
    </ol>
  );
}

/** Signature visual — cognitive engineering equation and loop. */
export function CognitiveEngine() {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_0.7fr] lg:items-center lg:gap-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {cognitiveInputs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="relative panel px-5 py-4">
                <span
                  className="absolute left-0 top-0 h-full w-px"
                  style={{ background: accent, opacity: 0.55 }}
                  aria-hidden="true"
                />
                <p className="font-display text-sm font-semibold tracking-tight">{c.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex items-center justify-center py-2 lg:h-full lg:flex-col">
          <span
            className="font-display text-3xl font-light"
            style={{ color: accent }}
            aria-hidden="true"
          >
            =
          </span>
        </div>

        <Reveal delay={0.15}>
          <div
            className="rounded-lg border px-6 py-10 text-center"
            style={{
              borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
              background: `color-mix(in oklab, ${accent} 8%, transparent)`,
              boxShadow: `0 0 80px -30px color-mix(in oklab, ${accent} 60%, transparent)`,
            }}
          >
            <p className="font-display text-lg font-semibold uppercase tracking-[0.16em] md:text-xl">
              Cognitive solutions
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Systems that understand information, automate complex work, strengthen decisions and
              improve with use.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <p className="eyebrow">The cognitive loop</p>
        <div className="mt-5">
          <Chain steps={cognitiveLoop} emphasiseLast />
        </div>
      </div>
    </div>
  );
}

/** Technology + process + people + governance = sustained transformation. */
export function ChangeEquation() {
  const parts = ["Technology", "Process", "People", "Governance"];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_0.8fr] lg:items-center lg:gap-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {parts.map((p, i) => (
          <Reveal key={p} delay={i * 0.05}>
            <div className="panel px-5 py-6 text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.14em]">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <span className="text-center font-display text-3xl font-light" style={{ color: accent }} aria-hidden="true">
        =
      </span>
      <Reveal delay={0.15}>
        <div
          className="rounded-lg border px-6 py-8 text-center"
          style={{
            borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
            background: `color-mix(in oklab, ${accent} 8%, transparent)`,
          }}
        >
          <p className="font-display text-base font-semibold uppercase tracking-[0.16em]">
            Sustained transformation
          </p>
        </div>
      </Reveal>
    </div>
  );
}
