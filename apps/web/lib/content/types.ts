export type ArticleFrontmatter = {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  featured: boolean;
  draft: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type Article = ArticleFrontmatter & {
  content: string;
  readingTime: string;
};
