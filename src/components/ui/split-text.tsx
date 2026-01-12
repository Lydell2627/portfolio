"use client";

import { useMemo } from "react";
import { motion, Variants, type Easing } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animateBy?: "words" | "letters";
    duration?: number;
    ease?: Easing;
    threshold?: number;
    onAnimationComplete?: () => void;
}

export function SplitText({
    text,
    className = "",
    delay = 50,
    animateBy = "letters",
    duration = 0.5,
    ease = [0.23, 1, 0.32, 1] as unknown as Easing,
    threshold = 0.1,
    onAnimationComplete,
}: SplitTextProps) {
    const elements = useMemo(() => {
        if (animateBy === "words") {
            return text.split(" ");
        }
        return text.split("");
    }, [text, animateBy]);

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
            y: 20,
            filter: "blur(4px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration,
                ease,
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            onAnimationComplete={onAnimationComplete}
            style={{ display: "inline-block" }}
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
