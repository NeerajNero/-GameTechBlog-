import { slugify } from "@/lib/utils/slug";

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}

export function headingId(text: string): string {
  return slugify(stripInlineMarkdown(text));
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  let inCodeFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);

    if (!match) {
      continue;
    }

    const text = stripInlineMarkdown(match[2]);
    const baseId = slugify(text);

    if (!baseId) {
      continue;
    }

    const duplicates = seen.get(baseId) ?? 0;
    seen.set(baseId, duplicates + 1);

    headings.push({
      id: duplicates === 0 ? baseId : `${baseId}-${duplicates}`,
      text,
      level: match[1].length as 2 | 3
    });
  }

  return headings;
}
