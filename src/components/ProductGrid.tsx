"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { extractPrice } from "@/lib/api";
import {
  detectCategory,
  categoriesPresent,
  type CategoryId,
} from "@/lib/category";
import ProductCard from "./ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Featured order",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "name-asc": "Name: A to Z",
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">(
    "all",
  );
  const [sort, setSort] = useState<SortOption>("default");

  const categories = useMemo(() => categoriesPresent(products), [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = products.filter((p) => {
      if (
        activeCategory !== "all" &&
        detectCategory(p.name).id !== activeCategory
      ) {
        return false;
      }
      if (!q) return true;
      if (p.name.toLowerCase().includes(q)) return true;
      if (!p.data) return false;
      return Object.entries(p.data).some(([key, value]) =>
        `${key} ${value}`.toLowerCase().includes(q),
      );
    });

    if (sort === "price-asc" || sort === "price-desc") {
      list = [...list].sort((a, b) => {
        const pa = extractPrice(a);
        const pb = extractPrice(b);
        if (pa === null && pb === null) return 0;
        if (pa === null) return 1;
        if (pb === null) return -1;
        return sort === "price-asc" ? pa - pb : pb - pa;
      });
    } else if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, query, activeCategory, sort]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            activeCategory === "all"
              ? "bg-ink text-paper border-ink"
              : "bg-surface text-muted border-line hover:border-ink/30"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              activeCategory === c.id
                ? `${c.chipActive} border-transparent`
                : "bg-surface text-muted border-line hover:border-ink/30"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <label htmlFor="Shelfie-search" className="sr-only">
          Search the Shelfie
        </label>
        <input
          id="Shelfie-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or spec — “i9”, “red”, “TV”…"
          className="w-full sm:max-w-sm rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />

        <label htmlFor="Shelfie-sort" className="sr-only">
          Sort the Shelfie
        </label>
        <select
          id="Shelfie-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:ml-auto"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <span className="font-mono text-xs text-muted whitespace-nowrap">
          {filtered.length} of {products.length} items
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface/50 px-6 py-16 text-center">
          <p className="font-display font-bold text-ink">
            No items match your filters
          </p>
          <p className="text-xs text-muted mt-1">
            Try a different search term or category.
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
