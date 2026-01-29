"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Palette,
    Code2,
    LayoutDashboard,
    Sparkles,
    Layers,
} from "lucide-react";

const services = [
    {
        icon: Palette,
        title: "UI/UX Design",
        subtitle: "for SaaS & Startups",
        description:
            "User-centered design that converts. We craft intuitive interfaces backed by research, wireframes, and pixel-perfect Figma prototypes.",
        simpleExplanation:
            "We make apps and websites look beautiful and easy to use. Think of it like arranging a room so everything is in the perfect spot!",
        tools: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
        icon: Code2,
        title: "Next.js & React",
        subtitle: "Web Development",
        description:
            "Lightning-fast, SEO-friendly web apps built with Next.js, React, and modern JavaScript. From MVP to scale.",
        simpleExplanation:
            "We build websites that load super fast and work smoothly. Like building with the best LEGO blocks for the web!",
        tools: ["Next.js", "React", "TypeScript"],
    },
    {
        icon: LayoutDashboard,
        title: "SaaS Dashboard",
        subtitle: "Design",
        description:
            "Complex workflows made simple. We design dashboards that users actually enjoy using—clean, data-rich, and delightful.",
        simpleExplanation:
            "We create control panels where you can see all your important info at a glance. Like a car dashboard, but for your business!",
        tools: ["Data Viz", "Charts", "Analytics"],
    },
    {
        icon: Sparkles,
        title: "Brand Identity",
        subtitle: "for Digital Products",
        description:
            "Logos, color systems, and brand guidelines that resonate. We build the visual language your product deserves.",
        simpleExplanation:
            "We give your business a unique look that people remember. Like picking the perfect outfit that shows who you are!",
        tools: ["Logo Design", "Colors", "Typography"],
    },
    {
        icon: Layers,
        title: "Design Systems",
        subtitle: "& Component Libraries",
        description:
            "Figma component libraries and documentation so your team moves fast without sacrificing consistency.",
        simpleExplanation:
            "We create a toolkit of reusable design pieces so your team can build faster. Like having pre-made puzzle pieces that always fit!",
        tools: ["Components", "Documentation", "Figma"],
    },
];

export function ServicesSection() {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <section className="section bg-neutral-50 dark:bg-neutral-900/50">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                        What We Do
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                        Services for{" "}
                        <span className="italic text-neutral-500 dark:text-neutral-400">
                            Ambitious
                        </span>{" "}
                        Teams
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        End-to-end design and development services to take your product
                        from idea to launch—and beyond.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => {
                        const isFlipped = flippedIndex === index;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="perspective-1000"
                            >
                                {/* Book Card Container */}
                                <div
                                    className="relative h-[320px] md:h-[350px] cursor-pointer"
                                    style={{ perspective: "1000px" }}
                                    onClick={() => handleCardClick(index)}
                                >
                                    {/* Inner Page (revealed on flip) */}
                                    <div className="absolute inset-0 p-6 md:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 shadow-lg">
                                        {/* Simple Explanation */}
                                        <div className="h-full flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-violet-500 mb-3">
                                                    Simply Put...
                                                </p>
                                                <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed mb-4">
                                                    {service.simpleExplanation}
                                                </p>
                                            </div>

                                            {/* Tools/Tech Tags */}
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
                                                    Tools We Use
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.tools.map((tool) => (
                                                        <span
                                                            key={tool}
                                                            className="px-3 py-1 text-xs bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 rounded-full"
                                                        >
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Tap hint */}
                                                <p className="mt-4 text-xs text-neutral-400">
                                                    Tap to close
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cover (flips on click) */}
                                    <div
                                        className="absolute inset-0 p-6 md:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 shadow-xl transition-transform duration-500 ease-out"
                                        style={{
                                            transformOrigin: "left center",
                                            transformStyle: "preserve-3d",
                                            backfaceVisibility: "hidden",
                                            transform: isFlipped ? "rotateY(-80deg)" : "rotateY(0deg)",
                                        }}
                                    >
                                        <div className="h-full flex flex-col">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-5">
                                                <service.icon className="w-6 h-6 text-violet-500" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-serif text-xl md:text-2xl mb-1">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-violet-500 dark:text-violet-400 mb-3">
                                                {service.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed flex-grow">
                                                {service.description}
                                            </p>

                                            {/* Tap hint */}
                                            <div className="mt-4 flex items-center text-sm text-neutral-400">
                                                <span>Tap to learn more</span>
                                                <svg
                                                    className="w-4 h-4 ml-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
