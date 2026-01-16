"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { Testimonials } from "@/components/ui/testimonials";
import { PhilosophySection } from "@/components/ui/philosophy-section";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { SplitText } from "@/components/ui/split-text";
import { BlurText } from "@/components/ui/blur-text";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";

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

interface LegacyProject {
    slug: string;
    title: string;
    description: string;
    category: string;
    tools: string[];
}

type Project = SanityProject | LegacyProject;

interface Testimonial {
    _id?: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
}

interface HomePageClientProps {
    projects: Project[];
    testimonials?: Testimonial[];
}

export function HomePageClient({ projects, testimonials }: HomePageClientProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Parallax effects for hero
    const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const watermarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <>
            {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Immersive with Parallax
          ═══════════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-6"
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient orbs */}
                    <motion.div
                        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent blur-3xl"
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
                        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl"
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

                {/* Background Watermark */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ scale: watermarkScale }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="font-serif text-[25vw] md:text-[18vw] text-neutral-900/[0.03] dark:text-white/[0.03] whitespace-nowrap"
                    >
                        STUDIO
                    </motion.span>
                </motion.div>

                {/* Hero Content with Parallax */}
                <motion.div
                    className="container relative z-10 text-center"
                    style={{ y: heroTextY, opacity: heroOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Main Headline - Animated with SplitText */}
                        <h1 className="font-serif leading-[1.05] mb-4 md:mb-6">
                            <span className="block">
                                <SplitText
                                    text="We design"
                                    delay={40}
                                    animateBy="letters"
                                    duration={0.5}
                                />
                            </span>
                            <span className="block">
                                <span className="italic text-neutral-500 dark:text-neutral-400">
                                    <SplitText
                                        text="experiences"
                                        delay={35}
                                        animateBy="letters"
                                        duration={0.4}
                                    />
                                </span>{" "}
                                <SplitText
                                    text="that"
                                    delay={40}
                                    animateBy="letters"
                                    duration={0.4}
                                />
                            </span>
                            <span className="block relative">
                                <GradientText
                                    colors={["#8B5CF6", "#EC4899", "#6366F1", "#8B5CF6"]}
                                    animationSpeed={6}
                                >
                                    <SplitText
                                        text="inspire"
                                        delay={50}
                                        animateBy="letters"
                                        duration={0.5}
                                    />
                                </GradientText>
                            </span>
                        </h1>

                        {/* Strong tagline completing the hero message */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed mt-2 md:mt-4 mb-2 md:mb-3 px-2"
                        >
                            From concept to reality, we craft digital masterpieces that captivate audiences and elevate brands.
                        </motion.p>

                        {/* Subtext with BlurText animation */}
                        <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed mb-4 md:mb-6 px-4">
                            <BlurText
                                text="Award-winning studio specializing in premium web experiences, brand identities, and digital innovation."
                                animateBy="words"
                                delay={60}
                                stepDuration={0.35}
                            />
                        </p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mt-4"
                        >
                            <AnimatedButton href="/projects">
                                View our work
                            </AnimatedButton>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                                Get in touch
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          TECH STACK MARQUEE
          ═══════════════════════════════════════════════════════════════════ */}
            <TechMarquee />

            {/* ═══════════════════════════════════════════════════════════════════
          PROJECT SHOWCASE - Scroll-triggered reveal
          ═══════════════════════════════════════════════════════════════════ */}
            <ProjectShowcase projects={projects} />

            {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════ */}
            <Testimonials testimonials={testimonials} />

            {/* ═══════════════════════════════════════════════════════════════════
          PHILOSOPHY SECTION
          ═══════════════════════════════════════════════════════════════════ */}
            <PhilosophySection />

            {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION - Final call to action
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="section border-t border-neutral-200 dark:border-neutral-800">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-6">
                            Ready to start?
                        </p>
                        <h2 className="font-serif mb-8">
                            <BlurText
                                text="Let's create something"
                                animateBy="words"
                                delay={80}
                                stepDuration={0.4}
                            />{" "}
                            <GradientText
                                colors={["#8B5CF6", "#EC4899", "#3B82F6"]}
                                animationSpeed={5}
                                className="italic"
                            >
                                extraordinary
                            </GradientText>{" "}
                            <BlurText
                                text="together."
                                animateBy="words"
                                delay={80}
                                stepDuration={0.4}
                            />
                        </h2>
                        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-10">
                            Have a project in mind? We&apos;d love to hear about it. Drop us a line and let&apos;s make it happen.
                        </p>
                        <AnimatedButton href="/contact">
                            Start a project
                        </AnimatedButton>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
