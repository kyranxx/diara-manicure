import { getSkillContent } from "@/lib/agent-discovery"

type Params = Promise<{
  skill: string
}>

export async function GET(_request: Request, context: { params: Params }) {
  const { skill } = await context.params
  const content = getSkillContent(skill)

  if (!content) {
    return new Response("Skill not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  })
}
