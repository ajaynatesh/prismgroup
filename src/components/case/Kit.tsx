import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Info, ShieldCheck, UserCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { colourVar, type PrismColour } from "@/lib/prism";
import { caseStudies } from "@/lib/case-studies";
import { Reveal } from "@/components/prism/Reveal";
import { ChallengeAdviserSafe as ChallengeAdviser } from "@/components/prism/ChallengeAdviser";

/* ---------- DemoBadge ---------- */
export function DemoBadge({ className, label = "Interactive illustration · Synthetic data" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/80 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-prism-3" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ---------- Chapter navigator ---------- */
export type Chapter = { id: string; label: string };

export function ChapterNav({ chapters, colour }: { chapters: Chapter[]; colour: PrismColour }) {
  const [active, setActive] = useState(chapters[0]?.id);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);
  return (
    <nav aria-label="Chapters" className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-sm md:top-20">
      <div className="shell flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-colors",
              active === c.id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="tabular-nums" style={{ color: active === c.id ? colourVar(colour) : undefined }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {c.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ---------- Shell ---------- */
export function CaseStudyShell({
  colour,
  pillarName,
  pillarTo,
  title,
  status,
  kicker,
  headline,
  sub,
  copy,
  visual,
  chapters,
  children,
}: {
  colour: PrismColour;
  pillarName: string;
  pillarTo: string;
  title: string;
  status: string;
  kicker?: string;
  headline: ReactNode;
  sub: string;
  copy: string;
  visual: ReactNode;
  chapters: Chapter[];
  children: ReactNode;
}) {
  return (
    <div style={{ ["--case" as string]: colourVar(colour) }}>
      <section className="relative overflow-hidden pb-12 pt-24 md:pb-20 md:pt-32">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, ${colourVar(colour)} 14%, transparent), transparent 70%)` }}
        />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to={pillarTo as never} className="hover:text-foreground">{pillarName}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">{title}</li>
            </ol>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: colourVar(colour) }} />
            <p className="eyebrow">{kicker ?? pillarName}</p>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.6875rem] text-muted-foreground">{status}</span>
          </div>
          <h1 className="display-xl mt-6 max-w-5xl">{headline}</h1>
          <p className="mt-6 max-w-3xl text-lg font-medium text-foreground md:text-xl">{sub}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{copy}</p>
          <div className="mt-12">{visual}</div>
        </div>
      </section>
      <ChapterNav chapters={chapters} colour={colour} />
      {children}
      <ChallengeAdviser />
    </div>
  );
}

export function Chapter({ id, eyebrow, title, copy, children, raised }: { id: string; eyebrow: string; title: ReactNode; copy?: string; children?: ReactNode; raised?: boolean }) {
  return (
    <section id={id} className={cn("scroll-mt-32 py-16 md:py-24", raised && "bg-surface/40")}>
      <div className="shell">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--case)" }} />
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <h2 className="display-lg mt-5">{title}</h2>
          {copy ? <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{copy}</p> : null}
        </Reveal>
        {children ? <div className="mt-10 md:mt-14">{children}</div> : null}
      </div>
    </section>
  );
}

/* ---------- Tooltip-like logic note ---------- */
export function LogicNote({ children, label = "Source & logic" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex min-h-8 items-center gap-1 rounded-full px-2 text-[0.6875rem] text-muted-foreground hover:text-foreground"
      >
        <Info className="h-3.5 w-3.5" /> {label}
      </button>
      {open ? (
        <span role="note" className="absolute left-0 top-full z-20 mt-1 w-72 rounded-lg border border-border-strong bg-popover p-3 text-xs leading-relaxed text-popover-foreground shadow-lg">
          {children}
        </span>
      ) : null}
    </span>
  );
}

/* ---------- Workflow trace ---------- */
export type TraceStep = { kind: "Trigger" | "AI interpretation" | "Deterministic check" | "Human decision" | "System update" | "Audit record"; text: string };

export function DecisionTrace({ steps, title = "Underlying workflow" }: { steps: TraceStep[]; title?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between px-4 text-left text-sm font-medium"
      >
        <span>{open ? "Hide" : "View"} {title.toLowerCase()}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ol className="space-y-3 border-t border-border p-4">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[8.5rem_1fr] gap-3 text-sm max-sm:grid-cols-1 max-sm:gap-0.5">
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em]" style={{ color: s.kind === "Human decision" ? "var(--prism-colour-3)" : "var(--case)" }}>
                {s.kind}
              </span>
              <span className="text-muted-foreground">{s.text}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

/* ---------- Stepper ---------- */
export function WorkflowStepper({ steps, active, onChange }: { steps: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div role="tablist" aria-label="Workflow stages" className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onChange(Math.min(steps.length - 1, active + 1));
        if (e.key === "ArrowLeft") onChange(Math.max(0, active - 1));
      }}
    >
      {steps.map((s, i) => (
        <button
          key={s}
          role="tab"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onChange(i)}
          className={cn(
            "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-colors",
            i === active ? "border-transparent bg-foreground text-background" : i < active ? "border-border-strong text-foreground" : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="tabular-nums opacity-70">{String(i + 1).padStart(2, "0")}</span>
          {s}
        </button>
      ))}
    </div>
  );
}

/* ---------- Control panel slider ---------- */
export function ControlSlider({ label, value, min, max, step = 1, onChange, format = (v: number) => String(v) }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-xs text-muted-foreground">
        {label}
        <span className="font-medium tabular-nums text-foreground">{format(value)}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-6 w-full cursor-pointer accent-[var(--case)]"
      />
    </label>
  );
}

export function ControlPanel({ children, title = "Change the assumptions" }: { children: ReactNode; title?: string }) {
  return (
    <div className="glass space-y-5 p-5 md:p-6">
      <p className="eyebrow">{title}</p>
      {children}
    </div>
  );
}

/* ---------- Human approval ---------- */
export function HumanApproval({ who, reason, state = "pending" }: { who: string; reason: string; state?: "pending" | "required" | "approved" }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-prism-3/40 bg-prism-3/5 p-4">
      <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-prism-3" />
      <div className="text-sm">
        <p className="font-medium">Human decision {state === "approved" ? "recorded" : "required"} · {who}</p>
        <p className="mt-1 text-muted-foreground">{reason}</p>
      </div>
    </div>
  );
}

/* ---------- Generic lists ---------- */
export function PainGrid({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li key={p.title} className="bg-background p-6">
          <span className="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-3 font-display text-lg font-medium">{p.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
        </li>
      ))}
    </ul>
  );
}

export function Controls({ items }: { items: { title: string; copy: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <li key={c.title} className="glass p-5">
          <ShieldCheck className="h-4 w-4" style={{ color: "var(--case)" }} />
          <p className="mt-3 font-medium">{c.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
        </li>
      ))}
    </ul>
  );
}

export function Phases({ steps }: { steps: { title: string; copy: string }[] }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-xl border border-border p-5">
          <span className="font-display text-2xl tabular-nums" style={{ color: "var(--case)" }}>{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-3 font-medium">{s.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {f.q}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Related ---------- */
export function RelatedCaseStudies({ slugs, pillarTo, pillarName }: { slugs: string[]; pillarTo: string; pillarName: string }) {
  const items = caseStudies.filter((c) => slugs.includes(c.slug));
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((c) =>
        c.live ? (
          <Link key={c.slug} to={c.to as never} className="glass glass-hover group block p-6">
            <span className="h-1.5 w-8 rounded-full block" style={{ background: colourVar(c.colour) }} />
            <p className="mt-4 text-xs text-muted-foreground">{c.category}</p>
            <p className="mt-1 font-display text-xl font-medium">{c.title}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm">Explore workflow <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ) : (
          <div key={c.slug} className="rounded-2xl border border-dashed border-border p-6">
            <span className="h-1.5 w-8 rounded-full block opacity-50" style={{ background: colourVar(c.colour) }} />
            <p className="mt-4 text-xs text-muted-foreground">{c.category}</p>
            <p className="mt-1 font-display text-xl font-medium text-muted-foreground">{c.title}</p>
            <span className="mt-4 inline-block text-xs text-muted-foreground">Blueprint in development</span>
          </div>
        ),
      )}
      <Link to={pillarTo as never} className="group flex flex-col justify-between rounded-2xl border border-border p-6 hover:bg-accent">
        <p className="text-xs text-muted-foreground">Return to pillar</p>
        <p className="mt-4 font-display text-xl font-medium">{pillarName}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm">View pillar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
      </Link>
    </div>
  );
}

export function ClosingLine({ lines }: { lines: string[] }) {
  return (
    <section className="py-20 md:py-32">
      <div className="shell text-center">
        <div className="spectrum-rule mx-auto mb-10 max-w-24" />
        <p className="display-lg mx-auto max-w-4xl">
          {lines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

export const fmtMoney = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : n >= 1000 ? `$${Math.round(n / 1000).toLocaleString("en-AU")}k` : `$${Math.round(n).toLocaleString("en-AU")}`;
export const fmtNum = (n: number) => Math.round(n).toLocaleString("en-AU");

export function CaseCta({ heading, copy, cta }: { heading: string; copy: string; cta: string }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="rounded-3xl border border-border bg-surface/40 p-8 md:p-12">
          <p className="eyebrow">Talk to Prism</p>
          <h2 className="display-lg mt-4 max-w-3xl">{heading}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{copy}</p>
          <Link to="/contact" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90">
            {cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
