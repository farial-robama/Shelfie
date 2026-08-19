"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Nair",
    role: "Early tester",
    quote:
      "Spec sheets made it easy to actually compare items instead of guessing which one fit what I needed.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Early tester",
    quote:
      "Category browsing is clean — I could see everything in one place instead of scrolling through one long list.",
    rating: 5,
  },
  {
    name: "Elena Torres",
    role: "Early tester",
    quote:
      "Search actually understands specs, not just product names. Typed a color and it found what I meant.",
    rating: 4,
  },
  {
    name: "Jamal Ibrahim",
    role: "Early tester",
    quote:
      "No clutter, no popups fighting for attention. Just the shelf and what's on it.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  function goTo(i: number) {
    setIndex(((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section
      className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-xs font-medium tracking-widest uppercase text-accent">
            Shopper feedback
          </span>
          <h2 className="font-display font-bold text-xl text-ink mt-1">
            What people are saying
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-ink hover:border-ink/30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-ink hover:border-ink/30 transition-colors"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl border border-line testimonial-gradient overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="w-full shrink-0 px-6 sm:px-10 py-10 sm:py-12 flex flex-col items-center text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/70 backdrop-blur text-accent-ink mb-5 shadow-sm">
                <Quote className="h-4.5 w-4.5" strokeWidth={2} />
              </div>
              <p className="font-display font-bold text-lg sm:text-xl text-ink max-w-xl leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-0.5 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < t.rating ? "text-accent fill-accent" : "text-line fill-line"
                    }`}
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-ink mt-4">{t.name}</p>
              <p className="text-xs text-muted mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-center gap-3 mt-5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-muted"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-1.5">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-accent" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-muted"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="hidden sm:flex items-center justify-center gap-1.5 mt-5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-accent" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </section>
  );
}