import type { Article } from "@/lib/content/types";
import { getSocialLinks, siteConfig } from "@/lib/site/config";
import { absoluteUrl } from "@/lib/seo/urls";
import { getRenderableImageSrc } from "@/lib/content/images";

type JsonValue =
  | string
  | number
  | boolean
  | JsonValue[]
  | { [key: string]: JsonValue };

type JsonRecord = Record<string, JsonValue>;
export type JsonInput =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonInput[]
  | { [key: string]: JsonInput };

function removeEmptyValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptyValues)
      .filter((item) => item !== undefined && item !== null && item !== "");
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, removeEmptyValues(item)])
        .filter(([, item]) => item !== undefined && item !== null && item !== "")
    );
  }

  return value;
}

function safeImageUrl(imagePath?: string): string | undefined {
  const src = getRenderableImageSrc(imagePath);

  if (!src) {
    return undefined;
  }

  return src.startsWith("http") ? src : absoluteUrl(src);
}

export function sanitizeJsonLd(value: JsonInput): JsonRecord {
  return removeEmptyValues(value) as JsonRecord;
}

export function createWebsiteJsonLd(): JsonRecord {
  return sanitizeJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/")
  });
}

export function createPersonJsonLd(): JsonRecord {
  return sanitizeJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    description: siteConfig.authorBio,
    url: absoluteUrl("/about"),
    sameAs: getSocialLinks().map((link) => link.href)
  });
}

export function createArticleJsonLd(article: Article): JsonRecord {
  const articleUrl = absoluteUrl(`/articles/${article.slug}`);

  return sanitizeJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
      url: absoluteUrl("/about"),
      sameAs: getSocialLinks().map((link) => link.href)
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logoIcon)
      }
    },
    image: safeImageUrl(article.coverImage),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    url: articleUrl,
    keywords: article.tags.join(", "),
    articleSection: article.category
  });
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): JsonRecord {
  return sanitizeJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  });
}
