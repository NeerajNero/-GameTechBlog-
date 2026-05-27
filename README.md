# GameTechGuides

GameTechGuides is a live production content site at
`https://gametechguides.com`.

The repo started from a reusable agentic starter pack. The workflow docs,
commands, agents, skills, and templates are still useful, but this project now
has a specific production content-site shape:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX-based articles
- Local content files in `apps/web/content/articles/`
- Vercel deployment on the custom domain

## Production Boundary

This is a production content site, not a full-stack SaaS/product app.

Do not add these unless a future task explicitly changes the product scope:

- Backend
- Database
- Prisma
- NestJS
- Docker setup
- Auth
- Admin panel
- CMS
- Payments
- User accounts

## Read First

1. [docs/project-brief.md](docs/project-brief.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/context/project-map.md](docs/context/project-map.md)
4. [docs/content-strategy.md](docs/content-strategy.md)
5. [docs/seo-checklist.md](docs/seo-checklist.md)
6. [docs/command-map.md](docs/command-map.md)

## Publishing Model

Articles live as `.mdx` files in:

```text
apps/web/content/articles/
```

Publishing flow:

```text
create MDX file -> add frontmatter -> use scan-friendly article components -> upload article image to Cloudinary if available -> paste image URL -> verify -> commit -> push -> Vercel deploys
```

Deployment flow:

```text
local development -> GitHub -> Vercel -> https://gametechguides.com -> Search Console
```

## Starter-Pack Workflow

The command-gated workflow is preserved:

```text
/classify -> /plan -> /approve -> /implement -> /verify -> /test -> /review -> /finalize -> /context-update
```

For current production content-site work:

- Use `/api-integrate` only if a future backend/API exists.
- Use frontend/content/SEO docs before backend docs.
- Treat backend, database, SDK, mobile, Docker, and observability docs as deferred reference material.

## Current Status

The production site is live at `https://gametechguides.com` with published
articles, sitemap/robots, Search Console setup, Cloudinary article images,
favicon/logo assets, and scan-friendly article components.

Ongoing work is production content growth, editorial polish, and routine SEO
maintenance. Ads, analytics, affiliate links, backend, database, auth, CMS,
Docker, and RSS remain deferred unless explicitly implemented later.

## Local Development

```bash
pnpm install
pnpm --dir apps/web dev
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```
