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
| Blog components | `apps/web/components/blog/` | Article cards, metadata, MDX rendering |
| SEO components | `apps/web/components/seo/` | JSON-LD rendering |
| Content helpers | `apps/web/lib/content/` | Frontmatter parsing, validation, draft filtering |
| Taxonomy helpers | `apps/web/lib/content/taxonomy.ts` | Category/tag collections, slug lookup, related article helpers |
| SEO helpers | `apps/web/lib/seo/` | Metadata, URL helpers, structured data |
| Articles | `apps/web/content/articles/` | Local MDX article files |
| Image handling guide | `docs/image-handling.md` | Manual Cloudinary workflow and asset rules |
| Article image helpers | `apps/web/lib/content/images.ts` | Renderability checks for Cloudinary and local public images |
| Content strategy | `docs/content-strategy.md` | Audience, pillars, article types |
| SEO checklist | `docs/seo-checklist.md` | Publishing quality gate |
| SEO implementation pattern | `docs/seo-implementation-patterns.md` | Sitemap, robots, canonicals, JSON-LD, trust page rules |
| Approved SEO plan | `docs/features/plans/seo-foundation.plan.md` | Normal-lane implementation plan |
| SEO approval | `docs/features/approvals/seo-foundation.approval.md` | Use this for implementation |
| Approved taxonomy/design plan | `docs/features/plans/taxonomy-design.plan.md` | Category/tag route and polish plan |
| Taxonomy/design approval | `docs/features/approvals/taxonomy-design.approval.md` | Use this for the next implementation |
| Taxonomy/design report | `docs/features/reports/taxonomy-design.implementation.md` | Implementation summary and verification |

## Current Architecture Notes

- The MVP static blog scaffold is implemented under `apps/web/`.
- Package manager is `pnpm`.
- The MVP is a static content site with file-based MDX content.
- Backend, database, admin panel, CMS, auth, payments, accounts, and Docker are deferred.
- Site assets stay in the repo.
- Article/media images use manually uploaded Cloudinary delivery URLs.
- Article cover images are intentionally empty until the real asset pass.
- SEO foundation implementation is complete.
- Cloudinary image foundation implementation is complete.
- Taxonomy/design polish is implemented with static category and tag routes.

## Read First For New Features

1. `docs/project-brief.md`
2. `docs/context/project-map.md`
3. `docs/context/decisions.md`
4. `docs/features/mvp-scope.md`
5. Relevant feature doc in `docs/features/`

## Last Updated

- Date: 2026-05-19
- Command: `/implement docs/features/approvals/taxonomy-design.approval.md`
- Source artifact: `docs/features/reports/taxonomy-design.implementation.md`
