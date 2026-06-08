"use client"

import * as React from "react"
import { siteConfig } from "@/lib/site-config"

type GiftCardTrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  source: string
  ref?: React.Ref<HTMLAnchorElement>
}

type WindowWithGtag = Window & {
  gtag?: (
    command: "event",
    action: string,
    params: Record<string, string | number | boolean>
  ) => void
}

function giftCardUrlWithUtm(source: string) {
  const [baseUrl, hash = ""] = siteConfig.giftCardUrl.split("#")
  const separator = baseUrl.includes("?") ? "&" : "?"
  const params = new URLSearchParams({
    utm_source: "diaramanicure.sk",
    utm_medium: "website",
    utm_campaign: "darcekove_poukazy",
    utm_content: source,
  })

  return `${baseUrl}${separator}${params.toString()}${hash ? `#${hash}` : ""}`
}

export function GiftCardTrackedLink({
  source,
  href,
  onClick,
  children,
  ref,
  ...props
}: GiftCardTrackedLinkProps) {
  const trackedHref = href ?? giftCardUrlWithUtm(source)

  const trackGiftCardOutbound = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const win = window as WindowWithGtag

    win.gtag?.("event", "bookio_giftcard_outbound", {
      event_category: "gift_card",
      event_label: source,
      link_url: trackedHref,
    })

    onClick?.(event)
  }

  return (
    <a
      ref={ref}
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackGiftCardOutbound}
      {...props}
    >
      {children}
    </a>
  )
}
