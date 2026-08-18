import type { Metadata } from "next";
import { getProducts, extractPrice } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import FeaturedBanner from "@/components/FeaturedBanner";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products — Shelfie",
  description: "Browse the full live catalog, sourced from restful-api.dev.",
};

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let loadError = false;

  try {
    products = await getProducts();
  } catch {
    loadError = true;
  }

  const featured = products.reduce<(typeof products)[number] | null>(
    (best, p) => {
      const price = extractPrice(p);
      if (price === null) return best;
      if (!best || (extractPrice(best) ?? -1) < price) return p;
      return best;
    },
    null,
  );

  const gridProducts = featured
    ? products.filter((p) => p.id !== featured.id)
    : products;

  return (
    <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <div className="mb-8">
        <span className="text-xs font-medium tracking-widest uppercase text-accent">
          Live inventory
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mt-2 max-w-xl">
          Every item on the shelf, tagged and ready to inspect.
        </h1>
        <p className="text-muted mt-3 max-w-xl">
          Browse the current catalog below, then open any item to see its
          full spec sheet.
        </p>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
          <p className="font-display font-bold text-ink">
            The catalog didn&apos;t load
          </p>
          <p className="text-xs text-muted mt-1">
            The inventory API might be temporarily unavailable. Refresh to
            try again.
          </p>
        </div>
      ) : (
        <>
          {featured && <FeaturedBanner product={featured} />}
          <ProductGrid products={gridProducts} />
        </>
      )}
    </div>
  );
}