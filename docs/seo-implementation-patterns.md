# SEO Implementation Patterns

This document defines the SEO implementation standard for the gaming + tech blog.

Use it when planning or implementing SEO-facing changes.

## Goals

- Make every public page indexable only when it is production-ready.
- Keep canonical URLs consistent.
- Generate metadata from one helper layer instead of duplicating page-level objects.
- Generate sitemap and robots files from source-of-truth content.
- Exclude draft content from all crawl surfaces.
- Add structured data for articles and breadcrumbs.
- Keep implementation simple enough for a static MDX blog.

## Implemented Foundation

The current production site includes:

- Sitemap.
- Robots.
- Metadata and canonical URL helpers.
- `metadataBase` from the normalized site URL.
- JSON-LD helpers and article rendering.
- Static trust/policy pages:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/editorial-policy`
  - `/affiliate-disclosure`

Still deferred:

- RSS. Add it later after the article workflow is stable.
- Generated OG images per article.

## SEO File Map

Recommended files:

```text
apps/web/
  app/
    robots.ts
    sitemap.ts
    about/
      page.tsx
    contact/
      page.tsx
    privacy-policy/
      page.tsx
    terms/
      page.tsx
    editorial-policy/
      page.tsx
    affiliate-disclosure/
      page.tsx
  components/
    seo/
      json-ld.tsx
  lib/
    seo/
      metadata.ts
      structured-data.ts
      urls.ts
    site/
      config.ts
```

Existing files to extend:

```text
apps/web/lib/seo/metadata.ts
apps/web/lib/site/config.ts
apps/web/app/layout.tsx
apps/web/app/page.tsx
apps/web/app/articles/page.tsx
apps/web/app/articles/[slug]/page.tsx
```

## Site URL Pattern

Use one canonical site URL source.

Rules:

- Read `NEXT_PUBLIC_SITE_URL`.
- In production, fail loudly if it is missing.
- In development, allow `http://localhost:3000`.
- Normalize by removing trailing slashes.
- Build URLs with the `URL` constructor, not string concatenation.
- Do not hardcode a fake production domain.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before launch.
- The root layout or central metadata helper should use `metadataBase` based on the normalized site URL.

Recommended helper:

```ts
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
```

Why:

- Prevents malformed canonicals such as double slashes.
- Keeps metadata, sitemap, robots, and JSON-LD aligned.
- Makes domain migration easier.

## Metadata Builder Pattern

Use one metadata helper for default page metadata and one article helper for article metadata.

Every public page should set:

- `title`
- `description`
- `alternates.canonical`
- Open Graph title, description, URL, site name, and image
- Twitter card metadata
- robots indexing behavior

Static trust/policy pages should also use this helper. Each one needs a clear title, description, canonical URL, and the shared production/non-production robots behavior.

Robots behavior:

- Production: `index: true`, `follow: true`
- Non-production: `index: false`, `follow: false`

Do not rely on every page author remembering this. Put it in `createPageMetadata`.

## Article Metadata Pattern

Article pages should use `generateMetadata`.

Source fields:

| Metadata | Frontmatter Source |
| --- | --- |
| title | `seoTitle` |
| description | `seoDescription` |
| canonical | `/articles/${slug}` |
| Open Graph type | `article` |
| published time | `publishedAt` |
| modified time | `updatedAt` |
| author | `author` |
| tags | `tags` |

Rules:

- If article is missing or draft-filtered, return a safe "not found" title and let the page call `notFound()`.
- Never include `draft: true` articles in `generateStaticParams`.
- Prefer article-specific OG images when real cover images exist.
- Use fallback OG image only when the article image is missing.

## Robots Pattern

Add `apps/web/app/robots.ts`.

Rules:

- Allow public content.
- Disallow internal, draft, preview, private, and future admin paths.
- Include sitemap URL.
- Do not use `robots.txt` to noindex pages.
- Use metadata robots/noindex behavior for non-production deployments.
- Production `robots.txt` should allow crawling and point to sitemap.

For this blog, start with:

```text
allow:
  /

disallow:
  /drafts
  /preview
  /admin
  /api
```

If preview routes are added later, they must stay disallowed.

## Sitemap Pattern

Add `apps/web/app/sitemap.ts`.

Include:

- Homepage.
- Article listing page.
- Published article pages.
- Static trust/policy pages.
- Category pages later, after taxonomy pages are implemented.
- Tag pages later, after taxonomy pages are implemented.

Exclude:

- Draft articles.
- Not-found pages.
- Internal preview/admin routes.
- Search result pages unless intentionally indexable.

Article sitemap fields:

- `url`: canonical article URL.
- `lastModified`: `updatedAt`.
- `changeFrequency`: `weekly` for evergreen articles, `monthly` for stable policy/about pages.
- `priority`: homepage highest, important article/category pages next.

Recommended priorities:

| Page Type | Priority |
| --- | --- |
| Homepage | 1 |
| Articles index | 0.8 |
| Featured articles | 0.8 |
| Normal articles | 0.7 |
| Category pages | 0.7 |
| Tag pages | 0.5 |
| Policy pages | 0.3 |

## Structured Data Pattern

Add JSON-LD after the basic metadata layer.

Recommended schemas:

- `WebSite` for the root layout or homepage.
- `Person` for the author/personal brand.
- `BlogPosting` or `Article` for article pages.
- `BreadcrumbList` for article pages.

Article `BlogPosting` fields:

- `headline`
- `description`
- `datePublished`
- `dateModified`
- `author`
- `image`
- `mainEntityOfPage`
- `url`

Rules:

- Generate JSON-LD from the same article object used by the page.
- Do not hard-code article JSON-LD in MDX.
- Do not include fake ratings, reviews, prices, or FAQ schema.
- Add FAQ schema only when the visible page has a real FAQ section.
- Article pages should render `BlogPosting` or `Article` JSON-LD.
- Article pages should render `BreadcrumbList` JSON-LD.
- JSON-LD must not include undefined, null, or fake values.
- Validate deployed pages later with Google Rich Results Test.

## Open Graph Image Pattern

Each article should eventually have a real cover image.

Current fallback pattern:

- Use article `coverImage` only if it exists and is not a placeholder.
- Avoid broken OG and JSON-LD image URLs.
- Use a site-level fallback OG image only when an actual fallback file exists.
- Keep image dimensions at `1200x630` for OG compatibility.
- Alt text should describe the article topic, not repeat only the title.
- Leave image fields empty until a real Cloudinary or local public image is available.

Future improvement:

- Add generated OG images per article once the content style is stable.

## Middleware And Crawl Safety

If middleware is added later, exclude SEO and static assets from auth/redirect logic.

Exclude at minimum:

```text
robots.txt
sitemap.xml
manifest.json
favicon.ico
_next/static
_next/image
images
.well-known
```

Why:

- Crawlers must be able to fetch sitemap and robots without app redirects.
- Social crawlers must be able to fetch OG images.
- Static assets should not pass through auth or personalization middleware.

## Content Validation Pattern

The content helper should validate SEO fields at build time.

Required for published articles:

- `seoTitle`
- `seoDescription`
- `slug`
- `publishedAt`
- `updatedAt`
- `coverImage`
- `draft: false`

Recommended validation:

- `seoTitle` is non-empty and unique.
- `seoDescription` is non-empty and unique.
- `slug` matches filename.
- `updatedAt` is not before `publishedAt`.
- `coverImage` starts with `/images/articles/`.
- Draft articles are excluded from sitemap and static params.

## Best-Practice Adjustments

Use these improved rules even if older projects use looser patterns:

- Do not disable ESLint during production builds.
- Do not build canonical URLs with raw string concatenation.
- Do not let production metadata depend on an undefined site URL.
- Do not return an empty production sitemap on fetch errors; fail build or log clearly depending on the content source.
- Do not index non-production deployments.
- Do not include private, auth, admin, preview, or draft routes in sitemap.
- Do not add structured data for content that is not visible on the page.
- Do not use `robots.txt` as a noindex mechanism.
- Do not emit image metadata for files that do not exist.

## Verification Checklist

Run after SEO implementation:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

Manual checks:

- Open `/robots.txt`.
- Open `/sitemap.xml`.
- Check homepage canonical.
- Check `/articles` canonical.
- Check each trust/policy page canonical.
- Check one article canonical.
- Confirm draft articles are absent from sitemap.
- Confirm article JSON-LD is present and valid JSON.
- Confirm breadcrumb JSON-LD is present on article pages.
- Confirm JSON-LD has no undefined, null, or fake values.
- Confirm non-production metadata uses noindex.

Recommended later checks:

- Rich Results Test for article pages.
- Search Console sitemap submission after custom domain setup.
- Social preview debugger after real OG images exist.
