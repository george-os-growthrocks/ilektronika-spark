import { randomBytes } from "node:crypto";
import { ASKING_PRICE_EUR, DOMAIN, TOTAL_EUR, VAT_EUR, VAT_RATE_PERCENT } from "@/config/site";
import type { Locale } from "@/content/locale";

/** Shown on the Stripe Checkout line item. */
export const CHECKOUT_PRODUCT_NAME = `${DOMAIN} – domain & website (outright sale)`;

/** Line item description: net price, VAT and total. */
export function checkoutDescription(locale: Locale): string {
  return locale === "en"
    ? `€${ASKING_PRICE_EUR.toLocaleString("en-US")} + ${VAT_RATE_PERCENT}% VAT (€${VAT_EUR}) = €${TOTAL_EUR.toLocaleString("en-US")} total. Invoice issued.`
    : `${ASKING_PRICE_EUR.toLocaleString("el-GR")} € + ΦΠΑ ${VAT_RATE_PERCENT}% (${VAT_EUR} €) = ${TOTAL_EUR.toLocaleString("el-GR")} € σύνολο. Εκδίδεται τιμολόγιο.`;
}

/** Shown under the pay button. */
export function checkoutSubmitMessage(locale: Locale): string {
  return locale === "en"
    ? "After payment we will contact you to complete the .gr transfer. An invoice is issued for the purchase."
    : "Μετά την πληρωμή θα επικοινωνήσουμε μαζί σας για την ολοκλήρωση της μεταβίβασης του .gr. Για την αγορά εκδίδεται τιμολόγιο.";
}

/** Total including 24% VAT, in cents (EUR 1,860.00). */
export const CHECKOUT_UNIT_AMOUNT = TOTAL_EUR * 100;

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
