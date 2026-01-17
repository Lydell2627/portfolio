"use client";

import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

// Custom components for rendering Sanity Portable Text
const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => (
            <h1 className="font-serif text-4xl md:text-5xl mb-6 mt-12">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="font-serif text-3xl md:text-4xl mb-6 mt-10">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-serif text-2xl md:text-3xl mb-4 mt-8">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="font-serif text-xl md:text-2xl mb-4 mt-6">{children}</h4>
        ),
        normal: ({ children }) => (
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-rose-400/50 pl-6 my-8 italic text-lg text-neutral-500 dark:text-neutral-400">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside mb-6 space-y-2 text-neutral-600 dark:text-neutral-300">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2 text-neutral-600 dark:text-neutral-300">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-500 hover:text-rose-600 underline underline-offset-2 transition-colors"
            >
                {children}
            </a>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null;
            const imageUrl = urlFor(value).width(1200).quality(85).url();
            return (
                <figure className="my-10">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                        <Image
                            src={imageUrl}
                            alt={value.alt || "Project image"}
                            fill
                            className="object-contain"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

interface SanityContentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[];
}

export function SanityContent({ content }: SanityContentProps) {
    if (!content || !Array.isArray(content) || content.length === 0) {
        return null;
    }

    return (
        <div className="prose-container max-w-3xl mx-auto">
            <PortableText value={content} components={components} />
        </div>
    );
}
