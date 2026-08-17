"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      if (!p.data) return false;
      return Object.entries(p.data).some(([key, value]) =>
        `${key} ${value}`.toLowerCase().includes(q),
      );
    });
  }, [products, query]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <label htmlFor="catalog-search" className="sr-only">
          Search the catalog
        </label>
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or spec — “i9”, “red”, “TV”…"
          className="w-full sm:max-w-sm rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <span className="font-mono text-xs text-muted">
          {filtered.length} of {products.length} items
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
          <p className="font-display font-bold text-ink">No items match “{query}”</p>
          <p className="font-mono text-xs text-muted mt-1">
            Try a different name or spec keyword.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((product, i) => (
            <motion.li
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03 }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
