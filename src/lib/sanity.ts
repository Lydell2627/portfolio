import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false for real-time updates during preview
})

// Image URL builder
const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}

// ═══════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════

// Projects
export const allProjectsQuery = `*[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    thumbnail,
    heroImage,
    category,
    tools,
    client,
    role,
    duration,
    year,
    featured,
    content
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    tagline,
    thumbnail,
    heroImage,
    category,
    tools,
    client,
    clientReview,
    liveUrl,
    year,
    featured
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    content,
    thumbnail,
    heroImage,
    category,
    tools,
    client,
    role,
    duration,
    year,
    liveUrl
}`

// Testimonials
export const allTestimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image
}`

// Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
    siteName,
    siteTagline,
    siteDescription,
    contactEmail,
    contactPhone,
    socialLinks,
    stats
}`

// Pricing Tiers
export const pricingTiersQuery = `*[_type == "pricingTier"] | order(order asc) {
    _id,
    "id": slug.current,
    name,
    range,
    popular,
    delivery,
    features,
    order
}`

// ═══════════════════════════════════════════════════════════════════
// FETCH FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

export async function getProjects() {
    return client.fetch(allProjectsQuery)
}

export async function getFeaturedProjects() {
    return client.fetch(featuredProjectsQuery)
}

export async function getProjectBySlug(slug: string) {
    return client.fetch(projectBySlugQuery, { slug })
}

export async function getTestimonials() {
    return client.fetch(allTestimonialsQuery)
}

export async function getSiteSettings() {
    return client.fetch(siteSettingsQuery)
}

export async function getPricingTiers() {
    return client.fetch(pricingTiersQuery)
}
