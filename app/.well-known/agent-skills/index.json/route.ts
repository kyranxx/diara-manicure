import { getAgentSkillsIndexDocument } from "@/lib/agent-discovery"

export async function GET() {
  return Response.json(getAgentSkillsIndexDocument(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  })
}
