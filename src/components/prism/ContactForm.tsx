import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { contactSubmissionSchema } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

const PRISM_EMAIL = "ajay@spectraiq.ai";

const isStaticBuild = import.meta.env["VITE_PRISM_STATIC"] === "true";
const STATIC_CONTACT_URL = "https://prismgroup.lovable.app/api/public/contact";

// Best-effort backup record of the enquiry. Never blocks the mailto handoff:
// any failure is swallowed so the visitor's email app still opens.
async function saveSubmission(payload: {
  name: string;
  email: string;
  company?: string | undefined;
  message: string;
  website?: string | undefined;
}): Promise<void> {
  try {
    if (isStaticBuild) {
      await fetch(STATIC_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return;
    }
    const { submitContactEnquiry } = await import("@/lib/contact.functions");
    await submitContactEnquiry({ data: payload });
  } catch {
    // Backup storage is optional — the email handoff is the primary path.
  }
}

function buildMailto(data: { name: string; email: string; company?: string | undefined; message: string }): string {
  const company = data.company?.trim();
  const subject = company
    ? `Prism Enquiry – ${company} – ${data.name}`
    : `Prism Enquiry – ${data.name}`;
  const lines = [
    "Hi Prism team,",
    "",
    "I’d like to get in touch regarding the following:",
    "",
    "Name:",
    data.name,
    "",
  ];
  if (company) {
    lines.push("Company:", company, "");
  }
  lines.push(
    "Email:",
    data.email,
    "",
    "Enquiry:",
    data.message,
    "",
    "I’d appreciate the opportunity to discuss this further.",
    "",
    "Kind regards,",
    data.name,
  );
  return `mailto:${PRISM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground/40";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = contactSubmissionSchema.safeParse({ name, email, company, message, website });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);

    // GA4: behavioural metadata only — never names, emails or message text.
    trackEvent("contact_prism_click", {
      page_path: window.location.pathname,
      source: "contact_form",
      form_name: "send_enquiry",
    });

    // Honeypot filled → bot. Pretend success, do nothing.
    if (!parsed.data.website) {
      await saveSubmission(parsed.data);
    }

    trackEvent("email_enquiry_opened", {
      page_path: window.location.pathname,
      source: "contact_form",
    });

    window.location.href = buildMailto(parsed.data);
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center">
        <p className="font-display text-xl font-medium tracking-tight">Your email is ready to send.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We've opened your email application with a pre-filled enquiry — just review it and press
          send. If your email application didn't open, email us directly at{" "}
          <a href={`mailto:${PRISM_EMAIL}`} className="text-foreground underline underline-offset-4">
            {PRISM_EMAIL}
          </a>{" "}
          or call{" "}
          <a href="tel:+61408065993" className="text-foreground underline underline-offset-4">
            +61 408 065 993
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-background p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="contact-company" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Company <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          maxLength={150}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          placeholder="Your organisation"
        />
      </div>
      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          required
          maxLength={2000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about the problem you're trying to solve…"
        />
      </div>

      {/* Honeypot — hidden from real visitors, catches bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === "error" && error ? (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Preparing…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send enquiry
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          Opens your email app with everything pre-filled — you review and send.
        </p>
      </div>
    </form>
  );
}
