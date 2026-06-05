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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight">Κάτι πήγε στραβά</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Δοκιμάστε να ανανεώσετε ή επιστρέψτε στην αρχική.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => reset()}
            className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold uppercase tracking-widest"
          >
            ΔΟΚΙΜΗ ΞΑΝΑ
          </button>
          <a href="/" className="border border-border px-4 py-2 text-sm font-medium">
            Αρχική
          </a>
        </div>
      </div>
    </div>
  );
}
