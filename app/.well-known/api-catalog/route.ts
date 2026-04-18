import { getApiCatalogDocument } from "@/lib/agent-discovery"

export async function GET() {
  return Response.json(getApiCatalogDocument(), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  })
}
