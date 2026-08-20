"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion
} from "framer-motion";
import { Reveal } from "./reveal";

const pillars = [
  {
    n: "01",
    title: "Design & Planning",
    body:
      "Every project starts on paper. Our engineers translate specifications into detailed drawings, structural calculations and a clear execution plan before a single weld is struck.",
    image: "/pillar-design.jpg"
  },
  {
    n: "02",
    title: "Fabricate",
    body:
      "In-house steel and aluminum fabrication: hulls, blocks, vessels, piping, cable tray, ladders and outfitting to spec.",
    image: "/pillar-fabricate.jpg"
  },
  {
    n: "03",
    title: "Deliver",
    body:
      "Certified welders, fabricators and engineers execute to specification under a safety-first regime, with full documentation and sign-off inspection at handover.",
    image: "/pillar-deliver.jpg"
  }
];

/**
 * CapabilitiesPinned — pinned sticky-scroll capabilities section.
 * Left pane: photo pinned with crossfade between the 3 service images.
 * Right pane: ONE pillar text rendered at a time via AnimatePresence mode="wait",
 * so the previous fully exits before the next enters — no text ghosting possible.
 */
export function CapabilitiesPinned() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Update active pillar index as user scrolls the section.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    setActive((cur) => (cur === next ? cur : next));
  });

  // Photos on the left use the previous per-layer opacity crossfade — that's
  // visually pleasing for photos. Text on the right uses hard swap via AnimatePresence.
  const op1 = useTransform(scrollYProgress, [0, 0.3, 0.36], [1, 1, 0]);
  const op2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.36, 0.64, 0.7],
    [0, 0, 1, 1, 0]
  );
  const op3 = useTransform(scrollYProgress, [0, 0.64, 0.7, 1], [0, 0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <>
      {/* MOBILE / TABLET: plain stacked sections — no scroll-pinning, so the
          user always sees a full image + full text per stage as they scroll,
          instead of the desktop pin effect squeezing both into one viewport. */}
      <section className="lg:hidden relative bg-ink text-bone py-section">
        <div className="max-w-container mx-auto px-gutter">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
                How we work
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,7vw,3rem)] leading-[1.05] font-semibold tracking-tight text-bone">
              Three stages, one accountable partner
            </h2>
          </div>

          <div className="flex flex-col gap-14">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-900">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 55%, rgba(4,9,20,0.55) 100%)"
                    }}
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="font-mono text-signal text-sm tracking-widest">
                      {p.n}
                    </span>
                    <span className="h-px flex-1 bg-bone/15" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-bone mb-4">
                    {p.title}
                  </h3>
                  <p className="text-steel-400 text-base leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESKTOP: pinned sticky-scroll capabilities section. */}
      <section
        ref={ref}
        className="hidden lg:block relative bg-ink text-bone"
        style={{ height: "300vh" }}
      >
      <div className="sticky top-0 h-screen pt-24 flex items-center">
        {/* pt-24 (not margin — margins collapse through a sticky parent)
            keeps centered content clear of the fixed nav (h-24 unscrolled /
            h-16 scrolled) so nothing sits behind it. */}
        <div className="max-w-container mx-auto w-full px-gutter grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: pinned photo pane (crossfade between service photos) */}
          <div className="lg:col-span-6 relative aspect-[4/5] max-h-[65vh] overflow-hidden bg-ink-900">
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
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(4,9,20,0.55) 100%)"
              }}
            />
          </div>

          {/* RIGHT: single pillar text at a time — AnimatePresence mode="wait" */}
          <div className="lg:col-span-6 relative">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-signal" />
                <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
                  How we work
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] font-semibold tracking-tight text-bone">
                Three stages, one accountable partner
              </h2>
            </div>

            <div className="relative min-h-[260px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="font-mono text-signal text-sm tracking-widest">
                      {pillars[active].n}
                    </span>
                    <span className="h-px flex-1 bg-bone/15" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
                      {String(active + 1).padStart(2, "0")} / 03
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-bone mb-4">
                    {pillars[active].title}
                  </h3>
                  <p className="text-steel-400 text-base md:text-lg leading-relaxed max-w-lg">
                    {pillars[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress rail */}
            <div className="mt-10 flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <ProgressDot key={i} idx={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
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
