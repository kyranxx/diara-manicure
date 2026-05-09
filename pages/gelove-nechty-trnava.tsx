import { ServiceLandingPage } from "@/components/service-landing-page"
import { getServicePage } from "@/lib/service-pages"

const page = getServicePage("gelove-nechty-trnava")

export default function GeloveNechtyTrnavaPage() {
  if (!page) return null
  return <ServiceLandingPage page={page} />
}
