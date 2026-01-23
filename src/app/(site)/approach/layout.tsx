import type { Metadata } from "next";

// Approach page-specific metadata
export const metadata: Metadata = {
    title: "Our Process — Enterprise-Grade Design Methodology",
    description:
        "Discover our proven 3-phase design process: Research → Ideate → Design. We use enterprise-grade methodology trusted by startups and Fortune 500 companies.",
    openGraph: {
        title: "Our Process — Enterprise-Grade Design Methodology",
        description:
            "Discover our proven 3-phase design process trusted by startups and Fortune 500 companies.",
        type: "website",
    },
    twitter: {
        title: "Our Process — Enterprise-Grade Design Methodology",
        description:
            "Discover our proven 3-phase design process trusted by startups and Fortune 500 companies.",
    },
    alternates: {
        canonical: "/approach",
    },
};

export default function ApproachLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
