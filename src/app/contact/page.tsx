"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Send, Check, ArrowUpRight } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
    "$5k - $10k",
    "$10k - $25k",
    "$25k - $50k",
    "$50k+",
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const selectedBudget = watch("budget");

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Form submitted:", data);
            setIsSubmitted(true);
            reset();
        } catch {
            // Handle error silently
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 md:pt-32">
            <div className="container">
                {/* ═══════════════════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════════════════ */}
                <section className="section pt-8 md:pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <p className="text-sm text-[var(--text-secondary)] mb-4">(Contact)</p>
                        <h1 className="font-serif leading-[1.1]">
                            Let&apos;s start a{" "}
                            <span className="italic">conversation.</span>
                        </h1>
                        <p className="mt-8 text-lg text-[var(--text-secondary)] max-w-xl">
                            Have a project in mind? We&apos;d love to hear about it. Fill
                            out the form below and we&apos;ll get back to you within 24 hours.
                        </p>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
            FORM
            ═══════════════════════════════════════════════════════════════════ */}
                <section className="section pt-0">
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl py-20 text-center mx-auto"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-[var(--foreground)] flex items-center justify-center mx-auto mb-8">
                                <Check className="w-10 h-10" />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl mb-4">
                                Message sent!
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-8">
                                Thank you for reaching out. We&apos;ll get back to you soon.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-sm font-medium underline underline-offset-4 hover:opacity-60 transition-opacity"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="max-w-2xl space-y-12"
                        >
                            {/* Name & Email Row */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        className={cn(
                                            "w-full px-0 py-4",
                                            "bg-transparent",
                                            "border-0 border-b-2 border-[var(--border)]",
                                            "text-lg",
                                            "focus:outline-none focus:border-[var(--foreground)]",
                                            "transition-colors duration-300",
                                            "placeholder:text-[var(--text-tertiary)]",
                                            errors.name && "border-red-500"
                                        )}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={cn(
                                            "w-full px-0 py-4",
                                            "bg-transparent",
                                            "border-0 border-b-2 border-[var(--border)]",
                                            "text-lg",
                                            "focus:outline-none focus:border-[var(--foreground)]",
                                            "transition-colors duration-300",
                                            "placeholder:text-[var(--text-tertiary)]",
                                            errors.email && "border-red-500"
                                        )}
                                        placeholder="john@company.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <label
                                    htmlFor="company"
                                    className="block text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3"
                                >
                                    Company
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    {...register("company")}
                                    className={cn(
                                        "w-full px-0 py-4",
                                        "bg-transparent",
                                        "border-0 border-b-2 border-[var(--border)]",
                                        "text-lg",
                                        "focus:outline-none focus:border-[var(--foreground)]",
                                        "transition-colors duration-300",
                                        "placeholder:text-[var(--text-tertiary)]"
                                    )}
                                    placeholder="Your company (optional)"
                                />
                            </div>

                            {/* Budget Selection */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
                                    Project Budget
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {budgetOptions.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setValue("budget", option)}
                                            className={cn(
                                                "px-5 py-2.5 text-sm rounded-full border transition-all duration-300",
                                                selectedBudget === option
                                                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                                                    : "border-[var(--border)] hover:border-[var(--foreground)]"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3"
                                >
                                    Project details *
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    {...register("message")}
                                    className={cn(
                                        "w-full px-0 py-4",
                                        "bg-transparent",
                                        "border-0 border-b-2 border-[var(--border)]",
                                        "text-lg",
                                        "focus:outline-none focus:border-[var(--foreground)]",
                                        "transition-colors duration-300",
                                        "placeholder:text-[var(--text-tertiary)]",
                                        "resize-none",
                                        errors.message && "border-red-500"
                                    )}
                                    placeholder="Tell us about your project, goals, and timeline..."
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "group inline-flex items-center gap-4",
                                        "px-8 py-4",
                                        "text-sm font-medium",
                                        "bg-[var(--foreground)] text-[var(--background)]",
                                        "rounded-full",
                                        "hover:opacity-80 transition-all duration-300",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
            CONTACT INFO
            ═══════════════════════════════════════════════════════════════════ */}
                <section className="section border-t border-[var(--border)]">
                    <div className="grid md:grid-cols-3 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4 className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                                Email
                            </h4>
                            <a
                                href="mailto:hello@studio.design"
                                className="text-lg hover:opacity-60 transition-opacity"
                            >
                                hello@studio.design
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h4 className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                                Location
                            </h4>
                            <p className="text-lg">Worldwide, Remote</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h4 className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
                                Availability
                            </h4>
                            <p className="text-lg">Accepting new projects</p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}
