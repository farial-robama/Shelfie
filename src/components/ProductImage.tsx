"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80";

export default function ProductImage({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const validSrc = src && src.trim() !== "" ? src : FALLBACK_IMAGE;

  return (
    <>
      <div
        className={`absolute inset-0 bg-line/60 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
        aria-hidden="true"
      />
      <Image
        src={validSrc}
        alt={alt || "Product image"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        } ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}