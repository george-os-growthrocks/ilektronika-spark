/**
 * Client-safe catalog types and pure helpers.
 *
 * This module must never import the generated JSON data. Anything that needs
 * the product list belongs in `catalog.ts`, which is server-only.
 */

export interface CategoryNode {
  slug: string;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  wpSlug: string;
  name: string;
  sku: string;
  brand: string | null;
  brandSlug: string | null;
  type: "simple" | "variable";
  categoryPaths: CategoryNode[][];
  primaryCategoryPath: CategoryNode[];
  primaryTopSlug: string | null;
  primaryLeafSlug: string | null;
  images: string[];
  price: number | null;
  salePrice: number | null;
  /** Lowest variation price (variable products). Populated by the importer when available. */
  minPrice?: number | null;
  /** Highest variation price (variable products). */
  maxPrice?: number | null;
  /** ISO date of the last change in the source shop, when the export provides it. */
  updatedAt?: string | null;
  inStock: boolean;
  shortDescription: string;
  description: string;
  attributes: { name: string; values: string[] }[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Category {
  slug: string;
  label: string;
  parentSlug: string | null;
  depth: number;
  count: number;
  ancestors: CategoryNode[];
}

export interface Brand {
  slug: string;
  label: string;
  count: number;
}

/** The minimal shape a product card needs. Safe to send to client components. */
export interface CardProduct {
  id: string;
  slug: string;
  wpSlug: string;
  name: string;
  brand: string | null;
  brandSlug: string | null;
  image: string;
  price: number | null;
  salePrice: number | null;
  minPrice: number | null;
  inStock: boolean;
  /** Top-level category slug, used for "see alternatives" links. */
  categorySlug: string | null;
  categoryLabel: string | null;
}

export type PriceLike = {
  price: number | null;
  salePrice: number | null;
  minPrice?: number | null;
};

export function formatPrice(n: number | null | undefined): string {
  if (n == null) return "-";
  return `${n.toFixed(2).replace(".", ",")}€`;
}

export function effectivePrice(p: PriceLike): number | null {
  return p.salePrice ?? p.price ?? p.minPrice ?? null;
}

/** Human price label: "24,90€", "από 19,90€", or null when no price is known. */
export function priceLabel(p: PriceLike): { text: string; from: boolean } | null {
  if (p.salePrice != null) return { text: formatPrice(p.salePrice), from: false };
  if (p.price != null) return { text: formatPrice(p.price), from: false };
  if (p.minPrice != null) return { text: `από ${formatPrice(p.minPrice)}`, from: true };
  return null;
}

export function productImage(p: { images: string[] }, idx = 0): string {
  return p.images[idx] ?? "";
}
