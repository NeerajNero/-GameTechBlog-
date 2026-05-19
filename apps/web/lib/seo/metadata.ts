import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site/config";
import type { Article } from "@/lib/content/types";
import { absoluteUrl, isProductionSite, siteUrl } from "@/lib/seo/urls";

const robots = isProductionSite
  ? { index: true, follow: true }
  : { index: false, follow: false };

function hasSafeImage(imagePath?: string): boolean {
  if (!imagePath) {
    return false;
  }

  if (imagePath.includes("placeholder") || imagePath.endsWith("/README.md")) {
    return false;
  }

  if (!imagePath.startsWith("/")) {
    return false;
  }

  return fs.existsSync(path.join(process.cwd(), "public", imagePath));
}

function createImageMetadata(imagePath: string | undefined, alt: string) {
  if (!hasSafeImage(imagePath)) {
    return undefined;
  }

  return [
    {
      url: absoluteUrl(imagePath),
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
  const images = createImageMetadata(article.coverImage, article.title);

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
