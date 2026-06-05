import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  brands,
  categoryBySlug,
  effectivePrice,
  formatPrice,
  productBySlug,
  productImage,
  productsInCategory,
} from "../data/catalog";
import { MerchantCard } from "../components/MerchantCard";
import { ProductCard } from "../components/ProductCard";
import { productAffiliateUrl, productCanonicalUrl, STORE_NAME } from "../lib/affiliate";

export const Route = createFileRoute("/proionta/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    const cat = product.primaryLeafSlug ? categoryBySlug(product.primaryLeafSlug) : undefined;
    const related = product.primaryLeafSlug
      ? productsInCategory(product.primaryLeafSlug)
          .filter((p) => p.slug !== product.slug)
          .slice(0, 4)
      : [];
    return { product, category: cat, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product } = loaderData;
    const title =
      product.seoTitle || `${product.name} | ilektronikatsigara.gr`;
    const description =
      product.seoDescription ||
      product.shortDescription ||
      `Δείτε τιμή, χαρακτηριστικά και διαθεσιμότητα για ${product.name}${
        product.brand ? ` της ${product.brand}` : ""
      }.`;
    const canonical = productCanonicalUrl(product);
    const price = effectivePrice(product);
    const image = productImage(product);

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 160) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: canonical },
        ...(image ? [{ property: "og:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.sku || product.id,
            image: product.images.slice(0, 4),
            description,
            brand: product.brand
              ? { "@type": "Brand", name: product.brand }
              : undefined,
            offers: price != null
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
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Αρχική", item: "/" },
              ...product.primaryCategoryPath.map((node: any, i: number) => ({
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
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Το προϊόν δεν βρέθηκε</h1>
      <Link to="/" className="text-primary font-bold underline">
        Επιστροφή στην αρχική
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Κάτι πήγε στραβά</h1>
      <Link to="/" className="text-primary font-bold underline">
        Επιστροφή στην αρχική
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const breadcrumbs = product.primaryCategoryPath;

  return (
    <>
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumbs"
        className="max-w-7xl mx-auto px-6 pt-6 text-xs text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">
              Αρχική
            </Link>
          </li>
          {breadcrumbs.map((node: any, i: number) => (
            <li key={node.slug} className="flex items-center gap-2">
              <span>›</span>
              {i === 0 ? (
                <Link
                  to="/$category"
                  params={{ category: node.slug }}
                  className="hover:text-primary"
                >
                  {node.label}
                </Link>
              ) : i === 1 ? (
                <Link
                  to="/$category/$subcategory"
                  params={{ category: breadcrumbs[0].slug, subcategory: node.slug }}
                  className="hover:text-primary"
                >
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

      {/* Hero */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery */}
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
                {product.images.slice(0, 5).map((src: string, i: number) => (
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

          {/* Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {product.brand && (
              <Link
                to="/marka/$brand"
                params={{ brand: product.brandSlug ?? "" }}
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
              <p className="text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            <MerchantCard product={product} />

            {product.attributes.length > 0 && (
              <div className="border-t border-border pt-4 mt-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Διαθέσιμες παραλλαγές
                </h2>
                <dl className="space-y-2 text-sm">
                  {product.attributes.map((a: any) => (
                    <div key={a.name}>
                      <dt className="font-bold text-foreground mb-1">{a.name}</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {a.values.map((v: string) => (
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

      {/* Description */}
      {product.description && (
        <section className="py-12 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Περιγραφή</h2>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tight mb-8">
              Παρόμοια προϊόντα
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p: any) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// Keep imports used only for side-effect awareness; suppress unused warnings
void brands;
void productAffiliateUrl;
void formatPrice;
