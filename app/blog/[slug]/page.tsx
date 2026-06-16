import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/data/blog";
import { JsonLd } from "@/components/JsonLd";
import { productBySlug, productImage, formatPrice, effectivePrice } from "@/data/catalog";
import { toGreekUppercase } from "@/lib/utils";

export const dynamicParams = true;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  
  const title = post.title.replace(/\s* - \s*/g, " | ");
  const description = post.metaDescription.replace(/\s* - \s*/g, " | ");
  
  return {
    title,
    description: description.slice(0, 160),
    keywords: post.keywords,
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  
  // Resolve promoted products from slugs
  const promotedProducts = (post.promotedProducts ?? [])
    .map((slug) => productBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const inlineAdProduct = promotedProducts[0];

  return (
    <article className="py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ilektronikatsigara.gr/blog/${post.slug}`,
          },
          headline: post.title,
          description: post.metaDescription,
          image: "https://ilektronikatsigara.gr/og-image.png",
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          author: { "@type": "Organization", name: "ilektronikatsigara.gr" },
          publisher: { 
            "@type": "Organization", 
            name: "ilektronikatsigara.gr",
            logo: {
              "@type": "ImageObject",
              "url": "https://ilektronikatsigara.gr/logo.png"
            }
          },
          inLanguage: "el",
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            ΑΡΧΙΚΗ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">
            BLOG
          </Link>
        </nav>

        {/* Title & Metadata */}
        <div className="mb-10">
          <span className="font-mono text-xs text-primary tracking-widest block mb-2 font-bold">
            {toGreekUppercase(post.category)} · {toGreekUppercase(post.readingTime + " λεπτά")} · {post.publishedAt}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-balance">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            {post.excerpt}
          </p>
        </div>

        {/* Main Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Article Content Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="prose-content space-y-6 text-foreground leading-relaxed text-sm md:text-base">
              {post.content.map((para, i) => {
                const elements = [];

                if (para.startsWith("## ")) {
                  elements.push(
                    <h2
                      key={`h2-${i}`}
                      className="text-2xl md:text-3xl font-extrabold tracking-tight mt-10 mb-4 text-foreground border-b border-border pb-2"
                    >
                      {para.replace(/^## /, "")}
                    </h2>
                  );
                } else {
                  const parts = para.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
                  elements.push(
                    <p key={`p-${i}`} className="leading-relaxed">
                      {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={j} className="font-extrabold text-foreground">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        } else if (part.startsWith("[") && part.endsWith(")")) {
                          const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                          if (match) {
                            const [, linkText, url] = match;
                            const isInternal = url.startsWith("/");
                            if (isInternal) {
                              return (
                                <Link
                                  key={j}
                                  href={url}
                                  className="text-primary hover:underline font-semibold"
                                >
                                  {linkText}
                                </Link>
                              );
                            } else {
                              return (
                                <a
                                  key={j}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline font-semibold"
                                >
                                  {linkText}
                                </a>
                              );
                            }
                          }
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                }

                // Inject Inline product advertisement after the 3rd content block (index 2)
                if (i === 2 && inlineAdProduct) {
                  elements.push(
                    <div
                      key="inline-ad"
                      className="my-8 border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-background rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm"
                    >
                      <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 aspect-square bg-surface border border-border rounded-xl flex items-center justify-center p-3">
                        <img
                          src={productImage(inlineAdProduct)}
                          alt={inlineAdProduct.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                          ΠΡΟΤΕΙΝΟΜΕΝΟ ΠΡΟΪΟΝ
                        </span>
                        <h4 className="text-lg font-extrabold mb-2 text-foreground truncate">
                          {inlineAdProduct.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {inlineAdProduct.shortDescription.replace(/<[^>]*>/g, '') || "Αποκτήστε το αυθεντικό προϊόν με εγγύηση ποιότητας και ταχεία παράδοση."}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                          <span className="text-xl font-extrabold text-primary">
                            {formatPrice(effectivePrice(inlineAdProduct))}
                          </span>
                          <a
                            href={`https://vapeandmore.gr/product/${inlineAdProduct.slug}/?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=blog-inline-ad`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
                          >
                            ΑΓΟΡΑ ΣΤΟ Vape and More →
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                return elements;
              })}

              {/* FAQs Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12 pt-10 border-t border-border">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-foreground">
                    Συχνές Ερωτήσεις (FAQ)
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="font-bold text-foreground text-base mb-2">
                          {faq.q}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Contextual Category Ad */}
            {post.promotedCategory && (
              <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-primary/20 rounded-xl p-6 shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                  ΠΡΟΤΑΣΗ ΑΓΟΡΑΣ
                </span>
                <h3 className="text-lg font-extrabold mb-2 text-foreground">
                  {post.promotedCategory.label}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {post.promotedCategory.description}
                </p>
                <Link
                  href={`/${post.promotedCategory.slug}`}
                  className="w-full text-center block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-2.5 rounded hover:opacity-90 transition-opacity"
                >
                  ΔΕΙΤΕ ΟΛΟΚΛΗΡΗ ΤΗΝ ΚΑΤΗΓΟΡΙΑ →
                </Link>
              </div>
            )}

            {/* Sidebar Products Ads */}
            {promotedProducts.length > 0 && (
              <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                  ΣΧΕΤΙΚΑ ΠΡΟΪΟΝΤΑ
                </span>
                <div className="space-y-4">
                  {promotedProducts.map((p) => (
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
                            href={`https://vapeandmore.gr/product/${p.slug}/?utm_source=ilektronikatsigara&utm_medium=referral&utm_campaign=blog-sidebar-ad`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase text-muted-foreground hover:text-primary"
                          >
                            ΑΓΟΡΑ →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Help/Support ad */}
            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                ΧΡΕΙΑΖΕΣΤΕ ΒΟΗΘΕΙΑ;
              </span>
              <h4 className="text-sm font-extrabold mb-1">Τηλεφωνικές Παραγγελίες</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Επικοινωνήστε απευθείας με το φυσικό κατάστημα Vape and More για απορίες ή παραγγελίες.
              </p>
              <a
                href="tel:+302831181046"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline"
              >
                📞 2831 181 046 (Δευ-Σαβ)
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Suggested Reading Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-border">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Συνεχίστε την ανάγνωση</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block border border-border rounded-xl p-6 bg-card hover:border-primary/50 hover:shadow-md transition-all"
            >
              <span className="text-[10px] font-mono tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded font-bold">
                {toGreekUppercase(p.category)}
              </span>
              <h3 className="font-bold mt-3 text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
