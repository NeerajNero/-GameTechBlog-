# Feature Approval

## Approval

- Feature slug: `mvp-static-blog`
- Plan: `docs/features/plans/mvp-static-blog.plan.md`
- Classification: `docs/features/classifications/mvp-static-blog.classification.md`
- Approved at: 2026-05-19
- Approved by: User
- Status: approved

## Explicitly Approved Decisions

- Package manager: `pnpm`
- Scaffold location: `apps/web/`
- MVP surface: frontend-only static blog
- Article storage: local MDX files under `apps/web/content/articles/`
- Backend/database: no backend and no database in MVP
- Sample content: create 3 practical gaming/tech articles
- SEO: implement basic site, listing, and article metadata
- Verification commands:
  - `pnpm install`
  - `pnpm --dir apps/web lint`
  - `pnpm --dir apps/web build`

## Approved Scope

Implement:

- Next.js App Router setup.
- TypeScript.
- Tailwind CSS.
- Basic responsive layout.
- Homepage at `/`.
- Article listing page at `/articles`.
- Article detail page at `/articles/[slug]`.
- MDX rendering.
- Frontmatter parsing.
- Category and tag display.
- Published/updated date display.
- Reusable header/footer/layout components.
- Three sample articles:
  - Elden Ring beginner tips for first-time Souls players.
  - Best router setup for PS Remote Play and Steam Link.
  - Best SSD setup for large gaming libraries.

## Explicit Non-Goals

Do not add:

- Backend.
- Database.
- Prisma.
- NestJS.
- Docker.
- Auth.
- CMS.
- Admin panel.
- Payments.
- User accounts.
- Analytics.
- Ad scripts.
- Affiliate links.

## Implementation Command

```text
/implement docs/features/approvals/mvp-static-blog.approval.md
```

## Conditions

- Keep root starter-pack docs, agents, skills, commands, templates, and workflow files in place.
- Keep implementation scoped to `apps/web/` plus necessary workflow docs.
- Document actual scripts and verification results after implementation.
