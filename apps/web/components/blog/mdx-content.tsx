import Image from "next/image";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getRenderableImageSrc } from "@/lib/content/images";

type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
};

function ArticleImage({ src, alt, caption, credit }: ArticleImageProps) {
  const imageSrc = getRenderableImageSrc(src);

  if (!imageSrc) {
    return null;
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="relative aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover"
        />
      </div>
      {caption || credit ? (
        <figcaption className="space-y-1 px-4 py-3 text-sm leading-6 text-slate-600">
          {caption ? <span className="block">{caption}</span> : null}
          {credit ? <span className="block text-xs text-slate-500">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

const components = {
  ArticleImage,
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
