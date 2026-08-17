"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const pillars = [
  {
    n: "01",
    title: "Engineer",
    body:
      "Certified engineers scope, plan and specify — from structural repair on a naval platform to a new heat exchanger for a process plant.",
    image: "/service-01.jpg"
  },
  {
    n: "02",
    title: "Fabricate",
    body:
      "In-house steel and aluminum fabrication: hulls, blocks, vessels, piping, cable tray, ladders and outfitting to spec.",
    image: "/service-02.jpg"
  },
  {
    n: "03",
    title: "Deliver",
    body:
      "Skilled technical manpower, HSE-first execution, documentation pack, sign-off inspection. Handover on time, every time.",
    image: "/service-06.jpg"
  }
];

/**
 * CapabilitiesPinned — Seasats-style pinned sticky-scroll section.
 * The photo pane on the LEFT stays pinned while the pillars scroll past on the RIGHT.
 * Photo swaps as each pillar enters center-viewport (opacity crossfade).
 * Scroll-linked scale on the active photo for extra life.
 */
export function CapabilitiesPinned() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Each pillar owns 1/3 of the scroll. Opacity crossfades between them.
  const op1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.3, 0.4, 0.62, 0.7], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-bone"
      style={{ height: "300vh" }} // 3 pillars → 3 viewport heights of scroll
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-container mx-auto w-full px-gutter grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: pinned photo pane */}
          <div className="lg:col-span-6 relative aspect-[4/5] max-h-[75vh] overflow-hidden bg-ink-900">
            {[
              { src: pillars[0].image, alt: pillars[0].title, op: op1 },
              { src: pillars[1].image, alt: pillars[1].title, op: op2 },
              { src: pillars[2].image, alt: pillars[2].title, op: op3 }
            ].map((it, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{ opacity: reduce ? (i === 0 ? 1 : 0) : it.op }}
              >
                <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
                  <Image
                    src={it.src}
                    alt={it.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
            {/* Frame chrome */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/90 z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
                Field · Karachi
              </span>
              <span>REC</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/70 z-10">
              <span>Capabilities</span>
              <span className="tabular-nums">03 stages</span>
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(4,9,20,0.55) 100%)"
              }}
            />
          </div>

          {/* RIGHT: pillar cards stacked, each fades based on section scroll */}
          <div className="lg:col-span-6 relative">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-signal" />
                <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
                  How we work
                </span>
              </div>
              <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] leading-[1.05] font-semibold tracking-tight text-bone">
                Three stages, one accountable partner.
              </h2>
            </div>

            <div className="relative min-h-[320px]">
              {[
                { p: pillars[0], op: op1 },
                { p: pillars[1], op: op2 },
                { p: pillars[2], op: op3 }
              ].map((it, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{ opacity: reduce ? (i === 0 ? 1 : 0) : it.op }}
                >
                  <div className="flex items-baseline gap-6 mb-6">
                    <span className="font-mono text-signal text-sm tracking-widest">
                      {it.p.n}
                    </span>
                    <span className="h-px flex-1 bg-bone/15" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-bone mb-6">
                    {it.p.title}
                    <span className="text-signal">.</span>
                  </h3>
                  <p className="text-steel-400 text-lg leading-relaxed max-w-lg">{it.p.body}</p>
                </motion.div>
              ))}
            </div>

            {/* Progress rail */}
            <div className="mt-16 flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <ProgressDot key={i} idx={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressDot({
  idx,
  progress
}: {
  idx: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = idx / 3;
  const end = (idx + 1) / 3;
  const w = useTransform(progress, [start, end], [16, 64]);
  const bg = useTransform(progress, [start, start + 0.02, end - 0.02, end], [
    "#3A4250",
    "#C42127",
    "#C42127",
    "#3A4250"
  ]);
  return (
    <motion.div
      className="h-[3px]"
      style={{ width: w, backgroundColor: bg }}
    />
  );
}
