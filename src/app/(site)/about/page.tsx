import { getSiteSettings, getTestimonials } from "@/lib/sanity";
import { AboutPageClient } from "./about-client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AboutPage() {
    const [siteSettings, testimonials] = await Promise.all([
        getSiteSettings(),
        getTestimonials(),
    ]);

    // Transform Sanity stats to the format the client component expects
    const stats = siteSettings?.stats ? [
        { label: "Years of Experience", value: siteSettings.stats.yearsExperience || "5+", suffix: "" },
        { label: "Projects Delivered", value: siteSettings.stats.projectsCompleted || "50", suffix: "+" },
        { label: "Happy Clients", value: siteSettings.stats.happyClients || "30", suffix: "+" },
        { label: "Design Awards", value: siteSettings.stats.designAwards || "8", suffix: "" },
    ] : undefined;

    return <AboutPageClient stats={stats} testimonials={testimonials} />;
}
