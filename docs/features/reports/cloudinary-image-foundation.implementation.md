# Cloudinary Image Foundation Implementation Report

## Status

Implemented.

## Scope Delivered

- Added manual Cloudinary image-handling documentation.
- Added classification, plan, and approval artifacts for the image foundation slice.
- Configured Next.js image delivery for `https://res.cloudinary.com/**`.
- Added article image frontmatter support for `coverImage`, `coverImageAlt`, and optional `coverImageCredit`.
- Added renderability checks so placeholder, empty, TODO, missing local, or unsafe image values are not rendered.
- Updated article cards and article detail pages to render Cloudinary/local public images only when valid.
- Added fallback visual blocks when article cover images are missing.
- Updated SEO metadata and JSON-LD image behavior to omit invalid image values.
- Updated sample articles so they do not reference fake or missing image assets.
- Updated article templates and SEO checklist for the manual Cloudinary workflow.

## Files Created

- `docs/features/classifications/cloudinary-image-foundation.classification.md`
- `docs/features/plans/cloudinary-image-foundation.plan.md`
- `docs/features/approvals/cloudinary-image-foundation.approval.md`
- `docs/features/reports/cloudinary-image-foundation.implementation.md`
- `docs/image-handling.md`
- `apps/web/lib/content/images.ts`

## Files Modified

- `apps/web/next.config.mjs`
- `apps/web/lib/content/types.ts`
- `apps/web/lib/content/validation.ts`
- `apps/web/lib/seo/metadata.ts`
- `apps/web/lib/seo/structured-data.ts`
- `apps/web/components/blog/article-card.tsx`
- `apps/web/components/blog/article-header.tsx`
- `apps/web/content/articles/elden-ring-beginner-tips-first-time-souls-players.mdx`
- `apps/web/content/articles/best-router-setup-ps-remote-play-steam-link.mdx`
- `apps/web/content/articles/best-ssd-setup-large-gaming-libraries.mdx`
- `templates/article-frontmatter.md`
- `templates/article-seo-checklist.md`
- `docs/seo-checklist.md`
- `docs/context/current-status.md`
- `docs/context/project-map.md`

## Packages Added

None.

## Deferred

- Real article cover image selection and upload.
- Cloudinary SDK.
- `next-cloudinary`.
- Upload API routes.
- Upload admin UI.
- Signed uploads.
- Image transformation policy beyond manual dashboard use.
- Backend, database, auth, CMS, Docker, ads, analytics, and affiliate links.

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

Inspection:

- No `<img>`, `/_next/image`, `/images/articles`, or `res.cloudinary.com` URLs were rendered while sample articles have empty cover images.
- The article detail page rendered the fallback cover block.
- Article JSON-LD rendered `BlogPosting` and `BreadcrumbList`.
- Parsed JSON-LD contained no `undefined`, `null`, or image fields when no valid image exists.

## Notes

- Production does not require Cloudinary credentials for this slice because images are manually uploaded and delivered through public secure URLs.
- The app intentionally omits invalid image values from Open Graph, Twitter, and JSON-LD metadata instead of emitting broken URLs.
