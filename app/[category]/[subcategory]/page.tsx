import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
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
import { ListingShell, type Crumb } from "@/components/listing/ListingShell";
import { RelatedGuides } from "@/components/RelatedGuides";
import { parseListingSearch, buildListingQuery } from "@/lib/listing-search";
import { isCategoryIndexable, NOINDEX_FOLLOW } from "@/lib/indexing";
import { breadcrumbListJsonLd, OG_IMAGE, OG_IMAGE_META, SITE_URL } from "@/lib/seo";

type Params = Promise<{ category: string; subcategory: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;

export const dynamicParams = true;

export async function generateStaticParams() {
  return categories
    .filter((c) => c.depth >= 1 && c.ancestors.length > 0)
    .map((c) => ({ category: c.ancestors[0].slug, subcategory: c.slug }));
}

function resolve(category: string, subcategory: string) {
  const parent = categoryBySlug(category);
  const sub = categoryBySlug(subcategory);
  if (!parent || !sub || sub.depth === 0) return null;
  if (sub.parentSlug !== parent.slug && sub.ancestors.every((a) => a.slug !== parent.slug))
    return null;
  return { parent, sub, top: sub.ancestors[0] ?? parent };
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const r = resolve(category, subcategory);
  if (!r) return {};
  const { sub, top } = r;
  const search = parseListingSearch(await searchParams);
  const all = productsInCategory(sub.slug);
  const custom = categorySeoTitle(sub.slug, sub.label);
  const baseTitle = custom.includes(sub.label) ? custom : `${sub.label} | ${top.label}`;
  const paged = search.page > 1;
  const title = paged ? `${baseTitle} · Σελίδα ${search.page}` : baseTitle;
  const description = categorySeoDescription(sub.slug, sub.label, all.length);
  const base = `${SITE_URL}${categoryUrl(sub)}`;
  const canonical = paged ? `${base}?page=${search.page}` : base;
  const noindex = paged || !isCategoryIndexable(sub);
  return {
    title,
    description,
    openGraph: { title, description, url: canonical, images: [OG_IMAGE_META] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical },
    robots: noindex ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { category, subcategory } = await params;
  const r = resolve(category, subcategory);
  if (!r) notFound();
  const { sub, top } = r;

  const search = parseListingSearch(await searchParams);
  const canonicalPath = categoryUrl(sub);
  if (`/${category}/${subcategory}` !== canonicalPath) {
    permanentRedirect(canonicalPath + buildListingQuery(search, {}));
  }

  const all = productsInCategory(sub.slug);
  const filtered = applyFilters(all, {
    brand: search.brand,
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });
  const { items, page, totalPages } = paginate(filtered, search.page);
  const facets = brandsInProducts(all).slice(0, 12);
  const subs = subcategoriesOf(sub.slug);
  const faqs = faqsForCategory(sub.slug);
  const pageUrl = `${SITE_URL}${canonicalPath}`;

  const crumbs: Crumb[] = [{ label: "Αρχική", href: "/" }];
  const jsonCrumbs = [{ name: "Αρχική", item: `${SITE_URL}/` }];
  for (const a of sub.ancestors) {
    const node = categoryBySlug(a.slug);
    const href = node ? categoryUrl(node) : `/${a.slug}`;
    crumbs.push({ label: a.label, href });
    jsonCrumbs.push({ name: a.label, item: `${SITE_URL}${href}` });
  }
  crumbs.push({ label: sub.label });
  jsonCrumbs.push({ name: sub.label, item: pageUrl });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${sub.label} - ${top.label}`,
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
      {page === 1 && <JsonLd data={itemListSchema} />}
      {page === 1 && faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}
      <JsonLd data={breadcrumbListJsonLd(jsonCrumbs)} />
      <ListingShell
        h1={categoryH1(sub.slug, sub.label)}
        intro={categoryDescription(sub.slug)}
        breadcrumbs={crumbs}
        chips={subs.map((s) => ({ label: s.label, href: categoryUrl(s), count: s.count }))}
        basePath={canonicalPath}
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
        <RelatedGuides categorySlug={top.slug} />
      </ListingShell>
    </>
  );
}
