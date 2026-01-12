"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.23, 1, 0.32, 1]
            }}
        >
            <Link href={`/projects/${project.slug}`} className="group block">
                {/* Image Container with enhanced hover */}
                <div className="project-card aspect-[4/3] relative overflow-hidden bg-[var(--surface)]">
                    {/* Placeholder gradient - will be replaced with actual images */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    />

                    {/* Overlay on hover */}
                    <div
                        className={cn(
                            "absolute inset-0 z-10",
                            "bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5",
                            "transition-all duration-500"
                        )}
                    />

                    {/* View Project indicator */}
                    <motion.div
                        className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                    >
                        <Badge variant="secondary" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-lg px-4 py-2">
                            View Project
                        </Badge>
                    </motion.div>
                </div>

                {/* Content Below */}
                <div className="pt-6 space-y-3">
                    {/* Title and Category Row */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            {/* Title in serif */}
                            <h3 className="font-serif text-xl md:text-2xl tracking-tight group-hover:opacity-70 transition-opacity duration-300">
                                {project.title}
                            </h3>
                            {/* Brief Description */}
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                {project.description.slice(0, 60)}...
                            </p>
                        </div>
                        {/* Year Badge */}
                        <Badge variant="outline" className="text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700">
                            {project.year}
                        </Badge>
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2">
                        {/* Category Tag */}
                        <Badge variant="secondary">
                            {project.category}
                        </Badge>
                        {/* Tool Tags - show first 2 */}
                        {project.tools.slice(0, 2).map((tool) => (
                            <Badge
                                key={tool}
                                variant="outline"
                            >
                                {tool}
                            </Badge>
                        ))}
                        {project.tools.length > 2 && (
                            <span className="px-3 py-1 text-xs font-medium text-neutral-400 dark:text-neutral-600">
                                +{project.tools.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
