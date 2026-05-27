import Image from "next/image";
import { getRenderableImageSrc } from "@/lib/content/images";

export type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
};

export function ArticleImage({ src, alt, caption, credit }: ArticleImageProps) {
  const imageSrc = getRenderableImageSrc(src);

  if (!imageSrc) {
    return null;
  }

  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft ring-1 ring-white">
      <div className="relative aspect-[16/9] bg-ink">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-contain"
        />
      </div>
      {caption || credit ? (
        <figcaption className="space-y-1 border-t border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {caption ? <span className="block">{caption}</span> : null}
          {credit ? <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
