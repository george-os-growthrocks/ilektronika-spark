import { SITE_URL } from "./seo";

export interface SitemapEntry {
  loc: string;
  lastmod?: string | null;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
  images?: string[];
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function urlsetXml(entries: SitemapEntry[]): string {
  const hasImages = entries.some((e) => e.images && e.images.length > 0);
  const ns = hasImages
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  const body = entries
    .map((e) => {
      const lines = ["  <url>", `    <loc>${esc(e.loc)}</loc>`];
      if (e.lastmod) lines.push(`    <lastmod>${esc(e.lastmod)}</lastmod>`);
      if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
      if (e.priority) lines.push(`    <priority>${e.priority}</priority>`);
      for (const img of e.images ?? []) {
        lines.push(`    <image:image><image:loc>${esc(img)}</image:loc></image:image>`);
      }
      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset ${ns}>\n${body}\n</urlset>`;
}

export function sitemapIndexXml(children: { path: string; lastmod?: string }[]): string {
  const body = children
    .map((c) =>
      [
        "  <sitemap>",
        `    <loc>${esc(SITE_URL + c.path)}</loc>`,
        c.lastmod ? `    <lastmod>${esc(c.lastmod)}</lastmod>` : null,
        "  </sitemap>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

export const SITEMAP_CHILDREN = [
  "/sitemap-pages.xml",
  "/sitemap-categories.xml",
  "/sitemap-brands.xml",
  "/sitemap-products.xml",
];
