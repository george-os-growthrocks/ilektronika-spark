import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { productBySlug, toCard } from "@/data/catalog";
import { priceLabel } from "@/data/catalog-types";
import { OutboundLink } from "@/components/OutboundLink";
import { productAffiliateUrl, storeUrl } from "@/lib/affiliate";
import { toGreekUppercase } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog Άτμισης | Οδηγοί, Συγκρίσεις & Νέα",
  description:
    "Οδηγοί αγοράς, συγκρίσεις συσκευών, νικοτίνη, disposables, snus και ναργιλές: πρακτικά άρθρα για ενήλικες ατμιστές στην Ελλάδα από το Vape and More.",
  openGraph: {
    title: "Blog Άτμισης | Οδηγοί & Συγκρίσεις Ηλεκτρονικού Τσιγάρου",
    description: "Οδηγοί αγοράς, συγκρίσεις και νέα για ηλεκτρονικά τσιγάρα, υγρά και snus.",
    url: "/blog",
  },
  alternates: { canonical: "/blog" },
};

const SIDEBAR_SLUGS = [
  "voopoo-argus-g2-mini-plus-3ml-pod-kit",
  "cookies-wand-disposable-vape-600-puffs-20mg-ml-strawberry-watermelon",
  "drifter-hyper-sweet-blueberry-ice-5ml-60ml",
];

export default function BlogIndexPage() {
  const sidebarProducts = SIDEBAR_SLUGS.map((slug) => productBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map(toCard);
  const posts = [...blogPosts].sort((a, b) =>
    (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt),
  );

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2 font-bold">
          ΟΔΗΓΟΙ & ΣΥΓΚΡΙΣΕΙΣ
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-balance">
          Οδηγοί & Άρθρα Άτμισης
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
          Πρακτικοί οδηγοί από το κατάστημα: ποια συσκευή ταιριάζει σε ποιον, πόση νικοτίνη, τι
          διαφέρει στα disposables, τι ισχύει για snus και ναργιλέ στην Ελλάδα.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block border border-border bg-card rounded-xl hover:border-primary/50 hover:shadow-lg shadow-black/[0.02] transition-all p-6 md:p-8 group"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded font-bold">
                      {toGreekUppercase(post.category)}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
                      · {toGreekUppercase(post.readingTime + " λεπτά")}
                    </span>
                    <time
                      dateTime={post.updatedAt ?? post.publishedAt}
                      className="text-[10px] font-mono tracking-widest text-muted-foreground"
                    >
                      · {post.updatedAt ?? post.publishedAt}
                    </time>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors text-balance">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                    ΔΙΑΒΑΣΤΕ ΤΟ ΑΡΘΡΟ <span className="text-sm">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-primary/20 rounded-xl p-6 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                ΤΟ ΚΑΤΑΣΤΗΜΑ
              </span>
              <h3 className="text-lg font-extrabold mb-2 text-foreground">Vape and More</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Όλα τα προϊόντα του καταλόγου με άμεση αποστολή σε όλη την Ελλάδα και εγγύηση
                γνησιότητας.
              </p>
              <OutboundLink
                href={storeUrl("blog_sidebar")}
                placement="blog_sidebar"
                className="w-full text-center block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-2.5 rounded hover:opacity-90 transition-opacity"
              >
                ΕΠΙΣΚΕΨΗ ΣΤΟ E-SHOP →
              </OutboundLink>
            </div>

            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                ΔΗΜΟΦΙΛΗ ΠΡΟΪΟΝΤΑ
              </span>
              <div className="space-y-4">
                {sidebarProducts.map((p) => {
                  const label = priceLabel(p);
                  return (
                    <div
                      key={p.slug}
                      className="flex gap-3 items-center border-b border-border/50 last:border-0 pb-3 last:pb-0"
                    >
                      <Link
                        href={`/proionta/${p.slug}`}
                        className="w-16 h-16 shrink-0 aspect-square bg-surface border border-border rounded-lg overflow-hidden flex items-center justify-center p-1.5 hover:border-primary/40 transition-colors"
                      >
                        {p.image && (
                          <img
                            src={p.image}
                            alt={p.name}
                            width={56}
                            height={56}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        )}
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
                            {label?.text ?? "Δείτε τιμή"}
                          </span>
                          <OutboundLink
                            href={productAffiliateUrl(p, "blog_sidebar_product")}
                            placement="blog_sidebar_product"
                            product={{
                              id: p.id,
                              name: p.name,
                              brand: p.brand,
                              category: p.categorySlug,
                              price: p.price,
                              inStock: p.inStock,
                            }}
                            className="text-[10px] font-bold uppercase text-muted-foreground hover:text-primary"
                          >
                            ΑΓΟΡΑ →
                          </OutboundLink>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                ΚΑΤΗΓΟΡΙΕΣ ΑΓΟΡΑΣ
              </span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  ["/disposables", "Disposables (Μιας Χρήσης)"],
                  ["/ygra-anaplirosis", "Υγρά Αναπλήρωσης"],
                  ["/syskeyes-vape", "Συσκευές Vape & Pods"],
                  ["/snus", "Snus & Nicotine Pouches"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface hover:border-primary/40 transition-colors"
                  >
                    <span className="text-xs font-bold">{label}</span>
                    <span className="text-xs text-primary font-bold">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
