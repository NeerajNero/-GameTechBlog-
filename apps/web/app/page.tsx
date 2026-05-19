import Link from "next/link";
import { ArticleCard } from "@/components/blog/article-card";
import { ArticleList } from "@/components/blog/article-list";
import { JsonLd } from "@/components/seo/json-ld";
import { getFeaturedArticles, getRecentArticles } from "@/lib/content/articles";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createPersonJsonLd, createWebsiteJsonLd } from "@/lib/seo/structured-data";

export const metadata = createPageMetadata({
  title: "Gaming and Tech Guides for Practical Players",
  description:
    "PC, console, streaming, and hardware guides written for practical gaming setups.",
  path: "/"
});

export default function HomePage() {
  const featured = getFeaturedArticles();
  const recent = getRecentArticles(6);
  const heroArticle = featured[0] ?? recent[0];
  const otherArticles = recent.filter((article) => article.slug !== heroArticle?.slug);

  return (
    <>
      <JsonLd data={createWebsiteJsonLd()} />
      <JsonLd data={createPersonJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-md border border-circuit/20 bg-circuit/10 px-3 py-1 text-sm font-bold text-circuit">
              Gaming hardware, setup, and performance
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">
                Practical gaming and tech guides without the noise.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Guides for PC players, console owners, streamers, and hardware buyers
                who care about smoother sessions, better setups, and useful decisions.
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-circuit"
            >
              Browse articles
            </Link>
          </div>
          {heroArticle ? <ArticleCard article={heroArticle} featured /> : null}
        </section>

        <section className="mt-12 space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-pulse">
                Latest
              </p>
              <h2 className="text-2xl font-black text-ink">Recent guides</h2>
            </div>
            <Link href="/articles" className="text-sm font-bold text-circuit hover:text-ink">
              View all
            </Link>
          </div>
          <ArticleList articles={otherArticles.length > 0 ? otherArticles : recent} />
        </section>
      </div>
    </>
  );
}
