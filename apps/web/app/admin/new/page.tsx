import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { getCategories, getTags } from "@/lib/content/taxonomy";
import { siteUrl } from "@/lib/seo/urls";

export const metadata: Metadata = {
  title: "New article",
  robots: { index: false, follow: false }
};

export default function NewArticlePage() {
  const categories = getCategories().map((category) => category.label);
  const tags = getTags().map((tag) => tag.label);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">Admin</p>
        <h1 className="mt-2 text-3xl font-black text-ink">New article</h1>
        <p className="mt-2 leading-7 text-slate-600">
          Publishes an MDX file straight to the repository. The post goes live once Vercel
          finishes building.
        </p>
      </header>
      <ArticleForm categories={categories} tags={tags} siteUrl={siteUrl} />
    </div>
  );
}
