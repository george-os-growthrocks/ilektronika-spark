import { brands } from "@/data/catalog";
import { isBrandIndexable } from "@/lib/indexing";
import { SITE_URL } from "@/lib/seo";
import { urlsetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

export async function GET() {
  const entries = brands.filter(isBrandIndexable).map((b) => ({
    loc: `${SITE_URL}/marka/${b.slug}`,
    changefreq: "weekly" as const,
    priority: "0.7",
  }));
  return xmlResponse(urlsetXml(entries));
}
