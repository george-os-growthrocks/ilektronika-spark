"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE = "its_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  const m = document.cookie.match(/(?:^|; )its_consent=(granted|denied)/);
  return (m?.[1] as Choice | undefined) ?? null;
}

function writeChoice(choice: Choice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax${secure}`;
  const state = {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
  try {
    window.gtag?.("consent", "update", state);
  } catch {
    // ignore
  }
}

/**
 * Consent banner for Google Consent Mode v2. Analytics stays denied until the
 * visitor accepts; the choice lives in a first-party cookie for a year.
 * Dispatch `window.dispatchEvent(new Event("open-consent"))` to reopen it.
 */
export function Consent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  if (!open) return null;

  const decide = (choice: Choice) => {
    writeChoice(choice);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Ρυθμίσεις cookies"
      className="fixed bottom-0 inset-x-0 z-[90] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-background border border-border rounded-xl shadow-2xl shadow-black/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          Χρησιμοποιούμε cookies μόνο για ανώνυμα στατιστικά επισκεψιμότητας (Google Analytics),
          ώστε να βελτιώνουμε τον κατάλογο. Τα απολύτως απαραίτητα (π.χ. επαλήθευση 18+) λειτουργούν
          πάντα.{" "}
          <Link href="/cookies" className="text-primary underline">
            Πολιτική cookies
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded hover:border-primary hover:text-primary transition-colors"
          >
            Απόρριψη
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="bg-primary text-primary-foreground px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity"
          >
            Αποδοχή
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so a visitor can change their mind. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-consent"))}
      className="text-left hover:text-primary"
    >
      Ρυθμίσεις cookies
    </button>
  );
}
