import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { extractPrice, formatPrice } from "@/lib/api";
import { detectCategory, getProductImage } from "@/lib/category";
import ProductImage from "./ProductImage";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const price = extractPrice(product);
  const category = detectCategory(product.name);
  const Icon = category.icon;
  const specPreview = product.data
    ? Object.entries(product.data).find(([key]) => !/price/i.test(key))
    : undefined;

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="group relative block rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-16px_rgba(23,24,28,0.22)] hover:border-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${category.tile}`}>
        <ProductImage
          src={getProductImage(product)}
          alt={product.name}
          className="group-hover:scale-110"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${category.badgeBg} backdrop-blur px-2.5 py-1 text-[11px] font-medium ${category.badgeText} shadow-sm`}
          >
            <Icon className="h-3 w-3" strokeWidth={2} />
            {category.label}
          </span>
          <WishlistButton productId={product.id} />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-accent origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </div>

      <div className="p-4">
        <h2 className="font-display font-bold text-[15px] leading-snug text-ink line-clamp-1 transition-colors duration-300 group-hover:text-accent">
          {product.name}
        </h2>
        {specPreview ? (
          <p className="text-xs text-muted mt-1 line-clamp-1">
            {String(specPreview[1])}
          </p>
        ) : (
          <p className="text-xs text-muted/70 mt-1 italic">No specs listed</p>
        )}

        <div className="flex items-center justify-between mt-3">
          {price !== null ? (
            <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 font-display font-bold text-sm text-accent-ink">
              {formatPrice(price)}
            </span>
          ) : (
            <span className="text-xs text-muted/60">Price n/a</span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-accent">
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}