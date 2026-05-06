"use client"

import * as React from "react"
import { getStoredConsent } from "@/lib/analytics"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const TRACKED_POINTS = new Set<number>()

export function ScrollTracker() {
  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const consent = getStoredConsent()
        if (consent?.analyticsStorage !== "granted") return

        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight <= 0) return

        const pct = Math.round((scrollTop / docHeight) * 100)
        const points = [25, 50, 75, 90, 100]

        for (const point of points) {
          if (pct >= point && !TRACKED_POINTS.has(point)) {
            TRACKED_POINTS.add(point)
            window.gtag?.("event", "scroll_depth", {
              event_category: "engagement",
              event_label: "scroll_" + point,
              value: point,
            })

            if (point === 100) {
              window.gtag?.("event", "page_read_complete", {
                event_category: "engagement",
              })
            }
          }
        }
      }, 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return null
}
