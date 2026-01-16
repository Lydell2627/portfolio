"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface SanityProject {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    category?: string;
    tools?: string[];
    client?: string;
    thumbnail?: { asset: { _ref: string } };
}

interface LegacyProject {
    slug: string;
    title: string;
    description: string;
    category: string;
    tools: string[];
    client?: string;
}

type Project = SanityProject | LegacyProject;

function isSanityProject(project: Project): project is SanityProject {
    return '_id' in project;
}

interface ProjectShowcaseProps {
    projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);
    const [isHero, setIsHero] = useState(true);
    const [hasEntered, setHasEntered] = useState(false);

    const project = projects[currentIndex];
    const tools = project?.tools || [];
    const category = project?.category || "Design";
    const client = project?.client || "Personal Project";
    const description = project?.description || "";

    const thumbnailUrl = project && isSanityProject(project) && project.thumbnail
        ? urlFor(project.thumbnail).width(1400).height(900).url()
        : null;

    // Animation sequence when section enters view
    useEffect(() => {
        if (hasEntered && isHero) {
            // Wait 1.5s then shrink
            const t1 = setTimeout(() => setIsHero(false), 1500);
            // Wait another 0.8s then show text
            const t2 = setTimeout(() => setShowText(true), 2300);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [hasEntered, isHero]);

    const handleNav = (dir: 1 | -1) => {
        setShowText(false);
        setIsHero(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length);
            setTimeout(() => setIsHero(false), 1200);
            setTimeout(() => setShowText(true), 2000);
        }, 300);
    };

    if (!project) return null;

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Section Header */}
            <div className="container mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                            Featured Work
                        </p>
                        <h2 className="font-serif">
                            From <span className="italic">concept</span> to creation
                        </h2>
                    </div>
                    <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium group">
                        <span>View all projects</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>

            {/* Showcase Container */}
            <motion.div
                className="container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onViewportEnter={() => setHasEntered(true)}
            >
                <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

                    {/* LEFT: Text Content */}
                    <div
                        className={`
                            lg:w-[40%] transition-all duration-700 ease-out
                            ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                        `}
                    >
                        {/* Big Number - Responsive sizing */}
                        <div className="font-serif text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-neutral-100 dark:text-neutral-800 leading-none -mb-8 sm:-mb-10 lg:-mb-14">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                {category}
                            </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 leading-[1.15]">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed text-sm md:text-base max-w-md">
                            {description}
                        </p>

                        {/* Client & Rating */}
                        <div className="flex gap-10 mb-6">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Client</p>
                                <p className="text-sm font-medium">{client}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Rating</p>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {tools.slice(0, 3).map((tool) => (
                                <span key={tool} className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800">
                                    {tool}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-3 text-sm font-medium group"
                        >
                            <span className="uppercase tracking-wider text-xs">View Project</span>
                            <div className="w-10 h-10 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-4 h-4 text-white dark:text-neutral-900" />
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT: Image */}
                    <div
                        className={`
                            transition-all duration-1000 ease-out
                            ${isHero ? 'lg:w-full' : 'lg:w-[60%]'}
                            w-full
                        `}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link href={`/projects/${project.slug}`} className="block group">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl bg-neutral-100 dark:bg-neutral-900 shadow-xl">
                                        {thumbnailUrl ? (
                                            <Image
                                                src={thumbnailUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                priority
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30" />
                                        )}

                                        {/* Hero overlay */}
                                        <div
                                            className={`
                                                absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                                                flex flex-col justify-end p-6 md:p-10
                                                transition-opacity duration-500
                                                ${isHero ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                                            `}
                                        >
                                            <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/70 text-sm md:text-base max-w-xl line-clamp-2">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        {projects.length > 1 && (
                            <div
                                className={`
                                    flex items-center justify-end gap-4 mt-6
                                    transition-opacity duration-500
                                    ${showText ? 'opacity-100' : 'opacity-0'}
                                `}
                            >
                                <button
                                    onClick={() => handleNav(-1)}
                                    className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="text-sm text-neutral-500 font-medium">
                                    {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                </span>
                                <button
                                    onClick={() => handleNav(1)}
                                    className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
