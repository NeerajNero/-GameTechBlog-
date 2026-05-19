# Feature Classification

## Classification

- Feature slug: `article-image-asset-pass`
- Source file: user request
- Lane: tiny
- Confidence: high
- Classified at: 2026-05-19
- Classified by: Codex
- Recommended next command: `/plan docs/features/classifications/article-image-asset-pass.classification.md`

## Scope

Plan a lawful manual article image asset pass for the current three sample articles and future articles.

In scope:

- Define image requirements for current sample articles.
- Define safe image source rules.
- Define Cloudinary folder and filename conventions.
- Define alt text and credit requirements.
- Define manual Cloudinary upload workflow.
- Define MDX frontmatter update workflow.
- Create a reusable image asset checklist.

## Non-Goals

Do not add:

- App code changes.
- Backend.
- Database.
- Auth.
- CMS.
- Docker.
- Upload API.
- Cloudinary SDK.
- `next-cloudinary`.
- Cloudinary credentials.
- AdSense.
- Analytics.
- Affiliate links.
- New packages.
- Fake Cloudinary URLs.
- Fake image credits.

## Reason

- This is documentation and workflow planning only.
- The app already supports `coverImage`, `coverImageAlt`, and `coverImageCredit`.
- No code, package, infrastructure, or external integration changes are required.
- Actual image capture, upload, and MDX frontmatter updates remain a later manual/content task.

## Risk Signals

| Signal | Present | Notes |
| --- | --- | --- |
| Database/migration | no | No persistence changes |
| Backend contract | no | No backend/API |
| Generated SDK/API wiring | no | Not applicable |
| Auth/permissions | no | No auth |
| Payment/subscription | no | Not applicable |
| External provider | yes | Manual Cloudinary dashboard use only |
| Infrastructure/secrets/deployment | no | No credentials or env vars |
| Copyright/licensing | yes | Main risk is unsafe image sourcing |

## Gate Decisions

- Approval required: no for documentation planning; yes before updating real article frontmatter with external image URLs.
- API integration required: no.
- Context update required: yes.

## Deferred Items

- Real image capture or selection.
- Manual Cloudinary upload.
- MDX frontmatter updates with real Cloudinary URLs.
- Browser verification after real URLs are added.
- Any automated image processing or upload tooling.

## Verification Requirements

For this planning task:

- Confirm docs exist.
- Confirm no app code changed.
- Confirm no fake URLs or fake credits are introduced.

For the later manual implementation task:

- Verify image URLs are real `https://res.cloudinary.com/...` delivery URLs.
- Verify every real cover image has accurate alt text.
- Verify required credits are present.
- Run `pnpm --dir apps/web lint`.
- Run `pnpm --dir apps/web typecheck`.
- Run `pnpm --dir apps/web build`.
- Smoke check affected article pages.
