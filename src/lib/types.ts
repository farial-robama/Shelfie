
export type ProductData = Record<string, string | number | boolean | null>;

export interface Product {
  id: string;
  name: string;
  data?: ProductData | null;
}
