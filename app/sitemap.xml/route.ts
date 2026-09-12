import { blogPosts } from "@/data/blog";
import { SITEMAP_CHILDREN, sitemapIndexXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

export async function GET() {
  const latestPost = [...blogPosts]
    .map((p) => p.publishedAt)
    .sort()
    .pop();
  return xmlResponse(
    sitemapIndexXml(
      SITEMAP_CHILDREN.map((path) => ({
        path,
        lastmod: path === "/sitemap-pages.xml" ? latestPost : undefined,
      })),
    ),
  );
}
