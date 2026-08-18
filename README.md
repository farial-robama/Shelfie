# Shelfie — a small storefront on restful-api.dev

A simple, responsive e-commerce-style Shelfie built with Next.js (App Router) and
TypeScript. It reads live product data from the public
[restful-api.dev](https://restful-api.dev/) `objects` endpoint, lists everything in a
responsive grid, and shows each item's full spec sheet on its own detail page.

No backend, database, or admin panel — just a frontend consuming a public REST API.

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for the grid's reveal animation
- Google Fonts: Space Grotesk (display), Inter (body), IBM Plex Mono (spec data)

## Features

- `/` — fetches `GET https://api.restful-api.dev/objects` on the server and renders
  every item as a tag-style card (id, name, a couple of spec highlights, price if the
  item has one). Includes a client-side search box that filters by name or any spec
  value.
- `/product/[id]` — fetches `GET https://api.restful-api.dev/objects/{id}` and renders
  the item's full spec table. Unknown ids render a proper 404 page via `notFound()`.
- Loading skeleton (`loading.tsx`), error boundary with retry (`error.tsx`), and a
  friendly 404 (`not-found.tsx`).
- The API's `data` field is a freeform bag that differs per item — the UI renders
  whatever keys are present instead of assuming a fixed schema, and best-effort
  detects a price field to show as a badge.
- Fully responsive (1 / 2 / 3 column grid), keyboard-focus states, and
  `prefers-reduced-motion` respected.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
```

No environment variables or API keys are required — the restful-api.dev Shelfie
endpoint is public.

## Project structure

```
src/
  app/
    page.tsx                 # Shelfie (server component, fetches product list)
    product/[id]/page.tsx    # product detail (server component, fetches one item)
    loading.tsx / error.tsx / not-found.tsx
    layout.tsx, globals.css  # shared shell, fonts, design tokens
  components/
    ProductGrid.tsx           # client component: search + animated grid
    ProductCard.tsx            # tag-styled product card
    SpecTable.tsx               # key/value spec sheet on the detail page
  lib/
    api.ts                    # fetch helpers, price/label formatting
    types.ts                  # Product / ProductData types
```

## Deploying

This project deploys to Vercel with zero configuration:

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Deploy — no environment variables needed.

## Notes on the API

`restful-api.dev` is a shared public sandbox, so the Shelfie reflects whatever data
currently exists on the service (it can include entries added by other developers
testing the API). Product pages use `revalidate: 60` so the list and detail pages stay
reasonably fresh without hammering the API on every request.
