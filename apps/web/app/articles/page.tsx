import { ArticleList } from "@/components/blog/article-list";
import { SectionHeading } from "@/components/blog/section-heading";
import { getPublishedArticles } from "@/lib/content/articles";
import { getCategories, getTags } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Articles",
  description:
    "Gaming and tech articles covering PC gaming, console setups, streaming, routers, SSDs, and practical performance advice.",
  path: "/articles"
});

export default function ArticlesPage() {
  const articles = getPublishedArticles();
  const categories = getCategories();
  const tags = getTags().slice(0, 12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl space-y-3">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">Articles</p>
        <h1 className="text-4xl font-black text-ink">Gaming and tech guides</h1>
        <p className="text-lg leading-8 text-slate-600">
          Practical notes on games, hardware, home networks, storage, and setup choices.
        </p>
      </header>

      <section className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-black uppercase tracking-wide text-pulse">
            Categories
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-circuit/40 hover:text-circuit"
              >
                {category.label} ({category.count})
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-black uppercase tracking-wide text-pulse">Tags</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-circuit/40 hover:text-circuit"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5">
        <SectionHeading
          eyebrow="All articles"
          title={`${articles.length} published ${articles.length === 1 ? "article" : "articles"}`}
          description="Sorted by publish date, newest first."
        />
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
