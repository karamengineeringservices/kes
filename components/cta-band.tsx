import Link from "next/link";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative bg-bone text-ink overflow-hidden">
      {/* Decorative right rail */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-[0.06]">
        <div className="w-full h-full grid-bg" style={{ filter: "invert(1)" }} />
      </div>

      <div className="max-w-container mx-auto px-gutter py-section relative">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-signal" />
                <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                  Start a project
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98] tracking-tighter">
                Have a specification, drawing<br className="hidden md:block" />{" "}
                or scope of work?
                <span className="text-signal">.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-ink-700 max-w-prose text-lg leading-relaxed">
                Share your requirements and we&rsquo;ll come back with a detailed
                quotation and project plan, usually within two working days.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6 md:items-end">
            <Reveal delay={280}>
              <Magnetic strength={0.4}>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 bg-ink text-bone px-8 py-5 text-lg font-medium overflow-hidden min-h-[56px]"
                >
                  <span className="absolute inset-0 bg-signal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]" />
                  <span className="relative z-10">Request a Quote</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="relative z-10 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </Magnetic>
            </Reveal>
            <Reveal delay={360}>
              <div className="font-mono text-xs text-ink-700 md:text-right space-y-1">
                <div>
                  <span className="text-ink-600 text-[0.65rem] uppercase tracking-[0.2em]">
                    Cell ·{" "}
                  </span>
                  {site.cell}
                </div>
                <div>
                  <span className="text-ink-600 text-[0.65rem] uppercase tracking-[0.2em]">
                    Email ·{" "}
                  </span>
                  {site.email}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
