"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
    project: Project;
    prevProject: Project | null;
    nextProject: Project | null;
}

export function ProjectDetailClient({
    project,
    prevProject,
    nextProject,
}: ProjectDetailClientProps) {
    return (
        <article className="pt-24 md:pt-32">
            {/* ═══════════════════════════════════════════════════════════════════
          PROJECT HEADER
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="container mb-12 md:mb-20">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* Left - Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                            ({project.category})
                        </p>
                        <h1 className="font-serif">{project.title}</h1>
                    </motion.div>

                    {/* Right - Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="flex flex-col justify-end"
                    >
                        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          HERO IMAGE
          ═══════════════════════════════════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="container mb-16 md:mb-24"
            >
                <div className="project-card aspect-[16/9] relative overflow-hidden bg-[var(--surface)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════════
          PROJECT METADATA
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="container mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[var(--border)]"
                >
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                            Client
                        </p>
                        <p className="text-base font-medium">
                            {project.client || "Personal Project"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                            Role
                        </p>
                        <p className="text-base font-medium">{project.role}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                            Duration
                        </p>
                        <p className="text-base font-medium">{project.duration}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                            Year
                        </p>
                        <p className="text-base font-medium">{project.year}</p>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          CASE STUDY CONTENT
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="container mb-16 md:mb-24">
                <div className="max-w-3xl mx-auto space-y-20">
                    {project.content.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                        >
                            {section.type === "text" && (
                                <div>
                                    {section.heading && (
                                        <h2 className="font-serif text-3xl md:text-4xl mb-8">
                                            {section.heading}
                                        </h2>
                                    )}
                                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            )}

                            {section.type === "image" && (
                                <figure>
                                    <div className="project-card aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                                    {section.caption && (
                                        <figcaption className="mt-4 text-sm text-[var(--text-tertiary)] text-center italic">
                                            {section.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            )}

                            {section.type === "gallery" && (
                                <figure>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {section.images?.map((_, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className="project-card aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                                            />
                                        ))}
                                    </div>
                                    {section.caption && (
                                        <figcaption className="mt-4 text-sm text-[var(--text-tertiary)] text-center italic">
                                            {section.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          TOOLS USED
          ═══════════════════════════════════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mb-16 md:mb-24"
            >
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-6">
                        Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tools.map((tool) => (
                            <span
                                key={tool}
                                className="text-sm px-4 py-2 rounded-full border border-[var(--border)]"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════════
          NEXT/PREV NAVIGATION
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="border-t border-[var(--border)]">
                <div className="container">
                    <div className="grid md:grid-cols-2">
                        {/* Previous Project */}
                        <div
                            className={cn(
                                "py-16 md:py-24",
                                nextProject && "md:border-r md:border-[var(--border)]"
                            )}
                        >
                            {prevProject ? (
                                <Link
                                    href={`/projects/${prevProject.slug}`}
                                    className="group flex items-center gap-6"
                                >
                                    <motion.div
                                        whileHover={{ x: -8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowLeft className="w-6 h-6" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                                            Previous
                                        </p>
                                        <p className="font-serif text-xl md:text-2xl group-hover:opacity-60 transition-opacity">
                                            {prevProject.title}
                                        </p>
                                    </div>
                                </Link>
                            ) : (
                                <div />
                            )}
                        </div>

                        {/* Next Project */}
                        <div className="py-16 md:py-24 md:text-right md:flex md:justify-end">
                            {nextProject ? (
                                <Link
                                    href={`/projects/${nextProject.slug}`}
                                    className="group flex items-center gap-6"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                                            Next
                                        </p>
                                        <p className="font-serif text-xl md:text-2xl group-hover:opacity-60 transition-opacity">
                                            {nextProject.title}
                                        </p>
                                    </div>
                                    <motion.div
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight className="w-6 h-6" />
                                    </motion.div>
                                </Link>
                            ) : (
                                <Link
                                    href="/projects"
                                    className="group flex items-center gap-6"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                                            View All
                                        </p>
                                        <p className="font-serif text-xl md:text-2xl group-hover:opacity-60 transition-opacity">
                                            All Projects
                                        </p>
                                    </div>
                                    <motion.div
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight className="w-6 h-6" />
                                    </motion.div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
