"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic hover wrapper — the wrapped element eases toward the cursor within
 * a small radius. Falls back to no-op on touch and reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 120,
  className = ""
}: {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(animate);
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < radius + Math.max(r.width, r.height) / 2) {
        tx = dx * strength;
        ty = dy * strength;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      } else if (tx !== 0 || ty !== 0) {
        tx = 0;
        ty = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
