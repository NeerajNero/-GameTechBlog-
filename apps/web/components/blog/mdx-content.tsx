import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, mdxOptions } from "@/lib/content/mdx";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="article-body">
      <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
