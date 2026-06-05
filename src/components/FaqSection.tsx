import type { FAQItem } from "../data/faqs-generated";

export function FaqSection({
  faqs,
  title = "Συχνές Ερωτήσεις",
}: {
  faqs: FAQItem[];
  title?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">{title}</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group border border-border rounded-md bg-card overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-surface font-semibold text-sm md:text-base list-none">
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-primary text-xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
