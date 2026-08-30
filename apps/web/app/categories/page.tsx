import { SectionHeading } from "@/components/blog/section-heading";
import { TaxonomyList } from "@/components/blog/taxonomy-list";
import { getCategories } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Categories",
  description:
    "Browse articles by category — gaming guides, game reviews, hardware and setup advice, retro gaming, and hands-on tech projects.",
  path: "/categories"
});

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <SectionHeading
          eyebrow="Browse by category"
          title="Browse by category"
          description="From setup and hardware advice to game reviews, retro deep-dives, and DIY tech projects — start with the broad topic, then move into the individual articles."
          level={1}
        />
      </header>
      <TaxonomyList items={categories} basePath="/categories" type="category" />
    </div>
  );
}
