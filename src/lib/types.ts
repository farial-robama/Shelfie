/**
 * The restful-api.dev "objects" endpoint returns a flexible schema:
 * every item has an id + name, and an optional freeform `data` bag
 * whose keys differ from product to product (price, color, capacity, ...).
 */
export type ProductData = Record<string, string | number | boolean | null>;

export interface Product {
  id: string;
  name: string;
  data?: ProductData | null;
}
