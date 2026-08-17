import type { ProductData } from "@/lib/types";
import { formatSpecLabel } from "@/lib/api";

export default function SpecTable({ data }: { data: ProductData }) {
  const entries = Object.entries(data).filter(([, value]) => value !== null);

  if (entries.length === 0) {
    return (
      <p className="font-mono text-sm text-muted italic">
        No spec data on file for this item.
      </p>
    );
  }

  return (
    <dl className="divide-y divide-line border border-line rounded-xl bg-surface overflow-hidden">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center justify-between gap-4 px-5 py-3"
        >
          <dt className="font-mono text-xs uppercase tracking-wide text-muted">
            {formatSpecLabel(key)}
          </dt>
          <dd className="font-mono text-sm text-ink text-right">
            {String(value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
