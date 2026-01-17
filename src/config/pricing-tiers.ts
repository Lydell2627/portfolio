/**
 * Pricing Tiers Configuration
 * 
 * Edit this file to update tier names, INR ranges, and features.
 * Changes here will automatically reflect in the Contact page form.
 */

export interface PricingTier {
    /** Unique identifier for the tier */
    id: string;
    /** Display name shown on pill buttons */
    name: string;
    /** INR price range string */
    range: string;
    /** Show "Most popular" badge (optional) */
    popular?: boolean;
    /** Estimated delivery timeline */
    delivery: string;
    /** "What's included" bullet points */
    features: string[];
}

export const pricingTiers: PricingTier[] = [
    {
        id: "starter",
        name: "Starter",
        range: "₹25,000–₹50,000",
        delivery: "~5–10 days",
        features: [
            "1–3 pages (landing + services + contact)",
            "Template-based with customized styling (brand colors + type)",
            "Mobile responsive",
            "Contact form + WhatsApp / email CTA",
            "Basic SEO (titles/meta) + analytics",
            "1 round of revisions",
        ],
    },
    {
        id: "growth",
        name: "Growth",
        range: "₹50,000–₹1,25,000",
        popular: true,
        delivery: "~2–3 weeks",
        features: [
            "Up to ~6–10 pages",
            "Stronger custom UI (sections, components, motion if needed)",
            "CMS for blog/case studies (if stack supports it)",
            "Integrations: email capture, Calendly, maps, etc.",
            "SEO + analytics + performance pass",
            "2 rounds of revisions",
        ],
    },
    {
        id: "scale",
        name: "Scale",
        range: "₹1,25,000–₹2,50,000",
        delivery: "~4–6 weeks",
        features: [
            "Fully custom UI + better UX (conversion-focused layout)",
            "CMS + content structure + migration help (if needed)",
            "Advanced integrations (auth, dashboards-lite, workflows, automation)",
            "Accessibility + performance pass",
            "3 rounds of revisions",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        range: "₹2,50,000+",
        delivery: "Timeline based on scope",
        features: [
            "Full product-grade build (full-stack, custom features)",
            "Discovery workshop + sitemap + wireframes",
            "Staging + production deployment + monitoring basics",
            "Priority support window for launch + roadmap option",
            "Revisions negotiated + ongoing maintenance option",
        ],
    },
];

/**
 * Helper to get tier by ID
 */
export function getTierById(id: string): PricingTier | undefined {
    return pricingTiers.find((tier) => tier.id === id);
}

/**
 * Helper to format tier selection for form display
 */
export function formatTierSelection(tier: PricingTier): string {
    return `Selected package: ${tier.name} (${tier.range})`;
}
