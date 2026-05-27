# Project Map

Keep this file compact. It is the first context file an agent should read.

## Project Shape

- Backend: none in MVP.
- Web frontend: `apps/web/` Next.js App Router app.
- Mobile frontend: none.
- Docs: Markdown docs in `docs/`.
- SDK: none in MVP.
- Content: local MDX articles under `apps/web/content/articles/`.

## Important Entry Points

| Area | Path | Notes |
| --- | --- | --- |
| Project brief | `docs/project-brief.md` | Source of truth for scope |
| Architecture | `docs/architecture.md` | Static content-site architecture |
| Command map | `docs/command-map.md` | Real package and app commands |
| Web app | `apps/web/` | Next.js App Router blog |
| App routes | `apps/web/app/` | Home, article listing, article detail, category pages, tag pages |
| SEO routes | `apps/web/app/robots.ts`, `apps/web/app/sitemap.ts` | Robots and sitemap |
| Trust/policy pages | `apps/web/app/about`, `apps/web/app/contact`, `apps/web/app/privacy-policy`, `apps/web/app/terms`, `apps/web/app/editorial-policy`, `apps/web/app/affiliate-disclosure` | Static launch-readiness pages |
| Layout components | `apps/web/components/layout/` | Header, footer, shell |
| Blog components | `apps/web/components/blog/` | Article cards, metadata, article hero, inline MDX media, highlights, pull quotes, quick takes, read-more sections, verdict blocks, related articles |
| SEO components | `apps/web/components/seo/` | JSON-LD rendering |
| Content helpers | `apps/web/lib/content/` | Frontmatter parsing, validation, draft filtering |
| Taxonomy helpers | `apps/web/lib/content/taxonomy.ts` | Category/tag collections, slug lookup, related article helpers |
| SEO helpers | `apps/web/lib/seo/` | Metadata, URL helpers, structured data |
| Articles | `apps/web/content/articles/` | Local MDX article files |
| Brand assets | `apps/web/public/brand/`, `apps/web/app/icon.png`, `apps/web/app/apple-icon.png`, `apps/web/public/favicon.ico` | Local GameTechGuides logo and browser/app icon assets |
| Image handling guide | `docs/image-handling.md` | Manual Cloudinary workflow and asset rules |
| Image asset checklist | `docs/image-asset-checklist.md` | Manual cover image QA before upload/frontmatter updates |
| Vercel launch checklist | `docs/deployment/vercel-launch-checklist.md` | Pre-launch deployment steps and Vercel settings |
| Domain setup guide | `docs/deployment/domain-setup.md` | Custom domain, DNS, SSL, and Search Console flow |
| Environment variables | `docs/deployment/env-vars.md` | Production and local environment variable rules |
| Article image helpers | `apps/web/lib/content/images.ts` | Renderability checks for Cloudinary and local public images |
| Content strategy | `docs/content-strategy.md` | Audience, pillars, article types |
| SEO checklist | `docs/seo-checklist.md` | Publishing quality gate |
| SEO implementation pattern | `docs/seo-implementation-patterns.md` | Sitemap, robots, canonicals, JSON-LD, trust page rules |
| Approved SEO plan | `docs/features/plans/seo-foundation.plan.md` | Normal-lane implementation plan |
| SEO approval | `docs/features/approvals/seo-foundation.approval.md` | Use this for implementation |
| Approved taxonomy/design plan | `docs/features/plans/taxonomy-design.plan.md` | Category/tag route and polish plan |
| Taxonomy/design approval | `docs/features/approvals/taxonomy-design.approval.md` | Use this for the next implementation |
| Taxonomy/design report | `docs/features/reports/taxonomy-design.implementation.md` | Implementation summary and verification |
| Article image asset plan | `docs/features/plans/article-image-asset-pass.plan.md` | Manual cover image plan for current articles |
| Article image asset report | `docs/features/reports/article-image-asset-pass.implementation.md` | First Cloudinary cover image update report |
| Pre-launch review report | `docs/features/reports/pre-launch-review.md` | Launch blockers, verification, and deployment readiness review |
| Domain SEO branding report | `docs/features/reports/domain-seo-branding-inspection.md` | gametechguides.com SEO/env behavior and GameTechGuides branding inspection |
| Brand assets report | `docs/features/reports/brand-assets-logo-favicon.md` | Local logo/favicon implementation and verification |
| Scan-friendly article components report | `docs/features/reports/article-scan-friendly-components.md` | MDX quick take, read-more, and verdict implementation |
| Article pattern and favicon audit report | `docs/features/reports/article-pattern-and-favicon-audit.md` | Future article pattern docs and favicon compatibility audit |

## Current Architecture Notes

- The MVP static blog scaffold is implemented under `apps/web/`.
- Package manager is `pnpm`.
- The MVP is a static content site with file-based MDX content.
- Backend, database, admin panel, CMS, auth, payments, accounts, and Docker are deferred.
- Site assets stay in the repo.
- Core GameTechGuides brand assets are local repo files, not Cloudinary.
- Stable favicon paths are `/favicon.ico`, `/icon.png`, and `/apple-icon.png`.
- Article/media images use manually uploaded Cloudinary delivery URLs.
- Article cover images for the first three sample articles use Cloudinary delivery URLs.
- The published Total Overdose opinion article also uses a Cloudinary cover image URL.
- Future article images should follow `docs/image-asset-checklist.md`.
- SEO foundation implementation is complete.
- Cloudinary image foundation implementation is complete.
- Taxonomy/design polish is implemented with static category and tag routes.
- Article detail design polish is implemented with a richer hero, cinematic cover image treatment, optional quick-take frontmatter, reusable `ArticleImage`, `ArticleCallout`, `ArticleHighlight`, `ArticlePullQuote`, `ArticleQuickTake`, `ArticleReadMore`, and `ArticleVerdict` MDX components, improved article-body typography, and documented future article patterns.
- Pre-launch deployment documentation is in place.
- Final production domain is `https://gametechguides.com`.
- Launch is blocked until Vercel Production has `NEXT_PUBLIC_SITE_URL=https://gametechguides.com`, the latest Production deployment is live on the domain, Search Console is configured, and the final contact channel is configured.

## Read First For New Features

1. `docs/project-brief.md`
2. `docs/context/project-map.md`
3. `docs/context/decisions.md`
4. `docs/features/mvp-scope.md`
5. Relevant feature doc in `docs/features/`

## Last Updated

- Date: 2026-05-27
- Command: article pattern and favicon audit
- Source artifact: `docs/features/reports/article-pattern-and-favicon-audit.md`
