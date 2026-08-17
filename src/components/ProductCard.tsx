import Link from "next/link";
import type { Product } from "@/lib/types";
import { extractPrice, formatPrice, formatSpecLabel } from "@/lib/api";

function paddedId(id: string): string {
  const numeric = id.replace(/\D/g, "");
  if (numeric.length > 0 && numeric.length <= 4) {
    return numeric.padStart(3, "0");
  }
  return id;
}

export default function ProductCard({ product }: { product: Product }) {
  const price = extractPrice(product);
  const specEntries = product.data
    ? Object.entries(product.data).filter(([key]) => !/price/i.test(key))
    : [];

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="group relative block rounded-xl bg-surface border border-line shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent/50 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent overflow-hidden"
    >
      {/* Punched hole */}
      <span
        aria-hidden
        className="absolute top-4 right-4 h-3 w-3 rounded-full bg-paper tag-hole"
      />

      <div className="px-5 pt-5 pb-4">
        <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
          Obj·{paddedId(product.id)}
        </span>
        <h2 className="font-display font-bold text-lg leading-snug text-ink mt-1.5 pr-6 line-clamp-2">
          {product.name}
        </h2>
      </div>

      {/* Perforated tear line */}
      <div className="tag-perforation h-px w-full border-t border-dashed border-line" />

      <div className="px-5 py-4 min-h-[3.75rem]">
        {specEntries.length > 0 ? (
          <ul className="font-mono text-xs text-muted space-y-1">
            {specEntries.slice(0, 2).map(([key, value]) => (
              <li key={key} className="flex gap-1.5 truncate">
                <span className="text-muted/70">{formatSpecLabel(key)}:</span>
                <span className="text-ink/80 truncate">{String(value)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-xs text-muted/70 italic">
            No spec data on file
          </p>
        )}
      </div>

      <div className="px-5 pb-5 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted group-hover:text-accent transition-colors">
          View details →
        </span>
        {price !== null ? (
          <span className="font-display font-bold text-sm text-accent-ink bg-accent/15 rounded-full px-3 py-1">
            {formatPrice(price)}
          </span>
        ) : (
          <span className="font-mono text-[11px] text-muted/60">—</span>
        )}
      </div>
    </Link>
  );
}
