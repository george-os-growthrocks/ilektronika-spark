"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { LinkPlacement } from "@/lib/affiliate";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface OutboundProduct {
  id: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  price?: number | null;
  inStock?: boolean;
}

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> {
  href: string;
  placement: LinkPlacement;
  product?: OutboundProduct;
  children: ReactNode;
}

/**
 * Every link that leaves for vapeandmore.gr goes through here so the click is
 * measured (GA4 `buy_now_click`) and the link carries the right rel attributes.
 */
export function OutboundLink({ href, placement, product, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="sponsored noopener"
      onClick={(e) => {
        try {
          window.gtag?.("event", "buy_now_click", {
            placement,
            link_url: href,
            product_id: product?.id,
            product_name: product?.name,
            brand: product?.brand ?? undefined,
            category: product?.category ?? undefined,
            price: product?.price ?? undefined,
            in_stock: product?.inStock,
            transport_type: "beacon",
          });
        } catch {
          // analytics must never block navigation
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
