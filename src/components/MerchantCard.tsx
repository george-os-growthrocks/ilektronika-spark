import type { Product } from "@/data/catalog";
import { effectivePrice, formatPrice } from "@/data/catalog";
import { productAffiliateUrl, STORE_LOCATION, STORE_NAME } from "@/lib/affiliate";
import logo from "@/assets/logo.webp.asset.json";

export function MerchantCard({ product }: { product: Product }) {
  const price = effectivePrice(product);
  const hasSale = product.salePrice != null && product.price != null;
  return (
    <aside className="border-2 border-primary/30 rounded-lg p-5 bg-surface">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Διαθέσιμο σε κατάστημα
        </span>
        {product.inStock ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Σε απόθεμα
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-muted" /> Εξαντλημένο
          </span>
        )}
      </div>

      <a
        href={productAffiliateUrl(product)}
        target="_blank"
        rel="noopener nofollow sponsored"
        className="flex items-center gap-3 mb-4 group"
      >
        <div className="w-16 h-16 grid place-items-center bg-background rounded border border-border shrink-0">
          <img src={logo.url} alt={STORE_NAME} className="max-w-[52px] max-h-[52px] object-contain" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
            {STORE_NAME}
          </div>
          <div className="text-xs text-muted-foreground">{STORE_LOCATION}</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
            vapeandmore.gr
          </div>
        </div>
      </a>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-extrabold text-foreground tracking-tight">
          {formatPrice(price)}
        </span>
        {hasSale && (
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <a
        href={productAffiliateUrl(product)}
        target="_blank"
        rel="noopener nofollow sponsored"
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest px-6 py-3.5 rounded hover:opacity-90 transition-opacity"
      >
        Αγορά τώρα <span aria-hidden>↗</span>
      </a>

      <p className="text-[11px] text-muted-foreground text-center mt-3 leading-snug">
        Θα μεταφερθείτε στο επίσημο κατάστημα <strong className="text-foreground">vapeandmore.gr</strong> για
        να ολοκληρώσετε την παραγγελία σας με ασφάλεια.
      </p>
    </aside>
  );
}
