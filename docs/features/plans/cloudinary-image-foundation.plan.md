# Feature Plan

## Status

- Status: implemented
- Feature slug: `cloudinary-image-foundation`
- Source stories: user request
- Classification: `docs/features/classifications/cloudinary-image-foundation.classification.md`
- Lane: normal
- Created: 2026-05-19
- Last updated: 2026-05-19

## Summary

- User-visible outcome: Article cards and article pages can safely render Cloudinary-hosted cover images when real URLs are added to MDX frontmatter, while preserving fallback UI when images are missing.
- Business value: Establishes a low-cost image workflow for content publishing without adding upload/admin infrastructure.
- Surfaces: web, content, SEO, docs.

## Scope

In scope:

- Cloudinary manual workflow documentation.
- Next.js `images.remotePatterns` for `res.cloudinary.com`.
- Optional article frontmatter fields:
  - `coverImage`
  - `coverImageAlt`
  - `coverImageCredit`
- Shared safe-image helper.
- Article card and detail cover rendering with `next/image`.
- Fallback UI when image is missing/placeholder/unsafe.
- SEO/JSON-LD image safety.
- Template/checklist updates.

Out of scope:

- Cloudinary SDK.
- `next-cloudinary`.
- Upload admin.
- Upload API.
- Signed uploads.
- Backend/database/auth/CMS/Docker.
- Ads/analytics/affiliate links.
- Real image asset sourcing.

## Files To Create

- `docs/image-handling.md`
- `apps/web/lib/content/images.ts`
- `docs/features/reports/cloudinary-image-foundation.implementation.md`

## Files To Modify

- `apps/web/next.config.mjs`
- `apps/web/lib/content/types.ts`
- `apps/web/lib/content/validation.ts`
- `apps/web/lib/seo/metadata.ts`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/components/blog/article-card.tsx`
- `apps/web/components/blog/article-header.tsx`
- `apps/web/content/articles/*.mdx`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/seo-checklist.md`
- `templates/article-frontmatter.md`
- `templates/article-seo-checklist.md`

## Image Workflow

Manual MVP workflow:

1. Prepare an image with rights to use it.
2. Upload it manually in the Cloudinary dashboard.
3. Store article images under `gaming-tech-blog/articles/{article-slug}/...`.
4. Copy the secure delivery URL.
5. Paste it into `coverImage` or MDX body.
6. Add descriptive alt text in `coverImageAlt`.
7. Add optional source/credit text in `coverImageCredit`.
8. Commit the MDX change.

Folder convention:

```text
gaming-tech-blog/articles/{article-slug}/...
gaming-tech-blog/site/...
```

## App Design

- `isRenderableImage(value)` returns true for:
  - `https://res.cloudinary.com/...`
  - existing local public image paths
- It returns false for:
  - empty strings
  - `placeholder`
  - `todo`
  - missing local files
  - non-Cloudinary remote URLs
- `getRenderableImageSrc(value)` returns the URL/string to render or `undefined`.
- SEO helpers use the same safety check before emitting image metadata.
- JSON-LD omits `image` when no safe image exists.

## Verification Plan

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Smoke check:

- `/`
- `/articles`
- `/articles/elden-ring-beginner-tips-first-time-souls-players`

Inspection:

- Missing images render fallback UI.
- No broken image URLs are emitted.
- Article JSON-LD has no `undefined`, `null`, or unsafe image field.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Fake or copied image URLs | Broken UI/SEO | Do not add fake Cloudinary URLs; fallback when missing |
| Copyright misuse | Legal/content risk | Document rights warning and require licensed/owned images |
| Cloudinary free plan limits | Images may stop delivering or transformations may be limited | Monitor free usage |
| Overbuilding upload flow | Adds backend/security complexity | Manual dashboard workflow only |

## Approval

- Approved: yes
- Approval file: `docs/features/approvals/cloudinary-image-foundation.approval.md`
- Conditions:
  - No packages.
  - No credentials.
  - No upload/admin/backend implementation.
