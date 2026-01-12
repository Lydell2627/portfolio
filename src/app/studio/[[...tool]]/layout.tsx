export const metadata = {
    title: 'Portfolio Studio',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Minimal layout for Sanity Studio - no site header/footer
    return children
}
