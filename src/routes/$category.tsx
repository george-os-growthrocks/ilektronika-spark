import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory } from "../data/categories";
import { productsByCategory } from "../data/products";

export const Route = createFileRoute("/$category")({
  beforeLoad: ({ params }) => {
    if (!getCategory(params.category)) throw notFound();
  },
  loader: ({ params }) => {
    const cat = getCategory(params.category)!;
    return { category: cat, products: productsByCategory(cat.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { category } = loaderData;
    return {
      meta: [
        { title: category.metaTitle },
        { name: "description", content: category.metaDescription },
        { name: "keywords", content: category.keywords.join(", ") },
        { property: "og:title", content: category.metaTitle },
        { property: "og:description", content: category.metaDescription },
        { property: "og:url", content: `/${category.slug}` },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/${category.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: category.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
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
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Η κατηγορία δεν βρέθηκε</h1>
      <Link to="/" className="text-primary underline">Επιστροφή στην αρχική</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Αρχική</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.shortName}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-balance">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{category.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-foreground leading-relaxed">{category.intro}</p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-8">
            Προϊόντα ({products.length})
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: typeof products[number]) => (
              <Link
                key={p.slug}
                to="/proionta/$slug"
                params={{ slug: p.slug }}
                className="group block border border-border hover:border-primary transition-colors"
              >
                <div className="aspect-square bg-surface grid place-items-center border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
                    {p.brand}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {p.brand}
                  </span>
                  <h3 className="font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.shortDescription}</p>
                  <p className="text-lg font-extrabold">{p.price.toFixed(2)}€</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Buying guide */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-8">
            Οδηγός Αγοράς — {category.shortName}
          </h2>
          <ul className="space-y-4">
            {category.buyingGuide.map((tip: string, i: number) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs text-primary font-bold mt-1">0{i + 1}</span>
                <span className="text-foreground leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-8">
            Συχνές Ερωτήσεις — {category.shortName}
          </h2>
          <div className="space-y-3">
            {category.faqs.map((f: { q: string; a: string }, i: number) => (
              <details key={i} className="border border-border p-6 group">
                <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
                  <span className="pr-4">{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-extrabold tracking-tighter mb-6">Δείτε επίσης</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                to="/$category"
                params={{ category: c.slug }}
                className="border border-border p-4 hover:border-primary hover:text-primary transition-colors text-sm font-bold"
              >
                {c.shortName} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
