"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ageVerified-v1";

export function AgeGate() {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v !== "yes") setVerified(false);
    } catch {
      setVerified(false);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // ignore
    }
    setVerified(true);
  };

  const reject = () => {
    window.location.href = "https://www.google.com";
  };

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-background text-foreground p-8 border border-border">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-foreground text-background text-xs font-bold mb-4">
            18+
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-3">Επαλήθευση Ηλικίας</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Η ιστοσελίδα αυτή περιέχει πληροφορίες για προϊόντα νικοτίνης, τα οποία προορίζονται
            αποκλειστικά για ενήλικες άνω των 18 ετών.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Επιβεβαιώνετε ότι είστε άνω των 18 ετών;
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            Ναι, είμαι 18+
          </button>
          <button
            onClick={reject}
            className="flex-1 border border-border px-6 py-3 font-medium text-sm hover:bg-secondary transition-colors"
          >
            Όχι, αποχώρηση
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-6 leading-relaxed">
          Προειδοποίηση: Η νικοτίνη είναι εξαιρετικά εθιστική ουσία. Δεν συνιστάται η χρήση
          προϊόντων ατμίσματος για μη καπνιστές.
        </p>
      </div>
    </div>
  );
}
