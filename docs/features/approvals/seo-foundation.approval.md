# Feature Approval

## Approval

- Feature slug: `seo-foundation`
- Plan: `docs/features/plans/seo-foundation.plan.md`
- Classification: `docs/features/classifications/seo-foundation.classification.md`
- Approved at: 2026-05-19
- Approved by: User request
- Status: approved

## Explicitly Approved Scope

Approved for implementation:

- SEO foundation slice.
- Static trust/policy pages:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/editorial-policy`
  - `/affiliate-disclosure`
- Sitemap.
- Robots.
- Canonical URL helpers.
- `metadataBase` from normalized site URL.
- Article `BlogPosting` or `Article` JSON-LD.
- Article `BreadcrumbList` JSON-LD.
- Production/non-production indexing behavior.

## Explicitly Approved Rules

- Use `NEXT_PUBLIC_SITE_URL` as the production canonical source.
- Normalize trailing slashes.
- Use `http://localhost:3000` as local fallback.
- Do not hardcode a fake production domain.
- Production Vercel must set `NEXT_PUBLIC_SITE_URL` before launch.
- Use metadata robots/noindex behavior for non-production deployments.
- Do not use `robots.txt` for noindex.
- Production `robots.ts` should allow normal crawling and reference sitemap.
- Sitemap should include homepage, `/articles`, published articles, and trust/policy pages.
- Sitemap should exclude draft articles.
- JSON-LD should not include undefined, null, or fake values.
- Use article `coverImage` only if valid and not placeholder.
- Avoid broken OG/JSON-LD image URLs.

## Explicit Deferrals

- RSS is deferred.
- Category/tag pages are deferred.
- Real article cover image assets are deferred.
- Generated OG images are deferred.

## Explicit Non-Goals

Do not add:

- AdSense scripts.
- Analytics.
- Affiliate links.
- Backend.
- Database.
- Auth.
- CMS.
- Docker.
- Payments.
- User accounts.
- Search Console integration.

## Verification Commands

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
pnpm --dir apps/web dev --hostname 127.0.0.1
```

## Implementation Command

```text
/implement docs/features/approvals/seo-foundation.approval.md
```

## Conditions

- Do not install new packages unless implementation proves a standard package is truly required and the plan is revised first.
- Keep implementation scoped to `apps/web/` plus workflow/context docs.
- Trust/policy page copy must not claim facts that are not true yet.
