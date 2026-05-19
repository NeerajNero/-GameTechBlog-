import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/blog/article-list";
import { SectionHeading } from "@/components/blog/section-heading";
import {
  getArticlesByCategorySlug,
  getCategories,
  getCategoryBySlug,
  getCategorySlugs
} from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return {
      title: "Category not found"
    };
  }

  return createPageMetadata({
    title: `${category.label} Articles`,
    description: `${category.description} Browse ${category.count} published ${
      category.count === 1 ? "article" : "articles"
    } in this category.`,
    path: `/categories/${category.slug}`
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategorySlug(category.slug);
  const otherCategories = getCategories().filter((item) => item.slug !== category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-6">
        <Link href="/categories" className="text-sm font-bold text-circuit hover:text-ink">
          Back to categories
        </Link>
        <SectionHeading
          eyebrow="Category"
          title={category.label}
          description={category.description}
          level={1}
        />
        <p className="inline-flex rounded-md bg-white px-3 py-1.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
          {category.count} {category.count === 1 ? "article" : "articles"}
        </p>
      </div>

      <ArticleList articles={articles} />

      {otherCategories.length > 0 ? (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-lg font-black text-ink">Other categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/categories/${item.slug}`}
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
