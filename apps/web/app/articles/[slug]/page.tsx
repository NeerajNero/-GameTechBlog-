import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleQuickTake } from "@/components/blog/article-quick-take";
import { MdxContent } from "@/components/blog/mdx-content";
import { RelatedArticles } from "@/components/blog/related-articles";
import { JsonLd } from "@/components/seo/json-ld";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content/articles";
import { getRelatedArticles } from "@/lib/content/taxonomy";
import { createArticleMetadata } from "@/lib/seo/metadata";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd
} from "@/lib/seo/structured-data";
import { slugify } from "@/lib/utils/slug";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article not found"
    };
  }

  return createArticleMetadata(article);
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);
  const categoryHref = `/categories/${slugify(article.category)}`;
  const hasInlineQuickTake = article.content.includes("<ArticleQuickTake");

  return (
    <article className="bg-paper">
      <JsonLd data={createArticleJsonLd(article)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` }
        ])}
      />
      <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.16),transparent_34%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <nav className="mb-8 flex flex-wrap gap-3 text-sm font-bold" aria-label="Article links">
            <Link href="/articles" className="text-circuit transition hover:text-ink">
              Articles
            </Link>
            <span className="text-slate-300" aria-hidden="true">
              /
            </span>
            <Link href={categoryHref} className="text-circuit transition hover:text-ink">
              {article.category}
            </Link>
          </nav>
          <ArticleHeader article={article} />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
        <div className="min-w-0">
          {hasInlineQuickTake ? null : <ArticleQuickTake article={article} />}
          <div className="mx-auto mt-8 max-w-3xl">
            <MdxContent source={article.content} />
          </div>
        </div>
        <aside className="hidden lg:block lg:pt-1">
          <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
              In this article
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>{article.description}</p>
              <Link
                href={categoryHref}
                className="inline-flex font-bold text-circuit transition hover:text-ink"
              >
                More in {article.category}
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <div className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <RelatedArticles articles={relatedArticles} />
        </div>
      </div>
    </article>
  );
}
