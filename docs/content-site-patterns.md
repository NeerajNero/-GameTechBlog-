# Content Site Patterns

## Page Patterns

- Homepage: featured article, recent articles, category entry points, and personal brand signal.
- Article index: searchable or filterable later; simple chronological list first.
- Article detail: title, description, date, author, cover image, quick take, scan-friendly body, optional read-more sections, verdict where relevant, related articles.
- Category page: category description, best articles, all articles in category.
- Tag page: focused list for narrow topics.
- About page: author credibility and site purpose.
- Contact page: collaboration and correction path.
- Policy pages: privacy and affiliate disclosure.

## Article Page Pattern

Recommended order:

1. Category and publish/update date.
2. Title.
3. Description.
4. Author.
5. Cover image.
6. Short intro.
7. `<ArticleQuickTake>` for most articles.
8. Main visible summary, recommendation, or argument.
9. `<ArticleImage>` for owner screenshots or other safe article media when relevant.
10. `<ArticleReadMore>` sections for deeper details, caveats, or optional context.
11. `<ArticleVerdict>` for reviews, opinions, and impressions.
12. Related articles.
13. Social follow/share block if useful.

## Scan-Friendly MDX Component Pattern

- Use `<ArticleQuickTake>` near the top for concise bullets and a bottom-line verdict.
- Use `<ArticleHighlight>` sparingly for important inline phrases only.
- Use `<ArticlePullQuote>` at most once per article for one strong opinion or takeaway line.
- Use `<ArticleImage>` for screenshots with honest alt text, caption, and credit.
- Use `<ArticleReadMore>` when deeper sections should be available without making the first read feel heavy.
- Use `<ArticleVerdict>` for reviews, opinions, and impressions when a clear final take helps the reader.
- Do not hide the entire article behind collapsible sections.
- Keep enough useful content visible before any expandable sections.
- Avoid overusing highlights, pull quotes, or read-more sections.
- Keep sections short, human, helpful, and not thin.

## Content Helper Pattern

Keep file parsing in one layer:

- Load all MDX files.
- Parse frontmatter.
- Validate required fields.
- Filter drafts.
- Sort by publish/update date.
- Resolve categories and tags.
- Build related articles.

Pages should call helpers instead of reading files directly.

## Draft Pattern

- Drafts are allowed in the repository.
- Drafts must not appear in production lists, feeds, sitemap, or related article blocks.
- Draft previews can be added later if needed.

## Asset Pattern

- Store repo-managed site assets under `apps/web/public/`.
- Store article/media assets in Cloudinary after manual upload.
- Use Cloudinary folder paths like `gaming-tech-blog/articles/<article-slug>/cover.webp`.
- Track article cover image URL, alt text, and credit in frontmatter.
- Prefer original screenshots/photos created by the site owner over generic visuals.
- If no safe image exists, leave the fallback UI instead of using risky copyrighted images.
