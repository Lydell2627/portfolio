import type { Metadata } from "next";
import { getSiteSettings, getPricingTiers } from "@/lib/sanity";
import { ContactPageClient } from "./contact-client";

export const revalidate = 60; // Revalidate every 60 seconds

// Contact page-specific metadata
export const metadata: Metadata = {
    title: "Contact Difusys — Start Your Project Today",
    description:
        "Ready to build something extraordinary? Contact Difusys for a free strategy call. Custom UI/UX design and software development packages from ₹20K–₹5L+.",
    openGraph: {
        title: "Contact Difusys — Start Your Project Today",
        description:
            "Book a free strategy call with Difusys. Custom UI/UX design and software development packages.",
        type: "website",
        siteName: "Difusys",
    },
    twitter: {
        title: "Contact Difusys — Start Your Project Today",
        description:
            "Book a free strategy call with Difusys. Custom UI/UX design and software development packages.",
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
