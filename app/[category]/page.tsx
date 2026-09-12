import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  applyFilters,
  brandsInProducts,
  categories,
  categoryBySlug,
  categoryUrl,
  paginate,
  productsInCategory,
  subcategoriesOf,
  toCard,
} from "@/data/catalog";
import { categoryDescription, faqsForCategory } from "@/data/faqs-generated";
import { categoryH1, categorySeoDescription, categorySeoTitle } from "@/data/category-meta";
import { FaqSection, faqJsonLd } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ListingShell } from "@/components/listing/ListingShell";
import { RelatedGuides } from "@/components/RelatedGuides";
import { parseListingSearch } from "@/lib/listing-search";
import { isCategoryIndexable, NOINDEX_FOLLOW } from "@/lib/indexing";
import { breadcrumbListJsonLd, OG_IMAGE, OG_IMAGE_META, SITE_URL } from "@/lib/seo";

type Params = Promise<{ category: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;

export const dynamicParams = true;

export async function generateStaticParams() {
  return categories.filter((c) => c.depth === 0).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category || category.depth !== 0) return {};
  const search = parseListingSearch(await searchParams);
  const all = productsInCategory(category.slug);
  const baseTitle = categorySeoTitle(slug, category.label);
  const paged = search.page > 1;
  const title = paged ? `${baseTitle} · Σελίδα ${search.page}` : baseTitle;
  const description = categorySeoDescription(slug, category.label, all.length);
  const canonical = paged ? `${SITE_URL}/${slug}?page=${search.page}` : `${SITE_URL}/${slug}`;
  const noindex = paged || !isCategoryIndexable(category);
  return {
    title,
    description,
    openGraph: { title, description, url: canonical, images: [OG_IMAGE_META] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical },
    robots: noindex ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { category: slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat || cat.depth !== 0) notFound();

  const all = productsInCategory(cat.slug);
  const search = parseListingSearch(await searchParams);
  const filtered = applyFilters(all, {
    brand: search.brand,
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });
  const { items, page, totalPages } = paginate(filtered, search.page);
  const facets = brandsInProducts(all).slice(0, 12);
  const subs = subcategoriesOf(cat.slug);
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
      {page === 1 && <JsonLd data={faqJsonLd(faqs)} />}
      {page === 1 && <JsonLd data={itemListSchema} />}
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: cat.label, item: pageUrl },
        ])}
      />
      <ListingShell
        h1={categoryH1(cat.slug, cat.label)}
        intro={categoryDescription(cat.slug)}
        breadcrumbs={[{ label: "Αρχική", href: "/" }, { label: cat.label }]}
        chips={subs.map((s) => ({ label: s.label, href: categoryUrl(s), count: s.count }))}
        basePath={`/${cat.slug}`}
        search={search}
        facets={facets}
        showBrandFacet
        cards={items.map(toCard)}
        total={filtered.length}
        inStockCount={filtered.filter((p) => p.inStock).length}
        page={page}
        totalPages={totalPages}
      >
        <FaqSection faqs={faqs} />
        <RelatedGuides categorySlug={cat.slug} />
      </ListingShell>
    </>
  );
}
