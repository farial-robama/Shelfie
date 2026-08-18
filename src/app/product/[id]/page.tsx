import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import { getProduct, getProducts, extractPrice, formatPrice } from "@/lib/api";
import { detectCategory, getProductImage } from "@/lib/category";
import SpecTable from "@/components/SpecTable";
import ProductCard from "@/components/ProductCard";
import WishlistButton from "@/components/WishlistButton";
import QuantityAndCart from "@/components/QuantityAndCart";

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
  const category = detectCategory(product.name);
  const Icon = category.icon;

  let related: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    const all = await getProducts();
    related = all
      .filter((p) => p.id !== product.id && detectCategory(p.name).id === category.id)
      .slice(0, 4);
  } catch {
    related = [];
  }

  return (
    <div className="mx-auto max-w-3xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <nav className="flex items-center gap-1.5 text-xs text-muted mb-6 fade-up">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-accent transition-colors">
          Products
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink font-medium truncate max-w-[160px]">
          {product.name}
        </span>
      </nav>

      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors mb-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm fade-up"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to catalog
      </Link>

      <div
        className="rounded-2xl bg-surface border border-line overflow-hidden fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className={`relative aspect-[16/9] overflow-hidden ${category.tile}`}>
          <Image
            src={getProductImage(product)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${category.badgeBg} backdrop-blur px-3 py-1.5 text-xs font-semibold ${category.badgeText} shadow-sm`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {category.label}
            </span>
            <WishlistButton productId={product.id} />
          </div>
        </div>

        <div className="px-6 sm:px-8 pt-6 pb-2">
          <span className="text-[11px] font-medium text-muted uppercase tracking-wide">
            Obj·{product.id}
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1">
            {product.name}
          </h1>
          {price !== null && (
            <span className="inline-block font-display font-bold text-lg text-accent-ink bg-accent-soft rounded-full px-4 py-1.5 mt-4">
              {formatPrice(price)}
            </span>
          )}

          <div className="mt-6">
            <QuantityAndCart />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-line">
            <div className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 text-accent shrink-0" strokeWidth={1.75} />
              <p className="text-xs text-muted">Free shipping over $50</p>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="h-4 w-4 text-accent shrink-0" strokeWidth={1.75} />
              <p className="text-xs text-muted">30-day easy returns</p>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" strokeWidth={1.75} />
              <p className="text-xs text-muted">Secure checkout</p>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 mt-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
            Spec sheet
          </h2>
          {product.data ? (
            <SpecTable data={product.data} />
          ) : (
            <p className="text-sm text-muted italic">
              No spec data on file for this item.
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14 fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display font-bold text-lg text-ink">
              More {category.label.toLowerCase()}
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium text-muted hover:text-accent transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}