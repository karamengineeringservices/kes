import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = ""
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignC = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <div className={`flex flex-col ${alignC} ${className}`}>
      {eyebrow && (
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-signal" />
            <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <Reveal delay={100}>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tighter text-bone max-w-[22ch]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={200}>
          <p className="mt-6 text-steel-400 max-w-prose text-base md:text-lg leading-relaxed">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
