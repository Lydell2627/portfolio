"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Editorial Style
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif text-[20vw] md:text-[15vw] text-neutral-900/5 dark:text-white/5 whitespace-nowrap">
            STUDIO©
          </span>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Tagline */}
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-4 tracking-wide">
              Creative Design Agency
            </p>

            {/* Main Headline */}
            <h1 className="font-serif leading-[1.1]">
              Crafting{" "}
              <span className="italic">digital</span>
              {" "}experiences
              <br className="hidden md:block" />
              {" "}that{" "}
              <span className="italic">inspire.</span>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto"
            >
              We design and build premium interfaces for brands that want to
              stand out in the digital landscape.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10"
            >
              <AnimatedButton href="/projects">
                Explore our work
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SELECTED PROJECTS - 2 Column Grid
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-serif">
              <span className="italic">Selected</span> Projects
            </h2>
          </motion.div>

          {/* 2-Column Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 md:mt-24 text-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-base font-medium group"
            >
              <span>View all projects</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT SNIPPET
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section border-t border-neutral-200 dark:border-neutral-700">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Left - Large Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif leading-[1.2]">
                We believe great design should feel{" "}
                <span className="italic">invisible</span>—it just works.
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                Our approach combines strategic thinking with meticulous craft.
                Every pixel, every interaction is intentional—designed to create
                experiences that feel natural and delightful.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-base font-medium group"
              >
                <span>About our approach</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
