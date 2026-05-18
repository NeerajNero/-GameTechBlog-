import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="font-semibold text-circuit underline decoration-circuit/30 underline-offset-4 hover:text-ink"
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
