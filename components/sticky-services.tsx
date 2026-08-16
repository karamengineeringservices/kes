"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/lib/site";
import { Photo } from "./photo";

/**
 * Sticky-scroll services showcase — the left visual panel stays pinned while
 * the right column of services scrolls past. Active service is determined by
 * the item nearest the viewport center. IntersectionObserver + rAF; no library.
 */
export function StickyServices() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to viewport center among currently intersecting
        let bestIndex = active;
        let bestDist = Infinity;
        const centerY = window.innerHeight / 2;
        items.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2;
          const d = Math.abs(c - centerY);
          if (d < bestDist) {
            bestDist = d;
            bestIndex = i;
          }
        });
        setActive(bestIndex);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-30% 0px -30% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="services" className="relative bg-ink text-bone">
      <div className="max-w-container mx-auto px-gutter py-section">
        {/* Section header */}
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-signal" />
              <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                What we do
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-tighter text-bone max-w-[22ch]">
              One partner for every maritime and industrial need<span className="text-signal">.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors font-medium"
            >
              <span className="link-line">All services</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="max-w-container mx-auto px-gutter grid lg:grid-cols-12 gap-10 lg:gap-16 pb-section"
      >
        {/* Sticky left visual */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-28 aspect-[4/5] max-h-[80vh] bg-ink-700 border border-bone/10 overflow-hidden">
            {services.map((s, i) => (
              <div
                key={s.index}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: active === i ? 1 : 0 }}
                aria-hidden={active !== i}
              >
                <ServiceCanvas i={i} />
                {/* Optional real photo, falls back to canvas if missing */}
                <div className="absolute inset-0">
                  <Photo
                    src={`/service-${String(i + 1).padStart(2, "0")}.jpg`}
                    alt={s.title}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/20" />
                </div>
                {/* Overlay meta */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10">
                  <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.22em] text-bone">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-signal" />
                      {s.index} · {s.short}
                    </span>
                    <span className="text-steel">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="text-steel-400 font-mono text-[0.65rem] uppercase tracking-[0.22em] mb-2">
                      Focus area
                    </div>
                    <div className="font-display text-3xl md:text-4xl leading-tight text-bone">
                      {s.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right scrolling list */}
        <div className="lg:col-span-7">
          <ol className="space-y-16 md:space-y-24">
            {services.map((s, i) => (
              <li
                key={s.index}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "opacity-45"
                }`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-signal text-sm tracking-widest">
                    {s.index}
                  </span>
                  <span className="h-px flex-1 bg-bone/10" />
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel">
                    {s.short}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tighter text-bone mb-5">
                  {s.title}
                </h3>
                <p className="text-steel-400 text-base md:text-lg leading-relaxed max-w-prose">
                  {s.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.7rem] font-mono uppercase tracking-wider text-steel border border-bone/15 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServiceCanvas({ i }: { i: number }) {
  const grads = [
    "from-signal/50 via-ink-700 to-ink-900",
    "from-ink-500/70 via-ink-700 to-ink-900",
    "from-steel/40 via-ink-700 to-ink-900",
    "from-signal/40 via-ink-700 to-ink-900",
    "from-ink-500/60 via-ink-700 to-ink-900",
    "from-signal/45 via-ink-700 to-ink-900"
  ];
  return (
    <div className={`w-full h-full bg-gradient-to-br ${grads[i % grads.length]} relative`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="0.7" fill="none" opacity="0.65">
          {i === 0 && (
            <>
              <path d="M40 400 L360 400" strokeWidth="1.2" />
              <path d="M60 380 L340 380" />
              <path d="M80 360 L320 360" />
              <path d="M100 340 L300 340" />
              <path d="M120 320 L280 320" />
              <path d="M60 400 L60 200 L340 200 L340 400" />
              <path d="M120 200 L120 400 M200 200 L200 400 M280 200 L280 400" />
            </>
          )}
          {i === 1 && (
            <>
              <path d="M50 450 L350 450" strokeWidth="1.2" />
              <circle cx="120" cy="250" r="8" />
              <circle cx="200" cy="250" r="8" />
              <circle cx="280" cy="250" r="8" />
              <path d="M120 260 L120 450 M200 260 L200 450 M280 260 L280 450" />
              <path d="M60 250 L120 250 M280 250 L340 250" />
              <path d="M40 350 L360 350" opacity="0.5" />
            </>
          )}
          {i === 2 && (
            <>
              <ellipse cx="200" cy="250" rx="140" ry="80" />
              <ellipse cx="200" cy="250" rx="100" ry="55" />
              <ellipse cx="200" cy="250" rx="60" ry="30" />
              <path d="M60 250 L340 250" strokeWidth="0.5" opacity="0.4" />
              <path d="M200 90 L200 410" strokeWidth="0.5" opacity="0.4" />
            </>
          )}
          {i === 3 && (
            <>
              <path d="M40 400 L360 400" strokeWidth="1.2" />
              <path d="M50 400 L120 250 L200 250 L280 250 L350 400" />
              <circle cx="140" cy="300" r="3" />
              <circle cx="200" cy="290" r="3" />
              <circle cx="260" cy="300" r="3" />
              <path d="M0 250 L400 250" opacity="0.3" />
            </>
          )}
          {i === 4 && (
            <>
              <rect x="80" y="150" width="240" height="200" />
              <path d="M80 190 L320 190 M80 230 L320 230 M80 270 L320 270 M80 310 L320 310" />
              <path d="M140 150 L140 350 M200 150 L200 350 M260 150 L260 350" />
              <circle cx="200" cy="250" r="20" fill="#C42127" fillOpacity="0.5" />
            </>
          )}
          {i === 5 && (
            <>
              <path d="M100 100 L100 400" strokeWidth="1.5" />
              <path d="M100 100 L300 100 L300 400 L100 400" />
              <path d="M120 140 L280 140 M120 180 L280 180 M120 220 L280 220" />
              <path d="M120 260 L200 260 M120 300 L240 300 M120 340 L220 340" />
              <circle cx="260" cy="260" r="12" />
            </>
          )}
        </g>
      </svg>
      {/* subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,13,27,0.5) 100%)"
      }} />
    </div>
  );
}
