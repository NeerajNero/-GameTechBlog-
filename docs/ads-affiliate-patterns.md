# Ads And Affiliate Patterns

## Disclosure Pattern

Every article with affiliate links should include a short disclosure near the first affiliate link or before product recommendations. Keep it clear and plain.

Example:

```text
This article may contain affiliate links. If you buy through these links, the site may earn a commission at no extra cost to you.
```

## Affiliate Placement Pattern

Use affiliate links where they help the reader:

- Product name in a recommendation.
- Comparison table action cell.
- "Best for" section.
- Setup checklist item.

Avoid placing affiliate links in every mention of a product.

## Product Table Pattern

Useful columns:

- Product/use case.
- Best for.
- Key strengths.
- Watch out for.
- India-specific note.
- Link.

## Ad Placement Pattern

AdSense is wired but env-gated (2026-08-18): the loader script and `/ads.txt` activate only when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set in Vercel (see `apps/web/lib/site/adsense.ts`). Prefer Auto ads first after approval. If manual placements come later, use these positions:

- After the intro.
- Between major article sections.
- Before related articles.
- Desktop sidebar if the layout supports it.

Ads should not hide the answer, create layout shift, or make mobile reading feel cramped.

## Trust Rules

- Label sponsored or affiliate content.
- Keep recommendations current.
- Do not recommend a product only because it has an affiliate program.
- Mention drawbacks.
- Include India-specific constraints when relevant.
