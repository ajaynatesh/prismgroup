import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/prism/Reveal";

export function Section({
  children,
  className,
  id,
  tone = "base",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "base" | "raised";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-32",
        tone === "raised" && "bg-surface/40",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  colour,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  colour?: number;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
          {colour ? (
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `var(--prism-colour-${colour})` }}
            />
          ) : null}
          <p className="eyebrow">{eyebrow}</p>
        </div>
      ) : null}
      <h2 className="display-lg mt-5">{title}</h2>
      {copy ? <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{copy}</p> : null}
    </Reveal>
  );
}

const btnBase =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300";

export function PrimaryLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      className={cn(btnBase, "bg-primary text-primary-foreground hover:opacity-90", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function GhostLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      className={cn(btnBase, "border border-border-strong text-foreground hover:bg-accent", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function ExternalCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(btnBase, "bg-primary text-primary-foreground hover:opacity-90", className)}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function VentureLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
      A Prism Group venture
    </span>
  );
}

/** Horizontal flow of steps with animated connectors. */
export function FlowRail({ steps, colour = 5 }: { steps: string[]; colour?: number }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-2">
      {steps.map((s, i) => (
        <Reveal key={s} delay={i * 0.06} className="flex items-center gap-2">
          <li className="panel px-4 py-3 text-xs font-medium tracking-tight text-foreground/90 md:text-sm">
            <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </li>
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="h-px w-5 shrink-0"
              style={{ background: `var(--prism-colour-${colour})`, opacity: 0.5 }}
            />
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}

export function CapabilityGroups({
  groups,
  colour,
}: {
  groups: { title: string; items: string[] }[];
  colour: number;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => (
        <div key={g.title} className="bg-background p-6 transition-colors hover:bg-surface md:p-8">
          <div className="flex items-center gap-2.5">
            <span
              className="h-px w-6"
              style={{ background: `var(--prism-colour-${colour})` }}
              aria-hidden="true"
            />
            <h3 className="font-display text-sm font-semibold tracking-tight">{g.title}</h3>
          </div>
          <ul className="mt-5 space-y-2.5">
            {g.items.map((it) => (
              <li key={it} className="text-sm leading-relaxed text-muted-foreground">
                {it}
              </li>
            ))}
          </ul>
          <span className="sr-only">{i}</span>
        </div>
      ))}
    </div>
  );
}
