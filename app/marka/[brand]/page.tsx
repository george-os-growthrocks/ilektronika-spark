import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandBySlug, brands, productsByBrand } from "@/data/catalog";
import { BrandPageClient } from "@/components/BrandPageClient";
import { RelatedGuides } from "@/components/RelatedGuides";
import { parseListingSearch } from "@/lib/listing-search";
import { JsonLd } from "@/components/JsonLd";
import { brandMeta } from "@/data/brand-meta";
import { breadcrumbListJsonLd, SITE_URL } from "@/lib/seo";

export const dynamicParams = true;

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) return {};
  const meta = brandMeta(slug);
  const all = productsByBrand(brand.slug);
  const title = meta.seoTitle || `${brand.label} | Προϊόντα Vape & Αξεσουάρ`;
  const description = (
    meta.seoDescription ||
    `Όλα τα προϊόντα ${brand.label} στο Vape and More. ${all.length} προϊόντα με τιμές, διαθεσιμότητα & online αγορά.`
  ).slice(0, 160);
  const canonical = `${SITE_URL}/marka/${brand.slug}`;
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

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { brand: slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) notFound();

  const all = productsByBrand(brand.slug);
  const search = parseListingSearch(await searchParams);
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

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: brand.label, item: pageUrl },
        ])}
      />
      <BrandPageClient brand={brand} all={all} search={search} intro={meta.intro} />
      <RelatedGuides guideSlugs={meta.relatedGuides} />
    </>
  );
}
