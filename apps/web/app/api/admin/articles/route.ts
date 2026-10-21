import { NextResponse } from "next/server";
import { getAdminSecret, isAdminAuthorized } from "@/lib/admin/auth";
import { serializeArticle, validateFrontmatter } from "@/lib/content/frontmatter";
import { compileArticleMdx, toMdxCompileError } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/seo/urls";
import { siteConfig } from "@/lib/site/config";
import { slugify } from "@/lib/utils/slug";

export const runtime = "nodejs";

const ARTICLES_DIR = "apps/web/content/articles";
const DESCRIPTION_MAX_LENGTH = 160;

type FieldErrors = Partial<Record<"title" | "slug" | "body" | "category" | "tags" | "description" | "quickTake", string>>;

type AdminConfig = {
  adminSecret: string;
  githubToken: string;
  githubRepo: string;
  githubBranch: string;
  authorName: string;
};

function readConfig(): AdminConfig | undefined {
  const adminSecret = getAdminSecret();
  const githubToken = process.env.GITHUB_TOKEN?.trim();
  const githubRepo = process.env.GITHUB_REPO?.trim();

  if (!adminSecret || !githubToken || !githubRepo || !/^[\w.-]+\/[\w.-]+$/.test(githubRepo)) {
    return undefined;
  }

  return {
    adminSecret,
    githubToken,
    githubRepo,
    githubBranch: process.env.GITHUB_BRANCH?.trim() || "main",
    authorName: process.env.ADMIN_AUTHOR_NAME?.trim() || siteConfig.author
  };
}

function optionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed === "" ? undefined : trimmed;
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

/** First prose paragraph of the body, collapsed and trimmed to ~160 chars. */
function deriveDescription(body: string): string {
  const paragraph =
    body
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find(
        (block) =>
          block !== "" &&
          !block.startsWith("#") &&
          !block.startsWith("<") &&
          !block.startsWith("import ") &&
          !block.startsWith("```")
      ) ?? "";

  const plain = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= DESCRIPTION_MAX_LENGTH) {
    return plain;
  }

  const cut = plain.slice(0, DESCRIPTION_MAX_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(" ");

  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length).trim()}…`;
}

function parseInput(
  payload: unknown,
  authorName: string
): { frontmatter: ArticleFrontmatter; body: string } | { fields: FieldErrors } {
  if (typeof payload !== "object" || payload === null) {
    return { fields: { title: "Request body must be a JSON object." } };
  }

  const input = payload as Record<string, unknown>;
  const fields: FieldErrors = {};

  const title = optionalString(input.title);
  const slug = optionalString(input.slug);
  const body = typeof input.body === "string" ? input.body.trim() : "";
  const category = optionalString(input.category);
  const description = optionalString(input.description);
  const quickTake = optionalString(input.quickTake);

  if (!title) {
    fields.title = "Title is required.";
  }

  if (!slug) {
    fields.slug = "Slug is required.";
  } else if (slugify(slug) !== slug) {
    fields.slug = "Slug may only contain lowercase letters, numbers, and single hyphens.";
  }

  if (!body) {
    fields.body = "Body is required.";
  }

  if (!category) {
    fields.category = "Category is required.";
  }

  let tags: string[] = [];

  if (!Array.isArray(input.tags) || input.tags.some((tag) => typeof tag !== "string")) {
    fields.tags = "Tags must be an array of strings.";
  } else {
    tags = Array.from(
      new Set((input.tags as string[]).map((tag) => tag.trim()).filter((tag) => tag !== ""))
    );

    if (tags.length === 0) {
      fields.tags = "Add at least one tag.";
    } else if (tags.some((tag) => slugify(tag) === "")) {
      fields.tags = "Every tag must contain at least one letter or number.";
    }
  }

  if (input.description !== undefined && input.description !== null && typeof input.description !== "string") {
    fields.description = "Description must be a string.";
  }

  if (input.quickTake !== undefined && input.quickTake !== null && typeof input.quickTake !== "string") {
    fields.quickTake = "Quick take must be a string.";
  }

  if (Object.keys(fields).length > 0 || !title || !slug || !category) {
    return { fields };
  }

  const resolvedDescription = description ?? deriveDescription(body);

  if (!resolvedDescription) {
    return { fields: { description: "Add a description or start the body with a paragraph of text." } };
  }

  const today = todayIsoDate();

  const frontmatter: ArticleFrontmatter = {
    title,
    slug,
    description: resolvedDescription,
    category,
    tags,
    author: authorName,
    publishedAt: today,
    updatedAt: today,
    quickTake,
    featured: false,
    draft: false,
    seoTitle: title,
    seoDescription: resolvedDescription
  };

  return { frontmatter, body };
}

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "gametechguides-admin"
  };
}

export async function POST(request: Request) {
  const config = readConfig();

  if (!config) {
    return NextResponse.json(
      { error: "Admin publishing is not configured on this deployment." },
      { status: 503 }
    );
  }

  if (!isAdminAuthorized(request, config.adminSecret)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = parseInput(payload, config.authorName);

  if ("fields" in parsed) {
    return NextResponse.json({ error: "Validation failed.", fields: parsed.fields }, { status: 400 });
  }

  const filename = `${parsed.frontmatter.slug}.mdx`;

  let fileContents: string;

  try {
    validateFrontmatter(parsed.frontmatter, filename);
    fileContents = serializeArticle(parsed.frontmatter, parsed.body);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Validation failed." },
      { status: 400 }
    );
  }

  // Compile with the site's own MDX pipeline so a stray `<` or `{` is caught
  // here instead of breaking the production build after the commit lands.
  try {
    await compileArticleMdx(parsed.body);
  } catch (error) {
    const compileError = toMdxCompileError(error);
    const where = compileError.line ? ` (line ${compileError.line})` : "";

    return NextResponse.json(
      {
        error: `MDX did not compile${where}: ${compileError.message}`,
        fields: { body: `Line ${compileError.line ?? "?"}: ${compileError.message}` }
      },
      { status: 400 }
    );
  }

  const contentsUrl = `https://api.github.com/repos/${config.githubRepo}/contents/${ARTICLES_DIR}/${filename}`;
  const headers = githubHeaders(config.githubToken);

  const existing = await fetch(`${contentsUrl}?ref=${encodeURIComponent(config.githubBranch)}`, {
    headers,
    cache: "no-store"
  });

  if (existing.status === 200) {
    return NextResponse.json(
      { error: "An article with this slug already exists.", fields: { slug: "Slug is already taken." } },
      { status: 409 }
    );
  }

  if (existing.status !== 404) {
    return NextResponse.json(
      { error: `GitHub lookup failed (${existing.status}).` },
      { status: 502 }
    );
  }

  const created = await fetch(contentsUrl, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `content: add "${parsed.frontmatter.title}"`,
      content: Buffer.from(fileContents, "utf8").toString("base64"),
      branch: config.githubBranch
    })
  });

  if (!created.ok) {
    const detail = await created.text().catch(() => "");

    return NextResponse.json(
      { error: `GitHub commit failed (${created.status}). ${detail.slice(0, 300)}`.trim() },
      { status: 502 }
    );
  }

  const result = (await created.json()) as { commit?: { html_url?: string } };

  return NextResponse.json({
    ok: true,
    commitUrl: result.commit?.html_url ?? null,
    articleUrl: absoluteUrl(`/articles/${parsed.frontmatter.slug}`)
  });
}
