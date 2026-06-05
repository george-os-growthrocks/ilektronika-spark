"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import {
  relatedCategoriesForPillar,
  subcategoriesOf,
  productsInCategory,
  formatPrice,
  effectivePrice,
  productImage,
  type Product,
  type Category,
} from "../data/catalog";
import { categoryMeta, type BadgeKind } from "../data/category-meta";
import { toGreekUppercase } from "@/lib/utils";

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
    .slice(0, 4);
}

export function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  useEffect(() => () => cancelClose(), []);

  // Measure nav position for fixed dropdown
  const updateDropdownPos = useCallback(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom);
    }
  }, []);

  useEffect(() => {
    if (open) {
      updateDropdownPos();
      window.addEventListener("scroll", updateDropdownPos, { passive: true });
      window.addEventListener("resize", updateDropdownPos);
      return () => {
        window.removeEventListener("scroll", updateDropdownPos);
        window.removeEventListener("resize", updateDropdownPos);
      };
    }
  }, [open, updateDropdownPos]);

  const openSubs = open
    ? [...subcategoriesOf(open), ...relatedCategoriesForPillar(open)]
    : [];
  const openMeta = open ? categoryMeta(open) : null;
  const openFeatured = open ? featuredProducts(open) : [];

  const dropdownPanel =
    open && openSubs.length > 0 && mounted
      ? createPortal(
          <div
            className="fixed z-[9999] flex justify-center pointer-events-none"
            style={{
              top: dropdownTop,
              left: 0,
              right: 0,
            }}
          >
            <div
              className="pointer-events-auto pt-3"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="bg-background border border-border shadow-2xl shadow-black/[0.08] rounded-xl w-[1140px] max-w-[95vw] grid grid-cols-12 gap-8 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Subcategories column */}
                <div className="col-span-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    ΥΠΟΚΑΤΗΓΟΡΙΕΣ
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 max-h-80 overflow-y-auto pr-2">
                    {openSubs.slice(0, 24).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={s.depth === 0 ? `/${s.slug}` : `/${open}/${s.slug}`}
                          className="flex items-center justify-between gap-1.5 text-xs font-semibold normal-case tracking-normal text-foreground hover:text-primary hover:bg-primary/5 rounded-md px-2 py-1.5 transition-colors"
                          onClick={() => setOpen(null)}
                        >
                          <span className="truncate">{s.label}</span>
                          <span className="text-[9px] text-muted-foreground font-mono shrink-0">
                            {s.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {openMeta?.intro && (
                    <p className="text-[11px] normal-case tracking-normal text-muted-foreground leading-relaxed mt-5 border-t border-border pt-4">
                      {openMeta.intro.slice(0, 160)}…
                    </p>
                  )}
                </div>

                {/* Featured products column */}
                <div className="col-span-8 border-l border-border/60 pl-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center justify-between">
                    <span>ΔΗΜΟΦΙΛΗ ΠΡΟΪΟΝΤΑ</span>
                    <Link
                      href={`/${open}`}
                      className="text-primary hover:underline normal-case text-xs font-bold"
                      onClick={() => setOpen(null)}
                    >
                      Όλα →
                    </Link>
                  </div>
                  {openFeatured.length > 0 ? (
                    <ul className="grid grid-cols-4 gap-4">
                      {openFeatured.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/proionta/${p.slug}`}
                            className="block group"
                            onClick={() => setOpen(null)}
                          >
                            <div className="aspect-square bg-surface border border-border rounded-lg overflow-hidden mb-2 grid place-items-center group-hover:border-primary/40 transition-colors">
                              <img
                                src={productImage(p)}
                                alt={p.name}
                                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                            <div className="text-[11px] font-semibold normal-case tracking-normal leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
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
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <nav ref={navRef} className="relative flex items-stretch justify-center gap-0 text-xs font-bold tracking-wider">
        {categories.map((c) => {
          const meta = categoryMeta(c.slug);
          const isOpen = open === c.slug;
          const directSubs = subcategoriesOf(c.slug);
          const related = relatedCategoriesForPillar(c.slug);
          const hasSubs = directSubs.length + related.length > 0;

          return (
            <div
              key={c.slug}
              className="flex items-stretch"
              onMouseEnter={() => {
                cancelClose();
                setOpen(c.slug);
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={`/${c.slug}`}
                className={`relative flex h-full items-center gap-1 px-2.5 2xl:px-3 transition-colors whitespace-nowrap ${
                  isOpen ? "text-primary" : "hover:text-primary"
                }`}
              >
                {toGreekUppercase(c.label)}
                {meta.badge && <Badge kind={meta.badge} />}
                {hasSubs && (
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
                {/* Active indicator */}
                {isOpen && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            </div>
          );
        })}

        <Link
          href="/katigories"
          className="flex items-center px-3 hover:text-primary transition-colors whitespace-nowrap text-muted-foreground"
        >
          ΟΛΕΣ →
        </Link>
      </nav>

      {dropdownPanel}
    </>
  );
}

