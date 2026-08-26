import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";
import {
  behindTheScenes,
  businessLoop,
  comparison,
  flywheel,
  frictionChain,
  integrationTargets,
  stack,
  tlAccent,
} from "@/lib/tradelink";

const soft = (pct: number) => `color-mix(in oklab, ${tlAccent} ${pct}%, transparent)`;

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("panel p-6 md:p-8", className)}>{children}</div>;
}

export function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
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

/** Vertical chain of labels with animated connectors. */
export function Chain({
  items,
  dense,
  highlightLast,
}: {
  items: string[];
  dense?: boolean;
  highlightLast?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <ol className="space-y-0">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const hot = highlightLast && last;
        return (
          <li key={item}>
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
              className={cn(
                "rounded-lg border px-4 text-sm tracking-tight",
                dense ? "py-2" : "py-3",
                hot ? "text-foreground" : "border-border bg-surface/40 text-foreground/90",
              )}
              style={hot ? { borderColor: soft(50), background: soft(12) } : undefined}
            >
              <span className="mr-2.5 text-[0.625rem] tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </motion.div>
            {!last ? (
              <div className="flex h-5 items-center justify-center" aria-hidden="true">
                <ArrowDown className="h-3.5 w-3.5" style={{ color: soft(80) }} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/** Horizontal pipeline of stages with a moving pulse. */
export function Pipeline({ stages, activeIndex }: { stages: string[]; activeIndex?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {stages.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-tight",
              activeIndex === i ? "text-foreground" : "border-border text-muted-foreground",
            )}
            style={activeIndex === i ? { borderColor: soft(55), background: soft(14) } : undefined}
          >
            {s}
          </span>
          {i < stages.length - 1 ? (
            <ArrowRight className="h-3 w-3 shrink-0" style={{ color: soft(70) }} aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** 2. Friction: patchwork of tools → endless manual chain. */
export function FrictionChain() {
  return (
    <Panel>
      <p className="eyebrow">Today · the manual loop</p>
      <div className="mt-6">
        <Chain items={frictionChain} dense />
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Nothing here is automated. Every arrow is the owner, doing it again.
      </p>
    </Panel>
  );
}

/** 4. The TradeLink business loop — circular lifecycle. */
export function BusinessLoop() {
  const reduce = useReducedMotion();
  const n = businessLoop.length;
  return (
    <Reveal>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: `radial-gradient(45% 45% at 50% 50%, ${soft(14)} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="200" cy="200" r="150" fill="none" stroke={soft(28)} strokeWidth="1" />
            <motion.circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke={tlAccent}
              strokeWidth="1.5"
              strokeDasharray="60 880"
              initial={{ rotate: 0 }}
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "200px 200px" }}
            />
          </svg>
          {businessLoop.map((s, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * 37.5;
            const y = 50 + Math.sin(a) * 37.5;
            return (
              <motion.div
                key={s.key}
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.07 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className="whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.14em]"
                  style={{ borderColor: soft(45), background: `color-mix(in oklab, ${tlAccent} 8%, var(--background))` }}
                >
                  {s.title}
                </span>
              </motion.div>
            );
          })}
          <div className="absolute inset-0 grid place-items-center">
            <div className="max-w-[9rem] text-center">
              <p className="font-display text-sm font-semibold tracking-tight">TradeLink</p>
              <p className="mt-1 text-[0.625rem] leading-relaxed text-muted-foreground">
                One conversation, the whole lifecycle
              </p>
            </div>
          </div>
        </div>
      </div>
      <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {businessLoop.map((s) => (
          <div key={s.key} className="bg-background p-5">
            <dt className="font-display text-sm font-semibold tracking-tight">{s.title}</dt>
            <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.copy}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/** 23. The TradeLink stack — five layers. Hero diagram. */
export function StackDiagram() {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <div className="space-y-0">
        {stack.map((layer, i) => (
          <div key={layer.index}>
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }}
              className="rounded-xl border p-5 md:p-6"
              style={{
                borderColor: soft(24 + i * 6),
                background: `color-mix(in oklab, ${tlAccent} ${3 + i * 2}%, transparent)`,
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[0.6875rem] tabular-nums text-muted-foreground">{layer.index}</span>
                  <h3 className="font-display text-base font-semibold uppercase tracking-tight md:text-lg">
                    {layer.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {layer.items.map((it) => (
                    <li key={it}>
                      <Tag active={i === 0}>{it}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            {i < stack.length - 1 ? (
              <div className="flex h-6 items-center justify-center" aria-hidden="true">
                <ArrowDown className="h-4 w-4" style={{ color: soft(80) }} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/** 22. Integration architecture: customer → WhatsApp → TradeLink → systems. */
export function IntegrationMap() {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <div className="panel p-6 md:p-10">
        <div className="mx-auto max-w-md space-y-0">
          {["Customer", "WhatsApp", "TradeLink"].map((l, i) => (
            <div key={l}>
              <div
                className="rounded-lg border px-4 py-3 text-center font-display text-sm font-semibold uppercase tracking-[0.14em]"
                style={
                  i === 2
                    ? { borderColor: soft(55), background: soft(14) }
                    : { borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 40%, transparent)" }
                }
              >
                {l}
              </div>
              <div className="flex h-5 items-center justify-center" aria-hidden="true">
                <ArrowDown className="h-3.5 w-3.5" style={{ color: soft(80) }} />
              </div>
            </div>
          ))}
        </div>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {integrationTargets.map((t, i) => (
            <motion.li
              key={t}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
              className="rounded-lg border border-border bg-surface/40 px-4 py-3 text-center text-xs font-medium tracking-tight"
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** 30. Behind the scenes vs customer. */
export function SimpleByDesign() {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_auto_0.8fr] lg:items-center">
      <Panel>
        <p className="eyebrow">Behind the scenes</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {behindTheScenes.map((b) => (
            <li key={b}>
              <Tag>{b}</Tag>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Models, integrations, workflow engines, payment rails, audit trails and analytics — the machinery a small
          business should never have to think about.
        </p>
      </Panel>
      <div className="flex justify-center lg:px-2">
        <ArrowRight className="hidden h-6 w-6 lg:block" style={{ color: soft(80) }} aria-hidden="true" />
        <ArrowDown className="h-6 w-6 lg:hidden" style={{ color: soft(80) }} aria-hidden="true" />
      </div>
      <div
        className="rounded-xl border p-8 text-center"
        style={{ borderColor: soft(55), background: soft(12) }}
      >
        <p className="eyebrow">What the customer sees</p>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight">WhatsApp</p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">That's it. One conversation.</p>
      </div>
    </Reveal>
  );
}

/** 32. Flywheel. */
export function Flywheel() {
  const reduce = useReducedMotion();
  const n = flywheel.length;
  return (
    <Reveal>
      <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: `radial-gradient(45% 45% at 50% 50%, ${soft(16)} 0%, transparent 70%)` }}
        />
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="200" cy="200" r="140" fill="none" stroke={soft(26)} strokeWidth="1" />
          <motion.g
            initial={{ rotate: 0 }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle cx="340" cy="200" r="4" fill={tlAccent} />
          </motion.g>
        </svg>
        {flywheel.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * 35;
          const y = 50 + Math.sin(a) * 35;
          return (
            <motion.span
              key={s}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: soft(45),
                background: `color-mix(in oklab, ${tlAccent} 8%, var(--background))`,
              }}
            >
              {s}
            </motion.span>
          );
        })}
        <div className="absolute inset-0 grid place-items-center">
          <p className="max-w-[8rem] text-center font-display text-sm font-semibold tracking-tight">
            The TradeLink flywheel
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** 34. Traditional software vs TradeLink. */
export function ComparisonTable() {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2">
      <Panel>
        <p className="eyebrow">Traditional software</p>
        <ol className="mt-5 space-y-2">
          {comparison.traditional.map((t, i) => (
            <li key={t} className="flex items-baseline gap-3 text-sm text-muted-foreground">
              <span className="text-[0.625rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {t}
            </li>
          ))}
        </ol>
      </Panel>
      <div className="rounded-xl border p-6 md:p-8" style={{ borderColor: soft(50), background: soft(10) }}>
        <p className="eyebrow">TradeLink</p>
        <ol className="mt-5 space-y-2">
          {comparison.tradelink.map((t, i) => (
            <li key={t} className="flex items-baseline gap-3 text-sm font-medium tracking-tight">
              <span className="text-[0.625rem] tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/** 16. QR moment. */
export function QrMoment({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <Reveal className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="mx-auto">
        <div
          className="relative grid h-44 w-44 place-items-center rounded-2xl border"
          style={{ borderColor: soft(45), background: soft(8) }}
        >
          <QrCode className="h-24 w-24" style={{ color: tlAccent }} aria-hidden="true" />
          {!reduce ? (
            <motion.span
              aria-hidden="true"
              className="absolute left-3 right-3 h-px"
              style={{ background: tlAccent }}
              initial={{ top: "12%", opacity: 0.2 }}
              animate={{ top: ["12%", "88%", "12%"], opacity: [0.15, 0.9, 0.15] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Scan → conversation starts</p>
      </div>
      <div>
        <ul className="flex flex-wrap gap-2">
          {items.map((i) => (
            <li key={i}>
              <Tag>{i}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Chain items={["Customer scans the code", "\u201cHi, I'd like a quote.\u201d", "TradeLink starts the workflow", "Qualified lead in the business"]} dense highlightLast />
        </div>
      </div>
    </Reveal>
  );
}
