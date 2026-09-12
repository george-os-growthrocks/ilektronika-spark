import { categories, categoryUrl } from "@/data/catalog";
import { isCategoryIndexable } from "@/lib/indexing";
import { SITE_URL } from "@/lib/seo";
import { urlsetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

export async function GET() {
  const entries = categories
    .filter((c) => c.count > 0 && isCategoryIndexable(c))
    .map((c) => ({
      loc: `${SITE_URL}${categoryUrl(c)}`,
      changefreq: "weekly" as const,
      priority: c.depth === 0 ? "0.9" : "0.8",
    }));
  return xmlResponse(urlsetXml(entries));
}
