import {
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Tv,
  Camera,
  Gamepad2,
  Package,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "./types";

export type CategoryId =
  | "laptops"
  | "tablets"
  | "phones"
  | "wearables"
  | "audio"
  | "tvs"
  | "cameras"
  | "gaming"
  | "other";

interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  match: RegExp;
  /** Fallback search tags, used only if a product's own name yields no usable keywords. */
  keywords: string[];
  /** Representative photo for category tiles (e.g. "Shop by category") — not per-product. */
  image: string;
  tile: string;
  badgeBg: string;
  badgeText: string;
  chipActive: string;
}

// Order matters: more specific categories are checked before broader ones
// that could also match (e.g. "Galaxy Tab" should hit tablets before phones).
export const CATEGORIES: CategoryConfig[] = [
  {
    id: "laptops",
    label: "Laptops",
    icon: Laptop,
    match: /laptop|macbook|notebook|chromebook|surface book/i,
    keywords: ["laptop", "computer"],
    image: "https://loremflickr.com/640/480/laptop,computer/all?lock=101",
    tile: "bg-[#E4EDF6]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#2F5B82]",
    chipActive: "bg-[#2F5B82] text-white",
  },
  {
    id: "tablets",
    label: "Tablets",
    icon: Tablet,
    match: /tablet|ipad|surface pro|galaxy tab/i,
    keywords: ["tablet", "ipad"],
    image: "https://loremflickr.com/640/480/tablet,ipad/all?lock=107",
    tile: "bg-[#E8ECFA]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#3D4F8A]",
    chipActive: "bg-[#3D4F8A] text-white",
  },
  {
    id: "phones",
    label: "Phones",
    icon: Smartphone,
    match: /phone|galaxy|iphone|pixel/i,
    keywords: ["smartphone", "mobile"],
    image: "/phones.png",
    tile: "bg-[#F7E9E1]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#8A4426]",
    chipActive: "bg-[#8A4426] text-white",
  },
  {
    id: "wearables",
    label: "Wearables",
    icon: Watch,
    match: /watch|band|fitbit/i,
    keywords: ["smartwatch", "watch"],
    image: "https://loremflickr.com/640/480/smartwatch,watch/all?lock=103",
    tile: "bg-[#E6EFDD]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#3F6B27]",
    chipActive: "bg-[#3F6B27] text-white",
  },
  {
    id: "audio",
    label: "Audio",
    icon: Headphones,
    match: /headphone|earbud|airpod|speaker|soundbar/i,
    keywords: ["headphones", "audio"],
    image: "https://loremflickr.com/640/480/headphones,audio/all?lock=104",
    tile: "bg-[#EBE7F6]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#5B4E96]",
    chipActive: "bg-[#5B4E96] text-white",
  },
  {
    id: "tvs",
    label: "TVs",
    icon: Tv,
    match: /\btv\b|television|oled|qled/i,
    keywords: ["television", "tv"],
    image: "https://loremflickr.com/640/480/television,tv/all?lock=105",
    tile: "bg-[#F6EEDD]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#8A6417]",
    chipActive: "bg-[#8A6417] text-white",
  },
  {
    id: "cameras",
    label: "Cameras",
    icon: Camera,
    match: /camera|gopro|dslr|mirrorless/i,
    keywords: ["camera", "photography"],
    image: "https://loremflickr.com/640/480/camera,photography/all?lock=108",
    tile: "bg-[#F1E7DD]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#7A5233]",
    chipActive: "bg-[#7A5233] text-white",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    match: /playstation|xbox|nintendo|switch|gaming console|controller/i,
    keywords: ["gaming", "console"],
    image: "https://loremflickr.com/640/480/gaming,console/all?lock=109",
    tile: "bg-[#E3ECEC]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#2E5C5C]",
    chipActive: "bg-[#2E5C5C] text-white",
  },
  {
    id: "other",
    label: "Other",
    icon: Package,
    match: /.^/, // never matches directly; used as fallback only
    keywords: ["product", "technology"],
    image: "/other.png",
    tile: "bg-[#EDEBE5]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#5C5A52]",
    chipActive: "bg-[#5C5A52] text-white",
  },
];

const OTHER = CATEGORIES[CATEGORIES.length - 1];

export function detectCategory(name: string): CategoryConfig {
  for (const category of CATEGORIES) {
    if (category.id !== "other" && category.match.test(name)) return category;
  }
  return OTHER;
}

export function categoriesPresent(products: Product[]): CategoryConfig[] {
  const present = new Set<CategoryId>();
  for (const p of products) present.add(detectCategory(p.name).id);
  return CATEGORIES.filter((c) => present.has(c.id));
}

const STOPWORDS = new Set([
  "the", "with", "and", "for", "in", "of", "a", "an", "new",
]);

/** Pulls 1-2 meaningful words out of a product's own name to use as image search tags. */
function nameKeywords(name: string): string[] {
  return name
    .split(/[\s/,-]+/)
    .map((w) => w.replace(/[^a-zA-Z]/g, ""))
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w.toLowerCase()))
    .slice(0, 2);
}

/** Stable numeric seed derived from a product id, so its image doesn't shuffle on re-fetch. */
function stableLock(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash % 1000;
}

/**
 * Per-product image: tagged with the product's own name where possible, and
 * seeded by its id so two different products (even in the same category)
 * don't end up showing the identical photo.
 */
export function getProductImage(product: Product): string {
  const category = detectCategory(product.name);
  const own = nameKeywords(product.name);
  const tags = own.length > 0 ? own : category.keywords;
  const lock = stableLock(product.id);
  return `https://loremflickr.com/640/480/${tags
    .map(encodeURIComponent)
    .join(",")}/all?lock=${lock}`;
}