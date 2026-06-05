import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, productsInCategory, subcategoriesOf } from "@/data/catalog";
import { categoryDescription, faqsForCategory } from "@/data/faqs-generated";
import { faqJsonLd } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { parseListingSearch } from "@/lib/listing-search";

export const dynamicParams = true;

export async function generateStaticParams() {
  return categories.filter((c) => c.depth === 0).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category || category.depth !== 0) return {};
  const title = `${category.label} | Τιμές & Αγορά Online | ilektronikatsigara.gr`;
  const description = `Βρείτε αυθεντικά ${category.label.toLowerCase()} στο Vape and More. Δείτε τιμές, διαθεσιμότητα και αγοράστε online με άμεση αποστολή 1-3 ημέρες.`;
  const canonical = `https://ilektronikatsigara.gr/${slug}`;
  return {
    title,
    description: description.slice(0, 160),
    openGraph: { title, description: description.slice(0, 160), url: canonical },
    alternates: { canonical },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category: slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat || cat.depth !== 0) notFound();

  const all = productsInCategory(cat.slug);
  const subs = subcategoriesOf(cat.slug);
  const search = parseListingSearch(await searchParams);
  const faqs = faqsForCategory(cat.slug);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": cat.label,
    "url": `https://ilektronikatsigara.gr/${cat.slug}`,
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
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={itemListSchema} />
      <CategoryPageClient category={cat} all={all} subs={subs} search={search} />
    </>
  );
}
