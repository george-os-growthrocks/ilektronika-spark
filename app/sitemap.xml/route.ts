import { categories, products, brands } from "@/data/catalog";
import { blogPosts } from "@/data/blog";
import { CATALOG_LASTMOD, SITE_URL } from "@/lib/seo";

export async function GET() {
  const staticPaths = [
    { path: "/", priority: "1.0", changefreq: "weekly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/katigories", priority: "0.9", changefreq: "weekly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/blog", priority: "0.8", changefreq: "weekly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/syxnes-erotiseis", priority: "0.7", changefreq: "monthly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/sxetika", priority: "0.5", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/epikoinonia", priority: "0.5", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/apostoles-epistrofes", priority: "0.4", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/oroi-xrisis", priority: "0.3", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/politiki-aporritou", priority: "0.3", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
    { path: "/cookies", priority: "0.3", changefreq: "yearly" as const, lastmod: CATALOG_LASTMOD },
  ];

  const categoryPaths = categories
    .filter((c) => c.depth === 0)
    .map((c) => ({
      path: `/${c.slug}`,
      priority: "0.9",
      changefreq: "weekly" as const,
      lastmod: CATALOG_LASTMOD,
    }));

  const subcategoryPaths = categories
    .filter((c) => c.depth === 1 && c.parentSlug)
    .map((c) => ({
      path: `/${c.parentSlug}/${c.slug}`,
      priority: "0.8",
      changefreq: "weekly" as const,
      lastmod: CATALOG_LASTMOD,
    }));

  const productPaths = products.map((p) => ({
    path: `/proionta/${p.slug}`,
    priority: "0.7",
    changefreq: "weekly" as const,
    lastmod: CATALOG_LASTMOD,
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
    lastmod: CATALOG_LASTMOD,
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
        `    <loc>${SITE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
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
