import { siteConfig } from "@/lib/site-config"

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dakujeme
Content-Signal: ${siteConfig.contentSignal}
Sitemap: ${siteConfig.baseUrl}/sitemap.xml
`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  })
}
