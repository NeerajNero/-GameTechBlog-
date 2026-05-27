# Command Map

This file records the real commands for the live GameTechGuides content site.

## Current State

- Package manager: `pnpm`.
- Web app scaffold: `apps/web/`.
- Backend/database/Docker commands are not needed for the current production site.

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

## SEO Verification

After SEO-facing changes:

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

## Taxonomy Verification

After taxonomy or listing changes:

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
3. Draft with the scan-friendly pattern: intro, ArticleQuickTake, visible main value, ArticleImage, optional ArticleReadMore, and ArticleVerdict where relevant
4. Upload article/media image manually to Cloudinary when a safe image exists
5. Paste the Cloudinary secure URL into coverImage or ArticleImage with honest alt text, caption, and credit
6. Run local checks
7. Commit changes
8. Push to GitHub
9. Vercel deploys
```

Article image workflow details live in `docs/image-handling.md` and `docs/image-asset-checklist.md`. Site-level assets can still live in the repo under `apps/web/public/`.

## Production Verification

Run before each production deployment candidate:

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

## Not Applicable Currently

Do not add commands for:

- Docker
- Postgres
- Redis
- Prisma
- NestJS
- OpenAPI generation
- SDK generation
- Mobile app builds
