import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Catalog — object inventory",
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
        <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-30">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-baseline gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
            >
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                Catalog
              </span>
              <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
                Inventory №
              </span>
            </Link>
            <a
              href="https://restful-api.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block font-mono text-xs text-muted hover:text-ink transition-colors"
            >
              source: restful-api.dev ↗
            </a>
          </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-line mt-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted font-mono">
            <p>Live data pulled from api.restful-api.dev/objects</p>
            <p>Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
