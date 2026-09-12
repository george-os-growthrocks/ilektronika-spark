"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ageVerified-v1";

/**
 * Age gate that is present in the server HTML (no flash of content for new
 * visitors) and hidden before paint for returning visitors: the root layout's
 * pre-paint script adds `html.age-ok` when localStorage already says yes, and
 * globals.css hides `[data-age-gate]` under that class.
 */
export function AgeGate() {
  const [verified, setVerified] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "yes") {
        setVerified(true);
        return;
      }
    } catch {
      // storage unavailable: keep the gate
    }
    acceptRef.current?.focus();
  }, []);

  if (verified) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // ignore
    }
    document.documentElement.classList.add("age-ok");
    setVerified(true);
  };

  const reject = () => {
    window.location.href = "https://www.google.com";
  };

  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !boxRef.current) return;
    const focusables = boxRef.current.querySelectorAll<HTMLElement>("button");
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      data-age-gate
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
      onKeyDown={trapTab}
      className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div
        ref={boxRef}
        className="max-w-md w-full bg-background text-foreground p-8 border border-border"
      >
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-foreground text-background text-xs font-bold mb-4">
            18+
          </div>
          <h2 id="age-gate-title" className="text-2xl font-extrabold tracking-tight mb-3">
            Επαλήθευση Ηλικίας
          </h2>
          <p id="age-gate-desc" className="text-sm text-muted-foreground leading-relaxed mb-3">
            Η ιστοσελίδα αυτή περιέχει πληροφορίες για προϊόντα νικοτίνης, τα οποία προορίζονται
            αποκλειστικά για ενήλικες άνω των 18 ετών.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Επιβεβαιώνετε ότι είστε άνω των 18 ετών;
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            ref={acceptRef}
            type="button"
            onClick={accept}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            ΝΑΙ, ΕΙΜΑΙ 18+
          </button>
          <button
            type="button"
            onClick={reject}
            className="flex-1 border border-border px-6 py-3 font-medium text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
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
