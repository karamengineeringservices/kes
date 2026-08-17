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

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Maritime & Industrial Engineering, Karachi`,
    template: `%s · ${site.name}`
  },
  description:
    "KARAM Engineering Services provides steel fabrication, ship repair, boilers, pressure vessels, grit blasting and skilled technical manpower for the maritime and industrial sectors. Fair, accurate, safe and timely.",
  keywords: [
    "engineering services Karachi",
    "ship repair Pakistan",
    "steel fabrication",
    "boiler manufacturing",
    "grit blasting",
    "marine engineering",
    "KARAM Engineering"
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} · Maritime & Industrial Engineering`,
    description:
      "Fabrication, ship repair, boilers, blasting and skilled technical manpower for the maritime and industrial sectors.",
    type: "website",
    locale: "en_PK"
  }
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
