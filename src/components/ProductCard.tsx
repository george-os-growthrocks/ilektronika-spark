import Link from "next/link";
import type { Product } from "@/data/catalog";
import { effectivePrice, formatPrice, productImage } from "@/data/catalog";
import { productAffiliateUrl } from "@/lib/affiliate";

export function ProductCard({ product }: { product: Product }) {
  const img = productImage(product);
  const hasSale = product.salePrice != null && product.price != null;
  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-md overflow-hidden hover:border-primary hover:shadow-lg transition-all">
      <Link
        href={`/proionta/${product.slug}`}
        className="block aspect-[4/5] bg-surface relative overflow-hidden"
      >
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs uppercase tracking-widest">
            {product.brand ?? "—"}
          </div>
        )}
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            Εξαντλημένο
          </span>
        )}
        {hasSale && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            Προσφορά
          </span>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-3 gap-2">
        {product.brand && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </span>
        )}
        <Link
          href={`/proionta/${product.slug}`}
          className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-base font-extrabold text-foreground">
            {formatPrice(effectivePrice(product))}
          </span>
          {hasSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <a
          href={productAffiliateUrl(product)}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="mt-1 inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Αγορά τώρα <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}
