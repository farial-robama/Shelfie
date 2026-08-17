"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-20 flex flex-col items-center text-center">
      <span className="font-mono text-xs tracking-widest uppercase text-accent">
        Error
      </span>
      <h1 className="font-display font-bold text-2xl text-ink mt-2">
        Something went wrong loading the catalog
      </h1>
      <p className="text-muted mt-2 max-w-sm">
        The inventory API might be temporarily unavailable.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-ink text-paper font-mono text-sm px-5 py-2.5 hover:bg-accent hover:text-accent-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Try again
      </button>
    </div>
  );
}
