import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts, toCard, topLevelCategories } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Αναζήτηση προϊόντων",
  description:
    "Αναζητήστε ηλεκτρονικά τσιγάρα, υγρά, disposable vapes, snus, ναργιλέδες και αξεσουάρ από τη συλλογή της Vape and More.",
  robots: { index: false, follow: true },
};

const POPULAR = [
  "elf bar",
  "lost mary",
  "vaporesso xros",
  "velo",
  "zyn",
  "geekvape",
  "oxva",
  "flavorshot",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const q = (raw ?? "").trim().slice(0, 80);
  const results = q ? searchProducts(q, 48).map(toCard) : [];
  const tops = topLevelCategories().slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Αναζήτηση</h1>
      <p className="text-muted-foreground mb-6">
        Βρείτε προϊόν με όνομα, μάρκα ή κωδικό. Με ή χωρίς τόνους, ελληνικά ή λατινικά.
      </p>
      <form action="/anazitisi" method="get" role="search" className="flex gap-2 max-w-2xl">
        <label htmlFor="search-q" className="sr-only">
          Αναζήτηση προϊόντων
        </label>
        <input
          id="search-q"
          name="q"
          type="search"
          defaultValue={q}
          autoFocus
          autoComplete="off"
          placeholder="π.χ. Elf Bar, Vaporesso, ναργιλές, velo…"
          className="flex-1 min-w-0 border border-border rounded-lg px-4 py-3 bg-background text-base focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-primary text-primary-foreground px-4 rounded-lg font-bold uppercase tracking-widest text-xs"
        >
          Αναζήτηση
        </button>
      </form>

      {q ? (
        <p className="text-sm text-muted-foreground mt-4" aria-live="polite">
          {results.length === 0
            ? `Δεν βρέθηκαν αποτελέσματα για «${q}».`
            : `${results.length} αποτελέσματα για «${q}»`}
        </p>
      ) : (
        <div className="mt-6 flex flex-wrap gap-2">
          {POPULAR.map((term) => (
            <Link
              key={term}
              href={`/anazitisi?q=${encodeURIComponent(term)}`}
              className="text-xs font-bold border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary"
            >
              {term}
            </Link>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {q && results.length === 0 && (
        <div className="mt-8">
          <p className="text-sm font-bold mb-3">Δοκιμάστε μια κατηγορία:</p>
          <div className="flex flex-wrap gap-2">
            {tops.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="text-xs font-bold border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
