import type { ReactNode } from "react";
import type { Article } from "@/lib/content/types";

type ArticleQuickTakeProps = {
  article?: Article;
  title?: string;
  items?: string[];
  verdict?: string;
  children?: ReactNode;
};

export function ArticleQuickTake({
  article,
  title = "Quick take",
  items,
  verdict,
  children
}: ArticleQuickTakeProps) {
  const cleanItems = items?.map((item) => item.trim()).filter(Boolean) ?? [];
  const quickTake = article ? article.quickTake?.trim() || article.description : "";

  if (cleanItems.length === 0 && !children && !quickTake && !verdict) {
    return null;
  }

  return (
    <aside className="my-8 rounded-xl border border-circuit/20 bg-white p-5 shadow-soft ring-1 ring-circuit/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <p className="shrink-0 rounded-md bg-circuit px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white">
          {title}
        </p>
        <div className="min-w-0 space-y-3 text-base font-semibold leading-7 text-ink">
          {cleanItems.length > 0 ? (
            <ul className="article-quick-take-list space-y-2">
              {cleanItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-circuit" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : children ? (
            <div className="article-quick-take-content">{children}</div>
          ) : (
            <p>{quickTake}</p>
          )}
          {verdict ? (
            <p className="border-t border-slate-200 pt-3 text-sm font-black uppercase tracking-wide text-circuit">
              {verdict}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
