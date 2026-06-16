import type { Metadata } from "next";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";

const PAYMENT_SOURCE =
  "https://vapeandmore.gr/%cf%80%ce%bb%ce%b7%cf%81%cf%89%ce%bc%ce%ae-%cf%80%ce%b1%cf%81%ce%ac%ce%b4%ce%bf%cf%83%ce%b7/";
const SECURITY_SOURCE =
  "https://vapeandmore.gr/%ce%b1%cf%83%cf%86%ce%ac%ce%bb%ce%b5%ce%b9%ce%b1-%cf%83%cf%85%ce%bd%ce%b1%ce%bb%ce%bb%ce%b1%ce%b3%cf%8e%ce%bd/";

export const metadata: Metadata = {
  title: "Αποστολές, Πληρωμές & Επιστροφές",
  description:
    "Τρόποι πληρωμής, αποστολή ACS / ΕΛΤΑ Courier, επιστροφές και ασφάλεια συναλλαγών μέσω vapeandmore.gr.",
  openGraph: { url: "/apostoles-epistrofes" },
  alternates: { canonical: "/apostoles-epistrofes" },
};

export default function ShippingPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
        Αποστολές, Πληρωμές & Επιστροφές
      </h1>
      <p className="text-muted-foreground mb-10">
        Όλες οι παραγγελίες εκτελούνται και αποστέλλονται από το συνεργαζόμενο κατάστημα{" "}
        <a
          href="https://vapeandmore.gr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          vapeandmore.gr
        </a>
        .
      </p>
      <div className="space-y-8 text-foreground/90">
        <section>
          <h2 className="text-xl font-extrabold mb-2">🚚 Αποστολή</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Πανελλαδική αποστολή με ACS / ΕΛΤΑ Courier.</li>
            <li>Παράδοση 1–3 εργάσιμες ημέρες (περιοχές: 1–2, νησιά: 2–4).</li>
            <li>
              <strong>Δωρεάν αποστολή</strong> για παραγγελίες άνω των 30€.
            </li>
            <li>Αποστολές αυθημερόν για παραγγελίες πριν τις 14:00 (εργάσιμες).</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-extrabold mb-2">💳 Τρόποι πληρωμής</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Πιστωτική / χρεωστική κάρτα (Visa, Mastercard) με 3D Secure.</li>
            <li>PayPal.</li>
            <li>Τραπεζική κατάθεση.</li>
            <li>Αντικαταβολή (+ μικρή χρέωση courier).</li>
          </ul>
          <p className="text-sm mt-3">
            Πλήρεις όροι πληρωμής & παράδοσης:{" "}
            <a
              href={PAYMENT_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              vapeandmore.gr/πληρωμή-παράδοση
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold mb-2">🔒 Ασφάλεια συναλλαγών</h2>
          <p>
            SSL κρυπτογράφηση σε όλο τον ιστότοπο, PCI-DSS συμμόρφωση μέσω του παρόχου πληρωμών.
            Καμία αποθήκευση στοιχείων κάρτας στους servers του καταστήματος.
          </p>
          <p className="text-sm mt-2">
            Αναλυτικά:{" "}
            <a
              href={SECURITY_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              vapeandmore.gr/ασφάλεια-συναλλαγών
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-extrabold mb-2">↩️ Επιστροφές</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Δικαίωμα υπαναχώρησης 14 ημερών για σφραγισμένα προϊόντα.</li>
            <li>Δεν επιστρέφονται αποσφραγισμένα υγρά / disposables για λόγους υγιεινής.</li>
            <li>Ελαττωματικά προϊόντα αντικαθίστανται δωρεάν.</li>
            <li>
              Επικοινωνία πριν την επιστροφή:{" "}
              <a href="mailto:info@vapeandmore.gr" className="text-primary underline">
                info@vapeandmore.gr
              </a>
              .
            </li>
          </ul>
        </section>
      </div>
      <LegalCta />
      <MerchantBlock />
    </section>
  );
}
