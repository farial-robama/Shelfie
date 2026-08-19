# Shelfie

**Live Demo:** https://shelfie-olive-two.vercel.app/

A polished, frontend-only demo storefront built with Next.js. Shelfie pulls live product data from a public REST API and presents it through a fully custom shopping-browse experience — category navigation, search and sort, animated product grids, a testimonial carousel, and a feature marquee — with no backend, checkout, or auth of its own.

This project is a **UI/UX demo**, not a production e-commerce site. Copy across the app is written to reflect that honestly (see [Content honesty](#content-honesty) below).

## Tech stack

- **Framework:** Next.js (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Data source:** [restful-api.dev](https://restful-api.dev) (public product API)

## Features

- **Live product catalog** — fetched server-side with ISR (`revalidate = 60`)
- **Category detection & browsing** — products are auto-categorized from their names, with a dedicated "Shop by category" grid
- **Search & sort** — search-from-hero flows into `/products` via `searchParams`, with client-side filtering by name/spec and sorting by price or name
- **Animated product grids** — scroll-triggered entrance animations, hover lift, shine-sweep, and sparkle accents on trending items
- **Wobbling category tiles** — continuous ambient motion with hover glow and sparkle burst
- **Product detail pages** — full spec sheet, quantity stepper, related products
- **Testimonial carousel** — autoplay, arrows, dot navigation, pause-on-hover
- **Feature marquee** — infinite horizontal scroll highlighting real product-browsing features
- **Resilient images** — `SafeImage` component falls back to a placeholder if a remote image fails to load
- **Light/dark mode ready** — all UI built on semantic color tokens (`--ink`, `--paper`, `--accent`, etc.) rather than hardcoded Tailwind colors

## Content honesty

Because this is a frontend-only demo with no real checkout, shipping, or support system behind it, all marketing copy (testimonials, the feature marquee, etc.) is written to describe only what the app actually does — browsing, search, spec comparison, and catalog freshness. It intentionally avoids claims about shipping, checkout, payments, or customer support, and testimonial "reviewers" are labeled **Early tester**, not "Verified shopper," since nothing here is actually verified through a real transaction.

## Getting started

### Prerequisites

- Node.js 18.18+ (or whatever your Next.js version requires)
- npm, pnpm, or yarn

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Home — hero, categories, trending, featured, testimonials, marquee
│   ├── about/                # About page
│   ├── product/[id]/         # Product detail page
│   └── products/             # Full catalog page (search, sort, filter)
├── components/
│   ├── CategoryGrid.tsx       # Animated "Shop by category" grid
│   ├── TrendingGrid.tsx       # Animated trending products grid
│   ├── ProductGrid.tsx        # Filterable/sortable product grid (used on /products)
│   ├── ProductCard.tsx        # Individual product card
│   ├── Testimonials.tsx       # Testimonial carousel
│   ├── SafeImage.tsx          # next/image wrapper with fallback support
│   └── FeaturedBanner.tsx     # Highest-priced item banner
├── lib/
│   ├── api.ts                 # getProducts, extractPrice, formatPrice
│   ├── category.ts            # detectCategory, categoriesPresent, getProductImage
│   └── types.ts                # Shared TypeScript types (Product, etc.)
public/
└── images/                    # Static assets (including phone images, placeholders)
```

## Notes on data

Product data is sourced live from a public API and is not guaranteed to be stable or curated — categories, images, and pricing are derived heuristically (`detectCategory`, `getProductImage`) rather than provided directly by the API, since the source dataset doesn't include rich metadata.

## License

Personal / demo project — not licensed for production commercial use.