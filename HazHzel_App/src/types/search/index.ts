export interface SearchProductResult {
  _id: string;
  name: string;
  slug: string;
  price?: number;
  supplier?: string;
  images: { public_id: string; secure_url: string }[];
}

export interface SearchCollectionResult {
  _id: string;
  name: string;
  slug: string;
}
export const PRODUCT_LIMIT = 4;
