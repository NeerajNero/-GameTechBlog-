import type { Article } from "@/lib/content/types";
import { ArticleCard } from "@/components/blog/article-card";
import { SectionHeading } from "@/components/blog/section-heading";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 pt-10">
      <SectionHeading
        eyebrow="Keep reading"
        title="Related articles"
        description="More guides from the same category or nearby gaming-tech topics."
      />
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} featured={article.featured} />
        ))}
      </div>
    </section>
  );
}
