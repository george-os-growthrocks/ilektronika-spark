import Link from "next/link";
import { storeUrl } from "@/lib/affiliate";
import { OutboundLink } from "./OutboundLink";

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
        <OutboundLink
          href={storeUrl("merchant_block")}
          placement="merchant_block"
          className="text-primary underline font-bold"
        >
          vapeandmore.gr
        </OutboundLink>
      </div>
    </aside>
  );
}

export function LegalCta() {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <OutboundLink
        href={storeUrl("legal_cta")}
        placement="legal_cta"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-extrabold uppercase tracking-widest text-sm rounded hover:opacity-90"
      >
        ΑΓΟΡΑΣΤΕ ΣΤΟ vapeandmore.gr →
      </OutboundLink>
      <Link
        href="/epikoinonia"
        className="inline-flex items-center gap-2 border border-border px-5 py-3 font-bold uppercase tracking-widest text-sm rounded hover:border-primary hover:text-primary"
      >
        ΕΠΙΚΟΙΝΩΝΙΑ
      </Link>
    </div>
  );
}
