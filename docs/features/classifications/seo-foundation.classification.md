# Feature Classification

## Classification

- Feature slug: `seo-foundation`
- Source file: `docs/features/seo-foundation.md`
- Lane: normal
- Confidence: high
- Classified at: 2026-05-19
- Classified by: Codex
- Recommended next command: `/plan docs/features/seo-foundation.md`

## Scope

Implement the first SEO foundation slice for the existing static blog under `apps/web/`.

In scope:

- `robots.ts`
- `sitemap.ts`
- canonical URL helpers
- metadata helper updates
- `metadataBase`
- article `BlogPosting` or `Article` JSON-LD
- `BreadcrumbList` JSON-LD
- static trust/policy pages:
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/editorial-policy`
  - `/affiliate-disclosure`

## Non-Goals

- No RSS in this slice.
- No category/tag pages in this slice.
- No AdSense scripts.
- No analytics.
- No affiliate links.
- No backend.
- No database.
- No auth.
- No CMS.
- No Docker.

## Reason

- The work is frontend-only and static-site focused.
- It touches multiple app routes and shared SEO helpers, so it is larger than a tiny change.
- It does not introduce infrastructure, secrets, auth, backend contracts, database migrations, external scripts, payments, or runtime provider integrations.
- It should be treated as a normal feature with plan, approval, implementation, verification, review, and context update.

## Risks

| Risk | Impact | Notes |
| --- | --- | --- |
| Incorrect canonical URLs | Search engines may index duplicate or wrong URLs | Use one normalized URL helper and `NEXT_PUBLIC_SITE_URL` |
| Missing production site URL | Production metadata/sitemap may point to localhost | Fail loudly in production or document Vercel env requirement |
| Broken OG/JSON-LD images | Social and rich result output may be invalid | Only emit image URLs when files are real and non-placeholder |
| Bad noindex behavior | Production pages might not index, or previews might index | Use metadata robots rules; do not use `robots.txt` for noindex |
| JSON-LD fake/null values | Structured data may be invalid or misleading | Strip undefined/null values and avoid fake claims |
| Scope creep into taxonomy/RSS | Delays foundation slice | Keep RSS and category/tag pages deferred |

## Risk Signals

| Signal | Present | Notes |
| --- | --- | --- |
| Database/migration | no | No persistence changes |
| Backend contract | no | Static Next.js app only |
| Generated SDK/API wiring | no | No API integration |
| Auth/permissions | no | No auth in MVP |
| Payment/subscription | no | No payments or ads |
| External provider | no | No analytics, AdSense, Search Console API, or affiliate scripts |
| Queue/cron/background job | no | Not applicable |
| Mobile native config/permissions | no | Web only |
| Infrastructure/secrets/deployment | no | Documents `NEXT_PUBLIC_SITE_URL`, but does not configure Vercel |

## Verification Requirements

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`
- Smoke check `/robots.txt`
- Smoke check `/sitemap.xml`
- Smoke check `/about`
- Smoke check `/contact`
- Smoke check `/privacy-policy`
- Smoke check `/terms`
- Smoke check `/editorial-policy`
- Smoke check `/affiliate-disclosure`
- Smoke check one article page for metadata and JSON-LD rendering

## Deferred Items

- RSS feed.
- Category pages.
- Tag pages.
- Real article cover image assets.
- Generated OG images.
- Analytics.
- AdSense.
- Affiliate links.
- Search Console submission.

## Gate Decisions

- Approval required: yes
- API integration required: no
- Context update required: yes

## Required Commands

```text
/plan docs/features/seo-foundation.md
/approve docs/features/plans/seo-foundation.plan.md
/implement docs/features/approvals/seo-foundation.approval.md
/verify docs/features/reports/seo-foundation.implementation.md
/test docs/features/reports/seo-foundation.implementation.md
/review docs/features/reports/seo-foundation.implementation.md
/finalize docs/features/reports/seo-foundation.implementation.md
/context-update docs/features/final/seo-foundation.final.md
```

## Optional Commands

```text
/status docs/features
/revise-plan docs/features/plans/seo-foundation.plan.md
```

## Gate Reasons

- Approval: this changes public SEO behavior and adds public trust/policy pages.
- API integration: not required because there is no backend/API.
- Context update: required because this establishes durable SEO conventions.

## Open Questions

| ID | Question | Blocking |
| --- | --- | --- |
| Q-001 | What final production domain will be used for `NEXT_PUBLIC_SITE_URL`? | no |
| Q-002 | What contact email or contact path should `/contact` show? | no |

## Notes

- Use practical placeholder trust/policy copy that does not claim AdSense approval, affiliate partnerships, analytics usage, company status, or team facts.
- Do not write app code until implementation starts from `docs/features/approvals/seo-foundation.approval.md`.
