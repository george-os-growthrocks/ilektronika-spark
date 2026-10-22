import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN, SITE_URL } from "@/config/site";
import {
  GREEKLISH_TERM,
  GREEKLISH_VOLUME,
  GSC_CLICKS,
  GSC_IMPRESSIONS,
  HEAD_KD,
  HEAD_TERM,
  HEAD_VOLUME,
  KEYWORDS,
  PLURAL_TERM,
  PLURAL_VOLUME,
  SOURCE_EN,
} from "@/content/facts";

export const dynamic = "force-static";

export function GET() {
  const eur = ASKING_PRICE_EUR.toLocaleString("en-US");
  const keywords = KEYWORDS.map(
    (row) => `- ${row.term}: ${row.volume.toLocaleString("en-US")}`,
  ).join("\n");

  const body = `# ${DOMAIN}

> Greek .gr domain name for sale. Asking price: €${eur}.

This site is a domain-sale page. It does not sell or advertise nicotine products.

## Offer
- Domain: ${DOMAIN} (the domain name only)
- Asking price: €${eur} to buy outright
- Also available: lease or lease-to-own (terms agreed separately)
- Payment through escrow; transfer through the EETT .gr registry
- A .gr name can be assigned to any natural or legal person, Greek or foreign
- Contact: ${CONTACT_EMAIL}
- Greek page: ${SITE_URL}
- English page: ${SITE_URL}/en

## Search facts
${SOURCE_EN}
- Exact match "${HEAD_TERM}": about ${HEAD_VOLUME.toLocaleString("en-US")} searches/month in Greece, keyword difficulty ${HEAD_KD}
- "${PLURAL_TERM}": ${PLURAL_VOLUME.toLocaleString("en-US")}/month; "${GREEKLISH_TERM}": ${GREEKLISH_VOLUME.toLocaleString("en-US")}/month
- Google Search Console, 1 Jun to 19 Oct 2026: ${GSC_CLICKS} clicks, ${GSC_IMPRESSIONS.toLocaleString("en-US")} impressions (previous site on the domain)
- Online e-cigarette advertising is not allowed in Greece, so organic search matters
- The figures describe demand, not a ranking guarantee

## Keyword volumes (monthly searches, Greece)
${keywords}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
