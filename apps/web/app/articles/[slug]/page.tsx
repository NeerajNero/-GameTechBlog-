import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/article-header";
import { MdxContent } from "@/components/blog/mdx-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content/articles";
import { createArticleMetadata } from "@/lib/seo/metadata";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd
} from "@/lib/seo/structured-data";

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
      <ArticleHeader article={article} />
      <div className="pt-8">
        <MdxContent source={article.content} />
      </div>
    </article>
  );
}
