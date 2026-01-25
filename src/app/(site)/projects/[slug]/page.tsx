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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://difusys.com";

    // Try Sanity first, then static
    const sanityProject = await getSanityProject(slug);
    const project = sanityProject || getStaticProject(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const projectUrl = `${siteUrl}/projects/${slug}`;
    const description = project.description || `${project.title} - A case study by Difusys`;

    return {
        title: `${project.title} — Case Study`,
        description,
        alternates: {
            canonical: projectUrl,
        },
        openGraph: {
            title: `${project.title} — Difusys Case Study`,
            description,
            url: projectUrl,
            type: "article",
            siteName: "Difusys",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} — Difusys Case Study`,
            description,
        },
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
