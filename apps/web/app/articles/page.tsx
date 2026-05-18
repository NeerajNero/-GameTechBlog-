import { ArticleList } from "@/components/blog/article-list";
import { getPublishedArticles } from "@/lib/content/articles";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Articles",
  description:
    "Gaming and tech articles covering PC gaming, console setups, streaming, routers, SSDs, and practical performance advice.",
  path: "/articles"
});

export default function ArticlesPage() {
  const articles = getPublishedArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl space-y-3">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">Articles</p>
        <h1 className="text-4xl font-black text-ink">Gaming and tech guides</h1>
        <p className="text-lg leading-8 text-slate-600">
          Practical notes on games, hardware, home networks, storage, and setup choices.
        </p>
      </header>
      <ArticleList articles={articles} />
    </div>
  );
}
