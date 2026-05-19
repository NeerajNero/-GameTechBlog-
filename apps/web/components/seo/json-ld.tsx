import { sanitizeJsonLd, type JsonInput } from "@/lib/seo/structured-data";

export function JsonLd({ data }: { data: JsonInput }) {
  const sanitized = sanitizeJsonLd(data);

  if (!sanitized || (typeof sanitized === "object" && Object.keys(sanitized).length === 0)) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitized) }}
    />
  );
}
