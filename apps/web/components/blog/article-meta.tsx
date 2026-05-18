import { formatDate } from "@/lib/utils/date";

export function ArticleMeta({
  author,
  publishedAt,
  updatedAt,
  readingTime
}: {
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime?: string;
}) {
  const wasUpdated = updatedAt !== publishedAt;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
      <span>{author}</span>
      <span aria-hidden="true">/</span>
      <time dateTime={publishedAt}>Published {formatDate(publishedAt)}</time>
      {wasUpdated ? (
        <>
          <span aria-hidden="true">/</span>
          <time dateTime={updatedAt}>Updated {formatDate(updatedAt)}</time>
        </>
      ) : null}
      {readingTime ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{readingTime}</span>
        </>
      ) : null}
    </div>
  );
}
