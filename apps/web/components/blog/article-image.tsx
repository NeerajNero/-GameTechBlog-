import Image from "next/image";
import { getRenderableImageSrc } from "@/lib/content/images";

export type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  orientation?: "landscape" | "portrait";
};

export function ArticleImage({ src, alt, caption, credit, orientation = "landscape" }: ArticleImageProps) {
  const imageSrc = getRenderableImageSrc(src);

  if (!imageSrc) {
    return null;
  }

  const isPortrait = orientation === "portrait";

  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft ring-1 ring-white">
      {isPortrait ? (
        <div className="flex justify-center bg-ink px-6 py-6">
          <div className="relative w-full max-w-xs aspect-[3/4]">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 320px, 80vw"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/9] bg-ink">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-contain"
          />
        </div>
      )}
      {caption || credit ? (
        <figcaption className="space-y-1 border-t border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {caption ? <span className="block">{caption}</span> : null}
          {credit ? <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
