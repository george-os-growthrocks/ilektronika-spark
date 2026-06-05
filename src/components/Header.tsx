import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, MessageCircle } from "lucide-react";
import logo from "../assets/logo.webp.asset.json";
import { topLevelCategories } from "../data/catalog";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const tops = topLevelCategories().slice(0, 6);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Promo strip — compact on mobile, full on sm+ */}
      <div className="bg-foreground text-background text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-3 truncate">
        <span className="sm:hidden">🚚 Δωρεάν αποστολή 30€+ · Αυθεντικά</span>
        <span className="hidden sm:inline">
          🚚 Δωρεάν αποστολή άνω των 30€ · Παράδοση 1-3 εργάσιμες · Αυθεντικά προϊόντα
        </span>
      </div>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 lg:h-20 flex items-center gap-2 sm:gap-3 lg:gap-6">
          {/* Left: burger + logo */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Άνοιγμα μενού"
            className="xl:hidden p-2 -ml-2 hover:text-primary shrink-0"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo.url}
              alt="ilektronikatsigara.gr"
              className="h-7 sm:h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Mega menu — only on xl+ where there's space for 6 long Greek labels */}
          <div className="hidden xl:flex flex-1 min-w-0">
            <MegaMenu categories={tops} />
          </div>

          {/* Spacer for non-xl */}
          <div className="flex-1 xl:hidden" />

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              aria-label="AI βοηθός"
              title="AI βοηθός"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest border border-primary/40 text-primary rounded p-2 sm:px-3 sm:py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </button>

            <Link
              to="/anazitisi"
              aria-label="Αναζήτηση"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest border border-border rounded p-2 sm:px-3 sm:py-2 hover:border-primary hover:text-primary transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Αναζήτηση</span>
            </Link>

            <span className="hidden sm:inline-flex px-2 py-1 border border-foreground text-[10px] font-bold rounded">
              18+
            </span>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
