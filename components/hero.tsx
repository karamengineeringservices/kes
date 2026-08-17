"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { KarachiClock } from "./karachi-clock";

/**
 * Hero — Seasats-style split layout:
 * - Left column: headline, sub, CTAs (dominant text block)
 * - Right column: cinematic framed ship photo with subtle Ken Burns
 * - No full-viewport photo → no upscaling → no blur.
 * - Deep navy palette; signal red reserved for primary CTA only.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const enter = { y: 0, opacity: 1 };
  const initial = { y: 24, opacity: 0 };
  const t = (delay = 0) => ({ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] });

  return (
    <section className="relative min-h-[100svh] bg-ink pt-20 md:pt-24 flex flex-col">
      {/* Top meta strip — minimal, sits under nav */}
      <div className="border-b border-bone/10">
        <div className="max-w-container mx-auto px-gutter h-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-signal rounded-full" />
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
      <div className="flex-1 flex items-center">
        <div className="max-w-container mx-auto w-full px-gutter py-12 md:py-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT column — text */}
          <div className="lg:col-span-5">
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

            <div className="space-y-2">
              {[
                { text: "Engineered for", accent: false },
                { text: "performance.", accent: false },
                { text: "Built for the", accent: true },
                { text: "maritime world.", accent: false }
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={initial}
                    animate={mounted ? enter : initial}
                    transition={t(0.1 + i * 0.08)}
                    className={`font-display text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[1.02] font-semibold ${
                      line.accent ? "text-signal" : "text-bone"
                    } ${i === 0 ? "sr-only-first" : ""}`}
                    style={{ letterSpacing: "-0.035em" }}
                  >
                    {i === 0 ? (
                      <span>
                        <span className="sr-only">
                          Engineered for performance. Built for the maritime world.
                        </span>
                        <span aria-hidden>{line.text}</span>
                      </span>
                    ) : (
                      <span aria-hidden>{line.text}</span>
                    )}
                  </motion.h1>
                </div>
              ))}
            </div>

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
                className="group inline-flex items-center gap-3 text-bone px-6 py-3.5 text-sm font-medium min-h-[48px] border border-bone/20 hover:border-bone/60 hover:text-bone transition-colors"
              >
                Request a quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </motion.div>

            {/* Meta line below CTAs */}
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
          </div>

          {/* RIGHT column — cinematic framed ship */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            {/* Frame */}
            <div className="relative aspect-[16/10] max-h-[70vh] w-full overflow-hidden bg-ink-900">
              {/* Ken Burns image */}
              <motion.div
                className="absolute inset-0"
                animate={reduce ? undefined : { scale: [1.03, 1.09], x: ["-1%", "1%"] }}
                transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              >
                <Image
                  src="/hero.jpg"
                  alt="Modern frigate underway on open ocean"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Subtle edge vignette for cinematic feel */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(4,9,20,0.5) 100%)"
              }} />
              {/* Bottom scrim for caption */}
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(4,9,20,0.85) 100%)"
              }} />
              {/* Frame chrome (technical readouts) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/90">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-signal rounded-full" />
                  Live · Sea trials
                </span>
                <span>REC · 24°53′N</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/80">
                <span>Modern frigate · Underway</span>
                <span className="text-bone/60">Frame 01/04</span>
              </div>
            </div>
            {/* Ledger row below frame */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-steel">
              <div>
                <div className="text-steel-600">Speed</div>
                <div className="text-bone mt-1 tabular-nums">12.4 kn</div>
              </div>
              <div>
                <div className="text-steel-600">Heading</div>
                <div className="text-bone mt-1 tabular-nums">237°</div>
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

      {/* Bottom rail — sectors + scroll indicator */}
      <div className="border-t border-bone/10">
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
            <span className="w-6 h-px bg-steel" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
