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

(`/api-integrate` was removed — this site has no API/SDK layer.)

### Risky Feature

Use for higher-impact changes:

- Deployment configuration.
- Analytics or third-party scripts.
- AdSense integration. (Env-gated wiring landed 2026-08-18; activation and any
  placement work remain risky-lane tasks — see the `adsense-compliance` skill.)
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

## Claude Code Wiring

The invocable definitions live under `claude-setup/` (copy or symlink into
`.claude/` to activate; root `commands/` holds the full command specs):

- `claude-setup/agents/`: `content-frontend`, `site-reviewer`, `article-writer`.
- `claude-setup/skills/`: `publish-article`, `adsense-compliance`.
- `claude-setup/commands/`: wrappers for `/classify`, `/plan`, `/approve`,
  `/implement`, `/verify`, `/test`, `/review`, `/finalize`, `/context-update`,
  `/revise-plan`, `/status`, `/select`, `/block`, `/context-status` — each
  defers to its full spec in `commands/`.

## Agent Selection

- `content-frontend` (wired): Next.js pages, components, MDX rendering, styling, SEO metadata, sitemap/robots/feed.
- `site-reviewer` (wired): SEO correctness, route behavior, content workflow, accessibility, monetization/AdSense policy readiness.
- `article-writer` (wired): drafting and expanding MDX articles.

The generic starter-pack role prompts (backend, infra, fullstack) and their
skills were removed on 2026-08-30 — this repo is a static content site. Recover
them from git history if backend scope ever returns.

## Verification

Before static-site feature work is complete:

- Typecheck/build once app commands exist.
- Check published/draft article behavior.
- Check page metadata.
- Check sitemap/robots when touched.
- Check mobile and desktop layout for article readability.
- Record any gaps.
