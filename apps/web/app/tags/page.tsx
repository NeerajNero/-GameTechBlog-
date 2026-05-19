import { SectionHeading } from "@/components/blog/section-heading";
import { TaxonomyList } from "@/components/blog/taxonomy-list";
import { getTags } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Tags",
  description:
    "Browse gaming-tech articles by detailed tags across games, hardware, streaming, storage, and setup topics.",
  path: "/tags"
});

export default function TagsPage() {
  const tags = getTags();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <SectionHeading
          eyebrow="Browse by tag"
          title="Gaming-tech tags"
          description="Use tags to find narrower guides for specific games, platforms, accessories, and setup problems."
          level={1}
        />
      </header>
      <TaxonomyList items={tags} basePath="/tags" type="tag" />
    </div>
  );
}
