"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/ui/split-text";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { BlurText } from "@/components/ui/blur-text";
import { LetterPullUp } from "@/components/ui/letter-pullup";

// Premium spring physics for buttery smooth animations
const smoothSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 30,
    mass: 0.8,
};

// Approach sections data with Ashcamp-style pills
const approaches = [
    {
        number: "(1)",
        title: "Understand",
        paragraphs: [
            "Understanding the problem is essential to creating successful solutions. That's why we always start our design process with a research phase.",
            "By diving deep into user needs and pain points, as well as business goals and market trends, we create a design strategy that addresses the core problem and meets the needs of the target.",
            "This research informs everything from the initial sketches to the final product design, ensuring that the end result is a solution that solves the problem effectively and delights users."
        ],
        pills: [
            { label: "business objectives", rotation: -3, floatDelay: 0 },
            { label: "competitors analysis", rotation: 4, floatDelay: 0.5 },
            { label: "product goals", rotation: -2, floatDelay: 1 },
            { label: "market research", rotation: 5, floatDelay: 1.5 },
            { label: "target audience", rotation: -4, floatDelay: 2 },
            { label: "functional specs", rotation: 3, floatDelay: 2.5 },
        ],
    },
    {
        number: "(2)",
        title: "Ideate",
        paragraphs: [
            "During this phase we take all the insights and knowledge we've gained and start to generate and explore potential solutions.",
            "Our goal is to test different ideas and iterate on the best ones until we arrive at the optimal solution.",
            "It's an exciting and collaborative process that results in a digital product that is both functional and delightful to use."
        ],
        pills: [
            { label: "moodboards", rotation: 3, floatDelay: 0.3 },
            { label: "sketching", rotation: -5, floatDelay: 0.8 },
            { label: "user flows", rotation: 2, floatDelay: 1.3 },
            { label: "brainstorming", rotation: -3, floatDelay: 1.8 },
        ],
    },
    {
        number: "(3)",
        title: "Design",
        paragraphs: [
            "We believe that good design is about connecting the dots and exploring different versions to discover the best solution.",
            "Our ultimate goal is to create an experience that not only highlights the unique characteristics of each project and company but is also elegant and user-friendly.",
            "We work closely with stakeholders and users to obtain valuable feedback and insights that drive continuous improvement and refinement."
        ],
        pills: [
            { label: "visual concepts", rotation: -4, floatDelay: 0.2 },
            { label: "ux architecture", rotation: 3, floatDelay: 0.7 },
            { label: "prototyping", rotation: -2, floatDelay: 1.2 },
            { label: "design systems", rotation: 5, floatDelay: 1.7 },
            { label: "user testing", rotation: -3, floatDelay: 2.2 },
            { label: "refinement", rotation: 4, floatDelay: 2.7 },
        ],
    },
];

// Animated Paragraph with scroll-driven opacity (Ashcamp's "highlighter" effect)
function AnimatedParagraph({ text, index }: { text: string; index: number }) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.3"], // Fade in as it enters the focus zone
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.7, 1]);
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    return (
        <motion.p
            ref={ref}
            style={{ opacity: smoothOpacity }}
            className="text-base md:text-lg leading-relaxed mb-6 last:mb-0"
        >
            {text}
        </motion.p>
    );
}

// Floating Pill with continuous bobbing animation
function FloatingPill({
    label,
    rotation,
    floatDelay,
    index,
}: {
    label: string;
    rotation: number;
    floatDelay: number;
    index: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isInView ? {
                opacity: 1,
                scale: 1,
                y: 0,
            } : {}}
            transition={{
                ...smoothSpring,
                delay: index * 0.1,
            }}
            className="inline-block"
        >
            <motion.span
                animate={{
                    y: [0, -6, 0],
                    rotate: [rotation, rotation + 1, rotation],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: floatDelay,
                }}
                whileHover={{
                    scale: 1.08,
                    y: -8,
                    boxShadow: "4px 4px 0px 0px var(--foreground)",
                }}
                className={cn(
                    "inline-block",
                    "px-4 py-2",
                    "text-sm font-medium",
                    "bg-[var(--background)]",
                    "border-2 border-[var(--foreground)]",
                    "rounded-full",
                    "shadow-[3px_3px_0px_0px_var(--foreground)]",
                    "cursor-default",
                    "transition-shadow duration-200"
                )}
                style={{ rotate: rotation }}
            >
                {label}
            </motion.span>
        </motion.span>
    );
}

// Process Section Component
function ProcessSection({
    approach,
    index,
}: {
    approach: (typeof approaches)[0];
    index: number;
}) {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <motion.section
            ref={sectionRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen py-32 md:py-48 border-t border-[var(--border)] snap-start snap-always flex items-center"
            id={`section-${index}`}
        >
            <div className="container">
                <div className="grid md:grid-cols-12 gap-12 md:gap-16">
                    {/* Left Column - Sticky Number & Title */}
                    <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
                        {/* Large decorative number */}
                        <motion.span
                            className="block font-serif text-7xl md:text-8xl lg:text-9xl text-[var(--text-tertiary)]/20 leading-none mb-4"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...smoothSpring, delay: 0.1 }}
                        >
                            {approach.number}
                        </motion.span>

                        {/* Title with LetterPullUp animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...smoothSpring, delay: 0.2 }}
                        >
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                                <LetterPullUp text={approach.title} delay={0.04} duration={0.5} />
                            </h2>
                        </motion.div>
                    </div>

                    {/* Right Column - Paragraphs with scroll-driven opacity */}
                    <div className="md:col-span-5">
                        <div className="max-w-lg">
                            {approach.paragraphs.map((paragraph, pIndex) => (
                                <AnimatedParagraph
                                    key={pIndex}
                                    text={paragraph}
                                    index={pIndex}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Floating Pills Column */}
                    <div className="md:col-span-3 relative min-h-[250px] flex flex-wrap content-start gap-4">
                        {approach.pills.map((pill, pillIndex) => (
                            <FloatingPill
                                key={pill.label}
                                label={pill.label}
                                rotation={pill.rotation}
                                floatDelay={pill.floatDelay}
                                index={pillIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default function ApproachPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 snap-start snap-always overflow-hidden">
                {/* Animated Background Elements */}
                {/* Performance: will-change hints for GPU acceleration, slower animations for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient orbs - Orange/Amber theme, responsive sizing */}
                    <motion.div
                        className="absolute top-1/4 -left-1/2 md:-left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-3xl will-change-transform"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -right-1/2 md:-right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent blur-3xl will-change-transform"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="font-serif text-[20vw] md:text-[15vw] text-neutral-900/[0.03] dark:text-white/[0.03] whitespace-nowrap">
                        APPROACH
                    </span>
                </div>

                <motion.div
                    className="text-center max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Main Headline - Ashcamp style with SplitText */}
                    <h1 className="font-serif leading-[1.05]">
                        <span className="block">
                            <SplitText
                                text="The first step"
                                delay={40}
                                animateBy="letters"
                                duration={0.5}
                            />
                        </span>
                        <span className="block">
                            <SplitText
                                text="of the process"
                                delay={40}
                                animateBy="letters"
                                duration={0.5}
                            />
                        </span>
                        <span className="block italic text-[var(--text-secondary)]">
                            <SplitText
                                text="is to"
                                delay={40}
                                animateBy="letters"
                                duration={0.5}
                            />{" "}
                            <GradientText
                                colors={["#F59E0B", "#D97706", "#F97316", "#F59E0B"]}
                                animationSpeed={5}
                            >
                                trust the process.
                            </GradientText>
                        </span>
                    </h1>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    onClick={() => {
                        const nextSection = document.getElementById('section-0');
                        if (nextSection) {
                            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                >
                    {/* Arrow Circle */}
                    <motion.div
                        className={cn(
                            "w-14 h-14 rounded-full",
                            "border-2 border-[var(--foreground)]",
                            "flex items-center justify-center",
                            "group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]",
                            "transition-colors duration-300"
                        )}
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <span className="text-xl">↓</span>
                    </motion.div>
                    <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em]">
                        <ShinyText
                            speed={4}
                            shineColor="rgba(139, 92, 246, 0.6)"
                            color="currentColor"
                        >
                            How the magic happens
                        </ShinyText>
                    </span>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                PROCESS SECTIONS
            ═══════════════════════════════════════════════════════════════════ */}
            {approaches.map((approach, index) => (
                <ProcessSection
                    key={approach.title}
                    approach={approach}
                    index={index}
                />
            ))}

            {/* ═══════════════════════════════════════════════════════════════════
                FOOTER CTA - Theme-Aware
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="cta" className="min-h-screen snap-start snap-always flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
                {/* CTA */}
                <div className="container text-center">
                    <motion.h2
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Ready to create something{" "}
                        <span className="italic">
                            <GradientText
                                colors={["#F59E0B", "#FBBF24", "#F97316", "#F59E0B"]}
                                animationSpeed={5}
                            >
                                extraordinary
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
                        <BlurText
                            text="Let's bring your vision to life with award-winning design and development."
                            animateBy="words"
                            delay={70}
                            stepDuration={0.35}
                        />
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/contact"
                            className={cn(
                                "inline-flex items-center gap-3",
                                "px-12 py-6",
                                "text-lg font-semibold",
                                "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500",
                                "text-white",
                                "rounded-full",
                                "shadow-[0_8px_32px_rgba(245,158,11,0.4)]",
                                "hover:shadow-[0_12px_40px_rgba(245,158,11,0.6)]",
                                "hover:scale-105 transition-all duration-300",
                                "group"
                            )}
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
