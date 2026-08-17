"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { KarachiClock } from "./karachi-clock";
import { HeroMedia } from "./hero-media";

/**
 * Hero — heavy motion:
 * - Line-by-line mask reveal on load.
 * - Ken Burns on photo.
 * - Scroll-linked: photo scales up + text parallaxes out + frame expands + vignette darkens.
 * - Live telemetry values that count up while in view, then respond to scroll drift.
 * - Scan-line + subtle noise overlay for technical/cinematic feel.
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

  // Scroll-linked transforms (with spring for smoothness)
  const springConf = { stiffness: 120, damping: 24, mass: 0.6 };
  const photoScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.28]), springConf);
  const photoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), springConf);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), springConf);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.9]);
  const scanShift = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  // Telemetry numbers that drift as user scrolls
  const speedMv = useTransform(scrollYProgress, [0, 1], [12.4, 24.7]);
  const headingMv = useTransform(scrollYProgress, [0, 1], [237, 289]);
  const [speed, setSpeed] = useState("12.4");
  const [heading, setHeading] = useState("237");
  useEffect(() => {
    const unsubS = speedMv.on("change", (v) => setSpeed(v.toFixed(1)));
    const unsubH = headingMv.on("change", (v) => setHeading(Math.round(v).toString().padStart(3, "0")));
    return () => {
      unsubS();
      unsubH();
    };
  }, [speedMv, headingMv]);

  const enter = { y: 0, opacity: 1 };
  const initial = { y: 24, opacity: 0 };
  const t = (delay = 0) => ({ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-ink pt-20 md:pt-24 flex flex-col overflow-hidden"
    >
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

      {/* Main content: split hero */}
      <div className="flex-1 flex items-center relative">
        <div className="max-w-container mx-auto w-full px-gutter py-12 md:py-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
          {/* LEFT column — text (parallaxes out on scroll) */}
          <motion.div
            className="lg:col-span-5"
            style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          >
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

            <h1 className="font-display text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[1.02] font-semibold tracking-tight text-bone">
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-bone px-6 py-3.5 text-sm font-medium min-h-[48px] border border-bone/20 hover:border-bone/60 transition-colors"
              >
                Request a quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={initial}
              animate={mounted ? enter : initial}
              transition={t(0.85)}
              className="mt-12 pt-6 border-t border-bone/10 grid grid-cols-3 gap-4 font-mono text-[0.65rem] uppercase tracking-[0.2em]"
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
          </motion.div>

          {/* RIGHT column — cinematic framed ship (scales on scroll) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[16/10] max-h-[70vh] w-full overflow-hidden bg-ink-900">
              {/* Living media: video if hero.mp4 exists, else animated photo scene.
                  Wrapper adds scroll-linked scale + Y-drift on top. */}
              <motion.div
                className="absolute inset-0"
                style={reduce ? undefined : { scale: photoScale, y: photoY }}
              >
                <HeroMedia />
              </motion.div>

              {/* Scan lines — subtle technical feel, drifts on scroll */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
                  backgroundSize: "100% 3px",
                  backgroundPosition: reduce ? "0 0" : undefined,
                  ...(reduce ? {} : { backgroundPositionY: scanShift })
                }}
              />

              {/* Vignette (darkens on scroll) */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, rgba(4,9,20,1) 100%)",
                  opacity: reduce ? 0.5 : vignetteOpacity
                }}
              />

              {/* Bottom scrim for caption */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(4,9,20,0.9) 100%)"
                }}
              />

              {/* Top-left: LIVE indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone">
                <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
                <span>Live · Sea trials</span>
              </div>

              {/* Top-right: telemetry */}
              <div className="absolute top-4 right-4 z-10 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/80 text-right">
                <div>REC · 24°53′N</div>
              </div>

              {/* Bottom-left: caption */}
              <div className="absolute bottom-4 left-4 z-10 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/85">
                <div>Modern frigate · Underway</div>
              </div>

              {/* Bottom-right: frame counter */}
              <div className="absolute bottom-4 right-4 z-10 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/60">
                <div>Frame 01 / 04</div>
              </div>

              {/* Cross-hair reticle for cinematic tech feel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="1" fill="#F5F1EA" />
                  <path d="M30 12 L30 22 M30 38 L30 48 M12 30 L22 30 M38 30 L48 30" stroke="#F5F1EA" strokeWidth="0.6" />
                  <circle cx="30" cy="30" r="14" stroke="#F5F1EA" strokeWidth="0.4" opacity="0.5" />
                </svg>
              </div>
            </div>

            {/* Ledger row below frame — telemetry updates on scroll */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-steel">
              <div>
                <div className="text-steel-600">Speed</div>
                <div className="text-bone mt-1 tabular-nums flex items-baseline gap-1">
                  {speed}
                  <span className="text-steel-600 text-[0.55rem]">kn</span>
                </div>
              </div>
              <div>
                <div className="text-steel-600">Heading</div>
                <div className="text-bone mt-1 tabular-nums flex items-baseline gap-1">
                  {heading}
                  <span className="text-steel-600 text-[0.55rem]">°</span>
                </div>
              </div>
              <div>
                <div className="text-steel-600">Sea state</div>
                <div className="text-bone mt-1">Slight</div>
              </div>
              <div>
                <div className="text-steel-600">Vessel class</div>
                <div className="text-bone mt-1">Frigate / OPV</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="border-t border-bone/10 relative z-20">
        <div className="max-w-container mx-auto px-gutter py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
              Sectors served
            </span>
            <span className="text-bone/80 text-sm">
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

/** Animated "Scroll" pill with a downward-drawing line */
function ScrollHint() {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <span>Scroll to explore</span>
      <span className="relative w-6 h-4 overflow-hidden">
        <motion.span
          className="absolute inset-y-0 left-0 w-px bg-signal"
          animate={reduce ? undefined : { x: [0, 24, 24, 0], opacity: [0, 1, 0.3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "24px", height: "1px", top: "50%" }}
        />
      </span>
    </div>
  );
}
