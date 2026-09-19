"use client";

import { motion, type Variants } from "framer-motion";
import { Search, ClipboardCheck, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse the shelf",
    desc: "Search or scroll by category — every item comes with full specs, not just a photo and a price.",
  },
  {
    icon: ClipboardCheck,
    title: "Compare side by side",
    desc: "Open a spec sheet, stack it against alternatives, and know exactly what you're getting.",
  },
  {
    icon: PackageCheck,
    title: "Checkout in minutes",
    desc: "No account walls, no surprise fees. Add to cart and you're done.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.15 },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0">
        <div className="h-[62%] sm:h-[58%] bg-gradient-to-br from-accent to-ink" />
        <div className="h-[38%] sm:h-[42%] bg-paper" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto mb-14 sm:mb-16"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-paper">
            How it works
          </h2>
          <p className="text-paper/80 text-sm sm:text-base mt-3">
            Shelfie helps you shop smarter, every single time
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-14"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={cardVariant}
                className="relative"
              >
                <motion.div
                  variants={badgeVariant}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper border-2 border-accent shadow-sm"
                >
                  <span className="font-display font-bold text-sm text-accent-ink">
                    {i + 1}
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl bg-surface border border-line shadow-md pt-10 pb-7 px-6 text-center h-full flex flex-col items-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-ink mb-5">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-base text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}