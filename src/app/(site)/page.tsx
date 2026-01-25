import type { Metadata } from "next";
import { getFeaturedProjects, getTestimonials, getSiteSettings } from "@/lib/sanity";
import { getFeaturedProjects as getStaticFeaturedProjects } from "@/data/projects";
import { HomePageClient } from "./home-client";

export const revalidate = 60; // Revalidate every 60 seconds

// Homepage-specific metadata
export const metadata: Metadata = {
  title: "Difusys — Premium UI/UX Design & Software Development",
  description:
    "We design & build premium digital products that convert. From concept to launch, Difusys partners with startups & enterprises to create software users love.",
  openGraph: {
    title: "Difusys — Premium UI/UX Design & Software Development",
    description:
      "We design & build premium digital products that convert. Partner with Difusys to create software users love.",
    type: "website",
    siteName: "Difusys",
  },
  twitter: {
    title: "Premium UI/UX Design & Software Development Agency",
    description:
      "We design & build premium digital products that convert. Partner with us to create software users love.",
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
