import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Οδηγοί & Άρθρα για το Άτμισμα | ilektronikatsigara.gr" },
      {
        name: "description",
        content:
          "Οδηγοί ατμίσματος, reviews ηλεκτρονικών τσιγάρων, άρθρα για disposable vapes, υγρά αναπλήρωσης και ναργιλέδες. Πληροφορία από ειδικούς.",
      },
      { property: "og:title", content: "Blog — ilektronikatsigara.gr" },
      { property: "og:description", content: "Οδηγοί, reviews και άρθρα για το άτμισμα." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => <Outlet />,
});
