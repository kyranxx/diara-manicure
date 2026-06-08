import { galleryImages } from "@/lib/gallery"
import { galleryImagesForCategory, galleryLandingUrl, galleryPages, galleryPageUrl } from "@/lib/gallery-pages"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-static"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function imageEntry(image: (typeof galleryImages)[number]) {
  const imageUrl = `${siteConfig.baseUrl}${image.src}`

  return `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(image.caption)}</image:title>
      <image:caption>${escapeXml(image.alt)}</image:caption>
      <image:geo_location>Trnava, Slovakia</image:geo_location>
    </image:image>`
}

function urlEntry(url: string, images: typeof galleryImages) {
  return `
  <url>
    <loc>${escapeXml(url)}</loc>${images.map(imageEntry).join("")}
  </url>`
}

export async function GET() {
  const entries = [
    urlEntry(galleryLandingUrl, galleryImages),
    ...galleryPages.map((page) => urlEntry(galleryPageUrl(page.slug), galleryImagesForCategory(page.category))),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join("")}
</urlset>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Signal": siteConfig.contentSignal,
      "Cache-Control": "public, max-age=300",
    },
  })
}
