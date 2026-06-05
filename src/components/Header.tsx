import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.webp.asset.json";
import { topLevelCategories } from "../data/catalog";

export function Header() {
  const tops = topLevelCategories().slice(0, 6);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo.url} alt="ilektronikatsigara.gr" className="h-10 w-auto" />
          </Link>
          <nav className="hidden lg:flex gap-5 text-xs font-bold uppercase tracking-wider overflow-hidden">
            {tops.map((c) => (
              <Link
                key={c.slug}
                to="/$category"
                params={{ category: c.slug }}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
            <Link to="/katigories" className="hover:text-primary transition-colors whitespace-nowrap">
              Όλες →
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/anazitisi"
            className="hidden sm:inline-flex items-center text-xs font-bold uppercase tracking-widest border border-border rounded px-3 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            Αναζήτηση
          </Link>
          <span className="px-2 py-1 border border-foreground text-[10px] font-bold rounded">18+</span>
        </div>
      </div>
    </header>
  );
}
