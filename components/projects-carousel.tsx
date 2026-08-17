"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Category = "All" | "Ship Repair" | "Fabrication" | "Industrial" | "Outfitting";

type Project = {
  tag: string;
  category: Category;
  title: string;
  scope: string;
  meta: string;
  image: string;
};

const projects: Project[] = [
  {
    tag: "Ship Repair · Naval",
    category: "Ship Repair",
    title: "Vessel structural repair & preservation",
    scope: "Steel replacement, welded overlays, grit blasting and coating on a naval platform in dock.",
    meta: "Karachi Dockyard",
    image: "/hero-2.jpg"
  },
  {
    tag: "Fabrication · Shipbuilding",
    category: "Fabrication",
    title: "Hull block fabrication & erection",
    scope: "Full block assembly, outfitting, hatches and piping installation across a multi-block programme.",
    meta: "Karachi Shipyard & Engineering Works",
    image: "/project-1.jpg"
  },
  {
    tag: "Boilers · Industrial",
    category: "Industrial",
    title: "Boiler retubing & pressure-vessel manufacture",
    scope: "Retube of process boilers and manufacture of new pressure vessels to rated specification.",
    meta: "Industrial client",
    image: "/project-2.jpg"
  },
  {
    tag: "Outfitting · Marine",
    category: "Outfitting",
    title: "Piping, cable-tray & lagging outfitting",
    scope: "CS/SS/alloy piping, cable-tray runs, insulation lagging and final finishing.",
    meta: "PRO Shipyard DGS",
    image: "/project-3.jpg"
  },
  {
    tag: "Heat Exchangers",
    category: "Fabrication",
    title: "Shell-and-tube heat exchanger fabrication",
    scope: "Fabrication to project spec including hydro-test and inspection sign-off.",
    meta: "Industrial",
    image: "/project-4.jpg"
  },
  {
    tag: "Steel Structures",
    category: "Fabrication",
    title: "Overhead crane fabrication & erection",
    scope: "Fabrication and erection of an overhead travelling crane, alignment and load test.",
    meta: "Industrial",
    image: "/project-5.jpg"
  },
  {
    tag: "Fabrication · Shipbuilding",
    category: "Ship Repair",
    title: "Naval platform dry-dock service",
    scope: "Full-scope docking, hull inspection, waterline preservation and paint scheme.",
    meta: "Karachi",
    image: "/hero-3.jpg"
  }
];

const cats: Category[] = ["All", "Ship Repair", "Fabrication", "Industrial", "Outfitting"];

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
              A cross section of the work we have delivered<span className="text-signal">.</span>
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
          {cats.map((c) => {
            const on = active === c;
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
                {c}
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
            <ProjectCard key={`${p.title}-${i}`} p={p} index={i} />
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
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Image
            src={p.image}
            alt={p.title}
            fill
            unoptimized
            sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 38vw, (min-width: 768px) 48vw, 85vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-signal rounded-full" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone">
            {p.tag}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/80 flex justify-between">
          <span>{p.category}</span>
          <span>#{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight text-bone mb-3 group-hover:text-signal transition-colors">
          {p.title}
        </h3>
        <p className="text-steel-400 text-sm leading-relaxed">{p.scope}</p>
        <div className="mt-6 pt-5 border-t border-bone/10 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em]">
          <span className="text-steel truncate max-w-[70%]">{p.meta}</span>
          <span className="text-steel-600 group-hover:text-signal transition-colors">
            View →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
