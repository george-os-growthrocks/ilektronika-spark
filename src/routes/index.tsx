import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { blogPosts } from "../data/blog";
import { generalFaqs } from "../data/faqs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ilektronikatsigara.gr — Ηλεκτρονικά Τσιγάρα, Disposables, Υγρά, Ναργιλέδες" },
      {
        name: "description",
        content:
          "Αυθεντικά ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης και ναργιλέδες. Δωρεάν αποστολή >30€, παράδοση 1-3 ημέρες σε όλη την Ελλάδα.",
      },
      { property: "og:title", content: "ilektronikatsigara.gr — Premium Vaping Hub στην Ελλάδα" },
      {
        property: "og:description",
        content:
          "Ανακαλύψτε την κορυφαία συλλογή ηλεκτρονικών τσιγάρων, υγρών και αξεσουάρ στην Ελλάδα.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ilektronikatsigara.gr",
          url: "/",
          inLanguage: "el",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);
  const faqTeaser = generalFaqs.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="font-mono text-xs text-primary mb-4 block uppercase tracking-widest">
              Premium Vaping Hub στην Ελλάδα
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-balance">
              Η εξέλιξη του <span className="text-primary">ατμίσματος</span>.
            </h1>
            <p className="max-w-[45ch] text-lg text-muted-foreground mb-10 text-pretty leading-relaxed">
              Ανακαλύψτε την κορυφαία συλλογή από ηλεκτρονικά τσιγάρα, disposable vapes, υγρά αναπλήρωσης
              και ναργιλέδες. Αυθεντικά προϊόντα, εξειδίκευση και ταχεία αποστολή σε όλη την Ελλάδα.
            </p>
            <Link
              to="/disposables"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-sm hover:translate-x-1 transition-transform"
            >
              Εξερευνήστε τις Κατηγορίες →
            </Link>
          </div>
          <div className="md:col-span-5 animate-fade-up">
            <div className="w-full aspect-[4/5] bg-surface border border-border grid place-items-center relative">
              <div className="absolute -top-4 -left-4 size-24 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-4 -right-4 size-24 border-b-2 border-r-2 border-primary"></div>
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚡</div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Premium Collection 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bento */}
      <section id="categories" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
                01 / Κατάλογος
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
                Κατηγορίες Προϊόντων
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                to="/$category"
                params={{ category: cat.slug }}
                className={`group relative overflow-hidden bg-surface border border-border p-8 transition-colors hover:border-primary ${
                  i === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[400px]" : "min-h-[200px]"
                } flex flex-col justify-end`}
              >
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                  0{i + 1}
                </span>
                <h3 className={`font-extrabold tracking-tighter mb-2 ${i === 0 ? "text-4xl" : "text-2xl"}`}>
                  {cat.shortName}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-[40ch]">{cat.tagline}</p>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                  Δείτε συλλογή +
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
                02 / Προτεινόμενα
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
                Bestsellers
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/proionta/$slug"
                params={{ slug: p.slug }}
                className="group block border border-border hover:border-primary transition-colors"
              >
                <div className="aspect-square bg-surface grid place-items-center border-b border-border">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
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
                  <p className="text-lg font-extrabold">{p.price.toFixed(2)}€</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
                03 / Editorial
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
                Οδηγοί & Άρθρα
              </h2>
            </div>
            <Link to="/blog" className="text-xs font-mono font-bold uppercase tracking-widest text-primary border-b border-primary pb-1">
              Όλα τα άρθρα →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block bg-background border border-border p-6 hover:border-primary transition-colors group"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary block mb-3">
                  {post.category} · {post.readingTime} λεπτά
                </span>
                <h3 className="text-xl font-extrabold tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2 text-center">
            04 / FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-12 text-center">
            Συχνές Ερωτήσεις
          </h2>
          <div className="space-y-3">
            {faqTeaser.map((f, i) => (
              <details key={i} className="bg-surface border border-border p-6 group">
                <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
                  <span className="pr-4">{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/syxnes-erotiseis"
              className="inline-flex items-center bg-foreground text-background px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors"
            >
              Όλες οι ερωτήσεις →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
