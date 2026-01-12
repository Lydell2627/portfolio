import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "STUDIO | Creative Design Agency",
    template: "%s | STUDIO",
  },
  description:
    "Award-winning creative design agency crafting premium digital experiences. We specialize in UI/UX design, web development, and brand identity.",
  keywords: [
    "UI/UX Design",
    "Web Design",
    "Product Design",
    "Brand Identity",
    "Digital Agency",
    "Creative Studio",
  ],
  authors: [{ name: "STUDIO" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "STUDIO",
    title: "STUDIO | Creative Design Agency",
    description:
      "Award-winning creative design agency crafting premium digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO | Creative Design Agency",
    description:
      "Award-winning creative design agency crafting premium digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
