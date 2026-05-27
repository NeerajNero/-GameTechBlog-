import type { ReactNode } from "react";

export function ArticleHighlight({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-sm bg-amber-100 px-1 py-0.5 font-semibold text-ink decoration-amber-300 decoration-2 underline-offset-4">
      {children}
    </mark>
  );
}
