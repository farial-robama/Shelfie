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
  title: "About Us — Shelfie Electronics",
  description:
    "Learn about Shelfie, our premium consumer electronics lineup, fast delivery, and quality guarantees.",
};

const FAQS = [
  {
    question: "How fast do you ship my orders?",
    answer:
      "All orders placed before 2 PM EST are processed same-day. Express shipping delivers within 1 to 2 business days, while standard delivery typically takes 3 to 5 business days.",
  },
  {
    question: "Where do you source your electronics?",
    answer:
      "We partner directly with authorized distributors and top tech brands to guarantee 100% authentic, brand-new electronics complete with manufacturer warranties.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, return it in original condition for a full refund or exchange.",
  },
  {
    question: "Do your products come with warranties?",
    answer:
      "Yes! Every item sold on Shelfie includes standard manufacturer warranty coverage, plus optional extended protection plans available at checkout.",
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
              About Shelfie
            </span>

            <h1 className="mt-2 font-display text-3xl font-bold leading-[1.1] text-ink sm:text-4xl">
              Next-gen tech, delivered straight to your door.
            </h1>

            <p className="mt-4 max-w-lg text-base text-muted sm:text-lg">
              Welcome to Shelfie — your ultimate destination for high-performance
              tech, smart devices, and premium gadgets curated for your digital lifestyle.
            </p>

            {products.length > 0 && (
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {products.length}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">In-stock items</p>
                </div>

                <div className="hidden h-8 w-px bg-line sm:block" />

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    {categoryCount}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">Tech categories</p>
                </div>

                <div className="hidden h-8 w-px bg-line sm:block" />

                <div>
                  <p className="font-display text-2xl font-bold text-ink">
                    24/7
                  </p>
                  <p className="mt-0.5 text-xs text-muted">Customer support</p>
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Shop all tech
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://restful-api.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                View deals
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
                  100% Authentic Products
                </p>

                <p className="mt-1.5 text-xs text-muted">
                  Directly from top global technology brands with full manufacturer warranty.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marquee */}
      {marqueeItems.length > 0 && (
        <section className="overflow-hidden border-y border-line bg-surface/60 py-10 sm:py-14">
          <div className="mx-auto mb-6 w-full max-w-6xl px-5 sm:px-8">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Trending now
            </span>

            <h2 className="mt-1 font-display text-lg font-bold text-ink">
              Featured tech in stock
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
          Why shop with Shelfie
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">Express Shipping</h3>

            <p className="mt-1 text-sm text-muted">
              Fast, tracked delivery on all orders with dispatch within 24 hours.
            </p>
          </div>

          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Layers className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">
              Curated Electronics
            </h3>

            <p className="mt-1 text-sm text-muted">
              Hand-selected gadgets, smartphones, laptops, and audio gear for supreme performance.
            </p>
          </div>

          <div className="relative border-l-2 border-line pl-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <SearchIcon className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="font-display text-sm font-bold text-ink">
              Verified Specs
            </h3>

            <p className="mt-1 text-sm text-muted">
              Complete technical specifications and transparent details so you buy with confidence.
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
              Official Distributors
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              All inventory comes directly from factory-authorized suppliers to ensure quality.
            </p>
          </div>

          {/* Build */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <Code2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-sm font-bold text-ink">
              Secure Checkout
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              Encrypted transaction processing to keep your payment details completely safe.
            </p>
          </div>

          {/* Photos */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
              <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>

            <h2 className="font-display text-sm font-bold text-ink">
              30-Day Guarantee
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              Enjoy complete peace of mind with our straightforward 30-day return policy.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-5 pt-14 sm:px-8 sm:pt-16">
        <h2 className="mb-5 font-display text-lg font-bold text-ink">
          Frequently Asked Questions
        </h2>

        <FaqAccordion items={FAQS} />
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 rounded-2xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-lg font-bold">
              Ready to upgrade your gear?
            </h2>

            <p className="mt-1 text-sm text-paper/70">
              Discover our full collection of premium electronics today.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Start shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}