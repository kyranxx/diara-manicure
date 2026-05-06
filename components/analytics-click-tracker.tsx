"use client"

import * as React from "react"
import { getStoredConsent } from "@/lib/analytics"
import { siteConfig } from "@/lib/site-config"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const TRACKED_EVENTS = new WeakSet<Element>()

function shouldTrack() {
  const consent = getStoredConsent()
  return consent?.analyticsStorage === "granted" && typeof window.gtag !== "undefined"
}

function trackEvent(name: string, params: Record<string, string | number>) {
  if (!shouldTrack()) return
  window.gtag?.("event", name, params)
}

const TRACKING_RULES: Array<{
  selector: string
  name: string
  params: (el: HTMLAnchorElement) => Record<string, string | number>
}> = [
  {
    selector: `a[href*="${siteConfig.bookingUrl.split("//")[1]?.split("/")[0] ?? "bookio.com"}"]`,
    name: "booking_cta_click",
    params: (el) => ({
      event_category: "booking",
      event_label: el.textContent?.trim().slice(0, 100) ?? "booking_link",
      link_url: el.href,
    }),
  },
  {
    selector: `a[href*="${siteConfig.giftCardUrl.split("//")[1]?.split("/")[0] ?? "bookio.com"}"]`,
    name: "gift_card_cta_click",
    params: (el) => ({
      event_category: "gift_card",
      event_label: el.textContent?.trim().slice(0, 100) ?? "gift_card_link",
      link_url: el.href,
    }),
  },
  {
    selector: 'a[href^="tel:"]',
    name: "phone_call_click",
    params: (el) => ({
      event_category: "contact",
      event_label: el.href.slice(4),
    }),
  },
  {
    selector: 'a[href*="instagram.com"], a[href*="facebook.com"], a[href*="m.me"]',
    name: "social_click",
    params: (el) => {
      const isInstagram = el.href.includes("instagram.com")
      const isMessenger = el.href.includes("m.me")
      return {
        event_category: "social",
        event_label: isInstagram ? "instagram" : isMessenger ? "messenger" : "facebook",
        link_url: el.href,
      }
    },
  },
]

export function AnalyticsClickTracker() {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (!anchor) return
      if (TRACKED_EVENTS.has(anchor)) return

      for (const rule of TRACKING_RULES) {
        if (anchor.matches(rule.selector)) {
          TRACKED_EVENTS.add(anchor)
          trackEvent(rule.name, rule.params(anchor))
          return
        }
      }
    }

    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [])

  return null
}
