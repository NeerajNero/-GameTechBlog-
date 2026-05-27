# Project Brief

## Product

- Name: GameTechGuides
- One-sentence purpose: Operate a production gaming and tech content site for long-term SEO traffic, social distribution, future monetization readiness, and personal brand growth.
- Primary users: Indian gamers, PC builders, console players, game streamers, and buyers researching practical gaming hardware.
- Admin users: None in the current production site. Publishing is done by editing MDX files in the repository.

## Product Boundary

GameTechGuides is not currently a full-stack SaaS or product application.

Do not add unless a future task explicitly changes the product scope:

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

Deferred does not mean never. These can be revisited after the blog proves a content and traffic loop.

## Scope

- Current production scope:
  - Local MDX articles under `apps/web/content/articles/`.
  - Frontmatter-driven article metadata.
  - Content-first homepage and category pages.
  - SEO-friendly routes, metadata, sitemap, robots, and structured data.
  - Practical design system for a gaming + tech editorial site.
  - Social sharing and article snippet workflow.
  - Affiliate and AdSense-ready content patterns without forcing monetization too early.
  - Scan-friendly article components for quick takes, highlights, screenshots, expandable details, and verdict blocks.
- Explicit non-goals:
  - No backend API.
  - No database.
  - No CMS/admin UI.
  - No user login or comments.
  - No ecommerce checkout.
  - No paid membership.

## Feature Workflow

- Default flow policy: classify first when scope is unclear.
- User-story file: `docs/features/user-stories.md`
- Feature index: create later if multiple feature plans are active.
- Classification directory: `docs/features/classifications/`
- Plan directory: `docs/features/plans/`
- Approval directory: `docs/features/approvals/`
- Implementation report directory: `docs/features/reports/`
- Block directory: `docs/features/blocks/`
- Final directory: `docs/features/final/`
- Current feature pointer: `docs/features/current.md` when needed.
- Context directory: `docs/context/`
- Tiny change lane allowed: yes, for docs, copy, metadata, or isolated styling.
- Context update required after finalize: yes for normal/risky changes.
- Required approval before implementation: yes for normal/risky changes.

## Project Shape

- Backend required: no
- Frontend required: yes
- Frontend target: web
- If web: Next.js App Router required.
- If mobile: not applicable.
- Shared package strategy: none for the current production site.
- Content source: local `.mdx` files committed to the repository.

## Stack

- Package manager: pnpm.
- Monorepo tool: pnpm workspace.
- Backend: none in the current production site.
- Web frontend: Next.js App Router, React, TypeScript, Tailwind CSS, MDX.
- UI system: Tailwind first; shadcn/ui later when component needs are clear.
- Mobile frontend: none.
- Database: none.
- Cache/queue: none.
- Docs: Markdown files in `docs/`.
- Deployment target: Vercel.

## Content Model

Initial content entities are file-based, not database-backed.

| Entity | Purpose | Important Fields | Relationships |
| --- | --- | --- | --- |
| Article | Long-form SEO and social content | title, slug, description, category, tags, author, publishedAt, updatedAt, coverImage, featured, draft, seoTitle, seoDescription | Belongs to one category and many tags |
| Category | Topic grouping for navigation and SEO | name, slug, description | Has many articles |
| Tag | Specific topic labels | name, slug | Has many articles |
| Author | Personal brand identity | name, bio, avatar, social links | Writes many articles |
| Asset | Cover images and inline media | path, alt text, caption, source | Used by articles |

## Article Location

Articles live in:

```text
apps/web/content/articles/
```

Each article is a `.mdx` file with frontmatter. Example fields:

```yaml
---
title: "Best SSD Upgrades for PC Gaming in India"
slug: "best-ssd-upgrades-pc-gaming-india"
description: "A practical guide to choosing SSDs for faster game loading and smoother PC gaming."
category: "Gaming Hardware"
tags:
  - PC gaming
  - SSD
  - Indian gamers
author: "Neeraj Kumar Sharma"
publishedAt: "2026-05-19"
updatedAt: "2026-05-19"
coverImage: "https://res.cloudinary.com/<cloud-name>/image/upload/.../cover.webp"
coverImageAlt: "An SSD setup for managing a large gaming library"
coverImageCredit: "Photo by site owner"
featured: true
draft: false
seoTitle: "Best SSD Upgrades for PC Gaming in India"
seoDescription: "Compare practical SSD upgrade options for Indian PC gamers, including load times, capacity, thermals, and value."
---
```

## Publishing Flow

```text
create MDX file -> add frontmatter -> use scan-friendly article structure -> upload safe image to Cloudinary if available -> paste image URL -> verify -> commit -> push -> Vercel deploys
```

## Deployment Flow

```text
local development -> GitHub -> Vercel -> https://gametechguides.com -> Search Console
```

## Auth And Roles

| Role | Permissions |
| --- | --- |
| Repository owner | Create and edit docs, article files, assets, and app code |
| Reader | Browse public articles after deployment |

No runtime auth or roles are required for the current production site.

## External Services

| Service | When Used | Notes |
| --- | --- | --- |
| GitHub | Source control and deployment trigger | Set up when repo is initialized |
| Vercel | Hosting and previews | Production site is hosted at `https://gametechguides.com` |
| Google Search Console | Indexing and search health | Configured for the production domain |
| Google Analytics or privacy-friendly analytics | Traffic analysis | Deferred; decide after content growth needs it |
| Google AdSense | Display ads | Apply after enough original content and policy pages exist |
| Affiliate networks | Product monetization | Add disclosures before affiliate links go live |

## Assumptions

- The first build optimizes for publishing speed, SEO hygiene, and maintainable content files.
- Article content is authored by the repo owner or collaborators through Git.
- Indian gamer use cases are a differentiator, especially pricing, availability, heat, dust, power, router quality, and laptop cooling.
- shadcn/ui should be added only when the app scaffold exists and component choices are clearer.

## Deferred Decisions

- Analytics provider.
- Affiliate programs and disclosure wording.
- Whether to add a lightweight CMS later.
