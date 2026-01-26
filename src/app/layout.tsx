import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://difusys.com";

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
      canonical: siteUrl,
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
    name: "Difusys",
    alternateName: "Difusys Software Solutions",
    description: "Premium UI/UX design and software development agency. We craft digital products that convert for startups and enterprises worldwide.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    priceRange: "₹₹₹",
    email: "hello@difusys.com",
    telephone: "+91-XXXXXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "India",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Place",
        name: "Worldwide",
      },
    ],
    knowsLanguage: ["English", "Hindi"],
    serviceType: [
      "UI/UX Design",
      "Web Development",
      "Software Development",
      "Product Design",
      "Mobile App Development",
      "Next.js Development",
      "React Development",
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
            description: "Custom web application development using Next.js, React, and modern technologies",
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Cross-platform mobile application development for iOS and Android",
          },
        },
      ],
    },
    sameAs: [
      // Add your social media URLs when available
      // "https://linkedin.com/company/difusys",
      // "https://twitter.com/difusys",
      // "https://instagram.com/difusys",
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
        {/* Preconnect to speed up external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Favicon - multiple formats for better compatibility */}
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9L9YWWEJB0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9L9YWWEJB0');
          `}
        </Script>
      </body>
    </html>
  );
}
