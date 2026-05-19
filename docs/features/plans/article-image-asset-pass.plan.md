# Feature Plan

## Status

- Status: planned
- Feature slug: `article-image-asset-pass`
- Source stories: user request
- Classification: `docs/features/classifications/article-image-asset-pass.classification.md`
- Lane: tiny
- Created: 2026-05-19
- Last updated: 2026-05-19

## Summary

- User-visible outcome: Current articles can receive lawful, useful cover images without changing app code or adding upload infrastructure.
- Business value: Better article presentation, safer SEO/social previews, and a repeatable manual publishing workflow.
- Surfaces: content workflow, Cloudinary dashboard, MDX frontmatter, docs.

## Scope

In scope:

- Plan cover image requirements for current sample articles.
- Define Cloudinary folder paths and filenames.
- Define alt text and credit rules.
- Define copyright/safe-use rules.
- Define manual upload workflow.
- Define frontmatter update and verification checklist.

Out of scope:

- App code changes.
- Package installs.
- Backend/database/auth/CMS/Docker.
- Upload APIs or admin UI.
- Cloudinary SDK or `next-cloudinary`.
- AdSense, analytics, or affiliate links.
- Fake Cloudinary URLs or fake credits.

## Image Requirements By Article

### Elden Ring Beginner Tips For First-Time Souls Players

- Article slug: `elden-ring-beginner-tips-first-time-souls-players`
- Recommended image type: original in-game screenshot captured by the site owner.
- Preferred visual: early-game player scene, Site of Grace, character overlooking Limgrave, inventory/build screen, or non-spoiler exploration moment.
- Avoid: downloaded key art, box art, wallpapers, random Google Images, copyrighted artwork, boss spoilers, or images with third-party watermarks.
- Cloudinary path:

```text
gaming-tech-blog/articles/elden-ring-beginner-tips-first-time-souls-players/cover.webp
```

- Suggested alt text:

```text
Elden Ring character standing in an early open-world area for a beginner guide
```

- Credit:
  - If captured by site owner: `Screenshot captured by Neeraj Kumar Sharma.`
  - If using official media: document source URL and allowed usage terms before upload.

### Best Router Setup For PS Remote Play And Steam Link

- Article slug: `best-router-setup-ps-remote-play-steam-link`
- Recommended image type: original photo of a practical home router setup.
- Preferred visual: router on open shelf, Ethernet cable connected to console/PC, controller/handheld/laptop nearby, clean real setup.
- Avoid: store product photos copied from ecommerce pages, brand logos as the main subject, random stock images, or images showing private network details.
- Cloudinary path:

```text
gaming-tech-blog/articles/best-router-setup-ps-remote-play-steam-link/cover.webp
```

- Suggested alt text:

```text
Home router setup with Ethernet cable for PS Remote Play and Steam Link
```

- Credit:
  - If photographed by site owner: `Photo by Neeraj Kumar Sharma.`
  - If using manufacturer press media: document source URL and allowed usage terms before upload.

### Best SSD Setup For Large Gaming Libraries

- Article slug: `best-ssd-setup-large-gaming-libraries`
- Recommended image type: original photo of SSD hardware or a practical storage setup.
- Preferred visual: M.2 SSD, external SSD, desktop/laptop upgrade scene, or game library storage setup without private account details.
- Avoid: ecommerce product images, copied manufacturer renders without permission, warranty labels or serial numbers, and screenshots showing personal accounts.
- Cloudinary path:

```text
gaming-tech-blog/articles/best-ssd-setup-large-gaming-libraries/cover.webp
```

- Suggested alt text:

```text
SSD storage setup for a large PC gaming library
```

- Credit:
  - If photographed by site owner: `Photo by Neeraj Kumar Sharma.`
  - If using manufacturer press media: document source URL and allowed usage terms before upload.

## Future Article Convention

For each article:

```text
gaming-tech-blog/articles/{article-slug}/cover.webp
```

Optional supporting images:

```text
gaming-tech-blog/articles/{article-slug}/step-01.webp
gaming-tech-blog/articles/{article-slug}/comparison-table.webp
gaming-tech-blog/articles/{article-slug}/setup-detail.webp
```

## Filename Conventions

- Use lowercase filenames.
- Use hyphens instead of spaces.
- Prefer descriptive filenames:
  - `cover.webp`
  - `router-placement.webp`
  - `ethernet-setup.webp`
  - `ssd-installation.webp`
- Avoid:
  - `image1.jpg`
  - `final-final.png`
  - `screenshot.png`
  - filenames with dates only.

## Format And Size Guidelines

- Prefer `.webp` for uploaded article images.
- Use landscape crop around 16:9 for covers.
- Suggested cover dimensions before upload: 1600 x 900 or 1200 x 675.
- Keep the subject clear at article-card size.
- Compress before upload where practical.
- Avoid huge original camera files when a web-ready image is enough.

## Alt Text Requirements

Alt text must:

- Describe the actual image.
- Match the article context.
- Be concise and useful.
- Avoid keyword stuffing.
- Avoid invented details.

Good:

```text
Home router setup with Ethernet cable for PS Remote Play and Steam Link
```

Bad:

```text
Best router PS5 Steam Link gaming WiFi setup fast internet guide
```

## Credit Requirements

Use `coverImageCredit` when attribution is required or helpful.

Examples:

```yaml
coverImageCredit: "Photo by Neeraj Kumar Sharma."
coverImageCredit: "Screenshot captured by Neeraj Kumar Sharma."
coverImageCredit: "Image source: Manufacturer press kit, used under published media terms."
```

Do not add:

- Fake credits.
- Credits without a source record.
- Attribution that implies permission when permission is unknown.

## Copyright And Safe-Use Rules

- Prefer original screenshots/photos created by the site owner.
- Do not use random Google Images.
- Do not upload copyrighted artwork without permission.
- Game screenshots captured by the site owner are preferred over downloaded images.
- Product/setup photos created by the site owner are preferred for router/SSD articles.
- If using official press/media assets, document the source and usage permission before upload.
- If no safe image exists, leave the article fallback UI instead of using risky images.
- Remove private information from screenshots and photos before upload.
- Avoid visible serial numbers, account names, addresses, Wi-Fi SSIDs, and personal files.

## Manual Cloudinary Upload Workflow

1. Choose or capture a lawful image.
2. Crop to a clean 16:9 cover composition.
3. Export/compress as `.webp`.
4. Open Cloudinary dashboard.
5. Upload to:

```text
gaming-tech-blog/articles/{article-slug}/cover.webp
```

6. Copy the secure delivery URL.
7. Confirm the URL starts with:

```text
https://res.cloudinary.com/
```

8. Update the article MDX frontmatter.
9. Run local verification.
10. Commit the MDX change.

## Frontmatter Update Plan

For each article, update only after a real safe image exists:

```yaml
coverImage: "https://res.cloudinary.com/{cloud-name}/image/upload/.../gaming-tech-blog/articles/{article-slug}/cover.webp"
coverImageAlt: "Accurate description of the actual image"
coverImageCredit: "Photo by Neeraj Kumar Sharma."
```

Rules:

- Do not add fake URLs.
- Do not add placeholder URLs.
- Do not add fake credits.
- Leave all three fields empty when no safe image exists.
- `coverImageAlt` is required when `coverImage` is populated.
- `coverImageCredit` may be empty only when no credit is needed.

## Verification Checklist

After updating real image frontmatter:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `pnpm --dir apps/web build`
- Smoke check:
  - `/`
  - `/articles`
  - affected `/articles/{slug}` page
- Confirm article card renders the image.
- Confirm article detail renders the image.
- Confirm no broken image URL appears.
- Confirm Open Graph/article JSON-LD image is included only for valid image URLs.
- Confirm JSON-LD contains no `undefined` or `null` values.

## Approval Needed Before Manual Update

Before adding each real Cloudinary URL to MDX, confirm:

- Image rights are clear.
- Cloudinary upload is complete.
- Secure delivery URL is copied from Cloudinary.
- Alt text describes the actual image.
- Credit is accurate or intentionally empty.
