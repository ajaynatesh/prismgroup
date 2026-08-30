import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { principles } from "@/lib/prism";

const title = "About Prism Group — Building the intelligence layer";
const description =
  "Prism Group brings together entrepreneurs, technologists, AI specialists, domain experts, engineers and healthcare innovators to build and scale intelligent businesses.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const people = [
  "Entrepreneurs",
  "Technologists",
  "AI specialists",
  "Domain experts",
  "Engineers",
  "Healthcare innovators",
  "Transformation professionals",
];

function About() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] opacity-[0.13]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(50% 100% at 15% 0%, var(--prism-colour-6), transparent 70%), radial-gradient(40% 100% at 60% 0%, var(--prism-colour-4), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">About Prism</p>
            <h1 className="display-xl mt-6 max-w-4xl">
              We're building the intelligence layer for what comes next.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Prism Group is a technology and innovation group that builds, owns, operates and scales
              technology-driven businesses across AI transformation, enterprise technology, decision
              intelligence, mobile-first business platforms, AI-powered customer engagement and healthcare
              diagnostics.
            </p>
          </Reveal>
        </div>
      </header>

      <Section tone="raised" className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="The group" title="Builders, not bystanders." />
          <Reveal delay={0.1} className="space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              The group builds and scales solutions rather than simply advising from the sidelines. Domain
              expertise, data, artificial intelligence, automation and application engineering come together
              to create measurable commercial and operational outcomes.
            </p>
            <ul className="flex flex-wrap gap-2.5 pt-2">
              {people.map((p, i) => (
                <li
                  key={p}
                  className="panel inline-flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/90"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading eyebrow="How we think" title="Six principles." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="bg-background p-7 transition-colors hover:bg-surface md:p-9">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Scale"
            title="Built to think global."
            copy="Prism builds technology and intellectual property with the ambition to solve problems that exist across industries and markets."
          />
          <Reveal delay={0.1}>
            <div className="panel relative aspect-4/3 overflow-hidden">
              <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="200"
                    cy="150"
                    r={26 + i * 20}
                    fill="none"
                    stroke={`var(--prism-colour-${i + 1})`}
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 14 }).map((_, i) => {
                  const a = (i / 14) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="150"
                      x2={200 + Math.cos(a) * 165}
                      y2={150 + Math.sin(a) * 165}
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeWidth="1"
                    />
                  );
                })}
                {Array.from({ length: 20 }).map((_, i) => {
                  const a = (i / 20) * Math.PI * 2 + 0.3;
                  const r = 40 + ((i * 37) % 120);
                  return (
                    <circle
                      key={`d${i}`}
                      cx={200 + Math.cos(a) * r}
                      cy={150 + Math.sin(a) * r}
                      r="2"
                      fill={`var(--prism-colour-${(i % 7) + 1})`}
                      fillOpacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="shell text-center">
          <Reveal>
            <div className="spectrum-rule mx-auto max-w-32" />
            <h2 className="display-lg mx-auto mt-10 max-w-2xl">Have a problem worth solving?</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
              <GhostLink to="/ventures">Explore the Portfolio</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
