import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { caseCategories, caseCategoryLabel, caseStudies, challenges, type CaseStudy, type Challenge } from "@/lib/case-studies";
import { colourVar } from "@/lib/prism";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/case/Kit";
import { ChallengeAdviserSafe as ChallengeAdviser } from "@/components/prism/ChallengeAdviser";

const path = "/case-studies";
const title = "Case Studies — From AI ambition to business impact | Prism Group";
const description =
  "Interactive solution blueprints showing how intelligent workflows connect data, decisions and action across procurement, supply chain, compliance, finance, field services and executive leadership.";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: pageMeta({ title, description, path, ogTitle: "Case Studies — Prism Group" }),
    links: canonical(path),
    scripts: ldScripts(breadcrumbLd([{ name: "Case Studies", path }]), webPageLd({ name: title, description, path })),
  }),
  component: Page,
});

function Page() {
  const [cat, setCat] = useState<(typeof caseCategories)[number]>("All");
  const [ch, setCh] = useState<Challenge | null>(null);
  const list = caseStudies.filter((c) => (cat === "All" || c.category === cat) && (!ch || c.challenges.includes(ch)));
  const [featured, ...rest] = list;
  return (
    <div>
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
        <SystemVisual />
        <div className="shell relative">
          <p className="eyebrow">Explore practical applications of the Prism ecosystem</p>
          <h1 className="display-xl mt-6 max-w-5xl">FROM AI AMBITION TO BUSINESS IMPACT.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore how intelligent workflows connect data, decisions and action — across enterprise operations, field services and executive leadership.
          </p>
          <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
            These are detailed solution blueprints and illustrative use cases, not reports of completed client projects. All demonstration data is synthetic.
          </p>
        </div>
      </section>

      <div className="border-y border-border">
        <ol className="shell flex flex-wrap items-center justify-between gap-y-2 py-5 font-display text-sm tracking-[0.12em] md:text-base">
          {["SIGNAL", "INTELLIGENCE", "ACTION", "MEASURABLE OUTCOME"].map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span style={{ color: colourVar((i * 2 + 1) as 1) }}>{s}</span>
              {i < 3 ? <span aria-hidden="true" className="text-muted-foreground">→</span> : null}
            </li>
          ))}
        </ol>
      </div>

      <ChallengeAdviser />

      <section className="py-14 md:py-20">
        <div className="shell">
          <p className="eyebrow">Real-world problems. Intelligent workflows.</p>
          <h2 className="display-lg mt-4">SEE WHAT AI CAN ACTUALLY CHANGE.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Not just ideas. Explore the workflows, decisions and business mechanics behind practical AI transformation.</p>

          <div role="tablist" aria-label="Category" className="mt-10 flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {caseCategories.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn("min-h-11 shrink-0 rounded-full px-4 text-sm", cat === c ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}>
                {caseCategoryLabel[c]}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-muted-foreground">Explore by challenge</span>
            {challenges.map((c) => (
              <button key={c} aria-pressed={ch === c} onClick={() => setCh(ch === c ? null : c)}
                className={cn("min-h-10 rounded-full border px-3 text-xs", ch === c ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 space-y-6" aria-live="polite">
            {list.length === 0 ? <p className="text-muted-foreground">No case matches this combination.</p> : null}
            {featured ? <Tile c={featured} featured /> : null}
            {featured?.slug === "intelligent-procurement" ? (
              <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                Discuss a similar solution <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            <div className="grid gap-6 md:grid-cols-2">{rest.map((c) => <Tile key={c.slug} c={c} />)}</div>
          </div>
        </div>
      </section>

      <section className="bg-surface/40 py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">How Prism creates value</p>
          <h2 className="display-lg mt-4 max-w-3xl">A credible route to self-funding AI.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">AI investment should have a credible path to paying for itself — modelled up front and measured after go-live. That is a design goal, not a guaranteed return.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {[["Discover", "Find the workflows where friction costs most."], ["Model value", "Quantify scenarios with transparent assumptions."], ["Engineer", "Build the workflow, rules and AI with evidence links."], ["Govern", "Embed approvals, controls and audit trails."], ["Measure", "Track realised KPIs against the baseline."]].map(([t, c], i) => (
              <li key={t} className="rounded-xl border border-border p-5">
                <span className="font-display text-2xl tabular-nums" style={{ color: colourVar((i + 1) as 1) }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-medium">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c}</p>
              </li>
            ))}
          </ol>
          <Link to="/contact" className="mt-10 mr-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background">
            Talk to Prism about your opportunity <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/ventures" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            Explore our seven pillars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Tile({ c, featured }: { c: CaseStudy; featured?: boolean }) {
  const body = (
    <div className={cn("grid h-full gap-6", featured && "lg:grid-cols-[1fr_1.1fr] lg:items-center")}>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="h-2 w-2 rounded-full" style={{ background: colourVar(c.colour) }} />
          <p className="text-xs text-muted-foreground">{c.category}</p>
          {!c.live ? <span className="rounded-full border border-border px-2 py-0.5 text-[0.6875rem] text-muted-foreground">In development</span> : null}
        </div>
        <h3 className={cn("mt-4 font-display font-medium", featured ? "text-3xl md:text-4xl" : "text-2xl")}>{c.title}</h3>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{c.signature}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.chips.map((x) => <span key={x} className="rounded-full border border-border px-3 py-1 text-xs">{x}</span>)}
        </div>
        {c.live ? <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">{featured ? "Explore the transformation" : "Explore case study"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span> : null}
      </div>
      <MiniVisual c={c} featured={featured} />
    </div>
  );
  const cls = cn("group block rounded-3xl border p-6 md:p-8 transition-colors", c.live ? "border-border bg-surface/40 hover:border-border-strong" : "border-dashed border-border");
  return c.live ? <Link to={c.to as never} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
}

function MiniVisual({ c, featured }: { c: CaseStudy; featured?: boolean | undefined }) {
  const nodes = c.slug === "intelligent-procurement" ? ["Contracts", "Spend", "Suppliers", "Compliance"] : c.chips;
  return (
    <div className={cn("relative rounded-2xl border border-border bg-background/60 p-4", !featured && "hidden sm:block")} aria-hidden="true">
      <DemoBadge className="mb-4" />
      <div className="grid grid-cols-2 gap-2">
        {nodes.map((n, i) => (
          <div key={n} className="rounded-lg border border-border p-3 transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:transform-none" style={{ transitionDelay: `${i * 60}ms` }}>
            <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">{n}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full" style={{ width: `${45 + ((i * 17) % 45)}%`, background: colourVar(c.colour) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemVisual() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-10 hidden h-[28rem] w-[36rem] opacity-60 lg:block" viewBox="0 0 360 280" fill="none">
      {[[40, 50], [60, 200], [180, 30], [320, 80], [300, 230], [170, 250]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={180} y2={140} stroke={colourVar((i + 1) as 1)} strokeOpacity={0.5} strokeWidth={0.75} strokeDasharray="3 5">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </line>
          <circle cx={x} cy={y} r={4} fill={colourVar((i + 1) as 1)} />
        </g>
      ))}
      <circle cx={180} cy={140} r={18} stroke="currentColor" strokeOpacity={0.4} />
      <circle cx={180} cy={140} r={5} fill="currentColor" />
    </svg>
  );
}
