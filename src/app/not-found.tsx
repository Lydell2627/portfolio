import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="container max-w-xl">
                <h1 className="mb-4">404</h1>
                <p className="text-lg text-[var(--text-secondary)] mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-base font-medium border border-[var(--foreground)] px-6 py-3 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-200"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
