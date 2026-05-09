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

export function GiftCardTrackedLink({
  source,
  href = siteConfig.giftCardUrl,
  onClick,
  children,
  ref,
  ...props
}: GiftCardTrackedLinkProps) {
  const trackGiftCardOutbound = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const win = window as WindowWithGtag

    win.gtag?.("event", "bookio_giftcard_outbound", {
      event_category: "gift_card",
      event_label: source,
      link_url: href,
    })

    onClick?.(event)
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackGiftCardOutbound}
      {...props}
    >
      {children}
    </a>
  )
}
