# Production Language And Policy Refresh

Date: 2026-05-27

## Scope

Moved active GameTechGuides wording from MVP/pre-launch language to live production content-site language and refreshed trust/policy pages. No architecture, routes, ads, analytics, affiliate links, backend, database, auth, CMS, Docker, or RSS work was added.

## MVP/Placeholder Wording Found

### User-Facing Current Content Updated

- Footer still said no ads, affiliate links, analytics, backend, accounts, or CMS were included in an MVP slice.
- Privacy policy described the site as an MVP.
- Affiliate disclosure described current MVP monetization status.
- Contact page still said a public contact channel should be added before public launch.

### Active Docs Updated

- `README.md`
- `package.json`
- `docs/architecture.md`
- `docs/command-map.md`
- `docs/deployment/vercel-launch-checklist.md`
- `docs/deployment/env-vars.md`
- `docs/project-brief.md`
- `docs/image-handling.md`
- `docs/ads-affiliate-patterns.md`
- `docs/monetization-plan.md`
- `docs/patterns-to-follow.md`
- `docs/seo-implementation-patterns.md`
- `docs/features/seo-foundation.md`
- `docs/context/current-status.md`
- `docs/context/project-map.md`
- `apps/web/public/images/articles/README.md`

### Historical References Left Intentionally

Older reports, plans, approvals, classifications, decisions, and `docs/features/mvp-scope.md` may still mention MVP because they document earlier development phases. These were intentionally left unchanged unless they were being used as active current guidance.

## User-Facing Changes Made

- Footer now describes what GameTechGuides publishes instead of describing MVP limitations.
- About page now explains what GameTechGuides is, who it is for, what it covers, and how hands-on/personal opinion content is handled.
- Contact page now avoids pre-launch wording and lists `gametechguides@gmail.com` as the public contact email.
- Privacy policy now uses live-site wording, mentions standard hosting/CDN logs, Cloudinary/local image delivery, and cautious future wording for analytics, ads, embeds, forms, newsletters, and accounts.
- Terms page now includes informational content limitations, recommendation caveats, reader responsibility for purchase/setup decisions, and no piracy/download support.
- Editorial policy now covers clarity/usefulness, hands-on labeling, speculation separation, corrections/updates, and honest AI-assisted workflow wording.
- Affiliate disclosure now states affiliate links are not currently claimed as active and may be added later with clear disclosure.

## Production Status Docs

Current status now says:

- Production site is live at `https://gametechguides.com`.
- Search Console is configured.
- Sitemap/robots are live.
- Published articles are indexable in production when the production environment variables are set.
- Ongoing phase is production content growth, editorial quality, routine SEO checks, and live-site maintenance.
- Ads, analytics, affiliate links, backend, database, auth, CMS, Docker, RSS, and accounts remain deferred unless explicitly implemented.

## Verification

Passed:

- `pnpm --dir apps/web lint`
- `pnpm --dir apps/web typecheck`
- `NEXT_PUBLIC_SITE_URL=https://gametechguides.com VERCEL_ENV=production pnpm --dir apps/web build`

Generated production build output was inspected for:

- `/`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/editorial-policy`
- `/affiliate-disclosure`
- `/articles`
- `/articles/forza-horizon-6-after-10-hours-racing-heaven`
- `/sitemap.xml`
- `/robots.txt`

Confirmed:

- Footer no longer says MVP.
- Checked public pages no longer include active `MVP` / `MVP slice` wording.
- Trust/policy pages use production-ready wording.
- No fake claims were added about ads, analytics, affiliate partnerships, or company/legal status.
- Metadata still uses GameTechGuides.
- Sitemap and robots output use `https://gametechguides.com`.
- Forza article still renders scan-friendly components and owner screenshots in build output.
- BlogPosting and BreadcrumbList JSON-LD parse with no `undefined` or `null` values.

## Verification Deviation

`next start` was attempted for a local HTTP smoke check. The server started, but every request returned `500` because the local `.next/server/webpack-runtime.js` attempted to load vendor chunks from a missing `server/chunks/vendor-chunks` path. This appears to be a local Next.js build artifact/runtime issue unrelated to the wording changes. Static production build generation passed, and the generated HTML/XML artifacts for the requested routes were inspected successfully.

## Remaining Manual Items

- Continue validating representative live article pages with Google Rich Results Test.
- Keep monetization disclosures updated if ads, analytics, or affiliate links are added later.
