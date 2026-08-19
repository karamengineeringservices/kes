"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { KarachiClock } from "./karachi-clock";
import { FrigateScene } from "./frigate-scene";

/**
 * Hero — full-viewport frigate scene as background, text overlay on left.
 * No more split-column layout. Ship covers the entire hero area.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const springConf = { stiffness: 120, damping: 24, mass: 0.6 };
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.15]), springConf);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), springConf);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);
  const scanShift = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const enter = { y: 0, opacity: 1 };
  const initial = { y: 24, opacity: 0 };
  const t = (delay = 0) => ({
    duration: 0.7,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-ink pt-20 md:pt-24 overflow-hidden flex flex-col"
    >
      {/* Full-viewport frigate scene as background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={reduce ? undefined : { scale: bgScale }}
      >
        <FrigateScene />
      </motion.div>

      {/* Scan lines over full scene */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[2] mix-blend-overlay opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)",
          backgroundSize: "100% 3px",
          ...(reduce ? {} : { backgroundPositionY: scanShift })
        }}
      />

      {/* Vignette that darkens on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,9,20,1) 100%)",
          opacity: reduce ? 0.5 : vignetteOpacity
        }}
      />

      {/* Left-column dark scrim for text readability — softer so ship shows through */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,9,20,0.75) 0%, rgba(4,9,20,0.5) 20%, rgba(4,9,20,0.25) 40%, rgba(4,9,20,0.08) 60%, rgba(4,9,20,0) 80%)"
        }}
      />

      {/* Top gradient for meta strip */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(180deg, rgba(4,9,20,0.85) 0%, transparent 100%)"
        }}
      />
      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(4,9,20,0.95) 100%)"
        }}
      />

      {/* Top meta strip */}
      <div className="border-b border-bone/10 relative z-20">
        <div className="max-w-container mx-auto px-gutter h-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
            <span className="text-bone">Karachi, Pakistan</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <KarachiClock className="text-bone tabular-nums" />
          </div>
        </div>
      </div>

      {/* Main content — full-height overlay on the left */}
      <div className="flex-1 flex items-center relative z-10">
        <motion.div
          className="max-w-container mx-auto w-full px-gutter py-12 md:py-16"
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
        >
          <div className="max-w-xl">
            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0)}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.22em] text-[0.65rem] text-signal">
                Maritime & Industrial Engineering
              </span>
            </motion.div>

            {/* Headline consolidated from 4 lines to 2 — smaller, lighter, refined */}
            <h1 className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.1] font-medium tracking-tight text-bone">
              <span className="sr-only">
                Engineered for performance. Built for the maritime world.
              </span>
              <div className="overflow-hidden">
                <motion.span
                  aria-hidden
                  initial={initial}
                  animate={mounted ? enter : initial}
                  transition={t(0.1)}
                  className="block"
                >
                  Engineered for performance
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  aria-hidden
                  initial={initial}
                  animate={mounted ? enter : initial}
                  transition={t(0.2)}
                  className="block text-signal"
                >
                  Built for the maritime world
                </motion.span>
              </div>
            </h1>

            <motion.p
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.4)}
              className="mt-6 text-base text-steel-400 leading-relaxed max-w-md"
            >
              Integrated engineering, fabrication, ship repair, industrial
              maintenance and technical manpower for demanding marine and
              industrial environments.
            </motion.p>

            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.55)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 bg-signal text-bone px-5 py-3 text-[0.85rem] font-medium tracking-wide min-h-[44px] hover:bg-signal-600 transition-colors"
              >
                Explore our services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-bone px-5 py-3 text-[0.85rem] font-medium min-h-[44px] border border-bone/25 hover:border-bone/60 transition-colors"
              >
                Request a quote
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom rail */}
      <div className="border-t border-bone/10 relative z-20 bg-ink-900/60 backdrop-blur-sm">
        <div className="max-w-container mx-auto px-gutter py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
              Sectors served
            </span>
            <span className="text-bone/85 text-sm">
              Oil & Gas · Petrochemicals · Marine
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-steel font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            <ScrollHint />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollHint() {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <span>Scroll to explore</span>
      <span className="relative w-6 h-4 overflow-hidden inline-block">
        <motion.span
          className="absolute inset-y-0 left-0 bg-signal"
          style={{ width: "24px", height: "1px", top: "50%" }}
          animate={reduce ? undefined : { x: [-24, 24], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}
