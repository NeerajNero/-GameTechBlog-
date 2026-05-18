# User Stories

Use this file as input to `/classify`, then `/plan` for normal or risky features.

## Product Context

- Project: Gaming + Tech Blog Website
- Product surface: web
- Primary users: Indian gamers and tech buyers looking for practical gaming guides, hardware advice, and setup help.
- Business goal: Grow SEO and social traffic, then become ready for AdSense, affiliate monetization, and personal brand growth.

## Feature List

| ID | Feature | Priority | Surface | Notes |
| --- | --- | --- | --- | --- |
| US-001 | Static blog scaffold | P0 | web | Next.js App Router, TypeScript, Tailwind, no backend |
| US-002 | MDX article pipeline | P0 | web/content | Load local `.mdx` files from `content/articles/` |
| US-003 | SEO foundation | P0 | web/seo | Metadata, sitemap, robots, canonical URLs, article schema |
| US-004 | Homepage and article discovery | P0 | web | Featured, recent, categories, tags |
| US-005 | Article publishing workflow | P0 | content | Brief, frontmatter, image, commit, push, deploy |
| US-006 | Policy and monetization readiness pages | P1 | web/content | About, contact, privacy, affiliate disclosure |
| US-007 | Social distribution snippets | P1 | content/social | Create reusable social copy per article |
| US-008 | Affiliate-ready article components | P1 | web/content | Disclosure, comparison tables, product callouts |

## User Stories

### US-001: Static Blog Scaffold

As the site owner,
I want a Next.js App Router blog scaffold,
so that I can publish a fast content site without backend infrastructure.

Acceptance criteria:

- Uses TypeScript and Tailwind CSS.
- Does not add backend, database, Docker, Prisma, NestJS, auth, admin, CMS, payments, or user accounts.
- Provides homepage, article index, article detail, category, and tag route foundations.

Non-goals:

- Runtime content editing.
- User accounts.
- Comments.

### US-002: MDX Article Pipeline

As the site owner,
I want articles stored as local `.mdx` files with frontmatter,
so that content is versioned in Git and deployed through Vercel.

Acceptance criteria:

- Articles live under `content/articles/`.
- Required frontmatter fields are documented and validated or checked.
- Draft articles are excluded from production lists and SEO outputs.

### US-003: SEO Foundation

As a reader arriving from search,
I want pages with clear titles, descriptions, and article structure,
so that I can quickly decide whether the page answers my question.

Acceptance criteria:

- Article metadata drives page metadata.
- Sitemap and robots are generated.
- Article pages support canonical URLs and structured data.

### US-004: Homepage and Article Discovery

As a returning reader,
I want to find featured, recent, category, and tag content quickly,
so that I can keep reading related gaming and tech guides.

Acceptance criteria:

- Homepage shows featured and recent articles.
- Category and tag routes list matching articles.
- Article cards show title, description, category, date, and cover image.

### US-005: Article Publishing Workflow

As the site owner,
I want a repeatable article workflow,
so that publishing does not require a CMS.

Acceptance criteria:

- Workflow is documented as create MDX file -> add frontmatter -> add image -> commit -> push -> Vercel deploys.
- Templates exist for article briefs, frontmatter, SEO checks, content calendar, and social snippets.

### US-006: Policy and Monetization Readiness Pages

As the site owner,
I want trust and policy pages,
so that the site is ready for analytics, affiliates, and AdSense review later.

Acceptance criteria:

- About, contact, privacy policy, and affiliate disclosure pages are planned.
- Affiliate and ad guidance is documented.

## Open Questions

| ID | Question | Owner | Blocking |
| --- | --- | --- | --- |
| Q-001 | Which package manager should the scaffold use? | Owner | yes for scaffold |
| Q-002 | What domain name will be connected later? | Owner | no |
| Q-003 | Which analytics provider should be used? | Owner | no |
