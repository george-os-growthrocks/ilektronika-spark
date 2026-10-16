import { ASKING_PRICE_EUR, CONTACT_EMAIL, DOMAIN, SITE_URL } from "@/config/site";
import {
  BACKLINKS,
  BRANDED_VOLUME,
  COMPETITOR_DR,
  HEAD_KD,
  HEAD_TERM,
  HEAD_VOLUME,
  KEYWORDS,
  NON_BRAND_VOLUME,
  REFERRING_DOMAINS,
  SOURCE,
  TRAFFIC_VALUE_USD,
} from "@/content/facts";

export const dynamic = "force-static";

export function GET() {
  const keywords = KEYWORDS.map(
    (row) => `- ${row.term}: ${row.volume.toLocaleString("en-US")}`,
  ).join("\n");

  const body = `# ${DOMAIN}

> Premium .gr domain name for sale. Asking price: €${ASKING_PRICE_EUR.toLocaleString("en-US")}.

This site is a domain-sale page. It does not sell or advertise nicotine products.

## Offer
- Domain: ${DOMAIN}
- Asking price: €${ASKING_PRICE_EUR.toLocaleString("en-US")} to buy outright
- Also available: lease or lease-to-own (no published lease price)
- .gr transfer requires an EU-based buyer
- Included: a ready-to-launch Next.js e-shop with a custom SEO setup and payments already configured
- Contact: ${CONTACT_EMAIL}
- Greek page: ${SITE_URL}
- English page: ${SITE_URL}/en

## Verified search facts
${SOURCE}
- Exact match "${HEAD_TERM}": ${HEAD_VOLUME.toLocaleString("en-US")} searches/month in Greece, keyword difficulty ${HEAD_KD}
- "ilektroniko tsigaro": 450 monthly searches; "ηλεκτρονικά τσιγάρα": 800 monthly searches
- Non-brand category searches: ${NON_BRAND_VOLUME.toLocaleString("en-US")}/month
- Including brands: ${BRANDED_VOLUME.toLocaleString("en-US")}+/month (heated tobacco 92,700; generic e-cig/vape 22,170; device brands 13,740; nicotine pouches 11,370)
- The current #1 for the head term is a DR ${COMPETITOR_DR} shop, so a top ranking is a realistic goal, not a guarantee
- Greek law bans paid e-cigarette advertising, so organic search is the main acquisition channel and this traffic cannot be bought with ads
- Conservative organic traffic value at a top-3 ranking: about $${TRAFFIC_VALUE_USD.toLocaleString("en-US")}/year
- The €${ASKING_PRICE_EUR.toLocaleString("en-US")} asking price is a fraction of that yearly traffic value
- ${REFERRING_DOMAINS}+ referring domains and ${BACKLINKS}+ backlinks
- Short premium .gr

## Keyword volumes (monthly searches, Greece)
${keywords}

${SOURCE}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
