import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryBySlug,
  categoryUrl,
  productBySlug,
  products,
  productsInCategory,
  toCard,
} from "@/data/catalog";
import { MerchantCard } from "@/components/MerchantCard";
import { ProductCard } from "@/components/ProductCard";
import { FaqSection } from "@/components/FaqSection";
import { RichText } from "@/components/RichText";
import { faqsForProduct } from "@/data/faqs-generated";
import { productCanonicalUrl } from "@/lib/affiliate";
import { JsonLd } from "@/components/JsonLd";
import { toGreekUppercase } from "@/lib/utils";
import { extractSpecs } from "@/lib/specs";
import { isProductIndexable, NOINDEX_FOLLOW } from "@/lib/indexing";
import {
  breadcrumbListJsonLd,
  OG_IMAGE,
  OG_IMAGE_META,
  productBodyEnrichment,
  productBreadcrumbCrumbs,
  productOffersJsonLd,
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
  const image = product.images[0];

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: image
        ? [{ url: image, width: 800, height: 800, alt: product.name }]
        : [OG_IMAGE_META],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [OG_IMAGE],
    },
    alternates: { canonical },
    robots: isProductIndexable(product) ? undefined : NOINDEX_FOLLOW,
  };
}

/** Drop a leading paragraph that just repeats the product name. */
function trimDescription(description: string, name: string): string {
  const paras = description.split(/\n{2,}/);
  const first = paras[0]?.trim().replace(/^Περιγραφή\s*/i, "");
  if (first && first.toLowerCase() === name.trim().toLowerCase())
    return paras.slice(1).join("\n\n");
  return description.replace(/^Περιγραφή\s*\n/i, "");
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = product.primaryLeafSlug
    ? productsInCategory(product.primaryLeafSlug)
        .filter((p) => p.slug !== product.slug)
        .sort((a, b) => Number(b.inStock) - Number(a.inStock))
        .slice(0, 4)
        .map(toCard)
    : [];

  const breadcrumbs = product.primaryCategoryPath;
  const canonical = productCanonicalUrl(product);
  const description = productSeoDescription(product);
  const faqs = faqsForProduct(product);
  const specs = extractSpecs(product.description);
  const body = trimDescription(product.description ?? "", product.name);
  const bodyLength = body.trim().length;
  const enrichment = bodyLength < 120 ? productBodyEnrichment(product) : null;
  const offers = productOffersJsonLd(product, canonical);

  const crumbHref = (i: number) => {
    const node = categoryBySlug(breadcrumbs[i].slug);
    if (node) return categoryUrl(node);
    return i === 0 ? `/${breadcrumbs[0].slug}` : `/${breadcrumbs[0].slug}/${breadcrumbs[i].slug}`;
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${canonical}#product`,
          name: product.name,
          sku: product.sku || product.id,
          image: product.images.slice(0, 4),
          description,
          brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
          category: product.primaryCategoryPath.map((n) => n.label).join(" > ") || undefined,
          offers,
        }}
      />
      <JsonLd
        data={breadcrumbListJsonLd(
          productBreadcrumbCrumbs(product.primaryCategoryPath, product.name, product.slug),
        )}
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
              <span aria-hidden>›</span>
              <Link href={crumbHref(i)} className="hover:text-primary">
                {node.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span aria-hidden>›</span>
            <span className="text-foreground truncate max-w-[40ch]" aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="relative aspect-square max-h-[560px] mx-auto bg-surface border border-border rounded-md overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
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
                    <Image src={src} alt="" fill sizes="120px" className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
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
                <p className="text-[11px] text-muted-foreground mt-2">
                  Η επιλογή παραλλαγής γίνεται στο κατάστημα κατά την παραγγελία.
                </p>
              </div>
            )}
            {specs.length > 0 && (
              <div className="border-t border-border pt-4 mt-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ
                </h2>
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((s) => (
                      <tr key={s.key} className="border-b border-border/60 last:border-0">
                        <th
                          scope="row"
                          className="text-left font-semibold py-1.5 pr-3 w-[42%] align-top"
                        >
                          {s.key}
                        </th>
                        <td className="py-1.5 text-muted-foreground">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {(bodyLength > 0 || enrichment) && (
        <section className="py-12 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Περιγραφή</h2>
            {bodyLength > 0 && <RichText text={body} />}
            {enrichment && (
              <p
                className={`text-muted-foreground leading-relaxed ${bodyLength > 0 ? "mt-4" : ""}`}
              >
                {enrichment}
              </p>
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
        <RelatedGuides categorySlug={product.primaryTopSlug} title="Διαβάστε επίσης" />
      )}
    </>
  );
}
