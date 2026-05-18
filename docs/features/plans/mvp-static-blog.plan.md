# Feature Plan

## Status

- Status: implemented
- Feature slug: `mvp-static-blog`
- Source stories: `US-001`, `US-002`, `US-003`, `US-004`, `US-005`
- Classification: `docs/features/classifications/mvp-static-blog.classification.md`
- Lane: normal
- Created: 2026-05-19
- Last updated: 2026-05-19

## Summary

- User-visible outcome: A working content-first Next.js blog MVP with a basic layout, homepage, article listing, article detail pages, MDX article loading, 3 sample gaming/tech articles, and basic SEO metadata.
- Business value: Establishes the first publishable blog foundation for SEO traffic, social traffic, future AdSense readiness, affiliate content, and personal brand growth.
- Surfaces: web, content, SEO, docs.

## Scope

In scope:

- Next.js App Router setup.
- TypeScript setup.
- Tailwind CSS setup.
- Basic responsive editorial layout.
- Homepage at `/`.
- Blog listing page at `/articles`.
- Article detail page at `/articles/[slug]`.
- Local MDX article loading from `content/articles/`.
- 3 sample `.mdx` articles with frontmatter.
- Basic article cards, article header, tag/category display, and article body styling.
- Basic SEO metadata for site, homepage, listing page, and article pages.
- Draft filtering in content helpers.
- Build/lint/typecheck commands documented in `docs/command-map.md` after scripts exist.

Out of scope:

- Backend.
- Database.
- Prisma.
- NestJS.
- Docker.
- Auth.
- Admin panel.
- CMS.
- Payments.
- User accounts.
- Comments.
- Runtime article editor.
- Category and tag route pages, unless they are trivial and do not expand the scope.
- Sitemap, robots, RSS, structured data, analytics, AdSense, affiliate integrations.
- shadcn/ui setup.

## Current System Notes

- Existing modules/files:
  - `docs/project-brief.md` defines the content-first MVP boundary.
  - `docs/architecture.md` defines the planned static blog architecture.
  - `docs/features/mvp-scope.md` defines in-scope and out-of-scope MVP items.
  - `docs/content-site-patterns.md` defines page/content helper patterns.
  - `docs/seo-content-patterns.md` defines article SEO patterns.
  - `templates/article-frontmatter.md` defines the current frontmatter contract.
- Existing patterns to follow:
  - Keep content loading in `lib/content/`, not inside pages.
  - Keep article files in `content/articles/`.
  - Exclude `draft: true` articles from production lists and route generation.
  - Use Tailwind first; do not add shadcn/ui in this slice.
  - Use the static content-site lane; skip `/api-integrate`.
- Constraints:
  - Do not install packages until this plan is approved.
  - Do not write implementation code during planning.
  - This workspace is currently not a Git repository.
  - Package manager is not selected yet.

## Package Dependencies Needed

Package manager: `pnpm`.

Core dependencies:

| Package | Purpose |
| --- | --- |
| `next` | App Router framework |
| `react` | React runtime |
| `react-dom` | React DOM runtime |

Development dependencies:

| Package | Purpose |
| --- | --- |
| `typescript` | Type checking |
| `@types/node` | Node types for file-system content helpers |
| `@types/react` | React types |
| `@types/react-dom` | React DOM types |
| `tailwindcss` | Styling |
| `postcss` | Tailwind processing |
| `autoprefixer` | CSS vendor prefixing |
| `eslint` | Linting |
| `eslint-config-next` | Next.js lint rules |

MDX/content dependencies, recommended:

| Package | Purpose |
| --- | --- |
| `@next/mdx` | Next-supported MDX integration if rendering MDX as pages/components |
| `gray-matter` | Frontmatter parsing |
| `next-mdx-remote` | Render local MDX content through App Router-friendly remote serialization/rendering |
| `reading-time` | Reading-time metadata for article cards/detail pages |

Alternative MDX path:

- Use `contentlayer` only if the owner prefers a generated content layer. For this MVP, avoid it because project maintenance and compatibility can be heavier than needed for three sample articles.

Do not add:

- Prisma, database clients, NestJS, Docker packages, auth libraries, CMS SDKs, payment SDKs, analytics, AdSense scripts, affiliate SDKs, or shadcn/ui.

## Routing Structure

Recommended route structure for this slice:

```text
app/
  layout.tsx
  globals.css
  page.tsx
  articles/
    page.tsx
    [slug]/
      page.tsx
  not-found.tsx
```

Route behavior:

| Route | Purpose | Data Source |
| --- | --- | --- |
| `/` | Homepage with featured article and recent articles | `getPublishedArticles()` |
| `/articles` | Blog listing page with all published articles | `getPublishedArticles()` |
| `/articles/[slug]` | Article detail page | `getArticleBySlug(slug)` |
| `not-found` | Missing article fallback | Next.js not-found handling |

Deferred routes:

- `/category/[slug]`
- `/tags/[slug]`
- `/about`
- `/contact`
- `/privacy-policy`
- `/affiliate-disclosure`

Those are important for the broader MVP, but this first vertical slice should stay focused on home, listing, detail, MDX, and metadata.

## Content Folder Structure

Create during implementation:

```text
content/
  articles/
    best-ssd-upgrades-pc-gaming-india.mdx
    gaming-laptop-cooling-indian-summers.mdx
    best-routers-game-streaming-low-ping-india.mdx

public/
  images/
    articles/
      README.md
```

Image note:

- To avoid binary/image sourcing during the scaffold, use frontmatter `coverImage` paths that point to future image locations, but render a CSS fallback/placeholder when the file is absent.
- Add real images in a later content/assets task.

## Article Frontmatter Format

Use this contract for every `.mdx` file:

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
coverImage: "/images/articles/best-ssd-upgrades-pc-gaming-india.jpg"
featured: true
draft: false
seoTitle: "Best SSD Upgrades for PC Gaming in India"
seoDescription: "Compare practical SSD upgrade options for Indian PC gamers, including load times, capacity, thermals, and value."
---
```

Implementation should define a TypeScript `ArticleFrontmatter` type with:

```text
title: string
slug: string
description: string
category: string
tags: string[]
author: string
publishedAt: string
updatedAt: string
coverImage: string
featured: boolean
draft: boolean
seoTitle: string
seoDescription: string
```

Validation approach:

- For the first slice, use a small local validation function that checks required fields and throws a clear error during build.
- A schema library such as `zod` can be deferred unless validation becomes more complex.

## Files To Create

Project/config:

- `package.json`
- `next.config.mjs`
- `tsconfig.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `.eslintrc.json` or `eslint.config.mjs`, depending on the selected Next.js version defaults.
- `.gitignore`

App routes/styles:

- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/articles/page.tsx`
- `app/articles/[slug]/page.tsx`
- `app/not-found.tsx`

Components:

- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/site-shell.tsx`
- `components/article/article-card.tsx`
- `components/article/article-list.tsx`
- `components/article/article-header.tsx`
- `components/article/article-meta.tsx`
- `components/article/tag-list.tsx`
- `components/article/mdx-content.tsx`

Content/SEO helpers:

- `lib/content/articles.ts`
- `lib/content/types.ts`
- `lib/content/validation.ts`
- `lib/seo/metadata.ts`
- `lib/site/config.ts`
- `lib/utils/date.ts`
- `lib/utils/slug.ts`

Content:

- `content/articles/best-ssd-upgrades-pc-gaming-india.mdx`
- `content/articles/gaming-laptop-cooling-indian-summers.mdx`
- `content/articles/best-routers-game-streaming-low-ping-india.mdx`

Optional placeholder:

- `public/images/articles/README.md`

## Files To Modify

- `docs/command-map.md`: replace placeholder commands with actual package manager scripts after scaffold.
- `docs/context/project-map.md`: update actual entry points after scaffold.
- `docs/context/current-status.md`: mark app scaffold in progress or complete during implementation/finalization.
- `README.md`: add local development commands after scripts exist.

No existing starter-pack backend/mobile docs should be deleted.

## Web Frontend Plan

Routes/pages:

- `app/layout.tsx`: site-wide metadata defaults, HTML/body shell, global styles.
- `app/page.tsx`: homepage showing site positioning, featured article, and recent articles.
- `app/articles/page.tsx`: chronological published article list.
- `app/articles/[slug]/page.tsx`: dynamic article detail route with static params from article slugs and article-level metadata.
- `app/not-found.tsx`: simple site-branded missing page.

Components:

- `SiteHeader`: brand and nav links for Home and Articles.
- `SiteFooter`: copyright, basic links, future policy link placeholders.
- `SiteShell`: constrained layout wrapper.
- `ArticleCard`: title, description, category, tags, date, and featured state.
- `ArticleList`: list/grid wrapper.
- `ArticleHeader`: article detail hero text and metadata.
- `ArticleMeta`: publish/update date, author, category.
- `TagList`: rendered tags.
- `MdxContent`: wraps MDX body with article typography styles.

Content helpers:

- `getAllArticles({ includeDrafts?: boolean })`
- `getPublishedArticles()`
- `getFeaturedArticles()`
- `getRecentArticles(limit?: number)`
- `getArticleBySlug(slug: string)`
- `getArticleSlugs()`

Loading/empty/error states:

- Article listing should show a clear empty state if no published articles exist.
- Article detail should call `notFound()` when slug is missing or draft is not visible.
- Build should fail with a clear error for invalid frontmatter.

## SEO Plan

Site config:

- `siteName`
- `siteDescription`
- `siteUrl`
- `defaultAuthor`
- `defaultOgImage`, optional placeholder

Metadata:

- Root layout exports default metadata.
- Homepage exports title and description.
- `/articles` exports title and description.
- `/articles/[slug]` uses `generateMetadata` from frontmatter:
  - `title` from `seoTitle`
  - `description` from `seoDescription`
  - canonical path `/articles/<slug>`
  - Open Graph article metadata where practical

Deferred SEO:

- `app/sitemap.ts`
- `app/robots.ts`
- RSS feed.
- JSON-LD structured data.

These are documented as MVP needs but can be implemented in a follow-up SEO foundation slice unless the owner wants them in this first slice.

## Data And Migration Plan

- Schema changes: none.
- Migration name: not applicable.
- Indexes/constraints: not applicable.
- Seed data: 3 local `.mdx` sample articles.
- Rollback considerations: remove scaffold files and sample article files if the plan is abandoned before production use.

## Backend Plan

- Routes: none.
- DTOs: none.
- Services: none.
- Repositories/DB services: none.
- Auth/permissions: none.
- Swagger/OpenAPI: none.
- Background jobs: none.
- SQL functions/triggers/materialized views: none.
- Observability: none.
- External providers: none.

## SDK Plan

- OpenAPI impact: none.
- SDK output path: not applicable.
- Generated models expected: none.
- Compatibility concerns: none.

## Mobile Frontend Plan

- App target: none.
- Screens/routes: none.
- Shared packages: none.
- Native config: none.
- Permissions/plugins: none.
- Push notifications: none.
- Camera/media/files: none.
- Offline/network: none.
- Device verification: not applicable.

## Implementation Sequence

1. Confirm approval and resolve blocking assumptions: package manager and root-level scaffold location.
2. Scaffold Next.js App Router with TypeScript and Tailwind CSS at the repository root.
3. Add MDX/frontmatter dependencies and configure Next.js for MDX rendering.
4. Create global styles and basic editorial layout.
5. Create content types, validation, and article loading helpers under `lib/content/`.
6. Add the 3 sample MDX articles under `content/articles/`.
7. Build homepage, article listing page, article detail page, and not-found page.
8. Add basic SEO metadata helpers and per-page metadata.
9. Update `docs/command-map.md`, `README.md`, and context docs with real commands and entry points.
10. Run verification commands and record results in the implementation report.

## Acceptance Criteria

- A local Next.js App Router blog exists.
- TypeScript is configured.
- Tailwind CSS styles are active.
- Homepage works at `/`.
- Blog listing works at `/articles`.
- Article detail pages work at `/articles/[slug]`.
- Three sample MDX articles exist under `content/articles/`.
- Published articles render on home, listing, and detail pages.
- `draft: true` articles are excluded from lists and route generation.
- Article frontmatter drives title, description, category, tags, author, dates, featured state, and SEO metadata.
- Basic site and article metadata are implemented.
- No backend, database, Prisma, NestJS, Docker, auth, CMS, payments, user accounts, SDK, or mobile app code is added.
- Build succeeds.

## Verification Plan

Commands depend on selected package manager. If `pnpm` is approved, expected commands are:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Verification details:

- Install: dependencies install cleanly after approval.
- Dev server: homepage, `/articles`, and all 3 article detail pages load locally.
- Lint: no lint errors.
- Typecheck: no TypeScript errors.
- Build: production build succeeds.
- Content behavior: drafts are excluded, published articles sorted newest-first, missing slugs return not found.
- SEO: metadata exists for homepage, listing, and article detail pages.
- Responsive check: basic layout is readable on mobile and desktop widths.

Not applicable:

- Docker.
- Migration.
- Backend health.
- SDK generation.
- Mobile/device verification.
- Observability stack.

## Test Plan

- Unit: optional for this first slice; consider adding tests for frontmatter validation and draft filtering if a test runner is added.
- API integration: not applicable.
- Contract: not applicable.
- E2E: optional follow-up; manual route checks are enough for this first scaffold unless Playwright is explicitly added.
- Manual:
  - Visit `/`.
  - Visit `/articles`.
  - Visit each article detail page.
  - Confirm article metadata renders.
  - Confirm nonexistent slug returns not found.
  - Confirm mobile and desktop layout is readable.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Package manager choice remains unresolved | Scaffold commands may not match owner preference | Confirm package manager before approval; recommended `pnpm` |
| MDX dependency choice causes App Router friction | Article rendering may become more complex than expected | Use a minimal, current App Router-compatible MDX setup and keep parsing/rendering isolated |
| Root-level scaffold may conflict with starter-pack folders | Generated files may sit beside docs/agents/skills/commands | Keep scaffold minimal and document entry points; avoid monorepo complexity for MVP |
| Missing cover images create broken visuals | Article cards/detail pages may look incomplete | Render CSS fallback placeholders until real images are added |
| Frontmatter errors break builds | Content edits may be fragile | Add clear validation errors with filename context |
| SEO scope creep | First slice may expand into sitemap/rss/schema/analytics | Keep basic metadata in this slice; defer sitemap/rss/schema unless explicitly approved |

## Assumptions

- The app will be scaffolded at repository root unless the owner requests a subfolder.
- `pnpm` will be used unless the owner chooses another package manager.
- Sample article dates can use `2026-05-19`.
- Sample article content can be practical placeholder editorial content, not final SEO-polished articles.
- Cover image files are not required in the first slice if the UI handles missing images cleanly.
- The production site URL is not known yet; metadata can use a configurable fallback.

## Open Questions

| ID | Question | Blocking |
| --- | --- | --- |
| Q-001 | Approve `pnpm` as the package manager? | yes |
| Q-002 | Approve root-level Next.js scaffold instead of `apps/web/`? | yes |
| Q-003 | Should sitemap/robots be included in this first slice, or stay in the next SEO foundation slice? | no |
| Q-004 | What should the initial site name be in metadata: `Gaming + Tech Blog`, a personal brand name, or a domain-backed brand? | no |

## Approval

- Approved: yes
- Approval file: `docs/features/approvals/mvp-static-blog.approval.md`
- Conditions:
  - Resolve package manager and scaffold location before implementation.
  - Keep the implementation strictly within static blog scope.
  - Do not add backend/database/CMS/auth/Docker/payment/user-account infrastructure.
