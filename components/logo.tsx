import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({
  className = "",
  variant = "light"
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const text = variant === "light" ? "text-bone" : "text-ink";
  const meta = variant === "light" ? "text-steel" : "text-steel-600";
  // On dark surfaces the black gear needs a light backdrop to be visible.
  const badgeBg = variant === "light" ? "bg-bone" : "bg-transparent";

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={`inline-flex items-center gap-3 group ${className}`}
    >
      <span
        className={`relative inline-flex items-center justify-center w-9 h-9 shrink-0 ${badgeBg} rounded-sm overflow-hidden`}
      >
        <Image
          src="/logo.jpg"
          alt=""
          width={512}
          height={551}
          className="w-8 h-8 object-contain"
          priority
        />
      </span>
      <span className="flex items-baseline gap-2 leading-none">
        <span className={`font-display text-[1.35rem] leading-none tracking-tight ${text}`}>
          KARAM
        </span>
        <span
          className={`hidden sm:inline font-mono text-[0.65rem] uppercase tracking-[0.2em] ${meta} translate-y-[-2px]`}
        >
          Engineering Services
        </span>
      </span>
    </Link>
  );
}
