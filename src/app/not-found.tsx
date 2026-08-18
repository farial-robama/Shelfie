import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-20 flex flex-col items-center text-center">
      <span className="font-mono text-xs tracking-widest uppercase text-accent">
        404
      </span>
      <h1 className="font-display font-bold text-2xl text-ink mt-2">
        We couldn&apos;t find that item
      </h1>
      <p className="text-muted mt-2 max-w-sm">
        It may have been removed from the Shelfie, or the link is off.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-ink text-paper font-mono text-sm px-5 py-2.5 hover:bg-accent hover:text-accent-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to Shelfie
      </Link>
    </div>
  );
}
