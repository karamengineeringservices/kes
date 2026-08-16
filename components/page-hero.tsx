import { Reveal } from "./reveal";

export function PageHero({
  eyebrow,
  title,
  intro
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden noise horizon-bg">
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
      <div className="relative max-w-container mx-auto px-gutter">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-signal" />
            <span className="font-mono uppercase tracking-[0.22em] text-[0.7rem] text-signal">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display leading-[0.98] tracking-tighter text-bone text-[clamp(2.5rem,7vw,6rem)] max-w-[18ch]">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-steel-400 leading-relaxed">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
