"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { applyFilters, brandsInProducts, type Product, type Category } from "@/data/catalog";
import { categoryDescription, faqsForCategory } from "@/data/faqs-generated";
import { ProductCard } from "./ProductCard";
import { FaqSection } from "./FaqSection";
import { buildListingQuery, type ListingSearchParams } from "@/lib/listing-search";

const PER_PAGE = 24;

export function SubcategoryPageClient({
  parent,
  sub,
  all,
  subs,
  search,
}: {
  parent: Category;
  sub: Category;
  all: Product[];
  subs: Category[];
  search: ListingSearchParams;
}) {
  const router = useRouter();
  const basePath = `/${parent.slug}/${sub.slug}`;

  const navigate = (updates: Partial<ListingSearchParams>) => {
    router.push(basePath + buildListingQuery(search, updates));
  };

  const filtered = applyFilters(all, {
    brand: search.brand,
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(search.page, totalPages);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const brandList = brandsInProducts(all).slice(0, 12);

  return (
    <>
      <section className="relative py-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumbs" className="text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">
              Αρχική
            </Link>{" "}
            ›{" "}
            <Link href={`/${parent.slug}`} className="hover:text-primary">
              {parent.label}
            </Link>{" "}
            › <span className="text-foreground">{sub.label}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{sub.label}</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            {categoryDescription(sub.slug)}
          </p>
          {subs.length > 0 && (
            <nav
              aria-label="Υποκατηγορίες"
              className="relative z-10 mt-6 flex flex-wrap gap-x-2 gap-y-2"
            >
              {subs.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${parent.slug}/${s.slug}`}
                  className="inline-flex min-h-9 items-center text-xs font-bold uppercase tracking-widest border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  {s.label}{" "}
                  <span className="text-muted-foreground font-mono ml-1">({s.count})</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Διαθεσιμότητα
            </h2>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={search.instock === "1"}
                onChange={(e) => navigate({ instock: e.target.checked ? "1" : undefined, page: 1 })}
                className="accent-primary"
              />
              Μόνο διαθέσιμα
            </label>
          </div>

          {brandList.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Μάρκα
              </h2>
              <ul className="space-y-1.5">
                {brandList.map((b) => {
                  const active = search.brand.includes(b.slug);
                  return (
                    <li key={b.slug}>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...search.brand, b.slug]
                              : search.brand.filter((s) => s !== b.slug);
                            navigate({ brand: next, page: 1 });
                          }}
                          className="accent-primary"
                        />
                        <span className="flex-1">{b.label}</span>
                        <span className="text-xs text-muted-foreground font-mono">{b.count}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-muted-foreground">
              Σελίδα {page} από {totalPages}
            </span>
            <label className="text-xs flex items-center gap-2">
              Ταξινόμηση:
              <select
                value={search.sort}
                onChange={(e) =>
                  navigate({
                    sort: e.target.value as ListingSearchParams["sort"],
                    page: 1,
                  })
                }
                className="border border-border rounded px-2 py-1 bg-background"
              >
                <option value="relevance">Προτεινόμενα</option>
                <option value="price-asc">Τιμή: αύξουσα</option>
                <option value="price-desc">Τιμή: φθίνουσα</option>
                <option value="newest">Νεότερα</option>
              </select>
            </label>
          </div>

          {slice.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              Δεν βρέθηκαν προϊόντα με τα επιλεγμένα φίλτρα.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {slice.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mt-10" aria-label="Pagination">
              <Link
                href={basePath + buildListingQuery(search, { page: Math.max(1, page - 1) })}
                aria-disabled={page <= 1}
                className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary disabled:opacity-40"
                style={page <= 1 ? { pointerEvents: "none", opacity: 0.4 } : undefined}
              >
                ← Προηγ.
              </Link>
              <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Link
                href={
                  basePath + buildListingQuery(search, { page: Math.min(totalPages, page + 1) })
                }
                aria-disabled={page >= totalPages}
                className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary"
                style={page >= totalPages ? { pointerEvents: "none", opacity: 0.4 } : undefined}
              >
                Επόμ. →
              </Link>
            </nav>
          )}
        </div>
      </div>
      <FaqSection faqs={faqsForCategory(sub.slug)} />
    </>
  );
}
