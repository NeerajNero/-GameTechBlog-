"use client";

import { useEffect, useState, type FormEvent } from "react";
import { slugify } from "@/lib/utils/slug";

const OTHER_CATEGORY = "__other__";
const DRAFT_STORAGE_KEY = "gtg-admin-new-article-draft";
const SECRET_STORAGE_KEY = "gtg-admin-secret";

type FormState = {
  title: string;
  slug: string;
  slugEdited: boolean;
  category: string;
  customCategory: string;
  tagsInput: string;
  description: string;
  quickTake: string;
  body: string;
};

type FieldErrors = Partial<Record<keyof FormState | "tags", string>>;

type SuccessResult = {
  commitUrl: string | null;
  articleUrl: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  slugEdited: false,
  category: "",
  customCategory: "",
  tagsInput: "",
  description: "",
  quickTake: "",
  body: ""
};

const inputClass =
  "mt-1.5 block w-full min-h-[44px] rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-ink shadow-sm placeholder:text-slate-400 focus:border-circuit focus:outline-none focus:ring-2 focus:ring-circuit/30";
const labelClass = "block text-sm font-bold text-ink";
const errorClass = "mt-1.5 text-sm font-semibold text-pulse";

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Storage can be unavailable (private mode); the form still works without it.
  }
}

function parseTags(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    )
  );
}

export function ArticleForm({
  categories,
  tags,
  siteUrl
}: {
  categories: string[];
  tags: string[];
  siteUrl: string;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [restored, setRestored] = useState(false);
  const [hasSecret, setHasSecret] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessResult | null>(null);

  // Restore an autosaved draft and secret presence after hydration.
  useEffect(() => {
    const saved = readStorage(DRAFT_STORAGE_KEY);

    if (saved) {
      try {
        setForm({ ...emptyForm, ...(JSON.parse(saved) as Partial<FormState>) });
      } catch {
        writeStorage(DRAFT_STORAGE_KEY, null);
      }
    }

    setHasSecret(Boolean(readStorage(SECRET_STORAGE_KEY)));
    setRestored(true);
  }, []);

  // Autosave every change so a reload on the phone does not lose the post.
  useEffect(() => {
    if (!restored || success) {
      return;
    }

    writeStorage(DRAFT_STORAGE_KEY, JSON.stringify(form));
  }, [form, restored, success]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slugEdited ? current.slug : slugify(value)
    }));
  }

  function handleSlugChange(value: string) {
    setForm((current) => ({
      ...current,
      slug: value.toLowerCase(),
      slugEdited: value !== ""
    }));
  }

  function addTag(tag: string) {
    setForm((current) => {
      const existing = parseTags(current.tagsInput);

      if (existing.includes(tag)) {
        return current;
      }

      return { ...current, tagsInput: [...existing, tag].join(", ") };
    });
  }

  function forgetSecret() {
    writeStorage(SECRET_STORAGE_KEY, null);
    setHasSecret(false);
  }

  function resolveSecret(): string | null {
    const stored = readStorage(SECRET_STORAGE_KEY);

    if (stored) {
      return stored;
    }

    const entered = window.prompt("Enter the admin secret to publish:");
    const trimmed = entered?.trim() ?? "";

    if (!trimmed) {
      return null;
    }

    writeStorage(SECRET_STORAGE_KEY, trimmed);
    setHasSecret(true);

    return trimmed;
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
    setFormError(null);
    setSuccess(null);
    writeStorage(DRAFT_STORAGE_KEY, null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) {
      return;
    }

    setErrors({});
    setFormError(null);

    const secret = resolveSecret();

    if (!secret) {
      setFormError("The admin secret is required to publish.");
      return;
    }

    const category =
      form.category === OTHER_CATEGORY ? form.customCategory.trim() : form.category;

    setPending(true);

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`
        },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim(),
          body: form.body,
          category,
          tags: parseTags(form.tagsInput),
          description: form.description.trim() || undefined,
          quickTake: form.quickTake.trim() || undefined
        })
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
        commitUrl?: string | null;
        articleUrl?: string;
      };

      if (response.status === 401) {
        forgetSecret();
        setFormError("The admin secret was rejected. Submit again to enter it.");
        return;
      }

      if (!response.ok || !data.ok || !data.articleUrl) {
        setErrors(data.fields ?? {});
        setFormError(data.error ?? `Publishing failed (${response.status}).`);
        return;
      }

      writeStorage(DRAFT_STORAGE_KEY, null);
      setSuccess({ commitUrl: data.commitUrl ?? null, articleUrl: data.articleUrl });
    } catch {
      setFormError("Network error. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <section className="rounded-xl border border-circuit/30 bg-white p-5 shadow-soft">
        <p className="text-sm font-black uppercase tracking-wide text-circuit">Published</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Article committed</h2>
        <p className="mt-3 leading-7 text-slate-600">
          The MDX file is in the repository. The article goes live once Vercel finishes
          building, usually within a few minutes.
        </p>
        <ul className="mt-4 space-y-2 text-base">
          {success.commitUrl ? (
            <li>
              <a
                href={success.commitUrl}
                className="inline-flex min-h-[44px] items-center font-bold text-circuit underline underline-offset-4 hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                View commit
              </a>
            </li>
          ) : null}
          <li>
            <a
              href={success.articleUrl}
              className="inline-flex min-h-[44px] items-center font-bold text-circuit underline underline-offset-4 hover:text-ink"
            >
              {success.articleUrl}
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-md border border-slate-300 bg-white px-4 text-base font-bold text-ink hover:border-circuit/40 hover:text-circuit"
        >
          Write another
        </button>
      </section>
    );
  }

  const articleUrl = `${siteUrl}/articles/${form.slug || "your-slug"}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError ? (
        <div role="alert" className="rounded-md border border-pulse/40 bg-pulse/5 px-4 py-3 text-sm font-semibold text-pulse">
          {formError}
        </div>
      ) : null}

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={form.title}
          onChange={(event) => handleTitleChange(event.target.value)}
          className={inputClass}
          autoComplete="off"
        />
        {errors.title ? <p className={errorClass}>{errors.title}</p> : null}
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={form.slug}
          onChange={(event) => handleSlugChange(event.target.value)}
          className={`${inputClass} font-mono`}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          inputMode="url"
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
        />
        <p className="mt-1.5 break-all text-sm text-slate-500">{articleUrl}</p>
        {errors.slug ? <p className={errorClass}>{errors.slug}</p> : null}
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          value={form.category}
          onChange={(event) => update("category", event.target.value)}
          className={inputClass}
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value={OTHER_CATEGORY}>Other…</option>
        </select>
        {form.category === OTHER_CATEGORY ? (
          <input
            type="text"
            name="customCategory"
            aria-label="New category name"
            placeholder="New category name"
            value={form.customCategory}
            onChange={(event) => update("customCategory", event.target.value)}
            className={inputClass}
            autoComplete="off"
          />
        ) : null}
        {errors.category ? <p className={errorClass}>{errors.category}</p> : null}
      </div>

      <div>
        <label htmlFor="tags" className={labelClass}>
          Tags <span className="font-normal text-slate-500">(comma-separated)</span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={form.tagsInput}
          onChange={(event) => update("tagsInput", event.target.value)}
          className={inputClass}
          autoComplete="off"
          placeholder="PC gaming, Steam, Storage"
        />
        {errors.tags ? <p className={errorClass}>{errors.tags}</p> : null}
        {tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Existing tags">
            {tags.map((tag) => {
              const selected = parseTags(form.tagsInput).includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={selected}
                  className={`min-h-[44px] rounded-md border px-3 text-sm font-semibold transition ${
                    selected
                      ? "border-circuit/40 bg-circuit/10 text-circuit"
                      : "border-slate-200 bg-white text-slate-600 hover:border-circuit/40 hover:text-circuit"
                  }`}
                >
                  {selected ? `✓ ${tag}` : tag}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description <span className="font-normal text-slate-500">(optional, defaults to the first paragraph)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={(event) => update("description", event.target.value)}
          className={inputClass}
        />
        {errors.description ? <p className={errorClass}>{errors.description}</p> : null}
      </div>

      <div>
        <label htmlFor="quickTake" className={labelClass}>
          Quick take <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <textarea
          id="quickTake"
          name="quickTake"
          rows={3}
          value={form.quickTake}
          onChange={(event) => update("quickTake", event.target.value)}
          className={inputClass}
        />
        {errors.quickTake ? <p className={errorClass}>{errors.quickTake}</p> : null}
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Body <span className="font-normal text-slate-500">(MDX)</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          value={form.body}
          onChange={(event) => update("body", event.target.value)}
          className={`${inputClass} min-h-[50vh] font-mono leading-6`}
          autoCapitalize="sentences"
          spellCheck
        />
        {errors.body ? <p className={errorClass}>{errors.body}</p> : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-circuit px-5 text-base font-black text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Publishing…" : "Publish article"}
        </button>
        {hasSecret ? (
          <button
            type="button"
            onClick={forgetSecret}
            className="inline-flex min-h-[44px] items-center justify-center text-sm font-bold text-slate-500 underline underline-offset-4 hover:text-pulse"
          >
            Forget secret
          </button>
        ) : null}
      </div>
    </form>
  );
}
