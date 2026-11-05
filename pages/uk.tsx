import { HomePage } from "@/components/home-page"
import { getReviewsData, type ReviewsData } from "@/lib/bookio-reviews"
import { getSheetsData, type ServiceData } from "@/lib/sheets"

type UkrainianHomeProps = {
  services: ServiceData[]
  reviewsData: ReviewsData
}

export async function getStaticProps() {
  const [services, reviewsData] = await Promise.all([getSheetsData(), getReviewsData()])

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
