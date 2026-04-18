import { createHash } from "node:crypto"
import { getDiscoveryLinkHeader } from "@/lib/discovery-links"
import { fullAddress, siteConfig } from "@/lib/site-config"

export type AgentSkill = {
  name: string
  type: string
  description: string
  url: string
  content: string
}

type ToolHandler = (args: Record<string, unknown>) => Record<string, unknown>

type AgentTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: Record<string, unknown>
  handler: ToolHandler
}

const apiBaseUrl = `${siteConfig.baseUrl}/api`
const mcpEndpoint = `${siteConfig.baseUrl}/mcp`
const apiDocsUrl = `${siteConfig.baseUrl}/docs/api`
const apiCatalogUrl = `${siteConfig.baseUrl}/.well-known/api-catalog`
const mcpServerCardUrl = `${siteConfig.baseUrl}/.well-known/mcp/server-card.json`
const agentSkillsIndexUrl = `${siteConfig.baseUrl}/.well-known/agent-skills/index.json`

const servicesEndpointSummary = {
  endpoint: `${apiBaseUrl}/services`,
  method: "GET",
  description: "Public JSON endpoint with live service names, descriptions, prices, and discounted prices.",
}

const healthEndpointSummary = {
  endpoint: `${apiBaseUrl}/health`,
  method: "GET",
  description: "Public health endpoint for discovery, monitoring, and API catalog status links.",
}

export function getApiCatalogDocument() {
  return {
    linkset: [
      {
        anchor: `${siteConfig.baseUrl}/api`,
        "service-desc": [
          {
            href: `${apiBaseUrl}/openapi`,
            type: "application/openapi+json",
          },
        ],
        status: [
          {
            href: `${apiBaseUrl}/health`,
            type: "application/health+json",
          },
        ],
        "service-doc": [
          {
            href: apiDocsUrl,
            type: "text/html",
          },
        ],
      },
      {
        anchor: mcpEndpoint,
        "service-desc": [
          {
            href: mcpServerCardUrl,
            type: "application/json",
          },
        ],
        status: [
          {
            href: `${apiBaseUrl}/health`,
            type: "application/health+json",
          },
        ],
        "service-doc": [
          {
            href: `${apiDocsUrl}#mcp`,
            type: "text/html",
          },
        ],
      },
    ],
  }
}

export function getAgentSkills(): AgentSkill[] {
  const skills: AgentSkill[] = [
    {
      name: "book-appointment",
      type: "task",
      description: "Direct a customer to the official booking or gift-card flow without inventing alternate reservation paths.",
      url: `${siteConfig.baseUrl}/.well-known/agent-skills/book-appointment/SKILL.md`,
      content: `# book-appointment

## Purpose

Help a customer reach the official diara manicure booking flow quickly and safely.

## When to use

- The user wants to book an appointment.
- The user asks for available booking channels.
- The user wants to buy a gift card.

## Guidance

- Prefer the official online booking page: ${siteConfig.bookingUrl}
- If the user asks for a gift card, use: ${siteConfig.giftCardUrl}
- If the user needs direct contact, offer phone ${siteConfig.phone} and Messenger ${siteConfig.messengerUrl}
- Do not invent unsupported booking flows or claim access to private calendars.
`,
    },
    {
      name: "check-services",
      type: "reference",
      description: "Explain where live service and pricing data comes from and how to fetch it from the public API.",
      url: `${siteConfig.baseUrl}/.well-known/agent-skills/check-services/SKILL.md`,
      content: `# check-services

## Purpose

Help an agent discover public service and pricing data for diara manicure.

## Data source

- Live services API: ${servicesEndpointSummary.endpoint}
- API docs: ${apiDocsUrl}
- API catalog: ${apiCatalogUrl}

## Guidance

- Fetch the public JSON endpoint instead of scraping the homepage.
- Expect items with title, description, price, and optional discountedPrice.
- Treat prices as live business data and prefer the API response over cached summaries.
`,
    },
    {
      name: "contact-studio",
      type: "reference",
      description: "Provide the official address, phone number, and contact channels for the studio in Trnava.",
      url: `${siteConfig.baseUrl}/.well-known/agent-skills/contact-studio/SKILL.md`,
      content: `# contact-studio

## Purpose

Provide verified contact details for diara manicure in Trnava.

## Official details

- Address: ${fullAddress}
- Phone: ${siteConfig.phone}
- Messenger: ${siteConfig.messengerUrl}
- Instagram: ${siteConfig.instagramUrl}
- Facebook: ${siteConfig.facebookUrl}

## Guidance

- Prefer official channels listed above.
- When sharing location details, include the street and city together.
- When relevant, mention that parking is available free of charge.
`,
    },
  ]

  return skills
}

export function getAgentSkillsIndexDocument() {
  return {
    $schema: "https://agentskills.io/schemas/agent-skills-index-v0.2.0.json",
    skills: getAgentSkills().map((skill) => ({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: skill.url,
      sha256: sha256(skill.content),
    })),
  }
}

export function getSkillContent(skillName: string) {
  return getAgentSkills().find((skill) => skill.name === skillName)?.content ?? null
}

export function getMcpServerCard() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: siteConfig.mcpProtocolVersion,
    serverInfo: {
      name: siteConfig.mcpServerName,
      title: "diara manicure public tools",
      version: siteConfig.mcpServerVersion,
    },
    description: "Public discovery tools for business info, booking links, and public API endpoints.",
    documentationUrl: `${apiDocsUrl}#mcp`,
    transport: {
      type: "streamable-http",
      endpoint: mcpEndpoint,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
  }
}

const mcpTools: AgentTool[] = [
  {
    name: "get_business_info",
    description: "Return official business, contact, and booking information for diara manicure.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
    },
    handler: () => ({
      businessName: siteConfig.name,
      ownerName: siteConfig.ownerName,
      address: fullAddress,
      phone: siteConfig.phone,
      bookingUrl: siteConfig.bookingUrl,
      giftCardUrl: siteConfig.giftCardUrl,
      messengerUrl: siteConfig.messengerUrl,
      instagramUrl: siteConfig.instagramUrl,
      facebookUrl: siteConfig.facebookUrl,
    }),
  },
  {
    name: "get_booking_link",
    description: "Return the correct booking or gift-card URL based on the requested intent.",
    inputSchema: {
      type: "object",
      properties: {
        intent: {
          type: "string",
          enum: ["appointment", "gift-card"],
          default: "appointment",
        },
      },
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
    },
    handler: (args) => {
      const intent = args.intent === "gift-card" ? "gift-card" : "appointment"

      return {
        intent,
        url: intent === "gift-card" ? siteConfig.giftCardUrl : siteConfig.bookingUrl,
      }
    },
  },
  {
    name: "list_public_endpoints",
    description: "List public machine-readable endpoints exposed by diaramanicure.sk for agents and integrations.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
    },
    handler: () => ({
      apiCatalog: apiCatalogUrl,
      apiDocs: apiDocsUrl,
      agentSkillsIndex: agentSkillsIndexUrl,
      mcpServerCard: mcpServerCardUrl,
      endpoints: [
        servicesEndpointSummary,
        healthEndpointSummary,
        {
          endpoint: `${apiBaseUrl}/openapi`,
          method: "GET",
          description: "OpenAPI description for the public HTTP endpoints.",
        },
        {
          endpoint: mcpEndpoint,
          method: "POST",
          description: "Public MCP streamable HTTP endpoint for discovery tools.",
        },
      ],
    }),
  },
]

export function getMcpTools() {
  return mcpTools.map(({ handler: _handler, ...tool }) => tool)
}

export function executeMcpTool(name: string, args: Record<string, unknown> = {}) {
  const tool = mcpTools.find((item) => item.name === name)
  if (!tool) {
    return null
  }

  return tool.handler(args)
}

function sha256(content: string) {
  return createHash("sha256").update(content, "utf8").digest("hex")
}
