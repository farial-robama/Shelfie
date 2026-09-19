"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Most orders ship within 24 hours and arrive in 2–4 business days, depending on your location. We optimize routes to keep transit times well below industry average.",
  },
  {
    q: "Can I return an item?",
    a: "Yes — you have 7 days from delivery to send anything back for a full refund, no restocking fee.",
  },
  {
    q: "Do you ship internationally?",
    a: "Right now we ship within Bangladesh only. International shipping is on our roadmap.",
  },
  {
    q: "Is my payment information secure?",
    a: "All payments are processed through encrypted, PCI-compliant gateways — we never store card details.",
  },
  {
    q: "How do I track my order?",
    a: "Every order gets a tracking link by email as soon as it ships, updated in real time until it's delivered.",
  },
  {
    q: "How do I get started?",
    a: "Just browse the shelf, add what you like to your cart, and check out — no account required.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
      <span className="text-xs font-medium tracking-widest uppercase text-accent">
        FAQ
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink leading-[1.15]">
            Frequently asked
            <br />
            questions
          </h2>
          <p className="text-sm sm:text-base text-muted mt-4 max-w-sm">
            Explore answers to the most common questions from our shoppers and
            partners.
          </p>

          <div className="relative mt-8 rounded-2xl overflow-hidden aspect-[4/3] max-w-md bg-gradient-to-br from-accent-soft to-surface border border-line hidden sm:block">
            <Image
              src="/images/faq.png"
              alt="Shelfie support illustration"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-contain p-6"
            />
          </div>
        </motion.div>

        {/* right */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`border-b border-line last:border-b-0 transition-colors rounded-xl ${
                  isOpen ? "bg-accent-soft/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-5 text-left"
                >
                  <span
                    className={`text-sm sm:text-base transition-colors ${
                      isOpen
                        ? "font-semibold text-ink"
                        : "font-medium text-ink/90"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-muted"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted px-4 sm:px-5 pb-5 leading-relaxed max-w-lg">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
