import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, productsInCategory, subcategoriesOf } from "@/data/catalog";
import { SubcategoryPageClient } from "@/components/SubcategoryPageClient";
import { parseListingSearch } from "@/lib/listing-search";
import { JsonLd } from "@/components/JsonLd";
import { faqsForCategory } from "@/data/faqs-generated";
import { faqJsonLd } from "@/components/FaqSection";
import {
  categoryH1,
  categorySeoDescription,
  categorySeoTitle,
} from "@/data/category-meta";
import { RelatedGuides } from "@/components/RelatedGuides";
import { breadcrumbListJsonLd, SITE_URL } from "@/lib/seo";

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
  const custom = categorySeoTitle(sub.slug, sub.label);
  const title = custom.includes(sub.label)
    ? custom
    : `${sub.label} | ${parent.label}`;
  const description = categorySeoDescription(sub.slug, sub.label, all.length);
  const canonical = `${SITE_URL}/${category}/${subcategory}`;
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
  const faqs = faqsForCategory(sub.slug);
  const pageUrl = `${SITE_URL}/${category}/${subcategory}`;
  const h1 = categoryH1(sub.slug, sub.label);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${sub.label} - ${parent.label}`,
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
      <JsonLd data={itemListSchema} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: parent.label, item: `${SITE_URL}/${parent.slug}` },
          { name: sub.label, item: pageUrl },
        ])}
      />
      <SubcategoryPageClient
        parent={parent}
        sub={sub}
        all={all}
        subs={subs}
        search={search}
        h1={h1}
      />
      <RelatedGuides categorySlug={parent.slug} />
    </>
  );
}
