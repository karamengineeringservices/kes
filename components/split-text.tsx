"use client";

import { useEffect, useRef, useState, Fragment } from "react";

type Props = {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
};

export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  wordClassName = "",
  stagger = 55,
  delay = 0
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const El = Tag as React.ElementType;
  const words = text.split(/(\s+)/);
  let idx = 0;

  return (
    <El ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <Fragment key={i}>{w}</Fragment>;
        const myIdx = idx++;
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`inline-block overflow-hidden align-baseline ${wordClassName}`}
          >
            <span
              className="inline-block will-change-transform"
              style={{
                transform: visible ? "translateY(0)" : "translateY(110%)",
                opacity: visible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${
                  delay + myIdx * stagger
                }ms, opacity 600ms cubic-bezier(0.16,1,0.3,1) ${
                  delay + myIdx * stagger
                }ms`
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </El>
  );
}
