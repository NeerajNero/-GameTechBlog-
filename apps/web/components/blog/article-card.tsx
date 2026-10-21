import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content/types";
import { ArticleMeta } from "@/components/blog/article-meta";
import { TagList } from "@/components/blog/tag-list";
import { getRenderableImageSrc } from "@/lib/content/images";

export function ArticleCard({
  article,
  featured = false
}: {
  article: Article;
  featured?: boolean;
}) {
  const coverImage = getRenderableImageSrc(article.coverImage);
  const quickTake = article.quickTake?.trim();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-circuit/40">
      <Link href={`/articles/${article.slug}`} className="flex h-full flex-col">
        {coverImage ? (
          <div className="relative min-h-36 overflow-hidden bg-ink text-white">
            <Image
              src={coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
            <div className="relative flex min-h-36 items-end p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                  {article.category}
                </p>
                {featured ? (
                  <p className="mt-1 inline-flex rounded-md bg-white/15 px-2 py-1 text-xs font-bold">
                    Featured
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-4 p-5">
          {coverImage ? null : (
            <div className="flex flex-wrap items-center gap-2 border-l-4 border-circuit pl-3">
              <p className="text-xs font-black uppercase tracking-wide text-circuit">
                {article.category}
              </p>
              {featured ? (
                <p className="inline-flex rounded-md bg-ink px-2 py-0.5 text-xs font-bold text-white">
                  Featured
                </p>
              ) : null}
            </div>
          )}
          <div className="space-y-2">
            <h2
              className={`font-black leading-tight text-ink group-hover:text-circuit ${
                coverImage ? "text-xl" : "text-2xl"
              }`}
            >
              {article.title}
            </h2>
            <p className="text-sm leading-6 text-slate-600">{article.description}</p>
            {!coverImage && quickTake && quickTake !== article.description ? (
              <p className="line-clamp-3 border-t border-slate-100 pt-2 text-sm italic leading-6 text-slate-500">
                {quickTake}
              </p>
            ) : null}
          </div>
          <ArticleMeta
            author={article.author}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTime={article.readingTime}
          />
          <TagList tags={article.tags} />
          <p className="mt-auto text-sm font-bold text-circuit group-hover:text-ink">Read guide</p>
        </div>
      </Link>
    </article>
  );
}
