import type { Article } from "@/lib/content/types";
import { getRenderableImageSrc } from "@/lib/content/images";
import { absoluteUrl } from "@/lib/seo/urls";

export function getArticleCoverUrl(article: Article): string | undefined {
  const src = getRenderableImageSrc(article.coverImage);

  if (!src) {
    return undefined;
  }

  return src.startsWith("http") ? src : absoluteUrl(src);
}

/** Generated social card, served by app/articles/[slug]/opengraph-image.tsx. */
export function getArticleGeneratedImageUrl(article: Article): string {
  return absoluteUrl(`/articles/${article.slug}/opengraph-image`);
}

/** Cover when present, otherwise the generated card. */
export function getArticleSocialImageUrl(article: Article): string {
  return getArticleCoverUrl(article) ?? getArticleGeneratedImageUrl(article);
}
