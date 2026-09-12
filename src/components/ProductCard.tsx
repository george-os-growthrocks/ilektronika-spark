import Image from "next/image";
import Link from "next/link";
import type { CardProduct } from "@/data/catalog-types";
import { formatPrice, priceLabel } from "@/data/catalog-types";
import { productAffiliateUrl } from "@/lib/affiliate";
import { OutboundLink } from "./OutboundLink";

export function ProductCard({
  product,
  priority = false,
}: {
  product: CardProduct;
  priority?: boolean;
}) {
  const img = product.image;
  const label = priceLabel(product);
  const hasSale = product.salePrice != null && product.price != null;
  const href = `/proionta/${product.slug}`;
  const alternativesHref = product.categorySlug
    ? `/${product.categorySlug}?instock=1`
    : "/katigories";

  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-md overflow-hidden hover:border-primary hover:shadow-lg transition-all">
      <Link href={href} className="block aspect-[4/5] bg-surface relative overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs uppercase tracking-widest">
            {product.brand ?? "-"}
          </div>
        )}
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            ΕΞΑΝΤΛΗΜΕΝΟ
          </span>
        )}
        {hasSale && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            ΠΡΟΣΦΟΡΑ
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
          href={href}
          className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-auto flex items-baseline gap-2 min-h-6">
          {label ? (
            <span
              className={`font-extrabold text-foreground ${label.from ? "text-sm" : "text-base"}`}
            >
              {label.text}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Τιμή ανά παραλλαγή στο κατάστημα</span>
          )}
          {hasSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {product.inStock ? (
          <OutboundLink
            href={productAffiliateUrl(product, "card")}
            placement="card"
            product={{
              id: product.id,
              name: product.name,
              brand: product.brand,
              category: product.categorySlug,
              price: product.salePrice ?? product.price ?? product.minPrice ?? null,
              inStock: product.inStock,
            }}
            className="mt-1 inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-2 rounded hover:opacity-90 transition-opacity"
          >
            {label ? "ΑΓΟΡΑ ΤΩΡΑ" : "ΔΕΙΤΕ ΤΙΜΗ"} <span aria-hidden>↗</span>
          </OutboundLink>
        ) : (
          <Link
            href={alternativesHref}
            className="mt-1 inline-flex items-center justify-center gap-1 border border-border text-foreground text-xs font-bold uppercase tracking-widest px-3 py-2 rounded hover:border-primary hover:text-primary transition-colors"
          >
            ΔΕΙΤΕ ΕΝΑΛΛΑΚΤΙΚΕΣ
          </Link>
        )}
      </div>
    </article>
  );
}
