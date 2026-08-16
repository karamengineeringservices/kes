# KARAM Engineering Services — Website

Marketing website for KARAM Engineering Services, a Karachi-based engineering
firm serving the maritime and industrial sectors: fabrication, ship repair,
boilers, grit blasting, electrical/hydraulics and skilled technical manpower.

## Tech stack

- **Framework:** Next.js 15 (App Router) + React 19 (RC)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 with custom design tokens
- **Fonts:** Fraunces (display), Inter (body), JetBrains Mono (accents) via `next/font`
- **Images:** Local files in `public/` served via `next/image` with a graceful
  fallback wrapper (`components/photo.tsx`)
- **No external UI libraries** — every component is hand-rolled

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/                     Next.js App Router pages
  layout.tsx             Root layout (fonts, metadata)
  page.tsx               Homepage
  services/              Services page
  projects/              Projects page
  about/                 About page
  contact/               Contact page (quote form)
components/              Reusable UI components
lib/site.ts              All site copy (services, clients, values, contact info)
public/                  Static assets (photos, favicon)
public/Combined/         Source photos before processing
scripts/process-photos.js  One-shot image trim/crop tool
```

## Editing site content

Almost all site copy lives in `lib/site.ts` — services, clients, sectors, values,
CEO details, contact info. Edit that file to change what's shown across the whole
site.

## Photo processing

Source photos go in `public/Combined/`, then run:

```bash
node scripts/process-photos.js
```

This trims whitespace and writes ready-to-use JPGs to `public/` at the exact
filenames the site expects (`hero.jpg`, `ceo.jpg`, `service-01.jpg`,
`project-1.jpg`, etc.).

## Deployment

Optimised for Vercel. Push to the connected GitHub repo and it deploys
automatically.

```bash
npm run build   # verify production build locally
```

## Contact

- Company website: www.karam.com.pk
- Email: karamengineeringservices@gmail.com
- Cell: +92 333 2054961
