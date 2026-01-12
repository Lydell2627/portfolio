import { getProjects } from "@/lib/sanity";
import { projects as staticProjects, categories } from "@/data/projects";
import { ProjectsPageClient } from "./projects-client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectsPage() {
    const sanityProjects = await getProjects();

    // Use Sanity projects if available, otherwise fall back to static data
    const projects = sanityProjects && sanityProjects.length > 0
        ? sanityProjects
        : staticProjects;

    return <ProjectsPageClient projects={projects} categories={categories} />;
}
