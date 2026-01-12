"use client";

import { motion } from "framer-motion";
import { Sparkles, Eye, Zap, Heart } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { GradientText } from "@/components/ui/gradient-text";

const philosophies = [
    {
        icon: Sparkles,
        title: "Craft with Purpose",
        description: "Every pixel, every interaction is intentional—designed to create meaningful experiences that resonate.",
    },
    {
        icon: Eye,
        title: "Design for Clarity",
        description: "We believe the best design feels invisible. It guides, it communicates, it just works.",
    },
    {
        icon: Zap,
        title: "Innovate Boldly",
        description: "Pushing boundaries while respecting fundamentals. Fresh perspectives rooted in solid principles.",
    },
    {
        icon: Heart,
        title: "Build with Care",
        description: "We treat every project as our own. Your success is our success, and we're invested in the journey.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
        },
    },
};

export function PhilosophySection() {
    return (
        <section className="section bg-neutral-50 dark:bg-neutral-900/50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
                        Our Philosophy
                    </p>
                    <h2 className="font-serif max-w-2xl mx-auto">
                        <BlurText
                            text="Guided by principles that"
                            animateBy="words"
                            delay={70}
                            stepDuration={0.35}
                        />{" "}
                        <GradientText
                            colors={["#8B5CF6", "#EC4899", "#6366F1"]}
                            animationSpeed={5}
                            className="italic"
                        >
                            define
                        </GradientText>{" "}
                        <BlurText
                            text="our work."
                            animateBy="words"
                            delay={70}
                            stepDuration={0.35}
                        />
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {philosophies.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            className="group p-8 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                            </div>
                            <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
