import { siteConfig } from "@/lib/site-config"

export async function GET() {
  const robots = `User-agent: *
Allow: /
Allow: /api/health
Allow: /api/services
Allow: /api/openapi
Allow: /api/markdown
Disallow: /api/
Disallow: /dakujeme
Sitemap: ${siteConfig.baseUrl}/sitemap.xml
Sitemap: ${siteConfig.baseUrl}/image-sitemap.xml
`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Signal": siteConfig.contentSignal,
      "Cache-Control": "public, max-age=300",
    },
  })
}
