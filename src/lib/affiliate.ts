const STORE_BASE = "https://vapeandmore.gr";
const UTM_BASE = "utm_source=ilektronikatsigara&utm_medium=referral";

/** Where on the page a shop link sits. Sent as utm_content and in the click event. */
export type LinkPlacement =
  | "card"
  | "pdp_buybox"
  | "pdp_variants"
  | "chat"
  | "blog_inline"
  | "blog_sidebar"
  | "blog_sidebar_product"
  | "home_trust"
  | "footer"
  | "footer_legal"
  | "legal_cta"
  | "about"
  | "merchant_block"
  | "category";

/** Direct link to the product on vapeandmore.gr (no ?p= redirect hop). */
export function productAffiliateUrl(
  product: { wpSlug: string; slug: string },
  placement: LinkPlacement = "card",
): string {
  const slug = encodeURIComponent(product.wpSlug || product.slug);
  return `${STORE_BASE}/product/${slug}/?${UTM_BASE}&utm_campaign=catalog&utm_content=${placement}`;
}

/** Link to the shop home (or a path on it) with attribution. */
export function storeUrl(placement: LinkPlacement, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${STORE_BASE}${clean}?${UTM_BASE}&utm_campaign=${placement}`;
}

/** Canonical URL of the product page on ilektronikatsigara.gr. */
export function productCanonicalUrl(product: { slug: string }): string {
  return `https://ilektronikatsigara.gr/proionta/${encodeURIComponent(product.slug)}`;
}

export const STORE_NAME = "Vape and More";
export const STORE_LOCATION = "Ρέθυμνο · Πανελλαδική αποστολή";
