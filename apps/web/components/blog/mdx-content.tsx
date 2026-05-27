import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleCallout } from "@/components/blog/article-callout";
import { ArticleHighlight } from "@/components/blog/article-highlight";
import { ArticleImage } from "@/components/blog/article-image";
import { ArticlePullQuote } from "@/components/blog/article-pull-quote";
import { ArticleQuickTake } from "@/components/blog/article-quick-take";
import { ArticleReadMore } from "@/components/blog/article-read-more";
import { ArticleVerdict } from "@/components/blog/article-verdict";

const components = {
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

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="article-body">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
