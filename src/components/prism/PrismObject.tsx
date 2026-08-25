import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import prismObject from "@/assets/prism-object.jpg";
import { cn } from "@/lib/utils";

/**
 * The Prism object — a precision-cut glass prism photographed in a near-black
 * environment. White light enters; as the visitor scrolls the light hardens and
 * the spectrum emerges from *within* the glass. No beams, no rays.
 */
export function PrismObject({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const scale = useTransform(p, [0, 1], [1.02, 1.14]);
  const rotate = useTransform(p, [0, 1], [-2.5, 3.5]);
  const y = useTransform(p, [0, 1], [0, -34]);
  const spectrum = useTransform(p, [0, 0.55, 1], [0.25, 0.85, 1]);
  const glow = useTransform(p, [0, 1], [0.1, 0.55]);

  const base = reduce ? {} : { scale, rotate, y };

  return (
    <div ref={ref} className={cn("relative isolate", className)} aria-hidden="true">
      {/* ambient refraction glow behind the glass */}
      <motion.div
        style={{ opacity: reduce ? 0.3 : glow }}
        className="pointer-events-none absolute inset-[12%] -z-10 rounded-full blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--prism-colour-5) 55%, transparent), transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          ...base,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(78% 72% at 52% 50%, black 55%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(78% 72% at 52% 50%, black 55%, transparent 92%)",
        }}
        className="relative"
      >
        {/* achromatic base render */}
        <img
          src={prismObject}
          alt=""
          width={1408}
          height={1408}
          className="h-full w-full select-none object-contain"
          style={{ filter: "saturate(0.15) contrast(1.06) brightness(0.95)" }}
          draggable={false}
        />
        {/* the spectrum, emerging through the glass */}
        <motion.img
          src={prismObject}
          alt=""
          width={1408}
          height={1408}
          style={{
            opacity: reduce ? 0.9 : spectrum,
            filter: "saturate(1.5) contrast(1.1)",
            mixBlendMode: "screen",
          }}
          className="absolute inset-0 h-full w-full select-none object-contain"
          draggable={false}
        />
        {/* breathing highlight — extremely restrained */}
        {!reduce && (
          <motion.div
            initial={{ opacity: 0.06 }}
            animate={{ opacity: [0.06, 0.16, 0.06] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 40% at 30% 55%, oklch(1 0 0 / 40%), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </motion.div>

    </div>
  );
}
