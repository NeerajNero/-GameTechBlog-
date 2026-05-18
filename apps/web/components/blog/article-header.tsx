import type { Article } from "@/lib/content/types";
import { ArticleMeta } from "@/components/blog/article-meta";
import { TagList } from "@/components/blog/tag-list";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="space-y-6 border-b border-slate-200 pb-8">
      <div className="space-y-3">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">
          {article.category}
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-ink sm:text-5xl">
          {article.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">{article.description}</p>
      </div>
      <ArticleMeta
        author={article.author}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        readingTime={article.readingTime}
      />
      <TagList tags={article.tags} />
      <div className="min-h-52 rounded-lg bg-[linear-gradient(135deg,#0f172a,#0f766e_52%,#dc2626)] p-6 text-white">
        <p className="text-sm font-bold uppercase tracking-wide text-white/70">
          Cover image placeholder
        </p>
        <p className="mt-16 max-w-xl text-2xl font-black leading-tight">
          Real article images will be added in a later content asset pass.
        </p>
      </div>
    </header>
  );
}
