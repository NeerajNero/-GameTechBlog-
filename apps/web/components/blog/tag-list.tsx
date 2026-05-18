export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Article tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
