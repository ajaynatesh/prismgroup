import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { pillars, type PrismColour } from "@/lib/prism";
import prismMark from "@/assets/prism-mark.png.asset.json";

function Beam({
  colour,
  baseY,
  spreadY,
  spread,
  delay,
  active,
  reduce,
}: {
  colour: PrismColour;
  baseY: number;
  spreadY: number;
  spread: MotionValue<number>;
  delay: number;
  active: number | null;
  reduce: boolean;
}) {
  const y2 = useTransform(spread, (v: number) => baseY + (spreadY - baseY) * v);
  const dim = active != null && active !== colour;
  const isActive = active === colour;
  return (
    <g>
      <motion.line
        x1="540"
        y1="350"
        x2="1200"
        y2={reduce ? baseY : y2}
        stroke={`var(--prism-colour-${colour})`}
        strokeWidth={isActive ? 3 : 1.6}
        initial={{ opacity: 0 }}
        animate={{ opacity: dim ? 0.18 : 0.85 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
      <motion.line
        x1="540"
        y1="350"
        x2="1200"
        y2={reduce ? baseY : y2}
        stroke={`var(--prism-colour-${colour})`}
        strokeWidth="10"
        filter="url(#prism-soft)"
        initial={{ opacity: 0 }}
        animate={{ opacity: dim ? 0.02 : isActive ? 0.32 : 0.12 }}
        transition={{ duration: 1.2, delay }}
      />
    </g>
  );
}

/**
 * Signature hero visual: a white beam enters the prism and refracts into seven
 * colour paths that separate as the user scrolls.
 */
export function PrismBeams({ activeColour = null }: { activeColour?: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <linearGradient id="prism-beam-in" x1="0" x2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.85" />
          </linearGradient>
          <filter id="prism-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <motion.line
          x1="0"
          y1="350"
          x2="470"
          y2="350"
          stroke="url(#prism-beam-in)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        <motion.g
          initial={reduce ? { opacity: 0.9 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "520px 350px" }}
        >
          <image
            href={prismMark.url}
            x="415"
            y="258"
            width="210"
            height="184"
            preserveAspectRatio="xMidYMid meet"
          />
        </motion.g>

        {pillars.map((p, i) => (
          <Beam
            key={p.index}
            colour={p.colour}
            baseY={262 + i * 30}
            spreadY={60 + i * 96}
            spread={spread}
            delay={0.55 + i * 0.09}
            active={activeColour}
            reduce={reduce}
          />
        ))}
      </svg>
    </div>
  );
}
