import type { CategoryNode, Product } from "@/data/catalog";

export const SITE_URL = "https://ilektronikatsigara.gr";
export const CATALOG_LASTMOD = "2026-08-04";

/** Build absolute breadcrumb URL for a category path node. */
export function categoryPathUrl(path: CategoryNode[], index: number): string {
  if (index === 0) return `${SITE_URL}/${path[0].slug}`;
  if (index === 1) return `${SITE_URL}/${path[0].slug}/${path[1].slug}`;
  // Deeper than 2 levels: keep leaf under parent/child when possible
  return `${SITE_URL}/${path[0].slug}/${path[index].slug}`;
}

export function breadcrumbListJsonLd(
  crumbs: { name: string; item: string }[],
) {
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
  const crumbs: { name: string; item: string }[] = [
    { name: "Αρχική", item: `${SITE_URL}/` },
  ];
  path.forEach((node, i) => {
    crumbs.push({ name: node.label, item: categoryPathUrl(path, i) });
  });
  crumbs.push({
    name: productName,
    item: `${SITE_URL}/proionta/${productSlug}`,
  });
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

/** Effective SEO title for a product (uses stored or generated). */
export function productSeoTitle(product: Product): string {
  if (product.seoTitle?.trim()) {
    return product.seoTitle.replace(/\s* - \s*/g, " | ").trim();
  }
  const brand = product.brand ? `${product.brand} ` : "";
  return `${brand}${product.name} | Τιμή, Χαρακτηριστικά & Αγορά`.replace(/\s+/g, " ").trim();
}

/** Effective SEO description for a product (uses stored or generated). */
export function productSeoDescription(product: Product): string {
  if (product.seoDescription?.trim()) {
    return product.seoDescription.replace(/\s* - \s*/g, " | ").trim().slice(0, 160);
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
  const cat =
    product.primaryCategoryPath.map((n) => n.label).join(" › ") || "vape";
  const attrs = attrSnippet(product);
  const stock = product.inStock
    ? "Είναι άμεσα διαθέσιμο για παραφορία μέσω courier σε όλη την Ελλάδα."
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
