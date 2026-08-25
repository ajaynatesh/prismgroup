import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { pillars } from "@/lib/prism";
import { cn } from "@/lib/utils";

/**
 * The Prism Spectrum: a continuous seven-colour band. Hovering a colour
 * intensifies it, reveals its pillar and recedes the others. On mobile the
 * spectrum becomes a vertical journey.
 */
export function Spectrum() {
  const [active, setActive] = useState<number | null>(null);
  const activePillar = pillars.find((p) => p.colour === active) ?? null;

  return (
    <div>
      {/* Desktop / tablet: horizontal spectrum */}
      <div className="hidden md:block">
        <div
          className="flex h-[320px] items-stretch overflow-hidden rounded-lg border border-border"
          onMouseLeave={() => setActive(null)}
        >
          {pillars.map((p) => {
            const isActive = active === p.colour;
            const dim = active != null && !isActive;
            return (
              <Link
                key={p.index}
                to={p.href as never}
                onMouseEnter={() => setActive(p.colour)}
                onFocus={() => setActive(p.colour)}
                aria-label={p.name}
                className={cn(
                  "group relative flex flex-1 flex-col justify-end overflow-hidden p-5 transition-[flex-grow,opacity] duration-500 ease-out focus:outline-none",
                  isActive && "flex-[2.4]",
                  dim && "opacity-45",
                )}
                style={{
                  background: `linear-gradient(180deg, transparent 8%, color-mix(in oklab, var(--prism-colour-${p.colour}) ${isActive ? 42 : 16}%, transparent) 100%)`,
                }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 transition-opacity duration-500"
                  style={{
                    background: `var(--prism-colour-${p.colour})`,
                    opacity: dim ? 0.4 : 1,
                  }}
                  aria-hidden="true"
                />
                <span className="font-display text-xs text-foreground/60">{p.index}</span>
                <span className="mt-2 font-display text-sm font-semibold leading-snug tracking-tight">
                  {p.short}
                </span>
                <motion.span
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 max-w-[22rem] text-xs leading-relaxed text-muted-foreground"
                >
                  {p.headline}
                </motion.span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.16em] text-foreground/70">
                  {p.kind}
                  <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 min-h-14">
          <motion.p
            key={activePillar?.index ?? "none"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl text-sm leading-relaxed text-muted-foreground"
          >
            {activePillar ? activePillar.copy : "Hover a colour to see the venture or capability behind it."}
          </motion.p>
        </div>
      </div>

      {/* Mobile: vertical journey */}
      <ol className="md:hidden">
        {pillars.map((p) => (
          <li key={p.index}>
            <Link to={p.href as never} className="flex gap-4 border-b border-border py-6">
              <span
                className="mt-1 w-1 shrink-0 rounded-full"
                style={{ background: `var(--prism-colour-${p.colour})` }}
                aria-hidden="true"
              />
              <span className="block">
                <span className="font-display text-xs text-muted-foreground">{p.index}</span>
                <span className="mt-1 block font-display text-lg font-semibold tracking-tight">
                  {p.short}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {p.headline}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {p.kind} <ArrowRight className="h-3 w-3" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
