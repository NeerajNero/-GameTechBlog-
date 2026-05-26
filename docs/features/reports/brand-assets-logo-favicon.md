# Brand Assets Logo Favicon

Date: 2026-05-26

## Summary

Added local GameTechGuides brand asset support for header branding and browser/app icon behavior.

Brand assets are stored locally in the repo:

- `apps/web/public/brand/logo-wide.png`
- `apps/web/public/brand/logo-icon.png`
- `apps/web/app/icon.png`

Article/media images remain on Cloudinary. Cloudinary image support was not removed or changed.

## Implementation

- Added `logoWide` and `logoIcon` paths to `siteConfig`.
- Updated the site header to render local brand imagery:
  - square icon from `/brand/logo-icon.png`
  - wide logo from `/brand/logo-wide.png`
  - visible text brand remains `GameTechGuides`
- Added browser/app icon support with the Next.js App Router icon convention:
  - `apps/web/app/icon.png`
  - served as `/icon.png`
- Added metadata icon declarations in `apps/web/app/layout.tsx`:
  - `icon`
  - `shortcut`
  - `apple`

No `favicon.ico` was added. The implementation uses Next.js `app/icon.png` because it is the App Router convention and avoids generating or maintaining a separate ICO file.

## Files Changed

- `apps/web/app/icon.png`
- `apps/web/app/layout.tsx`
- `apps/web/components/layout/site-header.tsx`
- `apps/web/lib/site/config.ts`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `docs/features/reports/brand-assets-logo-favicon.md`

## Verification Results

Passed:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

Build generated `/icon.png` as a static route.

## Smoke Check Results

Smoke checked against a local production server using:

```bash
pnpm --dir apps/web exec next start --hostname 127.0.0.1 --port 3000
```

Passed:

- `/` returned 200.
- `/articles` returned 200.
- `/articles/total-overdose-underrated-ps2-masterpiece` returned 200.
- `/icon.png` returned 200 with `image/png`.
- `/brand/logo-wide.png` returned 200 with `image/png`.
- `/brand/logo-icon.png` returned 200 with `image/png`.

Source inspection confirmed:

- Metadata still uses `GameTechGuides`.
- Header source includes local `/brand` imagery.
- Browser icon metadata points to `/icon.png`.
- Apple icon metadata points to `/brand/logo-icon.png`.
- The article page still renders Cloudinary article/media image URLs.

## Issues And Deviations

- Used `apps/web/app/icon.png` instead of `apps/web/public/favicon.ico`.
- `next start` emitted the existing optional production warning that `sharp` is recommended for image optimization. No package was added because this task explicitly disallowed adding packages.
