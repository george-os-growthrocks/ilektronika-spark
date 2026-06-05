import type { Metadata } from "next";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";

const SOURCE =
  "https://vapeandmore.gr/%ce%bf%cf%81%ce%bf%ce%b9-%cf%87%cf%81%ce%b7%cf%83%ce%b7%cf%83/";

export const metadata: Metadata = {
  title: "Όροι Χρήσης",
  description:
    "Όροι χρήσης για τον affiliate κατάλογο ilektronikatsigara.gr και το συνεργαζόμενο κατάστημα vapeandmore.gr.",
  openGraph: { url: "/oroi-xrisis" },
  alternates: { canonical: "/oroi-xrisis" },
};

export default function TermsPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Όροι Χρήσης</h1>
      <p className="text-muted-foreground mb-10">
        Με τη χρήση του ilektronikatsigara.gr αποδέχεστε τους παρακάτω όρους και τους όρους του
        συνεργαζόμενου καταστήματος{" "}
        <a
          href={SOURCE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          vapeandmore.gr
        </a>
        .
      </p>
      <div className="space-y-6 text-foreground/90">
        <section>
          <h2 className="text-xl font-extrabold">1. Φύση του ιστότοπου</h2>
          <p>
            Το ilektronikatsigara.gr είναι ενημερωτικός κατάλογος προϊόντων ατμίσματος και ναργιλέ.
            Δεν πραγματοποιεί πωλήσεις. Όλες οι παραγγελίες εκτελούνται στο{" "}
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
        </section>
        <section>
          <h2 className="text-xl font-extrabold">2. Ηλικιακός περιορισμός 18+</h2>
          <p>
            Η πρόσβαση επιτρέπεται μόνο σε ενήλικες (18+). Τα προϊόντα ατμίσματος{" "}
            <strong>δεν</strong> αποτελούν εγκεκριμένη θεραπεία διακοπής καπνίσματος.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">3. Τιμές & διαθεσιμότητα</h2>
          <p>
            Τιμές, αποθέματα και χαρακτηριστικά αντλούνται από το vapeandmore.gr και ενδέχεται να
            αλλάξουν χωρίς προειδοποίηση. Δεσμευτικές είναι μόνο οι τιμές στο checkout του
            vapeandmore.gr.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">4. Affiliate σχέση</h2>
          <p>
            Λαμβάνουμε προμήθεια για παραγγελίες που προέρχονται από συνδέσμους μας. Αυτό δεν
            επηρεάζει την τιμή που πληρώνει ο πελάτης.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">5. Πνευματικά δικαιώματα</h2>
          <p>
            Λογότυπα και φωτογραφίες προϊόντων ανήκουν στους νόμιμους κατόχους τους και
            χρησιμοποιούνται για ενημερωτικούς σκοπούς.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">6. Πλήρεις όροι</h2>
          <p>
            Οι πλήρεις, νομικά δεσμευτικοί όροι αγοράς και χρήσης βρίσκονται στο{" "}
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              vapeandmore.gr/οροι-χρησης
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
