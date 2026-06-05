import type { Metadata } from "next";
import Link from "next/link";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";

const SOURCE =
  "https://vapeandmore.gr/%cf%80%ce%bf%ce%bb%ce%b9%cf%84%ce%b9%ce%ba%ce%b7-%ce%b1%cf%80%ce%bf%cf%81%cf%81%ce%b7%cf%84%ce%bf%cf%85/";

export const metadata: Metadata = {
  title: "Πολιτική Απορρήτου | GDPR Συμμόρφωση | ilektronikatsigara.gr",
  description:
    "Μάθετε πώς διαχειριζόμαστε τα προσωπικά σας δεδομένα στο ilektronikatsigara.gr και στο συνεργαζόμενο κατάστημα vapeandmore.gr σύμφωνα με τον κανονισμό GDPR.",
  openGraph: { url: "/politiki-aporritou" },
  alternates: { canonical: "/politiki-aporritou" },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
        Πολιτική Απορρήτου
      </h1>
      <p className="text-muted-foreground mb-10">
        Το ilektronikatsigara.gr είναι affiliate κατάλογος. Οι παραγγελίες και η επεξεργασία
        προσωπικών δεδομένων γίνονται από το συνεργαζόμενο κατάστημα{" "}
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
      <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
        <section>
          <h2 className="text-xl font-extrabold">1. Υπεύθυνος επεξεργασίας</h2>
          <p>
            Υπεύθυνος επεξεργασίας των δεδομένων που υποβάλλετε κατά την παραγγελία είναι η{" "}
            <strong>Vape and More</strong>, Αρκαδίου 82, Ρέθυμνο. Επικοινωνία:{" "}
            <a href="mailto:info@vapeandmore.gr" className="text-primary underline">
              info@vapeandmore.gr
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">2. Τι δεδομένα συλλέγουμε</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Στοιχεία παραγγελίας (όνομα, διεύθυνση, τηλέφωνο, email) - μόνο κατά το checkout στο
              vapeandmore.gr.
            </li>
            <li>
              Δεδομένα πλοήγησης (cookies, IP, browser) - βλέπε{" "}
              <Link href="/cookies" className="text-primary underline">
                Πολιτική Cookies
              </Link>
              .
            </li>
            <li>Επαλήθευση ηλικίας 18+ για αγορά προϊόντων ατμίσματος.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">3. Σκοπός χρήσης</h2>
          <p>
            Εκτέλεση παραγγελίας, αποστολή, εξυπηρέτηση πελατών, νόμιμες υποχρεώσεις (ΑΑΔΕ, παράβολο
            ατμίσματος).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">4. Διατήρηση</h2>
          <p>
            Τα φορολογικά παραστατικά τηρούνται για όσο ορίζει η ελληνική νομοθεσία. Δεδομένα
            marketing διαγράφονται με απλό αίτημα.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">5. Τα δικαιώματά σας (GDPR)</h2>
          <p>
            Πρόσβαση, διόρθωση, διαγραφή, φορητότητα, εναντίωση. Αίτημα στο{" "}
            <a href="mailto:info@vapeandmore.gr" className="text-primary underline">
              info@vapeandmore.gr
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold">6. Αναλυτική πολιτική</h2>
          <p>
            Η πλήρης, νομικά δεσμευτική πολιτική απορρήτου του καταστήματος βρίσκεται στο{" "}
            <a
              href={SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              vapeandmore.gr/πολιτικη-απορρητου
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
