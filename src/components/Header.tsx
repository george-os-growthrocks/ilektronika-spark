import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, MessageCircle } from "lucide-react";
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
      <div className="bg-foreground text-background text-[11px] font-bold uppercase tracking-widest text-center py-1.5 px-4">
        🚚 Δωρεάν αποστολή άνω των 30€ · Παράδοση 1-3 εργάσιμες · Αυθεντικά προϊόντα
      </div>

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:gap-6 min-w-0 flex-1">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Άνοιγμα μενού"
              className="lg:hidden p-2 -ml-2 hover:text-primary"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo.url} alt="ilektronikatsigara.gr" className="h-8 lg:h-10 w-auto" />
            </Link>
            <MegaMenu categories={tops} />
          </div>

          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              aria-label="AI βοηθός"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border border-primary/30 text-primary rounded px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              AI
            </button>
            <Link
              to="/anazitisi"
              aria-label="Αναζήτηση"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest border border-border rounded p-2 lg:px-3 lg:py-2 hover:border-primary hover:text-primary transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Αναζήτηση</span>
            </Link>
            <span className="px-2 py-1 border border-foreground text-[10px] font-bold rounded">
              18+
            </span>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
