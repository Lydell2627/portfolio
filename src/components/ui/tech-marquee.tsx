"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Tech stack with display order
const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Figma",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Prisma",
    "Vercel",
    "Supabase",
    "PostgreSQL",
    "GraphQL",
];

function TechBadge({ name }: { name: string }) {
    return (
        <Badge
            variant="outline"
            className="mx-2 px-4 py-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 cursor-default"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 group-hover:bg-neutral-900 dark:group-hover:bg-white transition-colors mr-2" />
            {name}
        </Badge>
    );
}

export function TechMarquee() {
    // Triple the array for seamless infinite loop
    const tripled = [...technologies, ...technologies, ...technologies];

    return (
        <section className="py-16 md:py-20 overflow-hidden border-y border-neutral-200 dark:border-neutral-800">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mb-10"
            >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 text-center">
                    Technologies & Tools
                </p>
            </motion.div>

            <div className="relative">
                {/* Gradient masks for smooth fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

                {/* First Row - scrolls left */}
                <motion.div
                    className="flex mb-4"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        x: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {tripled.map((tech, index) => (
                        <TechBadge key={`row1-${tech}-${index}`} name={tech} />
                    ))}
                </motion.div>

                {/* Second Row - scrolls right (reversed) */}
                <motion.div
                    className="flex"
                    animate={{ x: ["-33.33%", "0%"] }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {[...tripled].reverse().map((tech, index) => (
                        <TechBadge key={`row2-${tech}-${index}`} name={tech} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
