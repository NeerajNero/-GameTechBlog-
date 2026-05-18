import type { ArticleFrontmatter } from "@/lib/content/types";

const requiredStringFields: Array<keyof ArticleFrontmatter> = [
  "title",
  "slug",
  "description",
  "category",
  "author",
  "publishedAt",
  "updatedAt",
  "coverImage",
  "seoTitle",
  "seoDescription"
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

  if (!Array.isArray(value.tags) || value.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Invalid frontmatter in ${filename}: "tags" must be a string array.`);
  }

  if (typeof value.featured !== "boolean") {
    throw new Error(`Invalid frontmatter in ${filename}: "featured" must be a boolean.`);
  }

  if (typeof value.draft !== "boolean") {
    throw new Error(`Invalid frontmatter in ${filename}: "draft" must be a boolean.`);
  }

  return value as ArticleFrontmatter;
}
