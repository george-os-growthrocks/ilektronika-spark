import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  applyFilters,
  brandBySlug,
  brands,
  paginate,
  productsByBrand,
  toCard,
} from "@/data/catalog";
import { brandMeta } from "@/data/brand-meta";
import { JsonLd } from "@/components/JsonLd";
import { ListingShell } from "@/components/listing/ListingShell";
import { RelatedGuides } from "@/components/RelatedGuides";
import { parseListingSearch } from "@/lib/listing-search";
import { isBrandIndexable, NOINDEX_FOLLOW } from "@/lib/indexing";
import { breadcrumbListJsonLd, OG_IMAGE, OG_IMAGE_META, SITE_URL } from "@/lib/seo";

type Params = Promise<{ brand: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;

export const dynamicParams = true;

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) return {};
  const search = parseListingSearch(await searchParams);
  const meta = brandMeta(slug);
  const all = productsByBrand(brand.slug);
  const baseTitle = meta.seoTitle || `${brand.label} | Προϊόντα Vape & Τιμές`;
  const paged = search.page > 1;
  const title = paged ? `${baseTitle} · Σελίδα ${search.page}` : baseTitle;
  const description = (
    meta.seoDescription ||
    `Όλα τα προϊόντα ${brand.label} με τιμές και διαθεσιμότητα: ${all.length} προϊόντα. Αγορά online μέσω Vape and More, αποστολή 1-3 ημέρες σε όλη την Ελλάδα.`
  ).slice(0, 160);
  const base = `${SITE_URL}/marka/${brand.slug}`;
  const canonical = paged ? `${base}?page=${search.page}` : base;
  const noindex = paged || !isBrandIndexable(brand);
  return {
    title,
    description,
    openGraph: { title, description, url: canonical, images: [OG_IMAGE_META] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical },
    robots: noindex ? NOINDEX_FOLLOW : undefined,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { brand: slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) notFound();

  const all = productsByBrand(brand.slug);
  const search = parseListingSearch(await searchParams);
  const filtered = applyFilters(all, { inStockOnly: search.instock === "1", sort: search.sort });
  const { items, page, totalPages } = paginate(filtered, search.page);
  const meta = brandMeta(slug);
  const pageUrl = `${SITE_URL}/marka/${brand.slug}`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Προϊόντα ${brand.label}`,
    url: pageUrl,
    numberOfItems: all.length,
    itemListElement: all.slice(0, 20).map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/proionta/${p.slug}`,
      name: p.name,
    })),
  };

  const intro =
    meta.intro ??
    `Όλα τα προϊόντα ${brand.label} που διαθέτει το Vape and More, με τιμές, διαθεσιμότητα και απευθείας σύνδεσμο αγοράς. Αυθεντικά είδη από επίσημους διανομείς, αποστολή σε όλη την Ελλάδα.`;

  return (
    <>
      {page === 1 && <JsonLd data={itemListSchema} />}
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: "Μάρκες", item: `${SITE_URL}/katigories` },
          { name: brand.label, item: pageUrl },
        ])}
      />
      <ListingShell
        h1={`${brand.label}: Προϊόντα & Τιμές`}
        intro={intro}
        breadcrumbs={[
          { label: "Αρχική", href: "/" },
          { label: "Μάρκες", href: "/katigories" },
          { label: brand.label },
        ]}
        basePath={`/marka/${brand.slug}`}
        search={search}
        facets={[]}
        showBrandFacet={false}
        cards={items.map(toCard)}
        total={filtered.length}
        inStockCount={filtered.filter((p) => p.inStock).length}
        page={page}
        totalPages={totalPages}
      >
        <RelatedGuides guideSlugs={meta.relatedGuides} />
      </ListingShell>
    </>
  );
}
