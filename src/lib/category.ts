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
    match: /laptop|macbook|notebook|chromebook|surface book/i,
    image: "/images/laptops.png",
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
    image: "/images/tablets.png",
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
    image: "/images/phones/default-phone.png",
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
    image: "/images/wearables.png",
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
    image: "/images/audio.png",
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
    image: "/images/tv.png",
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
    image: "/images/cameras.png",
    tile: "bg-[#F1E7DD]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#7A5233]",
    chipActive: "bg-[#7A5233] text-white",
  },

  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    match:
      /playstation|xbox|nintendo|switch|gaming console|controller/i,
    image: "/images/gaming.png",
    tile: "bg-[#E3ECEC]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#2E5C5C]",
    chipActive: "bg-[#2E5C5C] text-white",
  },

  {
    id: "other",
    label: "Other",
    icon: Package,
    match: /.^/,
    image: "/images/other.png",
    tile: "bg-[#EDEBE5]",
    badgeBg: "bg-white/90",
    badgeText: "text-[#5C5A52]",
    chipActive: "bg-[#5C5A52] text-white",
  },
];

const OTHER = CATEGORIES[CATEGORIES.length - 1];


export function detectCategory(name: string): CategoryConfig {
  for (const category of CATEGORIES) {
    if (category.id !== "other" && category.match.test(name)) {
      return category;
    }
  }

  return OTHER;
}


export function categoriesPresent(
  products: Product[]
): CategoryConfig[] {
  const present = new Set<CategoryId>();

  for (const product of products) {
    present.add(detectCategory(product.name).id);
  }

  return CATEGORIES.filter((category) =>
    present.has(category.id)
  );
}


function apiImage(product: Product): string | null {
  if (!product.data) {
    return null;
  }

  for (const [key, value] of Object.entries(product.data)) {
    if (
      /image|photo|picture|thumbnail|\bimg\b/i.test(key) &&
      typeof value === "string" &&
      /^https?:\/\//i.test(value)
    ) {
      return value;
    }
  }

  return null;
}


function getPhoneImage(productName: string): string {
  const name = productName.toLowerCase();

  if (name.includes("pixel 6 pro")) {
    return "/images/phones/pixel-6-pro.png";
  }

  if (name.includes("pixel")) {
    return "/images/phones/google-pixel.png";
  }

  if (name.includes("iphone 12 pro max")) {
    return "/images/phones/iphone-12-pro-max.png";
  }

  if (name.includes("iphone 12 mini")) {
    return "/images/phones/iphone-12-mini.png";
  }

  if (name.includes("iphone 11")) {
    return "/images/phones/iphone-11.png";
  }

  if (name.includes("iphone 12")) {
    return "/images/phones/iphone-12.png";
  }

  if (name.includes("iphone 13")) {
    return "/images/phones/iphone-13.png";
  }

  if (name.includes("iphone 14")) {
    return "/images/phones/iphone-14.png";
  }

  if (name.includes("galaxy z fold")) {
    return "/images/phones/galaxy-z-fold2.png";
  }

  if (name.includes("galaxy s")) {
    return "/images/phones/samsung-galaxy.png";
  }

  if (name.includes("galaxy")) {
    return "/images/phones/samsung-galaxy.png";
  }

  return "/images/phones/default-phone.png";
}


export function getProductImage(product: Product): string {
  
  const apiImageUrl = apiImage(product);

  if (apiImageUrl) {
    return apiImageUrl;
  }

  const category = detectCategory(product.name);

  if (category.id === "phones") {
    return getPhoneImage(product.name);
  }

 
  return category.image;
}