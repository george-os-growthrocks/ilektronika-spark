import type { Metadata } from "next";
import Link from "next/link";
import { brands, categories } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Όλες οι κατηγορίες",
  description:
    "Δείτε όλες τις κατηγορίες προϊόντων: ηλεκτρονικά τσιγάρα, disposable vapes, υγρά αναπλήρωσης, ναργιλέδες, αξεσουάρ και περισσότερα.",
  openGraph: {
    title: "Όλες οι κατηγορίες | ilektronikatsigara.gr",
    url: "/katigories",
  },
  alternates: { canonical: "https://vapeandmore.gr/product-category/" },
};

export default function CategoriesHubPage() {
  const tops = categories.filter((c) => c.depth === 0);
  const subsByParent = new Map<string, typeof categories>();
  for (const c of categories) {
    if (c.parentSlug) {
      if (!subsByParent.has(c.parentSlug)) subsByParent.set(c.parentSlug, []);
      subsByParent.get(c.parentSlug)!.push(c);
    }
  }
  const topBrands = brands.slice(0, 24);

  return (
    <>
      <section className="py-12 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Όλες οι κατηγορίες</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Περιηγηθείτε σε ολόκληρο τον κατάλογο της Vape and More — από ηλεκτρονικά τσιγάρα μέχρι
            αξεσουάρ ναργιλέ.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tops.map((cat) => (
          <div key={cat.slug} className="border border-border rounded-lg p-5 bg-card">
            <Link href={`/${cat.slug}`} className="block mb-3 group">
              <h2 className="text-xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
                {cat.label}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">{cat.count} προϊόντα</span>
            </Link>
            <ul className="space-y-1 text-sm">
              {(subsByParent.get(cat.slug) ?? []).slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${cat.slug}/${s.slug}`}
                    className="hover:text-primary text-muted-foreground"
                  >
                    {s.label} <span className="text-xs font-mono">({s.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">Δημοφιλείς μάρκες</h2>
        <div className="flex flex-wrap gap-2">
          {topBrands.map((b) => (
            <Link
              key={b.slug}
              href={`/marka/${b.slug}`}
              className="text-sm font-bold border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
            >
              {b.label} <span className="text-muted-foreground font-mono ml-1">({b.count})</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
