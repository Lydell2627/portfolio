"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
        href: "/contact",
    },
    {
        icon: Code2,
        title: "Next.js & React",
        subtitle: "Web Development",
        description:
            "Lightning-fast, SEO-friendly web apps built with Next.js, React, and modern JavaScript. From MVP to scale.",
        href: "/contact",
    },
    {
        icon: LayoutDashboard,
        title: "SaaS Dashboard",
        subtitle: "Design",
        description:
            "Complex workflows made simple. We design dashboards that users actually enjoy using—clean, data-rich, and delightful.",
        href: "/contact",
    },
    {
        icon: Sparkles,
        title: "Brand Identity",
        subtitle: "for Digital Products",
        description:
            "Logos, color systems, and brand guidelines that resonate. We build the visual language your product deserves.",
        href: "/contact",
    },
    {
        icon: Layers,
        title: "Design Systems",
        subtitle: "& Component Libraries",
        description:
            "Figma component libraries and documentation so your team moves fast without sacrificing consistency.",
        href: "/contact",
    },
];

export function ServicesSection() {
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
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={service.href}
                                className="group block h-full p-6 md:p-8 bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
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
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Arrow indicator */}
                                <div className="mt-4 flex items-center text-sm text-neutral-400 group-hover:text-violet-500 transition-colors">
                                    <span>Learn more</span>
                                    <svg
                                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
