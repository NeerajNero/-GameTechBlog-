# Decisions

Record durable project decisions that future agents should not rediscover.

## Decisions

### DEC-001: Content-First MVP

- Date: 2026-05-19
- Status: active
- Context: The project is a gaming + tech blog aimed at SEO, social traffic, monetization readiness, and personal brand growth.
- Decision: Build a static content-first web MVP instead of a full-stack product.
- Consequences: No backend, database, auth, admin panel, CMS, payments, user accounts, Docker, Prisma, or NestJS in the MVP.
- Related files: `docs/decisions/0001-content-first-mvp.md`

### DEC-002: MDX Over Database

- Date: 2026-05-19
- Status: active
- Context: The blog needs fast publishing, versioned content, and low operational overhead.
- Decision: Store articles as local `.mdx` files under `apps/web/content/articles/` with frontmatter metadata.
- Consequences: Content changes are committed through Git and deployed by Vercel. Runtime authoring is deferred.
- Related files: `docs/decisions/0002-mdx-over-database.md`

### DEC-003: Vercel + GitHub + Custom Domain Flow

- Date: 2026-05-19
- Status: active
- Context: The MVP should deploy simply and support SEO tooling.
- Decision: Use local development -> GitHub -> Vercel -> custom domain -> Search Console -> AdSense later.
- Consequences: No custom server deployment is needed for MVP.
- Related files: `docs/decisions/0003-vercel-github-domain-flow.md`

### DEC-004: Env-Gated AdSense Integration

- Date: 2026-08-18
- Status: active
- Context: The site is preparing an AdSense application. Ad code must exist for
  Google's verification/review, but no ads should load before that.
- Decision: Wire AdSense behind `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — a validated
  helper (`apps/web/lib/site/adsense.ts`), a conditional loader script in the root
  layout, and an `/ads.txt` route that 404s until configured. The privacy policy
  discloses Google advertising cookies and opt-outs regardless of the env var.
- Consequences: Activation is a Vercel env change plus redeploy, with no code
  edits at review time. The GDPR consent message is handled in AdSense
  Privacy & messaging, not in repo code.
- Related files: `apps/web/lib/site/adsense.ts`, `apps/web/app/layout.tsx`,
  `apps/web/app/ads.txt/route.ts`, `apps/web/app/privacy-policy/page.tsx`

## Deferred Decisions

- Analytics provider.
- Affiliate network choices.
- Commenting/community strategy.
