import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { Boxes, ArrowUpRight, Code2 } from "lucide-react";
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
    "A small storefront Shelfieing live inventory from the restful-api.dev objects API.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <header className="border-b border-line bg-paper/90 backdrop-blur-md sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper group-hover:bg-accent group-hover:text-accent-ink transition-colors">
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

            <nav className="flex items-center gap-2">
              <a
                href="https://restful-api.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted hover:text-ink hover:border-ink/30 transition-colors"
              >
                restful-api.dev
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-ink hover:border-ink/30 transition-colors"
              >
                <Code2 className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="border-t border-line mt-16 bg-surface/60">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-paper">
                  <Boxes className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="font-display font-bold text-ink">Shelfie</span>
              </div>
              <p className="text-sm text-muted max-w-xs">
                A small storefront demo built to browse a live product
                inventory, with no backend of its own.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">
                Navigate
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-ink/80 hover:text-accent transition-colors"
                  >
                    All items
                  </Link>
                </li>
                <li>
                  <a
                    href="https://restful-api.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/80 hover:text-accent transition-colors"
                  >
                    API documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">
                About this build
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li>Data source: api.restful-api.dev/objects</li>
                <li>Built with Next.js &amp; Tailwind CSS</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-line">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
              <p>© {new Date().getFullYear()} Shelfie</p>
              <p>Not affiliated with restful-api.dev</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
