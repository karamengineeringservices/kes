"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Photo — a next/image wrapper that hides the image element on 404
 * so the fallback (SVG art, gradient, etc.) behind it renders instead.
 *
 * Usage: place inside a container that already has fallback content
 * behind, then set `absolute inset-0` on this Photo.
 */
export function Photo({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  fit = "cover"
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      unoptimized
      onError={() => setOk(false)}
      className={`${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
