import { HomePage } from "@/components/home-page"
import { getReviewsData, type ReviewsData } from "@/lib/bookio-reviews"
import { getServices, type ServiceData } from "@/lib/services"

type SerbianHomeProps = {
  services: ServiceData[]
  reviewsData: ReviewsData
}

export async function getStaticProps() {
  const [services, reviewsData] = await Promise.all([getServices("en"), getReviewsData()])

  return {
    props: {
      services,
      reviewsData,
    },
    revalidate: 30,
  }
}

export default function SerbianHome({ services, reviewsData }: SerbianHomeProps) {
  return <HomePage language="sr" services={services} reviewsData={reviewsData} />
}
