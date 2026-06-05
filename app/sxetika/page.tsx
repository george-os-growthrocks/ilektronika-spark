import type { Metadata } from "next";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";

export const metadata: Metadata = {
  title: "Σχετικά με εμάς",
  description:
    "Το ilektronikatsigara.gr είναι ο ελληνόφωνος κατάλογος προϊόντων ατμίσματος του συνεργαζόμενου καταστήματος Vape and More (Ρέθυμνο).",
  openGraph: { url: "/sxetika" },
  alternates: { canonical: "/sxetika" },
};

export default function AboutPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Σχετικά με εμάς</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Ένας ελληνόφωνος, καλά οργανωμένος κατάλογος για όλο το vape & ναργιλέ — σε συνεργασία με
        ένα από τα πιο αξιόπιστα φυσικά καταστήματα της Ελλάδας.
      </p>
      <div className="space-y-8 text-foreground/90">
        <section>
          <h2 className="text-2xl font-extrabold mb-2">Ποιοι είμαστε</h2>
          <p>
            Το <strong>ilektronikatsigara.gr</strong> είναι affiliate κατάλογος που παρουσιάζει πάνω
            από 1.000 προϊόντα ατμίσματος, υγρών, pods, disposables και ναργιλέ στα ελληνικά. Όλη η
            γκάμα συγχρονίζεται με το{" "}
            <a
              href="https://vapeandmore.gr"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-primary underline font-bold"
            >
              vapeandmore.gr
            </a>
            , που εκτελεί τις παραγγελίες, την αποστολή και την υποστήριξη.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-2">Ο συνεργάτης μας — Vape and More</h2>
          <p>
            Η Vape and More λειτουργεί φυσικό κατάστημα στη <strong>Αρκαδίου 82 στο Ρέθυμνο</strong>{" "}
            και πραγματοποιεί πανελλαδικές αποστολές. Αυθεντικά προϊόντα από επίσημους εισαγωγείς,
            τεχνική υποστήριξη από vapers, και ένα από τα πιο πλήρη stock στο νησί.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-2">Γιατί δύο sites;</h2>
          <p>
            Το vapeandmore.gr είναι το e-shop. Το ilektronikatsigara.gr είναι ο{" "}
            <strong>καθαρά ενημερωτικός</strong> κατάλογος με AI βοηθό, οδηγούς, FAQ και
            SEO-friendly δομή — ώστε όποιος ψάχνει στα ελληνικά &quot;ηλεκτρονικό τσιγάρο&quot; να
            βρίσκει αμέσως το σωστό προϊόν, σε σωστή τιμή, σε αξιόπιστο κατάστημα.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-2">Διαφάνεια affiliate</h2>
          <p>
            Λαμβάνουμε μικρή προμήθεια για παραγγελίες που προέρχονται από συνδέσμους μας.{" "}
            <strong>Η τιμή για τον πελάτη δεν αλλάζει.</strong> Όλες οι συναλλαγές, τα προσωπικά
            δεδομένα, η αποστολή και η εγγύηση χειρίζονται αποκλειστικά από το vapeandmore.gr.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-2">Ηλικιακός περιορισμός</h2>
          <p>
            Όλα τα προϊόντα προορίζονται αυστηρά για ενήλικες (18+). Τα προϊόντα ατμίσματος δεν
            αποτελούν εγκεκριμένη μέθοδο διακοπής καπνίσματος.
          </p>
        </section>
      </div>
      <LegalCta />
      <MerchantBlock />
    </section>
  );
}
