"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SafeImage from "./SafeImage";

const PLACEHOLDER_IMAGE = "/placeholder.png";

type Category = {
  id: string;
  label: string;
  image: string;
  tile: string;
  badgeBg: string;
  badgeText: string;
};

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {categories.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
        >
          <motion.div
            animate={{ rotate: [0, -1.5, 1.5, -1, 0], y: [0, -3, 0, -2, 0] }}
            transition={{
              duration: 5 + (i % 4) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 0.25,
            }}
          >
            <Link
              href="/products"
              className={`group relative block aspect-square rounded-2xl overflow-hidden ${c.tile} border border-line hover:border-ink/20 transition-colors duration-300`}
            >
              <SafeImage
                src={c.image}
                fallbackSrc={PLACEHOLDER_IMAGE}
                alt={`${c.label} category photo`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface/85 backdrop-blur text-accent shadow-sm opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3 w-3" strokeWidth={2} />
              </motion.span>

              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/30 transition-all duration-300" />

              <span
                className={`absolute bottom-2 left-2 right-2 rounded-full ${c.badgeBg} backdrop-blur px-2.5 py-1 text-[11px] font-medium ${c.badgeText} text-center truncate`}
              >
                {c.label}
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}