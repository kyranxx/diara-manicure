import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getDiscoveryLinkHeader } from "@/lib/discovery-links"
import { supportedMarkdownPaths } from "@/lib/markdown-content"

const markdownPathSet = new Set(supportedMarkdownPaths)
const linkHeaderPathSet = new Set(["/", "/blog", "/docs/api"])

function wantsMarkdown(request: NextRequest) {
  const accept = request.headers.get("accept")?.toLowerCase() ?? ""
  return accept.includes("text/markdown")
}

function shouldAdvertise(pathname: string) {
  return linkHeaderPathSet.has(pathname) || pathname.startsWith("/blog/")
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (wantsMarkdown(request) && markdownPathSet.has(pathname)) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = "/api/markdown"
    rewriteUrl.searchParams.set("path", pathname)

    const response = NextResponse.rewrite(rewriteUrl)

    if (shouldAdvertise(pathname)) {
      response.headers.set("Link", getDiscoveryLinkHeader())
    }

    response.headers.set("Vary", "Accept")
    return response
  }

  const response = NextResponse.next()

  if (shouldAdvertise(pathname)) {
    response.headers.set("Link", getDiscoveryLinkHeader())
    response.headers.set("Vary", "Accept")
  }

  return response
}

export const config = {
  matcher: ["/", "/blog/:path*", "/docs/api"],
}
