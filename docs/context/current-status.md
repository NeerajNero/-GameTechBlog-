# Current Status

## Status

MVP static blog, SEO foundation, Cloudinary image foundation, taxonomy/design polish, the first article image asset pass, and pre-launch documentation are implemented under `apps/web/` and `docs/`.

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
- SEO foundation classification created at `docs/features/classifications/seo-foundation.classification.md`.
- SEO foundation implementation plan created at `docs/features/plans/seo-foundation.plan.md`.
- SEO foundation approval created at `docs/features/approvals/seo-foundation.approval.md`.
- SEO foundation implemented with sitemap, robots, metadata/canonical helpers, JSON-LD, and static trust/policy pages.
- SEO verification passed with lint, typecheck, build, dev-server smoke checks, and JSON-LD inspection.
- Cloudinary image foundation classification, plan, and approval artifacts created.
- Manual Cloudinary delivery workflow documented in `docs/image-handling.md`.
- Next.js image handling now allows Cloudinary delivery URLs and avoids rendering placeholder or missing cover images.
- Taxonomy/design classification created at `docs/features/classifications/taxonomy-design.classification.md`.
- Taxonomy/design implementation plan created at `docs/features/plans/taxonomy-design.plan.md`.
- Taxonomy/design approval created at `docs/features/approvals/taxonomy-design.approval.md`.
- Taxonomy/design implemented with category pages, tag pages, homepage polish, listing polish, article detail polish, navigation polish, and sitemap updates.
- Article image asset pass classification created at `docs/features/classifications/article-image-asset-pass.classification.md`.
- Article image asset pass plan created at `docs/features/plans/article-image-asset-pass.plan.md`.
- Manual image asset checklist created at `docs/image-asset-checklist.md`.
- Three sample articles now include real Cloudinary cover image URLs, alt text, and owner-credit frontmatter.
- Pre-launch review completed.
- Vercel launch checklist, domain setup guide, and environment variable guide created under `docs/deployment/`.
- Pre-launch lint, typecheck, build, smoke checks, sitemap/robots checks, and JSON-LD/canonical inspection passed locally.

## Not Started

- Vercel project setup.
- Custom domain setup.
- Search Console setup.
- AdSense application.
- RSS feed.
- Real production `NEXT_PUBLIC_SITE_URL` configuration on Vercel.
- Google Rich Results Test validation after deployment.

## Launch Blockers

- Final public contact email or contact channel must be added before launch.
- Vercel project has not been created.
- Custom domain has not been connected.
- Production `NEXT_PUBLIC_SITE_URL` has not been set in Vercel.
- Search Console has not been configured.
- Policy pages should be reviewed once the final domain/contact channel is known.

## Next Recommended Task

Commit the pre-launch review and deployment documentation, then create the Vercel project and configure the final production domain/env values.

## Known Constraints

- This workspace is a Git repository.
- Backend, database, Docker, auth, CMS, admin, payments, and user accounts remain deferred.
- Article cover images for the first three sample articles use Cloudinary delivery URLs.
- Cloudinary is delivery-only in MVP; no upload/admin system, SDK, signed uploads, credentials, or backend routes are included.
- RSS, ads, analytics, affiliate links, backend, database, auth, CMS, and Docker remain deferred.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before public launch.
- The contact page currently uses a launch-time placeholder until a public contact email/channel is finalized.
