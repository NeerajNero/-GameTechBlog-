import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-circuit">Not found</p>
      <h1 className="mt-3 text-4xl font-black text-ink">This page is not available.</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        The article may have moved, stayed in draft, or never existed.
      </p>
      <Link
        href="/articles"
        className="mt-8 inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-circuit"
      >
        Browse articles
      </Link>
    </div>
  );
}
