import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { pillars } from "@/lib/prism";

/**
 * Signature hero visual: seven colour beams converge into the prism, then
 * separate into seven paths as the user scrolls.
 */
export function PrismBeams({ activeColour }: { activeColour?: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="beam-in" x1="0" x2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.85" />
          </linearGradient>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* incoming white beam */}
        <motion.line
          x1="0"
          y1="350"
          x2="470"
          y2="350"
          stroke="url(#beam-in)"
          strokeWidth="2"
          initial={reduce ? { opacity: 0.7 } : { opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* prism */}
        <motion.g
          initial={reduce ? { opacity: 0.9 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "520px 350px" }}
        >
          <path
            d="M520 250 L600 470 L440 470 Z"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <path d="M520 250 L600 470 L440 470 Z" fill="currentColor" fillOpacity="0.03" />
        </motion.g>

        {/* seven refracted beams */}
        {pillars.map((p, i) => {
          const baseY = 262 + i * 30;
          const spreadY = 60 + i * 96;
          const y2 = useTransform(spread, (v: number) => baseY + (spreadY - baseY) * v);
          const dim = activeColour != null && activeColour !== p.colour;
          return (
            <g key={p.index}>
              <motion.line
                x1="540"
                y1="350"
                x2="1200"
                y2={reduce ? baseY : y2}
                stroke={`var(--prism-colour-${p.colour})`}
                strokeWidth={activeColour === p.colour ? 3 : 1.6}
                filter={activeColour === p.colour ? "url(#soft)" : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: dim ? 0.18 : 0.85 }}
                transition={{ duration: 1, delay: 0.6 + i * 0.09, ease: "easeOut" }}
              />
              <motion.line
                x1="540"
                y1="350"
                x2="1200"
                y2={reduce ? baseY : y2}
                stroke={`var(--prism-colour-${p.colour})`}
                strokeWidth="10"
                filter="url(#soft)"
                initial={{ opacity: 0 }}
                animate={{ opacity: dim ? 0.02 : activeColour === p.colour ? 0.3 : 0.12 }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.09 }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
