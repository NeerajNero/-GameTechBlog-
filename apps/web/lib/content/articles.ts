import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { validateFrontmatter } from "@/lib/content/validation";
import type { Article } from "@/lib/content/types";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function readArticleFile(filename: string): Article {
  const fullPath = path.join(articlesDirectory, filename);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(fileContent);
  const frontmatter = validateFrontmatter(parsed.data, filename);
  const fileSlug = filename.replace(/\.mdx$/, "");

  if (frontmatter.slug !== fileSlug) {
    throw new Error(
      `Invalid frontmatter in ${filename}: slug "${frontmatter.slug}" must match filename "${fileSlug}".`
    );
  }

  return {
    ...frontmatter,
    content: parsed.content,
    readingTime: readingTime(parsed.content).text
  };
}

export function getAllArticles(options: { includeDrafts?: boolean } = {}): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readArticleFile)
    .filter((article) => options.includeDrafts || !article.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPublishedArticles(): Article[] {
  return getAllArticles();
}

export function getFeaturedArticles(): Article[] {
  return getPublishedArticles().filter((article) => article.featured);
}

export function getRecentArticles(limit = 6): Article[] {
  return getPublishedArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return getPublishedArticles().map((article) => article.slug);
}
