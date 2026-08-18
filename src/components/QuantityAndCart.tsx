"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";

export default function QuantityAndCart() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full border border-line overflow-hidden shrink-0">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="h-11 w-10 flex items-center justify-center text-ink hover:bg-paper transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center text-sm font-medium text-ink tabular-nums">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="h-11 w-10 flex items-center justify-center text-ink hover:bg-paper transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium px-5 py-3 transition-colors duration-300 ${
          added
            ? "bg-accent-soft text-accent-ink"
            : "bg-ink text-paper hover:bg-accent"
        }`}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added to bag
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Add to bag
          </>
        )}
      </button>
    </div>
  );
}