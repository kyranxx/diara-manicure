import { siteConfig } from "@/lib/site-config"

export type ServicePage = {
  slug: string
  title: string
  shortTitle: string
  description: string
  image: string
  heroAlt: string
  searchAliases: string[]
  intro: string
  bestFor: string[]
  process: string[]
  aftercare: string[]
  relatedArticles: Array<{
    title: string
    href: string
  }>
}

export const servicePages: ServicePage[] = [
  {
    slug: "gelove-nechty-trnava",
    title: "Gélové nechty v Trnave",
    shortTitle: "Gélové nechty",
    description:
      "Jemné gélové nechty v Trnave s precíznou modeláciou, doplnením a odporúčaním starostlivosti. Pozrite si cenník a voľné termíny.",
    image: "/gelove-nechty-trnava-gallery-47.jpeg",
    heroAlt: "Biela francúzska manikúra na gélových nechtoch v diara manicure. Trnava",
    searchAliases: [
      "Nails Trnava",
      "Gel Nails Trnava",
      "Gelove nechty Trnava",
      "Jemné gélové nechty",
      "Jemne gelove nechty",
      "Nechty Trnava",
    ],
    intro:
      "Gélová modelácia je vhodná, keď chcete pevnejšie nechty, možnosť predĺženia alebo jemné gélové nechty na viac týždňov. V salóne pracujeme pokojne, detailne a s dôrazom na prípravu prirodzeného nechta.",
    bestFor: [
      "klientky, ktoré chcú pevnejší a odolnejší výsledok",
      "predĺženie nechtov alebo korekciu tvaru",
      "jemné gélové nechty, francúzsku manikúru, babyboomer alebo decentné zdobenie",
    ],
    process: [
      "najprv skontrolujeme stav prirodzených nechtov",
      "upravíme nechtové okolie a pripravíme platničku",
      "vymodelujeme tvar a po dohode dokončíme farbu alebo zdobenie",
    ],
    aftercare: [
      "nepoužívajte nechty ako nástroj",
      "pri vode a čistiacich prostriedkoch používajte rukavice",
      "na doplnenie príďte približne po 3 týždňoch",
    ],
    relatedArticles: [
      {
        title: "Ako dlho vydržia gélové nechty?",
        href: "/blog/ako-dlho-vydrzia-gelove-nechty",
      },
      {
        title: "Gél lak alebo gélová modelácia?",
        href: "/blog/rozdiel-gel-lak-gelova-modelacia",
      },
    ],
  },
  {
    slug: "gel-lak-trnava",
    title: "Gél lak v Trnave",
    shortTitle: "Gél lak",
    description:
      "Gél lak v Trnave pre prirodzené nechty s lesklou farbou a rýchlejšou aplikáciou. Pozrite si cenník a voľné termíny.",
    image: "/gelove-nechty-trnava-gallery-32.jpeg",
    heroAlt: "Ružový gél lak na kratšie nechty v Trnave",
    searchAliases: ["Nails Trnava", "Gel Polish Trnava", "Gel lak Trnava", "Nechty Trnava"],
    intro:
      "Gél lak je dobrá voľba, keď chcete prirodzený vzhľad, farbu a spevnenie bez predlžovania. Najlepšie funguje na zdravých kratších nechtoch.",
    bestFor: [
      "prirodzené nechty bez predlžovania",
      "rýchlejšiu návštevu a jemný výsledok",
      "klientky, ktoré chcú farbu a lesk na bežné nosenie",
    ],
    process: [
      "upravíme nechtové okolie suchou manikúrou",
      "pripravíme prirodzený necht a nanesieme gél lak",
      "výsledok vytvrdíme v lampe a odporučíme domácu starostlivosť",
    ],
    aftercare: [
      "chráňte nechty pred agresívnou chémiou",
      "olejček na kožičku pomáha udržať okolie nechtu hydratované",
      "pri poškodení gél lak neodtrhávajte",
    ],
    relatedArticles: [
      {
        title: "Gél lak alebo gélová modelácia?",
        href: "/blog/rozdiel-gel-lak-gelova-modelacia",
      },
    ],
  },
  {
    slug: "manikura-trnava",
    title: "Manikúra v Trnave",
    shortTitle: "Manikúra",
    description:
      "Suchá manikúra v Trnave so zameraním na čisté nechtové okolie, upravený tvar a zdravý prirodzený vzhľad rúk.",
    image: "/studio-960.webp",
    heroAlt: "Interiér salónu diara manicure. v Trnave",
    searchAliases: ["Nails Trnava", "Manicure Trnava", "Manikura Trnava", "Nechtove studio Trnava"],
    intro:
      "Manikúra je základ upravených rúk. Hodí sa samostatne aj pred aplikáciou gél laku alebo gélovej modelácie. Pri práci sa sústredíme na čistý detail a prirodzený výsledok.",
    bestFor: [
      "úpravu prirodzených nechtov bez farby",
      "pravidelnú starostlivosť o ruky a nechtové okolie",
      "prípravu pred gél lakom alebo modeláciou",
    ],
    process: [
      "upravíme tvar prirodzených nechtov",
      "vyčistíme a zjemníme nechtové okolie",
      "na záver odporučíme jednoduchú domácu starostlivosť",
    ],
    aftercare: [
      "pravidelne hydratujte ruky a kožičku",
      "nezastrihávajte podráždené nechtové okolie doma príliš hlboko",
      "pri lámavosti nechtov sa poraďte pred výberom služby",
    ],
    relatedArticles: [
      {
        title: "Ako dlho vydržia gélové nechty?",
        href: "/blog/ako-dlho-vydrzia-gelove-nechty",
      },
    ],
  },
]

export function servicePageUrl(slug: string) {
  return `${siteConfig.baseUrl}/sluzby/${slug}`
}

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug) ?? null
}
