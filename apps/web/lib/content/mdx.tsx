import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleHighlight } from "@/components/blog/article-highlight";
import { ArticleImage } from "@/components/blog/article-image";
import { ArticlePullQuote } from "@/components/blog/article-pull-quote";
import { ArticleQuickTake } from "@/components/blog/article-quick-take";
import { ArticleReadMore } from "@/components/blog/article-read-more";
import { ArticleVerdict } from "@/components/blog/article-verdict";

/**
 * Single source of truth for how article MDX is compiled: the components map
 * and (currently no) remark/rehype plugins. Used by the article page renderer
 * and by the admin API to reject MDX that would break the production build.
 */
export const mdxComponents = {
  ArticleCallout,
  ArticleHighlight,
  ArticleImage,
  ArticlePullQuote,
  ArticleQuickTake,
  ArticleReadMore,
  ArticleVerdict,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="font-semibold text-circuit underline decoration-circuit/30 underline-offset-4 transition hover:text-ink hover:decoration-ink/40"
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  )
};

export const mdxOptions = {
  parseFrontmatter: false
};

export type MdxCompileError = {
  message: string;
  line?: number;
  column?: number;
};

/** Compiles article MDX exactly as the site does; returns the React element. */
export async function compileArticleMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: mdxOptions
  });

  return content;
}

export function toMdxCompileError(error: unknown): MdxCompileError {
  if (typeof error === "object" && error !== null) {
    const { reason, message, line, column } = error as {
      reason?: unknown;
      message?: unknown;
      line?: unknown;
      column?: unknown;
    };
    const text =
      typeof reason === "string" && reason !== ""
        ? reason
        : typeof message === "string"
          ? message
          : "Unknown MDX error.";

    return {
      message: text,
      line: typeof line === "number" ? line : undefined,
      column: typeof column === "number" ? column : undefined
    };
  }

  return { message: "Unknown MDX error." };
}
