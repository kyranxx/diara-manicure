import { getMcpServerCard } from "@/lib/agent-discovery"

export async function GET() {
  return Response.json(getMcpServerCard(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
