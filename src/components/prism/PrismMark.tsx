import { cn } from "@/lib/utils";

/** Prism Group mark: a triangular prism refracting seven colour beams. */
export function PrismMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-7 w-7", className)}
      role="img"
      aria-label="Prism Group"
      fill="none"
    >
      <g strokeWidth="2" strokeLinecap="round" opacity="0.95">
        {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
          <line
            key={n}
            x1="30"
            y1="24"
            x2="47"
            y2={7 + i * 5.6}
            stroke={`var(--prism-colour-${n})`}
            className={animated ? "origin-left" : undefined}
            style={animated ? { animation: `pulse 3.2s ${i * 0.16}s ease-in-out infinite` } : undefined}
          />
        ))}
      </g>
      <path
        d="M20 4 L36 40 L4 40 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="0" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PrismWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PrismMark className="h-7 w-7 text-foreground" />
      <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] leading-none">
        PRISM
        <span className="ml-1.5 font-normal text-muted-foreground">GROUP</span>
      </span>
    </span>
  );
}
