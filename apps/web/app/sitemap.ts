import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/content/articles";
import { getCategories, getTags } from "@/lib/content/taxonomy";
import { absoluteUrl } from "@/lib/seo/urls";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.8 },
  { path: "/categories", changeFrequency: "weekly", priority: 0.7 },
  { path: "/tags", changeFrequency: "weekly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.3 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/editorial-policy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/affiliate-disclosure", changeFrequency: "monthly", priority: 0.3 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const articleEntries = getPublishedArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.8 : 0.7
  }));

  const categoryEntries = getCategories().map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  const tagEntries = getTags().map((tag) => ({
    url: absoluteUrl(`/tags/${tag.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5
  }));

  return [...staticEntries, ...articleEntries, ...categoryEntries, ...tagEntries];
}
