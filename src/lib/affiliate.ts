import type { Product } from "@/data/catalog";

const STORE_BASE = "https://vapeandmore.gr";
const UTM = "utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=catalog";

/** Build the external "Buy now" link to the original product on vapeandmore.gr. */
export function productAffiliateUrl(product: Pick<Product, "id" | "wpSlug" | "slug">): string {
  return `${STORE_BASE}/?p=${encodeURIComponent(product.id)}&${UTM}`;
}

/** Canonical URL pointing to the original product page on vapeandmore.gr.
 *  Used in <link rel="canonical"> to prevent duplicate-content cannibalization. */
export function productCanonicalUrl(product: Pick<Product, "id" | "wpSlug" | "slug">): string {
  return `${STORE_BASE}/?p=${encodeURIComponent(product.id)}`;
}

export const STORE_NAME = "Vape and More";
export const STORE_LOCATION = "Ρέθυμνο · Πανελλαδική αποστολή";
