"use client"

import * as React from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import {
  CONSENT_CHANGED_EVENT,
  getStoredConsent,
  type ConsentPreferences,
} from "@/lib/analytics"

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
    const interactionEvents: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "keydown", "touchstart"]
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const loadGrantedScripts = () => {
      const consent = getStoredConsent()
      if (consent?.analyticsStorage === "granted" || consent?.adStorage === "granted") {
        setShouldLoadAnalytics(true)
      }
      if (consent?.analyticsStorage === "granted") {
        setShouldLoadClarity(true)
      }
    }

    const removeInteractionListeners = (handler: EventListener) => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, handler, { capture: true } as EventListenerOptions)
      )
    }

    const handleInteraction: EventListener = () => {
      loadGrantedScripts()
      removeInteractionListeners(handleInteraction)
    }

    const handleConsentChanged = (event: Event) => {
      const prefs = (event as CustomEvent<ConsentPreferences>).detail
      if (prefs.analyticsStorage === "granted" || prefs.adStorage === "granted") {
        loadGrantedScripts()
      }
    }

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged)

    if (isConversionPage) {
      timeoutId = setTimeout(loadGrantedScripts, 1000)
    } else {
      interactionEvents.forEach((eventName) =>
        window.addEventListener(eventName, handleInteraction, { once: true, passive: true, capture: true })
      )
      timeoutId = setTimeout(loadGrantedScripts, 45000)
    }

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChanged)
      removeInteractionListeners(handleInteraction)
      if (timeoutId) {
        clearTimeout(timeoutId)
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
