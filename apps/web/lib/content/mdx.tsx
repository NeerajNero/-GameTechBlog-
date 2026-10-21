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

/**
 * Compiles article MDX exactly as the site does and throws on anything that
 * would fail the production build.
 *
 * Compilation alone only catches syntax errors. A bare `{expression}` or an
 * unknown `<Component>` compiles cleanly and throws when the element tree is
 * built. The generated MDXContent is a plain function with no hooks, so calling
 * it once builds that tree (without rendering child components) and surfaces
 * those errors here instead of at build time.
 */
export async function checkArticleMdx(source: string): Promise<void> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: mdxOptions
  });

  if (typeof content.type === "function") {
    (content.type as (props: unknown) => unknown)(content.props);
  }
}

const NEXT_MDX_REMOTE_PREFIX = /^\[next-mdx-remote\] error compiling MDX:\s*/;
const MORE_INFORMATION_SUFFIX = /\s*More information: https:\/\/mdxjs\.com\S*\s*$/;
const POSITION_PATTERN = /(\d+):(\d+)(?:-\d+:\d+)?/;

/**
 * Normalizes errors from compileMDX / tree evaluation. next-mdx-remote rewraps
 * compiler errors as a plain Error and drops the original position, so the
 * line is recovered from the message text when the compiler included it.
 */
export function toMdxCompileError(error: unknown): MdxCompileError {
  if (typeof error === "object" && error !== null) {
    const { reason, message, line, column } = error as {
      reason?: unknown;
      message?: unknown;
      line?: unknown;
      column?: unknown;
    };
    const raw =
      typeof reason === "string" && reason !== ""
        ? reason
        : typeof message === "string"
          ? message
          : "Unknown MDX error.";
    const text = raw.replace(NEXT_MDX_REMOTE_PREFIX, "").replace(MORE_INFORMATION_SUFFIX, "").trim();
    const position = POSITION_PATTERN.exec(text);

    return {
      message: text,
      line: typeof line === "number" ? line : position ? Number(position[1]) : undefined,
      column: typeof column === "number" ? column : position ? Number(position[2]) : undefined
    };
  }

  return { message: "Unknown MDX error." };
}
