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
| App routes | `apps/web/app/` | Home, article listing, article detail |
| Layout components | `apps/web/components/layout/` | Header, footer, shell |
| Blog components | `apps/web/components/blog/` | Article cards, metadata, MDX rendering |
| Content helpers | `apps/web/lib/content/` | Frontmatter parsing, validation, draft filtering |
| SEO helpers | `apps/web/lib/seo/` | Page and article metadata |
| Articles | `apps/web/content/articles/` | Local MDX article files |
| Article images | `apps/web/public/images/articles/` | Future cover image assets |
| Content strategy | `docs/content-strategy.md` | Audience, pillars, article types |
| SEO checklist | `docs/seo-checklist.md` | Publishing quality gate |

## Current Architecture Notes

- The MVP static blog scaffold is implemented under `apps/web/`.
- Package manager is `pnpm`.
- The MVP is a static content site with file-based MDX content.
- Backend, database, admin panel, CMS, auth, payments, accounts, and Docker are deferred.
- Article cover images are placeholders in the first slice.

## Read First For New Features

1. `docs/project-brief.md`
2. `docs/context/project-map.md`
3. `docs/context/decisions.md`
4. `docs/features/mvp-scope.md`
5. Relevant feature doc in `docs/features/`

## Last Updated

- Date: 2026-05-19
- Command: `/implement docs/features/approvals/mvp-static-blog.approval.md`
- Source artifact: `docs/features/approvals/mvp-static-blog.approval.md`
