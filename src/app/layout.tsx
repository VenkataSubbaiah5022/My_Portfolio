import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/components/Analytics";
import { CommandPaletteRoot } from "@/components/CommandPaletteRoot";
import { CursorFollower } from "@/components/CursorFollower";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { metadataBase } from "./site";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Aitha Venkata Subbaiah | Full Stack Developer",
    template: "%s | Aitha",
  },
  description:
    "Full Stack Developer portfolio — scalable web apps, AI-powered products, IoT platforms, and production APIs with React, Next.js, Node.js, and TypeScript.",
  keywords: [
    "Full Stack Developer",
    "Aitha Venkata Subbaiah",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Aitha Venkata Subbaiah Setty" }],
  openGraph: {
    title: "Aitha Venkata Subbaiah | Full Stack Developer",
    description:
      "Building scalable web applications, AI-powered products, and modern user experiences.",
    type: "website",
    locale: "en_IN",
    siteName: "Aitha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aitha Venkata Subbaiah | Full Stack Developer",
    description:
      "Full Stack Developer portfolio with production projects, experience, and recommendations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Analytics />
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgressBar />
            <ScrollToTopButton />
            <CursorFollower />
            <CommandPaletteRoot />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
