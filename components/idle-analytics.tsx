"use client"

import * as React from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { getStoredConsent } from "@/lib/analytics"

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
    const loadClarity = () => {
      const consent = getStoredConsent()
      if (consent?.analyticsStorage === "granted") {
        setShouldLoadClarity(true)
      }
    }

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

              var consent = {ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'};
              try {
                var stored = localStorage.getItem('cookie-consent-prefs');
                if (stored) { var parsed = JSON.parse(stored); if (parsed) { consent = parsed; } }
              } catch(_) {}

              gtag('consent', 'default', consent);
              gtag('js', new Date());

              var userId = '';
              try {
                userId = localStorage.getItem('ga-anon-user-id');
                if (!userId) {
                  userId = (crypto.randomUUID && crypto.randomUUID()) || (Date.now() + '-' + Math.random().toString(36).slice(2,11));
                  localStorage.setItem('ga-anon-user-id', userId);
                }
              } catch(_) {}

              gtag('config', 'G-QCMMZCQZTP', {
                user_id: userId || undefined,
              });

              gtag('config', 'AW-17746151386', {
                user_id: userId || undefined,
                allow_enhanced_conversions: true,
              });
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
