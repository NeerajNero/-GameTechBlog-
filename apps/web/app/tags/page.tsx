import { SectionHeading } from "@/components/blog/section-heading";
import { TaxonomyList } from "@/components/blog/taxonomy-list";
import { getTags } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tags",
  description:
    "Browse articles by tag across specific games, platforms, hardware, streaming, storage, retro gaming, and setup topics.",
  path: "/tags"
});

export default function TagsPage() {
  const tags = getTags();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <SectionHeading
          eyebrow="Browse by tag"
          title="Browse by tag"
          description="Use tags to find articles on specific games, platforms, accessories, and setup problems."
          level={1}
        />
      </header>
      <TaxonomyList items={tags} basePath="/tags" type="tag" />
    </div>
  );
}
