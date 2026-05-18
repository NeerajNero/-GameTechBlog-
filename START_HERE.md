# Start Here

Use this file as the starting point for this specific repository.

## Project Shape

- Project: Gaming + Tech Blog Website
- MVP type: content-first static web blog
- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Content: local MDX files in `content/articles/`
- Deployment: Vercel later
- Backend: deferred
- Database: deferred
- Admin/CMS/auth/payments/user accounts: deferred

## First Rule

Do not follow the starter pack's full-stack bootstrap path for this MVP. Do not scaffold Docker, Prisma, NestJS, generated SDKs, auth, admin panels, or database infrastructure.

## Phase 0: Read Project Context

Read these before changing code:

1. [docs/project-brief.md](docs/project-brief.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/context/project-map.md](docs/context/project-map.md)
4. [docs/context/decisions.md](docs/context/decisions.md)
5. [docs/features/mvp-scope.md](docs/features/mvp-scope.md)

## Phase 1: Content And SEO Planning

Use:

- [docs/content-strategy.md](docs/content-strategy.md)
- [docs/content-site-patterns.md](docs/content-site-patterns.md)
- [docs/seo-content-patterns.md](docs/seo-content-patterns.md)
- [docs/seo-checklist.md](docs/seo-checklist.md)
- [docs/ads-affiliate-patterns.md](docs/ads-affiliate-patterns.md)
- [docs/social-distribution-plan.md](docs/social-distribution-plan.md)

## Phase 2: App Scaffold Later

The next implementation task should scaffold:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX article support
- Content helpers for `content/articles/`
- Homepage, article index, article page, category page, and tag page foundations

Do not install packages or scaffold the app until that task is explicitly started.

## Phase 3: Article Workflow

New articles follow:

```text
create MDX file -> add frontmatter -> add image -> commit -> push -> Vercel deploys
```

Use templates:

- [templates/article-brief.md](templates/article-brief.md)
- [templates/article-frontmatter.md](templates/article-frontmatter.md)
- [templates/article-seo-checklist.md](templates/article-seo-checklist.md)
- [templates/content-calendar.md](templates/content-calendar.md)
- [templates/social-snippets.md](templates/social-snippets.md)

## Feature Commands

Use the preserved starter-pack command workflow, scoped to static site work:

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

Skip `/api-integrate` unless a future backend/API is introduced.
