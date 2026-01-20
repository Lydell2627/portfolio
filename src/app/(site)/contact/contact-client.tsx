"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Send, Check, ArrowUpRight, Mail, MapPin, Clock, Phone, AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { SplitText } from "@/components/ui/split-text";
import { BlurText } from "@/components/ui/blur-text";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { pricingTiers as staticPricingTiers, formatTierSelection, type PricingTier } from "@/config/pricing-tiers";

interface SiteSettings {
    contactEmail?: string;
    contactPhone?: string;
}

interface ContactPageClientProps {
    siteSettings?: SiteSettings;
    pricingTiers?: PricingTier[];
}

// Updated schema: budget is now required
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    budget: z.string().min(1, "Please select a project budget"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactPageClient({ siteSettings, pricingTiers }: ContactPageClientProps) {
    // Use Sanity pricing tiers if available, otherwise fall back to static
    const tiers = pricingTiers && pricingTiers.length > 0 ? pricingTiers : staticPricingTiers;

    const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Use Sanity data or fallbacks
    const email = siteSettings?.contactEmail || "hello@studio.design";
    const phone = siteSettings?.contactPhone || "+1 555 123 4567";

    // Format phone for tel: link (remove spaces and special chars)
    const phoneHref = `tel:${phone.replace(/[\s\-\(\)]/g, "")}`;

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: email,
            href: `mailto:${email}`,
        },
        {
            icon: Phone,
            label: "Phone",
            value: phone,
            href: phoneHref,
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Worldwide, Remote",
            href: null,
        },
        {
            icon: Clock,
            label: "Availability",
            value: "Accepting new projects",
            href: null,
        },
    ];

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        getValues,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            budget: "",
        },
    });

    const selectedBudget = watch("budget");

    // Update selected tier when budget changes
    useEffect(() => {
        const tier = tiers.find((t) => t.id === selectedBudget);
        setSelectedTier(tier || null);
    }, [selectedBudget, tiers]);

    // Handle tier selection
    const handleTierSelect = (tier: PricingTier) => {
        setValue("budget", tier.id, { shouldValidate: true });

        // Auto-append tier selection to message if not already present
        const currentMessage = getValues("message") || "";
        const tierLine = formatTierSelection(tier);

        if (!currentMessage.includes("Selected package:")) {
            const newMessage = currentMessage
                ? `${currentMessage}\n\n${tierLine}`
                : tierLine;
            setValue("message", newMessage);
        } else {
            // Replace existing tier selection
            const updatedMessage = currentMessage.replace(
                /Selected package:.*$/m,
                tierLine
            );
            setValue("message", updatedMessage);
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        setSubmissionState("submitting");
        setErrorMessage("");

        const tier = tiers.find((t) => t.id === data.budget);
        if (!tier) {
            setSubmissionState("error");
            setErrorMessage("Invalid tier selected");
            return;
        }

        const payload = {
            name: data.name,
            email: data.email,
            company: data.company || "",
            selectedBudgetTier: tier.name,
            selectedBudgetRange: tier.range,
            projectDetails: data.message,
            timestamp: new Date().toISOString(),
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Submission failed");
            }

            setSubmissionState("success");
            reset();
            setSelectedTier(null);
        } catch (error) {
            setSubmissionState("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        }
    };

    const handleRetry = () => {
        setSubmissionState("idle");
        setErrorMessage("");
    };

    return (
        <div>
            {/* ═══════════════════════════════════════════════════════════════════
                HERO - Immersive full viewport
            ═══════════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-6"
            >

                {/* Animated Background Elements */}
                {/* Performance: will-change hints for GPU acceleration, slower animations for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient orbs - Rose/Pink theme, responsive sizing */}
                    <motion.div
                        className="absolute top-1/4 -left-1/2 md:-left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent blur-3xl will-change-transform"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 -right-1/2 md:-right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-bl from-pink-500/10 via-rose-500/5 to-transparent blur-3xl will-change-transform"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Large background text */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                    style={{ y: heroY }}
                >
                    <span className="font-serif text-[18vw] md:text-[14vw] text-neutral-900/[0.03] dark:text-white/[0.03] whitespace-nowrap">
                        CONTACT
                    </span>
                </motion.div>

                <motion.div
                    className="container relative z-10 text-center"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase mb-8"
                        >
                            <ShinyText
                                speed={4}
                                shineColor="rgba(244, 63, 94, 0.6)"
                                color="currentColor"
                            >
                                Get in Touch
                            </ShinyText>
                        </motion.p>

                        <h1 className="font-serif leading-[1.05] mb-6 md:mb-8">
                            <span className="block">
                                <SplitText
                                    text="Let's start a"
                                    delay={40}
                                    animateBy="letters"
                                    duration={0.5}
                                />
                            </span>
                            <span className="block">
                                <GradientText
                                    colors={["#F43F5E", "#EC4899", "#F97316"]}
                                    animationSpeed={5}
                                    className="italic"
                                >
                                    conversation.
                                </GradientText>
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            <BlurText
                                text="Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you within 24 hours."
                                animateBy="words"
                                delay={60}
                                stepDuration={0.35}
                            />
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FORM SECTION
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="section pt-0 px-4 md:px-0">
                <div className="container">
                    <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
                        {/* Left - Contact Info */}
                        <motion.div
                            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-8">
                                Contact Info
                            </p>

                            <div className="space-y-8 mb-12">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                                            <info.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                                                {info.label}
                                            </p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-lg font-medium hover:opacity-60 transition-opacity"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-lg font-medium">{info.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right - Form */}
                        <div className="lg:col-span-8">
                            {submissionState === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-20 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-8">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-4xl mb-4">
                                        Message <span className="italic">sent!</span>
                                    </h2>
                                    <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                                        Thank you for reaching out. We&apos;ll reply within 24–48 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmissionState("idle")}
                                        className="text-sm font-medium underline underline-offset-4 hover:opacity-60 transition-opacity"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-10"
                                >
                                    {/* Error Banner */}
                                    <AnimatePresence>
                                        {submissionState === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900"
                                            >
                                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                <p className="text-sm text-red-700 dark:text-red-400 flex-1">
                                                    {errorMessage}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={handleRetry}
                                                    className="flex items-center gap-1.5 text-sm font-medium text-red-700 dark:text-red-400 hover:opacity-70 transition-opacity"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                    Retry
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Name & Email Row */}
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="group">
                                            <label
                                                htmlFor="name"
                                                className="block text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3"
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
                                                    "border-0 border-b-2 border-neutral-200 dark:border-neutral-800",
                                                    "text-lg",
                                                    "focus:outline-none focus:border-neutral-900 dark:focus:border-white",
                                                    "transition-colors duration-300",
                                                    "placeholder:text-neutral-300 dark:placeholder:text-neutral-700",
                                                    errors.name && "border-red-500"
                                                )}
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label
                                                htmlFor="email"
                                                className="block text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3"
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
                                                    "border-0 border-b-2 border-neutral-200 dark:border-neutral-800",
                                                    "text-lg",
                                                    "focus:outline-none focus:border-neutral-900 dark:focus:border-white",
                                                    "transition-colors duration-300",
                                                    "placeholder:text-neutral-300 dark:placeholder:text-neutral-700",
                                                    errors.email && "border-red-500"
                                                )}
                                                placeholder="email@company.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-2 text-sm text-red-500">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="group">
                                        <label
                                            htmlFor="company"
                                            className="block text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3"
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
                                                "border-0 border-b-2 border-neutral-200 dark:border-neutral-800",
                                                "text-lg",
                                                "focus:outline-none focus:border-neutral-900 dark:focus:border-white",
                                                "transition-colors duration-300",
                                                "placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                                            )}
                                            placeholder="Your company (optional)"
                                        />
                                    </div>

                                    {/* Budget Selection - Accessible Radio Group */}
                                    <fieldset>
                                        <legend className="block text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                                            Project Budget *
                                        </legend>
                                        <div
                                            className="flex flex-wrap gap-3"
                                            role="radiogroup"
                                            aria-required="true"
                                        >
                                            {tiers.map((tier) => (
                                                <div key={tier.id} className="relative">
                                                    <input
                                                        type="radio"
                                                        id={`budget-${tier.id}`}
                                                        name="budget"
                                                        value={tier.id}
                                                        checked={selectedBudget === tier.id}
                                                        onChange={() => handleTierSelect(tier)}
                                                        className="sr-only peer"
                                                        aria-describedby={selectedBudget === tier.id ? `tier-details-${tier.id}` : undefined}
                                                    />
                                                    <label
                                                        htmlFor={`budget-${tier.id}`}
                                                        className={cn(
                                                            "relative inline-flex flex-col items-center cursor-pointer",
                                                            "px-5 py-3 text-sm font-medium rounded-full border-2 transition-all duration-300",
                                                            "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-neutral-900 dark:focus-within:ring-white",
                                                            selectedBudget === tier.id
                                                                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                                                                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {tier.name}
                                                            {tier.popular && (
                                                                <span className={cn(
                                                                    "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full",
                                                                    selectedBudget === tier.id
                                                                        ? "bg-white/20 dark:bg-neutral-900/20"
                                                                        : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                                                                )}>
                                                                    Popular
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className={cn(
                                                            "text-xs mt-0.5",
                                                            selectedBudget === tier.id
                                                                ? "text-white/70 dark:text-neutral-900/70"
                                                                : "text-neutral-500"
                                                        )}>
                                                            {tier.range}
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.budget && (
                                            <p className="mt-3 text-sm text-red-500">
                                                {errors.budget.message}
                                            </p>
                                        )}

                                        {/* What's Included - Shows when tier is selected */}
                                        <AnimatePresence mode="wait">
                                            {selectedTier && (
                                                <motion.div
                                                    key={selectedTier.id}
                                                    id={`tier-details-${selectedTier.id}`}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                                                        <div className="flex items-baseline justify-between mb-3">
                                                            <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                                                What&apos;s included
                                                            </p>
                                                            <p className="text-xs text-neutral-400 dark:text-neutral-500">
                                                                {selectedTier.delivery}
                                                            </p>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {selectedTier.features.map((feature, index) => (
                                                                <motion.li
                                                                    key={index}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: index * 0.05 }}
                                                                    className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                                                                >
                                                                    <span className="text-neutral-300 dark:text-neutral-600 mt-1">•</span>
                                                                    {feature}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </fieldset>

                                    {/* Message */}
                                    <div className="group">
                                        <label
                                            htmlFor="message"
                                            className="block text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3"
                                        >
                                            Project Details *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            {...register("message")}
                                            className={cn(
                                                "w-full px-0 py-4",
                                                "bg-transparent",
                                                "border-0 border-b-2 border-neutral-200 dark:border-neutral-800",
                                                "text-lg",
                                                "focus:outline-none focus:border-neutral-900 dark:focus:border-white",
                                                "transition-colors duration-300",
                                                "placeholder:text-neutral-300 dark:placeholder:text-neutral-700",
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
                                        <motion.button
                                            type="submit"
                                            disabled={submissionState === "submitting"}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            /* Responsive: smaller button on mobile */
                                            className={cn(
                                                "group inline-flex items-center gap-4",
                                                "px-8 py-4 md:px-10 md:py-5",
                                                "text-sm font-medium",
                                                "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
                                                "rounded-full",
                                                "hover:opacity-90 transition-all duration-300",
                                                "disabled:opacity-50 disabled:cursor-not-allowed"
                                            )}
                                        >
                                            {submissionState === "submitting" ? (
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
                                        </motion.button>
                                    </div>
                                </motion.form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CTA SECTION - Theme-Aware
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="min-h-screen flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-white mb-6">
                            <BlurText
                                text="Prefer a"
                                animateBy="words"
                                delay={80}
                                stepDuration={0.4}
                            />{" "}
                            <GradientText
                                colors={["#F43F5E", "#EC4899", "#FB7185"]}
                                animationSpeed={5}
                                className="italic"
                            >
                                quick chat?
                            </GradientText>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-white/60 mb-10">
                            Schedule a 30-minute discovery call to discuss your project.
                        </p>
                        <Link
                            href="#"
                            className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 text-base md:text-lg font-semibold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white rounded-full shadow-[0_8px_32px_rgba(244,63,94,0.4)] hover:shadow-[0_12px_40px_rgba(244,63,94,0.6)] hover:scale-105 transition-all duration-300 group"
                        >
                            <span>Book a call</span>
                            <motion.span
                                className="text-xl"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
