import Script from "next/script"
import { siteRuntimeScript } from "@/components/site-runtime-script"

export function AnalyticsRuntime() {
  return (
    <Script id="site-runtime" strategy="afterInteractive">
      {siteRuntimeScript}
    </Script>
  )
}
