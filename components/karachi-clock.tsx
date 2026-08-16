"use client";

import { useEffect, useState } from "react";

function fmt(d: Date) {
  // Asia/Karachi is UTC+05:00 (no DST)
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  return new Intl.DateTimeFormat("en-GB", opts).format(d);
}

export function KarachiClock({ className = "" }: { className?: string }) {
  const [t, setT] = useState<string>("");

  useEffect(() => {
    const tick = () => setT(fmt(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} aria-label={`Karachi local time ${t}`}>
      <span suppressHydrationWarning>{t || "--:--:--"}</span>
      <span className="text-steel-600 ml-1">PKT</span>
    </span>
  );
}
