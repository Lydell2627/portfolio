import { getFeaturedProjects, getTestimonials, getSiteSettings } from "@/lib/sanity";
import { getFeaturedProjects as getStaticFeaturedProjects } from "@/data/projects";
import { HomePageClient } from "./home-client";

export const revalidate = 60; // Revalidate every 60 seconds

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
