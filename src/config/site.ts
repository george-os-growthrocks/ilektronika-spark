/**
 * Public inbox for domain offers.
 * Sending mail requires RESEND_API_KEY and OFFER_FROM_EMAIL. If either is
 * missing, the form falls back to a mailto link to this address.
 */
export const CONTACT_EMAIL = "anotherseoguru@mail.grokbot.com";

export const DOMAIN = "ilektronikatsigara.gr";

export const SITE_URL = "https://ilektronikatsigara.gr";

export const ASKING_PRICE_EUR = 1500;

/** Greek VAT rate added on top of the asking price. */
export const VAT_RATE_PERCENT = 24;

/** VAT on the asking price, in euros. */
export const VAT_EUR = Math.round((ASKING_PRICE_EUR * VAT_RATE_PERCENT) / 100);

/** Amount the buyer pays, asking price plus VAT. */
export const TOTAL_EUR = ASKING_PRICE_EUR + VAT_EUR;

/**
 * Card checkout is live when either a Stripe Payment Link URL or a Stripe
 * secret key is set in the environment. Env changes on Vercel take effect on
 * the next deploy, so build-time evaluation is fine.
 */
export function stripePaymentLinkUrl(): string | null {
  const raw = process.env.STRIPE_PAYMENT_LINK_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function checkoutEnabled(): boolean {
  return Boolean(stripePaymentLinkUrl() || process.env.STRIPE_SECRET_KEY?.trim());
}
