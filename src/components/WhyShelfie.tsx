"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCcw, Headset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const leftPerks = [
  {
    icon: ShieldCheck,
    title: "Verified sellers",
    desc: "Every listing is checked before it goes live — no ghost inventory.",
  },
  {
    icon: RefreshCcw,
    title: "Easy 7-day returns",
    desc: "Changed your mind? Send it back within a week, no questions asked.",
  },
];

const rightPerks = [
  {
    icon: Truck,
    title: "Fast, tracked delivery",
    desc: "Most orders dispatch within 24 hours with live tracking.",
  },
  {
    icon: Headset,
    title: "Real human support",
    desc: "Chat with our team anytime — no bots reading from a script.",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

function PerkItem({
  icon: Icon,
  title,
  desc,
  align,
}: {
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "left"
          ? "items-start sm:items-end text-left sm:text-right"
          : "items-start text-left"
      }`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent-ink mb-3">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-semibold text-sm sm:text-base text-ink">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed max-w-[220px]">
        {desc}
      </p>
    </div>
  );
}

export default function WhyShelfie() {
  return (
    <section className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-20">
      <div className="relative rounded-2xl border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16 overflow-hidden">
    
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-line) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
            maskImage:
              "radial-gradient(circle at center, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 0%, transparent 75%)",
          }}
        />

        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp()}
            className="text-center max-w-lg mx-auto mb-10 sm:mb-14"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Why choose <span className="italic text-accent-ink">Shelfie</span>?
            </h2>
            <p className="text-sm sm:text-base text-muted mt-3">
              From everyday finds to big purchases, we've got your shopping
              covered with a shelf you can trust.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-10 sm:gap-6 items-center">
            {/* left perks */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              {leftPerks.map((perk, i) => (
                <motion.div key={perk.title} variants={fadeUp(i * 0.1)}>
                  <PerkItem {...perk} align="left" />
                </motion.div>
              ))}
            </motion.div>

            {/* center image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative mx-auto"
            >
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl bg-accent/20" />
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-2xl overflow-hidden border border-line">
                <Image
                  src="https://media.istockphoto.com/id/2247342278/photo/workspace-elements-creatively-arranged-in-a-floating-design-for-modern-productivity-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=b26e4r_wNY3xddqp2x2l_e1-G_7SuTRMy-cLYzCi4RE="
                  alt="Shelfie curated products"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* right perks */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col gap-8 sm:gap-10"
            >
              {rightPerks.map((perk, i) => (
                <motion.div key={perk.title} variants={fadeUp(i * 0.1)}>
                  <PerkItem {...perk} align="right" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center mt-12 sm:mt-14"
          >
            <Link
              href="/products"
              className="rounded-full bg-accent text-paper text-sm font-semibold px-6 py-3.5 hover:bg-ink transition-colors"
            >
              Start browsing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}