import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts, getPost } from "../data/blog";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  loader: ({ params }) => ({ post: getPost(params.slug)! }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | ilektronikatsigara.gr` },
        { name: "description", content: post.metaDescription },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:url", content: `/blog/${post.slug}` },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.publishedAt },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "ilektronikatsigara.gr" },
            publisher: { "@type": "Organization", name: "ilektronikatsigara.gr" },
            inLanguage: "el",
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-extrabold mb-4">Το άρθρο δεν βρέθηκε</h1>
      <Link to="/blog" className="text-primary underline">Επιστροφή στο blog</Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <nav className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Αρχική</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-primary">Blog</Link>
        </nav>

        <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-2">
          {post.category} · {post.readingTime} λεπτά · {post.publishedAt}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 text-balance">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{post.excerpt}</p>

        <div className="prose-content space-y-5 text-foreground leading-relaxed">
          {post.content.map((para: string, i: number) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl md:text-3xl font-extrabold tracking-tighter mt-10 mb-4">
                  {para.replace(/^## /, "")}
                </h2>
              );
            }
            // bold-aware paragraph rendering
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i}>
                {parts.map((part: string, j: number) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j}>{part.slice(2, -2)}</strong>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </p>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-20 pt-12 border-t border-border">
        <h2 className="text-2xl font-extrabold tracking-tighter mb-6">Συνεχίστε την ανάγνωση</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block border border-border p-6 hover:border-primary transition-colors"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                {p.category}
              </span>
              <h3 className="font-bold mt-2">{p.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
