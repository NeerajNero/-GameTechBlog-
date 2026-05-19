# Command Map

This file records the real commands for the project after the MVP static blog scaffold.

## Current State

- Package manager: `pnpm`.
- Web app scaffold: `apps/web/`.
- Backend/database/Docker commands are not needed for the MVP.

## Root

```bash
pnpm install
pnpm web:dev
pnpm web:lint
pnpm web:typecheck
pnpm web:build
```

## Web

```bash
pnpm --dir apps/web dev
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

## SEO Foundation Verification

After implementing the approved SEO foundation slice:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Smoke check:

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/robots.txt
/sitemap.xml
/about
/contact
/privacy-policy
/terms
/editorial-policy
/affiliate-disclosure
```

## Taxonomy Design Verification

After implementing the approved taxonomy/design slice:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Smoke check:

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/categories
/categories/gaming-guides
/tags
/tags/elden-ring
/sitemap.xml
```

## Content Workflow Commands

These are human or agent workflow steps, not package scripts:

```text
1. Create apps/web/content/articles/<article-slug>.mdx
2. Add required frontmatter from templates/article-frontmatter.md
3. Upload article/media image manually to Cloudinary when a safe image exists
4. Paste the Cloudinary secure URL into coverImage with honest alt text and credit
5. Run local checks
6. Commit changes
7. Push to GitHub
8. Vercel deploys
```

Article image workflow details live in `docs/image-handling.md` and `docs/image-asset-checklist.md`. Site-level assets can still live in the repo under `apps/web/public/`.

## Pre-Launch Verification

Run before each deployment candidate:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

Smoke check:

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/categories
/categories/gaming-guides
/tags
/tags/elden-ring
/about
/contact
/privacy-policy
/sitemap.xml
/robots.txt
```

## Feature Flow

Use the starter-pack agentic workflow, but apply it to static site features.

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

## Not Applicable In MVP

Do not add commands for:

- Docker
- Postgres
- Redis
- Prisma
- NestJS
- OpenAPI generation
- SDK generation
- Mobile app builds
