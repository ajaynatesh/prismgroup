import { Component, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  Mail,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  adviserCapabilities,
  adviserCases,
  briefText,
  challengeInputSchema,
  enquiryDraft,
  type Brief,
} from "@/lib/challenge-adviser";
import { adviserLocation, adviserStartOnce, observeAdviserView, trackEvent } from "@/lib/analytics";

// The server-function module must never be imported eagerly: in the static
// (GitHub Pages) build its module-scope createServerFn chain is unavailable
// and would crash the whole route chunk. It is loaded on demand, only when a
// visitor actually submits, and only in the server-hosted build.
async function callAdviser(challenge: string): Promise<AdviserResult> {
  const { recommendChallenge } = await import("@/lib/challenge-adviser.functions");
  return recommendChallenge({ data: { challenge } });
}

type AdviserResult =
  | { brief: Brief; error: null }
  | { brief: null; error: string };

// If the adviser ever fails to render, the rest of the page must survive.
class AdviserBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(error: unknown) {
    console.error(error);
  }
  override render() {
    if (this.state.failed) {
      return (
        <section className="border-y border-border bg-surface/40 py-14 md:py-20">
          <div className="shell">
            <p className="eyebrow">Prism opportunity adviser</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              We’re unable to show the recommendation tool right now. Please try again shortly
              or <Link to="/contact" className="underline underline-offset-4">contact Prism directly</Link>.
            </p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export function ChallengeAdviserSafe({ showPageLink = true }: { showPageLink?: boolean }) {
  return (
    <AdviserBoundary>
      <ChallengeAdviser showPageLink={showPageLink} />
    </AdviserBoundary>
  );
}

const examples = [
  {
    label: "Finance friction",
    text: "Our finance team manually checks invoices against purchase orders across disconnected systems. Duplicates and approval delays are slowing month-end close. We want a safer, faster process with human oversight.",
  },
  {
    label: "Lost enquiries",
    text: "We run a plumbing business and struggle to respond to WhatsApp enquiries while on jobs. Quotes and follow-ups get missed. We want to capture enquiries, manage bookings and keep customers updated.",
  },
  {
    label: "Disconnected decisions",
    text: "Our leadership team receives production, cost and sales reports from different systems. Numbers don't align and decisions take too long. We need a shared performance view and clearer scenario planning.",
  },
];

export function ChallengeAdviser({ showPageLink = true }: { showPageLink?: boolean }) {
  const [challenge, setChallenge] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const section = useRef<HTMLElement>(null);
  const isStatic = import.meta.env["VITE_PRISM_STATIC"] === "true";

  // GA4: fire opportunity_advisor_view once when the advisor scrolls into view.
  useEffect(() => observeAdviserView(section.current), []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const parsed = challengeInputSchema.safeParse({ challenge });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please describe your challenge.");
      input.current?.focus();
      return;
    }
    setBusy(true);
    setError(null);
    setBrief(null);
    setCopied(false);
    // GA4: behavioural metadata only — never the raw challenge text.
    const pagePath = window.location.pathname;
    trackEvent("opportunity_advisor_submit", {
      page_path: pagePath,
      advisor_location: adviserLocation(pagePath),
      input_length: parsed.data.challenge.length,
    });
    const startedAt = performance.now();
    try {
      const response = await callAdviser(parsed.data.challenge);
      if (response.error) setError(response.error);
      else if (response.brief) {
        setBrief(response.brief);
        trackEvent("opportunity_advisor_result", {
          page_path: pagePath,
          advisor_location: adviserLocation(pagePath),
          response_status: "success",
          response_time_ms: Math.round(performance.now() - startedAt),
        });
        const draft = enquiryDraft(response.brief);
        setEmailSubject(draft.subject);
        setEmailBody(draft.body);
        setShowEmail(false);
        setEmailCopied(false);
      }
    } catch (cause) {
      console.error("Adviser request failed:", cause);
      setError(
        "The adviser could not be reached. Please contact Prism directly; your description has been kept here.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(briefText(brief));
      setCopied(true);
    } catch {
      setError("Copy is unavailable in this browser. You can select and copy the brief below.");
    }
  }

  const signedBody = () =>
    senderName.trim() ? `${emailBody.trimEnd()}\n${senderName.trim()}` : emailBody;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${signedBody()}`);
      setEmailCopied(true);
    } catch {
      setError("Copy is unavailable in this browser. You can select and copy the email below.");
    }
  }

  return (
    <section
      id="challenge-adviser"
      aria-labelledby="adviser-title"
      className="border-y border-border bg-surface/40 py-14 md:py-20"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Network className="size-5 text-prism-4" aria-hidden="true" />
              <p className="eyebrow">Prism opportunity adviser</p>
            </div>
            <h2 id="adviser-title" className="display-lg max-w-xl">
              YOUR CHALLENGE.
              <br />A CLEARER NEXT STEP.
            </h2>
            <div className="spectrum-rule mt-8 max-w-40" aria-hidden="true" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              AI-generated guidance · Reviewed with you by Prism before any implementation.
            </p>
            {showPageLink ? (
              <p className="mt-4 text-sm">
                <Link
                  to="/ai-opportunity-advisor"
                  className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  How the AI Opportunity Advisor works <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            ) : null}
          </div>
          {isStatic ? (
            <div className="self-center space-y-5">
              <p className="text-muted-foreground">
                The AI adviser is available on Prism’s main website.
              </p>
              <Button asChild className="min-h-11 h-auto whitespace-normal">
                <a href="https://prismgroup.au/contact#challenge-adviser">
                  Open Prism opportunity adviser <ArrowUpRight />
                </a>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="min-w-0">
              <label htmlFor="prism-challenge" className="text-sm font-medium">
                What is holding your operations back?
              </label>
              <Textarea
                ref={input}
                id="prism-challenge"
                value={challenge}
                onChange={(e) => {
                  setChallenge(e.target.value);
                  setCopied(false);
                }}
                maxLength={3000}
                disabled={busy}
                aria-describedby="challenge-privacy challenge-count"
                aria-invalid={Boolean(error)}
                placeholder="Describe the workflow, where it gets stuck, and the outcome you need…"
                className="mt-3 min-h-44 resize-y bg-background p-4 text-base leading-relaxed md:text-base"
              />
              <div className="mt-3 flex items-start justify-between gap-4 text-xs text-muted-foreground">
                <p id="challenge-privacy" className="max-w-md leading-relaxed">
                  Processed by AI. Do not include personal, client, or confidential information.
                  Prism does not save your description or brief.
                </p>
                <span id="challenge-count" className="shrink-0 tabular-nums">
                  {challenge.length}/3,000
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Example challenges">
                {examples.map((e) => (
                  <Button
                    key={e.label}
                    type="button"
                    variant="outline"
                    className="min-h-11 text-xs"
                    disabled={busy}
                    onClick={() => {
                      setChallenge(e.text);
                      setError(null);
                      input.current?.focus();
                    }}
                  >
                    {e.label}
                  </Button>
                ))}
              </div>
              <Button
                type="submit"
                disabled={busy || !challenge.trim()}
                className="mt-6 min-h-12 h-auto w-full whitespace-normal px-5 py-3 sm:w-auto"
              >
                {busy ? (
                  <>
                    <LoaderCircle className="animate-spin motion-reduce:animate-none" /> Preparing
                    your brief…
                  </>
                ) : (
                  <>
                    Find my next step <ArrowRight />
                  </>
                )}
              </Button>
              {busy ? (
                <p role="status" className="mt-3 text-sm text-muted-foreground">
                  Matching your challenge to Prism’s capabilities and published blueprints…
                </p>
              ) : null}
            </form>
          )}
        </div>
        {error ? (
          <div
            role="alert"
            className="mt-6 border-l-2 border-destructive pl-4 text-sm leading-relaxed"
          >
            <p>{error}</p>
            <Button asChild variant="link" className="mt-2 h-auto min-h-11 px-0">
              <Link to="/contact">
                Contact Prism <ArrowRight />
              </Link>
            </Button>
          </div>
        ) : null}
        {brief ? (
          <div className="mt-12 border-t border-border pt-10" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-2xl">Your opportunity brief</h3>
              <Button type="button" variant="outline" className="min-h-11" onClick={copyBrief}>
                {copied ? <Check /> : <Copy />}
                {copied ? "Copied" : "Copy brief"}
              </Button>
            </div>
            <p className="mt-5 max-w-3xl leading-relaxed">{brief.summary}</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="eyebrow">Relevant capabilities &amp; portfolio</h4>
                <ul className="mt-4 divide-y divide-border">
                  {brief.capabilities.map((m) => {
                    const p = adviserCapabilities.find((p) => p.id === m.id);
                    return p ? (
                      <li key={m.id} className="py-4">
                        <Button
                          asChild
                          variant="link"
                          className="h-auto min-h-11 justify-start whitespace-normal px-0 text-left"
                        >
                          <a href={p.href}>
                            {p.title}
                            <ArrowUpRight />
                          </a>
                        </Button>
                        {p.kind === "Independent company" ? (
                          <p className="mb-2 text-xs text-muted-foreground">
                            Independent company · Prism founder is a shareholder
                          </p>
                        ) : null}
                        <p className="text-sm leading-relaxed text-muted-foreground">{m.reason}</p>
                      </li>
                    ) : null;
                  })}
                </ul>
                {!brief.capabilities.length ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No close capability match identified. Discuss your context with Prism.
                  </p>
                ) : null}
              </div>
              <div>
                <h4 className="eyebrow">Matching case studies</h4>
                <p className="mt-3 text-xs text-muted-foreground">
                  Illustrative demo — synthetic data. Not completed client projects.
                </p>
                <ul className="mt-1 divide-y divide-border">
                  {brief.cases.map((m) => {
                    const c = adviserCases.find((c) => c.id === m.id);
                    return c ? (
                      <li key={m.id} className="py-4">
                        <Button
                          asChild
                          variant="link"
                          className="h-auto min-h-11 justify-start whitespace-normal px-0 text-left"
                        >
                          <a href={c.href}>
                            {c.title}
                            <ArrowUpRight />
                          </a>
                        </Button>
                        <p className="text-sm leading-relaxed text-muted-foreground">{m.reason}</p>
                      </li>
                    ) : null;
                  })}
                </ul>
                {!brief.cases.length ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No close published blueprint identified.
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-8 grid gap-10 border-t border-border pt-8 md:grid-cols-2">
              <div>
                <h4 className="eyebrow">Next-step brief</h4>
                <ol className="mt-5 space-y-5">
                  {brief.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-4 text-sm leading-relaxed">
                      <span className="font-display text-prism-4">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="eyebrow">Questions to explore</h4>
                <ul className="mt-5 list-disc space-y-4 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {brief.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
              {brief.caveat}
            </p>
            <Button
              type="button"
              className="mt-6 h-auto min-h-12 whitespace-normal px-5 py-3"
              onClick={() => setShowEmail((v) => !v)}
              aria-expanded={showEmail}
            >
              Discuss this brief with Prism <Mail />
            </Button>
            {showEmail ? (
              <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
                <h4 className="font-display text-xl">Your drafted enquiry</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Review or edit the email below, then open it in your email client — recipient,
                  subject and body are pre-filled.
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="enquiry-name" className="text-sm font-medium">
                      Your name <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input
                      id="enquiry-name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      maxLength={80}
                      placeholder="Added to the sign-off"
                      className="mt-2 bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="enquiry-subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      maxLength={120}
                      className="mt-2 bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="enquiry-body" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="enquiry-body"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="mt-2 min-h-64 resize-y bg-background p-4 text-sm leading-relaxed"
                    />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild className="h-auto min-h-12 whitespace-normal px-5 py-3">
                    <a
                      href={`mailto:ajay@spectraiq.ai?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(signedBody())}`}
                    >
                      Open email <ArrowRight />
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-12"
                    onClick={copyEmail}
                  >
                    {emailCopied ? <Check /> : <Copy />}
                    {emailCopied ? "Copied" : "Copy email"}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
