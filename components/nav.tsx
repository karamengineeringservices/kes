"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Magnetic } from "./magnetic";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 backdrop-blur-xl border-b border-bone/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-container mx-auto px-gutter flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
          }`}
        >
          <Logo />
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm tracking-wide transition-colors py-2 ${
                    active ? "text-bone" : "text-steel-400 hover:text-bone"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="link-line inline-flex items-center gap-2">
                    {active && (
                      <span className="w-1 h-1 rounded-full bg-signal" aria-hidden />
                    )}
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 bg-signal text-bone px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-signal-600 transition-colors group min-h-[40px]"
              >
                Request a Quote
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-bone"
            >
              <span className="relative block w-6 h-4">
                <span
                  className={`absolute left-0 top-0 w-full h-px bg-bone transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 w-full h-px bg-bone transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 w-full h-px bg-bone transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-ink-900 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-24 px-gutter flex flex-col h-full">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-signal mb-8">
            Navigate
          </div>
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-display text-4xl text-bone py-4 border-b border-bone/10 flex items-baseline justify-between"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span>{l.label}</span>
                <span className="font-mono text-[0.7rem] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto mb-10">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-between bg-signal text-bone px-6 py-4 text-base font-medium min-h-[56px]"
            >
              Request a Quote
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <p className="mt-4 font-mono text-xs text-steel">
              +92 333 2054961 · karamengineeringservices@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
