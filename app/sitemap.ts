import { MetadataRoute } from 'next'
import { galleryImages } from '@/lib/gallery'
import { galleryLandingUrl } from '@/lib/gallery-pages'
import { servicePages, servicePageUrl } from '@/lib/service-pages'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.baseUrl
    const galleryImageUrls = galleryImages.map((image) => `${baseUrl}${image.src}`)
    const languageAlternates = {
        sk: baseUrl,
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`,
        'sr-Latn': `${baseUrl}/sr`,
    }

    return [
        {
            url: baseUrl,
            changeFrequency: 'weekly',
            priority: 1.0,
            images: galleryImageUrls,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/en`,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/uk`,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: `${baseUrl}/sr`,
            changeFrequency: 'weekly',
            priority: 0.75,
            alternates: {
                languages: languageAlternates,
            },
        },
        {
            url: galleryLandingUrl,
            changeFrequency: 'weekly',
            priority: 0.72,
            images: galleryImageUrls,
        },
        {
            url: `${baseUrl}/darcekove-poukazy`,
            changeFrequency: 'monthly',
            priority: 0.65,
        },
        {
            url: `${baseUrl}/blog`,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia`,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        ...servicePages.map((page) => ({
            url: servicePageUrl(page.slug),
            changeFrequency: 'monthly' as const,
            priority: 0.65,
            images: [`${baseUrl}${page.image}`],
        })),
    ]
}
