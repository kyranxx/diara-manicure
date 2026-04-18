"use client"

import { useEffect } from "react"
import { fullAddress, siteConfig } from "@/lib/site-config"

type WebMcpTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<Record<string, unknown>> | Record<string, unknown>
}

type ModelContextApi = {
  provideContext: (context: { tools: WebMcpTool[] }) => void | Promise<void>
}

type NavigatorWithModelContext = Navigator & {
  modelContext?: ModelContextApi
}

const sectionIds = {
  pricing: "cennik",
  gallery: "galeria",
  faq: "faq",
  contact: "visit",
} as const

export function WebMcpProvider() {
  useEffect(() => {
    const navigatorWithModelContext = navigator as NavigatorWithModelContext
    const modelContext = navigatorWithModelContext.modelContext

    if (!modelContext?.provideContext) {
      return
    }

    const tools: WebMcpTool[] = [
      {
        name: "get_business_info",
        description: "Return official booking, contact, and location info for diara manicure.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        execute: () => ({
          businessName: siteConfig.name,
          bookingUrl: siteConfig.bookingUrl,
          giftCardUrl: siteConfig.giftCardUrl,
          phone: siteConfig.phone,
          address: fullAddress,
        }),
      },
      {
        name: "open_booking",
        description: "Open the official booking flow or gift-card flow in the browser.",
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
        execute: (args) => {
          const intent = args.intent === "gift-card" ? "gift-card" : "appointment"
          const url = intent === "gift-card" ? siteConfig.giftCardUrl : siteConfig.bookingUrl

          window.open(url, "_blank", "noopener,noreferrer")

          return { intent, opened: true, url }
        },
      },
      {
        name: "scroll_to_section",
        description: "Scroll to a key section on the page such as pricing, gallery, FAQ, or contact.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: ["pricing", "gallery", "faq", "contact"],
            },
          },
          required: ["section"],
          additionalProperties: false,
        },
        execute: (args) => {
          const section = args.section as keyof typeof sectionIds
          const targetId = sectionIds[section]
          const element = targetId ? document.getElementById(targetId) : null

          if (!element) {
            return {
              section,
              found: false,
            }
          }

          element.scrollIntoView({ behavior: "smooth", block: "start" })

          return {
            section,
            found: true,
          }
        },
      },
    ]

    void modelContext.provideContext({ tools })
  }, [])

  return null
}
