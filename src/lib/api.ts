import type { Product } from "./types";

const API_BASE = "https://api.restful-api.dev";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/objects`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new ApiError("Couldn't load the Shelfie right now.", res.status);
  }

  const data = (await res.json()) as Product[];
  return data;
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `${API_BASE}/objects/${encodeURIComponent(id)}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new ApiError(
      "Couldn't load this item right now.",
      res.status,
    );
  }

  return (await res.json()) as Product;
}

export function extractPrice(product: Product): number | null {
  if (!product.data) {
    return null;
  }

  for (const [key, value] of Object.entries(product.data)) {
    if (!/price/i.test(key)) {
      continue;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const cleaned = value.replace(/[$,\s]/g, "");
      const price = Number(cleaned);

      if (Number.isFinite(price)) {
        return price;
      }
    }
  }

  return null;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatSpecLabel(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  return spaced
    .split(" ")
    .map((word) =>
      word.length <= 3 && word === word.toUpperCase()
        ? word
        : word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase(),
    )
    .join(" ");
}