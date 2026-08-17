"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * TiltCard — a container that tilts subtly toward the cursor with perspective.
 * Uses framer-motion springs for a physics-feeling response.
 * Disabled on touch and prefers-reduced-motion.
 */
export function TiltCard({
  children,
  intensity = 8,
  className = ""
}: {
  children: React.ReactNode;
  /** max degrees of rotation */
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) / r.width);
    rawY.set((e.clientY - (r.top + r.height / 2)) / r.height);
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
