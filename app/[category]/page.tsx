import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, productsInCategory, subcategoriesOf } from "@/data/catalog";
import { faqsForCategory } from "@/data/faqs-generated";
import { faqJsonLd } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { RelatedGuides } from "@/components/RelatedGuides";
import { parseListingSearch } from "@/lib/listing-search";
import {
  categorySeoDescription,
  categorySeoTitle,
} from "@/data/category-meta";
import { breadcrumbListJsonLd, SITE_URL } from "@/lib/seo";

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
  const all = productsInCategory(category.slug);
  const title = categorySeoTitle(slug, category.label);
  const description = categorySeoDescription(slug, category.label, all.length);
  const canonical = `${SITE_URL}/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
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
  const pageUrl = `${SITE_URL}/${cat.slug}`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.label,
    url: pageUrl,
    numberOfItems: all.length,
    itemListElement: all.slice(0, 20).map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/proionta/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={itemListSchema} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: cat.label, item: pageUrl },
        ])}
      />
      <CategoryPageClient category={cat} all={all} subs={subs} search={search} />
      <RelatedGuides categorySlug={cat.slug} />
    </>
  );
}
