import { topLevelCategories } from "@/data/catalog";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://ilektronikatsigara.gr";

export async function GET() {
  const cats = topLevelCategories();
  const body = `# ilektronikatsigara.gr

> Ελληνικός κατάλογος για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης, ναργιλέδες και snus. Συνεργαζόμαστε με το vapeandmore.gr (Ρέθυμνο, πανελλαδική αποστολή).

## Κατηγορίες
${cats.map((c) => `- [${c.label}](${BASE_URL}/${c.slug}) - ${c.count} προϊόντα`).join("\n")}

## Βασικές σελίδες
- [Όλες οι κατηγορίες](${BASE_URL}/katigories)
- [Αναζήτηση](${BASE_URL}/anazitisi)
- [Blog](${BASE_URL}/blog)
- [Συχνές ερωτήσεις](${BASE_URL}/syxnes-erotiseis)
- [Επικοινωνία](${BASE_URL}/epikoinonia)
- [Όροι χρήσης](${BASE_URL}/oroi-xrisis)
- [Πολιτική απορρήτου](${BASE_URL}/politiki-aporritou)

## Blog (πρόσφατα)
${blogPosts
  .slice(0, 8)
  .map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}) - ${p.excerpt}`)
  .join("\n")}

## Δομημένα δεδομένα
- Sitemap: ${BASE_URL}/sitemap.xml
- Πλήρες llms: ${BASE_URL}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
