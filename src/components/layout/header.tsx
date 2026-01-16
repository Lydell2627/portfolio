"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/projects", label: "Work", number: "1" },
    { href: "/about", label: "Info", number: "2" },
    { href: "/approach", label: "Approach", number: "3" },
];

// Logo SVG Component
function LogoIcon({ className }: { className?: string }) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="4.706" cy="16" r="4.706" fill="currentColor" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="currentColor" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="currentColor" />
            <circle cx="27.294" cy="16" r="4.706" fill="currentColor" />
        </svg>
    );
}

// Text Reveal Link Component
function TextRevealLink({
    href,
    children,
    number,
}: {
    href: string;
    children: string;
    number: string;
}) {
    return (
        <Link
            href={href}
            className="relative overflow-hidden h-6 group flex items-baseline gap-0.5"
        >
            <span className="relative overflow-hidden h-6 flex items-center">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
                    {children}
                </span>
                <span className="block absolute top-full left-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
                    {children}
                </span>
            </span>
            <sup className="text-[9px] opacity-50 transition-opacity duration-500 group-hover:opacity-100">{number}</sup>
        </Link>
    );
}

// Wrapper for the individual pills to handle background transitions
function PillWrapper({
    children,
    className,
    isScrolled
}: {
    children: React.ReactNode;
    className?: string;
    isScrolled: boolean;
}) {
    return (
        <motion.div
            layout
            className={cn(
                "flex items-center",
                "h-12 md:h-14",
                "px-3 md:px-6",
                "transition-colors duration-300",
                // Mobile: Always transparent (parent has the styling)
                // Desktop: Show individual pill styling when NOT scrolled
                "bg-transparent border-transparent",
                !isScrolled && "md:bg-neutral-900 md:dark:bg-white md:border md:border-neutral-800 md:dark:border-neutral-200",
                "text-white dark:text-neutral-900",
                "rounded-full",
                className
            )}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 20,
                mass: 1
            }}
        >
            {children}
        </motion.div>
    );
}

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine visibility based on scroll direction
            // Hide (false) if scrolling DOWN and not at top
            // Show (true) if scrolling UP or at top
            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false); // Scrolling DOWN
                } else {
                    setIsVisible(true); // Scrolling UP
                }
            } else {
                setIsVisible(true); // Always show at top
            }

            // Layout state for shape morphing
            setIsScrolled(currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]); // Depend on lastScrollY to compare

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Hover Trigger Zone - Reveals navbar when mouse is at top */}
            <div
                className="fixed top-0 left-0 right-0 h-24 z-50 bg-transparent"
                onMouseEnter={() => setIsVisible(true)}
            />

            <motion.header
                animate={{
                    y: isVisible ? 0 : "-100%"
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    // Add delay ONLY when hiding (scrolling down)
                    // This lets the user see the "morph" into a single pill before it vanishes
                    delay: isVisible ? 0 : 0.6
                }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "pt-4 md:pt-6 px-4 md:px-8",
                    "pointer-events-none"
                )}
            >
                {/* 
            SINGLE CONTINUOUS MOTION COMPONENT
            This moves from distinct pills (top) to one pill (scrolled) smoothly
            without unmounting/remounting components.
        */}
                <motion.nav
                    layout
                    className={cn(
                        "pointer-events-auto mx-auto",
                        "flex items-center",
                        // Removed transition-all to let Framer Motion handle fluid layout changes completely
                        // Layout Logic:
                        // Mobile: Always fit width, packed together (like scrolled state)
                        // Desktop Top: Full width, spread apart (justify-between)
                        // Desktop Scrolled: Fit width, packed together (justify-center, gap-0)
                        isScrolled
                            ? "w-fit bg-neutral-900 dark:bg-white border border-neutral-800 dark:border-neutral-200 rounded-full shadow-lg p-0 gap-0"
                            : "w-fit bg-neutral-900 dark:bg-white border border-neutral-800 dark:border-neutral-200 rounded-full shadow-lg p-0 gap-0 md:w-full md:bg-transparent md:dark:bg-transparent md:border-none md:shadow-none md:gap-3 md:justify-between md:rounded-none"
                    )}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 20,
                        mass: 1
                    }}
                >
                    {/* Group 1: Logo */}
                    <PillWrapper
                        isScrolled={isScrolled}
                        // Mobile: Always transparent bg (parent has bg)
                        className="bg-transparent border-transparent md:bg-neutral-900 md:dark:bg-white md:border-neutral-800"
                    >
                        <Link href="/" className="flex items-center gap-3 pl-2 md:pl-0">
                            <motion.div
                                animate={{ rotate: isScrolled ? 360 : 0 }}
                                whileHover={{ rotate: isScrolled ? 450 : 90 }}
                                whileTap={{ scale: 0.9, rotate: isScrolled ? 315 : -45 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <LogoIcon className="w-5 h-5" />
                            </motion.div>
                            <div className="flex flex-col leading-none">
                                <span className="text-sm font-semibold tracking-tight">STUDIO</span>
                                <span className={cn(
                                    "text-[10px] opacity-60",
                                    // Hide subtitle on scroll to save space if needed, or keep it
                                    isScrolled && "hidden md:block"
                                )}>
                                    Design Agency
                                </span>
                            </div>
                        </Link>
                    </PillWrapper>

                    {/* Group 2: Navigation Links */}
                    <PillWrapper
                        isScrolled={isScrolled}
                        className={cn("hidden md:flex", isScrolled ? "px-2" : "")}
                    >
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <TextRevealLink key={link.href} href={link.href} number={link.number}>
                                    {link.label}
                                </TextRevealLink>
                            ))}
                        </div>
                    </PillWrapper>

                    {/* Group 3: CTA + Theme */}
                    <PillWrapper
                        isScrolled={isScrolled}
                        // Mobile: Always transparent bg
                        className="bg-transparent border-transparent md:bg-neutral-900 md:dark:bg-white md:border-neutral-800"
                    >
                        <div className="flex items-center gap-2 md:gap-4 pr-1 md:pr-0">
                            {/* Theme Toggle */}
                            <motion.button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
                                whileHover={{ rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle theme"
                                suppressHydrationWarning
                            >
                                {mounted && (theme === "dark" ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                ))}
                            </motion.button>

                            {/* Book a call CTA - Hidden on Mobile to save space */}
                            <Link
                                href="/contact"
                                className={cn(
                                    "hidden md:inline-flex", // Hide on mobile
                                    "px-4 py-2",
                                    "text-xs font-medium",
                                    "!bg-white !text-black",
                                    "rounded-full",
                                    "transition-all duration-500 ease-out",
                                    "hover:scale-105 active:scale-95"
                                )}
                            >
                                Book a call
                            </Link>

                            {/* Mobile Menu Button - Larger click area */}
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden w-10 h-10 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Open menu"
                            >
                                <Menu className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </PillWrapper>

                </motion.nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            className="fixed inset-0 z-[100] bg-neutral-900 dark:bg-neutral-100 md:hidden"
                        >
                            <div className="container h-full flex flex-col text-white dark:text-neutral-900">
                                {/* Mobile Header */}
                                <motion.div
                                    className="flex items-center justify-between h-20"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2"
                                    >
                                        <LogoIcon className="w-6 h-6" />
                                        <span className="text-sm font-semibold tracking-tight">STUDIO</span>
                                    </Link>
                                    <motion.button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center"
                                        whileHover={{ rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>

                                {/* Mobile Nav Links */}
                                <nav className="flex-1 flex flex-col justify-center gap-8">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.2 + index * 0.15,
                                                duration: 0.8,
                                                ease: [0.23, 1, 0.32, 1]
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-baseline gap-3 group"
                                            >
                                                <span className="font-serif text-6xl tracking-tight transition-transform duration-700 ease-out group-hover:translate-x-4">
                                                    {link.label}
                                                </span>
                                                <sup className="text-base opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                                    {link.number}
                                                </sup>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Mobile CTA */}
                                <motion.div
                                    className="pb-12 pt-4"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "inline-flex items-center justify-center w-full",
                                            "px-8 py-5",
                                            "text-base font-semibold",
                                            "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white",
                                            "rounded-full",
                                            "transition-all duration-300 active:scale-95"
                                        )}
                                    >
                                        Book a call
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
