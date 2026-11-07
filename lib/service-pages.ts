import { siteConfig } from "@/lib/site-config"

export type ServicePage = {
  slug: string
  title: string
  shortTitle: string
  description: string
  image: string
  heroAlt: string
  intro: string
  bestFor: string[]
  process: string[]
  aftercare: string[]
  relatedArticles: Array<{
    title: string
    href: string
  }>
  /** Matches price list item titles shown on this page. */
  priceMatch: RegExp
  /** Matches review texts about this service. */
  reviewMatch: RegExp
  faqs: Array<{ question: string; answer: string }>
}

const locationFaq = {
  question: "Kde sa nachádzate a dá sa pri salóne parkovať?",
  answer:
    "Salón diara manicure. nájdete v Trnave na Hospodárskej 53. Priamo pred vchodom máme vlastné parkovanie zdarma.",
}

const bookingFaq = {
  question: "Ako sa objednám?",
  answer:
    "Termín si rezervujete online cez Bookio, kde vidíte všetky voľné termíny. Platiť môžete v hotovosti aj kartou.",
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
    priceMatch: /modelácia|spevnenie prirodzených nechtov gélom|odstránenie gélových|predĺženie nechtu/i,
    reviewMatch: /gél|gel/i,
    faqs: [
      {
        question: "Koľko stoja gélové nechty v Trnave?",
        answer:
          "Aktuálne ceny nových gélových nechtov, doplnenia, spevnenia aj odstránenia sú v cenníku vyššie. Nové nechty, doplnenie aj spevnenie zahŕňajú detailnú manikúru a výber farby, francúzskej manikúry alebo jemného zdobenia.",
      },
      {
        question: "Ako dlho vydržia gélové nechty?",
        answer:
          "Pri správnej aplikácii a starostlivosti vydržia gélové nechty 3 až 4 týždne. Na doplnenie odporúčame prísť približne každé 3 týždne.",
      },
      {
        question: "Ako dlho trvá modelácia gélových nechtov?",
        answer: "Nové gélové nechty trvajú približne 1,5 až 2 hodiny. Doplnenie je zvyčajne rýchlejšie.",
      },
      locationFaq,
      bookingFaq,
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
    priceMatch: /gél ?lak|géllak/i,
    reviewMatch: /gél ?lak|géllak|gellak/i,
    faqs: [
      {
        question: "Koľko stojí gél lak v Trnave?",
        answer:
          "Aktuálnu cenu gélovej bázy s gél lakom nájdete v cenníku vyššie. Služba zahŕňa detailnú manikúru a výber farby, francúzskej manikúry alebo jemného zdobenia.",
      },
      {
        question: "Ako dlho vydrží gél lak?",
        answer:
          "Gél lak vydrží zvyčajne 2 až 3 týždne. Ak chcete dlhšiu výdrž alebo predĺženie, vhodnejšie sú gélové nechty.",
      },
      {
        question: "Pre aké nechty je gél lak vhodný?",
        answer:
          "Gél lak je vhodný najmä na krátke prirodzené nechty, ktoré chcete spevniť a mať na nich farbu bez predlžovania.",
      },
      locationFaq,
      bookingFaq,
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
    priceMatch: /manikúra/i,
    reviewMatch: /manik/i,
    faqs: [
      {
        question: "Čo zahŕňa suchá manikúra?",
        answer:
          "Detailná suchá manikúra zahŕňa čistenie nechtov, odstránenie kožičky, úpravu tvaru nechtov a olejček. Je bez lakovania.",
      },
      {
        question: "Koľko stojí a ako dlho trvá manikúra?",
        answer:
          "Aktuálnu cenu nájdete v cenníku vyššie. Detailná suchá manikúra trvá približne 30 minút.",
      },
      {
        question: "Dá sa manikúra spojiť s gél lakom alebo gélovými nechtami?",
        answer:
          "Áno. Detailná manikúra je súčasťou gél laku, spevnenia aj gélových nechtov, takže ju pri týchto službách nemusíte objednávať zvlášť.",
      },
      locationFaq,
      bookingFaq,
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
