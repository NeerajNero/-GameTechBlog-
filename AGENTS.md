# Agent Index

This repo is the GameTechGuides production content site (live at https://gametechguides.com): Next.js App Router + Tailwind + local MDX articles under `apps/web/`. There is no backend, database, Docker, SDK, or mobile target — see README "Project Boundaries". Start with [START_HERE.md](START_HERE.md) and [FLOW_README.md](FLOW_README.md).

## Wired for Claude Code (`claude-setup/`)

These are the live, invocable definitions (copy or symlink `claude-setup/` into `.claude/` to activate):

- Subagents (`claude-setup/agents/`): `content-frontend` for site UI/SEO/layout work, `site-reviewer` for correctness + policy review, `article-writer` for MDX article drafting and expansion.
- Skills (`claude-setup/skills/`): `publish-article` for the end-to-end article workflow (frontmatter, structure, internal links, images, verification), `adsense-compliance` for monetization/policy tasks.
- Slash commands (`claude-setup/commands/`): `/classify`, `/plan`, `/approve`, `/implement`, `/verify`, `/test`, `/review`, `/finalize`, `/context-update`, and support commands — thin wrappers around the full specs in `commands/`.

The generic starter-pack role prompts (`agents/`) and skills (`skills/` — NestJS, Prisma, Docker, BullMQ, Expo, SDK) were removed on 2026-08-30 along with `/api-integrate` and `AGENTIC_FLOW.md`; this is a static content site and they never applied. Recover from git history if backend scope ever returns.

## Key facts agents keep rediscovering

- Verify with: `pnpm --dir apps/web lint && pnpm --dir apps/web typecheck && pnpm --dir apps/web build`.
- Run commands from the exactly-cased repo path `.../gameTechBlog` — a lowercase cwd makes `next build` fail with `PageNotFoundError: Cannot find module for page: /_document`.
- Production indexing requires `VERCEL_ENV=production` + `NEXT_PUBLIC_SITE_URL` (see `apps/web/lib/seo/urls.ts`).
- AdSense is env-gated via `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (`apps/web/lib/site/adsense.ts`, `/ads.txt` route); GA4 analytics via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`apps/web/lib/site/analytics.ts`). Neither loads any code until set.
- Article frontmatter is validated at build time by `apps/web/lib/content/validation.ts`; slug must match filename.
- Article pages auto-render a table of contents from H2/H3s (`apps/web/lib/content/toc.ts` + heading ids in `components/blog/mdx-content.tsx`) and an author bio box (`components/blog/author-bio.tsx`, config in `lib/site/config.ts`).
- Every article needs 2–3 contextual in-body internal links plus back-links from older articles — see `claude-setup/skills/publish-article/SKILL.md`.
- RSS feed at `/feed.xml` (`apps/web/app/feed.xml/route.ts`) includes all published articles automatically.
- Monetization, deployment, and third-party-script changes are always the "risky" lane in [docs/flow-policy.md](docs/flow-policy.md).
