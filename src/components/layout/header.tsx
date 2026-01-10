"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Work", number: "1" },
    { href: "/about", label: "Info", number: "2" },
    { href: "/contact", label: "Approach", number: "3" },
];

// Ultra smooth spring
const smoothSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
};

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

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    // Determine active link
    const getActivePath = () => {
        if (pathname === "/" || pathname.startsWith("/projects")) return "/";
        return pathname;
    };
    const activePath = getActivePath();

    // Base pill styles (shared)
    const pillBase = cn(
        "bg-white dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-800",
        "transition-shadow duration-500"
    );

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "pt-4 md:pt-5 px-4 md:px-8",
                    "pointer-events-none"
                )}
            >
                {/* Desktop Navigation */}
                <div className="hidden md:block relative h-14">
                    {/* LEFT PILL - Logo (corner when at top) */}
                    <motion.div
                        className={cn(
                            "pointer-events-auto absolute",
                            pillBase,
                            "h-14 flex items-center px-5",
                            isScrolled ? "shadow-lg" : "shadow-sm"
                        )}
                        initial={false}
                        animate={{
                            // At top: left edge with full pill shape
                            // Scrolled: move to center and flatten inner edge
                            left: isScrolled ? "50%" : 0,
                            x: isScrolled ? "-50%" : 0,
                            marginLeft: isScrolled ? -220 : 0,
                            borderRadius: isScrolled ? "9999px 0 0 9999px" : "9999px",
                            borderRightWidth: isScrolled ? 0 : 1,
                        }}
                        transition={smoothSpring}
                    >
                        <Link href="/" className="flex items-center gap-2.5">
                            <motion.div
                                whileHover={{ rotate: 90 }}
                                transition={smoothSpring}
                            >
                                <LogoIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                            </motion.div>
                            <div className="flex flex-col -space-y-0.5">
                                <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                                    STUDIO
                                </span>
                                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                    Design Agency
                                </span>
                            </div>
                        </Link>

                        {/* Divider - only visible when merged */}
                        <motion.div
                            className="bg-neutral-200 dark:bg-neutral-700"
                            initial={false}
                            animate={{
                                width: isScrolled ? 1 : 0,
                                height: 24,
                                marginLeft: isScrolled ? 20 : 0,
                                opacity: isScrolled ? 1 : 0,
                            }}
                            transition={smoothSpring}
                        />
                    </motion.div>

                    {/* CENTER PILL - Navigation */}
                    <motion.nav
                        className={cn(
                            "pointer-events-auto absolute left-1/2",
                            pillBase,
                            "h-14 flex items-center",
                            isScrolled ? "shadow-lg" : "shadow-sm"
                        )}
                        initial={false}
                        animate={{
                            x: "-50%",
                            paddingLeft: isScrolled ? 20 : 8,
                            paddingRight: isScrolled ? 20 : 8,
                            borderRadius: isScrolled ? 0 : "9999px",
                            borderLeftWidth: isScrolled ? 0 : 1,
                            borderRightWidth: isScrolled ? 0 : 1,
                        }}
                        transition={smoothSpring}
                    >
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2"
                                >
                                    {activePath === link.href && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className={cn(
                                                "absolute inset-0 rounded-full",
                                                isScrolled
                                                    ? "bg-neutral-100 dark:bg-neutral-800"
                                                    : "bg-neutral-900 dark:bg-white"
                                            )}
                                            transition={smoothSpring}
                                        />
                                    )}
                                    <span
                                        className={cn(
                                            "relative z-10 text-sm font-medium transition-colors duration-300",
                                            activePath === link.href
                                                ? isScrolled
                                                    ? "text-neutral-900 dark:text-white"
                                                    : "text-white dark:text-neutral-900"
                                                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                    <sup
                                        className={cn(
                                            "relative z-10 text-[9px] ml-0.5 transition-opacity duration-300",
                                            activePath === link.href
                                                ? isScrolled
                                                    ? "opacity-60"
                                                    : "text-white/60 dark:text-neutral-900/60"
                                                : "opacity-40"
                                        )}
                                    >
                                        {link.number}
                                    </sup>
                                </Link>
                            ))}
                        </div>
                    </motion.nav>

                    {/* RIGHT PILL - Theme Toggle & CTA (corner when at top) */}
                    <motion.div
                        className={cn(
                            "pointer-events-auto absolute top-0",
                            pillBase,
                            "h-14 flex items-center gap-4 px-5",
                            isScrolled ? "shadow-lg" : "shadow-sm"
                        )}
                        initial={false}
                        animate={{
                            // At top: right edge with full pill shape
                            // Scrolled: move to center and flatten inner edge
                            right: isScrolled ? "50%" : 0,
                            x: isScrolled ? "50%" : 0,
                            marginRight: isScrolled ? -220 : 0,
                            borderRadius: isScrolled ? "0 9999px 9999px 0" : "9999px",
                            borderLeftWidth: isScrolled ? 0 : 1,
                        }}
                        transition={smoothSpring}
                    >
                        {/* Divider - only visible when merged */}
                        <motion.div
                            className="bg-neutral-200 dark:bg-neutral-700"
                            initial={false}
                            animate={{
                                width: isScrolled ? 1 : 0,
                                height: 24,
                                marginRight: isScrolled ? 16 : 0,
                                opacity: isScrolled ? 1 : 0,
                            }}
                            transition={smoothSpring}
                        />

                        {/* Theme Toggle */}
                        <motion.button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-8 h-8 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            whileHover={{ rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === "dark" ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            ))}
                        </motion.button>

                        {/* CTA */}
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
                        >
                            Book a call
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <motion.nav
                        className={cn(
                            pillBase,
                            "rounded-full",
                            "pointer-events-auto",
                            "h-12 px-4",
                            "flex items-center justify-between w-full",
                            isScrolled ? "shadow-lg" : "shadow-sm"
                        )}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={smoothSpring}
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <LogoIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                                STUDIO
                            </span>
                        </Link>

                        <motion.button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-900 dark:text-white"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </motion.button>
                    </motion.nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-neutral-900 md:hidden"
                    >
                        <div className="container h-full flex flex-col">
                            <motion.div
                                className="flex items-center justify-between h-20"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2"
                                >
                                    <LogoIcon className="w-5 h-5 text-neutral-900 dark:text-white" />
                                    <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                                        STUDIO
                                    </span>
                                </Link>
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center text-neutral-900 dark:text-white"
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </motion.div>

                            <nav className="flex-1 flex flex-col justify-center gap-6">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.15 + index * 0.1,
                                            duration: 0.6,
                                            ease: [0.23, 1, 0.32, 1]
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-baseline gap-3 group py-2",
                                                activePath === link.href && "text-neutral-900 dark:text-white"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "font-serif text-5xl tracking-tight transition-all duration-500 ease-out",
                                                    activePath === link.href
                                                        ? "text-neutral-900 dark:text-white translate-x-4"
                                                        : "text-neutral-400 dark:text-neutral-500 group-hover:translate-x-4 group-hover:text-neutral-900 dark:group-hover:text-white"
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                            <sup
                                                className={cn(
                                                    "text-sm transition-opacity duration-500",
                                                    activePath === link.href
                                                        ? "opacity-100 text-neutral-900 dark:text-white"
                                                        : "opacity-40 group-hover:opacity-100"
                                                )}
                                            >
                                                {link.number}
                                            </sup>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                className="py-8"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "inline-flex items-center justify-center",
                                        "w-full px-6 py-4",
                                        "text-base font-medium",
                                        "bg-neutral-900 dark:bg-white",
                                        "text-white dark:text-neutral-900",
                                        "rounded-full",
                                        "transition-transform duration-300 active:scale-95"
                                    )}
                                >
                                    Book a call
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
