import { siteConfig } from "@/lib/site-config"

const host = new URL(siteConfig.baseUrl).hostname.replace(/^www\./, "")

export async function GET() {
  return Response.json(
    {
      specVersion: "1.0",
      host: { displayName: siteConfig.name, identifier: host },
      entries: [
        {
          identifier: `urn:air:${host}:mcp:public-tools`,
          displayName: "diara manicure public tools (MCP)",
          type: "application/mcp-server-card+json",
          url: `${siteConfig.baseUrl}/.well-known/mcp/server-card.json`,
          representativeQueries: [
            "What are the opening hours and address of the nail studio in Trnava?",
            "Where can I book a gel nails appointment in Trnava?",
            "What services and prices does diara manicure offer?",
          ],
        },
        {
          identifier: `urn:air:${host}:api:services`,
          displayName: "diara manicure public API (OpenAPI)",
          type: "application/openapi+json",
          url: `${siteConfig.baseUrl}/api/openapi`,
          representativeQueries: [
            "List manicure services with current prices",
            "How much does gel polish cost in Trnava?",
          ],
        },
        {
          identifier: `urn:air:${host}:skills:index`,
          displayName: "diara manicure agent skills",
          type: "application/json",
          url: `${siteConfig.baseUrl}/.well-known/agent-skills/index.json`,
          representativeQueries: [
            "How do I book a manicure appointment?",
            "How do I contact the studio?",
          ],
        },
      ],
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
      },
    },
  )
}
