import type { Metadata } from "next";
import { DOMAIN, SITE_URL } from "@/config/site";
import { getCopy } from "@/content/copy";
import type { Locale } from "@/content/locale";

export function pageMetadata(locale: Locale): Metadata {
  const t = getCopy(locale);
  const path = locale === "en" ? "/en" : "/";

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: {
        el: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: path,
      title: t.meta.title,
      description: t.meta.description,
      siteName: DOMAIN,
      locale: locale === "en" ? "en_US" : "el_GR",
      alternateLocale: locale === "en" ? ["el_GR"] : ["en_US"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/twitter-image"],
    },
    robots: { index: true, follow: true },
  };
}
