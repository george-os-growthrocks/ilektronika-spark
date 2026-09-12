import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";
import { urlsetXml, xmlResponse, type SitemapEntry } from "@/lib/sitemap";

export const dynamic = "force-static";

const STATIC: { path: string; priority: string; changefreq: SitemapEntry["changefreq"] }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/katigories", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/syxnes-erotiseis", priority: "0.7", changefreq: "monthly" },
  { path: "/sxetika", priority: "0.5", changefreq: "yearly" },
  { path: "/epikoinonia", priority: "0.5", changefreq: "yearly" },
  { path: "/apostoles-epistrofes", priority: "0.4", changefreq: "yearly" },
  { path: "/oroi-xrisis", priority: "0.3", changefreq: "yearly" },
  { path: "/politiki-aporritou", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies", priority: "0.3", changefreq: "yearly" },
];

export async function GET() {
  const latestPost = [...blogPosts]
    .map((p) => p.publishedAt)
    .sort()
    .pop();
  const entries: SitemapEntry[] = [
    ...STATIC.map((s) => ({
      loc: `${SITE_URL}${s.path}`,
      priority: s.priority,
      changefreq: s.changefreq,
      lastmod: s.path === "/blog" ? latestPost : undefined,
    })),
    ...blogPosts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.updatedAt ?? p.publishedAt,
      changefreq: "monthly" as const,
      priority: "0.6",
    })),
  ];
  return xmlResponse(urlsetXml(entries));
}
