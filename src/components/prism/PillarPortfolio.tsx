import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { homePillars, type HomePillar } from "@/lib/home";
import { Reveal } from "@/components/prism/Reveal";
import { cn } from "@/lib/utils";

function Tag({ children, colour }: { children: string; colour: number }) {
  return (
    <li
      className="rounded-full border px-3 py-1.5 text-[0.75rem] text-foreground/80"
      style={{
        borderColor: `color-mix(in oklab, var(--prism-colour-${colour}) 28%, transparent)`,
        background: `color-mix(in oklab, var(--prism-colour-${colour}) 7%, transparent)`,
      }}
    >
      {children}
    </li>
  );
}

function ExploreLink({ pillar }: { pillar: HomePillar }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        to={pillar.href as never}
        className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <span className="link-underline">{pillar.cta}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
      {pillar.external ? (
        <a
          href={pillar.external}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          {pillar.external.replace(/^https?:\/\/|\/$/g, "")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  );
}

/** Section 04 — the interactive seven-colour portfolio. */
export function PillarPortfolio() {
  const [i, setI] = useState(0);
  const active = homePillars[i]!;
  const reduce = useReducedMotion() ?? false;

  return (
    <div>
      {/* spectrum selector */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-7 sm:px-0 sm:pb-0 md:gap-3">
        {homePillars.map((p, idx) => {
          const on = idx === i;
          return (
            <button
              key={p.index}
              type="button"
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              onClick={() => setI(idx)}
              aria-label={p.name}
              aria-pressed={on}
              className="group relative flex min-h-16 w-[4.25rem] shrink-0 snap-start touch-manipulation flex-col items-stretch justify-start pt-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:w-full sm:pt-4"
            >
              <span
                className="block h-[3px] w-full rounded-full transition-all duration-500"
                style={{
                  background: `var(--prism-colour-${p.colour})`,
                  opacity: on ? 1 : 0.28,
                  boxShadow: on
                    ? `0 0 22px color-mix(in oklab, var(--prism-colour-${p.colour}) 60%, transparent)`
                    : "none",
                }}
              />
              <span
                className={cn(
                  "mt-4 block font-display text-[0.6875rem] tracking-[0.18em] transition-colors",
                  on ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {p.index}
              </span>
              <span
                className={cn(
                  "mt-1.5 hidden font-display text-xs font-medium leading-snug tracking-tight transition-colors md:block",
                  on ? "text-foreground" : "text-muted-foreground/60",
                )}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* active pillar detail */}
      <div className="relative mt-14 min-h-[30rem] md:min-h-[26rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.index}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: `var(--prism-colour-${active.colour})` }}
                />
                <p className="eyebrow">
                  {active.index} — {active.name}
                </p>
              </div>
              <h3 className="display-md mt-6 max-w-xl uppercase">{active.statement}</h3>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
                {active.positioning}
              </p>
              <div className="mt-9">
                <ExploreLink pillar={active} />
              </div>
            </div>

            <div className="min-w-0 space-y-9">
              <div>
                <p className="eyebrow">What we solve</p>
                <ul className="mt-5 space-y-3">
                  {active.solves.map((s) => (
                    <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        className="mt-2 h-px w-4 shrink-0"
                        style={{ background: `var(--prism-colour-${active.colour})` }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">What we do</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {active.capabilities.map((c) => (
                    <Tag key={c} colour={active.colour}>
                      {c}
                    </Tag>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-6">
                <p className="eyebrow">Why it matters</p>
                <p className="mt-4 font-display text-base font-medium leading-relaxed tracking-tight">
                  {active.matters}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Section 05 — the full seven-pillar ledger, information dense but calm. */
export function PillarLedger() {
  return (
    <div className="hairline">
      {homePillars.map((p, idx) => (
        <Reveal key={p.index} delay={idx * 0.03}>
          <article className="group grid gap-6 border-b border-border py-10 md:grid-cols-[auto_1fr] md:gap-12 md:py-14">
            <div className="flex items-start gap-4 md:w-40">
              <span
                className="mt-2 h-8 w-px shrink-0 transition-all duration-500 md:h-10 md:group-hover:h-16"
                style={{ background: `var(--prism-colour-${p.colour})` }}
                aria-hidden="true"
              />
              <span className="font-display text-3xl font-semibold tracking-tight text-muted-foreground/50">
                {p.index}
              </span>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{p.name}</h3>
                <p
                  className="mt-3 font-display text-sm font-medium uppercase tracking-[0.06em]"
                  style={{ color: `var(--prism-colour-${p.colour})` }}
                >
                  {p.statement}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.positioning}</p>
                <div className="mt-6">
                  <ExploreLink pillar={p} />
                </div>
              </div>
              <div className="space-y-6">
                <ul className="flex flex-wrap gap-2">
                  {p.capabilities.map((c) => (
                    <Tag key={c} colour={p.colour}>
                      {c}
                    </Tag>
                  ))}
                </ul>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow">What we solve</p>
                    <ul className="mt-3 space-y-2">
                      {p.solves.map((s) => (
                        <li key={s} className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Why it matters</p>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-foreground/85">{p.matters}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
