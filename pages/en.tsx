import { HomePage } from "@/components/home-page"
import { getSheetsData, type ServiceData } from "@/lib/sheets"

type EnglishHomeProps = {
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

export default function EnglishHome({ services }: EnglishHomeProps) {
  return <HomePage language="en" services={services} />
}
