# SEO Foundation

## Goal

Set up the blog so every article can compete for search traffic without requiring manual SEO fixes after publication.

## Required Foundations

- Metadata from frontmatter.
- Canonical URLs.
- Open Graph metadata.
- Twitter card metadata.
- Sitemap.
- Robots.
- Article structured data.
- Breadcrumb structured data.
- Draft exclusion from SEO outputs.
- Central SEO helpers for metadata, URLs, sitemap entries, and JSON-LD.
- Production-only indexing with non-production `noindex`.
- Site URL normalization through one config source.
- Static trust/policy pages.

## Current SEO Foundation

The production site includes:

- Sitemap.
- Robots.
- Metadata helpers.
- Canonical URL helpers.
- JSON-LD helpers and rendering.
- URL normalization.
- Static trust/policy pages.

Static trust/policy pages:

- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/editorial-policy`
- `/affiliate-disclosure`

RSS is deferred for now. Add RSS later only if the article workflow and audience need it.

## Implementation Pattern

Use `docs/seo-implementation-patterns.md` as the implementation standard.

SEO-related implementation lives in:

- `apps/web/app/robots.ts`
- `apps/web/app/sitemap.ts`
- Static pages under `apps/web/app/` for `/about`, `/contact`, `/privacy-policy`, `/terms`, `/editorial-policy`, and `/affiliate-disclosure`
- `apps/web/components/seo/json-ld.tsx`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/lib/seo/urls.ts`

Related files:

- `apps/web/lib/seo/metadata.ts`
- `apps/web/lib/site/config.ts`
- `apps/web/app/layout.tsx`
- `apps/web/app/articles/[slug]/page.tsx`

## Static Page Metadata Requirements

Each trust/policy page should have:

- `title`
- `description`
- canonical URL
- production/non-production robots behavior from the central metadata helper

## Site URL Rules

- Use `NEXT_PUBLIC_SITE_URL` as the production canonical source.
- Normalize trailing slashes.
- Use `http://localhost:3000` as the local fallback.
- Do not hardcode a fake production domain.
- Production Vercel should keep `NEXT_PUBLIC_SITE_URL=https://gametechguides.com`.
- The root layout or central metadata helper should use `metadataBase` based on the normalized site URL.

## Content SEO Rules

- One article should target one primary intent.
- Titles should be clear, not clickbait.
- Introductions should answer why the article exists.
- Headings should map to real reader questions.
- Comparison tables should be used when they help buying decisions.
- Internal links should connect related guides.

## Technical SEO Rules

- Published article URLs should be stable.
- Slugs should not include dates unless there is a strong reason.
- Draft pages should not be indexed.
- Images need alt text.
- Important pages should be reachable through navigation or internal links.
- Do not use `robots.txt` to noindex pages.
- Use metadata robots/noindex behavior for non-production deployments.
- Production `robots.txt` should allow crawling and point to the sitemap.
- Avoid broken Open Graph or JSON-LD image URLs.

## Launch SEO Checklist

- Custom domain connected.
- Sitemap submitted in Google Search Console.
- Core pages indexed.
- Article pages have valid metadata.
- Policy and disclosure pages are live.
- Production `NEXT_PUBLIC_SITE_URL` is set.
- Non-production deployments are not indexable.
- Article pages render `BlogPosting` or `Article` JSON-LD.
- Article pages render `BreadcrumbList` JSON-LD.
- JSON-LD does not include undefined, null, or fake values.
- Deployed article pages are validated later with Google Rich Results Test.
