import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Οδηγοί & Άρθρα για το Άτμισμα",
  description:
    "Οδηγοί ατμίσματος, reviews ηλεκτρονικών τσιγάρων, άρθρα για disposable vapes, υγρά αναπλήρωσης και ναργιλέδες. Πληροφορία από ειδικούς.",
  openGraph: {
    title: "Blog | ilektronikatsigara.gr",
    description: "Οδηγοί, reviews και άρθρα για το άτμισμα.",
    url: "/blog",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
