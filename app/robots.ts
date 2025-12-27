import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://diaramanicure.sk'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/dakujeme'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
