import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { extractPrice, formatPrice } from "@/lib/api";
import { detectCategory, getProductImage } from "@/lib/category";
import SafeImage from "./SafeImage";

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
      className="group block rounded-2xl bg-surface border border-line overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(23,24,28,0.18)] hover:border-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${category.tile}`}>
        <SafeImage
          src={getProductImage(product)}
          fallbackSrc={category.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full ${category.badgeBg} backdrop-blur px-2.5 py-1 text-[11px] font-medium ${category.badgeText} shadow-sm`}
        >
          <Icon className="h-3 w-3" strokeWidth={2} />
          {category.label}
        </span>
      </div>

      <div className="p-4">
        <h2 className="font-display font-bold text-[15px] leading-snug text-ink line-clamp-1">
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
            <span className="font-display font-bold text-sm text-ink">
              {formatPrice(price)}
            </span>
          ) : (
            <span className="text-xs text-muted/60">Price n/a</span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-muted group-hover:text-accent transition-colors">
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}