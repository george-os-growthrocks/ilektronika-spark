import { createFileRoute } from "@tanstack/react-router";
import { generalFaqs } from "../data/faqs";

export const Route = createFileRoute("/syxnes-erotiseis")({
  head: () => ({
    meta: [
      { title: "Συχνές Ερωτήσεις (FAQ) | ilektronikatsigara.gr" },
      {
        name: "description",
        content:
          "Απαντήσεις σε όλες τις συχνές ερωτήσεις για ηλεκτρονικά τσιγάρα, disposable vapes, νικοτίνη, υγρά, ναργιλέδες, ασφάλεια και νομοθεσία στην Ελλάδα.",
      },
      { property: "og:title", content: "FAQ — ilektronikatsigara.gr" },
      { property: "og:url", content: "/syxnes-erotiseis" },
    ],
    links: [{ rel: "canonical", href: "/syxnes-erotiseis" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: generalFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <section className="py-16">
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
                <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
