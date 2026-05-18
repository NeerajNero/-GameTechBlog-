# Gaming + Tech Blog Website

This repository is being initialized as a content-first gaming and tech blog.

The repo started from a reusable agentic starter pack. The workflow docs, commands, agents, skills, and templates are still useful, but this project has a specific MVP shape:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX-based articles
- Local content files in `content/articles/`
- Vercel deployment later

## MVP Boundary

This is not a full-stack SaaS/product app in the MVP.

Do not add:

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
4. [docs/features/mvp-scope.md](docs/features/mvp-scope.md)
5. [docs/content-strategy.md](docs/content-strategy.md)
6. [docs/seo-checklist.md](docs/seo-checklist.md)
7. [docs/command-map.md](docs/command-map.md)

## Publishing Model

Articles live as `.mdx` files in:

```text
content/articles/
```

Publishing flow:

```text
create MDX file -> add frontmatter -> add image -> commit -> push -> Vercel deploys
```

Deployment flow:

```text
local development -> GitHub -> Vercel -> custom domain -> Search Console -> AdSense later
```

## Starter-Pack Workflow

The command-gated workflow is preserved:

```text
/classify -> /plan -> /approve -> /implement -> /verify -> /test -> /review -> /finalize -> /context-update
```

For this MVP:

- Use `/api-integrate` only if a future backend/API exists.
- Use frontend/content/SEO docs before backend docs.
- Treat backend, database, SDK, mobile, Docker, and observability docs as deferred reference material.

## Current Status

This is documentation/workflow setup only. The Next.js app has not been scaffolded and no packages have been installed.
