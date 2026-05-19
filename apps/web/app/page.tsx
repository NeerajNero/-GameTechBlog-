import Link from "next/link";
import { ArticleCard } from "@/components/blog/article-card";
import { ArticleList } from "@/components/blog/article-list";
import { SectionHeading } from "@/components/blog/section-heading";
import { TaxonomyCard } from "@/components/blog/taxonomy-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getFeaturedArticles, getRecentArticles } from "@/lib/content/articles";
import { getCategories } from "@/lib/content/taxonomy";
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
  const categories = getCategories();
  const heroArticle = featured[0] ?? recent[0];
  const otherArticles = recent.filter((article) => article.slug !== heroArticle?.slug);
  const latestArticles = otherArticles.length > 0 ? otherArticles : recent;

  return (
    <>
      <JsonLd data={createWebsiteJsonLd()} />
      <JsonLd data={createPersonJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex rounded-md border border-circuit/20 bg-circuit/10 px-3 py-1 text-sm font-bold text-circuit">
              PC, console, streaming, and gaming hardware
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">
                Practical gaming-tech guides for better setups and smarter upgrades.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Clear advice for PC players, console owners, streamers, and Indian
                gamers comparing routers, SSDs, controllers, monitors, laptops, and
                gameplay setup choices.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-circuit"
              >
                Browse articles
              </Link>
              <Link
                href="/categories"
                className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-circuit/40 hover:text-circuit"
              >
                Explore categories
              </Link>
            </div>
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Guides", "Reviews", "Buying guides"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-soft"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          {heroArticle ? <ArticleCard article={heroArticle} featured /> : null}
        </section>

        {featured.length > 0 ? (
          <section className="mt-14 space-y-6">
            <SectionHeading
              eyebrow="Featured"
              title="Start with these guides"
              description="Useful starting points for practical gaming setup decisions."
              href="/articles"
              linkLabel="View all"
            />
            <ArticleList articles={featured.slice(0, 3)} />
          </section>
        ) : null}

        <section className="mt-14 space-y-6">
          <SectionHeading
            eyebrow="Latest"
            title="Recent gaming-tech notes"
            description="Fresh guides across games, storage, home networking, hardware, and performance."
            href="/articles"
            linkLabel="View all articles"
          />
          <ArticleList articles={latestArticles} />
        </section>

        <section className="mt-14 space-y-6">
          <SectionHeading
            eyebrow="Topics"
            title="Category highlights"
            description="Browse by the problem area: gameplay help, streaming stability, or hardware planning."
            href="/categories"
            linkLabel="All categories"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {categories.slice(0, 3).map((category) => (
              <TaxonomyCard
                key={category.slug}
                href={`/categories/${category.slug}`}
                label={category.label}
                count={category.count}
                description={category.description}
                type="category"
              />
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-lg border border-slate-200 bg-ink p-6 text-white sm:p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-black uppercase tracking-wide text-circuit">
              Built for practical decisions
            </p>
            <h2 className="text-2xl font-black sm:text-3xl">
              Guides, reviews, and buying advice without pretending every setup needs
              the most expensive gear.
            </h2>
            <p className="leading-7 text-slate-300">
              The goal is usable gaming-tech guidance: better latency, less storage
              stress, more stable streaming, and clearer upgrade choices.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
