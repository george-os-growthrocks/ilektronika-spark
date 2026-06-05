import type { Metadata } from "next";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";

const SOURCE = "https://vapeandmore.gr/cookies/";

export const metadata: Metadata = {
  title: "Πολιτική Cookies | ilektronikatsigara.gr",
  description:
    "Μάθετε ποια cookies χρησιμοποιούμε στο ilektronikatsigara.gr και στο συνεργαζόμενο κατάστημα vapeandmore.gr για τη σωστή διαχείριση συγκαταθέσεων.",
  openGraph: { url: "/cookies" },
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Πολιτική Cookies</h1>
      <p className="text-muted-foreground mb-10">
        Χρησιμοποιούμε cookies για βασική λειτουργία, στατιστικά και affiliate tracking προς το{" "}
        <a
          href="https://vapeandmore.gr"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-primary underline"
        >
          vapeandmore.gr
        </a>
        .
      </p>
      <div className="space-y-6 text-foreground/90">
        <section>
          <h2 className="text-xl font-extrabold">Κατηγορίες cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Απολύτως απαραίτητα</strong> — επαλήθευση 18+, αποθήκευση συνομιλίας AI
              βοηθού.
            </li>
            <li>
              <strong>Στατιστικά</strong> — ανώνυμη μέτρηση επισκεψιμότητας.
            </li>
            <li>
              <strong>Affiliate</strong> — UTM παράμετροι (utm_source=ilektronikatsigara) για
              απόδοση παραγγελιών.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">Διαχείριση</h2>
          <p>
            Μπορείτε να διαγράψετε ή να αποκλείσετε τα cookies από τις ρυθμίσεις του browser σας.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">Αναλυτικά</h2>
          <p>
            Πλήρης πολιτική cookies του καταστήματος:{" "}
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              vapeandmore.gr/cookies
            </a>
            .
          </p>
        </section>
      </div>
      <LegalCta />
      <MerchantBlock />
    </section>
  );
}
