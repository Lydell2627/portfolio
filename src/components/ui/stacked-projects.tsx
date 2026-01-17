"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

// Sanity Project type
interface SanityProject {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    category?: string;
    tools?: string[];
    thumbnail?: {
        asset: {
            _ref: string;
        };
    };
}

// Legacy Project type for backwards compatibility
interface LegacyProject {
    slug: string;
    title: string;
    description: string;
    category: string;
    tools: string[];
    thumbnail?: string;
}

type Project = SanityProject | LegacyProject;

interface StackedProjectCardProps {
    project: Project;
    index: number;
    totalProjects: number;
}

function isSanityProject(project: Project): project is SanityProject {
    return '_id' in project;
}

function StackedProjectCard({ project, index, totalProjects }: StackedProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    // Parallax effect for the image
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.6]);

    // Stagger colors for visual variety
    const gradients = [
        "from-violet-500/20 via-fuchsia-500/10 to-cyan-500/20",
        "from-amber-500/20 via-rose-500/10 to-violet-500/20",
        "from-emerald-500/20 via-teal-500/10 to-blue-500/20",
        "from-rose-500/20 via-orange-500/10 to-amber-500/20",
    ];

    const tools = project.tools || [];
    const category = project.category || "Design";

    // Get thumbnail URL
    const thumbnailUrl = isSanityProject(project) && project.thumbnail
        ? urlFor(project.thumbnail).width(1200).height(600).url()
        : null;

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className="sticky top-24 mb-8 last:mb-0"
        >
            <Link href={`/projects/${project.slug}`} className="group block">
                <div
                    className="relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900"
                    style={{
                        // Offset each card slightly for stacking effect
                        transform: `translateY(${index * 8}px)`,
                        zIndex: totalProjects - index,
                    }}
                >
                    {/* Large Image Container with Parallax */}
                    <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden">
                        {/* Sanity Image or Gradient Background */}
                        {thumbnailUrl ? (
                            <motion.div
                                className="absolute inset-0"
                                style={{ y: imageY }}
                            >
                                <Image
                                    src={thumbnailUrl}
                                    alt={project.title}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        ) : (
                            <>
                                {/* Animated Gradient Background */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-60`}
                                    style={{ y: imageY }}
                                />
                                {/* Placeholder pattern */}
                                <motion.div
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
                                    style={{ y: imageY }}
                                />
                            </>
                        )}

                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Project Number - Large watermark */}
                        <motion.div
                            className="absolute top-6 right-8 font-serif text-8xl md:text-[12rem] font-light text-white/10 leading-none select-none"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </motion.div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {/* Tags Row */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                                        {category}
                                    </Badge>
                                    {tools.slice(0, 2).map((tool) => (
                                        <Badge
                                            key={tool}
                                            variant="outline"
                                            className="border-white/20 text-white/80 backdrop-blur-md"
                                        >
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-3 leading-[1.1]">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/70 text-sm md:text-base max-w-xl mb-6 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* CTA Arrow */}
                                <motion.div
                                    className="inline-flex items-center gap-2 text-white font-medium"
                                    whileHover={{ x: 8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <span className="text-sm uppercase tracking-wider">View Project</span>
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

interface StackedProjectsProps {
    projects: Project[];
}

export function StackedProjects({ projects }: StackedProjectsProps) {
    return (
        <section className="section relative">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                            Featured Work
                        </p>
                        <h2 className="font-serif">
                            From <span className="italic">concept</span> to creation
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm font-medium group"
                    >
                        <span>View all projects</span>
                        <motion.span
                            className="text-lg"
                            whileHover={{ x: 4 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Stacked Projects */}
                <div className="relative">
                    {projects.map((project, index) => (
                        <StackedProjectCard
                            key={isSanityProject(project) ? project._id : project.slug}
                            project={project}
                            index={index}
                            totalProjects={projects.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
