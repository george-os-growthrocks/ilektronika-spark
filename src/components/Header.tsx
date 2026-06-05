import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.webp.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <img src={logo.url} alt="ilektronikatsigara.gr" className="h-10 w-auto" />
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm font-medium uppercase tracking-wider">
            <Link to="/disposables" className="hover:text-primary transition-colors">Disposables</Link>
            <Link to="/pods" className="hover:text-primary transition-colors">Pods</Link>
            <Link to="/ygra" className="hover:text-primary transition-colors">Υγρά</Link>
            <Link to="/narghiledes" className="hover:text-primary transition-colors">Ναργιλέδες</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link to="/syxnes-erotiseis" className="hover:text-primary transition-colors">FAQ</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 border border-foreground text-[10px] font-bold rounded">18+</span>
          <Link
            to="/epikoinonia"
            className="hidden sm:inline-flex bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity"
          >
            Επικοινωνία
          </Link>
        </div>
      </div>
    </header>
  );
}
