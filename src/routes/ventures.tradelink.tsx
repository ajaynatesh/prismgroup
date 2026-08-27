import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Phone, QrCode, Shield, Smartphone } from "lucide-react";
import { Reveal } from "@/components/prism/Reveal";
import { GhostLink, PrimaryLink, Section, SectionHeading } from "@/components/prism/ui";
import {
  ActionCloud,
  AiBehind,
  BookingPayments,
  CrmBlock,
  FollowUpBlock,
  FrontDesk,
  JobBoard,
  Manifesto,
  MarketProblem,
  QualificationBlock,
  TeamRoles,
  ThesisBlocks,
  TrustPillars,
  ValueDimensions,
  ValueLevers,
  WhyTradeLink,
} from "@/components/prism/tl/Blocks";
import {
  AiTaskGrid,
  AutomationRules,
  BeforeAfter,
  CustomerMemory,
  IndustryExplorer,
  OwnerDashboard,
  QrUseCases,
  RoiCalculator,
  SegmentBuilder,
  WhatsAppSimulator,
} from "@/components/prism/tl/Interactive";
import { Phone as PhoneShell, ChatThread } from "@/components/prism/tl/Phone";
import {
  BusinessLoop,
  ComparisonTable,
  Flywheel,
  FrictionChain,
  IntegrationMap,
  Panel,
  QrMoment,
  SimpleByDesign,
  StackDiagram,
  Tag,
} from "@/components/prism/tl/Visuals";
import { Extra } from "@/components/prism/PillarExtra";
import { faqs, heroThread, TL_COLOUR, tlAccent } from "@/lib/tradelink";

const accent = tlAccent;
const title = "Prism TradeLink — WhatsApp-first business platform";
const description =
  "Prism TradeLink turns WhatsApp into a complete business operating system for mobile-first companies: intelligent lead capture, bookings, quotes, payments, CRM, follow-ups and automation — all in one conversation.";
const url = "https://prismgroup.com.au/ventures/tradelink";

export const Route = createFileRoute("/ventures/tradelink")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "WhatsApp business platform, WhatsApp CRM, AI WhatsApp automation, small business automation, trades automation, mobile-first CRM, WhatsApp booking system, WhatsApp payments, lead qualification, customer follow-up automation, digital front desk, business messaging Australia",
      },
      { property: "og:title", content: "Your business. In your pocket. — Prism TradeLink" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "Prism TradeLink",
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "WhatsApp-first business operating system",
              operatingSystem: "Web / WhatsApp",
              description,
              brand: { "@type": "Organization", name: "Prism Group" },
              featureList: [
                "WhatsApp-first customer conversations",
                "AI-powered lead qualification",
                "Booking and appointment scheduling",
                "Quotes and estimates",
                "Payment requests and receipts",
                "Customer CRM and history",
                "Automated follow-ups",
                "Team collaboration",
                "Business system integrations",
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function AnchorCta({ href, children, primary }: { href: string; children: string; primary?: boolean }) {
  return (
    <a
      href={href}
      className={
        primary
          ? "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          : "group inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
      }
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Statement({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <Reveal>
      <h2 className="display-lg uppercase">{children}</h2>
      {sub ? <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{sub}</p> : null}
    </Reveal>
  );
}

function Page() {
  return (
    <div>
      {/* 01 Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `radial-gradient(60% 70% at 78% 26%, color-mix(in oklab, ${accent} 11%, transparent) 0%, transparent 72%)`,
          }}
        />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <p className="eyebrow">Prism TradeLink</p>
            </div>
            <h1 className="display-xl mt-6 uppercase">
              Your business.
              <br />
              In your pocket.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              TradeLink turns WhatsApp into a complete operating system for mobile-first businesses — intelligently
              capturing leads, booking jobs, sending quotes, taking payments and following up customers, all inside the
              conversation they already use.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <AnchorCta href="#simulator" primary>
                See TradeLink work
              </AnchorCta>
              <AnchorCta href="#industries">Explore industries</AnchorCta>
            </div>
            <dl className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Capture", copy: "Every enquiry becomes a structured lead record." },
                { title: "Convert", copy: "Quote, book and take payment without leaving WhatsApp." },
                { title: "Retain", copy: "Automated follow-up turns one job into a customer." },
              ].map((o) => (
                <div key={o.title}>
                  <span className="block h-px w-8" style={{ background: accent }} aria-hidden="true" />
                  <dt className="mt-4 font-display text-sm font-semibold uppercase tracking-tight">{o.title}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
          <PhoneShell title="Prism TradeLink" subtitle="Business account · online">
            <ChatThread thread={heroThread} autoplay interval={1600} height="30rem" />
          </PhoneShell>
        </div>
      </section>

      {/* 02 Problem */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="The problem"
            title="Small businesses run on chaos."
            copy="Owners spend their days switching between WhatsApp, calls, texts, calendars, spreadsheets and banking apps — while customers expect instant, helpful responses."
          />
          <div className="mt-14">
            <MarketProblem />
          </div>
        </div>
      </Section>

      {/* 03 Thesis */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Thesis"
            title="The conversation is the business system."
            copy="TradeLink is built on three principles that make it different from generic CRM or chatbot tools."
          />
          <div className="mt-14">
            <ThesisBlocks />
          </div>
        </div>
      </Section>

      {/* 04 Business loop */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="How it works"
            title="One conversation. The full customer lifecycle."
            copy="From first message to repeat customer, TradeLink keeps the entire workflow inside WhatsApp."
          />
          <div className="mt-14">
            <BusinessLoop />
          </div>
        </div>
      </Section>

      {/* 05 Friction chain */}
      <Section>
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <Statement sub="Every arrow is the owner, doing work that should be automated.">
                The manual loop
              </Statement>
              <div className="mt-10">
                <FrictionChain />
              </div>
            </div>
            <div>
              <Statement sub="The same journey, when TradeLink runs it.">The TradeLink loop</Statement>
              <div className="mt-10">
                <PhoneShell title="Prism TradeLink" subtitle="Business account · online" glow={false}>
                  <ChatThread thread={heroThread.slice(0, 7)} step={7} height="30rem" />
                </PhoneShell>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 06 Simulator */}
      <Section tone="raised" id="simulator">
        <div className="shell">
          <WhatsAppSimulator />
        </div>
      </Section>

      {/* 07 Actions */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="What customers and businesses can do in one thread."
          />
          <div className="mt-14">
            <ActionCloud />
          </div>
        </div>
      </Section>

      {/* 08 Qualification + Booking + Payments */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Workflows"
            title="From enquiry to paid job — without the back-and-forth."
          />
          <div className="mt-14 space-y-14">
            <QualificationBlock />
            <BookingPayments />
            <CrmBlock />
          </div>
        </div>
      </Section>

      {/* 09 Job board */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Operations"
            title="See every job. Know where it stands."
            copy="A lightweight job board gives the owner, admin and technician a shared view of work in progress."
          />
          <div className="mt-14">
            <JobBoard />
          </div>
        </div>
      </Section>

      {/* 10 Follow-up */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Follow-up"
            title="The revenue is in the follow-up."
            copy="Most small businesses are too busy to chase every quote or re-engage past customers. TradeLink does it automatically."
          />
          <div className="mt-14 space-y-14">
            <FollowUpBlock />
            <SegmentBuilder />
          </div>
        </div>
      </Section>

      {/* 11 AI behind */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Intelligence"
            title="AI that works behind the conversation."
            copy="Customers see a clear, helpful WhatsApp thread. Behind it, AI extracts details, classifies intent and keeps workflows moving."
          />
          <div className="mt-14">
            <AiBehind />
          </div>
        </div>
      </Section>

      {/* 12 Customer memory */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Customer memory"
            title="Never make a customer start from zero."
            copy="When a customer returns, TradeLink already knows their history, preferences and open jobs."
          />
          <div className="mt-14">
            <CustomerMemory />
          </div>
        </div>
      </Section>

      {/* 13 Owner dashboard */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Owner view"
            title="Run the business from your phone."
            copy="A single dashboard shows what needs attention today: new leads, bookings, quotes, payments and urgent actions."
          />
          <div className="mt-14">
            <OwnerDashboard />
          </div>
        </div>
      </Section>

      {/* 14 Team */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Team"
            title="Built for the way small teams actually work."
            copy="Owner, admin, sales, technician and customer service each get the context they need — without complexity."
          />
          <div className="mt-14">
            <TeamRoles />
          </div>
        </div>
      </Section>

      {/* 15 Automation rules */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Automation"
            title="If this, then that — for your business."
            copy="Trigger workflows from real events: a new lead, a quote accepted, a job completed, a payment overdue."
          />
          <div className="mt-14">
            <AutomationRules />
          </div>
        </div>
      </Section>

      {/* 16 QR moment */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Lead capture"
            title="Scan. Message. Booked."
            copy="A QR code on a van, shopfront, invoice or flyer starts a qualified WhatsApp conversation instantly."
          />
          <div className="mt-14">
            <QrMoment items={["Van", "Shopfront", "Invoice", "Flyer", "Website", "Social media"]} />
          </div>
        </div>
      </Section>

      {/* 17 Stack + Integration */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Architecture"
            title="A five-layer platform, simple at the top."
            copy="TradeLink connects the customer conversation to the business systems that already run the company."
          />
          <div className="mt-14 space-y-14">
            <StackDiagram />
            <IntegrationMap />
            <SimpleByDesign />
          </div>
        </div>
      </Section>

      {/* 18 Industries */}
      <Section tone="raised" id="industries">
        <div className="shell">
          <SectionHeading
            eyebrow="Industries"
            title="Built for mobile, quote-driven businesses."
            copy="Trades are the highest-fit starting market. The same pattern applies to home services, automotive, professional services and more."
          />
          <div className="mt-14">
            <IndustryExplorer />
          </div>
        </div>
      </Section>

      {/* 19 Before / after */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Contrast"
            title="From scattered tools to one conversation."
          />
          <div className="mt-14">
            <BeforeAfter />
          </div>
        </div>
      </Section>

      {/* 20 Value */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Business value"
            title="Capture more. Convert more. Retain more."
          />
          <div className="mt-14 space-y-14">
            <ValueLevers />
            <ValueDimensions />
          </div>
        </div>
      </Section>

      {/* 21 ROI */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Opportunity model"
            title="What is a faster response worth?"
            copy="Adjust the inputs to estimate how many enquiries, leads and revenue TradeLink could recover."
          />
          <div className="mt-14">
            <RoiCalculator />
          </div>
        </div>
      </Section>

      {/* 22 Trust */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Trust"
            title="Built with consent, control and auditability."
            copy="TradeLink is designed around customer permission, message governance, access controls and human escalation."
          />
          <div className="mt-14">
            <TrustPillars />
          </div>
        </div>
      </Section>

      {/* 23 Flywheel */}
      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Flywheel"
            title="More conversations create more value."
            copy="Every interaction adds customer data, which improves context, which improves follow-up, which drives repeat business."
          />
          <div className="mt-14">
            <Flywheel />
          </div>
        </div>
      </Section>

      {/* 24 Why TradeLink */}
      <Section tone="raised">
        <div className="shell">
          <SectionHeading
            eyebrow="Why TradeLink"
            title="Five reasons businesses choose it."
          />
          <div className="mt-14">
            <WhyTradeLink />
          </div>
        </div>
      </Section>

      {/* 25 Manifesto */}
      <Section>
        <div className="shell">
          <Manifesto />
        </div>
      </Section>

      {/* 26 FAQ */}
      <Section tone="raised">
        <div className="shell max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            align="center"
          />
          <div className="mt-14 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-surface/30 px-5 py-4 open:bg-surface/60"
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-sm font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-open:rotate-[-90deg]" />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 27 CTA */}
      <Section>
        <div className="shell text-center">
          <Reveal>
            <div className="spectrum-rule mx-auto max-w-32" />
            <h2 className="display-lg mx-auto mt-10 max-w-2xl">What could your business do if every message became a workflow?</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PrimaryLink to="/contact">Talk to Prism</PrimaryLink>
              <GhostLink to="/ventures">Explore Our Ventures</GhostLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Extra />
    </div>
  );
}
