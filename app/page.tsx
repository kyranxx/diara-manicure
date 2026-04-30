import SchemaMarkup from "@/components/schema-markup"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { About } from "@/components/sections/About"
import { FAQ } from "@/components/sections/FAQ"
import { GiftCards } from "@/components/sections/GiftCards"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { GalleryClient } from "@/components/gallery-client"
import { getSheetsData } from "@/lib/sheets"
import { siteConfig } from "@/lib/site-config"

export default async function Home() {
  const services = await getSheetsData()

  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
        <Navbar />

        <main>
          <Hero bookingUrl={siteConfig.bookingUrl} />
          <Services services={services} bookingUrl={siteConfig.bookingUrl} />
          <GalleryClient />
          <About />
          <FAQ />
          <GiftCards />
          <Contact bookingUrl={siteConfig.bookingUrl} />
        </main>

        <Footer />
      </div>
    </>
  )
}
