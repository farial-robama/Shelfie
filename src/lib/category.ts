import {
  Laptop,
  Smartphone,
  Watch,
  Tv,
  Headphones,
  Package,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "./types";

export type CategoryId =
  | "laptops"
  | "phones"
  | "wearables"
  | "audio"
  | "tvs"
  | "other";

interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  match: RegExp;
  /** Representative stock photo for the category — the API has no per-product images. */
  image: string;
  tile: string;
  badgeBg: string;
  badgeText: string;
  chipActive: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "laptops",
    label: "Laptops",
    icon: Laptop,
    match: /laptop|macbook|notebook|chromebook/i,
    image: "https://loremflickr.com/640/480/laptop,computer/all?lock=101",
    tile: "bg-[#E4EDF6]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#2F5B82]",
    chipActive: "bg-[#2F5B82] text-white",
  },
  {
    id: "phones",
    label: "Phones",
    icon: Smartphone,
    match: /phone|galaxy|iphone|pixel/i,
    image: "https://loremflickr.com/640/480/smartphone,mobile/all?lock=102",
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
    image: "https://loremflickr.com/640/480/television,tv/all?lock=105",
    tile: "bg-[#F6EEDD]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#8A6417]",
    chipActive: "bg-[#8A6417] text-white",
  },
  {
    id: "other",
    label: "Other",
    icon: Package,
    match: /.^/, // never matches directly; used as fallback only
    image: "https://loremflickr.com/640/480/package,box/all?lock=106",
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