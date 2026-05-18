# Flow README

This file adapts the starter-pack workflow for the Gaming + Tech Blog Website.

## Project Override

The original starter pack supports backend, web, mobile, Docker, Prisma, OpenAPI, and generated SDK workflows. For this MVP, only the static content-site lane applies.

MVP stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX files under `content/articles/`
- Vercel later

Deferred:

- Backend
- Database
- Prisma
- NestJS
- Docker
- Auth
- Admin panel
- CMS
- Payments
- User accounts
- Generated SDK
- Mobile app

## Quick Start

For this project:

```text
1. Read docs/project-brief.md.
2. Read docs/architecture.md.
3. Read docs/features/mvp-scope.md.
4. Read docs/content-strategy.md and docs/seo-checklist.md.
5. Use docs/features/user-stories.md for feature planning.
6. Scaffold the Next.js content site only when the user explicitly starts that task.
```

## The Three Lanes

### Tiny Change

Use for low-risk docs/content edits:

- Docs updates.
- Template updates.
- Article copy edits.
- Frontmatter corrections.
- Isolated style fixes after the app exists.

Flow:

```text
/classify <task-file>
/implement <classified-task-or-description>
/verify docs/features/reports/<feature>.implementation.md
```

### Normal Feature

Use for static site product work:

- New page.
- New article rendering component.
- MDX content helper.
- SEO metadata foundation.
- Category/tag pages.
- Policy pages.
- Article workflow automation.

Flow:

```text
/classify docs/features/user-stories.md
/plan docs/features/user-stories.md
/approve docs/features/plans/<feature>.plan.md
/implement docs/features/approvals/<feature>.approval.md
/verify docs/features/reports/<feature>.implementation.md
/test docs/features/reports/<feature>.implementation.md
/review docs/features/reports/<feature>.implementation.md
/finalize docs/features/reports/<feature>.implementation.md
/context-update docs/features/final/<feature>.final.md
```

Skip `/api-integrate` for MVP static-site work.

### Risky Feature

Use for higher-impact changes:

- Deployment configuration.
- Analytics or third-party scripts.
- AdSense integration.
- Affiliate link automation.
- Major content-routing changes.
- Any future backend, database, auth, CMS, or payment introduction.

Risky features require explicit planning and approval before implementation.

## Artifact Map

Project-specific context:

```text
docs/project-brief.md
docs/architecture.md
docs/command-map.md
docs/design-system.md
docs/content-strategy.md
docs/seo-checklist.md
docs/monetization-plan.md
docs/context/project-map.md
docs/context/decisions.md
docs/context/current-status.md
docs/features/user-stories.md
docs/features/mvp-scope.md
docs/features/content-workflow.md
docs/features/seo-foundation.md
docs/features/monetization-readiness.md
docs/content-site-patterns.md
docs/seo-content-patterns.md
docs/ads-affiliate-patterns.md
docs/social-distribution-plan.md
```

Templates:

```text
templates/article-brief.md
templates/article-seo-checklist.md
templates/content-calendar.md
templates/article-frontmatter.md
templates/social-snippets.md
```

## Article Workflow

```text
idea -> article brief -> MDX draft -> SEO check -> image check -> commit -> push -> Vercel deploys
```

## Agent Selection

- Frontend Agent: Next.js pages, components, MDX rendering, styling, SEO metadata.
- Review Agent: SEO correctness, route behavior, content workflow, accessibility, monetization readiness.
- Fullstack Agent: Avoid for MVP unless a future task intentionally crosses into backend territory.
- Backend Agent: Deferred.
- Infra Agent: Use later for Vercel/domain/Search Console flow, not Docker.

## Verification

Before static-site feature work is complete:

- Typecheck/build once app commands exist.
- Check published/draft article behavior.
- Check page metadata.
- Check sitemap/robots when touched.
- Check mobile and desktop layout for article readability.
- Record any gaps.
