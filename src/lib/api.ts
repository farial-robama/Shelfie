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

/** Fetches the full Shelfie. Revalidated periodically since the data is shared/public. */
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

/** Fetches a single product by id. Returns null on a 404 so pages can render notFound(). */
export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/objects/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new ApiError("Couldn't load this item right now.", res.status);
  }

  return (await res.json()) as Product;
}

/** Finds the most price-like field in a product's freeform data bag, if any. */
export function extractPrice(product: Product): number | null {
  if (!product.data) return null;
  for (const [key, value] of Object.entries(product.data)) {
    if (/price/i.test(key) && typeof value === "number") {
      return value;
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

/** Turns a data key like "Hard disk size" or "cpu_model" into a tidy label. */
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
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
}
