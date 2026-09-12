"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import type { BadgeKind } from "@/data/category-meta";
import type { NavData } from "@/data/nav-types";
import { toGreekUppercase } from "@/lib/utils";

const LOGO_SRC = "/logo.png";

const BADGE_COLORS: Record<BadgeKind, string> = {
  HOT: "bg-red-500 text-white",
  NEW: "bg-emerald-500 text-white",
  SALE: "bg-amber-500 text-black",
  TOP: "bg-primary text-primary-foreground",
  DEAL: "bg-secondary text-secondary-foreground",
};

const QUICK_TONE = {
  hot: "bg-red-500 text-white",
  top: "bg-primary text-primary-foreground",
  new: "bg-emerald-500 text-white",
};

export function MobileMenu({
  nav,
  open,
  onClose,
}: {
  nav: NavData;
  open: boolean;
  onClose: () => void;
}) {
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

  const active = activeCat ? (nav.pillars.find((p) => p.slug === activeCat) ?? null) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Μενού"
      className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col animate-in fade-in duration-150"
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-border shrink-0">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <img src={LOGO_SRC} alt="Vape and More" width={68} height={32} className="h-8 w-auto" />
          <span className="font-extrabold tracking-tight text-sm">ilektronikatsigara.gr</span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Κλείσιμο μενού"
          className="p-2 -mr-2 hover:text-primary"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {!active ? (
          <>
            <div className="px-4 py-3 bg-primary/5 border-b border-border flex gap-3 overflow-x-auto">
              {nav.quick.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  onClick={onClose}
                  className={`shrink-0 text-[11px] font-bold uppercase px-3 py-1.5 rounded-full ${QUICK_TONE[q.tone]}`}
                >
                  {q.label}
                </Link>
              ))}
            </div>

            <ul>
              {nav.pillars.map((c) => {
                const hasSubs = c.subs.length > 0;
                return (
                  <li key={c.slug} className="border-b border-border">
                    <div className="flex items-stretch">
                      <Link
                        href={c.href}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-2 px-4 py-4"
                      >
                        <span className="font-bold text-base">{c.label}</span>
                        {c.badge && (
                          <span
                            className={`text-[9px] font-extrabold tracking-wider px-1.5 py-[1px] rounded-sm ${BADGE_COLORS[c.badge]}`}
                          >
                            {c.badge}
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
              <span className="tracking-widest text-xs">
                {toGreekUppercase("Πίσω · " + active.label)}
              </span>
            </button>
            <Link
              href={active.href}
              onClick={onClose}
              className="block px-4 py-4 border-b border-border bg-primary/5"
            >
              <span className="text-sm font-extrabold text-primary">
                Δείτε όλα στο {active.label} →
              </span>
              {active.tagline && (
                <span className="block text-xs text-muted-foreground mt-1">{active.tagline}</span>
              )}
            </Link>
            <ul>
              {active.subs.map((s) => (
                <li key={s.slug} className="border-b border-border">
                  <Link href={s.href} onClick={onClose} className="flex items-center px-4 py-4">
                    <span className="flex-1 font-semibold text-sm">{s.label}</span>
                    <span className="text-xs text-muted-foreground font-mono mr-2">{s.count}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 border-t border-border shrink-0 text-[10px] font-bold uppercase tracking-widest">
        <Link href="/blog" onClick={onClose} className="py-3 text-center hover:bg-surface">
          BLOG
        </Link>
        <Link
          href="/syxnes-erotiseis"
          onClick={onClose}
          className="py-3 text-center hover:bg-surface border-l border-border"
        >
          FAQ
        </Link>
        <Link
          href="/epikoinonia"
          onClick={onClose}
          className="py-3 text-center hover:bg-surface border-l border-border"
        >
          ΕΠΙΚ/ΝΙΑ
        </Link>
      </div>
    </div>
  );
}
