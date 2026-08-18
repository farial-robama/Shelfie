import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  Database,
  Code2,
  ShieldCheck,
  RefreshCw,
  Layers,
  Search as SearchIcon,
} from "lucide-react";
import { getProducts, extractPrice, formatPrice } from "@/lib/api";
import {
  categoriesPresent,
  detectCategory,
  getProductImage,
} from "@/lib/category";
import FaqAccordion from "@/components/FaqAccordion";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About — Shelfie",
  description:
    "What Shelfie is, how it's built, and where its data comes from.",
};

const FAQS = [
  {
    question: "Is this a real store I can buy from?",
    answer:
      "No — Shelfie is a demo storefront. There's no checkout, no payment processing, and nothing ships. It exists to show what a well-built catalog frontend looks like.",
  },
  {
    question: "Where does the inventory come from?",
    answer:
      "Every listing is fetched live from restful-api.dev, a free public sandbox API. Shelfie doesn't own or store any of it — refresh the page and you're seeing the current state of that API, not a cached copy.",
  },
  {
    question: "Why don't the product photos match exactly?",
    answer:
      "The API returns names and specs but no images, so each item shows a photo chosen for its category and, where possible, keywords from its own name — not an exact studio shot of that specific product.",
  },
  {
    question: "Can inventory change or disappear?",
    answer:
      "Yes. Since the catalog mirrors a public sandbox API in real time, items can be added, edited, or removed upstream at any point, and Shelfie will reflect that on the next refresh.",
  },
];

export default async function AboutPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  const categories = categoriesPresent(products);
  const categoryCount = categories.length;
  const heroCategory = categories[0];
  const marqueeItems = products.slice(0, 10);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              About this project
            </span>

            <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-ink sm:text-4xl">
              A frontend, doing one job well.
            </h1>

            <p className="mt-4 max-w-lg text-base text-muted sm:text-lg">
              Shelfie is a small e-commerce-style catalog. No backend, no
              database, no admin panel — just a frontend built to make a live
              public API feel like a real store to browse.
            </p>

            {products.length > 0 && (
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {products.length}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">Live products</p>
                </div>

                <div className="hidden h-8 w-px bg-line sm:block" />

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {categoryCount}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">Categories</p>
                </div>

                <div className="hidden h-8 w-px bg-line sm:block" />

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    60s
                  </p>
                  <p className="mt-0.5 text-xs text-muted">Refresh window</p>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Browse the catalog
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://restful-api.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                View the API
              </a>
            </div>
          </div>

          {heroCategory && (
            <div className="relative">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-sm ${heroCategory.tile}`}
              >
                <Image
                  src={heroCategory.image}
                  alt={`${heroCategory.label} category photo`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-sm sm:right-auto sm:w-64">
                <p className="text-sm font-semibold leading-none text-ink">
                  Every photo, honestly labeled
                </p>

                <p className="mt-1.5 text-xs text-muted">
                  Category and keyword matched — never claimed as an exact
                  product shot.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marquee — real inventory, scrolling */}
      {marqueeItems.length > 0 && (
        <section className="overflow-hidden border-y border-line bg-surface/60 py-10 sm:py-14">
          <div className="mx-auto mb-6 w-full max-w-6xl px-5 sm:px-8">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Live right now
            </span>

            <h2 className="mt-1 font-display text-lg font-bold text-ink">
              What&apos;s actually on the shelf
            </h2>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="marquee-track flex w-max items-stretch gap-4">
              {[...marqueeItems, ...marqueeItems].map((p, i) => {
                const category = detectCategory(p.name);
                const price = extractPrice(p);

                return (
                  <Link
                    key={`${p.id}-${i}`}
                    href={`/product/${encodeURIComponent(p.id)}`}
                    className="group w-40 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-ink/20"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden ${category.tile}`}
                    >
                      <Image
                        src={getProductImage(p)}
                        alt={p.name}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-2.5">
                      <p className="line-clamp-1 text-xs font-medium text-ink">
                        {p.name}
                      </p>

                      {price !== null && (
                        <p className="mt-0.5 text-xs font-semibold text-accent-ink">
                          {formatPrice(price)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 sm:px-8 sm:pt-20">
        <h2 className="mb-5 font-display text-lg font-bold text-ink">
          How it works
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">Fetch</h3>

            <p className="mt-1 text-sm text-muted">
              On every request, Shelfie calls restful-api.dev directly —
              nothing is pre-loaded or hardcoded.
            </p>
          </div>

          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Layers className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">
              Organize
            </h3>

            <p className="mt-1 text-sm text-muted">
              Each item&apos;s name is matched against a set of category
              rules, so browsing and filtering work without the API providing
              categories itself.
            </p>
          </div>

          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <SearchIcon className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">
              Browse
            </h3>

            <p className="mt-1 text-sm text-muted">
              Search, filter, and open any item to see its full spec sheet —
              laid out clean, without digging through raw JSON.
            </p>
          </div>
        </div>
      </section>

      {/* Build details */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 sm:px-8 sm:pt-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Data */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Database className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-sm font-bold text-ink">
              Where the data comes from
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              Every product listed is fetched live from{" "}
              <a
                href="https://restful-api.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                restful-api.dev
              </a>
              , a free public sandbox API. Nothing is stored on our end.
            </p>
          </div>

          {/* Build */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Code2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-sm font-bold text-ink">
              How it&apos;s built
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              Next.js (App Router) and TypeScript, styled with Tailwind CSS,
              with Framer Motion for the catalog&apos;s reveal animation.
            </p>
          </div>

          {/* Photos */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-sm font-bold text-ink">
              An honest note on photos
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              The API doesn&apos;t provide product images, so each item shows
              a representative photo matched to its name and category, not an
              exact product shot.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 sm:px-8 sm:pt-16">
        <h2 className="mb-5 font-display text-lg font-bold text-ink">
          Common questions
        </h2>

        <FaqAccordion items={FAQS} />
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 rounded-2xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg font-bold">
              Curious what&apos;s in stock?
            </h2>

            <p className="mt-1 text-sm text-paper/70">
              The full catalog updates as the source API changes.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Browse products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}