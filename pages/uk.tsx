import { HomePage } from "@/components/home-page"
import { getReviewsData, type ReviewsData } from "@/lib/bookio-reviews"
import { getServices, type ServiceData } from "@/lib/services"

type UkrainianHomeProps = {
  services: ServiceData[]
  reviewsData: ReviewsData
}

export async function getStaticProps() {
  const [services, reviewsData] = await Promise.all([getServices("uk"), getReviewsData()])

  return {
    props: {
      services,
      reviewsData,
    },
    revalidate: 30,
  }
}

export default function UkrainianHome({ services, reviewsData }: UkrainianHomeProps) {
  return <HomePage language="uk" services={services} reviewsData={reviewsData} />
}
