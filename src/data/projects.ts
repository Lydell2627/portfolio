export interface CaseStudySection {
    type: "text" | "image" | "gallery";
    heading?: string;
    content?: string;
    image?: string;
    images?: string[];
    caption?: string;
}

export interface Project {
    slug: string;
    title: string;
    category: "Web Design" | "Mobile Apps" | "Branding" | "UI Design";
    description: string;
    featured: boolean;
    heroImage: string;
    thumbnail: string;
    client?: string;
    role: string;
    duration: string;
    tools: string[];
    year: string;
    content: CaseStudySection[];
}

export const projects: Project[] = [
    {
        slug: "luxe-ecommerce",
        title: "Luxe E-Commerce Platform",
        category: "Web Design",
        description: "A premium online shopping experience for a luxury fashion brand, featuring immersive product galleries and seamless checkout flow.",
        featured: true,
        heroImage: "/projects/luxe-hero.jpg",
        thumbnail: "/projects/luxe-thumb.jpg",
        client: "LUXE Fashion",
        role: "Lead UI/UX Designer",
        duration: "3 months",
        tools: ["Figma", "Framer", "Next.js"],
        year: "2025",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "LUXE Fashion needed a digital presence that matched their physical boutique experience. The existing website felt dated and didn't convey the premium positioning of the brand."
            },
            {
                type: "image",
                image: "/projects/luxe-process-1.jpg",
                caption: "Early wireframes exploring navigation patterns"
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We crafted an immersive shopping experience with full-bleed imagery, subtle animations, and a streamlined checkout process that reduced cart abandonment by 35%."
            },
            {
                type: "gallery",
                images: ["/projects/luxe-gallery-1.jpg", "/projects/luxe-gallery-2.jpg", "/projects/luxe-gallery-3.jpg"],
                caption: "Final design screens"
            }
        ]
    },
    {
        slug: "fintech-dashboard",
        title: "Fintech Analytics Dashboard",
        category: "UI Design",
        description: "A comprehensive financial analytics platform with real-time data visualization and intuitive portfolio management tools.",
        featured: true,
        heroImage: "/projects/fintech-hero.jpg",
        thumbnail: "/projects/fintech-thumb.jpg",
        client: "VaultPay",
        role: "Product Designer",
        duration: "4 months",
        tools: ["Figma", "Principle", "React"],
        year: "2025",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "Financial data can be overwhelming. VaultPay needed a dashboard that made complex analytics accessible to both novice and expert users."
            },
            {
                type: "image",
                image: "/projects/fintech-process-1.jpg",
                caption: "Information architecture mapping"
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We designed a modular dashboard system with customizable widgets, progressive disclosure of complexity, and stunning data visualizations."
            }
        ]
    },
    {
        slug: "wellness-app",
        title: "Mindful Wellness App",
        category: "Mobile Apps",
        description: "A holistic wellness application combining meditation, fitness tracking, and nutrition guidance in one serene interface.",
        featured: true,
        heroImage: "/projects/wellness-hero.jpg",
        thumbnail: "/projects/wellness-thumb.jpg",
        client: "Serenity Labs",
        role: "UX Designer",
        duration: "5 months",
        tools: ["Figma", "ProtoPie", "Swift"],
        year: "2024",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "Wellness apps often feel clinical or overwhelming. Serenity Labs wanted an experience that felt like a calm retreat."
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We created a breathing, organic interface with gentle animations and a muted color palette that promotes mindfulness from the first tap."
            }
        ]
    },
    {
        slug: "brand-identity-nova",
        title: "Nova Brand Identity",
        category: "Branding",
        description: "Complete brand identity design for a sustainable tech startup, including logo, typography, and comprehensive brand guidelines.",
        featured: true,
        heroImage: "/projects/nova-hero.jpg",
        thumbnail: "/projects/nova-thumb.jpg",
        client: "Nova Technologies",
        role: "Brand Designer",
        duration: "2 months",
        tools: ["Illustrator", "Figma", "After Effects"],
        year: "2024",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "Nova needed a brand that communicated innovation and sustainability without relying on overused green clichés."
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We developed a bold geometric identity with a distinctive logomark that suggests both forward momentum and circular economy principles."
            }
        ]
    },
    {
        slug: "saas-platform",
        title: "ProFlow SaaS Platform",
        category: "Web Design",
        description: "An enterprise project management platform designed to streamline workflows for remote teams with intuitive collaboration tools.",
        featured: false,
        heroImage: "/projects/proflow-hero.jpg",
        thumbnail: "/projects/proflow-thumb.jpg",
        client: "ProFlow Inc",
        role: "Senior Product Designer",
        duration: "6 months",
        tools: ["Figma", "Maze", "React"],
        year: "2024",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "Enterprise software is often complex and intimidating. ProFlow needed to feel powerful yet approachable."
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We designed a clean, modular interface with smart defaults and progressive complexity that grows with user expertise."
            }
        ]
    },
    {
        slug: "travel-booking",
        title: "Wanderlust Travel Platform",
        category: "Web Design",
        description: "A visually stunning travel booking platform that inspires adventure through immersive destination storytelling and seamless booking.",
        featured: false,
        heroImage: "/projects/travel-hero.jpg",
        thumbnail: "/projects/travel-thumb.jpg",
        client: "Wanderlust Travel",
        role: "UI/UX Designer",
        duration: "4 months",
        tools: ["Figma", "Webflow", "GSAP"],
        year: "2023",
        content: [
            {
                type: "text",
                heading: "The Challenge",
                content: "The travel booking industry is crowded. Wanderlust needed to stand out through exceptional visual storytelling."
            },
            {
                type: "text",
                heading: "The Solution",
                content: "We created an editorial-style platform with cinematic imagery and narrative-driven destination pages that inspire wanderlust before the book button."
            }
        ]
    }
];

export const categories = ["All", "Web Design", "Mobile Apps", "Branding", "UI Design"] as const;

export type Category = (typeof categories)[number];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: Category): Project[] {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
}
