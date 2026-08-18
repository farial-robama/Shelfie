import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  LayoutGrid,
  RefreshCw,
  Sparkles,
  Boxes,
  Truck,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { getProducts, extractPrice, formatPrice } from "@/lib/api";
import {
  categoriesPresent,
  detectCategory,
  getProductImage,
} from "@/lib/category";

export const revalidate = 60;

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  const categories = categoriesPresent(products).slice(0, 6);

  const featured = products.reduce<(typeof products)[number] | null>(
    (best, p) => {
      const price = extractPrice(p);
      if (price === null) return best;
      if (!best || (extractPrice(best) ?? -1) < price) return p;
      return best;
    },
    null,
  );

  const trending = products.filter((p) => p.id !== featured?.id).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-accent">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              New arrivals every week
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink mt-3 leading-[1.1]">
              Everything you need,
              <br className="hidden sm:block" />
              one well-stocked shelf away.
            </h1>
            <p className="text-muted text-base sm:text-lg mt-4 max-w-lg">
              Shelfie curates a constantly rotating lineup of home, tech, and
              everyday finds. Browse by category, compare specs side by side,
              and check out in minutes.
            </p>

            <form
              action="/products"
              className="flex items-center gap-2 mt-7 max-w-md"
            >
              <div className="flex items-center flex-1 rounded-full border border-line bg-surface pl-4 pr-1 focus-within:border-ink/30 transition-colors">
                <Search className="h-4 w-4 text-muted shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search the shelf — try “desk lamp”"
                  className="w-full bg-transparent border-0 outline-none text-sm text-ink placeholder:text-muted px-3 py-2.5"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-ink text-paper h-11 w-11 shrink-0 hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Search"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm font-medium px-5 py-3 hover:bg-accent transition-colors"
              >
                Browse all products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface text-sm font-medium px-5 py-3 text-ink hover:border-ink/30 transition-colors"
              >
                How this works
              </Link>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="relative h-[360px] sm:h-[440px] hidden sm:block">
              {categories.slice(0, 3).map((c, i) => (
                <div
                  key={c.id}
                  className={`absolute rounded-2xl overflow-hidden border border-line shadow-sm ${c.tile} ${
                    i === 0
                      ? "w-[62%] aspect-[4/5] top-0 right-0"
                      : i === 1
                        ? "w-[46%] aspect-square bottom-0 left-0"
                        : "w-[38%] aspect-square bottom-20 right-[32%] -rotate-3"
                  }`}
                >
                  <Image
                    src={c.image}
                    alt={`${c.label} category photo`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute top-6 left-0 rounded-2xl bg-surface border border-line px-4 py-3 shadow-sm flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-ink shrink-0">
                  <Boxes className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink leading-none">
                    {products.length}+ items
                  </p>
                  <p className="text-[11px] text-muted mt-1">
                    in stock right now
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display font-bold text-xl text-ink">
              Shop by category
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-muted hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href="/products"
                className={`group relative aspect-square rounded-2xl overflow-hidden ${c.tile} border border-line hover:border-ink/20 transition-colors`}
              >
                <Image
                  src={c.image}
                  alt={`${c.label} category photo`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span
                  className={`absolute bottom-2 left-2 right-2 rounded-full ${c.badgeBg} backdrop-blur px-2.5 py-1 text-[11px] font-medium ${c.badgeText} text-center truncate`}
                >
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {trending.length > 0 && (
        <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Trending this week
              </span>
              <h2 className="font-display font-bold text-xl text-ink mt-1">
                On the shelf right now
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-muted hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.map((p) => {
              const category = detectCategory(p.name);
              const price = extractPrice(p);
              return (
                <Link
                  key={p.id}
                  href={`/product/${encodeURIComponent(p.id)}`}
                  className="group rounded-2xl border border-line bg-surface overflow-hidden hover:border-ink/20 transition-colors"
                >
                  <div
                    className={`relative aspect-square overflow-hidden ${category.tile}`}
                  >
                    <Image
                      src={getProductImage(p)}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-sm font-medium text-ink line-clamp-1">
                      {p.name}
                    </p>
                    {price !== null && (
                      <p className="text-sm font-semibold text-accent-ink mt-1">
                        {formatPrice(price)}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {featured && (
        <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
          <div className="rounded-2xl bg-surface border border-line overflow-hidden grid grid-cols-1 sm:grid-cols-2">
            <div
              className={`relative aspect-[4/3] sm:aspect-auto overflow-hidden ${detectCategory(featured.name).tile}`}
            >
              <Image
                src={detectCategory(featured.name).image}
                alt={`${detectCategory(featured.name).label} category photo`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">
                Highest priced item right now
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                {featured.name}
              </h3>
              {extractPrice(featured) !== null && (
                <p className="font-display font-bold text-2xl text-ink mt-2">
                  {formatPrice(extractPrice(featured)!)}
                </p>
              )}
              <Link
                href={`/product/${encodeURIComponent(featured.id)}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent mt-4 w-fit hover:gap-2.5 transition-all"
              >
                View spec sheet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-line lg:divide-y-0 lg:divide-x">
            <div className="flex items-start gap-3 py-4 lg:py-0 lg:px-6 first:lg:pl-0">
              <Truck
                className="h-5 w-5 text-accent shrink-0 mt-0.5"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-sm font-semibold text-ink">Free shipping</p>
                <p className="text-xs text-muted mt-0.5">
                  On every order over $50
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-4 lg:py-0 lg:px-6">
              <RotateCcw
                className="h-5 w-5 text-accent shrink-0 mt-0.5"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-sm font-semibold text-ink">Easy returns</p>
                <p className="text-xs text-muted mt-0.5">
                  30 days, no questions asked
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-4 lg:py-0 lg:px-6">
              <ShieldCheck
                className="h-5 w-5 text-accent shrink-0 mt-0.5"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-sm font-semibold text-ink">
                  Secure checkout
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Your info stays protected
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-4 lg:py-0 lg:px-6 last:lg:pr-0">
              <MessageCircle
                className="h-5 w-5 text-accent shrink-0 mt-0.5"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-sm font-semibold text-ink">Real support</p>
                <p className="text-xs text-muted mt-0.5">
                  A person replies within a day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
