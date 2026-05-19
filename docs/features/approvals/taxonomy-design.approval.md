# Feature Approval

## Approval

- Feature slug: `taxonomy-design`
- Plan: `docs/features/plans/taxonomy-design.plan.md`
- Classification: `docs/features/classifications/taxonomy-design.classification.md`
- Approved at: 2026-05-19
- Approved by: User request
- Status: approved

## Explicitly Approved Scope

- Category index page at `/categories`.
- Category detail pages at `/categories/[category]`.
- Tag index page at `/tags`.
- Tag detail pages at `/tags/[tag]`.
- Category and tag data generated from published MDX frontmatter.
- Article counts for categories and tags.
- Category descriptions.
- Draft exclusion from taxonomy pages, static params, and sitemap.
- Homepage polish.
- Article listing polish.
- Article detail polish.
- Navigation polish.
- Category/tag page metadata and canonical URLs.
- Sitemap updates for taxonomy pages.

## Explicit Non-Goals

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
- Client-heavy search/filtering.
- Fake structured data.

## Verification Commands

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

## Smoke Checks

```text
/
/articles
/articles/elden-ring-beginner-tips-first-time-souls-players
/categories
/categories/gaming-guides
/tags
/tags/elden-ring
/sitemap.xml
```

## Implementation Command

```text
/implement docs/features/approvals/taxonomy-design.approval.md
```
