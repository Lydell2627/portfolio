"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Responsive breakpoints matching Tailwind CSS v4 defaults
 * sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
 */
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Custom hook for responsive breakpoint detection
 * Returns boolean indicating if the viewport is at or above the specified breakpoint
 * 
 * @param breakpoint - The Tailwind breakpoint to check ('sm', 'md', 'lg', 'xl', '2xl')
 * @returns boolean - true if viewport width >= breakpoint
 * 
 * @example
 * const isDesktop = useMediaQuery('lg');
 * const isMobile = !useMediaQuery('md');
 */
export function useMediaQuery(breakpoint: Breakpoint): boolean {
    const [matches, setMatches] = useState(false);

    const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;

    const handleChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
        setMatches(e.matches);
    }, []);

    useEffect(() => {
        // SSR safety: return false on server
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Modern browsers
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query, handleChange]);

    return matches;
}

/**
 * Hook to detect if user prefers reduced motion
 * Use this to disable complex animations on mobile or for accessibility
 * 
 * @returns boolean - true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

/**
 * Hook returning all common breakpoint states at once
 * Useful when you need multiple breakpoint checks in one component
 * 
 * @returns Object with boolean for each breakpoint
 */
export function useBreakpoints() {
    const isSm = useMediaQuery("sm");
    const isMd = useMediaQuery("md");
    const isLg = useMediaQuery("lg");
    const isXl = useMediaQuery("xl");
    const is2xl = useMediaQuery("2xl");

    return {
        isSm,   // >= 640px
        isMd,   // >= 768px
        isLg,   // >= 1024px
        isXl,   // >= 1280px
        is2xl,  // >= 1536px
        isMobile: !isMd,     // < 768px
        isTablet: isMd && !isLg, // 768px - 1023px
        isDesktop: isLg,     // >= 1024px
    };
}
