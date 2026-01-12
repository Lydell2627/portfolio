"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState("");

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for cursor
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Only show custom cursor on desktop
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            const cursorText = target.getAttribute("data-cursor");
            if (cursorText) {
                setIsHovering(true);
                setHoverText(cursorText);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setHoverText("");
        };

        // Track all elements with data-cursor attribute
        const interactiveElements = document.querySelectorAll("[data-cursor]");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Also track links and buttons
        const clickables = document.querySelectorAll("a, button");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", () => setIsHovering(true));
            el.addEventListener("mouseleave", () => setIsHovering(false));
        });

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", () => setIsHovering(true));
                el.removeEventListener("mouseleave", () => setIsHovering(false));
            });
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isHovering ? 2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-400/50"
                    animate={{
                        width: isHovering ? 80 : 40,
                        height: isHovering ? 80 : 40,
                        opacity: isHovering ? 1 : 0.5,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
            </motion.div>

            {/* Hover text label */}
            {hoverText && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[9997]"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    <div className="relative translate-x-8 -translate-y-1/2 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium rounded-full whitespace-nowrap">
                        {hoverText}
                    </div>
                </motion.div>
            )}
        </>
    );
}
