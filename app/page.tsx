import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  bestSellers,
  brands,
  categoryHeroImage,
  products,
  toCard,
  topLevelCategories,
} from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { OutboundLink } from "@/components/OutboundLink";
import { blogPosts } from "@/data/blog";
import { generalFaqs } from "@/data/faqs";
import { toGreekUppercase } from "@/lib/utils";
import { storeUrl } from "@/lib/affiliate";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/FaqSection";
import { OG_IMAGE, OG_IMAGE_META } from "@/lib/seo";

const TITLE = "Ηλεκτρονικό Τσιγάρο: Τιμές, Kits, Υγρά & Disposables Ελλάδα";
const DESCRIPTION =
  "Ηλεκτρονικό τσιγάρο σε τιμές Ελλάδας: 1.070 pod kits, disposables, υγρά αναπλήρωσης, snus & ναργιλέδες. Σύγκριση εδώ, αγορά από Vape and More με αποστολή 1-3 ημέρες. 18+.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [OG_IMAGE_META],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: { canonical: "/" },
};

const USPS = [
  { k: "Δωρεάν αποστολή", v: "για παραγγελίες από 30€" },
  { k: "Αυθημερόν αποστολή", v: "για παραγγελίες έως 14:00" },
  { k: "Αυθεντικά προϊόντα", v: "από επίσημους διανομείς" },
  { k: "Φυσικό κατάστημα", v: "Αρκαδίου 82, Ρέθυμνο" },
];

const QUICK_GUIDE = [
  {
    title: "Θέλω κάτι έτοιμο, χωρίς συντήρηση",
    body: "Ένα disposable με 600–2.000 puffs και nicotine salts 20mg είναι η πιο απλή αρχή: ανοίγεις, ατμίζεις, πετάς. Ιδανικό για δοκιμή ή για το ταξίδι.",
    href: "/disposables",
    cta: "Disposables",
  },
  {
    title: "Θέλω να κόψω το τσιγάρο οριστικά",
    body: "Ένα pod system με αντικαταστάσιμα pods κοστίζει 20–40€, γεμίζει με το υγρό που διαλέγεις και βγαίνει πολύ φθηνότερο τον μήνα από τα disposables.",
    href: "/syskeyes-vape",
    cta: "Pod systems & kits",
  },
  {
    title: "Ήδη ατμίζω, ψάχνω υγρά και αντιστάσεις",
    body: "477 υγρά αναπλήρωσης (flavorshots, nic salts, βάσεις) και 128 αντιστάσεις για τις δημοφιλείς συσκευές, με φίλτρα ανά μάρκα και διαθεσιμότητα.",
    href: "/ygra-anaplirosis",
    cta: "Υγρά αναπλήρωσης",
  },
];

export default function HomePage() {
  const featured = bestSellers(8).map(toCard);
  const heroTiles = featured.slice(0, 4);
  const tops = topLevelCategories().slice(0, 8);
  const latestPosts = blogPosts.slice(0, 3);
  const faqTeaser = generalFaqs.slice(0, 4);
  const totalProducts = products.length;
  const totalBrands = brands.length;
  const inStock = products.filter((p) => p.inStock).length;

  return (
    <>
      <JsonLd data={faqJsonLd(faqTeaser)} />

      <section className="pt-12 md:pt-16 pb-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="font-mono text-xs text-primary mb-4 block uppercase tracking-widest">
              ΚΑΤΑΛΟΓΟΣ VAPE AND MORE · ΡΕΘΥΜΝΟ · ΑΠΟΣΤΟΛΗ ΣΕ ΟΛΗ ΤΗΝ ΕΛΛΑΔΑ
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6 text-balance">
              <span className="text-primary">Ηλεκτρονικό τσιγάρο</span>: ο πλήρης ελληνικός
              κατάλογος.
            </h1>
            <p className="max-w-[58ch] text-lg text-muted-foreground mb-6 leading-relaxed">
              {totalProducts.toLocaleString("el-GR")} προϊόντα από {totalBrands} μάρκες: pod kits,
              disposable vapes, υγρά αναπλήρωσης, snus, ναργιλέδες και αντιστάσεις, με τιμές και
              διαθεσιμότητα. Συγκρίνετε εδώ και ολοκληρώστε την αγορά στο επίσημο κατάστημα{" "}
              <strong className="text-foreground">vapeandmore.gr</strong>. Μόνο για ενήλικες 18+.
            </p>
            <ul
              className="flex flex-wrap gap-2 mb-8"
              aria-label="Γιατί να αγοράσετε από το Vape and More"
            >
              {USPS.map((u) => (
                <li
                  key={u.k}
                  className="inline-flex items-baseline gap-1.5 text-xs border border-border rounded-full px-3 py-1.5 bg-surface"
                >
                  <span className="font-bold">{u.k}</span>
                  <span className="text-muted-foreground">{u.v}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/syskeyes-vape"
                className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm rounded hover:opacity-90 transition-opacity"
              >
                ΗΛΕΚΤΡΟΝΙΚΑ ΤΣΙΓΑΡΑ & KITS →
              </Link>
              <Link
                href="/disposables"
                className="inline-flex items-center border border-foreground text-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm rounded hover:bg-foreground hover:text-background transition-colors"
              >
                DISPOSABLES
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {heroTiles.map((p, i) => (
              <Link
                key={p.slug}
                href={`/proionta/${p.slug}`}
                className="group relative aspect-square bg-surface border border-border rounded overflow-hidden hover:border-primary transition-colors"
              >
                {p.image && (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className="object-contain p-3"
                  />
                )}
                <span className="absolute inset-x-0 bottom-0 bg-background/90 backdrop-blur px-2 py-1.5 text-[11px] font-semibold leading-tight line-clamp-1 border-t border-border">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
            Ποιο ηλεκτρονικό τσιγάρο σας ταιριάζει;
          </h2>
          <p className="text-muted-foreground max-w-3xl mb-8 leading-relaxed">
            Τρεις διαδρομές, ανάλογα με το πού βρίσκεστε. Αν δεν είστε σίγουροι, ο{" "}
            <Link href="/blog/odigos-arxarion-vape-2026" className="text-primary underline">
              οδηγός αρχαρίων
            </Link>{" "}
            εξηγεί τύπους συσκευών, νικοτίνη και MTL/DTL σε δέκα λεπτά.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {QUICK_GUIDE.map((g) => (
              <article
                key={g.href}
                className="bg-background border border-border rounded-lg p-6 flex flex-col"
              >
                <h3 className="text-lg font-extrabold tracking-tight mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{g.body}</p>
                <Link
                  href={g.href}
                  className="mt-5 inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary"
                >
                  {g.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
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
            {tops.map((cat) => {
              const img = categoryHeroImage(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors flex flex-col"
                >
                  <div className="relative aspect-[5/3] bg-surface">
                    {img && (
                      <Image
                        src={img}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold tracking-tight group-hover:text-primary transition-colors">
                      {cat.label}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {cat.count} προϊόντα
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Δημοφιλή προϊόντα
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Διαθέσιμα τώρα, από τις μάρκες που ζητούν περισσότερο οι πελάτες του καταστήματος.
              </p>
            </div>
            <Link
              href="/katigories"
              className="text-xs font-bold uppercase tracking-widest text-primary shrink-0"
            >
              ΟΛΑ →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <span className="font-mono text-xs text-primary mb-3 block uppercase tracking-widest">
              ΤΟ ΚΑΤΑΣΤΗΜΑ
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
              Γιατί Vape and More
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ο κατάλογος ανήκει στο Vape and More, φυσικό κατάστημα στην Αρκαδίου 82 στο Ρέθυμνο,
              με πανελλαδικές αποστολές. Κάθε προϊόν εδώ αντιστοιχεί σε πραγματικό απόθεμα:{" "}
              {inStock.toLocaleString("el-GR")} από τα {totalProducts.toLocaleString("el-GR")} είδη
              είναι άμεσα διαθέσιμα σήμερα.
            </p>
            <div className="flex flex-wrap gap-3">
              <OutboundLink
                href={storeUrl("home_trust")}
                placement="home_trust"
                className="inline-flex items-center bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-widest text-xs rounded hover:opacity-90 transition-opacity"
              >
                vapeandmore.gr ↗
              </OutboundLink>
              <a
                href="tel:+302831181046"
                className="inline-flex items-center border border-border px-5 py-3 font-bold uppercase tracking-widest text-xs rounded hover:border-primary hover:text-primary transition-colors"
              >
                📞 2831 181 046
              </a>
            </div>
          </div>
          <dl className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              ["Παράδοση 1–3 εργάσιμες", "ACS / ΕΛΤΑ Courier σε όλη την Ελλάδα, νησιά 2–4 ημέρες."],
              [
                "Δωρεάν μεταφορικά από 30€",
                "Και αποστολή αυθημερόν για παραγγελίες πριν τις 14:00.",
              ],
              [
                "Επίσημοι διανομείς",
                "Vaporesso, Voopoo, GeekVape, Oxva, Elf Bar, Lost Mary, Velo, Zyn.",
              ],
              [
                "Επιστροφές 14 ημερών",
                "Σε σφραγισμένα προϊόντα, με εγγύηση κατασκευαστή στις συσκευές.",
              ],
            ].map(([k, v]) => (
              <div key={k} className="border border-border rounded-lg p-5 bg-card">
                <dt className="font-extrabold tracking-tight mb-1">{k}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
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
                  {toGreekUppercase(post.category)} ·{" "}
                  {toGreekUppercase(post.readingTime + " λεπτά")}
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
                  <span
                    className="text-primary text-xl group-open:rotate-45 transition-transform"
                    aria-hidden
                  >
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
