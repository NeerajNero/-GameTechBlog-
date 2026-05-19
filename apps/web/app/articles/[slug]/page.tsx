import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/article-header";
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

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createArticleJsonLd(article)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` }
        ])}
      />
      <nav className="mb-6 flex flex-wrap gap-3 text-sm font-bold" aria-label="Article links">
        <Link href="/articles" className="text-circuit hover:text-ink">
          Back to articles
        </Link>
        <span className="text-slate-300" aria-hidden="true">
          /
        </span>
        <Link href={categoryHref} className="text-circuit hover:text-ink">
          {article.category}
        </Link>
      </nav>
      <ArticleHeader article={article} />
      <div className="mx-auto max-w-3xl pt-8">
        <MdxContent source={article.content} />
      </div>
      <div className="mt-12">
        <RelatedArticles articles={relatedArticles} />
      </div>
    </article>
  );
}
