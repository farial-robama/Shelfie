import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getProduct, extractPrice, formatPrice } from "@/lib/api";
import { detectCategory } from "@/lib/category";
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
  const category = detectCategory(product.name);
  const Icon = category.icon;

  return (
    <div className="mx-auto max-w-3xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors mb-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to catalog
      </Link>

      <div className="rounded-2xl bg-surface border border-line overflow-hidden">
        <div className={`relative aspect-[16/9] overflow-hidden ${category.tile}`}>
          <Image
            src={category.image}
            alt={`${category.label} category photo`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
          <span
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full ${category.badgeBg} backdrop-blur px-3 py-1.5 text-xs font-semibold ${category.badgeText} shadow-sm`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            {category.label}
          </span>
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
        </div>

        <div className="px-6 sm:px-8 py-6">
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
    </div>
  );
}