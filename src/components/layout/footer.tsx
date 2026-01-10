"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Dribbble } from "lucide-react";

const socialLinks = [
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://dribbble.com", icon: Dribbble, label: "Dribbble" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="dark-section">
            {/* Marquee Section */}
            <div className="py-16 md:py-24 overflow-hidden border-b border-white/10">
                <div className="animate-marquee whitespace-nowrap flex">
                    {[...Array(4)].map((_, i) => (
                        <span
                            key={i}
                            className="font-serif text-6xl md:text-8xl lg:text-9xl mx-8 opacity-20"
                        >
                            JOIN THE STUDIO • LET&apos;S CREATE TOGETHER •
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container py-12 md:py-20">
                <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                    {/* Left - Branding */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-lg font-semibold">STUDIO</span>
                        </Link>
                        <p className="text-sm text-[var(--dark-secondary)] max-w-xs">
                            A creative design agency crafting premium digital experiences for
                            ambitious brands.
                        </p>
                    </div>

                    {/* Center - Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--dark-secondary)]">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/projects"
                                className="text-sm hover:opacity-60 transition-opacity"
                            >
                                Work
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm hover:opacity-60 transition-opacity"
                            >
                                Info
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm hover:opacity-60 transition-opacity"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Right - Contact & Social */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--dark-secondary)]">
                                Get in touch
                            </h4>
                            <a
                                href="mailto:hello@studio.design"
                                className="text-sm hover:opacity-60 transition-opacity"
                            >
                                hello@studio.design
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
