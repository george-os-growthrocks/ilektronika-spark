import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { productBySlug, productImage, formatPrice, effectivePrice } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Blog Άτμισης | Οδηγοί & Νέα Ηλεκτρονικού Τσιγάρου | ilektronikatsigara.gr",
  description:
    "Ενημερωθείτε με reviews, οδηγούς χρήσης και επιστημονικά νέα για ηλεκτρονικά τσιγάρα, disposables και υγρά αναπλήρωσης από το Vape and More.",
  openGraph: {
    title: "Blog Άτμισης | Οδηγοί & Νέα Ηλεκτρονικού Τσιγάρου",
    description:
      "Διαβάστε reviews, οδηγούς χρήσης και νέα για ηλεκτρονικά τσιγάρα και άτμισμα.",
    url: "/blog",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sidebarSlugs = [
    "voopoo-argus-g2-mini-plus-3ml-pod-kit",
    "cookies-wand-disposable-vape-600-puffs-20mg-ml-strawberry-watermelon",
    "drifter-hyper-sweet-blueberry-ice-5ml-60ml",
  ];
  const sidebarProducts = sidebarSlugs
    .map((slug) => productBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2 font-bold">
          EDITORIAL & MARKETING
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-balance">
          Οδηγοί & Άρθρα Άτμισης
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
          Ενημερωθείτε από τους ειδικούς: reviews συσκευών, συγκρίσεις γεύσεων και οδηγοί χρήσης για ηλεκτρονικά τσιγάρα.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main content - list of articles */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block border border-border bg-card rounded-xl hover:border-primary/50 hover:shadow-lg shadow-black/[0.02] transition-all p-6 md:p-8 group"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded font-bold">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      · {post.readingTime} λεπτά
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      · {post.publishedAt}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors text-balance">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                    Διαβάστε το άρθρο <span className="text-sm">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar - Promoted products and categories */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Store Promo Banner */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-primary/20 rounded-xl p-6 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                ΣΥΝΕΡΓΑΖΟΜΕΝΟ ΚΑΤΑΣΤΗΜΑ
              </span>
              <h3 className="text-lg font-extrabold mb-2 text-foreground">Vape and More</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Βρείτε όλα τα προϊόντα του καταλόγου μας με άμεση αποστολή σε όλη την Ελλάδα και εγγύηση γνησιότητας.
              </p>
              <a
                href="https://vapeandmore.gr/?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=blog-sidebar"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full text-center block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-2.5 rounded hover:opacity-90 transition-opacity"
              >
                ΕΠΙΣΚΕΨΗ ΣΤΟ E-SHOP →
              </a>
            </div>

            {/* Promoted Product Grid */}
            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                ΔΗΜΟΦΙΛΗ ΠΡΟΪΟΝΤΑ
              </span>
              <div className="space-y-4">
                {sidebarProducts.map((p) => (
                  <div key={p.slug} className="flex gap-3 items-center border-b border-border/50 last:border-0 pb-3 last:pb-0">
                    <Link
                      href={`/proionta/${p.slug}`}
                      className="w-16 h-16 shrink-0 aspect-square bg-surface border border-border rounded-lg overflow-hidden flex items-center justify-center p-1.5 hover:border-primary/40 transition-colors"
                    >
                      <img
                        src={productImage(p)}
                        alt={p.name}
                        className="w-full h-full object-contain"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/proionta/${p.slug}`}
                        className="block text-xs font-bold hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {p.name}
                      </Link>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-extrabold text-primary">
                          {formatPrice(effectivePrice(p))}
                        </span>
                        <a
                          href={`https://vapeandmore.gr/product/${p.slug}/?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=blog-sidebar-product`}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="text-[10px] font-bold uppercase text-muted-foreground hover:text-primary"
                        >
                          Αγορά →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promoted Categories */}
            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                ΚΑΤΗΓΟΡΙΕΣ ΑΓΟΡΑΣ
              </span>
              <div className="grid grid-cols-1 gap-2">
                <Link
                  href="/disposables"
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs font-bold">Disposables (Μιας Χρήσης)</span>
                  <span className="text-xs text-primary font-bold">→</span>
                </Link>
                <Link
                  href="/ygra-anaplirosis"
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs font-bold">Υγρά Αναπλήρωσης</span>
                  <span className="text-xs text-primary font-bold">→</span>
                </Link>
                <Link
                  href="/syskeyes-vape"
                  className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-primary/40 transition-colors"
                >
                  <span className="text-xs font-bold">Συσκευές Vape & Pods</span>
                  <span className="text-xs text-primary font-bold">→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

