import { ServiceLandingPage } from "@/components/service-landing-page"
import { getServicePage } from "@/lib/service-pages"

const page = getServicePage("manikura-trnava")

export default function ManikuraTrnavaPage() {
  if (!page) return null
  return <ServiceLandingPage page={page} />
}
