import type { Metadata } from "next";
import { getSiteSettings, getTestimonials } from "@/lib/sanity";
import { AboutPageClient } from "./about-client";

export const revalidate = 60; // Revalidate every 60 seconds

// About page-specific metadata
export const metadata: Metadata = {
    title: "About Difusys — Award-Winning Design & Development Studio",
    description:
        "Meet the team behind 50+ successful digital products. Difusys has 5+ years crafting premium UI/UX design and software solutions for startups and enterprises worldwide.",
    openGraph: {
        title: "About Difusys — Award-Winning Design & Development Studio",
        description:
            "Meet the team behind 50+ successful digital products. Crafting premium UI/UX design and software solutions worldwide.",
        type: "website",
        siteName: "Difusys",
    },
    twitter: {
        title: "About Difusys — Award-Winning Design & Development Studio",
        description:
            "Meet the team behind 50+ successful digital products. Crafting premium UI/UX design and software solutions worldwide.",
    },
    alternates: {
        canonical: "/about",
    },
};

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
