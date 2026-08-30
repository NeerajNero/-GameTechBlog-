import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/content/articles";
import {
  getArticlesByCategorySlug,
  getArticlesByTagSlug,
  getCategories,
  getTags
} from "@/lib/content/taxonomy";
import type { Article } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/seo/urls";

function latestUpdate(articles: Article[]): Date | undefined {
  if (articles.length === 0) {
    return undefined;
  }

  return new Date(
    Math.max(...articles.map((article) => new Date(article.updatedAt).getTime()))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedArticles();
  const newestContentDate = latestUpdate(articles);

  // Listing pages change when content changes; trust pages get no
  // lastModified rather than a dishonest build timestamp.
  const listingRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/articles", priority: 0.8 },
    { path: "/categories", priority: 0.7 },
    { path: "/tags", priority: 0.6 }
  ];

  const staticPaths = [
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/editorial-policy",
    "/affiliate-disclosure"
  ];

  const listingEntries = listingRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: newestContentDate,
    changeFrequency: "weekly" as const,
    priority: route.priority
  }));

  const staticEntries = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: 0.3
  }));

  const articleEntries = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.8 : 0.7
  }));

  const categoryEntries = getCategories().map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: latestUpdate(getArticlesByCategorySlug(category.slug)),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  // Single-article tag pages are noindexed (see app/tags/[tag]/page.tsx),
  // so only tags with enough content belong in the sitemap.
  const tagEntries = getTags()
    .filter((tag) => tag.count >= 2)
    .map((tag) => ({
      url: absoluteUrl(`/tags/${tag.slug}`),
      lastModified: latestUpdate(getArticlesByTagSlug(tag.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.5
    }));

  return [
    ...listingEntries,
    ...staticEntries,
    ...articleEntries,
    ...categoryEntries,
    ...tagEntries
  ];
}
