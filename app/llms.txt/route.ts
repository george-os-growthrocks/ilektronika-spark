import { topLevelCategories } from "@/data/catalog";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://ilektronikatsigara.gr";

export async function GET() {
  const cats = topLevelCategories();
  const body = `# ilektronikatsigara.gr

> Ελληνικός κατάλογος για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης, ναργιλέδες και snus. Συνεργαζόμαστε με το vapeandmore.gr (Ρέθυμνο, πανελλαδική αποστολή).

## Σημαντικές πολιτικές
- Μόνο για ενήλικες 18+. Προϊόντα νικοτίνης δεν προορίζονται για ανηλίκους ή μη χρήστες νικοτίνης.
- Affiliate αποκάλυψη: λαμβάνουμε προμήθεια από αγορές μέσω συνδέσμων προς vapeandmore.gr· η τιμή για τον πελάτη δεν αλλάζει.
- Δεν παρέχουμε ιατρικές συμβουλές ούτε ισχυρισμούς διακοπής καπνίσματος.
- Πλήρες κείμενο για AI crawlers: ${BASE_URL}/llms-full.txt

## Κατηγορίες
${cats.map((c) => `- [${c.label}](${BASE_URL}/${c.slug}) - ${c.count} προϊόντα`).join("\n")}

## Βασικές σελίδες
- [Όλες οι κατηγορίες](${BASE_URL}/katigories)
- [Blog / Οδηγοί](${BASE_URL}/blog)
- [Συχνές ερωτήσεις](${BASE_URL}/syxnes-erotiseis)
- [Σχετικά / E-E-A-T](${BASE_URL}/sxetika)
- [Επικοινωνία](${BASE_URL}/epikoinonia)
- [Όροι χρήσης](${BASE_URL}/oroi-xrisis)
- [Πολιτική απορρήτου](${BASE_URL}/politiki-aporritou)
- Partner store: [vapeandmore.gr](https://vapeandmore.gr)

## Blog (πρόσφατα)
${blogPosts
  .slice(0, 12)
  .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}) - ${p.excerpt}`)
  .join("\n")}

## Οντότητες / Citations
- Retailer: Vape and More — Αρκαδίου 82, 74100 Ρέθυμνο — +30 2831 181046 — info@vapeandmore.gr
- Catalog: ilektronikatsigara.gr (affiliate informational catalog)
- Local listing: https://www.fagi.gr/rethymno/eshops/vapeandmore/
- Marketplace citation: https://www.bestprice.gr/m/15927/vapeandmore.html

## Δομημένα δεδομένα
- Sitemap: ${BASE_URL}/sitemap.xml
- Robots: ${BASE_URL}/robots.txt
- Πλήρες llms: ${BASE_URL}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
