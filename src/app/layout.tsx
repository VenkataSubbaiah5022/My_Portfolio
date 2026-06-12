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
import { SEO_KEYWORDS } from "@/lib/seo";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
  SITE_TAGLINE,
} from "@/lib/site";
import { metadataBase } from "./site";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`;

const siteUrl = getSiteUrl();
const defaultTitle = `${SITE_FULL_NAME} | ${SITE_TAGLINE} | India`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_FULL_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: `${SITE_FULL_NAME} Portfolio`,
  authors: [{ name: SITE_FULL_NAME, url: siteUrl }],
  creator: SITE_FULL_NAME,
  publisher: SITE_FULL_NAME,
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: `${SITE_FULL_NAME} — Developer Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_FULL_NAME} — ${SITE_TAGLINE} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
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
