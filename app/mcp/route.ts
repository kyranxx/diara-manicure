import { executeMcpTool, getMcpTools } from "@/lib/agent-discovery"
import { getDiscoveryLinkHeader } from "@/lib/discovery-links"
import { siteConfig } from "@/lib/site-config"

type JsonRpcId = string | number | null

type JsonRpcRequest = {
  jsonrpc?: string
  id?: JsonRpcId
  method?: string
  params?: Record<string, unknown>
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Allow-Methods": "OPTIONS, POST",
  "Content-Type": "application/json; charset=utf-8",
  Link: getDiscoveryLinkHeader(),
}

function jsonRpcResult(id: JsonRpcId, result: Record<string, unknown>) {
  return Response.json(
    {
      jsonrpc: "2.0",
      id,
      result,
    },
    {
      headers: corsHeaders,
    }
  )
}

function jsonRpcError(id: JsonRpcId, code: number, message: string) {
  return Response.json(
    {
      jsonrpc: "2.0",
      id,
      error: {
        code,
        message,
      },
    },
    {
      status: 400,
      headers: corsHeaders,
    }
  )
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  let body: JsonRpcRequest

  try {
    body = (await request.json()) as JsonRpcRequest
  } catch {
    return jsonRpcError(null, -32700, "Invalid JSON")
  }

  const id = body.id ?? null
  const method = body.method

  if (!method) {
    return jsonRpcError(id, -32600, "Missing JSON-RPC method")
  }

  if (method === "notifications/initialized" && body.id === undefined) {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: siteConfig.mcpProtocolVersion,
      serverInfo: {
        name: siteConfig.mcpServerName,
        version: siteConfig.mcpServerVersion,
      },
      capabilities: {
        tools: {
          listChanged: false,
        },
      },
    })
  }

  if (method === "ping") {
    return jsonRpcResult(id, {})
  }

  if (method === "tools/list") {
    return jsonRpcResult(id, {
      tools: getMcpTools(),
    })
  }

  if (method === "tools/call") {
    const toolName = typeof body.params?.name === "string" ? body.params.name : null
    const args =
      body.params?.arguments && typeof body.params.arguments === "object"
        ? (body.params.arguments as Record<string, unknown>)
        : {}

    if (!toolName) {
      return jsonRpcError(id, -32602, "Tool name is required")
    }

    const result = executeMcpTool(toolName, args)

    if (!result) {
      return jsonRpcError(id, -32601, `Unknown tool: ${toolName}`)
    }

    return jsonRpcResult(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
      structuredContent: result,
      isError: false,
    })
  }

  return jsonRpcError(id, -32601, `Unsupported method: ${method}`)
}
