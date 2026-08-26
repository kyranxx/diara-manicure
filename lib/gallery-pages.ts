import {
  galleryCategories,
  galleryImages,
  gallerySectionImageIds,
} from "@/lib/gallery"
import { siteConfig } from "@/lib/site-config"

export type GalleryCategory = keyof typeof gallerySectionImageIds

export type GalleryPage = {
  category: GalleryCategory
  slug: string
  title: string
  metaTitle: string
  description: string
  intro: string
  searchPhrase: string
  guide?: {
    heading: string
    paragraphs: string[]
    options: Array<{
      title: string
      description: string
    }>
  }
}

type GalleryImage = (typeof galleryImages)[number]

const galleryPagesByCategory: Record<GalleryCategory, GalleryPage> = {
  french: {
    category: "french",
    slug: "francuzska-manikura-trnava",
    title: "Francúzska manikúra Trnava",
    metaTitle: "Francúzska manikúra Trnava | Galéria nechtov",
    description:
      "Fotogaléria francúzskej manikúry z nechtového štúdia diara manicure. v Trnave. Jemné, elegantné a prirodzené nechty.",
    intro:
      "Ukážky francúzskej manikúry a jemných nude nechtov z nášho salónu v Trnave. Fotky pomáhajú lepšie vybrať štýl pred návštevou.",
    searchPhrase: "francúzska manikúra Trnava",
    guide: {
      heading: "Ako si vybrať francúzsku manikúru",
      paragraphs: [
        "Francúzska manikúra môže pôsobiť veľmi prirodzene alebo výraznejšie podľa šírky špičky, zvoleného podkladu, tvaru a dĺžky nechtov. Pred návštevou si môžete v galérii vybrať fotografie, ktoré najlepšie vystihujú vašu predstavu. V salóne potom spolu doladíme riešenie podľa aktuálneho stavu prirodzených nechtov a výsledku, ktorý chcete dosiahnuť.",
        "Pri kratších nechtoch vyzerá jemne tenká línia, pri dlhšom mandľovom alebo oválnom tvare môže byť biela špička výraznejšia. Obľúbená je aj mliečna francúzska manikúra s mäkkým nude podkladom. Konkrétny postup a vhodný materiál sa vyberajú individuálne, aby bol výsledok upravený, nositeľný a primeraný vašej dĺžke nechtov.",
        "Na termín si pokojne prineste vlastnú inšpiráciu alebo ukážte fotografiu priamo z tejto galérie. Aktuálne ceny nájdete v cenníku a dostupné termíny v online rezervácii. Ak si nie ste istá tvarom, dĺžkou alebo odtieňom, odporúčanie dostanete pred začiatkom služby.",
      ],
      options: [
        {
          title: "Klasická francúzska",
          description: "Čistá biela špička a prirodzený podklad pre elegantný, nadčasový vzhľad.",
        },
        {
          title: "Mliečna francúzska",
          description: "Jemnejší prechod a mäkký nude alebo mliečny podklad pre prirodzený výsledok.",
        },
        {
          title: "Tvar a dĺžka",
          description: "Línia francúzskej manikúry sa prispôsobí krátkym, oválnym, mandľovým aj dlhším nechtom.",
        },
      ],
    },
  },
  singleColor: {
    category: "singleColor",
    slug: "gelove-nechty-trnava",
    title: "Gélové nechty Trnava",
    metaTitle: "Gélové nechty Trnava | Galéria prác",
    description:
      "Fotogaléria gélových nechtov v Trnave: jednofarebné nechty, nude odtiene, červené, ružové aj výrazné farby.",
    intro:
      "Reálne práce zo salónu diara manicure. v Trnave. Galéria ukazuje farby, tvary a štýly, ktoré si môžete priniesť ako inšpiráciu.",
    searchPhrase: "gélové nechty Trnava",
  },
  delicateArt: {
    category: "delicateArt",
    slug: "jemne-zdobenie-nechtov-trnava",
    title: "Jemné zdobenie nechtov Trnava",
    metaTitle: "Jemné zdobenie nechtov Trnava | Nail art galéria",
    description:
      "Fotogaléria jemného nail art zdobenia v Trnave. Decentné detaily, kvietky, linky, srdiečka a elegantné zdobené nechty.",
    intro:
      "Jemné zdobenie pre klientky, ktoré chcú niečo krajšie než jednoduchú farbu, ale stále elegantné a nositeľné.",
    searchPhrase: "jemné zdobenie nechtov Trnava",
  },
}

export const galleryLandingUrl = `${siteConfig.baseUrl}/galeria`

export const galleryPages = galleryCategories.map((category) => galleryPagesByCategory[category])

export function galleryPageUrl(slug: string) {
  return `${galleryLandingUrl}/${slug}`
}

export function getGalleryPage(slug: string) {
  return galleryPages.find((page) => page.slug === slug)
}

export function galleryImagesForCategory(category: GalleryCategory): GalleryImage[] {
  const ids = new Set<string>(gallerySectionImageIds[category])
  return galleryImages.filter((image) => ids.has(image.id))
}
