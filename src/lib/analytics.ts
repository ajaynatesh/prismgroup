// Centralised GA4 analytics for Prism Group.
//
// Rules enforced here:
// - Production only: analytics initialises solely on prismgroup.au (and
//   www.prismgroup.au). Localhost, Lovable previews and dev builds never send.
// - Never crashes the site: every call is wrapped; ad blockers, script
//   failures and missing config fail silently.
// - No PII: callers pass behavioural metadata only (paths, slugs, lengths).
//   Raw advisor prompts, AI responses, names, emails and message contents
//   must never be passed to trackEvent.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PRODUCTION_HOSTS = new Set(["prismgroup.au", "www.prismgroup.au"]);
const MEASUREMENT_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

let initialised = false;
let started = false;

export function analyticsEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    PRODUCTION_HOSTS.has(window.location.hostname) &&
    typeof MEASUREMENT_ID === "string" &&
    MEASUREMENT_ID.length > 0
  );
}

/** Load gtag.js once and configure GA4. Manual page_view mode: SPA route
 *  changes are sent explicitly via trackPageView, so the automatic initial
 *  page_view is disabled to prevent duplicates. */
export function initAnalytics(): void {
  if (initialised || !analyticsEnabled()) return;
  initialised = true;
  try {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID!)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params -- gtag.js requires the Arguments object
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
    // The initial page view is a route change like any other.
    trackPageView(window.location.pathname);
  } catch {
    // Analytics must never affect the user experience.
  }
}

export function trackPageView(path: string): void {
  if (!analyticsEnabled() || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  } catch {
    /* silent */
  }
}

export function trackEvent(name: string, params: Record<string, string | number> = {}): void {
  if (!analyticsEnabled() || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    /* silent */
  }
}

/** Where the Opportunity Advisor is embedded, derived from the route. */
export function advisorLocation(pathname: string): string {
  if (pathname === "/" || pathname === "") return "homepage";
  if (pathname.startsWith("/ai-opportunity-advisor")) return "dedicated_advisor_page";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/case-studies")) return "case_studies";
  if (pathname.startsWith("/capabilities")) return "capability";
  if (pathname.startsWith("/ventures")) return "venture";
  return "other";
}

/** Fire `opportunity_advisor_view` once when the advisor becomes visible. */
export function observeAdviserView(el: HTMLElement | null): (() => void) | undefined {
  if (!el || !analyticsEnabled() || typeof IntersectionObserver === "undefined") return;
  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (fired || !entries.some((e) => e.isIntersecting)) return;
      fired = true;
      observer.disconnect();
      trackEvent("opportunity_advisor_view", {
        page_path: window.location.pathname,
        page_title: document.title,
        advisor_location: advisorLocation(window.location.pathname),
      });
    },
    { threshold: 0.35 },
  );
  observer.observe(el);
  return () => observer.disconnect();
}

/** One-shot guard for `opportunity_advisor_start` (first engagement only). */
export function adviserStartOnce(): boolean {
  if (started) return false;
  started = true;
  return true;
}
