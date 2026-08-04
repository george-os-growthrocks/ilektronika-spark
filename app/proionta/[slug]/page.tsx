import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  effectivePrice,
  productBySlug,
  products,
  productsInCategory,
} from "@/data/catalog";
import { MerchantCard } from "@/components/MerchantCard";
import { ProductCard } from "@/components/ProductCard";
import { FaqSection, faqJsonLd } from "@/components/FaqSection";
import { RichText } from "@/components/RichText";
import { faqsForProduct } from "@/data/faqs-generated";
import { productCanonicalUrl, STORE_NAME } from "@/lib/affiliate";
import { JsonLd } from "@/components/JsonLd";
import { productImage } from "@/data/catalog";
import { toGreekUppercase } from "@/lib/utils";
import {
  breadcrumbListJsonLd,
  productBodyEnrichment,
  productBreadcrumbCrumbs,
  productSeoDescription,
  productSeoTitle,
} from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";

export const dynamicParams = true;

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  const title = productSeoTitle(product);
  const description = productSeoDescription(product);
  const canonical = productCanonicalUrl(product);
  const image = productImage(product);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: image
        ? [{ url: image, width: 800, height: 800, alt: product.name }]
        : [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : ["/og-image.png"],
    },
    alternates: { canonical },
    other: {
      "product:brand": product.brand ?? "",
      "og:type": "product",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = product.primaryLeafSlug
    ? productsInCategory(product.primaryLeafSlug)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4)
    : [];

  const breadcrumbs = product.primaryCategoryPath;
  const canonical = productCanonicalUrl(product);
  const price = effectivePrice(product);
  const description = productSeoDescription(product);
  const faqs = faqsForProduct(product);
  const hasRichBody =
    Boolean(product.description?.trim()) || Boolean(product.shortDescription?.trim());
  const enrichment = !hasRichBody || (product.description?.trim().length ?? 0) < 80
    ? productBodyEnrichment(product)
    : null;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          sku: product.sku || product.id,
          image: product.images.slice(0, 4),
          description,
          brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
          offers:
            price != null
              ? {
                  "@type": "Offer",
                  url: canonical,
                  priceCurrency: "EUR",
                  price: price.toFixed(2),
                  availability: product.inStock
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                  seller: { "@type": "Organization", name: STORE_NAME },
                }
              : undefined,
        }}
      />
      <JsonLd
        data={breadcrumbListJsonLd(
          productBreadcrumbCrumbs(product.primaryCategoryPath, product.name, product.slug),
        )}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      <nav
        aria-label="Breadcrumbs"
        className="max-w-7xl mx-auto px-6 pt-6 text-xs text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Αρχική
            </Link>
          </li>
          {breadcrumbs.map((node, i) => (
            <li key={node.slug} className="flex items-center gap-2">
              <span>›</span>
              {i === 0 ? (
                <Link href={`/${node.slug}`} className="hover:text-primary">
                  {node.label}
                </Link>
              ) : i === 1 ? (
                <Link href={`/${breadcrumbs[0].slug}/${node.slug}`} className="hover:text-primary">
                  {node.label}
                </Link>
              ) : (
                <span>{node.label}</span>
              )}
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span>›</span>
            <span className="text-foreground truncate max-w-[40ch]">{product.name}</span>
          </li>
        </ol>
      </nav>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="relative aspect-square bg-surface border border-border rounded-md overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain p-6"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-muted-foreground font-mono text-xs uppercase">
                  ΧΩΡΙΣ ΕΙΚΟΝΑ
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {product.images.slice(0, 5).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square bg-surface border border-border rounded overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {product.brand && product.brandSlug && (
              <Link
                href={`/marka/${product.brandSlug}`}
                className="inline-flex self-start text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 rounded px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {toGreekUppercase(product.brand)}
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
              {product.name}
            </h1>
            {product.sku && (
              <div className="text-xs text-muted-foreground font-mono">
                Κωδικός: <span className="text-foreground">{product.sku}</span>
              </div>
            )}
            {product.shortDescription && (
              <RichText text={product.shortDescription} className="text-muted-foreground" />
            )}
            <MerchantCard product={product} />
            {product.attributes.length > 0 && (
              <div className="border-t border-border pt-4 mt-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  ΔΙΑΘΕΣΙΜΕΣ ΠΑΡΑΛΛΑΓΕΣ
                </h2>
                <dl className="space-y-2 text-sm">
                  {product.attributes.map((a) => (
                    <div key={a.name}>
                      <dt className="font-bold text-foreground mb-1">{a.name}</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {a.values.map((v) => (
                          <span
                            key={v}
                            className="inline-flex text-xs border border-border rounded px-2 py-1 bg-surface"
                          >
                            {v}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {(product.description || enrichment) && (
        <section className="py-12 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Περιγραφή</h2>
            {product.description ? (
              <RichText text={product.description} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{enrichment}</p>
            )}
            {product.description && enrichment && product.description.trim().length < 120 && (
              <p className="text-muted-foreground leading-relaxed mt-4">{enrichment}</p>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">Παρόμοια προϊόντα</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={faqs} />
      {product.primaryTopSlug && (
        <RelatedGuides
          categorySlug={product.primaryTopSlug}
          title="Διαβάστε επίσης"
        />
      )}
    </>
  );
}
