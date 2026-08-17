export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 py-10 sm:py-14">
      <div className="h-4 w-28 rounded-full bg-line/60 animate-pulse mb-3" />
      <div className="h-9 w-2/3 max-w-md rounded-lg bg-line/60 animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl border border-line bg-surface animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
