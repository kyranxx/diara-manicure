"use client"

import * as React from "react"
import Script from "next/script"

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
  const [shouldLoad, setShouldLoad] = React.useState(false)

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const loadAnalytics = () => setShouldLoad(true)

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadAnalytics, { timeout: 2500 })
      timeoutId = setTimeout(loadAnalytics, 3000)
    } else {
      timeoutId = setTimeout(loadAnalytics, 2000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [])

  if (!shouldLoad) {
    return null
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QCMMZCQZTP"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-idle" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QCMMZCQZTP');
          gtag('config', 'AW-17746151386');
        `}
      </Script>
      <Script id="microsoft-clarity-idle" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ugccqd16dq");
        `}
      </Script>
    </>
  )
}
