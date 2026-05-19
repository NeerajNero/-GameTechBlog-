# Taxonomy Design Implementation Report

## Status

Implemented.

## Scope Delivered

- Added category index and detail pages.
- Added tag index and detail pages.
- Built taxonomy collections from published MDX articles only.
- Preserved category/tag display labels while using slug URLs.
- Added article counts for categories and tags.
- Added category descriptions for known categories with a fallback for future categories.
- Added build-time slug collision guards for category and tag labels.
- Added metadata and canonical URLs for taxonomy pages.
- Added taxonomy routes to the sitemap.
- Polished homepage structure with hero, featured articles, latest articles, category highlights, and a guide/review/buying-guide callout.
- Polished article listing with category and tag discovery blocks.
- Polished article detail with linked category/tag chips, back links, narrower reading width, and server-rendered related article support.
- Updated header navigation to main content sections only.
- Kept footer trust/policy links while adding useful content links.

## Files Created

- `apps/web/app/categories/page.tsx`
- `apps/web/app/categories/[category]/page.tsx`
- `apps/web/app/tags/page.tsx`
- `apps/web/app/tags/[tag]/page.tsx`
- `apps/web/lib/content/taxonomy.ts`
- `apps/web/components/blog/section-heading.tsx`
- `apps/web/components/blog/taxonomy-card.tsx`
- `apps/web/components/blog/taxonomy-list.tsx`
- `apps/web/components/blog/related-articles.tsx`
- `docs/features/reports/taxonomy-design.implementation.md`

## Files Modified

- `apps/web/app/page.tsx`
- `apps/web/app/articles/page.tsx`
- `apps/web/app/articles/[slug]/page.tsx`
- `apps/web/app/sitemap.ts`
- `apps/web/components/blog/article-card.tsx`
- `apps/web/components/blog/article-header.tsx`
- `apps/web/components/blog/tag-list.tsx`
- `apps/web/components/layout/site-header.tsx`
- `apps/web/components/layout/site-footer.tsx`
- `docs/context/current-status.md`
- `docs/context/project-map.md`

## Packages Added

None.

## Deferred

- RSS.
- Search.
- Client-side filters.
- Comments.
- Analytics.
- Ads.
- Affiliate links.
- Real article image asset pass.
- Generated Open Graph images.

## Verification

Passed:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`

Dev server:

- Started with `pnpm --dir apps/web dev --hostname 127.0.0.1`.
- Next.js used `http://127.0.0.1:3002` because ports 3000 and 3001 were already occupied.

Smoke checks passed:

- `/` returned 200.
- `/articles` returned 200.
- `/articles/elden-ring-beginner-tips-first-time-souls-players` returned 200.
- `/categories` returned 200.
- `/categories/gaming-guides` returned 200.
- `/tags` returned 200.
- `/tags/elden-ring` returned 200.
- `/sitemap.xml` returned 200.

Inspection:

- `/categories/not-real` returned 404.
- `/tags/not-real` returned 404.
- Taxonomy pages render canonical URLs and non-production `noindex, nofollow` metadata.
- Sitemap includes `/categories`, category detail routes, `/tags`, and tag detail routes.
- Sitemap inspection found no draft routes.
- Article JSON-LD still renders `BlogPosting` and `BreadcrumbList`.
- Parsed article JSON-LD contains no `undefined`, `null`, or unsafe image fields.
- No broken article image URLs render while sample article cover images are empty.

## Notes

- Taxonomy helpers use `getPublishedArticles()`, so draft articles are excluded from taxonomy pages, static params, and sitemap entries.
- Taxonomy pages do not add structured data.
- Existing article `BlogPosting` and `BreadcrumbList` JSON-LD behavior is preserved.
