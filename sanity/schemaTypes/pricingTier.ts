import { defineType, defineField } from 'sanity'

export const pricingTier = defineType({
    name: 'pricingTier',
    title: 'Pricing Tier',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Tier Name',
            type: 'string',
            description: 'Display name (e.g., "Starter", "Growth", "Scale")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Unique identifier for form submissions',
            options: {
                source: 'name',
                maxLength: 50,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'range',
            title: 'Price Range',
            type: 'string',
            description: 'Price range string (e.g., "₹25,000–₹50,000")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'popular',
            title: 'Most Popular',
            type: 'boolean',
            description: 'Show "Popular" badge on this tier',
            initialValue: false,
        }),
        defineField({
            name: 'delivery',
            title: 'Delivery Timeline',
            type: 'string',
            description: 'Estimated delivery time (e.g., "~5–10 days")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of what\'s included in this tier',
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this tier appears (1 = first)',
            initialValue: 1,
            validation: (Rule) => Rule.required(),
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'range',
            order: 'order',
        },
        prepare({ title, subtitle, order }) {
            return {
                title: `${order}. ${title}`,
                subtitle: subtitle,
            }
        },
    },
})
