import type { Brand, Category, Product } from "@/data/catalog-types";

/** Rules that decide which programmatic pages are worth Google's attention. */

export function productWordCount(p: Product): number {
  return `${p.description ?? ""} ${p.shortDescription ?? ""}`.split(/\s+/).filter(Boolean).length;
}

/** Out-of-stock products with nothing to say (no price or no copy) stay crawlable but noindexed. */
export function isProductIndexable(p: Product): boolean {
  if (p.inStock) return true;
  const hasPrice = p.price != null || p.minPrice != null;
  return hasPrice && productWordCount(p) >= 20;
}

export function isBrandIndexable(b: Brand): boolean {
  return b.count >= 3;
}

export function isCategoryIndexable(c: Category): boolean {
  return c.count >= 3;
}

export const NOINDEX_FOLLOW = { index: false, follow: true } as const;
