import { MetadataRoute } from 'next'
import { galleryImages } from '@/lib/gallery'
import { galleryImagesForCategory, galleryLandingUrl, galleryPages, galleryPageUrl } from '@/lib/gallery-pages'
import { giftCardImagePath, giftCardIntentPages, giftCardIntentPageUrl } from '@/lib/gift-card-pages'
import { servicePages, servicePageUrl } from '@/lib/service-pages'
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
        ...galleryPages.map((page) => ({
            url: galleryPageUrl(page.slug),
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.64,
            images: galleryImagesForCategory(page.category).map((image) => `${baseUrl}${image.src}`),
        })),
        {
            url: `${baseUrl}/darcekove-poukazy`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.65,
        },
        ...giftCardIntentPages.map((page) => ({
            url: giftCardIntentPageUrl(page.slug),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.55,
            images: [`${baseUrl}${giftCardImagePath}`],
        })),
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        ...servicePages.map((page) => ({
            url: servicePageUrl(page.slug),
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.65,
            images: [`${baseUrl}${page.image}`],
        })),
    ]
}
