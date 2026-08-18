import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { extractPrice, formatPrice } from "@/lib/api";
import { detectCategory } from "@/lib/category";

export default function FeaturedBanner({ product }: { product: Product }) {
  const price = extractPrice(product);
  const category = detectCategory(product.name);
  const Icon = category.icon;
  const specs = product.data
    ? Object.entries(product.data)
        .filter(([key]) => !/price/i.test(key))
        .slice(0, 3)
    : [];

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="group grid grid-cols-1 sm:grid-cols-2 rounded-2xl bg-surface border border-line overflow-hidden mb-8 transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(23,24,28,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className={`relative aspect-[4/3] sm:aspect-auto overflow-hidden ${category.tile}`}>
        <Image
          src={category.image}
          alt={`${category.label} category photo`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          priority
        />
      </div>

      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <span
          className={`inline-flex items-center gap-1.5 w-fit rounded-full ${category.badgeBg} px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${category.badgeText} mb-3`}
        >
          <Icon className="h-3 w-3" strokeWidth={2} />
          Top pick · {category.label}
        </span>

        <h2 className="font-display font-bold text-xl sm:text-2xl text-ink">
          {product.name}
        </h2>

        {specs.length > 0 && (
          <p className="text-sm text-muted mt-1.5">
            {specs.map(([, v]) => String(v)).join(" · ")}
          </p>
        )}

        <div className="flex items-center gap-4 mt-5">
          {price !== null && (
            <span className="font-display font-bold text-xl sm:text-2xl text-ink">
              {formatPrice(price)}
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-full bg-ink text-paper text-sm font-medium px-4 py-2 group-hover:bg-accent transition-colors">
            View details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}