import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.webp.asset.json";
import { topLevelCategories } from "../data/catalog";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const tops = topLevelCategories().slice(0, 7);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Promo strip */}
      <div className="bg-foreground text-background text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-3 truncate">
        <span className="sm:hidden">🚚 Δωρεάν αποστολή 30€+ · Αυθεντικά</span>
        <span className="hidden sm:inline">
          🚚 Δωρεάν αποστολή άνω των 30€ · Παράδοση 1-3 εργάσιμες · Αυθεντικά προϊόντα
        </span>
      </div>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 lg:h-20 flex items-center gap-3 lg:gap-5">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Αρχική">
            <img
              src={logo.url}
              alt="ilektronikatsigara.gr"
              className="h-7 sm:h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Mega menu — only on xl+ */}
          <div className="hidden xl:flex flex-1 min-w-0 justify-end">
            <MegaMenu categories={tops} />
          </div>

          {/* Spacer for mobile/tablet */}
          <div className="flex-1 xl:hidden" />

          {/* Mobile burger on the right */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Άνοιγμα μενού"
            className="xl:hidden p-2 -mr-2 hover:text-primary shrink-0"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
