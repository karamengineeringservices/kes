import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · Request a Quotation",
  description:
    "Request a quotation from KARAM Engineering Services. Share your specification or scope of work and receive a detailed quote within two working days."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Request a quotation
          </>
        }
        intro="Share your specification, drawing or scope of work. We&rsquo;ll come back with a detailed quotation and project plan, usually within two working days."
      />

      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <QuoteForm />
              </Reveal>
            </div>

            {/* Contact block */}
            <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-bone/10">
              <Reveal>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-8">
                  Direct
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-steel-600 mb-2">
                      Head office
                    </div>
                    <address className="not-italic text-bone leading-relaxed">
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                      <br />
                      {site.address.city}
                    </address>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-steel-600 mb-2">
                      Cell
                    </div>
                    <a
                      href={`tel:${site.cell.replace(/\s/g, "")}`}
                      className="font-display text-2xl text-bone hover:text-signal transition-colors block"
                    >
                      {site.cell}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-steel-600 mb-2">
                      Email
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-display text-2xl text-bone hover:text-signal transition-colors block break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-steel-600 mb-2">
                      Hours
                    </div>
                    <div className="text-bone">
                      Mon–Sat · 09:00–18:00 <span className="text-steel">(PKT)</span>
                    </div>
                    <div className="text-steel-400 text-sm mt-1">
                      Available around the clock for active engagements.
                    </div>
                  </div>
                  <div className="pt-6 border-t border-bone/10">
                    <div className="text-xs uppercase tracking-widest text-steel-600 mb-3">
                      Registered
                    </div>
                    <ul className="space-y-2 font-mono text-sm">
                      {site.registrations.map((r) => (
                        <li key={r.label} className="text-bone">
                          <span className="text-steel-600 text-xs mr-2">{r.label}</span>
                          {r.value}
                          {"category" in r && r.category && (
                            <span className="text-steel text-xs ml-2">{r.category}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
