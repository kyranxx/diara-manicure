import { HomePage } from "@/components/home-page"
import { defaultLanguage } from "@/lib/i18n"
import { getReviewsData, type ReviewsData } from "@/lib/bookio-reviews"
import { getServices, type ServiceData } from "@/lib/services"

type HomeProps = {
  services: ServiceData[]
  reviewsData: ReviewsData
}

export async function getStaticProps() {
  const [services, reviewsData] = await Promise.all([getServices(), getReviewsData()])

  return {
    props: {
      services,
      reviewsData,
    },
    revalidate: 30,
  }
}

export default function Home({ services, reviewsData }: HomeProps) {
  return <HomePage language={defaultLanguage} services={services} reviewsData={reviewsData} />
}
