export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  content: string[];
  metaDescription: string;
  keywords: string[];
  promotedProducts?: string[];
  promotedCategory?: {
    label: string;
    slug: string;
    description: string;
  };
  faqs?: { q: string; a: string }[];
}
