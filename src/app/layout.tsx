import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import {
  Boxes,
  ArrowUpRight,
  Code2,
  Search,
  Mail,
  Camera,
  MessageSquare,
  SquareUser,
} from "lucide-react";
import NavLinks from "@/components/NavLinks";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Shelfie — object inventory",
  description:
    "A small storefront cataloging live inventory from the restful-api.dev objects API.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <div className="bg-accent text-white text-center text-xs font-medium py-2 px-4">
          Free shipping on orders over $50 · New arrivals every week
        </div>

        <header className="border-b border-line bg-paper/90 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-lg shrink-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper group-hover:bg-accent transition-colors">
                <Boxes className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg tracking-tight text-ink">
                  Shelfie
                </span>
                <span className="text-[11px] text-muted mt-0.5">
                  Live object inventory
                </span>
              </span>
            </Link>

            <NavLinks />

            <nav className="flex items-center gap-2 shrink-0">
              <Link
                href="/products"
                aria-label="Search catalog"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-ink hover:border-ink/30 transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink text-paper text-sm font-medium px-4 py-2 hover:bg-accent transition-colors"
              >
                Shop now
              </Link>
            </nav>
          </div>

          <div className="md:hidden border-t border-line">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <NavLinks />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="mt-16 bg-ink text-paper/80">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
                  <Boxes className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="font-display font-bold text-paper">
                  Shelfie
                </span>
              </div>
              <p className="text-sm text-paper/60 max-w-xs">
                A well-stocked shelf, updated weekly — home, tech, and everyday
                finds, browsed without the noise.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:text-white hover:border-paper/30 transition-colors"
                >
                  <Camera className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter / X"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:text-white hover:border-paper/30 transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 hover:text-white hover:border-paper/30 transition-colors"
                >
                  <SquareUser className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-paper/40 mb-3">
                Shop
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/products"
                    className="text-paper/70 hover:text-white transition-colors"
                  >
                    All products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-paper/70 hover:text-white transition-colors"
                  >
                    New arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-paper/70 hover:text-white transition-colors"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-paper/40 mb-3">
                Company
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-paper/70 hover:text-white transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <a
                    href="https://restful-api.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-paper/70 hover:text-white transition-colors"
                  >
                    API documentation
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-paper/70 hover:text-white transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    View source
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-paper/40 mb-3">
                Stay in the loop
              </p>
              <p className="text-sm text-paper/60 mb-3">
                New arrivals and restocks, once a week, no spam.
              </p>
              <form className="flex items-center gap-2">
                <div className="flex items-center flex-1 rounded-full border border-paper/15 bg-white/5 px-3.5 py-1">
                  <Mail className="h-3.5 w-3.5 text-paper/40 shrink-0" />
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full bg-transparent border-0 outline-none text-sm text-white placeholder:text-paper/40 px-2.5 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-accent text-white text-xs font-medium px-4 py-2.5 hover:bg-accent-ink transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-paper/10">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-paper/40">
              <p>
                © {new Date().getFullYear()} Shelfie · Not affiliated with
                restful-api.dev
              </p>
              <div className="flex items-center gap-4">
                <span>Data source: api.restful-api.dev/objects</span>
                <span className="hidden sm:inline">
                  Built with Next.js &amp; Tailwind CSS
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
