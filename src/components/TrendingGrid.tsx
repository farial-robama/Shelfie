"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { extractPrice, formatPrice } from "@/lib/api";
import { detectCategory, getProductImage } from "@/lib/category";
import SafeImage from "./SafeImage";

const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function TrendingGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p, i) => {
        const category = detectCategory(p.name);
        const price = extractPrice(p);
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.05 }}
          >
            <Link
              href={`/product/${encodeURIComponent(p.id)}`}
              className="group relative block rounded-2xl border border-line bg-surface overflow-hidden hover:border-ink/20 hover:shadow-lg hover:shadow-ink/5 transition-all duration-300 hover:-translate-y-1"
            >
             
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/25 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 6) * 0.3,
                }}
              />

              <div
                className={`relative aspect-square overflow-hidden ${category.tile}`}
              >
                <SafeImage
                  src={getProductImage(p)}
                  fallbackSrc={PLACEHOLDER_IMAGE}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  initial={{ x: "-150%" }}
                  animate={{ x: "350%" }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeInOut",
                    delay: (i % 6) * 0.4,
                  }}
                />

                <span className="absolute top-2.5 left-2.5 rounded-full bg-surface/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.label}
                </span>

                <motion.span
                  aria-hidden
                  className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface/85 backdrop-blur text-accent shadow-sm"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 5) * 0.25,
                  }}
                >
                  <Sparkles className="h-3 w-3" strokeWidth={2} />
                </motion.span>
              </div>

              <div className="p-3.5">
                <p className="text-sm font-medium text-ink line-clamp-1 group-hover:text-accent-ink transition-colors">
                  {p.name}
                </p>
                {price !== null && (
                  <p className="text-sm font-semibold text-accent-ink mt-1">
                    {formatPrice(price)}
                  </p>
                )}
              </div>

              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/25 transition-all duration-300" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}