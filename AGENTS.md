# Agent Index

This repo is the GameTechGuides production content site (live at https://gametechguides.com): Next.js App Router + Tailwind + local MDX articles under `apps/web/`. There is no backend, database, Docker, SDK, or mobile target — see README "Project Boundaries". Start with [START_HERE.md](START_HERE.md) and [FLOW_README.md](FLOW_README.md).

## Wired for Claude Code (`.claude/`)

These are the live, invocable definitions:

- Subagents (`.claude/agents/`): `content-frontend` for site UI/SEO/layout work, `site-reviewer` for correctness + policy review, `article-writer` for MDX article drafting and expansion.
- Skills (`.claude/skills/`): `publish-article` for the end-to-end article workflow, `adsense-compliance` for monetization/policy tasks.
- Slash commands (`.claude/commands/`): `/classify`, `/plan`, `/approve`, `/implement`, `/verify`, `/test`, `/review`, `/finalize`, `/context-update`, and support commands — thin wrappers around the full specs in `commands/`.

## Reference prompts (root `agents/`)

The original starter-pack role prompts remain as reference documentation:

- [agents/frontend-agent.md](agents/frontend-agent.md) — generic web/mobile frontend prompt; the wired `content-frontend` subagent is the content-site adaptation.
- [agents/review-agent.md](agents/review-agent.md) — generic review prompt; the wired `site-reviewer` subagent is the adaptation.
- [agents/fullstack-agent.md](agents/fullstack-agent.md), [agents/backend-agent.md](agents/backend-agent.md), [agents/infra-agent.md](agents/infra-agent.md) — deferred; only relevant if a future task explicitly reintroduces backend/infra scope. The same applies to the starter-pack skills in `skills/` (NestJS, Prisma, Docker, BullMQ, Expo, SDK).

## Key facts agents keep rediscovering

- Verify with: `pnpm --dir apps/web lint && pnpm --dir apps/web typecheck && pnpm --dir apps/web build`.
- Production indexing requires `VERCEL_ENV=production` + `NEXT_PUBLIC_SITE_URL` (see `apps/web/lib/seo/urls.ts`).
- AdSense is env-gated via `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (`apps/web/lib/site/adsense.ts`, `/ads.txt` route); no ad code loads until it is set.
- Article frontmatter is validated at build time by `apps/web/lib/content/validation.ts`; slug must match filename.
- Monetization, deployment, and third-party-script changes are always the "risky" lane in [docs/flow-policy.md](docs/flow-policy.md).
