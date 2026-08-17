import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, extractPrice, formatPrice } from "@/lib/api";
import SpecTable from "@/components/SpecTable";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  return {
    title: product ? `${product.name} — Catalog` : "Item not found — Catalog",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => {
    throw new Error("fetch-failed");
  });

  if (!product) notFound();

  const price = extractPrice(product);

  return (
    <div className="mx-auto max-w-3xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
      >
        ← Back to catalog
      </Link>

      <div className="rounded-2xl bg-surface border border-line overflow-hidden">
        <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-dashed border-line">
          <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
            Item Obj·{product.id}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-2">
            {product.name}
          </h1>
          {price !== null && (
            <span className="inline-block font-display font-bold text-base text-accent-ink bg-accent/15 rounded-full px-4 py-1.5 mt-4">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <div className="px-6 sm:px-8 py-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
            Spec sheet
          </h2>
          {product.data ? (
            <SpecTable data={product.data} />
          ) : (
            <p className="font-mono text-sm text-muted italic">
              No spec data on file for this item.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
