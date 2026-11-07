import { MetadataRoute } from 'next'
import { galleryImages } from '@/lib/gallery'
import { galleryLandingUrl } from '@/lib/gallery-pages'
import { servicePages, servicePageUrl } from '@/lib/service-pages'
import { blogPosts } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.baseUrl
    const galleryImageUrls = galleryImages.map((image) => `${baseUrl}${image.src}`)
    const now = new Date()
    const languageAlternates = {
        sk: baseUrl,
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`,
        'sr-Latn': `${baseUrl}/sr`,
    }

    return [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
            images: galleryImageUrls,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/en`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/uk`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/sr`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: galleryLandingUrl,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.72,
            images: galleryImageUrls,
        },
        {
            url: `${baseUrl}/darcekove-poukazy`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.65,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
            images: [`${baseUrl}${post.image}`],
        })),
        ...servicePages.map((page) => ({
            url: servicePageUrl(page.slug),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.65,
            images: [`${baseUrl}${page.image}`],
        })),
    ]
}
