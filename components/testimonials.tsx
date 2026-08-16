"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const items = [
  {
    quote:
      "KARAM delivered our fabrication scope on time and to specification. Their inspection discipline and on-site supervision made the handover straightforward.",
    author: "[CLIENT NAME]",
    role: "Project Manager · [CLIENT ORGANISATION]",
    tag: "Fabrication scope"
  },
  {
    quote:
      "A dependable partner for retube and pressure-vessel work. Quotations are transparent, and their teams turn up ready. Safety-first, tools in hand.",
    author: "[CLIENT NAME]",
    role: "Chief Engineer · [CLIENT ORGANISATION]",
    tag: "Boilers & retube"
  },
  {
    quote:
      "We&rsquo;ve used KARAM for outfitting on multiple vessels. Piping, cable-tray and lagging are executed cleanly, with drawings honoured and paperwork complete.",
    author: "[CLIENT NAME]",
    role: "Yard Superintendent · [CLIENT ORGANISATION]",
    tag: "Outfitting"
  }
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];
  return (
    <section className="relative bg-ink text-bone border-y border-bone/10">
      <div className="max-w-container mx-auto px-gutter py-section">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-signal" />
                <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                  Client voices
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tighter">
                What partners say about working with our teams<span className="text-signal">.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-steel-400 max-w-prose">
                Testimonials shown below are marked as placeholders pending client
                sign-off. Real quotes and attribution added upon written consent.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => setI((i - 1 + items.length) % items.length)}
                  className="w-11 h-11 border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M13 7H1M7 13L1 7l6-6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setI((i + 1) % items.length)}
                  className="w-11 h-11 border border-bone/20 text-bone hover:border-signal hover:text-signal transition-colors flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <span className="ml-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel tabular-nums">
                  {String(i + 1).padStart(2, "0")} <span className="text-steel-600">/</span>{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-bone/10 relative min-h-[300px]">
            <div key={i} className="animate-fade-up">
              <div className="font-display text-signal text-6xl md:text-8xl leading-none mb-6 select-none">
                &ldquo;
              </div>
              <p className="font-display text-[clamp(1.4rem,2.4vw,2.25rem)] leading-[1.35] tracking-tight text-bone max-w-[38ch]"
                 dangerouslySetInnerHTML={{ __html: t.quote }}
              />
              <div className="mt-10 pt-6 border-t border-bone/10 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="text-bone font-medium">{t.author}</div>
                  <div className="text-steel text-sm">{t.role}</div>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
                  {t.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
