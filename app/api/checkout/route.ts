import { NextResponse } from "next/server";
import type { Locale } from "@/content/locale";
import {
  CHECKOUT_PRODUCT_NAME,
  CHECKOUT_UNIT_AMOUNT,
  checkoutDescription,
  checkoutMetadata,
  checkoutReturnUrls,
  checkoutSubmitMessage,
  integrationIdentifier,
  offerFallbackPath,
  parseCheckoutLocale,
} from "@/lib/checkout";
import { stripePaymentLinkUrl } from "@/config/site";
import { safeStripeError, stripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

function originOf(request: Request): string {
  return new URL(request.url).origin;
}

function fallbackRedirect(request: Request, locale: Locale): NextResponse {
  const response = NextResponse.redirect(
    new URL(offerFallbackPath(locale), originOf(request)),
    303,
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}

async function createSessionUrl(request: Request, locale: Locale): Promise<string | null> {
  // A Stripe Payment Link, when configured, takes precedence over sessions.
  const link = stripePaymentLinkUrl();
  if (link) {
    const url = new URL(link);
    url.searchParams.set("locale", locale);
    return url.toString();
  }

  const stripe = stripeClient();
  if (!stripe) return null;

  const urls = checkoutReturnUrls(locale, originOf(request));
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale,
    // Tax ID collection attaches the ID to a Customer.
    customer_creation: "always",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    tax_id_collection: { enabled: true },
    name_collection: { business: { enabled: true, optional: true } },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: checkoutDescription(locale),
        metadata: checkoutMetadata(locale),
      },
    },
    custom_text: { submit: { message: checkoutSubmitMessage(locale) } },
    integration_identifier: integrationIdentifier(),
    success_url: urls.success_url,
    cancel_url: urls.cancel_url,
    metadata: checkoutMetadata(locale),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: CHECKOUT_UNIT_AMOUNT,
          // Gross amount: asking price plus 24% Greek VAT.
          product_data: {
            name: CHECKOUT_PRODUCT_NAME,
            description: checkoutDescription(locale),
          },
        },
      },
    ],
  });

  return session.url;
}

export async function GET(request: Request) {
  const locale = parseCheckoutLocale(new URL(request.url).searchParams.get("locale"));
  try {
    const url = await createSessionUrl(request, locale);
    if (!url) return fallbackRedirect(request, locale);
    const response = NextResponse.redirect(url, 303);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Checkout session failed", safeStripeError(error));
    return fallbackRedirect(request, locale);
  }
}

export async function POST(request: Request) {
  let locale: Locale = "el";
  try {
    const body: unknown = await request.json();
    const raw = body && typeof body === "object" && "locale" in body ? body.locale : undefined;
    locale = parseCheckoutLocale(typeof raw === "string" ? raw : null);
  } catch {
    locale = "el";
  }

  try {
    const url = await createSessionUrl(request, locale);
    if (!url) {
      return NextResponse.json({ url: null, fallback: offerFallbackPath(locale) });
    }
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout session failed", safeStripeError(error));
    return NextResponse.json({ url: null, fallback: offerFallbackPath(locale) }, { status: 502 });
  }
}
