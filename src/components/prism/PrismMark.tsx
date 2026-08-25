import { cn } from "@/lib/utils";
import prismMark from "@/assets/prism-mark.png.asset.json";

/** Prism Group brand mark — the refracting prism from the official logo. */
export function PrismMark({ className }: { className?: string; animated?: boolean }) {
  return (
    <img
      src={prismMark.url}
      alt="Prism Group"
      width={476}
      height={417}
      className={cn("h-7 w-auto select-none", className)}
      draggable={false}
    />
  );
}

export function PrismWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PrismMark className="h-8 w-auto" />
      <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] leading-none">
        PRISM
        <span className="ml-1.5 font-normal text-muted-foreground">GROUP</span>
      </span>
    </span>
  );
}
