import { topLevelCategories } from "@/data/catalog";
import { blogPosts } from "@/data/blog";

export async function GET() {
  const cats = topLevelCategories();
  const body = `# ilektronikatsigara.gr

> Ελληνικός κατάλογος για ηλεκτρονικά τσιγάρα, disposable vapes, pod systems, υγρά αναπλήρωσης, ναργιλέδες και snus. Συνεργαζόμαστε με το vapeandmore.gr (Ρέθυμνο, πανελλαδική αποστολή).

## Κατηγορίες
${cats.map((c) => `- [${c.label}](/${c.slug}) — ${c.count} προϊόντα`).join("\n")}

## Βασικές σελίδες
- [Όλες οι κατηγορίες](/katigories)
- [Αναζήτηση](/anazitisi)
- [Blog](/blog)
- [Συχνές ερωτήσεις](/syxnes-erotiseis)
- [Επικοινωνία](/epikoinonia)
- [Όροι χρήσης](/oroi-xrisis)
- [Πολιτική απορρήτου](/politiki-aporritou)

## Blog (πρόσφατα)
${blogPosts
  .slice(0, 8)
  .map((p) => `- [${p.title}](/blog/${p.slug}) — ${p.excerpt}`)
  .join("\n")}

## Δομημένα δεδομένα
- Sitemap: /sitemap.xml
- Πλήρες llms: /llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
