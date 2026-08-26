import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ImageIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ChatMsg, tlAccent } from "@/lib/tradelink";

/** Premium phone shell — the primary visual object of the page. */
export function Phone({
  children,
  title = "Prism TradeLink",
  subtitle = "Business account · online",
  className,
  glow = true,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[22rem]", className)}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 -z-10"
          style={{
            background: `radial-gradient(50% 45% at 50% 45%, color-mix(in oklab, ${tlAccent} 16%, transparent) 0%, transparent 72%)`,
          }}
        />
      ) : null}
      <div className="rounded-[2.4rem] border border-border-strong bg-surface/60 p-2 shadow-2xl backdrop-blur-sm">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[0.625rem] tracking-tight text-muted-foreground">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-surface" aria-hidden="true" />
            <span>100%</span>
          </div>
          {/* chat header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.625rem] font-semibold text-background"
              style={{ background: tlAccent }}
            >
              TL
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-tight">{title}</p>
              <p className="truncate text-[0.625rem] text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {children}
          {/* composer */}
          <div className="flex items-center gap-2 border-t border-border px-3 py-2.5">
            <Paperclip className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <div className="h-7 flex-1 rounded-full border border-border bg-surface/60 px-3 text-[0.6875rem] leading-7 text-muted-foreground">
              Message
            </div>
            <span className="h-7 w-7 rounded-full" style={{ background: tlAccent }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg, index }: { msg: ChatMsg; index: number }) {
  const reduce = useReducedMotion();
  const mine = msg.from === "customer";

  if (msg.from === "system") {
    return (
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex justify-center"
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.625rem] tracking-tight"
          style={{
            background: `color-mix(in oklab, ${tlAccent} 12%, transparent)`,
            border: `1px solid color-mix(in oklab, ${tlAccent} 35%, transparent)`,
          }}
        >
          <Check className="h-3 w-3" style={{ color: tlAccent }} aria-hidden="true" />
          {msg.text}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: reduce ? 0 : Math.min(index, 2) * 0.03 }}
      className={cn("flex", mine ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.75rem] leading-relaxed",
          mine ? "rounded-br-sm text-background" : "rounded-bl-sm border border-border bg-surface/70 text-foreground",
        )}
        style={mine ? { background: tlAccent } : undefined}
      >
        {msg.attachment ? (
          <span
            className={cn(
              "mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.625rem]",
              mine ? "bg-background/20" : "bg-background/60",
            )}
          >
            <ImageIcon className="h-3 w-3" aria-hidden="true" />
            {msg.attachment}
          </span>
        ) : null}
        {msg.text ? <p>{msg.text}</p> : null}
        {msg.card ? (
          <div className="mt-1 w-full rounded-lg border border-border bg-background p-3">
            <p className="font-display text-[0.6875rem] font-semibold tracking-tight">{msg.card.title}</p>
            <dl className="mt-2 space-y-1">
              {msg.card.rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3">
                  <dt className="text-[0.625rem] text-muted-foreground">{k}</dt>
                  <dd className="text-[0.625rem] font-medium tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            {msg.card.actions ? (
              <div className="mt-3 space-y-1.5">
                {msg.card.actions.map((a, i) => (
                  <span
                    key={a}
                    className="block rounded-md border px-2 py-1.5 text-center text-[0.625rem] font-medium"
                    style={
                      i === 0
                        ? {
                            borderColor: `color-mix(in oklab, ${tlAccent} 45%, transparent)`,
                            color: tlAccent,
                          }
                        : undefined
                    }
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {msg.buttons ? (
          <div className="mt-2.5 space-y-1.5">
            {msg.buttons.map((b) => (
              <span
                key={b}
                className="block rounded-md border px-2 py-1.5 text-center text-[0.625rem] font-medium"
                style={{
                  borderColor: `color-mix(in oklab, ${tlAccent} 40%, transparent)`,
                  color: mine ? "inherit" : tlAccent,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

/** Auto-playing conversation. Reveals messages one at a time, loops. */
export function ChatThread({
  thread,
  autoplay = true,
  interval = 1500,
  height = "26rem",
  step,
}: {
  thread: ChatMsg[];
  autoplay?: boolean;
  interval?: number;
  height?: string;
  /** When provided, the thread is controlled: shows the first `step` messages. */
  step?: number;
}) {
  const reduce = useReducedMotion();
  const controlled = typeof step === "number";
  const [count, setCount] = useState(controlled ? step : reduce || !autoplay ? thread.length : 1);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlled) setCount(step!);
  }, [controlled, step]);

  useEffect(() => {
    if (controlled || reduce || !autoplay) return;
    const t = setInterval(() => {
      setCount((c) => (c >= thread.length ? 1 : c + 1));
    }, interval);
    return () => clearInterval(t);
  }, [autoplay, controlled, interval, reduce, thread.length]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [count, reduce]);

  return (
    <div
      ref={scroller}
      className="space-y-2.5 overflow-y-auto px-3.5 py-4"
      style={{ height }}
      role="log"
      aria-live="polite"
    >
      {thread.slice(0, count).map((m, i) => (
        <Bubble key={`${i}-${m.text ?? m.card?.title ?? ""}`} msg={m} index={i} />
      ))}
    </div>
  );
}
