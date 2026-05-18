# Feature Implementation Report

## Feature

- Feature slug: `mvp-static-blog`
- Approval: `docs/features/approvals/mvp-static-blog.approval.md`
- Plan: `docs/features/plans/mvp-static-blog.plan.md`
- Implemented at: 2026-05-19
- Status: implemented

## Summary

Implemented the frontend-only MVP static blog vertical slice under `apps/web/`.

Included:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Local MDX article storage.
- Frontmatter parsing and validation.
- Homepage.
- Article listing page.
- Article detail page.
- Three sample articles.
- Basic SEO metadata.
- Reusable header, footer, layout, and blog components.

## Packages Installed

Runtime:

- `next`
- `react`
- `react-dom`
- `gray-matter`
- `next-mdx-remote`
- `reading-time`

Development:

- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `eslint`
- `eslint-config-next`

## Verification

Commands run:

```bash
pnpm install
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:3000/articles
curl -I http://127.0.0.1:3000/articles/elden-ring-beginner-tips-first-time-souls-players
```

Results:

- `pnpm install`: passed.
- `pnpm --dir apps/web lint`: passed with no warnings or errors.
- `pnpm --dir apps/web typecheck`: passed.
- `pnpm --dir apps/web build`: passed.
- `pnpm --dir apps/web dev --hostname 127.0.0.1`: running at `http://127.0.0.1:3000`.
- Route smoke checks for `/`, `/articles`, and the Elden Ring article returned `200 OK`.

Build output included static routes:

- `/`
- `/_not-found`
- `/articles`
- `/articles/best-router-setup-ps-remote-play-steam-link`
- `/articles/best-ssd-setup-large-gaming-libraries`
- `/articles/elden-ring-beginner-tips-first-time-souls-players`

## Deviations

- The suggested structure named `next.config.ts`; this implementation uses `next.config.mjs` for compatibility with the pinned Next.js version.
- Real cover image files were not added. The UI renders a CSS placeholder and leaves `apps/web/public/images/articles/README.md` for the later asset pass.
- Category and tag pages remain deferred.

## Non-Goals Confirmed

No backend, database, Prisma, NestJS, Docker, auth, CMS, admin panel, payments, user accounts, analytics, ad scripts, or affiliate links were added.
