import { getSiteSettings } from "@/lib/sanity";
import { ContactPageClient } from "./contact-client";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
    const siteSettings = await getSiteSettings();

    return <ContactPageClient siteSettings={siteSettings} />;
}
