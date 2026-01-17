"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Dribbble, ArrowUp } from "lucide-react";

interface SiteSettings {
    contactEmail?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        dribbble?: string;
        behance?: string;
    };
}

interface FooterProps {
    siteSettings?: SiteSettings;
}

const navLinks = [
    { href: "/projects", label: "Work" },
    { href: "/about", label: "Info" },
    { href: "/approach", label: "Approach" },
    { href: "/contact", label: "Contact" },
];

export function Footer({ siteSettings }: FooterProps) {
    const currentYear = new Date().getFullYear();

    // Use Sanity data or fallback to defaults
    const email = siteSettings?.contactEmail || "hello@studio.design";
    const socials = siteSettings?.socialLinks;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Build social links array dynamically
    const socialLinks = [
        socials?.instagram && { href: socials.instagram, icon: Instagram, label: "Instagram" },
        socials?.twitter && { href: socials.twitter, icon: Twitter, label: "Twitter" },
        socials?.linkedin && { href: socials.linkedin, icon: Linkedin, label: "LinkedIn" },
        socials?.dribbble && { href: socials.dribbble, icon: Dribbble, label: "Dribbble" },
    ].filter(Boolean) as { href: string; icon: typeof Instagram; label: string }[];

    // If no socials from Sanity, use defaults
    const displaySocials = socialLinks.length > 0 ? socialLinks : [
        { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
        { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
        { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
        { href: "https://dribbble.com", icon: Dribbble, label: "Dribbble" },
    ];

    return (
        <footer className="dark-section">
            {/* Marquee Section */}
            <div className="py-8 md:py-16 lg:py-24 overflow-hidden border-b border-white/10">
                <div className="animate-marquee whitespace-nowrap flex">
                    {[...Array(4)].map((_, i) => (
                        <span
                            key={i}
                            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-9xl mx-4 md:mx-8 opacity-20"
                        >
                            LET&apos;S CREATE TOGETHER • DESIGN WITH PURPOSE •
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            {/* Responsive footer grid with mobile-first spacing */}
            <div className="container py-10 md:py-16 lg:py-24 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    {/* Left - Branding & Back to Top */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-semibold tracking-tight">STUDIO</span>
                        </Link>
                        <p className="text-sm text-[var(--dark-secondary)] max-w-xs leading-relaxed">
                            A creative design agency crafting premium digital experiences for
                            ambitious brands that dare to be different.
                        </p>

                        {/* Back to Top Button */}
                        <motion.button
                            onClick={scrollToTop}
                            className="group flex items-center gap-3 text-sm font-medium text-white hover:text-white/80 transition-colors"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover:border-white/40 group-hover:bg-white/5 transition-all">
                                <ArrowUp className="w-4 h-4" />
                            </span>
                            <span>Back to top</span>
                        </motion.button>
                    </div>

                    {/* Center - Quick Links */}
                    <div className="md:col-span-3 md:col-start-6 space-y-6">
                        <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--dark-secondary)]">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm hover:text-white/60 transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right - Contact & Social */}
                    <div className="md:col-span-3 space-y-8">
                        <div className="space-y-4">
                            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--dark-secondary)]">
                                Get in touch
                            </h4>
                            <a
                                href={`mailto:${email}`}
                                className="text-sm hover:text-white/60 transition-colors block"
                            >
                                {email}
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--dark-secondary)]">
                                Follow us
                            </h4>
                            <div className="flex gap-3">
                                {displaySocials.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
                                        aria-label={social.label}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-xs text-[var(--dark-secondary)]">
                        © {currentYear} STUDIO. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-xs text-[var(--dark-secondary)] hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-xs text-[var(--dark-secondary)] hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
