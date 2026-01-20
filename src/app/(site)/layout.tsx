import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch site settings from Sanity
    const siteSettings = await getSiteSettings();

    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen">
                <Header siteSettings={siteSettings} />
                <main className="flex-1">{children}</main>
                <Footer siteSettings={siteSettings} />
            </div>
        </ThemeProvider>
    );
}
