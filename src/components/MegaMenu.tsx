import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  topLevelCategories,
  subcategoriesOf,
  productsInCategory,
  formatPrice,
  effectivePrice,
  productImage,
  type Product,
  type Category,
} from "../data/catalog";
import { categoryMeta, type BadgeKind } from "../data/category-meta";

const BADGE_COLORS: Record<BadgeKind, string> = {
  HOT: "bg-red-500 text-white",
  NEW: "bg-emerald-500 text-white",
  SALE: "bg-amber-500 text-black",
  TOP: "bg-primary text-primary-foreground",
  DEAL: "bg-secondary text-secondary-foreground",
};

function Badge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={`ml-1.5 text-[9px] font-extrabold tracking-wider px-1.5 py-[1px] rounded-sm ${BADGE_COLORS[kind]}`}
    >
      {kind}
    </span>
  );
}

function featuredProducts(catSlug: string): Product[] {
  return productsInCategory(catSlug)
    .filter((p) => p.inStock && p.images.length > 0)
    .sort((a, b) => (effectivePrice(b) ?? 0) - (effectivePrice(a) ?? 0))
    .slice(0, 3);
}

export function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <nav className="hidden xl:flex items-stretch justify-end gap-0 text-xs font-bold uppercase tracking-wider">
      {categories.map((c) => {
        const meta = categoryMeta(c.slug);
        const isOpen = open === c.slug;
        const subs = subcategoriesOf(c.slug);
        const featured = featuredProducts(c.slug);

        return (
          <div
            key={c.slug}
            className="relative flex items-stretch"
            onMouseEnter={() => {
              cancelClose();
              setOpen(c.slug);
            }}
            onMouseLeave={scheduleClose}
          >
            <Link
              to="/$category"
              params={{ category: c.slug }}
              className={`flex h-full items-center gap-1 px-2.5 2xl:px-3 hover:text-primary transition-colors whitespace-nowrap ${
                isOpen ? "text-primary" : ""
              }`}
            >
              {c.label}
              {meta.badge && <Badge kind={meta.badge} />}
              {subs.length > 0 && (
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              )}
            </Link>

            {isOpen && subs.length > 0 && (
              <div
                className="absolute right-0 top-full z-50 pt-3"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="bg-background border border-border shadow-2xl rounded-md w-[760px] max-w-[92vw] grid grid-cols-12 gap-6 p-6">
                  {/* Subcategories */}
                  <div className="col-span-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      Υποκατηγορίες
                    </div>
                    <ul className="space-y-1.5 max-h-80 overflow-y-auto pr-2">
                      {subs.slice(0, 14).map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/$category/$subcategory"
                            params={{ category: c.slug, subcategory: s.slug }}
                            className="flex items-center justify-between gap-2 text-xs font-semibold normal-case tracking-normal text-foreground hover:text-primary py-1"
                            onClick={() => setOpen(null)}
                          >
                            <span>{s.label}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {s.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {meta.intro && (
                      <p className="text-[11px] normal-case tracking-normal text-muted-foreground leading-relaxed mt-4 border-t border-border pt-3">
                        {meta.intro.slice(0, 140)}…
                      </p>
                    )}
                  </div>

                  {/* Featured products */}
                  <div className="col-span-7">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between">
                      <span>Δημοφιλή</span>
                      <Link
                        to="/$category"
                        params={{ category: c.slug }}
                        className="text-primary hover:underline normal-case"
                        onClick={() => setOpen(null)}
                      >
                        Όλα →
                      </Link>
                    </div>
                    {featured.length > 0 ? (
                      <ul className="grid grid-cols-3 gap-3">
                        {featured.map((p) => (
                          <li key={p.id}>
                            <Link
                              to="/proionta/$slug"
                              params={{ slug: p.slug }}
                              className="block group"
                              onClick={() => setOpen(null)}
                            >
                              <div className="aspect-square bg-surface border border-border rounded overflow-hidden mb-2 grid place-items-center">
                                <img
                                  src={productImage(p)}
                                  alt={p.name}
                                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                                  loading="lazy"
                                />
                              </div>
                              <div className="text-[11px] font-semibold normal-case tracking-normal leading-tight line-clamp-2 text-foreground group-hover:text-primary">
                                {p.name}
                              </div>
                              <div className="text-xs font-extrabold text-primary mt-1">
                                {formatPrice(effectivePrice(p))}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-muted-foreground normal-case">
                        Δείτε όλα τα προϊόντα της κατηγορίας.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <Link
        to="/katigories"
        className="flex items-center px-3 hover:text-primary transition-colors whitespace-nowrap text-muted-foreground"
      >
        Όλες →
      </Link>
    </nav>
  );
}
