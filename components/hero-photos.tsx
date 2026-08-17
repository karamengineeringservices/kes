"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/**
 * HeroPhotos — four real photos crossfaded via scroll progress.
 * Each layer also gets a subtle Ken Burns pan/scale for cinematic feel.
 *
 *   0-33%   hero.jpg     (aerial frigate on open ocean)
 *   25-60%  hero-2.jpg   (dramatic bow-up, Pakistan navy vessel)
 *   50-85%  hero-3.jpg   (front-on view with workers + cranes)
 *   75-100% hero-4.jpg   (wide shipyard scene)
 *
 * Overlapping ranges ensure smooth crossfades with no black gaps.
 */
export function HeroPhotos({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Crossfade opacities
  const op1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.2, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]);

  // Very subtle Ken Burns scale for each (scale up slightly as visible)
  const scale1 = useTransform(scrollYProgress, [0, 0.35], [1.02, 1.08]);
  const scale2 = useTransform(scrollYProgress, [0.2, 0.65], [1.04, 1.1]);
  const scale3 = useTransform(scrollYProgress, [0.5, 0.9], [1.02, 1.08]);
  const scale4 = useTransform(scrollYProgress, [0.75, 1], [1.04, 1.1]);

  const staticStyle = reduce ? { scale: 1 } : undefined;

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 — aerial cinematic */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { opacity: op1 }}>
        <motion.div className="absolute inset-0" style={staticStyle ?? { scale: scale1 }}>
          <Image
            src="/hero.jpg"
            alt="Modern frigate underway on open ocean"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Layer 2 — dramatic bow */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { opacity: op2 }}>
        <motion.div className="absolute inset-0" style={staticStyle ?? { scale: scale2 }}>
          <Image
            src="/hero-2.jpg"
            alt="Naval vessel bow with Pakistan flag in dry dock"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Layer 3 — front on with workers */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { opacity: op3 }}>
        <motion.div className="absolute inset-0" style={staticStyle ?? { scale: scale3 }}>
          <Image
            src="/hero-3.jpg"
            alt="Vessel in dry dock with engineering team and yard cranes"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Layer 4 — shipyard wide */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { opacity: op4 }}>
        <motion.div className="absolute inset-0" style={staticStyle ?? { scale: scale4 }}>
          <Image
            src="/hero-4.jpg"
            alt="Wide shipyard with vessels under construction"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
