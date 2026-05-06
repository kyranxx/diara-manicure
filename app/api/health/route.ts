import { siteConfig } from "@/lib/site-config"
import { trackApiCall } from "@/lib/measurement-protocol"
import { headers } from "next/headers"

export async function GET() {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "127.0.0.1"
  const ua = headersList.get("user-agent") ?? "unknown"

  trackApiCall("/api/health", 200, ip, ua)

  return Response.json(
    {
      status: "ok",
      service: siteConfig.name,
      time: new Date().toISOString(),
    },
    {
      headers: {
        "Content-Type": "application/health+json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  )
}
