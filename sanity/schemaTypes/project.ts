import { defineType, defineField } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'A catchy one-liner quote for the featured projects showcase (e.g., "Where innovation meets elegance")',
        }),
        defineField({
            name: 'content',
            title: 'Full Content',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'UI/UX', value: 'UI/UX' },
                    { title: 'Web Design', value: 'Web Design' },
                    { title: 'Branding', value: 'Branding' },
                    { title: 'Product Design', value: 'Product Design' },
                ],
            },
        }),
        defineField({
            name: 'tools',
            title: 'Tools Used',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'client',
            title: 'Client',
            type: 'string',
        }),
        defineField({
            name: 'clientReview',
            title: 'Client Review/Testimonial',
            type: 'string',
            description: 'A short one-line testimonial or feedback quote from the client',
        }),
        defineField({
            name: 'role',
            title: 'Your Role',
            type: 'string',
        }),
        defineField({
            name: 'duration',
            title: 'Project Duration',
            type: 'string',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live Project URL',
            type: 'url',
            description: 'Link to the actual live website/project (e.g., https://example.com)',
            validation: (Rule) => Rule.uri({
                scheme: ['http', 'https']
            }),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Year (Newest)',
            name: 'yearDesc',
            by: [{ field: 'year', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'thumbnail',
        },
    },
})
