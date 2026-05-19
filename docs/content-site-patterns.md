# Content Site Patterns

## Page Patterns

- Homepage: featured article, recent articles, category entry points, and personal brand signal.
- Article index: searchable or filterable later; simple chronological list first.
- Article detail: title, description, date, author, cover image, table of contents, body, related articles.
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
6. Affiliate disclosure if needed.
7. Table of contents when article is long.
8. Article body.
9. Related articles.
10. Social follow/share block if useful.

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
