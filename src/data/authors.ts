export const SITE_AUTHOR = {
  name: "Συντακτική Ομάδα ilektronikatsigara.gr",
  url: "https://ilektronikatsigara.gr/sxetika",
  jobTitle: "Vape Catalog Editors",
  worksFor: "ilektronikatsigara.gr",
} as const;

export function authorPersonJsonLd() {
  return {
    "@type": "Person" as const,
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.url,
    jobTitle: SITE_AUTHOR.jobTitle,
    worksFor: {
      "@type": "Organization" as const,
      name: SITE_AUTHOR.worksFor,
      url: "https://ilektronikatsigara.gr",
    },
  };
}
