import { ServiceLandingPage } from "@/components/service-landing-page"
import { getServicePage } from "@/lib/service-pages"

const page = getServicePage("gel-lak-trnava")

export default function GelLakTrnavaPage() {
  if (!page) return null
  return <ServiceLandingPage page={page} />
}
