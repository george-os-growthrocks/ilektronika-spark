import { randomBytes } from "node:crypto";
import { ASKING_PRICE_EUR, DOMAIN } from "@/config/site";
import type { Locale } from "@/content/locale";

/** Shown on the Stripe Checkout line item. */
export const CHECKOUT_PRODUCT_NAME = "Domain ilektronikatsigara.gr + Next.js e-shop";

/** EUR 1,500.00 in cents. */
export const CHECKOUT_UNIT_AMOUNT = ASKING_PRICE_EUR * 100;

export function parseCheckoutLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : "el";
}

/** Offer form used when Stripe is not configured or the session cannot be created. */
export function offerFallbackPath(locale: Locale): string {
  const path = locale === "en" ? "/en" : "/";
  return `${path}?intent=buy#contact`;
}

/**
 * Absolute return URLs. Stripe rejects relative success and cancel URLs.
 * Paths are `/?paid=1` and `/en?paid=1`; cancel returns to the same page.
 */
export function checkoutReturnUrls(
  locale: Locale,
  origin: string,
): { success_url: string; cancel_url: string } {
  const path = locale === "en" ? "/en" : "/";
  const success = new URL(path, origin);
  success.searchParams.set("paid", "1");
  const cancel = new URL(path, origin);
  return { success_url: success.toString(), cancel_url: cancel.toString() };
}

/** Dashboard label. The API requires an 8-letter suffix on this version. */
export function integrationIdentifier(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const bytes = randomBytes(8);
  let suffix = "";
  for (const byte of bytes) {
    suffix += alphabet[byte % alphabet.length];
  }
  return `domain_checkout_${suffix}`;
}

export function checkoutMetadata(locale: Locale): { domain: string; locale: Locale } {
  return { domain: DOMAIN, locale };
}
