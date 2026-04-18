import { siteConfig } from "@/lib/site-config"

export async function GET() {
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
