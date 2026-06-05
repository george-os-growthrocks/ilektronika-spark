"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { pillarCategories } from "../data/catalog";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

const LOGO_SRC = "/logo.png";

export function Header() {
  const tops = pillarCategories();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-3 truncate">
        <span className="sm:hidden">🚚 ΔΩΡΕΑΝ ΑΠΟΣΤΟΛΗ 30€+ · ΑΥΘΕΝΤΙΚΑ</span>
        <span className="hidden sm:inline">
          🚚 ΔΩΡΕΑΝ ΑΠΟΣΤΟΛΗ ΑΝΩ ΤΩΝ 30€ · ΠΑΡΑΔΟΣΗ 1-3 ΕΡΓΑΣΙΜΕΣ · ΑΥΘΕΝΤΙΚΑ ΠΡΟΪΟΝΤΑ
        </span>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border shadow-lg shadow-black/[0.03]"
            : "bg-background border-border/50"
        }`}
        style={{ overflow: "visible" }}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-8" style={{ overflow: "visible" }}>
          {/* Desktop layout */}
          <div className="hidden lg:flex items-stretch h-[72px] gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group" aria-label="Αρχική">
              <img
                src={LOGO_SRC}
                alt="ilektronikatsigara.gr"
                className="h-9 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Separator */}
            <div className="flex items-center shrink-0">
              <div className="w-px h-8 bg-border/60" />
            </div>

            {/* Navigation - fills remaining space */}
            <div className="flex-1 flex items-stretch justify-center">
              <MegaMenu categories={tops} />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/anazitisi"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Αναζήτηση"
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex lg:hidden items-center h-14 sm:h-16 gap-3">
            <Link href="/" className="flex items-center shrink-0" aria-label="Αρχική">
              <img src={LOGO_SRC} alt="ilektronikatsigara.gr" className="h-7 sm:h-8 w-auto" />
            </Link>

            <div className="flex-1" />

            <Link
              href="/anazitisi"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
              aria-label="Αναζήτηση"
            >
              <Search className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Άνοιγμα μενού"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:text-primary hover:border-primary transition-colors shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

