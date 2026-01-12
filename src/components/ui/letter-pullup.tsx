"use client";

import { motion } from "framer-motion";

interface LetterPullUpProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function LetterPullUp({
    text,
    className = "",
    delay = 0.03,
    duration = 0.4,
}: LetterPullUpProps) {
    const letters = text.split("");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay,
            },
        },
    };

    const letterVariants = {
        hidden: {
            y: "100%",
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
            },
        },
    };

    return (
        <motion.span
            className={`inline-flex overflow-hidden ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ display: "inline-block" }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
