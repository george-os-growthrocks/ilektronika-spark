import Link from "next/link";
import type { Product } from "@/data/catalog-types";
import { formatPrice, priceLabel } from "@/data/catalog-types";
import { productAffiliateUrl, STORE_LOCATION, STORE_NAME } from "@/lib/affiliate";
import { OutboundLink } from "./OutboundLink";

export function MerchantCard({ product }: { product: Product }) {
  const label = priceLabel(product);
  const hasSale = product.salePrice != null && product.price != null;
  const shopHref = productAffiliateUrl(product, "pdp_buybox");
  const tracked = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.primaryTopSlug,
    price: product.salePrice ?? product.price ?? product.minPrice ?? null,
    inStock: product.inStock,
  };
  const alternativesHref = product.primaryLeafSlug
    ? product.primaryCategoryPath.length > 1
      ? `/${product.primaryCategoryPath[0].slug}/${product.primaryLeafSlug}?instock=1`
      : `/${product.primaryLeafSlug}?instock=1`
    : "/katigories";

  return (
    <aside className="border-2 border-primary/30 rounded-lg p-5 bg-surface" aria-label="Αγορά">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          ΔΙΑΘΕΣΙΜΟ ΣΕ ΚΑΤΑΣΤΗΜΑ
        </span>
        {product.inStock ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> ΣΕ ΑΠΟΘΕΜΑ
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-muted" /> ΕΞΑΝΤΛΗΜΕΝΟ
          </span>
        )}
      </div>

      <OutboundLink
        href={shopHref}
        placement="pdp_buybox"
        product={tracked}
        className="flex items-center gap-3 mb-4 group"
      >
        <div className="w-16 h-16 grid place-items-center bg-background rounded border border-border shrink-0">
          <img
            src="/logo-vape-and-more.png"
            alt={STORE_NAME}
            width={52}
            height={25}
            className="max-w-[52px] max-h-[52px] object-contain"
          />
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
      </OutboundLink>

      <div className="flex items-baseline gap-2 mb-3">
        {label ? (
          <span
            className={`font-extrabold text-foreground tracking-tight ${label.from ? "text-2xl" : "text-3xl"}`}
          >
            {label.text}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground leading-snug">
            Η τιμή εξαρτάται από την παραλλαγή. Δείτε τιμές και διαθέσιμα χρώματα στο κατάστημα.
          </span>
        )}
        {hasSale && (
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {product.inStock ? (
        <>
          <OutboundLink
            href={shopHref}
            placement="pdp_buybox"
            product={tracked}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-widest px-6 py-3.5 rounded hover:opacity-90 transition-opacity"
          >
            {label ? "ΑΓΟΡΑ ΤΩΡΑ" : "ΔΕΙΤΕ ΤΙΜΗ & ΠΑΡΑΛΛΑΓΕΣ"} <span aria-hidden>↗</span>
          </OutboundLink>
          <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
            <li>✓ Αποστολή 1–3 εργάσιμες σε όλη την Ελλάδα, δωρεάν από 30€</li>
            <li>✓ Αποστολή αυθημερόν για παραγγελίες έως 14:00</li>
            <li>✓ Αυθεντικό προϊόν από επίσημο διανομέα · 14 ημέρες επιστροφή</li>
          </ul>
        </>
      ) : (
        <>
          <Link
            href={alternativesHref}
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            ΔΕΙΤΕ ΔΙΑΘΕΣΙΜΕΣ ΕΝΑΛΛΑΚΤΙΚΕΣ
          </Link>
          <p className="text-[11px] text-muted-foreground text-center mt-3 leading-snug">
            Το προϊόν είναι προσωρινά εξαντλημένο. Για ενημέρωση επαναφοράς καλέστε το κατάστημα στο{" "}
            <a href="tel:+302831181046" className="text-primary font-bold underline">
              2831 181 046
            </a>{" "}
            ή{" "}
            <OutboundLink
              href={shopHref}
              placement="pdp_buybox"
              product={tracked}
              className="underline"
            >
              δείτε το στο vapeandmore.gr
            </OutboundLink>
            .
          </p>
        </>
      )}

      {product.inStock && (
        <p className="text-[11px] text-muted-foreground text-center mt-3 leading-snug">
          Η παραγγελία ολοκληρώνεται με ασφάλεια στο επίσημο κατάστημα{" "}
          <strong className="text-foreground">vapeandmore.gr</strong>.
        </p>
      )}
    </aside>
  );
}
