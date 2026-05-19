# Feature Approval

## Approval

- Feature slug: `cloudinary-image-foundation`
- Plan: `docs/features/plans/cloudinary-image-foundation.plan.md`
- Classification: `docs/features/classifications/cloudinary-image-foundation.classification.md`
- Approved at: 2026-05-19
- Approved by: User request
- Status: approved

## Explicitly Approved Scope

- Manual Cloudinary dashboard upload workflow.
- Cloudinary delivery URLs in MDX frontmatter/body.
- Next.js remote image pattern for `https://res.cloudinary.com/**`.
- Optional `coverImage`, `coverImageAlt`, and `coverImageCredit` frontmatter fields.
- Article card/detail image rendering when image URL is safe.
- Fallback UI when image is missing or unsafe.
- SEO/JSON-LD image safety.

## Explicit Non-Goals

Do not add:

- Cloudinary SDK.
- `next-cloudinary`.
- upload admin.
- upload API.
- signed uploads.
- backend.
- database.
- auth.
- CMS.
- Docker.
- AdSense scripts.
- analytics.
- affiliate links.
- Cloudinary credentials.
- upload presets.

## Verification Commands

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

## Implementation Command

```text
/implement docs/features/approvals/cloudinary-image-foundation.approval.md
```
