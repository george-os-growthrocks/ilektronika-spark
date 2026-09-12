"use client";

import { useRouter } from "next/navigation";
import { buildListingQuery, type ListingSearchParams } from "@/lib/listing-search";

export interface Facet {
  slug: string;
  label: string;
  count: number;
}

interface ControlsProps {
  basePath: string;
  search: ListingSearchParams;
  facets: Facet[];
  showBrandFacet: boolean;
  idPrefix: string;
}

/** Availability + brand filters. Small client island: it only knows the current query, not the products. */
export function ListingControls({
  basePath,
  search,
  facets,
  showBrandFacet,
  idPrefix,
}: ControlsProps) {
  const router = useRouter();
  const navigate = (updates: Partial<ListingSearchParams>) => {
    router.push(basePath + buildListingQuery(search, updates), { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          ΔΙΑΘΕΣΙΜΟΤΗΤΑ
        </p>
        <label
          htmlFor={`${idPrefix}-instock`}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            id={`${idPrefix}-instock`}
            type="checkbox"
            checked={search.instock === "1"}
            onChange={(e) => navigate({ instock: e.target.checked ? "1" : undefined, page: 1 })}
            className="accent-primary"
          />
          Μόνο διαθέσιμα
        </label>
      </div>

      {showBrandFacet && facets.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            ΜΑΡΚΑ
          </p>
          <ul className="space-y-1.5">
            {facets.map((b) => {
              const active = search.brand.includes(b.slug);
              const id = `${idPrefix}-brand-${b.slug}`;
              return (
                <li key={b.slug}>
                  <label htmlFor={id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      id={id}
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
    </div>
  );
}

export function SortSelect({
  basePath,
  search,
  id,
}: {
  basePath: string;
  search: ListingSearchParams;
  id: string;
}) {
  const router = useRouter();
  return (
    <label htmlFor={id} className="text-xs flex items-center gap-2">
      Ταξινόμηση:
      <select
        id={id}
        value={search.sort}
        onChange={(e) =>
          router.push(
            basePath +
              buildListingQuery(search, {
                sort: e.target.value as ListingSearchParams["sort"],
                page: 1,
              }),
            { scroll: false },
          )
        }
        className="border border-border rounded px-2 py-1 bg-background"
      >
        <option value="relevance">Προτεινόμενα</option>
        <option value="price-asc">Τιμή: αύξουσα</option>
        <option value="price-desc">Τιμή: φθίνουσα</option>
        <option value="newest">Νεότερα</option>
      </select>
    </label>
  );
}
