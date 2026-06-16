import Link from "next/link";

export function MerchantBlock() {
  return (
    <aside className="mt-12 border border-border rounded-lg p-6 bg-surface">
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">
        ΣΥΝΕΡΓΑΖΟΜΕΝΟ ΚΑΤΑΣΤΗΜΑ
      </div>
      <div className="font-extrabold text-lg">Vape and More</div>
      <div className="text-sm text-foreground/80 mt-1">Αρκαδίου 82, 74100 Ρέθυμνο, GR</div>
      <div className="text-sm mt-3 space-x-3">
        <a href="tel:+302831181046" className="text-primary underline font-bold">
          2831 181 046
        </a>
        <span className="text-muted-foreground">·</span>
        <a href="mailto:info@vapeandmore.gr" className="text-primary underline font-bold">
          info@vapeandmore.gr
        </a>
      </div>
      <div className="text-sm mt-2">
        Κατάστημα:{" "}
        <a
          href="https://vapeandmore.gr"
          target="_blank"
          rel="noopener"
          className="text-primary underline font-bold"
        >
          vapeandmore.gr
        </a>
      </div>
    </aside>
  );
}

export function LegalCta() {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <a
        href="https://vapeandmore.gr"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-extrabold uppercase tracking-widest text-sm rounded hover:opacity-90"
      >
        ΑΓΟΡΑΣΤΕ ΣΤΟ vapeandmore.gr →
      </a>
      <Link
        href="/epikoinonia"
        className="inline-flex items-center gap-2 border border-border px-5 py-3 font-bold uppercase tracking-widest text-sm rounded hover:border-primary hover:text-primary"
      >
        ΕΠΙΚΟΙΝΩΝΙΑ
      </Link>
    </div>
  );
}
