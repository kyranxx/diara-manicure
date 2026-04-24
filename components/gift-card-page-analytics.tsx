"use client"

import * as React from "react"

type WindowWithGtag = Window & {
  gtag?: (
    command: "event",
    action: string,
    params: Record<string, string | number | boolean>
  ) => void
}

export function GiftCardPageAnalytics() {
  React.useEffect(() => {
    const win = window as WindowWithGtag

    win.gtag?.("event", "gift_card_view", {
      event_category: "gift_card",
      event_label: "gift_card_page",
    })
  }, [])

  return null
}
