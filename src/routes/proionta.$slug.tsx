import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, productsByCategory } from "../data/products";
import { getCategory } from "../data/categories";

export const Route = createFileRoute("/proionta/$slug")({
  beforeLoad: ({ params }) => {
    if (!getProduct(params.slug)) throw notFound();
  },
  loader: ({ params }) => {
    const product = getProduct(params.slug)!;
    const category = getCategory(product.category)!;
    const related = productsByCategory(product.category).filter((p) => p.slug !== product.slug).slice(0, 3);
    return { product, category, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product, category } = loaderData;
    return {
      meta: [
        { title: `${product.name} | ilektronikatsigara.gr` },
        { name: "description", content: product.metaDescription },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.metaDescription },
        { property: "og:url", content: `/proionta/${product.slug}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/proionta/${product.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            description: product.description,
            category: category.name,
            offers: {
              "@type": "Offer",
              price: product.price.toFixed(2),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Αρχική", item: "/" },
              { "@type": "ListItem", position: 2, name: category.shortName, item: `/${category.slug}` },
              { "@type": "ListItem", position: 3, name: product.name, item: `/proionta/${product.slug}` },
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
      <Link to="/" className="text-primary underline">Επιστροφή στην αρχική</Link>
    </div>
  ),
});

function ProductPage() {
  const { product, category, related } = Route.useLoaderData();

  return (
    <>
      <section className="pt-12 pb-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Αρχική</Link>
            <span className="mx-2">/</span>
            <Link to="/$category" params={{ category: category.slug }} className="hover:text-primary">
              {category.shortName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-surface border border-border grid place-items-center">
            <div className="text-center p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {product.brand}
              </span>
              <span className="text-6xl">📦</span>
            </div>
          </div>
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
              {product.brand}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{product.shortDescription}</p>
            <p className="text-4xl font-extrabold mb-6">{product.price.toFixed(2)}€</p>

            <div className="bg-surface border border-border p-4 mb-6 text-sm text-muted-foreground">
              <strong className="text-foreground">Σημείωση:</strong> Κατάλογος μόνο — οι online παραγγελίες
              ανοίγουν σύντομα. Για κράτηση επικοινωνήστε μαζί μας.
            </div>

            <Link
              to="/epikoinonia"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity mb-8"
            >
              Επικοινωνία για κράτηση →
            </Link>

            <div className="border-t border-border pt-6">
              <h2 className="font-bold mb-3 uppercase text-xs tracking-widest text-muted-foreground">Χαρακτηριστικά</h2>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tighter mb-4">Περιγραφή</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tighter mb-4">Προδιαγραφές</h2>
            <dl className="space-y-2">
              {product.specs.map((s, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-border">
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                  <dd className="font-bold text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold tracking-tighter mb-8">Παρόμοια Προϊόντα</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/proionta/$slug"
                  params={{ slug: p.slug }}
                  className="group block border border-border hover:border-primary transition-colors"
                >
                  <div className="aspect-square bg-surface grid place-items-center border-b border-border">
                    <span className="font-mono text-xs uppercase text-muted-foreground">{p.brand}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-lg font-extrabold">{p.price.toFixed(2)}€</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
