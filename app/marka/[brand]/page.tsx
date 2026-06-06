import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandBySlug, brands, productsByBrand } from "@/data/catalog";
import { BrandPageClient } from "@/components/BrandPageClient";
import { parseListingSearch } from "@/lib/listing-search";
import { JsonLd } from "@/components/JsonLd";

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
  const all = productsByBrand(brand.slug);
  const title = `${brand.label} | Προϊόντα Vape & Αξεσουάρ`;
  const description = `Όλα τα προϊόντα ${brand.label} στο Vape and More. Τιμές, διαθεσιμότητα & online αγορά με άμεση αποστολή.`;
  return {
    title,
    description: description.slice(0, 105),
    openGraph: {
      title,
      description: description.slice(0, 105),
      url: `/marka/${brand.slug}`,
    },
    alternates: { canonical: `https://ilektronikatsigara.gr/marka/${brand.slug}` },
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Προϊόντα ${brand.label}`,
    "url": `https://ilektronikatsigara.gr/marka/${brand.slug}`,
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
      <BrandPageClient brand={brand} all={all} search={search} />
    </>
  );
}
