import { topLevelCategories, subcategoriesOf, brands, products } from "@/data/catalog";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://ilektronikatsigara.gr";

export async function GET() {
  const cats = topLevelCategories();

  const catSection = cats
    .map((c) => {
      const subs = subcategoriesOf(c.slug);
      const subList = subs.length
        ? subs.map((s) => ` - [${s.label}](${BASE_URL}/${c.slug}/${s.slug}) - ${s.count}`).join("\n")
        : "";
      return `### ${c.label} (${BASE_URL}/${c.slug}) - ${c.count} προϊόντα\n${subList}`;
    })
    .join("\n\n");

  const topBrands = [...brands]
    .sort((a, b) => b.count - a.count)
    .slice(0, 40)
    .map((b) => `- [${b.label}](${BASE_URL}/marka/${b.slug}) - ${b.count}`)
    .join("\n");

  const featuredProducts = products
    .filter((p) => p.inStock)
    .slice(0, 60)
    .map(
      (p) =>
        `- [${p.name}](${BASE_URL}/proionta/${p.slug})${p.brand ? ` - ${p.brand}` : ""}${p.price ? ` - ${p.price.toFixed(2)}€` : ""}`,
    )
    .join("\n");

  const blogList = blogPosts
    .map(
      (p) =>
        `### [${p.title}](${BASE_URL}/blog/${p.slug})\n${p.excerpt}\nΛέξεις-κλειδιά: ${p.keywords.join(", ")}\n`,
    )
    .join("\n");

  const body = `# ilektronikatsigara.gr - Πλήρης οδηγός για LLMs

Ελληνικός κατάλογος για ηλεκτρονικά τσιγάρα και αξεσουάρ. Συνεργαζόμαστε με το vapeandmore.gr (Ρέθυμνο, πανελλαδική αποστολή 1-3 εργάσιμες, δωρεάν από 30€).

Σύνολα: ${products.length} προϊόντα, ${cats.length} βασικές κατηγορίες, ${brands.length} μάρκες.

## Κατηγορίες & υποκατηγορίες
${catSection}

## Κορυφαίες μάρκες
${topBrands}

## Επιλεγμένα προϊόντα
${featuredProducts}

## Blog posts
${blogList}

## Πολιτικές
- Αγορές μέσω του συνεργάτη μας: https://vapeandmore.gr
- Affiliate: λαμβάνουμε προμήθεια από referral links· η τιμή πελάτη δεν αλλάζει.
- 18+ μόνο. Προϊόντα νικοτίνης TPD-compliant. Όχι ιατρικοί ισχυρισμοί.
- Πανελλαδική αποστολή 1-3 εργάσιμες, δωρεάν από 30€.
- Επιστροφές: 14 ημέρες σε σφραγισμένη συσκευασία.
- Πιστοποιήσεις & συμβατότητα: αυθεντικά προϊόντα από εξουσιοδοτημένους διανομείς.
- NAP: Vape and More, Αρκαδίου 82, 74100 Ρέθυμνο, +30 2831 181046, info@vapeandmore.gr
- Citations: https://www.fagi.gr/rethymno/eshops/vapeandmore/ · https://www.bestprice.gr/m/15927/vapeandmore.html

## Sitemap
${BASE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
