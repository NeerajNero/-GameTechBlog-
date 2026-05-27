# Current Status

## Status

GameTechGuides is a live production content site at `https://gametechguides.com`.
The site has published articles, production SEO behavior, Search Console setup,
sitemap/robots, Cloudinary article image handling, logo/favicon assets,
scan-friendly article components, and future article pattern documentation.

## Completed

- Project scope clarified as a content-first static site.
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
- Total Overdose nostalgia/opinion article is now published with Cloudinary cover metadata:
  - `apps/web/content/articles/total-overdose-underrated-ps2-masterpiece.mdx`
- Pre-launch review completed.
- Vercel launch checklist, domain setup guide, and environment variable guide created under `docs/deployment/`.
- Pre-launch lint, typecheck, build, smoke checks, sitemap/robots checks, and JSON-LD/canonical inspection passed locally.
- Vercel pre-domain deployment fix implemented so missing `NEXT_PUBLIC_SITE_URL` no longer blocks temporary Vercel builds.
- Vercel production/preview build simulations passed after the fix.
- Production-domain SEO and branding inspection completed for `https://gametechguides.com`.
- Production site is live at `https://gametechguides.com`.
- Search Console is configured for the production domain.
- Sitemap and robots are live for the production domain.
- Published articles are indexable in production when `NEXT_PUBLIC_SITE_URL=https://gametechguides.com` and `VERCEL_ENV=production`.
- Site branding changed from GameTechBlog to GameTechGuides in shared config, user-facing trust pages, package metadata, and article publisher JSON-LD.
- Local GameTechGuides brand assets are stored under `apps/web/public/brand/`.
- Header branding uses the local square icon, visible `GameTechGuides` text, and a compact subtitle; the wide logo is not used in the header.
- Browser/app icon support uses the Next.js App Router `apps/web/app/icon.png` convention.
- Favicon compatibility now includes stable `/favicon.ico`, `/icon.png`, and `/apple-icon.png` paths.
- Article detail pages use a polished hero, cinematic cover frame, quick-take box, richer MDX typography, optional `ArticleCallout`, `ArticleHighlight`, `ArticlePullQuote`, `ArticleQuickTake`, `ArticleReadMore`, and `ArticleVerdict` MDX components, and improved related article presentation.
- The Forza Horizon 6 hands-on article uses the scan-friendly MDX component pattern with a quick take, expandable detail sections, and final verdict block.
- Article templates and content/SEO workflow docs now point future articles toward the scan-friendly pattern.
- Trust and policy pages use production/live-site wording instead of launch-placeholder or MVP wording.
- Public contact email is configured as `gametechguides@gmail.com`.

## Current Phase

Ongoing phase: production content growth, editorial quality, routine SEO checks,
and live-site maintenance.

## Deferred

- AdSense application.
- Analytics.
- Affiliate links.
- RSS feed.
- Backend, database, auth, CMS, admin, Docker, and user accounts.
- Google Rich Results Test validation for representative articles.

## Next Recommended Task

Continue publishing scan-friendly original articles and validate representative
live pages with Google Rich Results Test.

## Known Constraints

- This workspace is a Git repository.
- Backend, database, Docker, auth, CMS, admin, payments, and user accounts remain deferred.
- Article cover images for the first three sample articles use Cloudinary delivery URLs.
- Published Total Overdose article also uses a Cloudinary delivery URL for cover image.
- Core brand assets use local repo files under `apps/web/public/brand/` and `apps/web/app/icon.png`.
- Stable favicon assets use `apps/web/public/favicon.ico`, `apps/web/app/icon.png`, and `apps/web/app/apple-icon.png`.
- The wide logo asset appears to have a checkerboard-style background and should be re-exported or cleaned before public use.
- Cloudinary is delivery-only; no upload/admin system, SDK, signed uploads, credentials, or backend routes are included.
- RSS, ads, analytics, affiliate links, backend, database, auth, CMS, and Docker remain deferred.
- Vercel preview deployments can build without `NEXT_PUBLIC_SITE_URL` and should remain noindex.
- Production Vercel should keep `NEXT_PUBLIC_SITE_URL=https://gametechguides.com`.
- The public contact email is `gametechguides@gmail.com`.
- Historical reports, plans, and decisions may still use MVP terminology because they document earlier development phases.
