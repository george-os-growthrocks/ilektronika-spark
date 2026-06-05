import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "../data/blog";

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
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
          Editorial
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
          Οδηγοί & Άρθρα
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Reviews, οδηγοί χρήσης, επιστημονικά νέα και πληροφορίες για όλα όσα αφορούν το άτμισμα.
        </p>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block border border-border hover:border-primary transition-colors p-8 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  {post.category}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  · {post.readingTime} λεπτά ανάγνωσης
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  · {post.publishedAt}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <span className="mt-5 inline-flex text-xs font-extrabold uppercase tracking-widest text-primary">
                Διαβάστε άρθρο →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
