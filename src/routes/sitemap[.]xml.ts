import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { blogPosts } from "../data/blog";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/blog", priority: "0.9", changefreq: "weekly" },
          { path: "/syxnes-erotiseis", priority: "0.8", changefreq: "monthly" },
          { path: "/sxetika", priority: "0.6", changefreq: "yearly" },
          { path: "/epikoinonia", priority: "0.6", changefreq: "yearly" },
          { path: "/apostoles-epistrofes", priority: "0.5", changefreq: "yearly" },
          { path: "/oroi-xrisis", priority: "0.3", changefreq: "yearly" },
          { path: "/politiki-aporritou", priority: "0.3", changefreq: "yearly" },
          { path: "/cookies", priority: "0.3", changefreq: "yearly" },
        ];

        const categoryPaths = categories.map((c) => ({
          path: `/${c.slug}`,
          priority: "0.9",
          changefreq: "weekly" as const,
        }));

        const productPaths = products.map((p) => ({
          path: `/proionta/${p.slug}`,
          priority: "0.7",
          changefreq: "weekly" as const,
        }));

        const blogPaths = blogPosts.map((p) => ({
          path: `/blog/${p.slug}`,
          priority: "0.7",
          changefreq: "monthly" as const,
          lastmod: p.publishedAt,
        }));

        const entries = [...staticPaths, ...categoryPaths, ...productPaths, ...blogPaths];

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
      },
    },
  },
});
