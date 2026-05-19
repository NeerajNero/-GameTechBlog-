import Image from "next/image";
import type { Article } from "@/lib/content/types";
import { ArticleMeta } from "@/components/blog/article-meta";
import { TagList } from "@/components/blog/tag-list";
import { getRenderableImageSrc } from "@/lib/content/images";

export function ArticleHeader({ article }: { article: Article }) {
  const coverImage = getRenderableImageSrc(article.coverImage);

  return (
    <header className="space-y-6 border-b border-slate-200 pb-8">
      <div className="space-y-3">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">
          {article.category}
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-ink sm:text-5xl">
          {article.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">{article.description}</p>
      </div>
      <ArticleMeta
        author={article.author}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        readingTime={article.readingTime}
      />
      <TagList tags={article.tags} />
      {coverImage ? (
        <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="relative aspect-[16/9]">
            <Image
              src={coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
          {article.coverImageCredit ? (
            <figcaption className="px-4 py-2 text-xs text-slate-500">
              {article.coverImageCredit}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <div className="min-h-52 rounded-lg bg-[linear-gradient(135deg,#0f172a,#0f766e_52%,#dc2626)] p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-white/70">
            Cover image pending
          </p>
          <p className="mt-16 max-w-xl text-2xl font-black leading-tight">
            A real Cloudinary cover image can be added when the content asset pass is
            ready.
          </p>
        </div>
      )}
    </header>
  );
}
