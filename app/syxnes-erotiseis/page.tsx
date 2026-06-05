import type { Metadata } from "next";
import { generalFaqs } from "@/data/faqs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Συχνές Ερωτήσεις για το Άτμισμα | FAQ | ilektronikatsigara.gr",
  description:
    "Βρείτε απαντήσεις σε όλες τις συχνές ερωτήσεις για ηλεκτρονικά τσιγάρα, disposable vapes, νικοτίνη, υγρά, ναργιλέδες και νομοθεσία στην Ελλάδα.",
  openGraph: { title: "FAQ | ilektronikatsigara.gr", url: "/syxnes-erotiseis" },
  alternates: { canonical: "/syxnes-erotiseis" },
};

export default function FaqPage() {
  return (
    <section className="py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: generalFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
          FAQ
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
          Συχνές Ερωτήσεις
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Όλα όσα ρωτάνε συχνά οι πελάτες μας — από τη σωστή επιλογή νικοτίνης μέχρι τη νομοθεσία.
        </p>
        <div className="space-y-3 mb-12">
          {generalFaqs.map((f, i) => (
            <details key={i} className="border border-border p-6 group">
              <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
                <span className="pr-4">{f.q}</span>
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
