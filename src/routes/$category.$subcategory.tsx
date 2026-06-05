import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import {
  applyFilters,
  brandsInProducts,
  categoryBySlug,
  productsInCategory,
  subcategoriesOf,
} from "../data/catalog";
import { ProductCard } from "../components/ProductCard";

const searchSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  brand: z.union([z.string(), z.array(z.string())]).optional(),
  instock: z.union([z.literal("1"), z.literal("0")]).optional(),
  sort: z
    .enum(["relevance", "price-asc", "price-desc", "newest"])
    .optional()
    .default("relevance"),
});

const PER_PAGE = 24;

export const Route = createFileRoute("/$category/$subcategory")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const parent = categoryBySlug(params.category);
    const sub = categoryBySlug(params.subcategory);
    if (!parent || !sub) throw notFound();
    if (sub.parentSlug !== parent.slug && sub.ancestors.every((a) => a.slug !== parent.slug)) {
      throw notFound();
    }
    const all = productsInCategory(sub.slug);
    const subs = subcategoriesOf(sub.slug);
    return { parent, sub, all, subs };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { parent, sub, all } = loaderData;
    const title = `${sub.label} — ${parent.label} | ilektronikatsigara.gr`;
    const description = `${sub.label}: ${all.length} προϊόντα από Vape and More. Δείτε διαθεσιμότητα και τιμές με αποστολή σε όλη την Ελλάδα.`;
    const canonical = `https://vapeandmore.gr/product-category/${params.category}/${params.subcategory}/`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 160) },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: SubcategoryPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Η κατηγορία δεν βρέθηκε</h1>
      <Link to="/" className="text-primary font-bold underline">
        Επιστροφή στην αρχική
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Κάτι πήγε στραβά</h1>
    </div>
  ),
});

function SubcategoryPage() {
  const { parent, sub, all, subs } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const selectedBrands = !search.brand
    ? []
    : Array.isArray(search.brand)
      ? search.brand
      : [search.brand];

  const filtered = applyFilters(all, {
    brand: selectedBrands,
    inStockOnly: search.instock === "1",
    sort: search.sort,
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(search.page ?? 1, totalPages);
  const slice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const brandList = brandsInProducts(all).slice(0, 12);

  return (
    <>
      <section className="py-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumbs" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary">Αρχική</Link> ›{" "}
            <Link to="/$category" params={{ category: parent.slug }} className="hover:text-primary">
              {parent.label}
            </Link>{" "}
            › <span className="text-foreground">{sub.label}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {sub.label}
          </h1>
          <p className="text-muted-foreground mt-2">
            {all.length} προϊόντα · {filtered.length} εμφανίζονται με τα τρέχοντα φίλτρα
          </p>
          {subs.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {subs.map((s: any) => (
                <Link
                  key={s.slug}
                  to="/$category/$subcategory"
                  params={{ category: parent.slug, subcategory: s.slug }}
                  className="text-xs font-bold uppercase tracking-widest border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  {s.label} <span className="text-muted-foreground font-mono ml-1">({s.count})</span>
                </Link>
              ))}
            </div>
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
                onChange={(e) =>
                  navigate({
                    search: (s: any) => ({ ...s, instock: e.target.checked ? "1" : undefined, page: 1 }),
                  })
                }
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
                  const active = selectedBrands.includes(b.slug);
                  return (
                    <li key={b.slug}>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...selectedBrands, b.slug]
                              : selectedBrands.filter((s: string) => s !== b.slug);
                            navigate({
                              search: (s: any) => ({
                                ...s,
                                brand: next.length === 0 ? undefined : next.length === 1 ? next[0] : next,
                                page: 1,
                              }),
                            });
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
                    search: (s: any) => ({ ...s, sort: e.target.value as "relevance" | "price-asc" | "price-desc" | "newest", page: 1 }),
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
        </div>
      </div>
    </>
  );
}
