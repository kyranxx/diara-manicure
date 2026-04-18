import { getDiscoveryLinkHeader } from "@/lib/discovery-links"
import { getMarkdownForPath, getMarkdownTokenEstimate } from "@/lib/markdown-content"
import { siteConfig } from "@/lib/site-config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pathname = searchParams.get("path") ?? "/"
  const markdown = getMarkdownForPath(pathname)

  if (!markdown) {
    return new Response("Markdown version not available for this path.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": getMarkdownTokenEstimate(markdown),
      "Vary": "Accept",
      "Link": getDiscoveryLinkHeader(),
      "Content-Signal": siteConfig.contentSignal,
      "Cache-Control": "public, max-age=300",
    },
  })
}
