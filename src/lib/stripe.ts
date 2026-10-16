import Stripe from "stripe";

/**
 * Node SDK 23 exposes the API client as `Stripe`. Constructing it here is the
 * supported client instance; the package does not export a separate StripeClient,
 * and the key is never assigned on a global.
 */
export function stripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-09-30.endive" });
}

export function safeStripeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "checkout error";
  return message.replace(/\b[sr]k_(?:live|test)_[A-Za-z0-9]+\b/g, "[redacted]");
}
