import { categories, products, brands } from "@/data/catalog";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://ilektronikatsigara.gr";

export async function GET() {
  const staticPaths = [
    { path: "/", priority: "1.0", changefreq: "weekly" as const },
    { path: "/katigories", priority: "0.9", changefreq: "weekly" as const },
    { path: "/anazitisi", priority: "0.5", changefreq: "monthly" as const },
    { path: "/blog", priority: "0.8", changefreq: "weekly" as const },
    { path: "/syxnes-erotiseis", priority: "0.7", changefreq: "monthly" as const },
    { path: "/sxetika", priority: "0.5", changefreq: "yearly" as const },
    { path: "/epikoinonia", priority: "0.5", changefreq: "yearly" as const },
    { path: "/apostoles-epistrofes", priority: "0.4", changefreq: "yearly" as const },
    { path: "/oroi-xrisis", priority: "0.3", changefreq: "yearly" as const },
    { path: "/politiki-aporritou", priority: "0.3", changefreq: "yearly" as const },
    { path: "/cookies", priority: "0.3", changefreq: "yearly" as const },
  ];

  const categoryPaths = categories
    .filter((c) => c.depth === 0)
    .map((c) => ({ path: `/${c.slug}`, priority: "0.9", changefreq: "weekly" as const }));

  const subcategoryPaths = categories
    .filter((c) => c.depth === 1 && c.parentSlug)
    .map((c) => ({
      path: `/${c.parentSlug}/${c.slug}`,
      priority: "0.8",
      changefreq: "weekly" as const,
    }));

  const productPaths = products.map((p) => ({
    path: `/proionta/${p.slug}`,
    priority: "0.7",
    changefreq: "weekly" as const,
  }));

  const blogPaths = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: "0.6",
    changefreq: "monthly" as const,
    lastmod: p.publishedAt,
  }));

  const brandPaths = brands.map((b) => ({
    path: `/marka/${b.slug}`,
    priority: "0.7",
    changefreq: "weekly" as const,
  }));

  const entries = [
    ...staticPaths,
    ...categoryPaths,
    ...subcategoryPaths,
    ...productPaths,
    ...blogPaths,
    ...brandPaths,
  ];

  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.path}</loc>`,
        "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
