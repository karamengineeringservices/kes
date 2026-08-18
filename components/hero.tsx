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

  // Telemetry values that drift with scroll
  const speedMv = useTransform(scrollYProgress, [0, 1], [12.4, 24.7]);
  const headingMv = useTransform(scrollYProgress, [0, 1], [237, 289]);
  const [speed, setSpeed] = useState("12.4");
  const [heading, setHeading] = useState("237");
  useEffect(() => {
    const unsubS = speedMv.on("change", (v) => setSpeed(v.toFixed(1)));
    const unsubH = headingMv.on("change", (v) =>
      setHeading(Math.round(v).toString().padStart(3, "0"))
    );
    return () => {
      unsubS();
      unsubH();
    };
  }, [speedMv, headingMv]);

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

      {/* Left-column dark scrim for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,9,20,0.9) 0%, rgba(4,9,20,0.7) 25%, rgba(4,9,20,0.4) 50%, rgba(4,9,20,0.15) 70%, rgba(4,9,20,0) 90%)"
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
            <span>N 24°53′ · E 67°06′</span>
            <span className="text-steel-600">|</span>
            <KarachiClock className="text-bone tabular-nums" />
          </div>
        </div>
      </div>

      {/* Floating frame chrome — top-right */}
      <div className="absolute top-32 md:top-36 right-gutter z-20 flex flex-col items-end gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/85">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
          Live · Sea trials
        </div>
        <div className="text-bone/60">REC · 24°53′N · 67°06′E</div>
      </div>

      {/* Floating frame chrome — bottom-right telemetry ledger */}
      <div className="hidden md:grid absolute bottom-24 right-gutter z-20 grid-cols-2 gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel text-right">
        <div>
          <div className="text-steel-600">Speed</div>
          <div className="text-bone mt-0.5 tabular-nums">
            {speed} <span className="text-steel-600 text-[0.55rem]">kn</span>
          </div>
        </div>
        <div>
          <div className="text-steel-600">Heading</div>
          <div className="text-bone mt-0.5 tabular-nums">
            {heading}<span className="text-steel-600 text-[0.55rem]">°</span>
          </div>
        </div>
        <div>
          <div className="text-steel-600">Sea state</div>
          <div className="text-bone mt-0.5">Slight</div>
        </div>
        <div>
          <div className="text-steel-600">Vessel</div>
          <div className="text-bone mt-0.5">Frigate</div>
        </div>
      </div>

      {/* Main content — full-height overlay on the left */}
      <div className="flex-1 flex items-center relative z-10">
        <motion.div
          className="max-w-container mx-auto w-full px-gutter py-12 md:py-16"
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
        >
          <div className="max-w-2xl">
            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0)}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
                Maritime & Industrial Engineering
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] font-semibold tracking-tight text-bone">
              <span className="sr-only">
                Engineered for performance. Built for the maritime world.
              </span>
              {["Engineered for", "performance.", "Built for the", "maritime world."].map(
                (line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.span
                      aria-hidden
                      initial={initial}
                      animate={mounted ? enter : initial}
                      transition={t(0.1 + i * 0.09)}
                      className={`block ${i === 2 ? "text-signal" : ""}`}
                    >
                      {line}
                    </motion.span>
                  </div>
                )
              )}
            </h1>

            <motion.p
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.55)}
              className="mt-8 text-lg text-steel-400 leading-relaxed max-w-lg"
            >
              Integrated engineering, fabrication, ship repair, industrial
              maintenance and technical manpower for demanding marine and
              industrial environments.
            </motion.p>

            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.7)}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 bg-signal text-bone px-6 py-3.5 text-sm font-medium tracking-wide min-h-[48px] hover:bg-signal-600 transition-colors"
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
                className="group inline-flex items-center gap-3 text-bone px-6 py-3.5 text-sm font-medium min-h-[48px] border border-bone/25 hover:border-bone/60 transition-colors"
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

            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.85)}
              className="mt-12 pt-6 border-t border-bone/10 grid grid-cols-3 gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] max-w-xl"
            >
              <div>
                <div className="text-steel-600">Established</div>
                <div className="text-bone mt-1">2021 · Pakistan</div>
              </div>
              <div>
                <div className="text-steel-600">Licensed</div>
                <div className="text-bone mt-1">PEC No. 15351</div>
              </div>
              <div>
                <div className="text-steel-600">Category</div>
                <div className="text-bone mt-1">C4/E · 19 codes</div>
              </div>
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
