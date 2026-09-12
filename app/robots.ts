import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/anazitisi",
        "/anazitisi/",
        "/*?sort=",
        "/*&sort=",
        "/*?brand=",
        "/*&brand=",
        "/*?instock=",
        "/*&instock=",
      ],
    },
    sitemap: "https://ilektronikatsigara.gr/sitemap.xml",
  };
}
