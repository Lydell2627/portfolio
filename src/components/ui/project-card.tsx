"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
        >
            <Link href={`/projects/${project.slug}`} className="group block">
                {/* Image Container with rounded corners */}
                <div className="project-card aspect-[4/3] relative overflow-hidden bg-[var(--surface)]">
                    {/* Placeholder gradient - will be replaced with actual images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />

                    {/* Subtle hover overlay */}
                    <div
                        className={cn(
                            "absolute inset-0",
                            "bg-black/0 group-hover:bg-black/5",
                            "transition-all duration-500"
                        )}
                    />
                </div>

                {/* Content Below */}
                <div className="pt-5 space-y-1">
                    {/* Title in serif */}
                    <h3 className="font-serif text-xl md:text-2xl tracking-tight group-hover:opacity-60 transition-opacity">
                        {project.title}
                    </h3>

                    {/* Category */}
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                        ({project.category})
                    </p>
                </div>
            </Link>
        </motion.article>
    );
}
