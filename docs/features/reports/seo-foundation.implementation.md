# Feature Implementation Report

## Feature

- Feature slug: `seo-foundation`
- Approval: `docs/features/approvals/seo-foundation.approval.md`
- Plan: `docs/features/plans/seo-foundation.plan.md`
- Implemented at: 2026-05-19
- Status: implemented

## Summary

Implemented the approved frontend/static SEO foundation slice under `apps/web/`.

Included:

- `robots.ts`
- `sitemap.ts`
- canonical URL helper
- normalized site URL handling
- `metadataBase`
- production/non-production metadata robots behavior
- safe image handling for OG and JSON-LD
- reusable JSON-LD renderer
- article `BlogPosting` JSON-LD
- article `BreadcrumbList` JSON-LD
- homepage `WebSite` and `Person` JSON-LD
- static trust/policy pages
- footer links to trust/policy pages

## Files Created

- `apps/web/app/robots.ts`
- `apps/web/app/sitemap.ts`
- `apps/web/components/seo/json-ld.tsx`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/lib/seo/urls.ts`
- `apps/web/components/layout/static-page.tsx`
- `apps/web/app/about/page.tsx`
- `apps/web/app/contact/page.tsx`
- `apps/web/app/privacy-policy/page.tsx`
- `apps/web/app/terms/page.tsx`
- `apps/web/app/editorial-policy/page.tsx`
- `apps/web/app/affiliate-disclosure/page.tsx`

## Files Modified

- `apps/web/app/layout.tsx`
- `apps/web/app/page.tsx`
- `apps/web/app/articles/[slug]/page.tsx`
- `apps/web/components/layout/site-footer.tsx`
- `apps/web/lib/seo/metadata.ts`
- `apps/web/lib/site/config.ts`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/features/plans/seo-foundation.plan.md`

## Packages

No packages were added.

## Verification

Commands run:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Results:

- `pnpm --dir apps/web lint`: passed with no warnings or errors.
- `pnpm --dir apps/web typecheck`: passed after rerun. One earlier concurrent typecheck collided with build-generated `.next/types`; rerunning sequentially passed.
- `pnpm --dir apps/web build`: passed.
- Dev server started at `http://127.0.0.1:3001` because port `3000` was already in use.

Smoke checks:

| URL | Result |
| --- | --- |
| `/` | 200 |
| `/articles` | 200 |
| `/articles/elden-ring-beginner-tips-first-time-souls-players` | 200 |
| `/about` | 200 |
| `/contact` | 200 |
| `/privacy-policy` | 200 |
| `/terms` | 200 |
| `/editorial-policy` | 200 |
| `/affiliate-disclosure` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |

## JSON-LD And Canonical Inspection

Inspected the Elden Ring article page HTML.

- JSON-LD script count: 2.
- JSON-LD types: `BlogPosting`, `BreadcrumbList`.
- JSON-LD has no `undefined` values.
- JSON-LD has no `null` values.
- JSON-LD does not emit an `image` field while cover images are placeholders/missing.
- Canonical metadata is present.
- Local non-production metadata includes `noindex, nofollow`.

## Behavior Notes

- `NEXT_PUBLIC_SITE_URL` is the production canonical source.
- Local fallback is `http://localhost:3000`.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before public launch.
- `robots.txt` allows normal crawling and references sitemap. It is not used for noindex.
- Sitemap includes homepage, `/articles`, published article pages, and trust/policy pages.
- Draft article exclusion remains handled by `getPublishedArticles()`.

## Deviations

- None from approved scope.
- Dev smoke checks used port `3001` because `3000` was already occupied.

## Deferred

- RSS.
- Category/tag pages.
- Real article cover images.
- Generated OG images.
- AdSense.
- Analytics.
- Affiliate links.
- Backend/database/auth/CMS/Docker.
