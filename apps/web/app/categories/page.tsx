import { SectionHeading } from "@/components/blog/section-heading";
import { TaxonomyList } from "@/components/blog/taxonomy-list";
import { getCategories } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Categories",
  description:
    "Browse gaming-tech articles by category, including gaming guides, streaming setup notes, and hardware advice.",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <SectionHeading
          eyebrow="Browse by category"
          title="Gaming-tech categories"
          description="Start with the broad topic that matches the problem you are solving, then move into the individual guides."
          level={1}
        />
      </header>
      <TaxonomyList items={categories} basePath="/categories" type="category" />
    </div>
  );
}
