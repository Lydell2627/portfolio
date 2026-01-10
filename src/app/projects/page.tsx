"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories, getProjectsByCategory, type Category } from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const filteredProjects = getProjectsByCategory(activeCategory);

    return (
        <div className="section pt-32 md:pt-40">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24"
                >
                    <h1 className="font-serif">
                        <span className="italic">Selected</span> Projects
                    </h1>
                    <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl">
                        A collection of our recent work across product design, web
                        experiences, and brand identities.
                    </p>
                </motion.div>

                {/* Filter Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12 md:mb-20"
                >
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "px-4 py-2",
                                    "text-sm font-medium",
                                    "rounded-full",
                                    "border transition-all duration-300",
                                    activeCategory === category
                                        ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                                        : "bg-transparent border-[var(--border)] hover:border-[var(--foreground)]"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.nav>

                {/* Projects Grid - 2 Columns */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <p className="text-[var(--text-secondary)]">
                            No projects found in this category.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
