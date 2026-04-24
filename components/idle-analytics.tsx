"use client"

import * as React from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number
    cancelIdleCallback?: (handle: number) => void
  }
}

export function IdleAnalytics() {
  const pathname = usePathname()
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = React.useState(false)
  const [shouldLoadClarity, setShouldLoadClarity] = React.useState(false)

  React.useEffect(() => {
    const isConversionPage = pathname === "/dakujeme"
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let clarityTimeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const loadAnalytics = () => setShouldLoadAnalytics(true)
    const loadClarity = () => setShouldLoadClarity(true)

    if (isConversionPage) {
      loadAnalytics()
    }

    const scheduleDeferredScripts = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(loadAnalytics, { timeout: 10000 })
        timeoutId = setTimeout(loadAnalytics, 12000)
      } else {
        timeoutId = setTimeout(loadAnalytics, 8000)
      }

      const interactionEvents: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "keydown", "touchstart"]
      const handleInteraction = () => {
        loadClarity()
        interactionEvents.forEach((eventName) =>
          window.removeEventListener(eventName, handleInteraction, { capture: true } as EventListenerOptions)
        )
      }

      interactionEvents.forEach((eventName) =>
        window.addEventListener(eventName, handleInteraction, { once: true, passive: true, capture: true })
      )

      clarityTimeoutId = setTimeout(() => {
        loadClarity()
        interactionEvents.forEach((eventName) =>
          window.removeEventListener(eventName, handleInteraction, { capture: true } as EventListenerOptions)
        )
      }, 15000)

      return () => {
        interactionEvents.forEach((eventName) =>
          window.removeEventListener(eventName, handleInteraction, { capture: true } as EventListenerOptions)
        )
      }
    }

    let cleanupDeferredListeners: (() => void) | undefined

    if (isConversionPage) {
      cleanupDeferredListeners = scheduleDeferredScripts()
    } else {
      const startDeferredLoading = () => {
        cleanupDeferredListeners = scheduleDeferredScripts()
      }

      if (document.readyState === "complete") {
        startDeferredLoading()
      } else {
        window.addEventListener("load", startDeferredLoading, { once: true })
        cleanupDeferredListeners = () => window.removeEventListener("load", startDeferredLoading)
      }
    }

    return () => {
      cleanupDeferredListeners?.()

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      if (clarityTimeoutId) {
        clearTimeout(clarityTimeoutId)
      }

      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [pathname])

  if (!shouldLoadAnalytics && !shouldLoadClarity) {
    return null
  }

  return (
    <>
      {shouldLoadAnalytics && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-QCMMZCQZTP"
            strategy="lazyOnload"
          />
          <Script id="google-analytics-idle" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', 'G-QCMMZCQZTP');
              gtag('config', 'AW-17746151386');
            `}
          </Script>
        </>
      )}
      {shouldLoadClarity && (
        <Script id="microsoft-clarity-idle" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ugccqd16dq");
          `}
        </Script>
      )}
    </>
  )
}
