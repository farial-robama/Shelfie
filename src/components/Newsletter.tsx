"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const logos = ["TechRadar", "Gadgetly", "HomeSpec", "Reviewed", "DailyPick"];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
      <div className="rounded-2xl bg-surface border border-line overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* image, left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative h-64 sm:h-80 lg:h-full lg:min-h-[420px]"
          >
            <Image
              src="https://media.istockphoto.com/id/2208521424/photo/multiethnic-group-of-office-colleagues-discussing-internet-marketing-strategy.webp?a=1&b=1&s=612x612&w=0&k=20&c=djVkmHSSQvakgsJD61oUCV9Q13VXrDJJ-a6tVKU0H50="
              alt="Team browsing Shelfie together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* content, right */}
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="text-xs font-medium tracking-widest uppercase text-accent">
                Newsletter
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-sm sm:text-base text-muted mt-3 max-w-sm">
                Get restock alerts, price drops, and first access to new
                arrivals — straight to your inbox.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-7 text-sm font-medium text-accent-ink"
                >
                  You're on the list — check your inbox to confirm.
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-7 max-w-sm"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="flex-1 rounded-full border border-line bg-paper px-5 py-3.5 text-sm text-ink placeholder:text-muted outline-none focus:border-ink/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-paper text-sm font-medium px-5 py-3.5 hover:bg-accent transition-colors shrink-0 whitespace-nowrap"
                  >
                    Subscribe Now
                    <span aria-hidden>→</span>
                  </button>
                </form>
              )}

              <p className="text-xs text-muted mt-5 italic max-w-sm">
                "Your information will never be shared with third parties,
                and you can unsubscribe from our updates at any time."
              </p>
            </motion.div>

            {/* logo strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-9 pt-7 border-t border-line"
            >
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="text-sm font-semibold text-muted/60 tracking-wide"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}