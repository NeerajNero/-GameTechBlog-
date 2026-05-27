import type { Article } from "@/lib/content/types";
import { ArticleCard } from "@/components/blog/article-card";
import { SectionHeading } from "@/components/blog/section-heading";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">
          Keep reading
        </p>
        <h2 className="mt-2 text-2xl font-black text-ink">More gaming-tech stories soon</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          This article stands on its own for now. As the library grows, related guides
          and opinions will appear here automatically.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      <SectionHeading
        eyebrow="Keep reading"
        title="More from GameTechGuides"
        description="Related guides and opinions from the same category or nearby gaming-tech topics."
      />
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} featured={article.featured} />
        ))}
      </div>
    </section>
  );
}
