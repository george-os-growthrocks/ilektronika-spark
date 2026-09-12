import type { CategoryNode, Product } from "@/data/catalog-types";
import { STORE_NAME } from "@/lib/affiliate";

export const SITE_URL = "https://ilektronikatsigara.gr";
export const SITE_NAME = "ilektronikatsigara.gr";
export const OG_IMAGE = "/og-image.jpg";
export const OG_IMAGE_META = { url: OG_IMAGE, width: 1200, height: 630 };

/** Build absolute breadcrumb URL for a category path node. */
export function categoryPathUrl(path: CategoryNode[], index: number): string {
  if (index === 0) return `${SITE_URL}/${path[0].slug}`;
  // Deeper than the top level: pages live under /top/leaf.
  return `${SITE_URL}/${path[0].slug}/${path[index].slug}`;
}

export function breadcrumbListJsonLd(crumbs: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

/** Build product BreadcrumbList items with correct nested category URLs. */
export function productBreadcrumbCrumbs(
  path: CategoryNode[],
  productName: string,
  productSlug: string,
): { name: string; item: string }[] {
  const crumbs: { name: string; item: string }[] = [{ name: "Αρχική", item: `${SITE_URL}/` }];
  path.forEach((node, i) => {
    crumbs.push({ name: node.label, item: categoryPathUrl(path, i) });
  });
  crumbs.push({ name: productName, item: `${SITE_URL}/proionta/${productSlug}` });
  return crumbs;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function attrSnippet(product: Product): string {
  const bits: string[] = [];
  for (const a of product.attributes.slice(0, 3)) {
    const vals = a.values.slice(0, 3).join(", ");
    if (vals) bits.push(`${a.name}: ${vals}`);
  }
  return bits.join(" · ");
}

/** "Brand Name" unless the name already carries the brand. */
export function productDisplayName(product: Product): string {
  const name = product.name.replace(/\s+/g, " ").trim();
  const brand = product.brand?.trim();
  if (!brand) return name;
  return name.toLowerCase().includes(brand.toLowerCase()) ? name : `${brand} ${name}`;
}

const TITLE_MAX = 62;

/**
 * Product title. No brand duplication, no site suffix (the domain shows in the
 * SERP breadcrumb), and the "| Τιμή & Αγορά" tail only when it fits.
 */
export function productSeoTitle(product: Product): string {
  if (product.seoTitle?.trim()) {
    return product.seoTitle.replace(/\s* - \s*/g, " | ").trim();
  }
  const base = productDisplayName(product);
  const withTail = `${base} | Τιμή & Αγορά`;
  return withTail.length <= TITLE_MAX ? withTail : base;
}

/** Effective SEO description for a product (uses stored or generated). */
export function productSeoDescription(product: Product): string {
  if (product.seoDescription?.trim()) {
    return product.seoDescription
      .replace(/\s* - \s*/g, " | ")
      .trim()
      .slice(0, 160);
  }
  const short = stripHtml(product.shortDescription || product.description || "");
  if (short.length >= 80) {
    return short.slice(0, 157).replace(/\s+\S*$/, "") + (short.length > 157 ? "…" : "");
  }
  const attrs = attrSnippet(product);
  const stock = product.inStock ? "Άμεσα διαθέσιμο" : "Έλεγχος διαθεσιμότητας";
  const brand = product.brand ? `${product.brand}. ` : "";
  const base = `${brand}${product.name}. ${stock} με άμεση αποστολή από Vape and More.`;
  const withAttrs = attrs ? `${base} ${attrs}.` : `${base}`;
  return withAttrs.slice(0, 160);
}

/** Longer unique body copy for thin PDPs (template enrichment). */
export function productBodyEnrichment(product: Product): string {
  const brand = product.brand ?? "premium";
  const cat = product.primaryCategoryPath.map((n) => n.label).join(" › ") || "vape";
  const attrs = attrSnippet(product);
  const stock = product.inStock
    ? "Είναι άμεσα διαθέσιμο για παραγγελία μέσω courier σε όλη την Ελλάδα."
    : "Ελέγξτε τη διαθεσιμότητα πριν την παραγγελία· το stock ανανεώνεται συχνά.";
  return [
    `Το ${product.name} ανήκει στην κατηγορία ${cat} και προέρχεται από τη μάρκα ${brand}.`,
    `Στο ilektronikatsigara.gr μπορείτε να δείτε χαρακτηριστικά, τιμή και να ολοκληρώσετε την αγορά μέσω του συνεργαζόμενου καταστήματος Vape and More (Ρέθυμνο).`,
    attrs ? `Βασικά χαρακτηριστικά: ${attrs}.` : "",
    stock,
    `Προϊόντα νικοτίνης μόνο για ενήλικες 18+. Αυθεντικά είδη από επίσημους διανομείς.`,
  ]
    .filter(Boolean)
    .join(" ");
}

// ---------- Offer schema (merchant listing eligibility) ----------

const FREE_SHIPPING_FROM = 30;

function shippingDetails(price: number | null) {
  const details: Record<string, unknown> = {
    "@type": "OfferShippingDetails",
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "GR" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
    },
  };
  if (price != null && price >= FREE_SHIPPING_FROM) {
    details.shippingRate = { "@type": "MonetaryAmount", value: 0, currency: "EUR" };
  }
  return details;
}

const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "GR",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 14,
  returnMethod: "https://schema.org/ReturnByMail",
};

function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

const SELLER = { "@type": "Organization", name: STORE_NAME, url: "https://vapeandmore.gr" };

/** Offer / AggregateOffer for a product, or undefined when no price is known. */
export function productOffersJsonLd(
  product: Product,
  url: string,
): Record<string, unknown> | undefined {
  const availability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";
  const single = product.salePrice ?? product.price;
  if (single != null) {
    return {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price: single.toFixed(2),
      priceValidUntil: priceValidUntil(),
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: SELLER,
      shippingDetails: shippingDetails(single),
      hasMerchantReturnPolicy: RETURN_POLICY,
    };
  }
  if (product.minPrice != null) {
    const high = product.maxPrice ?? product.minPrice;
    return {
      "@type": "AggregateOffer",
      url,
      priceCurrency: "EUR",
      lowPrice: product.minPrice.toFixed(2),
      highPrice: high.toFixed(2),
      offerCount: Math.max(
        1,
        product.attributes.reduce((n, a) => n + a.values.length, 0),
      ),
      availability,
      seller: SELLER,
      shippingDetails: shippingDetails(product.minPrice),
      hasMerchantReturnPolicy: RETURN_POLICY,
    };
  }
  return undefined;
}
