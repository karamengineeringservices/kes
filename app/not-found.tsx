import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex items-center relative noise horizon-bg pt-32 pb-24">
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
      <div className="relative max-w-container mx-auto px-gutter">
        <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-6">
          Error · 404
        </div>
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tighter text-bone">
          Off the chart<span className="text-signal">.</span>
        </h1>
        <p className="mt-6 text-steel-400 text-lg max-w-md">
          The page you&rsquo;re looking for isn&rsquo;t here. Let&rsquo;s get you back to
          familiar waters.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-signal text-bone px-6 py-3 hover:bg-signal-600 transition-colors"
          >
            Return home
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-bone px-2 py-3 hover:text-signal transition-colors"
          >
            <span className="link-line">Contact us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
