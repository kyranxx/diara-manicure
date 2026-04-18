import SchemaMarkup from "@/components/schema-markup"
import { HomePageClient } from "@/components/home-page-client"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <HomePageClient />
    </>
  )
}
