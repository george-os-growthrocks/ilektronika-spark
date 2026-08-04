import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, topLevelCategories } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { blogPosts } from "@/data/blog";
import { generalFaqs } from "@/data/faqs";
import { toGreekUppercase } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: {
    absolute:
      "Ηλεκτρονικά Τσιγάρα Ελλάδα | Disposables, Υγρά & Vape · ilektronikatsigara.gr",
  },
  description:
    "Κατάλογος 1000+ ηλεκτρονικών τσιγάρων, υγρών αναπλήρωσης, disposables και ναργιλέδων. Τιμές & αγορά online μέσω Vape and More · Ρέθυμνο, αποστολή σε όλη την Ελλάδα. 18+.",
  openGraph: {
    title: "Ηλεκτρονικά Τσιγάρα · Πλήρης Κατάλογος Ελλάδα | ilektronikatsigara.gr",
    description:
      "1000+ προϊόντα ατμίσματος: disposables, pod systems, υγρά, ναργιλέδες. Επιλέγετε εδώ, αγοράζετε από Vape and More.",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ηλεκτρονικά Τσιγάρα Ελλάδα | ilektronikatsigara.gr",
    description:
      "1000+ προϊόντα ατμίσματος με τιμές και άμεση αποστολή από Vape and More.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = products.filter((p) => p.inStock && p.images.length > 0).slice(0, 8);
  const tops = topLevelCategories().slice(0, 8);
  const latestPosts = blogPosts.slice(0, 3);
  const faqTeaser = generalFaqs.slice(0, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(faqTeaser)} />

      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="font-mono text-xs text-primary mb-4 block uppercase tracking-widest">
              POWERED BY VAPE AND MORE · ΡΕΘΥΜΝΟ
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6 text-balance">
              Ο πλήρης κατάλογος για <span className="text-primary">ηλεκτρονικά τσιγάρα</span>.
            </h1>
            <p className="max-w-[55ch] text-lg text-muted-foreground mb-8 leading-relaxed">
              {products.length} προϊόντα - disposable vapes, pod systems, υγρά αναπλήρωσης,
              ναργιλέδες, καπνοί και αξεσουάρ. Επιλέγετε εδώ, αγοράζετε από το επίσημο κατάστημα{" "}
              <strong className="text-foreground">vapeandmore.gr</strong>. Μόνο για ενήλικες 18+.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/katigories"
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm rounded hover:opacity-90 transition-opacity"
              >
                ΟΛΕΣ ΟΙ ΚΑΤΗΓΟΡΙΕΣ →
              </Link>
              <Link
                href="/anazitisi"
                className="inline-flex items-center border border-foreground text-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm rounded hover:bg-foreground hover:text-background transition-colors"
              >
                ΑΝΑΖΗΤΗΣΗ
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((p, i) => (
              <Link
                key={p.slug}
                href={`/proionta/${p.slug}`}
                className="relative aspect-square bg-surface border border-border rounded overflow-hidden hover:border-primary transition-colors"
              >
                {p.images[0] && (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className="object-contain p-3"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Κατηγορίες</h2>
            <Link
              href="/katigories"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              ΔΕΙΤΕ ΟΛΕΣ →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tops.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group bg-background border border-border rounded-lg p-5 hover:border-primary transition-colors"
              >
                <h3 className="font-extrabold tracking-tight group-hover:text-primary transition-colors">
                  {cat.label}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {cat.count} προϊόντα
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8">
            Δημοφιλή προϊόντα
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Οδηγοί & Άρθρα</h2>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-primary">
              ΟΛΑ →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-background border border-border rounded p-6 hover:border-primary transition-colors group"
              >
                <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">
                  {toGreekUppercase(post.category)} · {toGreekUppercase(post.readingTime + " λεπτά")}
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

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 text-center">
            Συχνές Ερωτήσεις
          </h2>
          <div className="space-y-3">
            {faqTeaser.map((f, i) => (
              <details key={i} className="bg-surface border border-border rounded p-5 group">
                <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
                  <span className="pr-4">{f.q}</span>
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/syxnes-erotiseis"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              ΟΛΕΣ ΟΙ ΕΡΩΤΗΣΕΙΣ →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
