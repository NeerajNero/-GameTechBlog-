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

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-circuit/40">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative min-h-36 overflow-hidden bg-[linear-gradient(135deg,#0f172a,#0f766e_55%,#dc2626)] text-white">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
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
        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <h2 className="text-xl font-black leading-tight text-ink group-hover:text-circuit">
              {article.title}
            </h2>
            <p className="text-sm leading-6 text-slate-600">{article.description}</p>
          </div>
          <ArticleMeta
            author={article.author}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTime={article.readingTime}
          />
          <TagList tags={article.tags} />
          <p className="text-sm font-bold text-circuit group-hover:text-ink">Read guide</p>
        </div>
      </Link>
    </article>
  );
}
