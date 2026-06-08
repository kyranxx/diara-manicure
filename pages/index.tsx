import { HomePage } from "@/components/home-page"
import { defaultLanguage } from "@/lib/i18n"
import { getSheetsData, type ServiceData } from "@/lib/sheets"

type HomeProps = {
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

export default function Home({ services }: HomeProps) {
  return <HomePage language={defaultLanguage} services={services} />
}
