# Header Branding Cleanup

Date: 2026-05-26

## Summary

Cleaned up the GameTechGuides header branding so the header shows one clear brand treatment:

- square icon
- visible text brand `GameTechGuides`
- subtitle `Gaming guides, hardware, and setup notes` on larger screens

The header no longer renders the wide wordmark image.

## Files Changed

- `apps/web/components/layout/site-header.tsx`
- `docs/context/current-status.md`
- `docs/features/reports/header-branding-cleanup.md`

## Header Changes

- Removed `siteConfig.logoWide` image rendering from the header.
- Kept the local square icon from `siteConfig.logoIcon`.
- Kept accessible, readable text brand in the header link.
- Kept the subtitle hidden on very small screens and visible from the `sm` breakpoint.
- Kept the compact header spacing and existing navigation behavior.

## Asset Notes

- `apps/web/public/brand/logo-icon.png` remains used for the header icon and apple icon metadata.
- `apps/web/app/icon.png` remains used for browser/app icon behavior.
- `apps/web/public/brand/logo-wide.png` remains available for future use, but is not currently used by production UI.
- The wide logo PNG appears to have a visible checkerboard-style background baked in. Re-export or clean it before using it publicly in the About page, footer, social images, or brand documentation.

## Verification Results

Passed:

```bash
pnpm --dir apps/web lint
pnpm --dir apps/web typecheck
pnpm --dir apps/web build
```

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

Source inspection confirmed:

- Header references `/brand/logo-icon.png`.
- Header does not reference `/brand/logo-wide.png`.
- Header keeps visible `GameTechGuides` text.
- Header keeps the subtitle.
- Metadata still uses `GameTechGuides`.
- Browser icon metadata still points to `/icon.png`.

## Remaining Visual Notes

- Local source inspection confirms no duplicate visible wordmark in the header.
- Final visual validation should happen after Vercel redeploy on desktop and mobile widths.
