import Link from "next/link";
import type { ReactNode } from "react";
import type { CardProduct } from "@/data/catalog-types";
import { buildListingQuery, type ListingSearchParams } from "@/lib/listing-search";
import { toGreekUppercase } from "@/lib/utils";
import { ProductCard } from "../ProductCard";
import { ListingControls, SortSelect, type Facet } from "./ListingControls";

export interface Crumb {
  label: string;
  href?: string;
}

export interface Chip {
  label: string;
  href: string;
  count: number;
}

export interface ListingShellProps {
  h1: string;
  intro: string;
  breadcrumbs: Crumb[];
  chips?: Chip[];
  basePath: string;
  search: ListingSearchParams;
  facets: Facet[];
  showBrandFacet: boolean;
  cards: CardProduct[];
  total: number;
  inStockCount?: number;
  page: number;
  totalPages: number;
  /** Rendered after the grid (FAQ, guides, etc.). */
  children?: ReactNode;
}

function pageNumbers(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const set = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] - nums[i - 1] > 1) out.push("…");
    out.push(nums[i]);
  }
  return out;
}

export function Pagination({
  basePath,
  search,
  page,
  totalPages,
}: {
  basePath: string;
  search: ListingSearchParams;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const href = (p: number) => basePath + buildListingQuery(search, { page: p });
  const btn =
    "inline-flex min-w-9 h-9 items-center justify-center px-3 text-xs font-bold border border-border rounded hover:border-primary hover:text-primary transition-colors";
  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-10"
      aria-label="Σελιδοποίηση"
    >
      {page > 1 ? (
        <Link href={href(page - 1)} className={btn} rel="prev">
          ← Προηγ.
        </Link>
      ) : (
        <span className={`${btn} opacity-40 pointer-events-none`}>← Προηγ.</span>
      )}
      {pageNumbers(page, totalPages).map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : n === page ? (
          <span
            key={n}
            aria-current="page"
            className={`${btn} bg-primary text-primary-foreground border-primary`}
          >
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)} className={btn}>
            {n}
          </Link>
        ),
      )}
      {page < totalPages ? (
        <Link href={href(page + 1)} className={btn} rel="next">
          Επόμ. →
        </Link>
      ) : (
        <span className={`${btn} opacity-40 pointer-events-none`}>Επόμ. →</span>
      )}
    </nav>
  );
}

export function ListingShell(props: ListingShellProps) {
  const {
    h1,
    intro,
    breadcrumbs,
    chips,
    basePath,
    search,
    facets,
    showBrandFacet,
    cards,
    total,
    inStockCount,
    page,
    totalPages,
    children,
  } = props;

  const activeFilters = search.brand.length + (search.instock === "1" ? 1 : 0);

  return (
    <>
      <section className="relative py-8 md:py-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumbs" className="text-xs text-muted-foreground mb-4">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>›</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance">{h1}</h1>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            {total} προϊόντα
            {inStockCount != null && inStockCount < total
              ? ` · ${inStockCount} άμεσα διαθέσιμα`
              : ""}
          </p>
          {intro && (
            <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed line-clamp-3 md:line-clamp-none">
              {intro}
            </p>
          )}
          {chips && chips.length > 0 && (
            <nav
              aria-label="Υποκατηγορίες"
              className="relative z-10 mt-6 flex flex-wrap gap-x-2 gap-y-2"
            >
              {chips.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex min-h-9 items-center text-xs font-bold tracking-widest border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  {toGreekUppercase(s.label)}{" "}
                  <span className="text-muted-foreground font-mono ml-1">({s.count})</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block" aria-label="Φίλτρα">
          <ListingControls
            basePath={basePath}
            search={search}
            facets={facets}
            showBrandFacet={showBrandFacet}
            idPrefix="desk"
          />
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <details className="lg:hidden group">
              <summary className="list-none cursor-pointer inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-border rounded-full px-4 py-2 hover:border-primary">
                Φίλτρα{activeFilters > 0 ? ` (${activeFilters})` : ""}
                <span
                  className="text-primary group-open:rotate-45 transition-transform"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="absolute left-0 right-0 z-20 mt-2 mx-6 bg-background border border-border rounded-lg p-5 shadow-xl">
                <ListingControls
                  basePath={basePath}
                  search={search}
                  facets={facets}
                  showBrandFacet={showBrandFacet}
                  idPrefix="mob"
                />
              </div>
            </details>
            <span className="hidden lg:inline text-xs text-muted-foreground">
              Σελίδα {page} από {totalPages}
            </span>
            <SortSelect basePath={basePath} search={search} id="sort" />
          </div>

          {cards.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              Δεν βρέθηκαν προϊόντα με τα επιλεγμένα φίλτρα.{" "}
              <Link href={basePath} className="text-primary font-bold underline">
                Καθαρισμός φίλτρων
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {cards.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 2} />
              ))}
            </div>
          )}

          <Pagination basePath={basePath} search={search} page={page} totalPages={totalPages} />
        </div>
      </div>
      {children}
    </>
  );
}
