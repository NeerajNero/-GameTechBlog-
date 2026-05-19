import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/blog/article-list";
import { SectionHeading } from "@/components/blog/section-heading";
import {
  getArticlesByTagSlug,
  getTagBySlug,
  getTagSlugs,
  getTags
} from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

type TagPageProps = {
  params: {
    tag: string;
  };
};

export function generateStaticParams() {
  return getTagSlugs().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: TagPageProps) {
  const tag = getTagBySlug(params.tag);

  if (!tag) {
    return {
      title: "Tag not found"
    };
  }

  return createPageMetadata({
    title: `${tag.label} Articles`,
    description: `Practical gaming-tech articles tagged ${tag.label}. Browse ${
      tag.count
    } published ${tag.count === 1 ? "article" : "articles"} for this topic.`,
    path: `/tags/${tag.slug}`
  });
}

export default function TagPage({ params }: TagPageProps) {
  const tag = getTagBySlug(params.tag);

  if (!tag) {
    notFound();
  }

  const articles = getArticlesByTagSlug(tag.slug);
  const otherTags = getTags().filter((item) => item.slug !== tag.slug).slice(0, 12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-6">
        <Link href="/tags" className="text-sm font-bold text-circuit hover:text-ink">
          Back to tags
        </Link>
        <SectionHeading
          eyebrow="Tag"
          title={tag.label}
          description={`Focused articles and guides connected to ${tag.label}.`}
          level={1}
        />
        <p className="inline-flex rounded-md bg-white px-3 py-1.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
          {tag.count} {tag.count === 1 ? "article" : "articles"}
        </p>
      </div>

      <ArticleList articles={articles} />

      {otherTags.length > 0 ? (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-lg font-black text-ink">More tags</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherTags.map((item) => (
              <Link
                key={item.slug}
                href={`/tags/${item.slug}`}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-circuit/40 hover:text-circuit"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
