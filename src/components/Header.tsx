import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.webp.asset.json";
import { topLevelCategories } from "../data/catalog";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const tops = topLevelCategories().slice(0, 7);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const getViewportWidth = () =>
      Math.min(
        window.innerWidth || Number.POSITIVE_INFINITY,
        document.documentElement.clientWidth || Number.POSITIVE_INFINITY,
        window.visualViewport?.width || Number.POSITIVE_INFINITY,
      );
    const update = () => setDesktop(getViewportWidth() >= 1280);
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

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

          {desktop ? (
            <div className="flex flex-1 min-w-0 justify-end">
              <MegaMenu categories={tops} />
            </div>
          ) : (
            <>
              <div className="flex-1" />
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Άνοιγμα μενού"
                className="inline-flex p-2 -mr-2 hover:text-primary shrink-0"
              >
                <Menu className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
