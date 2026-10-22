import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN, SITE_URL, TOTAL_EUR } from "@/config/site";
import type { Copy } from "@/content/copy";
import type { Locale } from "@/content/locale";

export function buildJsonLd(locale: Locale, copy: Copy) {
  const pageUrl = locale === "en" ? `${SITE_URL}/en` : SITE_URL;
  const faqUrl = `${pageUrl}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: DOMAIN,
        description: copy.meta.description,
        inLanguage: ["el", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: DOMAIN,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon`,
        },
      },
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#domain`,
        name: DOMAIN,
        description: copy.hero.answer,
        category: "Domain name",
        sku: DOMAIN,
        url: SITE_URL,
        brand: { "@type": "Brand", name: DOMAIN },
        offers: {
          "@type": "Offer",
          "@id": `${SITE_URL}/#offer`,
          url: `${SITE_URL}/#contact`,
          price: String(TOTAL_EUR),
          priceCurrency: "EUR",
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              price: String(TOTAL_EUR),
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
            {
              "@type": "UnitPriceSpecification",
              price: String(ASKING_PRICE_EUR),
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
          ],
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqUrl,
        url: faqUrl,
        inLanguage: locale,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}
