import type { Metadata } from "next";
import { MerchantBlock, LegalCta } from "@/components/LegalBlocks";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Επικοινωνία | Vape and More | ilektronikatsigara.gr",
  description:
    "Επικοινωνήστε με το συνεργαζόμενο κατάστημα Vape and More στο Ρέθυμνο. Τηλέφωνο 2831 181 046, email info@vapeandmore.gr, διεύθυνση Αρκαδίου 82.",
  openGraph: { url: "/epikoinonia" },
  alternates: { canonical: "/epikoinonia" },
};

export default function ContactPage() {
  return (
    <section className="py-16 max-w-3xl mx-auto px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Vape and More",
          telephone: "+302831181046",
          email: "info@vapeandmore.gr",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Αρκαδίου 82",
            addressLocality: "Ρέθυμνο",
            postalCode: "74100",
            addressCountry: "GR",
          },
          url: "https://vapeandmore.gr",
        }}
      />
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Επικοινωνία</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Για παραγγελίες, διαθεσιμότητα ή τεχνική υποστήριξη, επικοινωνήστε απευθείας με το
        συνεργαζόμενο φυσικό κατάστημα{" "}
        <a
          href="https://vapeandmore.gr"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-primary underline font-bold"
        >
          Vape and More
        </a>
        .
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <a
          href="tel:+302831181046"
          className="border border-border rounded-lg p-6 hover:border-primary transition-colors block"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">
            📞 ΤΗΛΕΦΩΝΟ
          </span>
          <p className="font-extrabold text-xl">2831 181 046</p>
          <p className="text-sm text-muted-foreground mt-1">Δευ-Σαβ 10:00-21:00</p>
        </a>
        <a
          href="mailto:info@vapeandmore.gr"
          className="border border-border rounded-lg p-6 hover:border-primary transition-colors block"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">
            ✉️ EMAIL
          </span>
          <p className="font-extrabold text-lg break-all">info@vapeandmore.gr</p>
          <p className="text-sm text-muted-foreground mt-1">Απάντηση εντός 24 ωρών</p>
        </a>
        <div className="border border-border rounded-lg p-6 sm:col-span-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">
            📍 ΦΥΣΙΚΟ ΚΑΤΑΣΤΗΜΑ
          </span>
          <p className="font-extrabold text-lg">Αρκαδίου 82, 74100 Ρέθυμνο</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Vape+and+More+Arkadiou+82+Rethymno"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline mt-2 inline-block"
          >
            Άνοιγμα στους χάρτες →
          </a>
        </div>
      </div>
      <LegalCta />
      <MerchantBlock />
    </section>
  );
}
