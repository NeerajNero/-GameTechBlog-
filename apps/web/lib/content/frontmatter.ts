import matter from "gray-matter";
import type { ArticleFrontmatter } from "@/lib/content/types";
import { isRenderableImage } from "@/lib/content/images";

const requiredStringFields: Array<keyof ArticleFrontmatter> = [
  "title",
  "slug",
  "description",
  "category",
  "author",
  "publishedAt",
  "updatedAt",
  "seoTitle",
  "seoDescription"
];

const optionalStringFields: Array<keyof ArticleFrontmatter> = [
  "coverImage",
  "coverImageAlt",
  "coverImageCredit",
  "quickTake"
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function validateFrontmatter(
  value: unknown,
  filename: string
): ArticleFrontmatter {
  if (!isRecord(value)) {
    throw new Error(`Invalid frontmatter in ${filename}: expected an object.`);
  }

  for (const field of requiredStringFields) {
    if (typeof value[field] !== "string" || value[field] === "") {
      throw new Error(
        `Invalid frontmatter in ${filename}: "${field}" must be a non-empty string.`
      );
    }
  }

  for (const field of optionalStringFields) {
    if (value[field] !== undefined && typeof value[field] !== "string") {
      throw new Error(
        `Invalid frontmatter in ${filename}: "${field}" must be a string when present.`
      );
    }
  }

  if (!Array.isArray(value.tags) || value.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Invalid frontmatter in ${filename}: "tags" must be a string array.`);
  }

  if (typeof value.featured !== "boolean") {
    throw new Error(`Invalid frontmatter in ${filename}: "featured" must be a boolean.`);
  }

  if (typeof value.draft !== "boolean") {
    throw new Error(`Invalid frontmatter in ${filename}: "draft" must be a boolean.`);
  }

  if (isRenderableImage(value.coverImage as string | undefined)) {
    if (typeof value.coverImageAlt !== "string" || value.coverImageAlt.trim() === "") {
      throw new Error(
        `Invalid frontmatter in ${filename}: "coverImageAlt" is required when "coverImage" points to a real image.`
      );
    }
  }

  return value as ArticleFrontmatter;
}

/**
 * Frontmatter key order used by the existing articles. Serialized output
 * follows this order so generated files look like hand-written ones.
 */
export const frontmatterKeyOrder: Array<keyof ArticleFrontmatter> = [
  "title",
  "slug",
  "description",
  "category",
  "tags",
  "author",
  "publishedAt",
  "updatedAt",
  "coverImage",
  "coverImageAlt",
  "coverImageCredit",
  "quickTake",
  "featured",
  "draft",
  "seoTitle",
  "seoDescription"
];

/**
 * Produces the full MDX file contents (frontmatter + body) for an article.
 * Optional keys that are undefined are omitted.
 */
export function serializeArticle(frontmatter: ArticleFrontmatter, body: string): string {
  const ordered: Record<string, unknown> = {};

  for (const key of frontmatterKeyOrder) {
    if (frontmatter[key] !== undefined) {
      ordered[key] = frontmatter[key];
    }
  }

  const content = `\n${body.trim()}\n`;

  return matter.stringify(content, ordered);
}
