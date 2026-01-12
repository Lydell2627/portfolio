import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            initialValue: 'STUDIO',
        }),
        defineField({
            name: 'siteTagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'siteDescription',
            title: 'Site Description',
            type: 'text',
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'instagram', title: 'Instagram', type: 'url' },
                { name: 'twitter', title: 'Twitter/X', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn', type: 'url' },
                { name: 'dribbble', title: 'Dribbble', type: 'url' },
                { name: 'behance', title: 'Behance', type: 'url' },
            ],
        }),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'object',
            fields: [
                { name: 'yearsExperience', title: 'Years of Experience', type: 'string' },
                { name: 'projectsCompleted', title: 'Projects Completed', type: 'string' },
                { name: 'happyClients', title: 'Happy Clients', type: 'string' },
                { name: 'designAwards', title: 'Design Awards', type: 'string' },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
            }
        },
    },
})
