# Taxonomy Design Review

## Status

Reviewed and safe to commit.

## Review Scope

- Category and tag routing.
- Invalid taxonomy slug handling.
- Taxonomy helper behavior.
- SEO metadata, canonicals, sitemap, and article JSON-LD preservation.
- Homepage, listing, article detail, related articles, chips, links, and responsive classes.
- Scope control for deferred platform/product features.

## Issues Found

### Fixed: Taxonomy Pages Needed Page-Level H1 Headings

The category and tag pages used the shared `SectionHeading` component, which rendered an `h2`. That left taxonomy pages without a clear page-level `h1`.

Fix:

- Added `level?: 1 | 2` support to `SectionHeading`.
- Updated category/tag index and detail pages to render their main heading as `h1`.

### Fixed: Header Could Become Cramped On Small Screens

The header was still a single-row flex layout after adding `Articles`, `Categories`, and `Tags`.

Fix:

- Updated the header container to stack on small screens and switch to a row on `sm`.
- Allowed the primary nav to wrap.

### Fixed: Empty Taxonomy Slugs Were Not Explicitly Guarded

Slug collisions were handled, but a future category/tag label made entirely of punctuation could slugify to an empty string.

Fix:

- Added a build-time error when a category or tag label produces an empty slug.

## Confirmed Behavior

- `/categories`, `/categories/[category]`, `/tags`, and `/tags/[tag]` are static server-rendered routes.
- Invalid category/tag slugs call `notFound()`.
- Taxonomy helpers use `getPublishedArticles()`, so draft articles are excluded.
- Category/tag display labels are preserved while URLs use generated slugs.
- Slug collisions throw clear build-time errors.
- Category and tag pages use existing `createPageMetadata` behavior for metadata, canonical URLs, `metadataBase`, and robots behavior.
- Sitemap includes taxonomy index and detail routes.
- Sitemap taxonomy entries are generated only from published articles.
- Article `BlogPosting` and `BreadcrumbList` JSON-LD code was not changed in the review pass.
- Cloudinary image fallback behavior remains intact.

## Scope Control

Confirmed no accidental additions:

- No backend.
- No database.
- No auth.
- No CMS.
- No Docker.
- No ads.
- No analytics.
- No affiliate links.
- No RSS.
- No comments.
- No user accounts.
- No new packages.

## Verification

Passed:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`

Build confirmed:

- Category static paths are generated.
- Tag static paths are generated.
- Existing article static paths still build.
- Sitemap and robots routes still build.

## Remaining Known Issues

- No blocking issues found.
- Visual QA in a browser/mobile viewport is still recommended before public launch, but code-level responsive classes are reasonable for this slice.

## Commit Recommendation

Safe to commit.
