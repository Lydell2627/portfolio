import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "STUDIO | Creative Design Agency",
    template: "%s | STUDIO",
  },
  description:
    "A creative design agency crafting premium digital experiences. We specialize in UI/UX design, web development, and brand identity.",
  keywords: [
    "UI/UX Design",
    "Web Design",
    "Product Design",
    "Brand Identity",
    "Digital Agency",
  ],
  authors: [{ name: "STUDIO" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "STUDIO",
    title: "STUDIO | Creative Design Agency",
    description:
      "A creative design agency crafting premium digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO | Creative Design Agency",
    description:
      "A creative design agency crafting premium digital experiences.",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
