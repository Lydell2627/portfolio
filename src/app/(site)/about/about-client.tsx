"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Sparkles, Eye, Zap, Heart, Compass } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";
import { BlurText } from "@/components/ui/blur-text";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";

interface Stat {
    label: string;
    value: string;
    suffix: string;
}

interface Testimonial {
    _id: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
}

interface AboutPageClientProps {
    stats?: Stat[];
    testimonials?: Testimonial[];
}

const principles = [
    {
        icon: Sparkles,
        title: "Create Boldly",
        description: "Pursue excellence in every pixel. Attention to detail is not optional—it's essential.",
    },
    {
        icon: Eye,
        title: "Design with Clarity",
        description: "Simplicity is the ultimate sophistication. Remove until only the essential remains.",
    },
    {
        icon: Zap,
        title: "Move Fast",
        description: "Speed and quality aren't mutually exclusive. We ship great work, quickly.",
    },
    {
        icon: Heart,
        title: "Care Deeply",
        description: "Your project is our project. We're invested in your success from start to finish.",
    },
    {
        icon: Compass,
        title: "Stay Curious",
        description: "The best solutions come from asking better questions. We never stop learning.",
    },
];

const defaultStats: Stat[] = [
    { label: "Years of Experience", value: "5+", suffix: "" },
    { label: "Projects Delivered", value: "50", suffix: "+" },
    { label: "Happy Clients", value: "30", suffix: "+" },
    { label: "Design Awards", value: "8", suffix: "" },
];

const approaches = [
    {
        number: "01",
        title: "Discover",
        description: "We dive deep into understanding your business, users, and goals. Research-driven insights form the foundation of every project.",
    },
    {
        number: "02",
        title: "Define",
        description: "We synthesize findings into clear strategies and design principles that guide every decision throughout the project.",
    },
    {
        number: "03",
        title: "Design",
        description: "From wireframes to high-fidelity prototypes, we craft every detail with precision, ensuring beauty meets functionality.",
    },
    {
        number: "04",
        title: "Deliver",
        description: "We build and refine until perfection, providing all assets, documentation, and support for a smooth launch.",
    },
];

const skills = [
    "UI Design", "UX Design", "Web Development", "Brand Identity",
    "Design Systems", "Prototyping", "User Research", "Figma",
    "Framer", "React", "Next.js", "TypeScript",
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
    },
};

export function AboutPageClient({ stats, testimonials }: AboutPageClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const displayStats = stats || defaultStats;

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef}>
            {/* ═══════════════════════════════════════════════════════════════════
                HERO - Full viewport, immersive
            ═══════════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 md:pt-32"
            >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900 dark:to-transparent" />

                {/* Large background text */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ y: heroY }}
                >
                    <span className="font-serif text-[20vw] md:text-[15vw] text-neutral-900/[0.03] dark:text-white/[0.03] whitespace-nowrap">
                        ABOUT
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
                        className="max-w-4xl mx-auto"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase mb-8"
                        >
                            <ShinyText
                                speed={4}
                                shineColor="rgba(20, 184, 166, 0.6)"
                                color="currentColor"
                            >
                                About Us
                            </ShinyText>
                        </motion.p>

                        <h1 className="font-serif leading-[1.05] mb-8">
                            <span className="block">
                                A studio of{" "}
                                <GradientText
                                    colors={["#14B8A6", "#06B6D4", "#0EA5E9"]}
                                    animationSpeed={5}
                                    className="italic"
                                >
                                    radical
                                </GradientText>
                            </span>
                            <span className="block">
                                optimists crafting
                            </span>
                            <span className="block">
                                <GradientText
                                    colors={["#06B6D4", "#14B8A6", "#22D3EE"]}
                                    animationSpeed={6}
                                    className="italic"
                                >
                                    new experiences.
                                </GradientText>
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            <BlurText
                                text="We believe in the power of design to transform businesses, captivate audiences, and create meaningful connections in the digital world."
                                animateBy="words"
                                delay={60}
                                stepDuration={0.35}
                            />
                        </p>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center"
                    >
                        <motion.div
                            className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                STATS - Dynamic from Sanity
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-32 border-y border-neutral-200 dark:border-neutral-800">
                <div className="container">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {displayStats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <p className="font-serif text-5xl md:text-7xl mb-3">
                                    {stat.value}
                                    <span className="text-neutral-400">{stat.suffix}</span>
                                </p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                PRINCIPLES - New Genre inspired
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 md:mb-24"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                            Our Principles
                        </p>
                        <h2 className="font-serif max-w-2xl">
                            Guided by values that <span className="italic">define</span> our craft.
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                variants={itemVariants}
                                className="group relative p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-xl bg-white dark:bg-neutral-900/50"
                            >
                                {/* Number watermark */}
                                <span className="absolute top-4 right-4 font-serif text-6xl text-neutral-100 dark:text-neutral-800 select-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <principle.icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        {principle.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                APPROACH - Process steps
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="section bg-neutral-50 dark:bg-neutral-900/50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                    >
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                                Our Process
                            </p>
                            <h2 className="font-serif">
                                How we <span className="italic">work</span>
                            </h2>
                        </div>
                        <Link
                            href="/approach"
                            className="inline-flex items-center gap-2 text-sm font-medium group"
                        >
                            <span>Learn more about our approach</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="space-y-0">
                        {approaches.map((approach, index) => (
                            <motion.div
                                key={approach.number}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group grid md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors -mx-6 px-6 rounded-xl"
                            >
                                <div className="md:col-span-2">
                                    <span className="font-serif text-4xl md:text-5xl text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-500 transition-colors">
                                        {approach.number}
                                    </span>
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="font-serif text-2xl md:text-3xl">{approach.title}</h3>
                                </div>
                                <div className="md:col-span-7">
                                    <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        {approach.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                SKILLS - Tags cloud
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                            Expertise & Tools
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {skills.map((skill) => (
                            <motion.div key={skill} variants={itemVariants}>
                                <Badge
                                    variant="outline"
                                    className="px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors cursor-default"
                                >
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CTA - Premium Theme-Aware Style
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
                        Let&apos;s write your{" "}
                        <span className="italic">
                            <GradientText
                                colors={["#14B8A6", "#06B6D4", "#22D3EE", "#14B8A6"]}
                                animationSpeed={5}
                            >
                                next chapter
                            </GradientText>
                        </span>{" "}
                        together.
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl text-neutral-600 dark:text-white/60 mb-12 max-w-lg mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        We&apos;re always excited to work with ambitious brands who share our passion for exceptional design.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-12 py-6 text-lg font-semibold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white rounded-full shadow-[0_8px_32px_rgba(20,184,166,0.4)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.6)] hover:scale-105 transition-all duration-300 group"
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
