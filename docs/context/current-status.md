# Current Status

## Status

MVP static blog vertical slice is implemented under `apps/web/`.

## Completed

- Project scope clarified as content-first MVP.
- Backend/database/admin/CMS/auth/payment/user-account work explicitly deferred.
- Local MDX article storage selected.
- Vercel deployment flow documented.
- Project-specific docs, feature docs, decision records, and article templates created.
- First MVP vertical-slice classification created at `docs/features/classifications/mvp-static-blog.classification.md`.
- First MVP vertical-slice plan created at `docs/features/plans/mvp-static-blog.plan.md`.
- Approval created at `docs/features/approvals/mvp-static-blog.approval.md`.
- Next.js App Router scaffold created at `apps/web/`.
- Three MDX sample articles created under `apps/web/content/articles/`.
- Basic layout, homepage, article listing, article detail, MDX rendering, and SEO metadata implemented.
- Verification passed with `pnpm install`, `pnpm --dir apps/web lint`, `pnpm --dir apps/web typecheck`, and `pnpm --dir apps/web build`.

## Not Started

- Vercel project setup.
- Custom domain setup.
- Search Console setup.
- AdSense application.
- Real article cover image assets.
- Sitemap, robots, and JSON-LD article schema.
- Policy pages.
- RSS feed.
- Category and tag pages.
- SEO documentation has been patched for scope and best practices, but implementation is still pending.
- SEO foundation classification created at `docs/features/classifications/seo-foundation.classification.md`.
- SEO foundation implementation plan created at `docs/features/plans/seo-foundation.plan.md`.
- SEO foundation approval created at `docs/features/approvals/seo-foundation.approval.md`.

## Next Recommended Task

Implement the approved SEO foundation slice from `docs/features/approvals/seo-foundation.approval.md`.

## Known Constraints

- This workspace is a Git repository.
- Backend, database, Docker, auth, CMS, admin, payments, and user accounts remain deferred.
- Article cover image files are placeholders for a later asset pass.
- SEO implementation must not add RSS, category/tag pages, ads, analytics, affiliate links, backend, database, auth, CMS, or Docker.
