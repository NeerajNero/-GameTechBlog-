import type { Metadata } from "next";
import { siteConfig } from "@/lib/site/config";
import type { Article } from "@/lib/content/types";
import { absoluteUrl, isProductionSite, siteUrl } from "@/lib/seo/urls";
import { getRenderableImageSrc } from "@/lib/content/images";

const robots = isProductionSite
  ? { index: true, follow: true }
  : { index: false, follow: false };

function createImageMetadata(imagePath: string | undefined, alt: string) {
  const src = getRenderableImageSrc(imagePath);

  if (!src) {
    return undefined;
  }

  return [
    {
      url: src.startsWith("http") ? src : absoluteUrl(src),
      width: 1200,
      height: 630,
      alt
    }
  ];
}

export function createPageMetadata({
  title,
  description,
  path = "/"
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const images = createImageMetadata(siteConfig.defaultOgImage, title);

  return {
    metadataBase: new URL(siteUrl),
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
      type: "website",
      ...(images ? { images } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((image) => image.url) } : {})
    },
    robots
  };
}

export function createArticleMetadata(article: Article): Metadata {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const images = createImageMetadata(
    article.coverImage,
    article.coverImageAlt ?? article.title
  );

  return {
    metadataBase: new URL(siteUrl),
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
      tags: article.tags,
      ...(images ? { images } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      ...(images ? { images: images.map((image) => image.url) } : {})
    },
    robots
  };
}
