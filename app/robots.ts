import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/anazitisi", "/anazitisi/"],
    },
    sitemap: "https://ilektronikatsigara.gr/sitemap.xml",
  };
}
