import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

// Premium editorial font for special accents
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.siteName || "STUDIO";
  const tagline = siteSettings?.siteTagline || "Creative Design Agency";
  const description = siteSettings?.siteDescription ||
    "Award-winning creative design agency crafting premium digital experiences. We specialize in UI/UX design, web development, and brand identity.";

  return {
    title: {
      default: `${siteName} | ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "UI/UX Design",
      "Web Design",
      "Product Design",
      "Brand Identity",
      "Digital Agency",
      "Creative Studio",
    ],
    authors: [{ name: siteName }],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteName,
      title: `${siteName} | ${tagline}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | ${tagline}`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
