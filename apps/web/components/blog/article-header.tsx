import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content/types";
import { ArticleMeta } from "@/components/blog/article-meta";
import { TagList } from "@/components/blog/tag-list";
import { getRenderableImageSrc } from "@/lib/content/images";
import { slugify } from "@/lib/utils/slug";

export function ArticleHeader({ article }: { article: Article }) {
  const coverImage = getRenderableImageSrc(article.coverImage);
  const categoryHref = `/categories/${slugify(article.category)}`;

  return (
    <header className="space-y-8">
      <div className="space-y-5">
        <Link
          href={categoryHref}
          className="inline-flex rounded-full border border-circuit/20 bg-circuit/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-circuit transition hover:border-circuit/50 hover:bg-circuit/15 hover:text-ink"
        >
          {article.category}
        </Link>
        <h1 className="max-w-5xl text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          {article.description}
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Written by
          </p>
          <ArticleMeta
            author={article.author}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTime={article.readingTime}
          />
        </div>
        {article.featured ? (
          <p className="inline-flex w-fit rounded-md bg-ink px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white">
            Featured
          </p>
        ) : null}
      </div>
      <TagList tags={article.tags} getHref={(tag) => `/tags/${slugify(tag)}`} />
      {coverImage ? (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-ink shadow-soft ring-1 ring-white">
          <div className="relative aspect-[16/9]">
            <Image
              src={coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-contain"
            />
          </div>
          {article.coverImageCredit ? (
            <figcaption className="border-t border-white/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {article.coverImageCredit}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <div className="min-h-64 rounded-2xl bg-[linear-gradient(135deg,#0f172a,#0f766e_52%,#dc2626)] p-6 text-white shadow-soft">
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
