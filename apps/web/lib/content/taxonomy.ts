import type { Article } from "@/lib/content/types";
import { getPublishedArticles } from "@/lib/content/articles";
import { slugify } from "@/lib/utils/slug";

export type TaxonomyTerm = {
  label: string;
  slug: string;
  count: number;
};

export type CategoryTerm = TaxonomyTerm & {
  description: string;
};

const categoryDescriptions: Record<string, string> = {
  "Gaming Guides":
    "Practical walkthroughs, starter advice, and gameplay notes for players who want clearer decisions in-game.",
  "Game Streaming":
    "Home-network and setup guides for smoother remote play, Steam Link, and streaming sessions.",
  "Gaming Hardware":
    "Storage, cooling, laptop, monitor, accessory, and setup advice for practical gaming hardware choices.",
  "Gaming Reviews":
    "Hands-on impressions and player-focused reviews for games, hardware, and gaming services.",
  "Retro Gaming":
    "Personal stories, nostalgia pieces, and ownership memories from classic consoles, handhelds, and older gaming eras."
};

function fallbackCategoryDescription(label: string): string {
  return `Practical gaming-tech articles and setup notes for ${label.toLowerCase()}.`;
}

function sortTerms<T extends TaxonomyTerm>(terms: T[]): T[] {
  return [...terms].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function assertUniqueSlug(
  seen: Map<string, string>,
  slug: string,
  label: string,
  type: "category" | "tag"
) {
  if (!slug) {
    throw new Error(
      `Invalid ${type} label "${label}": it must produce a non-empty URL slug.`
    );
  }

  const existingLabel = seen.get(slug);

  if (existingLabel && existingLabel !== label) {
    throw new Error(
      `Duplicate ${type} slug "${slug}" generated for "${existingLabel}" and "${label}". Rename one frontmatter label.`
    );
  }

  seen.set(slug, label);
}

function buildCategoryMap(articles: Article[]): Map<string, CategoryTerm> {
  const terms = new Map<string, CategoryTerm>();
  const seen = new Map<string, string>();

  for (const article of articles) {
    const label = article.category;
    const slug = slugify(label);
    assertUniqueSlug(seen, slug, label, "category");

    const existing = terms.get(slug);
    terms.set(slug, {
      label,
      slug,
      count: (existing?.count ?? 0) + 1,
      description:
        categoryDescriptions[label] ?? existing?.description ?? fallbackCategoryDescription(label)
    });
  }

  return terms;
}

function buildTagMap(articles: Article[]): Map<string, TaxonomyTerm> {
  const terms = new Map<string, TaxonomyTerm>();
  const seen = new Map<string, string>();

  for (const article of articles) {
    for (const label of article.tags) {
      const slug = slugify(label);
      assertUniqueSlug(seen, slug, label, "tag");

      const existing = terms.get(slug);
      terms.set(slug, {
        label,
        slug,
        count: (existing?.count ?? 0) + 1
      });
    }
  }

  return terms;
}

export function getCategories(): CategoryTerm[] {
  return sortTerms([...buildCategoryMap(getPublishedArticles()).values()]);
}

export function getCategoryBySlug(slug: string): CategoryTerm | undefined {
  return buildCategoryMap(getPublishedArticles()).get(slug);
}

export function getCategorySlugs(): string[] {
  return getCategories().map((category) => category.slug);
}

export function getArticlesByCategorySlug(slug: string): Article[] {
  return getPublishedArticles().filter((article) => slugify(article.category) === slug);
}

export function getTags(): TaxonomyTerm[] {
  return sortTerms([...buildTagMap(getPublishedArticles()).values()]);
}

export function getTagBySlug(slug: string): TaxonomyTerm | undefined {
  return buildTagMap(getPublishedArticles()).get(slug);
}

export function getTagSlugs(): string[] {
  return getTags().map((tag) => tag.slug);
}

export function getArticlesByTagSlug(slug: string): Article[] {
  return getPublishedArticles().filter((article) =>
    article.tags.some((tag) => slugify(tag) === slug)
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const categorySlug = slugify(article.category);
  const articleTagSlugs = new Set(article.tags.map(slugify));

  return getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sameCategory = slugify(candidate.category) === categorySlug ? 2 : 0;
      const matchingTags = candidate.tags.filter((tag) => articleTagSlugs.has(slugify(tag)))
        .length;

      return {
        article: candidate,
        score: sameCategory + matchingTags
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.article.publishedAt).getTime() -
          new Date(a.article.publishedAt).getTime()
    )
    .slice(0, limit)
    .map((candidate) => candidate.article);
}
