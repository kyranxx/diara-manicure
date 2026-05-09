import { ServiceLandingPage } from "@/components/service-landing-page"
import { getServicePage } from "@/lib/service-pages"

const page = getServicePage("doplnenie-nechtov-trnava")

export default function DoplnenieNechtovTrnavaPage() {
  if (!page) return null
  return <ServiceLandingPage page={page} />
}
