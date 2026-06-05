import type { Metadata } from "next";
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
import { FaqSection } from "@/components/FaqSection";
import { RichText } from "@/components/RichText";
import { faqsForProduct } from "@/data/faqs-generated";
import { productCanonicalUrl, STORE_NAME } from "@/lib/affiliate";
import { JsonLd } from "@/components/JsonLd";
import { productImage } from "@/data/catalog";

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
  
  let title = product.seoTitle || `${product.name} | Τιμή & Αγορά Online`;
  title = title.replace(/\s*—\s*/g, " | ");
  
  let description =
    product.seoDescription ||
    product.shortDescription ||
    `Αγοράστε ${product.name}${product.brand ? ` της ${product.brand}` : ""} online. Δείτε τιμή, χαρακτηριστικά, διαθεσιμότητα και παραγγείλτε από το Vape and More.`;
  description = description.replace(/\s*—\s*/g, " | ");
  
  const canonical = productCanonicalUrl(product);
  const image = productImage(product);
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      type: "website",
      url: canonical,
      ...(image ? { images: [image] } : {}),
    },
    alternates: { canonical },
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
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `Δείτε τιμή, χαρακτηριστικά και διαθεσιμότητα για ${product.name}.`;

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
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Αρχική", item: "/" },
            ...product.primaryCategoryPath.map((node, i) => ({
              "@type": "ListItem",
              position: i + 2,
              name: node.label,
              item: `/${node.slug}`,
            })),
            {
              "@type": "ListItem",
              position: product.primaryCategoryPath.length + 2,
              name: product.name,
              item: `/proionta/${product.slug}`,
            },
          ],
        }}
      />

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
            <div className="aspect-square bg-surface border border-border rounded-md overflow-hidden grid place-items-center">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <span className="text-muted-foreground font-mono text-xs uppercase">
                  Χωρίς εικόνα
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {product.images.slice(0, 5).map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface border border-border rounded grid place-items-center overflow-hidden"
                  >
                    <img src={src} alt="" className="w-full h-full object-contain p-2" />
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
                {product.brand}
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
                  Διαθέσιμες παραλλαγές
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

      {product.description && (
        <section className="py-12 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Περιγραφή</h2>
            <RichText text={product.description} />
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

      <FaqSection faqs={faqsForProduct(product)} />
    </>
  );
}
