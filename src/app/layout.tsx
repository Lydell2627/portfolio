import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";
import { Analytics } from "@vercel/analytics/react";

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

// Site URL for canonical and OG tags
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.siteName || "STUDIO";
  const tagline = siteSettings?.siteTagline || "UI/UX & Software Development Agency";
  const description = siteSettings?.siteDescription ||
    "We design & build premium digital products. From concept to launch, we partner with startups & enterprises to create software that converts.";

  return {
    title: {
      default: `${siteName} — ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      // Commercial intent keywords
      "UI/UX design agency",
      "software development company",
      "web development services",
      "digital product design",
      "Next.js development agency",
      "React development company",
      // Service-specific
      "custom web application development",
      "enterprise software development",
      "SaaS UI design",
      "product design studio",
      "mobile app design",
      "design systems",
      // Niche/Industry
      "startup UI/UX agency",
      "B2B software development",
      "fintech software development",
      "e-commerce development",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: siteName,
      title: `${siteName} — ${tagline}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — ${tagline}`,
      description,
      creator: "@yourstudio",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here
      // google: "your-google-verification-code",
    },
  };
}

// JSON-LD Structured Data for Organization
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": siteUrl,
    name: "STUDIO",
    description: "Premium UI/UX design and software development agency crafting digital products that convert.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "0",
      longitude: "0",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: [
      "UI/UX Design",
      "Web Development",
      "Software Development",
      "Product Design",
      "Mobile App Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "User interface and experience design for web and mobile applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom web application development using modern technologies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Design",
            description: "End-to-end digital product design from concept to launch",
          },
        },
      ],
    },
    sameAs: [
      // Add your social media URLs
      // "https://linkedin.com/company/yourstudio",
      // "https://twitter.com/yourstudio",
      // "https://dribbble.com/yourstudio",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
