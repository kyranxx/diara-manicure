import SchemaMarkup from "@/components/schema-markup"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { GiftCards } from "@/components/sections/GiftCards"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { GalleryClient } from "@/components/gallery-client"
import { getSheetsData } from "@/lib/sheets"
import { siteConfig } from "@/lib/site-config"

const testimonials = [
  {
    text: "Nechty vyzerajú super a hlavne vydržia bez jedinej chyby celé 3 týždne. Precízna práca, chválim detailnú úpravu.",
    author: "Mária Konečná",
    photo: null,
    rating: 5,
  },
  {
    text: "Manikúra za dobrú cenu, Andrea je šikovná. Nechty robí krásne tenké a prirodzené, žiadne hrubé vrstvy. Určite sa vrátim.",
    author: "Janka Poláková",
    photo: null,
    rating: 5,
  },
  {
    text: "Maximálna spokojnosť. Mamikérka je ústretová, poradila mi s tvarom a vždy sa snaží urobiť presne to, čo chcem. Nechty mi vydržia dlho lesklé.",
    author: "Lucia Miklošová",
    photo: null,
    rating: 5,
  },
  {
    text: "Dobré rozhodnutie prísť sem. Gélové nechty som mala krásne, žiadne odchlipy a vydržali mi perfektne v kuse až do ďalšej dorábky.",
    author: "Petra Sýkorová",
    photo: null,
    rating: 5,
  },
  {
    text: "Veľmi pekná a detailná práca s kožtičkou. Naozaj som spokojná s nechtami. Sú na pohľad prirodzené, ale zároveň veľmi pevné a vydržia.",
    author: "Katka Remišová",
    photo: null,
    rating: 5,
  },
  {
    text: "Som veľmi spokojná, nechty mi vydržali celé týždne do ďalšieho termínu bez zlomenia. Vidno, že pani manikérka používa kvalitný materiál, ktorý neničí nechty.",
    author: "Peťa Sedláková",
    photo: null,
    rating: 5,
  },
]

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
          <Testimonials testimonials={testimonials} />
          <FAQ />
          <GiftCards />
          <Contact bookingUrl={siteConfig.bookingUrl} />
        </main>

        <Footer />
      </div>
    </>
  )
}
