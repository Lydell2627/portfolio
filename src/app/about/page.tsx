"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const skills = [
    "UI Design",
    "UX Design",
    "Web Development",
    "Brand Identity",
    "Design Systems",
    "Prototyping",
    "User Research",
    "Figma",
    "Framer",
    "React",
    "Next.js",
    "TypeScript",
];

const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Design Awards", value: "8" },
];

const approaches = [
    {
        number: "01",
        title: "Discover",
        description:
            "We dive deep into understanding your business, users, and goals. Research-driven insights form the foundation of every project.",
    },
    {
        number: "02",
        title: "Define",
        description:
            "We synthesize findings into clear strategies and design principles that guide every decision throughout the project.",
    },
    {
        number: "03",
        title: "Design",
        description:
            "From wireframes to high-fidelity prototypes, we craft every detail with precision, ensuring beauty meets functionality.",
    },
    {
        number: "04",
        title: "Deliver",
        description:
            "We build and refine until perfection, providing all assets, documentation, and support for a smooth launch.",
    },
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <div ref={containerRef} className="pt-24 md:pt-32">
            {/* ═══════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section pt-8 md:pt-16">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                        {/* Left - Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-sm text-[var(--text-secondary)] mb-4">(About Us)</p>
                            <h1 className="font-serif leading-[1.1]">
                                We design with{" "}
                                <span className="italic">purpose</span>,{" "}
                                <br className="hidden md:block" />
                                build with{" "}
                                <span className="italic">precision.</span>
                            </h1>
                        </motion.div>

                        {/* Right - Intro */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex flex-col justify-end"
                        >
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                                We are a boutique design studio specializing in premium digital
                                experiences. Our work lives at the intersection of aesthetics and
                                function—where every detail serves a purpose.
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                Based in the digital realm, we partner with ambitious brands
                                worldwide to craft interfaces that feel natural, intuitive, and
                                delightful.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section border-y border-[var(--border)]">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="font-serif text-5xl md:text-6xl mb-3">{stat.value}</p>
                                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          APPROACH
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 md:mb-24"
                    >
                        <h2 className="font-serif">
                            Our <span className="italic">Approach</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-0">
                        {approaches.map((approach, index) => (
                            <motion.div
                                key={approach.number}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="grid md:grid-cols-12 gap-6 md:gap-12 py-12 border-b border-[var(--border)] last:border-b-0"
                            >
                                <div className="md:col-span-2">
                                    <span className="font-serif text-3xl text-[var(--text-tertiary)]">
                                        {approach.number}
                                    </span>
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="font-serif text-2xl md:text-3xl">{approach.title}</h3>
                                </div>
                                <div className="md:col-span-7">
                                    <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                                        {approach.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          SKILLS
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section border-t border-[var(--border)]">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h3 className="text-xs uppercase tracking-wider text-[var(--text-tertiary)]">
                            Expertise & Tools
                        </h3>
                    </motion.div>

                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                className="text-sm px-5 py-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section border-t border-[var(--border)]">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-serif">
                                Let&apos;s create <br />
                                <span className="italic">something great.</span>
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col justify-center"
                        >
                            <p className="text-lg text-[var(--text-secondary)] mb-8">
                                Ready to elevate your digital presence? We&apos;re always
                                excited to collaborate with brands that share our passion for
                                exceptional design.
                            </p>
                            <Link
                                href="/contact"
                                className={cn(
                                    "inline-flex items-center self-start",
                                    "px-8 py-4",
                                    "text-sm font-medium",
                                    "bg-[var(--foreground)] text-[var(--background)]",
                                    "rounded-full",
                                    "hover:opacity-80 transition-opacity"
                                )}
                            >
                                Start a project
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
