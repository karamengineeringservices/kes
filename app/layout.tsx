import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { site } from "@/lib/site";

// Inter for everything — display + body. Removes Fraunces "funky" serif entirely.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const SITE_URL = "https://www.karamengineeringservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} · Maritime & Industrial Engineering, Karachi`,
    template: `%s · ${site.name}`
  },
  description:
    "KARAM Engineering Services provides steel fabrication, ship repair, boilers, pressure vessels, grit blasting and skilled technical manpower for the maritime and industrial sectors. Fair, accurate, safe and timely.",
  keywords: [
    "KARAM Engineering Services",
    "KARAM Engineering",
    "engineering services Karachi",
    "engineering services Pakistan",
    "maritime engineering services",
    "maritime engineering Karachi",
    "industrial engineering services",
    "ship repair Pakistan",
    "ship repair Karachi",
    "steel fabrication Karachi",
    "hull block fabrication",
    "boiler manufacturing Pakistan",
    "pressure vessel fabrication",
    "grit blasting Karachi",
    "marine engineering Pakistan",
    "shipyard subcontractor Karachi",
    "MILGEM Pakistan",
    "Karachi Shipyard Engineering Works subcontractor",
    "skilled manpower marine Pakistan"
  ],
  authors: [{ name: site.name }],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: `${site.name} · Maritime & Industrial Engineering`,
    description:
      "Fabrication, ship repair, boilers, blasting and skilled technical manpower for the maritime and industrial sectors. Trusted by Karachi Shipyard & Engineering Works.",
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: site.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — Maritime & Industrial Engineering`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Maritime & Industrial Engineering`,
    description:
      "Fabrication, ship repair, boilers, blasting and skilled technical manpower for the maritime and industrial sectors.",
    images: ["/og-image.jpg"]
  }
};

// JSON-LD structured data — tells Google this is a real, physical engineering
// business (name, address, phone, sectors, services). This is what can
// trigger a Knowledge Panel and improves local/business search relevance
// for queries like "KARAM Engineering Services" or "maritime engineering Karachi".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.short,
  description:
    "KARAM Engineering Services provides steel fabrication, ship repair, boilers, pressure vessels, grit blasting and skilled technical manpower for the maritime and industrial sectors in Pakistan.",
  url: SITE_URL,
  telephone: site.cell,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.883,
    longitude: 67.1
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan"
  },
  foundingDate: String(site.founded),
  founder: {
    "@type": "Person",
    name: site.ceo
  },
  knowsAbout: [
    "Ship Repair",
    "Steel Fabrication",
    "Hull Block Fabrication",
    "Grit Blasting",
    "Boiler Manufacturing",
    "Pressure Vessel Manufacturing",
    "Marine Outfitting",
    "Industrial Piping",
    "Hydraulics Systems",
    "Skilled Technical Manpower"
  ],
  makesOffer: [
    "Fabrication & Erection",
    "Outfitting Works",
    "Boilers & Pressure Vessels",
    "Grit Blasting & Preservation",
    "Hydraulics System and Overhaul",
    "Skilled Manpower & Consultancy"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-ink text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-bone focus:text-ink focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
