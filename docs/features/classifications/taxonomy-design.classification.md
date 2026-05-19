# Feature Classification

## Classification

- Feature slug: `taxonomy-design`
- Source file: user request
- Lane: normal
- Confidence: high
- Classified at: 2026-05-19
- Classified by: Codex
- Recommended next command: `/plan docs/features/classifications/taxonomy-design.classification.md`

## Scope

Add taxonomy pages and polish the static blog experience.

In scope:

- Category index route: `/categories`.
- Category detail route: `/categories/[category]`.
- Tag index route: `/tags`.
- Tag detail route: `/tags/[tag]`.
- Category and tag data derived from published MDX frontmatter.
- Article counts per category and tag.
- Category descriptions.
- Published article lists for category and tag detail pages.
- Draft article exclusion from taxonomy pages, static params, and sitemap entries.
- Homepage visual and structural polish.
- Article listing polish.
- Article detail reading polish.
- Header/footer navigation polish.
- Metadata and canonical URLs for taxonomy pages.
- Sitemap entries for taxonomy routes.

## Non-Goals

Do not add:

- Backend.
- Database.
- Auth.
- CMS.
- Docker.
- AdSense scripts.
- Analytics.
- Affiliate links.
- RSS.
- Comments.
- User accounts.
- Client-heavy filtering/search.
- Fake structured data.
- New package dependencies unless implementation proves they are strictly necessary.

## Reason

- This is static content, routing, metadata, and presentation work inside the existing Next.js App Router app.
- It extends the existing MDX article pipeline rather than adding a new data source.
- It updates sitemap and navigation but does not introduce external services, secrets, runtime infrastructure, or backend contracts.

## Risk Signals

| Signal | Present | Notes |
| --- | --- | --- |
| Database/migration | no | No persistence changes |
| Backend contract | no | No backend/API |
| Generated SDK/API wiring | no | Not applicable |
| Auth/permissions | no | No auth |
| Payment/subscription | no | Not applicable |
| External provider | no | No new external integration |
| Queue/cron/background job | no | Not applicable |
| Mobile native config/permissions | no | Web only |
| Infrastructure/secrets/deployment | no | No secrets or infra changes |
| SEO routing | yes | Sitemap/canonical changes need verification |

## Gate Decisions

- Approval required: yes
- API integration required: no
- Context update required: yes

## Required Commands

```text
/plan docs/features/classifications/taxonomy-design.classification.md
/approve docs/features/plans/taxonomy-design.plan.md
/implement docs/features/approvals/taxonomy-design.approval.md
/verify docs/features/reports/taxonomy-design.implementation.md
/test docs/features/reports/taxonomy-design.implementation.md
/review docs/features/reports/taxonomy-design.implementation.md
/finalize docs/features/reports/taxonomy-design.implementation.md
/context-update docs/features/final/taxonomy-design.final.md
```

## Optional Commands

```text
/status docs/features
/revise-plan docs/features/plans/taxonomy-design.plan.md
```

## Deferred Items

- RSS feed.
- Search.
- Client-side filters.
- Comments.
- Analytics.
- Ads.
- Affiliate links.
- Real article image asset pass.
- Generated Open Graph images.
- Structured data beyond existing accurate article and breadcrumb JSON-LD.

## Verification Requirements

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`
- Smoke check `/`, `/articles`, one article detail route, `/categories`, one category detail route, `/tags`, one tag detail route, and `/sitemap.xml`.
- Inspect taxonomy page metadata for canonical URLs and non-production robots behavior.
- Inspect sitemap output for category/tag routes and draft exclusion.

## Notes

- Category and tag slugs should be generated from frontmatter labels using the existing slug helper.
- Category descriptions should be practical and local to the static site.
- Header navigation should stay focused; footer can carry secondary trust and taxonomy links.
