import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 60;

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let loadError = false;

  try {
    products = await getProducts();
  } catch {
    loadError = true;
  }

  return (
    <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <span className="font-mono text-xs tracking-widest uppercase text-accent">
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
          <p className="font-mono text-xs text-muted mt-1">
            The inventory API might be temporarily unavailable. Refresh to
            try again.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
