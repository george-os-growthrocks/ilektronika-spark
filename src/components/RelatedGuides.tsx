import Link from "next/link";
import { getPost } from "@/data/blog";
import { categoryMeta } from "@/data/category-meta";

export function RelatedGuides({
  categorySlug,
  guideSlugs,
  title = "Σχετικοί οδηγοί",
}: {
  categorySlug?: string;
  guideSlugs?: string[];
  title?: string;
}) {
  const fromMeta = categorySlug ? categoryMeta(categorySlug).relatedGuides ?? [] : [];
  const slugs = [...new Set([...(guideSlugs ?? []), ...fromMeta])];
  const posts = slugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!posts.length) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">{title}</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full border border-border rounded-md p-5 bg-card hover:border-primary transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  {post.category}
                </span>
                <span className="block font-bold mt-2 leading-snug">{post.title}</span>
                <span className="block text-sm text-muted-foreground mt-2 line-clamp-2">
                  {post.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
