import { notFound } from "next/navigation";
import { projects, getProjectBySlug as getStaticProject } from "@/data/projects";
import { getProjectBySlug as getSanityProject, getProjects as getSanityProjects } from "@/lib/sanity";
import { ProjectDetailClient } from "./project-detail-client";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    // Get slugs from both static and Sanity
    const sanityProjects = await getSanityProjects();
    const sanityParams = sanityProjects?.map((project: { slug: string }) => ({
        slug: project.slug,
    })) || [];

    const staticParams = projects.map((project) => ({
        slug: project.slug,
    }));

    // Combine and dedupe
    const allSlugs = new Set([
        ...sanityParams.map((p: { slug: string }) => p.slug),
        ...staticParams.map((p) => p.slug),
    ]);

    return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;

    // Try Sanity first, then static
    const sanityProject = await getSanityProject(slug);
    const project = sanityProject || getStaticProject(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    // Try Sanity first, then static
    const sanityProject = await getSanityProject(slug);
    const project = sanityProject || getStaticProject(slug);

    if (!project) {
        notFound();
    }

    // Get all projects for next/prev navigation
    const sanityProjects = await getSanityProjects();
    const allProjects = sanityProjects && sanityProjects.length > 0 ? sanityProjects : projects;

    // Get next/prev projects
    const currentIndex = allProjects.findIndex((p: { slug: string }) => p.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    return (
        <ProjectDetailClient
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
        />
    );
}
