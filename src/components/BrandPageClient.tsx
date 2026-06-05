"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { applyFilters, type Product, type Brand } from "@/data/catalog";
import { ProductCard } from "./ProductCard";
import { buildListingQuery, type ListingSearchParams } from "@/lib/listing-search";

const PER_PAGE = 24;

export function BrandPageClient({
  brand,
  all,
  search,
}: {
  brand: Brand;
  all: Product[];
  search: ListingSearchParams;
}) {
  const router = useRouter();
  const basePath = `/marka/${brand.slug}`;

  const navigate = (updates: Partial<ListingSearchParams>) => {
    router.push(basePath + buildListingQuery(search, updates));
  };

  const filtered = applyFilters(all, {
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(search.page, totalPages);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <section className="py-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumbs" className="text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">
              Αρχική
            </Link>{" "}
            › <span className="text-foreground">Μάρκα: {brand.label}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{brand.label}</h1>
          <p className="text-muted-foreground mt-2">{all.length} προϊόντα</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <label className="text-xs flex items-center gap-2">
            <input
              type="checkbox"
              checked={search.instock === "1"}
              onChange={(e) => navigate({ instock: e.target.checked ? "1" : undefined, page: 1 })}
              className="accent-primary"
            />
            Μόνο διαθέσιμα
          </label>
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

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {slice.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="flex justify-center items-center gap-2 mt-10" aria-label="Pagination">
            <Link
              href={basePath + buildListingQuery(search, { page: Math.max(1, page - 1) })}
              className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary"
              style={page <= 1 ? { pointerEvents: "none", opacity: 0.4 } : undefined}
            >
              ← Προηγ.
            </Link>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Link
              href={basePath + buildListingQuery(search, { page: Math.min(totalPages, page + 1) })}
              className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary"
              style={page >= totalPages ? { pointerEvents: "none", opacity: 0.4 } : undefined}
            >
              Επόμ. →
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
