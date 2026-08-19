"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  fallbackSrc: string;
};

export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...rest
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}