import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleHighlight } from "@/components/blog/article-highlight";
import { ArticleImage } from "@/components/blog/article-image";
import { ArticlePullQuote } from "@/components/blog/article-pull-quote";
import { ArticleQuickTake } from "@/components/blog/article-quick-take";
import { ArticleReadMore } from "@/components/blog/article-read-more";
import { ArticleVerdict } from "@/components/blog/article-verdict";
import { slugify } from "@/lib/utils/slug";

function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return childrenToText(children.props.children);
  }

  return "";
}

function createComponents() {
  // Mirrors the duplicate-id suffixing in lib/content/toc.ts so sidebar
  // anchors always match the rendered heading ids.
  const seen = new Map<string, number>();

  const heading = (Tag: "h2" | "h3") =>
    function Heading(props: HTMLAttributes<HTMLHeadingElement>) {
      const baseId = slugify(childrenToText(props.children));
      const duplicates = seen.get(baseId) ?? 0;
      seen.set(baseId, duplicates + 1);
      const id = duplicates === 0 ? baseId : `${baseId}-${duplicates}`;

      return <Tag {...props} id={baseId ? id : undefined} className="scroll-mt-24" />;
    };

  return {
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
    h2: heading("h2"),
    h3: heading("h3"),
    table: (props: HTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    )
  };
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="article-body">
      <MDXRemote source={source} components={createComponents()} />
    </div>
  );
}
