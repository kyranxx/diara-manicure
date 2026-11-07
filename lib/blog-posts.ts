import { siteConfig } from "@/lib/site-config"

// Article metadata only (no JSX), so the proxy and markdown routes can import it cheaply.
// Article bodies live in lib/blog-content.tsx under the same slug.
export type BlogPost = {
  slug: string
  title: string
  seoTitle: string
  shortTitle: string
  description: string
  published: string
  modified: string
  image: string
  imageAlt: string
  readMinutes: number
  keyPoints: string[]
  about: string[]
  services: string[]
  showPrices?: boolean
}

export const blogAuthor = "Andrea Hečková"

const posts: BlogPost[] = [
  {
    slug: "kolko-stoja-gelove-nechty-trnava",
    title: "Koľko stoja gélové nechty v Trnave? Aktuálne ceny a čo v nich je",
    seoTitle: "Koľko stoja gélové nechty v Trnave?",
    shortTitle: "Koľko stoja gélové nechty v Trnave?",
    description:
      "Aktuálne ceny gélových nechtov, gél laku a manikúry v Trnave. Čo je v cene, kedy sa platí príplatok a ako vybrať správnu službu.",
    published: "2026-11-07",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-109.jpg",
    imageAlt: "Nude francúzska manikúra s bielymi špičkami a čiernym zdobením",
    readMinutes: 4,
    keyPoints: [
      "Ceny v článku sa načítavajú priamo z rezervačného systému, takže sú vždy aktuálne.",
      "V cene každej gélovej služby je detailná manikúra, farba, francúzska manikúra aj jemné zdobenie.",
      "Príplatok sa platí len za extra dizajn alebo extrémne dlhé nechty.",
      "Doplnenie je lacnejšie ako nové nechty, preto sa oplatí chodiť približne každé 3 týždne.",
    ],
    about: ["cena gélových nechtov", "gélové nechty Trnava", "cenník manikúra Trnava"],
    services: ["gelove-nechty-trnava", "gel-lak-trnava", "manikura-trnava"],
    showPrices: true,
  },
  {
    slug: "ako-bezpecne-odstranit-gel-lak",
    title: "Ako bezpečne odstrániť gél lak a gélové nechty",
    seoTitle: "Ako bezpečne odstrániť gél lak?",
    shortTitle: "Ako bezpečne odstrániť gél lak?",
    description:
      "Prečo gél lak nikdy neodlupovať, ako prebieha šetrné odstránenie v salóne a čo robiť, keď sa vám gél odlúpi doma.",
    published: "2026-11-07",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-107.jpg",
    imageAlt: "Krátke bordové gélové nechty",
    readMinutes: 5,
    keyPoints: [
      "Gél lak ani gélové nechty nikdy neodlupujte, strhnete s nimi vrchné vrstvy prírodného nechta.",
      "Gél lak sa dá rozpustiť, stavebný gél sa musí šetrne zbrúsiť.",
      "Ak pokračujete novou službou, odstránenie je súčasťou návštevy.",
      "Po odstránení pomáha olejček na kožičku a pár dní bez zaťaženia nechtov.",
    ],
    about: ["odstránenie gél laku", "odstránenie gélových nechtov", "starostlivosť o nechty"],
    services: ["gel-lak-trnava", "gelove-nechty-trnava", "manikura-trnava"],
  },
  {
    slug: "jesenne-nechty-2026",
    title: "Jesenné nechty 2026: farby a dizajny, ktoré teraz robíme najčastejšie",
    seoTitle: "Jesenné nechty 2026: farby a dizajny",
    shortTitle: "Jesenné nechty 2026",
    description:
      "Bordová, hnedá, bronzová cat eye aj tmavozelená. Jesenné nechty 2026 z nášho salóna v Trnave s fotkami a tipmi na výber.",
    published: "2026-11-07",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-103.jpg",
    imageAlt: "Bordové a oranžovo-červené gélové nechty s trblietkami",
    readMinutes: 4,
    keyPoints: [
      "Tejto jeseni u nás vedie bordová, hnedá, bronzová cat eye a tmavozelená.",
      "Kto chce decentný vzhľad, volí mikro francúzsku manikúru v hnedej alebo bordovej.",
      "Jemné zdobenie, napríklad lístky, bodky alebo čiary, je v cene služby.",
      "Všetky fotky v článku sú práce z nášho salóna v Trnave.",
    ],
    about: ["jesenné nechty", "trendy nechty 2026", "gélové nechty Trnava"],
    services: ["gelove-nechty-trnava", "gel-lak-trnava"],
  },
  {
    slug: "nechty-na-svadbu-a-ples",
    title: "Nechty na svadbu a ples: kedy sa objednať a čo si vybrať",
    seoTitle: "Nechty na svadbu a ples",
    shortTitle: "Nechty na svadbu a ples",
    description:
      "Kedy sa objednať na nechty pred svadbou alebo plesom, aké tvary a farby vydržia celý večer a ako sa pripraviť na návštevu.",
    published: "2026-11-07",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-104.jpg",
    imageAlt: "Ružové ombré gélové nechty s jemnými trblietkami",
    readMinutes: 5,
    keyPoints: [
      "Na nechty sa objednajte 1 až 3 dni pred svadbou alebo plesom.",
      "Termín v sezóne plesov rezervujte niekoľko týždňov vopred.",
      "Pre nevestu sa najčastejšie hodí francúzska manikúra, mliečna ružová alebo jemné ombré.",
      "Ak nechty nosíte prvýkrát, zvoľte stredne dlhý tvar, na ktorý si rýchlo zvyknete.",
    ],
    about: ["svadobné nechty", "nechty na ples", "gélové nechty Trnava"],
    services: ["gelove-nechty-trnava", "gel-lak-trnava"],
  },
  {
    slug: "ako-dlho-vydrzia-gelove-nechty",
    title: "Ako dlho vydržia gélové nechty? Kompletný sprievodca výdržou a starostlivosťou",
    seoTitle: "Ako dlho vydržia gélové nechty?",
    shortTitle: "Ako dlho vydržia gélové nechty?",
    description:
      "Profesionálny sprievodca výdržou gélových nechtov, starostlivosťou a správnym intervalom doplnenia od diara manicure. v Trnave.",
    published: "2026-01-05",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-102.jpg",
    imageAlt: "Bordové dlhé mandľové gélové nechty",
    readMinutes: 7,
    keyPoints: [
      "Gélové nechty vydržia pri správnej starostlivosti 3 až 4 týždne.",
      "Ideálny interval doplnenia je približne každé 3 týždne.",
      "Výdrž najviac ovplyvňuje príprava nechta, kvalita materiálu a každodenná záťaž rúk.",
      "Gélové nechty nikdy neodtrhávajte, odstránenie nechajte na salón.",
    ],
    about: ["gélové nechty", "starostlivosť o nechty", "manikúra Trnava"],
    services: ["gelove-nechty-trnava", "manikura-trnava"],
  },
  {
    slug: "rozdiel-gel-lak-gelova-modelacia",
    title: "Rozdiel medzi gél lakom a gélovou modeláciou: ktorú možnosť si vybrať?",
    seoTitle: "Gél lak alebo gélová modelácia?",
    shortTitle: "Gél lak alebo gélová modelácia?",
    description:
      "Porovnanie gél laku a gélovej modelácie. Výdrž, čas, pevnosť a pre koho sa ktorá služba hodí. Poradíme v salóne diara manicure. v Trnave.",
    published: "2026-01-05",
    modified: "2026-11-07",
    image: "/gelove-nechty-trnava-gallery-108.jpg",
    imageAlt: "Mliečne ružové mandľové gélové nechty",
    readMinutes: 8,
    keyPoints: [
      "Gél lak je na prirodzené kratšie nechty, vydrží 2 až 3 týždne a nepredlžuje.",
      "Gélová modelácia predĺži a spevní nechty a vydrží 3 až 4 týždne.",
      "Gél lak trvá kratšie, modelácia približne 1,5 až 2 hodiny.",
      "Pri prvej návšteve vám poradíme podľa stavu vašich nechtov.",
    ],
    about: ["gél lak", "gélová modelácia", "manikúra Trnava"],
    services: ["gel-lak-trnava", "gelove-nechty-trnava"],
  },
]

export const blogPosts = [...posts].sort((a, b) => b.published.localeCompare(a.published))

export const blogUrl = `${siteConfig.baseUrl}/blog`
export const blogPostUrl = (slug: string) => `${blogUrl}/${slug}`
export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug) ?? null

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("sk-SK", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date))
}
