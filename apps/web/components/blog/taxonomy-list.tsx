import { TaxonomyCard } from "@/components/blog/taxonomy-card";

export function TaxonomyList({
  items,
  basePath,
  type
}: {
  items: Array<{
    label: string;
    slug: string;
    count: number;
    description?: string;
  }>;
  basePath: "/categories" | "/tags";
  type: "category" | "tag";
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        No published {type === "category" ? "categories" : "tags"} yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <TaxonomyCard
          key={item.slug}
          href={`${basePath}/${item.slug}`}
          label={item.label}
          count={item.count}
          description={item.description}
          type={type}
        />
      ))}
    </div>
  );
}
