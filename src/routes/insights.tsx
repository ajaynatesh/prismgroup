import { createFileRoute } from "@tanstack/react-router";
import { absUrl, breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import { insights } from "@/lib/prism";

const title = "Insights — AI, technology and transformation thinking | Prism Group";
const description =
  "Perspectives from Prism Group on AI, technology, business transformation, decision intelligence, healthcare and innovation.";

const categories = [
  "AI",
  "Technology",
  "Business Transformation",
  "Decision Intelligence",
  "Healthcare",
  "Innovation",
];

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: pageMeta({
      title,
      description,
      path: "/insights",
      ogTitle: "Prism thinking — insights on AI and transformation",
    }),
    links: canonical("/insights"),
    scripts: ldScripts(
      webPageLd({
        name: title,
        description,
        path: "/insights",
        type: "Blog",
        extra: { keywords: categories.join(", ") },
      }),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Prism Group insights",
        itemListElement: insights.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            articleSection: a.category,
            url: absUrl("/insights"),
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
          },
        })),
      },
      breadcrumbLd([{ name: "Insights", path: "/insights" }]),
    ),
  }),
  component: Insights,
});


function Insights() {
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Insights</p>
            <h1 className="display-xl mt-6 max-w-3xl">Thinking from the group.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Perspectives on where intelligence, engineering and domain expertise create real advantage.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {categories.map((c, i) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: `var(--prism-colour-${(i % 7) + 1})` }}
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      <Section className="pt-8 md:pt-10">
        <div className="shell grid gap-6 md:grid-cols-3">
          {insights.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <article className="panel group flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong">
                <span
                  className="block h-px w-10 transition-all duration-500 group-hover:w-20"
                  style={{ background: `var(--prism-colour-${a.colour})` }}
                  aria-hidden="true"
                />
                <p className="mt-6 eyebrow">{a.category}</p>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <p className="mt-auto pt-6 text-xs text-muted-foreground">{a.read}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="More coming"
            title="A growing library."
            copy="New perspectives are published as the group builds. Get in touch if there's a topic you'd like us to write about."
          />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <PrimaryLink to="/contact">Start a Conversation</PrimaryLink>
            <GhostLink to="/ventures">Explore the Portfolio</GhostLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
