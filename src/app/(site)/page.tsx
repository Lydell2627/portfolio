import type { Metadata } from "next";
import { getFeaturedProjects, getTestimonials, getSiteSettings } from "@/lib/sanity";
import { getFeaturedProjects as getStaticFeaturedProjects } from "@/data/projects";
import { HomePageClient } from "./home-client";

export const revalidate = 60; // Revalidate every 60 seconds

// Homepage-specific metadata
export const metadata: Metadata = {
  title: "Difusys — UI/UX Design Agency for Startups & SaaS",
  description:
    "Premium UI/UX design and Next.js development for startups. We help SaaS teams launch beautiful, high-converting products. Book a free discovery call.",
  openGraph: {
    title: "Difusys — UI/UX Design Agency for Startups & SaaS",
    description:
      "Premium UI/UX design and Next.js development for startups. We help SaaS teams launch beautiful, high-converting products.",
    type: "website",
    siteName: "Difusys",
  },
  twitter: {
    title: "Difusys — UI/UX Design Agency for Startups & SaaS",
    description:
      "Premium UI/UX design and Next.js development for startups. Launch beautiful, high-converting products.",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [sanityProjects, testimonials, siteSettings] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  // Use Sanity projects if available, otherwise fall back to static data
  const projects = sanityProjects && sanityProjects.length > 0
    ? sanityProjects
    : getStaticFeaturedProjects();

  return (
    <HomePageClient
      projects={projects}
      testimonials={testimonials}
      siteName={siteSettings?.siteName}
    />
  );
}
