import { HomePage } from "@/components/home-page"
import { getSheetsData, type ServiceData } from "@/lib/sheets"

export const config = {
  unstable_runtimeJS: false,
}

type SerbianHomeProps = {
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

export default function SerbianHome({ services }: SerbianHomeProps) {
  return <HomePage language="sr" services={services} />
}
