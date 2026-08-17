"use client";

import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";
import { Magnetic } from "./magnetic";
import { KarachiClock } from "./karachi-clock";
import { HeroPhotos } from "./hero-photos";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] pt-20 md:pt-24 overflow-hidden"
    >
      {/* Full-viewport scroll-linked cinematic photo hero */}
      <HeroPhotos containerRef={sectionRef} />

      {/* Composition scrims — dark left column + subtle vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,9,20,0.85) 0%, rgba(4,9,20,0.6) 30%, rgba(4,9,20,0.2) 55%, rgba(4,9,20,0) 75%)"
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(180deg, rgba(4,9,20,0.6) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(4,9,20,0.85) 100%)" }}
      />

      {/* Top meta strip */}
      <div className="absolute top-20 md:top-24 left-0 right-0 border-b border-bone/10 z-10 backdrop-blur-[2px]">
        <div className="max-w-container mx-auto px-gutter h-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel-400">
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

      {/* Corner marks (top-right) */}
      <div className="hidden xl:block absolute top-40 right-gutter font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel z-10">
        <div className="text-right space-y-1">
          <div className="text-steel-600">Est. 2021 · Pakistan</div>
          <div className="text-bone">PEC No. 15351</div>
          <div className="text-steel-600">Cat. C4/E · 19 codes</div>
        </div>
      </div>

      {/* Content — anchored to LEFT so ship photos on right stay clean */}
      <div className="relative max-w-container mx-auto px-gutter pt-24 md:pt-40 pb-40 md:pb-48 z-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-signal" />
            <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
              Maritime & Industrial Engineering
            </span>
          </div>
        </Reveal>

        <h1 className="font-display leading-[0.98] tracking-tighter text-bone max-w-[16ch]">
          <span className="block text-[clamp(2.5rem,7vw,6.25rem)]">
            <SplitText text="Engineered for" />
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6.25rem)]">
            <SplitText text="performance." delay={100} />
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6.25rem)] text-signal">
            <SplitText text="Built for the" delay={220} />
          </span>
          <span className="block text-[clamp(2.5rem,7vw,6.25rem)]">
            <SplitText text="maritime world." delay={340} />
          </span>
        </h1>

        <Reveal delay={700}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-steel-400 leading-relaxed">
            Integrated engineering, fabrication, ship repair, industrial
            maintenance and technical manpower for demanding marine and
            industrial environments.
          </p>
        </Reveal>

        <Reveal delay={820}>
          <div className="mt-12 flex flex-wrap items-center gap-3 md:gap-5">
            <Magnetic>
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-3 bg-signal text-bone px-7 py-4 text-base font-medium overflow-hidden min-h-[48px]"
              >
                <span className="absolute inset-0 bg-bone origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]" />
                <span className="relative z-10 transition-colors group-hover:text-ink">
                  Explore our services
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="relative z-10 transition-all group-hover:translate-x-1 group-hover:text-ink"
                  aria-hidden
                >
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </Magnetic>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-bone px-4 py-4 text-base font-medium hover:text-signal transition-colors min-h-[48px] border border-bone/25 hover:border-signal"
            >
              <span>Request a quote</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Bottom sector strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-bone/10 bg-ink-900/50 backdrop-blur-sm">
        <div className="max-w-container mx-auto px-gutter py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
              Sectors served
            </span>
            <span className="text-bone/90 text-sm">
              Oil & Gas · Petrochemicals · Marine
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-steel-400 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            <span className="w-6 h-px bg-steel" />
            <span className="animate-pulse">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
