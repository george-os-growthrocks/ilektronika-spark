import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, Search, ChevronRight, MessageCircle } from "lucide-react";
import { topLevelCategories, subcategoriesOf } from "../data/catalog";
import { categoryMeta, type BadgeKind } from "../data/category-meta";
import logo from "../assets/logo.webp.asset.json";

const BADGE_COLORS: Record<BadgeKind, string> = {
  HOT: "bg-red-500 text-white",
  NEW: "bg-emerald-500 text-white",
  SALE: "bg-amber-500 text-black",
  TOP: "bg-primary text-primary-foreground",
  DEAL: "bg-secondary text-secondary-foreground",
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setActiveCat(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const tops = topLevelCategories();
  const subs = activeCat ? subcategoriesOf(activeCat) : [];
  const activeMeta = activeCat ? categoryMeta(activeCat) : null;
  const activeLabel = activeCat ? tops.find((t) => t.slug === activeCat)?.label : "";

  return (
    <div className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col animate-in fade-in duration-150">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-border shrink-0">
        <Link to="/" onClick={onClose} className="flex items-center">
          <img src={logo.url} alt="ilektronikatsigara.gr" className="h-8 w-auto" />
        </Link>
        <button
          onClick={onClose}
          aria-label="Κλείσιμο μενού"
          className="p-2 -mr-2 hover:text-primary"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <Link
          to="/anazitisi"
          onClick={onClose}
          className="flex items-center gap-3 bg-surface border border-border rounded-md px-4 py-3 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          Αναζήτηση προϊόντων…
        </Link>
      </div>

      {/* Body — sliding view */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {!activeCat ? (
          <>
            {/* Quick promo strip */}
            <div className="px-4 py-3 bg-primary/5 border-b border-border flex gap-3 overflow-x-auto">
              <Link
                to="/disposables"
                onClick={onClose}
                className="shrink-0 text-[11px] font-bold uppercase bg-red-500 text-white px-3 py-1.5 rounded-full"
              >
                🔥 Disposables HOT
              </Link>
              <Link
                to="/syskeyes-vape"
                onClick={onClose}
                className="shrink-0 text-[11px] font-bold uppercase bg-primary text-primary-foreground px-3 py-1.5 rounded-full"
              >
                ⭐ Top Kits
              </Link>
              <Link
                to="/snus"
                onClick={onClose}
                className="shrink-0 text-[11px] font-bold uppercase bg-emerald-500 text-white px-3 py-1.5 rounded-full"
              >
                ✨ Snus NEW
              </Link>
            </div>

            <ul>
              {tops.map((c) => {
                const meta = categoryMeta(c.slug);
                const hasSubs = subcategoriesOf(c.slug).length > 0;
                return (
                  <li key={c.slug} className="border-b border-border">
                    <div className="flex items-stretch">
                      <Link
                        to="/$category"
                        params={{ category: c.slug }}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-2 px-4 py-4"
                      >
                        <span className="font-bold text-base">{c.label}</span>
                        {meta.badge && (
                          <span
                            className={`text-[9px] font-extrabold tracking-wider px-1.5 py-[1px] rounded-sm ${BADGE_COLORS[meta.badge]}`}
                          >
                            {meta.badge}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-mono ml-auto">
                          {c.count}
                        </span>
                      </Link>
                      {hasSubs && (
                        <button
                          onClick={() => setActiveCat(c.slug)}
                          aria-label={`Άνοιγμα ${c.label}`}
                          className="px-4 border-l border-border hover:bg-surface"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveCat(null)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold border-b border-border w-full text-left bg-surface"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span className="uppercase tracking-widest text-xs">
                Πίσω · {activeLabel}
              </span>
            </button>
            <Link
              to="/$category"
              params={{ category: activeCat }}
              onClick={onClose}
              className="block px-4 py-4 border-b border-border bg-primary/5"
            >
              <span className="text-sm font-extrabold text-primary">
                Δείτε όλα στο {activeLabel} →
              </span>
              {activeMeta?.tagline && (
                <span className="block text-xs text-muted-foreground mt-1">
                  {activeMeta.tagline}
                </span>
              )}
            </Link>
            <ul>
              {subs.map((s) => (
                <li key={s.slug} className="border-b border-border">
                  <Link
                    to="/$category/$subcategory"
                    params={{ category: activeCat, subcategory: s.slug }}
                    onClick={onClose}
                    className="flex items-center px-4 py-4"
                  >
                    <span className="flex-1 font-semibold text-sm">{s.label}</span>
                    <span className="text-xs text-muted-foreground font-mono mr-2">
                      {s.count}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Bottom utility bar */}
      <div className="grid grid-cols-4 border-t border-border shrink-0 text-[10px] font-bold uppercase tracking-widest">
        <Link to="/blog" onClick={onClose} className="py-3 text-center hover:bg-surface">
          Blog
        </Link>
        <Link
          to="/syxnes-erotiseis"
          onClick={onClose}
          className="py-3 text-center hover:bg-surface border-l border-border"
        >
          FAQ
        </Link>
        <Link
          to="/epikoinonia"
          onClick={onClose}
          className="py-3 text-center hover:bg-surface border-l border-border"
        >
          Επικ/νία
        </Link>
        <button
          onClick={() => {
            onClose();
            window.dispatchEvent(new CustomEvent("open-chat"));
          }}
          className="py-3 text-center hover:bg-surface border-l border-border flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          AI Chat
        </button>
      </div>
    </div>
  );
}
