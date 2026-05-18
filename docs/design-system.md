# Design System

## Direction

The site should feel like a practical gaming and tech publication, not a SaaS dashboard and not a generic personal blog. It should prioritize readability, scanning, trust, and fast article discovery.

## Design Principles

- Content first: article titles, summaries, categories, and publish dates should be easy to scan.
- Practical gaming identity: use hardware, performance, cooling, controllers, displays, and gaming platforms as visual cues.
- Fast reading: generous line height, strong headings, clear tables, and readable code/config snippets.
- Monetization-ready: layouts should have places for affiliate disclosures, product comparison tables, and future ad slots without crowding the article.
- Mobile-first: many readers will come from social and search on phones.

## Visual Style

- Use a restrained dark or light editorial theme; avoid a one-note neon gaming look.
- Prefer high contrast text and clear hierarchy.
- Use accent colors sparingly for categories, links, callouts, and comparison highlights.
- Keep cards at 8px radius or less.
- Avoid decorative gradient blobs, oversized marketing sections, and generic stock-style visuals.

## Typography

- Article body text must be comfortable for long reading.
- Headings should be direct and scannable.
- Avoid viewport-scaled font sizes.
- Do not use negative letter spacing.
- Use compact headings inside cards and lists.

## Components Needed Later

- Site header with category navigation.
- Article card.
- Featured article block.
- Category badge.
- Tag list.
- Article header.
- Table of contents.
- Pros/cons block.
- Product comparison table.
- Affiliate disclosure callout.
- Related articles.
- Newsletter/social follow block if needed later.
- Footer with policy links.

## shadcn/ui Position

shadcn/ui is planned later, not during documentation setup. Add it only when the Next.js app exists and the first components need stable primitives such as button, badge, tabs, table, accordion, or dialog.

## Accessibility

- Maintain readable color contrast.
- Use semantic headings in article content.
- Images need useful alt text.
- Links must be visually identifiable.
- Tables need meaningful headings.
- Avoid UI text overlap across mobile and desktop.
