import type { Metadata } from "next";
import { getSiteSettings, getPricingTiers } from "@/lib/sanity";
import { ContactPageClient } from "./contact-client";

export const revalidate = 60; // Revalidate every 60 seconds

// Contact page-specific metadata
export const metadata: Metadata = {
    title: "Start a Project — Get a Free Quote Today",
    description:
        "Ready to build something extraordinary? Book a free strategy call. Custom UI/UX design and software development packages from ₹20K–₹5L+. Response within 24 hours.",
    openGraph: {
        title: "Start a Project — Get a Free Quote Today",
        description:
            "Book a free strategy call. Custom UI/UX design and software development packages. Response within 24 hours.",
        type: "website",
    },
    twitter: {
        title: "Start a Project — Get a Free Quote Today",
        description:
            "Book a free strategy call. Custom UI/UX design and software development packages. Response within 24 hours.",
    },
    alternates: {
        canonical: "/contact",
    },
};

export default async function ContactPage() {
    const [siteSettings, pricingTiers] = await Promise.all([
        getSiteSettings(),
        getPricingTiers(),
    ]);

    return (
        <ContactPageClient
            siteSettings={siteSettings}
            pricingTiers={pricingTiers}
        />
    );
}
