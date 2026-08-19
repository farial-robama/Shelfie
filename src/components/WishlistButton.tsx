"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "shelfie:wishlist";

function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function WishlistButton({
  productId,
}: {
  productId: string;
}) {
  const [saved, setSaved] = useState(() =>
    typeof window !== "undefined"
      ? readWishlist().includes(productId)
      : false
  );

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const current = readWishlist();

    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next.includes(productId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 hover:scale-110 active:scale-95 ${
        saved
          ? "bg-accent text-white"
          : "bg-white/90 text-ink hover:text-accent"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-transform duration-300 ${
          saved ? "scale-110" : ""
        }`}
        strokeWidth={2}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}