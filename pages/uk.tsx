import { HomePage } from "@/components/home-page"
import { getSheetsData, type ServiceData } from "@/lib/sheets"

type UkrainianHomeProps = {
  services: ServiceData[]
}

export async function getStaticProps() {
  const services = await getSheetsData()

  return {
    props: {
      services,
    },
    revalidate: 30,
  }
}

export default function UkrainianHome({ services }: UkrainianHomeProps) {
  return <HomePage language="uk" services={services} />
}
