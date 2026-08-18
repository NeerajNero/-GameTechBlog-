---
name: adsense-compliance
description: AdSense readiness and policy-compliance checklist for GameTechGuides — required pages, privacy disclosures, ads.txt, consent, content quality, and the env-gated activation steps. Use before applying to AdSense, before enabling ads, when adding monetization features, or when auditing the site against Google publisher policies.
---

# AdSense Compliance

Use this skill for any monetization task: applying to AdSense, activating ads, adding affiliate links, or auditing policy compliance. Monetization changes are ALWAYS the "risky" lane in `docs/flow-policy.md`.

## How AdSense is wired in this repo (since 2026-08-18)

- `apps/web/lib/site/adsense.ts` — reads `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-...`), validates it, and gates everything.
- `apps/web/app/layout.tsx` — injects the AdSense loader `<Script>` on every page ONLY when the env var is set.
- `apps/web/app/ads.txt/route.ts` — serves `google.com, pub-..., DIRECT, f08c47fec0942fa0` when configured, 404 otherwise.
- With the env var unset, the site ships zero ad code. Do not hardcode publisher IDs in components.

## Activation steps (application time)

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX` in Vercel production env.
2. Redeploy; confirm the script appears in page source and `https://gametechguides.com/ads.txt` serves the entry.
3. Apply in AdSense with the site URL; keep publishing while under review.
4. In AdSense **Privacy & messaging**, enable the GDPR consent message (required for EEA/UK visitors) and the US state privacy message. No code changes needed — Google's CMP is delivered by the AdSense tag.
5. After approval, prefer Auto ads initially; revisit manual placements per `docs/ads-affiliate-patterns.md` (never before the intro answer, no layout shift, no cramped mobile reading).

## Pre-application checklist

- **Required pages live and linked in footer**: privacy policy, terms, about, contact, editorial policy, affiliate disclosure. ✔ exist under `apps/web/app/`.
- **Privacy policy** must disclose: third-party vendors incl. Google use cookies to serve ads based on prior visits; opt-outs at Google Ads Settings and aboutads.info/choices; link to Google's partner-sites policy; EEA consent note. The current page (rewritten 2026-08-18) covers this — keep it accurate if features change.
- **Content quality** (top rejection reason is "low value content"): every published article substantive (target 900+ words for guides), original, with honest images. No placeholder pages, no "coming soon", no thin tag/category pages full of one article if avoidable. More quality articles before applying is the single best lever.
- **Prohibited content scan**: no piracy/cracks/ROM sources, no adult content, no violent-extremism, no misleading health/finance claims. Gaming violence in editorial context is fine.
- **Technical**: site indexable in production (needs `VERCEL_ENV=production` + `NEXT_PUBLIC_SITE_URL` — see `lib/seo/urls.ts`), sitemap and robots live, no broken nav, fast mobile rendering.
- **Ownership**: apply with the root domain `gametechguides.com`; the applicant account must own it.

## Affiliate rules (if/when added)

In-article disclosure near the first affiliate link, plus the site-wide affiliate-disclosure page. Follow `docs/ads-affiliate-patterns.md`. Never let affiliate density outweigh usefulness.

## After any monetization change

Update `docs/context/current-status.md`, keep the privacy policy truthful to what actually loads, and run the full verification: lint, typecheck, production-env build, smoke checks including `/ads.txt` and `/privacy-policy`.
