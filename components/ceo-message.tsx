"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

export function CeoMessage() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <section className="relative bg-ink-900 text-bone">
      <div className="max-w-container mx-auto px-gutter py-section">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-signal" />
                <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                  From the CEO
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="relative aspect-square max-w-[300px] border border-bone/15 overflow-hidden bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
                <div className="absolute inset-0 grid-bg opacity-60" />
                {imgOk && (
                  <Image
                    src="/ceo.jpg"
                    alt={`${site.ceo}, Chief Executive Officer of ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 300px, 60vw"
                    className="object-cover object-top"
                    onError={() => setImgOk(false)}
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <div className="font-display text-2xl text-bone leading-tight">
                      {site.ceo}
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel mt-2">
                      Chief Executive Officer
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.3] tracking-tight text-bone">
                <span className="text-signal">&ldquo;</span>Our clients have come to
                depend upon KARAM for nearly all of their engineering and service
                needs. We are driven by our motto, fair, accurate, safe and
                timely, underlined by honesty and dedication to every project and
                every long-term relationship.<span className="text-signal">&rdquo;</span>
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 flex items-center gap-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-steel">
                <span className="h-px w-10 bg-signal" />
                <span className="text-bone">{site.ceo}</span>
                <span>CEO · KARAM Engineering Services</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
