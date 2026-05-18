import type { Metadata } from "next";
import { siteConfig } from "@/lib/site/config";
import type { Article } from "@/lib/content/types";

export function createPageMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function createArticleMetadata(article: Article): Metadata {
  const url = new URL(`/articles/${article.slug}`, siteConfig.url).toString();

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription
    }
  };
}
