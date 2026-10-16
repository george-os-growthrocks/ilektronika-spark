import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { safeStripeError, stripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/**
 * Payment confirmation lives here, not on `/?paid=1`.
 * A paid session still needs a person to confirm an EU billing country and
 * start the .gr transfer. This handler records that signal; it does not
 * transfer the domain.
 */
function record(event: Stripe.Event, session: Stripe.Checkout.Session): void {
  console.info(
    JSON.stringify({
      source: "stripe-webhook",
      event: event.type,
      session: session.id,
      payment_status: session.payment_status,
      country: session.customer_details?.address?.country ?? null,
    }),
  );
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const stripe = stripeClient();
  if (!stripe || !secret) {
    return NextResponse.json({ received: false }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch (error) {
    console.error("Stripe webhook rejected", safeStripeError(error));
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    if (session.payment_status !== "unpaid") record(event, session);
  } else if (event.type === "checkout.session.async_payment_failed") {
    record(event, event.data.object);
  }

  return NextResponse.json({ received: true });
}
