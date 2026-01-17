"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
    _id?: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
}

interface TestimonialsProps {
    testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
    {
        quote: "The attention to detail and creative vision exceeded our expectations. Our new platform perfectly captures our brand essence.",
        author: "Sarah Chen",
        role: "CEO",
        company: "TechVenture"
    },
    {
        quote: "Working with this studio felt like a true partnership. They understood our vision from day one and elevated it beyond imagination.",
        author: "Michael Torres",
        role: "Head of Product",
        company: "Innovate Labs"
    },
    {
        quote: "The level of craft and strategic thinking brought to our project was exceptional. A truly transformative collaboration.",
        author: "Emma Williams",
        role: "Creative Director",
        company: "DesignForward"
    },
];

export function Testimonials({ testimonials: propTestimonials }: TestimonialsProps) {
    const testimonials = propTestimonials && propTestimonials.length > 0
        ? propTestimonials
        : defaultTestimonials;

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="section overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        What clients say
                    </p>
                </motion.div>

                {/* Responsive testimonial container: taller on mobile for longer quotes */}
                <div className="max-w-4xl mx-auto relative min-h-[320px] md:min-h-[200px]">
                    {/* Quote Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute -top-4 -left-4 md:-left-8"
                    >
                        <Quote className="w-12 h-12 md:w-16 md:h-16 text-neutral-200 dark:text-neutral-800 fill-current" />
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="text-center"
                        >
                            <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.3] mb-8">
                                &ldquo;{testimonials[current].quote}&rdquo;
                            </blockquote>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-base font-medium">
                                    {testimonials[current].author}
                                </p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {testimonials[current].role && `${testimonials[current].role}, `}
                                    {testimonials[current].company}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                    ? "bg-neutral-900 dark:bg-white w-8"
                                    : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
