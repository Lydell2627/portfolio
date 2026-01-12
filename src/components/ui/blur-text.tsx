"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";

interface BlurTextProps {
    text: string;
    className?: string;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    delay?: number;
    stepDuration?: number;
    threshold?: number;
    rootMargin?: string;
    onAnimationComplete?: () => void;
}

export function BlurText({
    text,
    className = "",
    animateBy = "words",
    direction = "bottom",
    delay = 80,
    stepDuration = 0.4,
    threshold = 0.1,
    rootMargin = "0px",
    onAnimationComplete,
}: BlurTextProps) {
    const elements = useMemo(() => {
        if (animateBy === "words") {
            return text.split(" ");
        }
        return text.split("");
    }, [text, animateBy]);

    const yOffset = direction === "top" ? -15 : 15;

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay / 1000,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: yOffset,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: stepDuration,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold, margin: rootMargin }}
            onAnimationComplete={onAnimationComplete}
            style={{ display: "inline" }}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {element === " " ? "\u00A0" : element}
                    {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </motion.span>
    );
}
