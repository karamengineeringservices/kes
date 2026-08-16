"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const services = [
  "Fabrication & Erection",
  "Outfitting Works",
  "Boilers & Pressure Vessels",
  "Grit Blasting & Painting",
  "Electrical & Hydraulics",
  "Skilled Manpower / Consultancy",
  "Other"
];

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(s: string) {
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Real backend not connected — simulate a submit.
    // Replace with your endpoint (e.g. /api/quote → email/CRM).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setSelected([]);
  }

  const inputCls =
    "w-full bg-transparent border-b border-bone/25 focus:border-signal text-bone placeholder:text-steel/60 py-3 outline-none transition-colors";
  const labelCls =
    "block font-mono uppercase text-[0.65rem] tracking-[0.2em] text-steel mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className={labelCls} htmlFor="name">
            Name*
          </label>
          <input required id="name" name="name" className={inputCls} placeholder="Your full name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">
            Company / organisation
          </label>
          <input id="company" name="company" className={inputCls} placeholder="Company name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            Email*
          </label>
          <input
            required
            id="email"
            type="email"
            name="email"
            className={inputCls}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" className={inputCls} placeholder="+92 …" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Services required</label>
        <div className="flex flex-wrap gap-2 mt-3">
          {services.map((s) => {
            const active = selected.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggle(s)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  active
                    ? "bg-signal text-bone border-signal"
                    : "border-bone/25 text-bone hover:border-bone/60"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="services" value={selected.join(", ")} />
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          Project details*
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className={`${inputCls} resize-y min-h-[120px]`}
          placeholder="Scope, timeline, site location, any drawings or specifications…"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 bg-signal text-bone px-8 py-4 text-base font-medium hover:bg-signal-600 disabled:opacity-70 transition-colors"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
            aria-hidden
          >
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <p className="text-xs text-steel-400 max-w-sm leading-relaxed">
          We reply within two working days. For urgent enquiries, call{" "}
          <a href="tel:+923332054961" className="text-bone hover:text-signal">
            +92 333 2054961
          </a>
          .
        </p>
      </div>

      {status === "sent" && (
        <div
          role="status"
          className="mt-6 border border-signal/40 bg-signal/10 text-bone p-4 text-sm"
        >
          Thanks. Your enquiry has been received. A member of our team will be in
          touch shortly.
        </div>
      )}
    </form>
  );
}
