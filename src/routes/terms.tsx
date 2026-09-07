import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, canonical, ldScripts, pageMeta, webPageLd } from "@/lib/seo";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";

const title = "Terms of Use — Prism Group";
const description = "The terms that apply to your use of the Prism Group website and its content.";

const sections = [
  { h: "Use of this website", p: "This website is provided for general information about Prism Group, its capabilities and its ventures." },
  { h: "Content", p: "Content is provided in good faith and may change without notice. It does not constitute professional, financial, legal or clinical advice." },
  { h: "Intellectual property", p: "All trademarks, product names, content and design elements on this website are the property of Prism Group or its respective owners." },
  { h: "Third-party links", p: "Links to venture websites and third-party resources are provided for convenience. We are not responsible for their content." },
  { h: "Liability", p: "To the extent permitted by law, Prism Group is not liable for any loss arising from reliance on the content of this website." },
  { h: "Contact", p: "Questions about these terms can be sent through the contact page." },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/terms" }),
    links: canonical("/terms"),
    scripts: ldScripts(
      webPageLd({ name: title, description, path: "/terms" }),
      breadcrumbLd([{ name: "Terms of Use", path: "/terms" }]),
    ),
  }),
  component: Page,
});


function Page() {
  return (
    <>
      <header className="pt-32 pb-8 md:pt-44 md:pb-12">
        <div className="shell">
          <Reveal>
            <div className="spectrum-rule max-w-24" />
            <h1 className="display-lg mt-8">Terms of Use</h1>
          </Reveal>
        </div>
      </header>
      <Section className="pt-4 md:pt-6">
        <div className="shell max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <h2 className="font-display text-lg font-semibold tracking-tight">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
