import { siteRuntimeScript } from "@/components/site-runtime-script"

export function AnalyticsRuntime() {
  return (
    <script
      id="site-runtime"
      dangerouslySetInnerHTML={{ __html: siteRuntimeScript }}
    />
  )
}
