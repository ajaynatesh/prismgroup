import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/prism/Reveal";
import { Section } from "@/components/prism/ui";
import { ArrowRight } from "lucide-react";

const title = "Contact Prism Group — Start with the problem";
const description =
  "Talk to Prism Group about AI transformation, enterprise technology, decision intelligence, TradeLink, AlwaysOn AI, SpectraIQ.ai or Prism Diagnostics.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const topics = [
  "AI Transformation",
  "Enterprise Technology",
  "Decision Intelligence",
  "SpectraIQ.ai",
  "TradeLink",
  "AlwaysOn AI",
  "Prism Diagnostics",
  "Other",
];

const fieldClass =
  "w-full rounded-md border border-input bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px] opacity-[0.14]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(45% 100% at 25% 0%, var(--prism-colour-5), transparent 70%), radial-gradient(40% 100% at 70% 0%, var(--prism-colour-6), transparent 70%)",
          }}
        />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display-xl mt-6 max-w-3xl">Have a problem worth solving?</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Whether you are looking to transform an operation, deploy AI, modernise technology, improve
              decision-making or explore one of our ventures, let's start with the problem.
            </p>
          </Reveal>
        </div>
      </header>

      <Section className="pt-8 md:pt-10">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Capabilities</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  AI Transformation &amp; Automation · Enterprise AI &amp; Technology Transformation
                </p>
              </div>
              <div className="hairline pt-8">
                <p className="eyebrow">Ventures</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  SpectraIQ.ai · Prism DecisionIQ · Prism TradeLink · Prism AlwaysOn AI · Prism Diagnostics
                </p>
              </div>
              <div className="hairline pt-8">
                <p className="eyebrow">Our approach</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Discover → Intelligently model → Engineer → Deploy → Scale
                </p>
              </div>
              <div className="spectrum-rule max-w-40" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              className="panel p-6 md:p-9"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Thanks — your enquiry has been captured.", {
                  description: "A member of the Prism team will be in touch.",
                });
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="eyebrow">
                    Name
                  </label>
                  <input id="name" name="name" required className={`${fieldClass} mt-2.5`} autoComplete="name" />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="company" className="eyebrow">
                    Company
                  </label>
                  <input id="company" name="company" className={`${fieldClass} mt-2.5`} autoComplete="organization" />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="eyebrow">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`${fieldClass} mt-2.5`}
                    autoComplete="email"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="eyebrow">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" className={`${fieldClass} mt-2.5`} autoComplete="tel" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="eyebrow">
                    What can we help you with?
                  </label>
                  <select id="topic" name="topic" defaultValue={topics[0]} className={`${fieldClass} mt-2.5`}>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="eyebrow">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} required className={`${fieldClass} mt-2.5`} />
                </div>
              </div>
              <button
                type="submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              >
                {sent ? "Enquiry received" : "Start a Conversation"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
