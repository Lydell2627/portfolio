"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";

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

interface ProjectsPageClientProps {
    projects: Project[];
    categories: readonly string[];
}

function isSanityProject(project: Project): project is SanityProject {
    return '_id' in project;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const category = project.category || "Design";
    const tools = project.tools || [];

    // Get thumbnail URL for Sanity projects
    const thumbnailUrl = isSanityProject(project) && project.thumbnail
        ? urlFor(project.thumbnail).width(800).height(600).url()
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link href={`/projects/${project.slug}`} className="group block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 mb-6">
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900" />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    {/* Arrow on hover */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-neutral-900" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                            {category}
                        </Badge>
                        {tools.slice(0, 2).map((tool) => (
                            <Badge key={tool} variant="outline" className="text-xs">
                                {tool}
                            </Badge>
                        ))}
                    </div>
                    <h3 className="font-serif text-2xl mb-2 group-hover:opacity-60 transition-opacity">
                        {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                        {project.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}

export function ProjectsPageClient({ projects, categories }: ProjectsPageClientProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Filter projects by category
    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter((p) => p.category === activeCategory);
    }, [projects, activeCategory]);

    // Count projects by category
    const getCategoryCount = (category: string) => {
        if (category === "All") return projects.length;
        return projects.filter((p) => p.category === category).length;
    };

    return (
        <div>
            {/* ═══════════════════════════════════════════════════════════════════
                HERO - Immersive with animated text
            ═══════════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 pt-8 md:pt-12"
            >


                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient orbs - Green theme */}
                    <motion.div
                        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent blur-3xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-500/10 via-emerald-500/5 to-transparent blur-3xl"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Large background text */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ y: heroY }}
                >
                    <span className="font-serif text-[20vw] md:text-[15vw] text-neutral-900/[0.03] dark:text-white/[0.03] whitespace-nowrap">
                        WORK
                    </span>
                </motion.div>

                <motion.div
                    className="container relative z-10 text-center"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase mb-8"
                        >
                            <ShinyText
                                speed={4}
                                shineColor="rgba(16, 185, 129, 0.6)"
                                color="currentColor"
                            >
                                Our Work
                            </ShinyText>
                        </motion.p>

                        <h1 className="font-serif leading-[1.05] mb-8">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="block"
                            >
                                <GradientText
                                    colors={["#10B981", "#34D399", "#059669"]}
                                    animationSpeed={5}
                                    className="italic"
                                >
                                    Selected
                                </GradientText>{" "}
                                projects
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="block text-neutral-500 dark:text-neutral-400"
                            >
                                that define us.
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-lg md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            A collection of our recent work across product design,
                            web experiences, and brand identities.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: 'smooth'
                        });
                    }}
                >
                    <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-neutral-400 dark:border-neutral-600 flex items-center justify-center group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:border-neutral-900 dark:group-hover:border-white group-hover:text-white dark:group-hover:text-neutral-900 transition-all duration-300"
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <span className="text-lg">↓</span>
                    </motion.div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.15em]">
                        Scroll
                    </span>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FILTER & PROJECTS GRID
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="section pt-16 md:pt-24">
                <div className="container">
                    {/* Filter Navigation */}
                    <motion.nav
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-16 md:mb-24"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-6">
                            Filter by
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "px-6 py-3",
                                        "text-sm font-medium",
                                        "rounded-full",
                                        "border-2 transition-all duration-300",
                                        activeCategory === category
                                            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                                            : "bg-transparent border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                                    )}
                                >
                                    {category}
                                    {category !== "All" && (
                                        <span className="ml-2 text-xs opacity-50">
                                            ({getCategoryCount(category)})
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.nav>

                    {/* Projects Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                        >
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={isSanityProject(project) ? project._id : project.slug}
                                    project={project}
                                    index={index}
                                />
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
                            <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                                No projects found in this category.
                            </p>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="text-sm font-medium underline underline-offset-4 hover:opacity-60 transition-opacity"
                            >
                                View all projects
                            </button>
                        </motion.div>
                    )}

                    {/* Projects Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 md:mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center"
                    >
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Showing <span className="font-medium text-neutral-900 dark:text-white">{filteredProjects.length}</span> of{" "}
                            <span className="font-medium text-neutral-900 dark:text-white">{projects.length}</span> projects
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-sm font-medium group"
                        >
                            <span>Have a project?</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CTA SECTION - Premium Theme-Aware Style
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
                <div className="container text-center">
                    <motion.h2
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Ready to create your{" "}
                        <span className="italic">
                            <GradientText
                                colors={["#10B981", "#34D399", "#059669", "#10B981"]}
                                animationSpeed={5}
                            >
                                next project
                            </GradientText>
                        </span>
                        ?
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl text-neutral-600 dark:text-white/60 mb-12 max-w-lg mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Whether you need a complete digital transformation or a refined user experience, we&apos;re here to help.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-12 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 text-white rounded-full shadow-[0_8px_32px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.6)] hover:scale-105 transition-all duration-300 group"
                        >
                            <span>Start a Project</span>
                            <motion.span
                                className="text-xl"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
