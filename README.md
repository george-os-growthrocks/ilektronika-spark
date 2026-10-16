# ilektronikatsigara.gr

Domain-for-sale site. Greek is `/`. English is `/en`. The asking price is €1,500.

The public inbox is `anotherseoguru@mail.grokbot.com` (`CONTACT_EMAIL` in `src/config/site.ts`). JSON-LD, the offer form, and mailto links use that constant.

## Environment variables

Keep these in the host’s secret store. Do not commit them, and do not paste them into source.

| Variable | Used for |
| --- | --- |
| `STRIPE_SECRET_KEY` | Creates the Stripe Checkout Session from `/api/checkout`. Prefer a [restricted API key](https://docs.stripe.com/keys.md#manage-your-api-keys) (`rk_`) with permission to write Checkout Sessions. For local development, use a key from a [Stripe sandbox](https://docs.stripe.com/sandboxes.md). If this variable is missing, every Buy now link opens the offer form. |
| `STRIPE_WEBHOOK_SECRET` | Verifies Stripe signatures on `POST /api/stripe/webhook`. Point the endpoint at `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed`. Fulfillment runs in that handler, after `payment_status` is no longer `unpaid`. The `?paid=1` page is a thank-you screen and is not proof of payment. |
| `RESEND_API_KEY` | Sends offer-form mail through Resend. Optional. |
| `OFFER_FROM_EMAIL` | From address for that mail. Both Resend variables must be set; otherwise the form opens a `mailto:` link to `CONTACT_EMAIL`. |

Checkout reads `STRIPE_SECRET_KEY` only. The webhook signing secret is separate and is required before a card payment is treated as complete.

## Checkout

`GET /api/checkout?locale=el` and `GET /api/checkout?locale=en` create a Checkout Session and redirect to Stripe:

- `mode`: `payment`
- price: EUR 1,500.00, inline `price_data`
- product: `Domain ilektronikatsigara.gr + Next.js e-shop`
- billing address required (includes country)
- phone number collection enabled
- `tax_id_collection` enabled
- success: `/?paid=1` or `/en?paid=1`
- cancel: the same page the buyer left

`POST /api/checkout` with `{ "locale": "el" }` or `{ "locale": "en" }` returns `{ "url": "..." }`. When the key is missing, or Stripe returns an error, the response is `{ "url": null, "fallback": "/?intent=buy#contact" }` (or the English equivalent) and the GET route redirects there.

After a verified payment, confirm the buyer is based in the EU, then start the `.gr` transfer within a few business days. The webhook logs the Checkout Session id and billing country for that check. It does not transfer the domain by itself.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```
