import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, productsInCategory, subcategoriesOf } from "@/data/catalog";
import { SubcategoryPageClient } from "@/components/SubcategoryPageClient";
import { parseListingSearch } from "@/lib/listing-search";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = true;

export async function generateStaticParams() {
  return categories
    .filter((c) => c.depth === 1 && c.parentSlug)
    .map((c) => ({ category: c.parentSlug!, subcategory: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const parent = categoryBySlug(category);
  const sub = categoryBySlug(subcategory);
  if (!parent || !sub) return {};
  const all = productsInCategory(sub.slug);
  const title = `${sub.label} | ${parent.label} | ilektronikatsigara.gr`;
  const description = `Βρείτε ${sub.label.toLowerCase()} (${parent.label.toLowerCase()}) στο Vape and More. Δείτε ${all.length} αυθεντικά προϊόντα, τιμές, διαθεσιμότητα και αγοράστε online.`;
  const canonical = `https://ilektronikatsigara.gr/${category}/${subcategory}`;
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: canonical,
    },
    alternates: { canonical },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category, subcategory } = await params;
  const parent = categoryBySlug(category);
  const sub = categoryBySlug(subcategory);
  if (!parent || !sub) notFound();
  if (sub.parentSlug !== parent.slug && sub.ancestors.every((a) => a.slug !== parent.slug)) {
    notFound();
  }

  const all = productsInCategory(sub.slug);
  const subs = subcategoriesOf(sub.slug);
  const search = parseListingSearch(await searchParams);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${sub.label} - ${parent.label}`,
    "url": `https://ilektronikatsigara.gr/${category}/${subcategory}`,
    "numberOfItems": all.length,
    "itemListElement": all.slice(0, 20).map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://ilektronikatsigara.gr/proionta/${p.slug}`,
      "name": p.name
    }))
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <SubcategoryPageClient parent={parent} sub={sub} all={all} subs={subs} search={search} />
    </>
  );
}
