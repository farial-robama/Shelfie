"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 1200, suffix: "+", label: "products listed" },
  { value: 98, suffix: "%", label: "in-stock accuracy" },
  { value: 24, suffix: "h", label: "avg. dispatch time" },
];

export default function StatsCTA() {
  return (
    <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 sm:px-12 sm:py-16"
      >
     
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-3xl sm:text-4xl text-paper">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-paper/60 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-paper/80 text-sm max-w-xs">
              Ready to see what's on the shelf today?
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-paper text-ink text-sm font-medium px-5 py-3 hover:bg-accent hover:text-paper transition-colors shrink-0"
            >
              Start browsing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}