import type { Metadata } from "next";
import { getProjects } from "@/lib/sanity";
import { projects as staticProjects, categories } from "@/data/projects";
import { ProjectsPageClient } from "./projects-client";

export const revalidate = 60; // Revalidate every 60 seconds

// Projects page-specific metadata
export const metadata: Metadata = {
    title: "Our Work — UI/UX Design & Development Portfolio",
    description:
        "Explore our portfolio of digital product design and software development work. See case studies of projects that achieved 3x user engagement and business growth.",
    openGraph: {
        title: "Our Work — UI/UX Design & Development Portfolio",
        description:
            "Explore our portfolio of digital product design and software development case studies.",
        type: "website",
    },
    twitter: {
        title: "Our Work — UI/UX Design & Development Portfolio",
        description:
            "Explore our portfolio of digital product design and software development case studies.",
    },
    alternates: {
        canonical: "/projects",
    },
};

export default async function ProjectsPage() {
    const sanityProjects = await getProjects();

    // Use Sanity projects if available, otherwise fall back to static data
    const projects = sanityProjects && sanityProjects.length > 0
        ? sanityProjects
        : staticProjects;

    return <ProjectsPageClient projects={projects} categories={categories} />;
}
