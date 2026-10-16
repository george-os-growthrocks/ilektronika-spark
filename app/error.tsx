"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">Κάτι πήγε στραβά</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Δοκιμάστε ξανά ή επιστρέψτε στην αρχική.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Δοκιμή ξανά
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
          >
            Αρχική
          </a>
        </div>
      </div>
    </div>
  );
}
