"use client";

import { motion } from "framer-motion";

/**
 * template.tsx re-runs on every route change (unlike layout.tsx which persists).
 * Wrapping children in a motion.div gives every navigation a smooth fade+lift.
 * Respects prefers-reduced-motion via the wrapper's initial/animate values.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
