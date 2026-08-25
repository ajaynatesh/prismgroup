import { Link } from "@tanstack/react-router";
import { PrismWordmark } from "@/components/prism/PrismMark";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Insights", to: "/insights" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "AI Transformation", to: "/capabilities/ai-transformation" },
      { label: "Enterprise Technology", to: "/capabilities/enterprise-technology" },
    ],
  },
  {
    title: "Ventures",
    links: [
      { label: "SpectraIQ.ai", to: "/ventures/spectraiq" },
      { label: "DecisionIQ", to: "/ventures/decisioniq" },
      { label: "TradeLink", to: "/ventures/tradelink" },
      { label: "AlwaysOn AI", to: "/ventures/alwayson" },
      { label: "Prism Diagnostics", to: "/ventures/prism-diagnostics" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="spectrum-rule absolute inset-x-0 top-0" />
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-20">
        <div>
          <PrismWordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            One Prism. Seven ways to transform what's possible.
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="eyebrow">{c.title}</h2>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="hairline">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Prism Group</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="link-underline hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="link-underline hover:text-foreground">
              Terms
            </Link>
            <Link to="/security" className="link-underline hover:text-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
