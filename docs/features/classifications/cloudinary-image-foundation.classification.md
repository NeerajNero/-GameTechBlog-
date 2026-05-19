# Feature Classification

## Classification

- Feature slug: `cloudinary-image-foundation`
- Source file: user request
- Lane: normal
- Confidence: high
- Classified at: 2026-05-19
- Classified by: Codex
- Recommended next command: `/plan docs/features/classifications/cloudinary-image-foundation.classification.md`

## Scope

Add a small Cloudinary image handling foundation for the static MDX blog.

In scope:

- Document manual Cloudinary image workflow.
- Configure Next.js image remote patterns for `https://res.cloudinary.com/**`.
- Support optional `coverImage`, `coverImageAlt`, and `coverImageCredit` article frontmatter.
- Render article card/detail images only when safe.
- Keep styled fallback UI when images are missing.
- Ensure SEO and JSON-LD only emit image URLs when safe.
- Update sample articles without fake Cloudinary URLs.

## Non-Goals

- No upload admin.
- No upload API.
- No Cloudinary SDK.
- No `next-cloudinary`.
- No signed uploads.
- No backend.
- No database.
- No auth.
- No CMS.
- No Docker.
- No AdSense scripts.
- No analytics.
- No affiliate links.
- No Cloudinary credentials in the repo.

## Reason

- This is a frontend/static content workflow slice.
- It touches docs, frontmatter typing/validation, image rendering, and SEO image safety.
- It does not add infrastructure, secrets, uploads, runtime providers, or new packages.

## Risk Signals

| Signal | Present | Notes |
| --- | --- | --- |
| Database/migration | no | No persistence changes |
| Backend contract | no | No backend/API |
| Generated SDK/API wiring | no | Not applicable |
| Auth/permissions | no | No auth |
| Payment/subscription | no | Not applicable |
| External provider | yes | Cloudinary delivery URLs only; no SDK/secrets/uploads |
| Queue/cron/background job | no | Not applicable |
| Mobile native config/permissions | no | Web only |
| Infrastructure/secrets/deployment | no | No Cloudinary credentials or env vars |

## Gate Decisions

- Approval required: yes
- API integration required: no
- Context update required: yes

## Required Commands

```text
/plan docs/features/classifications/cloudinary-image-foundation.classification.md
/approve docs/features/plans/cloudinary-image-foundation.plan.md
/implement docs/features/approvals/cloudinary-image-foundation.approval.md
/verify docs/features/reports/cloudinary-image-foundation.implementation.md
/test docs/features/reports/cloudinary-image-foundation.implementation.md
/review docs/features/reports/cloudinary-image-foundation.implementation.md
/finalize docs/features/reports/cloudinary-image-foundation.implementation.md
/context-update docs/features/final/cloudinary-image-foundation.final.md
```

## Optional Commands

```text
/status docs/features
/revise-plan docs/features/plans/cloudinary-image-foundation.plan.md
```

## Deferred Items

- Upload UI.
- Upload API routes.
- Signed upload presets.
- Cloudinary SDK.
- Image transformation abstraction.
- Generated OG images.
- Real cover image asset pass.

## Verification Requirements

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`
- Smoke check `/`, `/articles`, and one article page.
- Inspect article page output for no broken image URL.
- Inspect JSON-LD for no `undefined`, `null`, or unsafe image field.

## Notes

- Manual Cloudinary dashboard upload is the approved MVP workflow.
- Site assets stay in the repo.
- Article/media assets use Cloudinary delivery URLs when available.
