"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Quote, ExternalLink } from "lucide-react";
import { urlFor } from "@/lib/sanity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ProjectWithThumbnail {
    _id?: string;
    title: string;
    slug: string;
    description?: string;
    tagline?: string;
    category?: string;
    tools?: string[];
    client?: string;
    clientReview?: string;
    liveUrl?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thumbnail?: any;
}

interface FeaturedProjectShowcaseProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: any[];
}

// Single featured project item with animations
function FeaturedProjectItem({
    project,
    index,
    isReversed
}: {
    project: ProjectWithThumbnail;
    index: number;
    isReversed: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const prefersReducedMotion = useReducedMotion();

    const tools = project.tools || [];
    const category = project.category || "Design";

    const thumbnailUrl = project.thumbnail
        ? urlFor(project.thumbnail).width(1200).height(800).quality(85).url()
        : null;

    // Animation variants - using string easing for TypeScript compatibility
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.15,
                delayChildren: prefersReducedMotion ? 0 : 0.2,
            },
        },
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 1.02,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut" as const,
            },
        },
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            x: isReversed ? -30 : 30,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    };

    const quoteVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.4,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`
                grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center
                /* Responsive: reduced vertical padding on mobile for better content density */
                py-12 md:py-16 lg:py-24
                ${index > 0 ? "border-t border-neutral-200 dark:border-neutral-800" : ""}
            `}
        >
            {/* Image Section */}
            <motion.div
                variants={imageVariants}
                className={`
                    lg:col-span-7
                    ${isReversed ? "lg:order-2" : "lg:order-1"}
                `}
            >
                <Link href={`/projects/${project.slug}`} className="block group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl bg-neutral-100 dark:bg-neutral-900 shadow-2xl shadow-black/10 dark:shadow-black/30">
                        {thumbnailUrl ? (
                            <Image
                                src={thumbnailUrl}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                quality={85}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20" />
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                        {/* View Project Button */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                                <span className="text-sm font-medium text-neutral-900">View Project</span>
                                <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Content Section */}
            <motion.div
                variants={textVariants}
                className={`
                    lg:col-span-5
                    ${isReversed ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"}
                `}
            >
                {/* Category Badge */}
                <motion.div variants={textVariants} className="mb-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 rounded-full">
                        {category}
                    </span>
                </motion.div>

                {/* Project Title */}
                <motion.h3
                    variants={textVariants}
                    className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 leading-[1.1]"
                >
                    {project.title}
                </motion.h3>

                {/* Tagline */}
                {project.tagline && (
                    <motion.p
                        variants={textVariants}
                        className="text-lg md:text-xl italic text-neutral-500 dark:text-neutral-400 mb-6"
                    >
                        "{project.tagline}"
                    </motion.p>
                )}

                {/* Description */}
                <motion.p
                    variants={textVariants}
                    className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6"
                >
                    {project.description}
                </motion.p>

                {/* Tech Stack */}
                <motion.div variants={textVariants} className="flex flex-wrap gap-2 mb-8">
                    {tools.slice(0, 4).map((tool) => (
                        <span
                            key={tool}
                            className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700"
                        >
                            {tool}
                        </span>
                    ))}
                </motion.div>

                {/* Client Testimonial */}
                {project.clientReview && (
                    <motion.div
                        variants={quoteVariants}
                        className="relative pl-6 border-l-2 border-rose-400/50 dark:border-rose-500/50"
                    >
                        <Quote className="absolute -left-3 -top-1 w-6 h-6 text-rose-400/30 dark:text-rose-500/30" />
                        <p className="text-sm italic text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
                            "{project.clientReview}"
                        </p>
                        <p className="text-xs text-neutral-400">— {project.client || "Client"}</p>
                    </motion.div>
                )}

                {/* CTA Buttons */}
                <motion.div variants={textVariants} className="mt-8 flex flex-wrap items-center gap-4">
                    {/* View Case Study */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-3 group/btn"
                    >
                        <span className="text-sm font-medium uppercase tracking-wider">
                            View Case Study
                        </span>
                        <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <ArrowUpRight className="w-4 h-4 text-white dark:text-neutral-900" />
                        </div>
                    </Link>

                    {/* Visit Live Site */}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group/live"
                        >
                            <span>Visit Live Site</span>
                            <ExternalLink className="w-4 h-4 opacity-60 group-hover/live:opacity-100 transition-opacity" />
                        </a>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function FeaturedProjectShowcase({ projects }: FeaturedProjectShowcaseProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    if (!projects || projects.length === 0) return null;

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Section Header */}
            <div className="container mb-8 lg:mb-16">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                            Featured Work
                        </p>
                        <h2 className="font-serif">
                            From <span className="italic text-neutral-500">concept</span> to creation
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium group"
                    >
                        <span>View all projects</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>

            {/* Featured Projects */}
            <div className="container">
                {projects.map((project, index) => (
                    <FeaturedProjectItem
                        key={project._id}
                        project={project}
                        index={index}
                        isReversed={index % 2 === 1} // Alternate layout
                    />
                ))}
            </div>
        </section>
    );
}
