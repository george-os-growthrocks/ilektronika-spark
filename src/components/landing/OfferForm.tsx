"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ASKING_PRICE_EUR, CONTACT_EMAIL } from "@/config/site";
import type { Copy } from "@/content/copy";
import type { Intent } from "@/lib/intent";
import { parseAmount } from "@/lib/amount";
import { offerMailto, type Deal } from "@/lib/offer";

type FormCopy = Copy["form"];

type Status = "idle" | "submitting" | "sent" | "mailto" | "error";

function dealFromIntent(intent: Intent | null): Deal {
  switch (intent) {
    case "lease":
      return "lease";
    case "buy":
    case "offer":
    case null:
      return "buy";
    default: {
      const unreachable: never = intent;
      return unreachable;
    }
  }
}

function statusText(status: Status, copy: FormCopy): string | null {
  switch (status) {
    case "idle":
    case "submitting":
      return null;
    case "sent":
      return copy.success;
    case "mailto":
      return copy.mailto;
    case "error":
      return copy.invalid;
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

export function OfferForm({ intent, copy }: { intent: Intent | null; copy: FormCopy }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState(intent === "buy" ? String(ASKING_PRICE_EUR) : "");
  const [deal, setDeal] = useState<Deal>(dealFromIntent(intent));
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "amount", string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const mailto = offerMailto({ name, email, company, amount, deal, message });
  const confirmBuy = intent === "buy" && deal === "buy" && parseAmount(amount) === ASKING_PRICE_EUR;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<"name" | "email" | "amount", string>> = {};
    if (!name.trim()) nextErrors.name = copy.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = copy.emailInvalid;
    const parsed = parseAmount(amount);
    if (parsed === null || parsed <= 0) nextErrors.amount = copy.amountInvalid;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || parsed === null) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          amount: parsed,
          deal,
          message: message.trim(),
          website,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        delivered?: boolean;
      };
      if (response.status === 400) {
        setStatus("error");
        return;
      }
      if (data.delivered) {
        setStatus("sent");
        return;
      }
    } catch {
      // Mail is not configured or the network failed. Open the visitor's email app.
    }

    window.location.href = mailto;
    setStatus("mailto");
  }

  if (status === "sent") {
    return (
      <p role="status" className="rounded-2xl border border-border bg-card px-5 py-6 text-base">
        {copy.success}
      </p>
    );
  }

  const messageId = statusText(status, copy);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7"
    >
      {intent === "buy" ? (
        <p className="mb-5 rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed">
          {copy.buyBanner}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-name" className="text-sm font-semibold">
            {copy.name} <span className="sr-only">({copy.required})</span>
          </label>
          <input
            id="offer-name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "offer-name-error" : undefined}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.name ? (
            <p id="offer-name-error" className="mt-1 text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="offer-email" className="text-sm font-semibold">
            {copy.email} <span className="sr-only">({copy.required})</span>
          </label>
          <input
            id="offer-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "offer-email-error" : undefined}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.email ? (
            <p id="offer-email-error" className="mt-1 text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="offer-company" className="text-sm font-semibold">
            {copy.company}{" "}
            <span className="font-normal text-muted-foreground">({copy.optional})</span>
          </label>
          <input
            id="offer-company"
            name="company"
            autoComplete="organization"
            maxLength={200}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="offer-amount" className="text-sm font-semibold">
            {copy.amount} <span className="sr-only">({copy.required})</span>
          </label>
          <input
            id="offer-amount"
            name="amount"
            inputMode="decimal"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-invalid={errors.amount ? true : undefined}
            aria-describedby="offer-amount-hint"
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p
            id="offer-amount-hint"
            className={`mt-1 text-sm ${errors.amount ? "text-destructive" : "text-muted-foreground"}`}
          >
            {errors.amount ?? (deal === "lease" ? copy.leaseHint : copy.offerHint)}
          </p>
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold">{copy.deal}</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {(
            [
              ["buy", copy.buy],
              ["lease", copy.lease],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold focus-within:ring-2 focus-within:ring-ring ${
                deal === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background"
              }`}
            >
              <input
                type="radio"
                name="deal"
                value={value}
                checked={deal === value}
                onChange={() => setDeal(value)}
                className="size-4 accent-primary"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor="offer-message" className="text-sm font-semibold">
          {copy.message}{" "}
          <span className="font-normal text-muted-foreground">({copy.optional})</span>
        </label>
        <textarea
          id="offer-message"
          name="message"
          rows={4}
          maxLength={5000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {status === "submitting" ? copy.sending : confirmBuy ? copy.submitBuy : copy.submit}
        </button>
        <a
          href={mailto}
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          {copy.openEmail}
        </a>
      </div>

      {messageId ? (
        <p role="status" className="mt-4 text-sm">
          {messageId}{" "}
          {status === "mailto" ? (
            <a
              className="font-semibold underline underline-offset-4"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          ) : null}
        </p>
      ) : null}

      <p className="mt-4 text-sm text-muted-foreground">{copy.privacy}</p>
    </form>
  );
}
