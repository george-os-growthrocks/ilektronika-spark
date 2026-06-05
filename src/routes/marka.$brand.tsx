import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import {
  applyFilters,
  brandBySlug,
  brandsInProducts,
  productsByBrand,
} from "../data/catalog";
import { ProductCard } from "../components/ProductCard";

const searchSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  instock: z.union([z.literal("1"), z.literal("0")]).optional(),
  sort: z
    .enum(["relevance", "price-asc", "price-desc", "newest"])
    .optional()
    .default("relevance"),
});
const PER_PAGE = 24;

export const Route = createFileRoute("/marka/$brand")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const brand = brandBySlug(params.brand);
    if (!brand) throw notFound();
    const all = productsByBrand(brand.slug);
    return { brand, all };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { brand, all } = loaderData;
    const title = `${brand.label} — ${all.length} προϊόντα | ilektronikatsigara.gr`;
    const description = `Συλλογή ${brand.label} από Vape and More. ${all.length} προϊόντα με ταχεία αποστολή σε όλη την Ελλάδα.`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 160) },
        { property: "og:url", content: `/marka/${brand.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://vapeandmore.gr/brand/${brand.slug}/` }],
    };
  },
  component: BrandPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Η μάρκα δεν βρέθηκε</h1>
      <Link to="/" className="text-primary font-bold underline">Επιστροφή στην αρχική</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Κάτι πήγε στραβά</h1>
    </div>
  ),
});

function BrandPage() {
  const { brand, all } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = applyFilters(all, {
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(search.page ?? 1, totalPages);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  void brandsInProducts; // helper exported for reuse

  return (
    <>
      <section className="py-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumbs" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Αρχική</Link> ›{" "}
            <span className="text-foreground">Μάρκα: {brand.label}</span>
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
              onChange={(e) =>
                navigate({
                  search: (s) => ({ ...s, instock: e.target.checked ? "1" : undefined, page: 1 }),
                })
              }
              className="accent-primary"
            />
            Μόνο διαθέσιμα
          </label>
          <label className="text-xs flex items-center gap-2">
            Ταξινόμηση:
            <select
              value={search.sort}
              onChange={(e) =>
                navigate({ search: (s) => ({ ...s, sort: e.target.value as "relevance" | "price-asc" | "price-desc" | "newest", page: 1 }) })
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
              to="/marka/$brand"
              params={{ brand: brand.slug }}
              search={(s) => ({ ...s, page: Math.max(1, page - 1) })}
              disabled={page <= 1}
              className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary disabled:opacity-40 disabled:pointer-events-none"
            >
              ← Προηγ.
            </Link>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Link
              to="/marka/$brand"
              params={{ brand: brand.slug }}
              search={(s) => ({ ...s, page: Math.min(totalPages, page + 1) })}
              disabled={page >= totalPages}
              className="px-3 py-2 text-xs font-bold border border-border rounded hover:border-primary disabled:opacity-40 disabled:pointer-events-none"
            >
              Επόμ. →
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
