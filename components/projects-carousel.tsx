"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, projectCategories, type Project } from "@/lib/projects";

type Category = (typeof projectCategories)[number];

export function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Category>("All");
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  // Track scroll position for progress bar
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setScrollX(el.scrollLeft);
      setMaxScroll(el.scrollWidth - el.clientWidth);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [filtered.length]);

  // When filter changes, snap track back to start
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.clientWidth * 0.6; // ~one card
    el.scrollBy({ left: cardW * dir, behavior: reduce ? "auto" : "smooth" });
  };

  const progress = maxScroll > 0 ? scrollX / maxScroll : 0;

  return (
    <section id="projects" className="relative bg-ink text-bone overflow-hidden">
      <div className="max-w-container mx-auto px-gutter py-section">
        {/* Section head */}
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
                Mission after mission
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] font-semibold tracking-tight text-bone max-w-[24ch]">
              A cross section of the work we have delivered
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors text-sm font-medium"
            >
              <span>View all projects</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {projectCategories.map((c) => {
            const on = active === c;
            const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs font-medium tracking-wide transition-colors min-h-[40px] ${
                  on
                    ? "bg-signal text-bone border border-signal"
                    : "text-steel-400 border border-bone/15 hover:border-bone/40 hover:text-bone"
                }`}
              >
                {c} <span className={on ? "text-bone/70" : "text-steel-600"}>({count})</span>
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel-600 tabular-nums">
            {String(filtered.length).padStart(2, "0")} projects
          </span>
        </div>
      </div>

      {/* Horizontal track — extends into gutter for edge-bleed */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pl-gutter pr-gutter pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={`${p.title}-${p.category}-${i}`} p={p} index={i} />
          ))}
          {/* Trailing spacer so last card can align left */}
          <div className="shrink-0 w-2" />
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
      </div>

      {/* Controls + progress */}
      <div className="max-w-container mx-auto px-gutter mt-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="w-11 h-11 border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M13 7H1M7 13L1 7l6-6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="w-11 h-11 border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Progress rail */}
          <div className="relative flex-1 h-[3px] bg-bone/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-signal"
              style={{ width: `${Math.max(6, progress * 100)}%` }}
            />
          </div>

          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel-600 tabular-nums whitespace-nowrap">
            {String(Math.min(filtered.length, Math.round(progress * (filtered.length - 1)) + 1)).padStart(2, "0")}
            <span className="text-steel-600/60"> / </span>
            {String(filtered.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group snap-start shrink-0 w-[85vw] sm:w-[62vw] md:w-[48vw] lg:w-[38vw] xl:w-[32vw] bg-ink-700 border border-bone/10 hover:border-bone/25 transition-colors"
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-signal rounded-full" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone">
              {p.tag}
            </span>
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-steel-600">
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight text-bone mb-3 group-hover:text-signal transition-colors">
          {p.title}
        </h3>
        <p className="text-steel-400 text-sm leading-relaxed">{p.scope}</p>
        <div className="mt-5 pt-4 border-t border-bone/10">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-steel-600 mb-1">
            Scale
          </div>
          <div className="text-bone text-sm font-medium">{p.scale}</div>
        </div>
        <div className="mt-5 pt-4 border-t border-bone/10 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em]">
          <span className="text-steel truncate max-w-[70%]">{p.meta}</span>
          <span className="text-steel-600 group-hover:text-signal transition-colors">
            View →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
