import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Database, Code2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Shelfie",
  description:
    "What Shelfie is, how it's built, and where its data comes from.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl w-full px-5 sm:px-8 py-14 sm:py-20">
      <span className="text-xs font-medium tracking-widest uppercase text-accent">
        About this project
      </span>

      <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mt-2">
        A frontend, doing one job well.
      </h1>

      <p className="text-muted text-base sm:text-lg mt-4 max-w-xl">
        Shelfie is a small e-commerce-style catalog. It has no backend, no
        database, and no admin panel — it exists to show what a clean,
        well-built frontend looks like on top of a public API.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
        {/* Data source */}
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink mb-3">
            <Database className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>

          <h2 className="font-display font-bold text-sm text-ink">
            Where the data comes from
          </h2>

          <p className="text-sm text-muted mt-1.5">
            Every product listed is fetched live from{" "}
            <a
              href="https://restful-api.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              restful-api.dev
            </a>
            , a free public sandbox API. Nothing is stored on our end.
          </p>
        </div>

        {/* How it's built */}
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink mb-3">
            <Code2 className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>

          <h2 className="font-display font-bold text-sm text-ink">
            How it&apos;s built
          </h2>

          <p className="text-sm text-muted mt-1.5">
            Next.js (App Router) and TypeScript, styled with Tailwind CSS,
            with Framer Motion for the catalog&apos;s reveal animation.
          </p>
        </div>

        {/* Photos */}
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent-ink mb-3">
            <ShieldCheck className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>

          <h2 className="font-display font-bold text-sm text-ink">
            An honest note on photos
          </h2>

          <p className="text-sm text-muted mt-1.5">
            The API doesn&apos;t provide product images, so each item shows a
            representative photo for its category rather than an exact
            product shot.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-ink text-paper p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-lg">
            Curious what&apos;s in stock?
          </h2>

          <p className="text-sm text-paper/70 mt-1">
            The full catalog updates as the source API changes.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-paper text-ink text-sm font-medium px-5 py-2.5 hover:bg-accent hover:text-accent-ink transition-colors w-fit shrink-0"
        >
          Browse products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}