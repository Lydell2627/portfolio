"use client";

import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

/**
 * GradientText - Performance optimized animated gradient text
 * Uses pure CSS animations instead of useAnimationFrame for smooth mobile performance
 */
export function GradientText({
    children,
    className = "",
    colors = ["#8B5CF6", "#EC4899", "#3B82F6"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientColors = [...colors, colors[0]].join(", ");

    // CSS keyframes animation is much more performant than JS-driven animation
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
        backgroundClip: "text" as const,
        animation: `gradient-shift ${animationSpeed}s linear infinite`,
    };

    return (
        <>
            <style jsx global>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
            <span
                className={`${showBorder ? "gradient-text-border" : ""} ${className}`}
                style={{
                    ...gradientStyle,
                    display: "inline-block",
                    willChange: "background-position",
                }}
            >
                {children}
            </span>
        </>
    );
}

