import { getArticleBySlug, getArticleSlugs } from "@/lib/content/articles";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/seo/og-image";
import { siteConfig } from "@/lib/site/config";

export const alt = siteConfig.name;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default function ArticleOpenGraphImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  return renderOgImage({
    eyebrow: article?.category ?? siteConfig.name,
    title: article?.title ?? siteConfig.description
  });
}
