import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/data/blog";
import { JsonLd } from "@/components/JsonLd";
import { OutboundLink } from "@/components/OutboundLink";
import { productBySlug, toCard } from "@/data/catalog";
import { priceLabel } from "@/data/catalog-types";
import { productAffiliateUrl } from "@/lib/affiliate";
import { toGreekUppercase } from "@/lib/utils";
import { authorPersonJsonLd, SITE_AUTHOR } from "@/data/authors";
import { breadcrumbListJsonLd, OG_IMAGE, SITE_URL } from "@/lib/seo";

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
  const description = post.metaDescription.replace(/\s* - \s*/g, " | ").slice(0, 160);

  return {
    title,
    description,
    keywords: post.keywords,
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

/** Minimal inline markdown: **bold** and [text](url). */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={j} className="font-extrabold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const [, linkText, url] = match;
      if (url.startsWith("/")) {
        return (
          <Link key={j} href={url} className="text-primary font-semibold">
            {linkText}
          </Link>
        );
      }
      const isShop = url.startsWith("https://vapeandmore.gr");
      return isShop ? (
        <OutboundLink
          key={j}
          href={url}
          placement="blog_inline"
          className="text-primary font-semibold"
        >
          {linkText}
        </OutboundLink>
      ) : (
        <a
          key={j}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold"
        >
          {linkText}
        </a>
      );
    }
    return <span key={j}>{part}</span>;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const promotedProducts = (post.promotedProducts ?? [])
    .map((s) => productBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map(toCard);
  const inlineAdProduct = promotedProducts[0];
  const modified = post.updatedAt ?? post.publishedAt;

  const howToSteps = post.content
    .filter((line) => /^\d+\.\s/.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, "").replace(/\*\*/g, ""));

  return (
    <article className="py-12 md:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
          headline: post.title,
          description: post.metaDescription,
          image: `${SITE_URL}${OG_IMAGE}`,
          datePublished: post.publishedAt,
          dateModified: modified,
          author: authorPersonJsonLd(),
          publisher: {
            "@type": "Organization",
            name: "ilektronikatsigara.gr",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
          inLanguage: "el",
          keywords: post.keywords.join(", "),
        }}
      />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Αρχική", item: `${SITE_URL}/` },
          { name: "Blog", item: `${SITE_URL}/blog` },
          { name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }}
        />
      )}
      {howToSteps.length >= 3 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: post.title,
            description: post.metaDescription,
            step: howToSteps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
          }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumbs"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6"
        >
          <Link href="/" className="hover:text-primary">
            ΑΡΧΙΚΗ
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link href="/blog" className="hover:text-primary">
            BLOG
          </Link>
        </nav>

        <div className="mb-10">
          <span className="font-mono text-xs text-primary tracking-widest block mb-2 font-bold">
            {toGreekUppercase(post.category)} · {toGreekUppercase(post.readingTime + " λεπτά")} ·{" "}
            <time dateTime={modified}>{modified}</time>
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-balance">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Από{" "}
            <Link href="/sxetika" className="text-primary underline">
              {SITE_AUTHOR.name}
            </Link>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                {" "}
                · δημοσιεύθηκε <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              </>
            )}
          </p>
          <div className="rounded-md border border-border bg-surface p-5 mb-6 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Σύντομη απάντηση
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">{post.excerpt}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
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
                    </h2>,
                  );
                } else if (para.startsWith("### ")) {
                  elements.push(
                    <h3
                      key={`h3-${i}`}
                      className="text-xl font-extrabold tracking-tight mt-6 mb-2 text-foreground"
                    >
                      {para.replace(/^### /, "")}
                    </h3>,
                  );
                } else if (para.startsWith("| ")) {
                  const rows = para
                    .split("\n")
                    .filter((r) => r.trim().startsWith("|") && !/^\|\s*-/.test(r))
                    .map((r) =>
                      r
                        .split("|")
                        .slice(1, -1)
                        .map((c) => c.trim()),
                    );
                  const [head, ...body] = rows;
                  elements.push(
                    <div key={`t-${i}`} className="overflow-x-auto border border-border rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-surface">
                          <tr>
                            {head.map((h, k) => (
                              <th
                                key={k}
                                className="text-left font-bold px-3 py-2 border-b border-border"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {body.map((r, k) => (
                            <tr key={k} className="border-b border-border/60 last:border-0">
                              {r.map((c, m) => (
                                <td key={m} className="px-3 py-2 align-top">
                                  {renderInline(c)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>,
                  );
                } else {
                  elements.push(
                    <p key={`p-${i}`} className="leading-relaxed">
                      {renderInline(para)}
                    </p>,
                  );
                }

                if (i === 2 && inlineAdProduct) {
                  const label = priceLabel(inlineAdProduct);
                  elements.push(
                    <aside
                      key="inline-ad"
                      aria-label="Προτεινόμενο προϊόν"
                      className="my-8 border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-background rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm"
                    >
                      <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 aspect-square bg-surface border border-border rounded-xl flex items-center justify-center p-3">
                        {inlineAdProduct.image && (
                          <img
                            src={inlineAdProduct.image}
                            alt={inlineAdProduct.name}
                            width={160}
                            height={160}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 text-center md:text-left min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                          ΠΡΟΤΕΙΝΟΜΕΝΟ ΠΡΟΪΟΝ
                        </span>
                        <p className="text-lg font-extrabold mb-2 text-foreground">
                          <Link
                            href={`/proionta/${inlineAdProduct.slug}`}
                            className="hover:text-primary"
                          >
                            {inlineAdProduct.name}
                          </Link>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                          <span className="text-xl font-extrabold text-primary">
                            {label?.text ?? "Δείτε τιμή"}
                          </span>
                          <OutboundLink
                            href={productAffiliateUrl(inlineAdProduct, "blog_inline")}
                            placement="blog_inline"
                            product={{
                              id: inlineAdProduct.id,
                              name: inlineAdProduct.name,
                              brand: inlineAdProduct.brand,
                              category: inlineAdProduct.categorySlug,
                              price: inlineAdProduct.price,
                              inStock: inlineAdProduct.inStock,
                            }}
                            className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
                          >
                            ΑΓΟΡΑ ΣΤΟ Vape and More →
                          </OutboundLink>
                        </div>
                      </div>
                    </aside>,
                  );
                }

                return elements;
              })}

              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12 pt-10 border-t border-border">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-foreground">
                    Συχνές Ερωτήσεις (FAQ)
                  </h2>
                  <div className="space-y-4">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="font-bold text-foreground text-base mb-2">{faq.q}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {post.promotedCategory && (
              <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-primary/20 rounded-xl p-6 shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                  ΠΡΟΤΑΣΗ ΑΓΟΡΑΣ
                </span>
                <h2 className="text-lg font-extrabold mb-2 text-foreground">
                  {post.promotedCategory.label}
                </h2>
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

            {promotedProducts.length > 0 && (
              <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">
                  ΣΧΕΤΙΚΑ ΠΡΟΪΟΝΤΑ
                </span>
                <div className="space-y-4">
                  {promotedProducts.map((p) => {
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
            )}

            <div className="border border-border bg-card rounded-xl p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                ΧΡΕΙΑΖΕΣΤΕ ΒΟΗΘΕΙΑ;
              </span>
              <p className="text-sm font-extrabold mb-1">Τηλεφωνικές Παραγγελίες</p>
              <p className="text-xs text-muted-foreground mb-3">
                Επικοινωνήστε απευθείας με το φυσικό κατάστημα Vape and More για απορίες ή
                παραγγελίες.
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
