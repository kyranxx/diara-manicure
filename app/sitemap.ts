import { MetadataRoute } from 'next'
import { galleryImages } from '@/lib/gallery'
import { servicePages } from '@/lib/service-pages'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.baseUrl
    const galleryImageUrls = galleryImages.map((image) => `${baseUrl}${image.src}`)

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
            images: galleryImageUrls,
        },
        ...servicePages.map((page) => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
            images: page.galleryImageIds.map((id) => `${baseUrl}/gelove-nechty-trnava-gallery-${id}.${id === '5' ? 'jpg' : 'jpeg'}`),
        })),
        {
            url: `${baseUrl}/darcekove-poukazy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.65,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]
}
