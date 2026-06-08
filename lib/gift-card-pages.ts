import { siteConfig } from "@/lib/site-config"

export const giftCardImagePath = "/darcekovy-poukaz-na-nechty-trnava.jpg"

export type GiftCardIntentPage = {
  slug: string
  title: string
  metaTitle: string
  description: string
  h1: string
  intro: string
  buyerNote: string
  primaryPhrase: string
  recommendedValue: string
  reasons: string[]
  situations: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const giftCardIntentPages: GiftCardIntentPage[] = [
  {
    slug: "poukaz-na-nechty-trnava",
    title: "Poukaz na nechty v Trnave",
    metaTitle: "Poukaz na nechty v Trnave | diara manicure.",
    description:
      "Poukaz na nechty v Trnave pre ženu, ktorá má rada upravené ruky. Darčekový poukaz na nechty kúpite online cez Bookio a príde emailom.",
    h1: "Poukaz na nechty v Trnave",
    intro:
      "Keď nechcete vyberať konkrétnu službu, poukaz na nechty v Trnave nechá výber na obdarovanej osobe. Využiť ho môže na manikúru, gél lak alebo gélové nechty podľa aktuálnej ponuky.",
    buyerNote:
      "Je to praktický lokálny darček pre ženu z Trnavy alebo okolia, ktorý sa dá vybaviť online bez osobného vyzdvihnutia.",
    primaryPhrase: "darčekový poukaz na nechty",
    recommendedValue: "50 €",
    reasons: [
      "nemusíte poznať jej presný štýl nechtov",
      "poukaz príde emailom po online kúpe",
      "salón je v Trnave na Hospodárskej 53",
    ],
    situations: [
      "narodeniny",
      "meniny",
      "Vianoce",
      "posledná chvíľa",
    ],
    faqs: [
      {
        question: "Na čo sa dá poukaz na nechty použiť?",
        answer:
          "Na služby v ponuke diara manicure., napríklad manikúru, gél lak alebo gélové nechty podľa aktuálneho cenníka.",
      },
      {
        question: "Príde darčekový poukaz na nechty emailom?",
        answer:
          "Áno, po kúpe cez Bookio príde poukaz emailom, takže ho nemusíte vyzdvihovať osobne.",
      },
    ],
  },
  {
    slug: "darcek-pre-manzelku-trnava",
    title: "Darček pre manželku v Trnave",
    metaTitle: "Darček pre manželku v Trnave | diara manicure.",
    description:
      "Darček pre manželku v Trnave, ktorý vybavíte online. Poukaz na manikúru Trnava príde emailom a manželka si vyberie službu podľa seba.",
    h1: "Darček pre manželku v Trnave",
    intro:
      "Ak hľadáte darček pre manželku, poukaz na manikúru Trnava je jednoduchá voľba bez rizika zlého odtieňa, tvaru alebo termínu. Vyberiete hodnotu a ona si návštevu zvolí podľa seba.",
    buyerNote:
      "Najlepšie funguje, keď chcete darovať oddych, upravené ruky a chvíľu pre seba namiesto ďalšej veci do domácnosti.",
    primaryPhrase: "poukaz na manikúru Trnava",
    recommendedValue: "50 € alebo 100 €",
    reasons: [
      "vhodné aj keď presne neviete, aké nechty nosí",
      "hodnotu vyberiete podľa rozpočtu",
      "darček vybavíte online cez Bookio",
    ],
    situations: [
      "narodeniny manželky",
      "výročie",
      "Vianoce",
      "darček na poslednú chvíľu",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný ako darček pre manželku?",
        answer:
          "Áno, pretože manželka si môže vybrať službu a termín podľa seba. Poukaz nie je viazaný na jeden konkrétny dizajn nechtov.",
      },
      {
        question: "Akú hodnotu vybrať pre manželku?",
        answer:
          "Ak si nie ste istý, 50 € je jednoduchá stredná voľba. Pri väčšom darčeku môžete zvoliť 100 €.",
      },
    ],
  },
  {
    slug: "darcek-pre-priatelku-trnava",
    title: "Darček pre priateľku v Trnave",
    metaTitle: "Darček pre priateľku v Trnave | diara manicure.",
    description:
      "Darček pre priateľku v Trnave: poukaz na nechty v Trnave kúpite online cez Bookio a doručí sa emailom.",
    h1: "Darček pre priateľku v Trnave",
    intro:
      "Poukaz na nechty v Trnave je dobrý darček pre priateľku, keď chcete niečo osobné, ale nechcete hádať farbu, dĺžku alebo konkrétnu službu.",
    buyerNote:
      "Stačí vybrať hodnotu, zaplatiť kartou a poukaz jej môžete preposlať alebo vytlačiť ako darček.",
    primaryPhrase: "poukaz na nechty v Trnave",
    recommendedValue: "40 € alebo 50 €",
    reasons: [
      "vhodné pre priateľku, ktorá má rada upravené nechty",
      "rýchle online vybavenie",
      "poukaz vie využiť na službu podľa aktuálnej ponuky",
    ],
    situations: [
      "narodeniny priateľky",
      "Valentín",
      "meniny",
      "malá pozornosť",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný ako darček pre priateľku?",
        answer:
          "Áno, je vhodný pre priateľku, ktorá býva v Trnave alebo sa vie do salónu v Trnave dostať.",
      },
      {
        question: "Musím vybrať konkrétnu službu?",
        answer:
          "Nie. Vyberáte hodnotu poukazu a konkrétnu službu si potom zvolí obdarovaná osoba.",
      },
    ],
  },
  {
    slug: "darcek-pre-mamu-trnava",
    title: "Darček pre mamu v Trnave",
    metaTitle: "Darček pre mamu v Trnave | diara manicure.",
    description:
      "Darček pre mamu v Trnave: darčekový poukaz na manikúru alebo nechty s online kúpou cez Bookio a doručením emailom.",
    h1: "Darček pre mamu v Trnave",
    intro:
      "Darčekový poukaz na manikúru je pokojný a praktický darček pre mamu, ktorá si zaslúži chvíľu starostlivosti o ruky a nechty.",
    buyerNote:
      "Je vhodný na narodeniny, meniny, Deň matiek alebo ako poďakovanie, keď chcete darovať službu namiesto veci.",
    primaryPhrase: "darčekový poukaz na manikúru",
    recommendedValue: "40 € alebo 50 €",
    reasons: [
      "darujete starostlivosť a čas pre seba",
      "mama si vyberie termín podľa seba",
      "poukaz príde emailom po online kúpe",
    ],
    situations: [
      "Deň matiek",
      "narodeniny mamy",
      "meniny",
      "poďakovanie",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný pre mamu?",
        answer:
          "Áno, najmä ak má rada upravené ruky alebo by si chcela dopriať profesionálnu starostlivosť v salóne.",
      },
      {
        question: "Dá sa poukaz použiť aj na jemnejšiu manikúru?",
        answer:
          "Áno, poukaz sa dá využiť aj na manikúru alebo gél lak podľa aktuálnej ponuky a stavu nechtov.",
      },
    ],
  },
  {
    slug: "darcek-na-vianoce-nechty-trnava",
    title: "Darček na Vianoce pre ženu v Trnave",
    metaTitle: "Darček na Vianoce pre ženu v Trnave | diara manicure.",
    description:
      "Vianočný darčekový poukaz na nechty v Trnave pre manželku, priateľku alebo mamu. Kúpa online cez Bookio a doručenie emailom.",
    h1: "Darček na Vianoce pre ženu v Trnave",
    intro:
      "Keď pred Vianocami nechcete hádať veľkosť, farbu ani konkrétny darček, vianočný darčekový poukaz na nechty nechá výber na obdarovanej osobe.",
    buyerNote:
      "Poukaz je vhodný pre ženu z Trnavy alebo okolia, ktorá si chce po sviatkoch dopriať manikúru, gél lak alebo gélové nechty.",
    primaryPhrase: "vianočný darčekový poukaz na nechty",
    recommendedValue: "50 € alebo 100 €",
    reasons: [
      "darček vybavíte online aj pred sviatkami",
      "poukaz príde emailom",
      "obdarovaná osoba si vyberie službu a termín podľa seba",
    ],
    situations: [
      "Vianoce pre manželku",
      "Vianoce pre priateľku",
      "Vianoce pre mamu",
      "firemná pozornosť pre kolegyňu",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný ako vianočný darček?",
        answer:
          "Áno, najmä keď chcete darovať starostlivosť a nechcete vyberať konkrétnu službu alebo farbu nechtov.",
      },
      {
        question: "Príde vianočný poukaz emailom?",
        answer:
          "Áno, po online kúpe cez Bookio príde poukaz emailom a môžete ho darovať elektronicky alebo vytlačiť.",
      },
    ],
  },
  {
    slug: "darcek-na-den-matiek-trnava",
    title: "Darček na Deň matiek v Trnave",
    metaTitle: "Darček na Deň matiek v Trnave | diara manicure.",
    description:
      "Darček pre mamu na Deň matiek v Trnave. Darčekový poukaz na manikúru alebo nechty kúpite online a príde emailom.",
    h1: "Darček na Deň matiek v Trnave",
    intro:
      "Darček pre mamu na Deň matiek nemusí byť ďalšia vec. Poukaz na manikúru v Trnave daruje chvíľu starostlivosti a pokojný čas pre seba.",
    buyerNote:
      "Hodí sa pre mamu, ktorá má rada upravené ruky alebo si chce vyskúšať profesionálnu manikúru, gél lak či jemnú úpravu nechtov.",
    primaryPhrase: "darček pre mamu na Deň matiek",
    recommendedValue: "40 € alebo 50 €",
    reasons: [
      "darujete starostlivosť namiesto veci",
      "mama si vyberie termín podľa seba",
      "poukaz kúpite online a príde emailom",
    ],
    situations: [
      "Deň matiek",
      "poďakovanie mame",
      "narodeniny mamy",
      "meniny mamy",
    ],
    faqs: [
      {
        question: "Je poukaz dobrý darček na Deň matiek?",
        answer:
          "Áno, je vhodný pre mamu z Trnavy alebo okolia, ktorá si vie prísť oddýchnuť na manikúru alebo inú službu.",
      },
      {
        question: "Musím mame vybrať konkrétnu službu?",
        answer:
          "Nie. Vyberiete hodnotu poukazu a mama si potom zvolí službu podľa aktuálnej ponuky.",
      },
    ],
  },
  {
    slug: "darcek-na-valentina-trnava",
    title: "Darček na Valentína pre priateľku v Trnave",
    metaTitle: "Darček na Valentína pre priateľku v Trnave | diara manicure.",
    description:
      "Darček na Valentína pre priateľku alebo manželku v Trnave. Poukaz na nechty kúpite online a doručí sa emailom.",
    h1: "Darček na Valentína pre priateľku v Trnave",
    intro:
      "Darček na Valentína pre priateľku môže byť jednoduchý a osobný: poukaz na nechty v Trnave, ktorý si využije podľa svojho štýlu.",
    buyerNote:
      "Je vhodný aj pre manželku, ak chcete darovať upravené ruky, oddych a možnosť vybrať si vlastný termín.",
    primaryPhrase: "darček na Valentína pre priateľku",
    recommendedValue: "40 € alebo 50 €",
    reasons: [
      "nepotrebujete poznať jej presný dizajn nechtov",
      "poukaz môžete kúpiť online",
      "hodí sa ako osobný, ale praktický darček",
    ],
    situations: [
      "Valentín pre priateľku",
      "Valentín pre manželku",
      "výročie",
      "malé prekvapenie",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný na Valentína?",
        answer:
          "Áno, najmä ak hľadáte darček pre priateľku alebo manželku, ktorá má rada upravené nechty.",
      },
      {
        question: "Dá sa kúpiť aj na poslednú chvíľu?",
        answer:
          "Áno, poukaz príde emailom po online kúpe, takže ho viete darovať aj rýchlo.",
      },
    ],
  },
  {
    slug: "darcek-na-poslednu-chvilu-trnava",
    title: "Darček na poslednú chvíľu v Trnave",
    metaTitle: "Darček na poslednú chvíľu v Trnave | diara manicure.",
    description:
      "Darček na poslednú chvíľu v Trnave: darčekový poukaz emailom na manikúru, gél lak alebo nechty.",
    h1: "Darček na poslednú chvíľu v Trnave",
    intro:
      "Keď potrebujete darček rýchlo, darčekový poukaz emailom je najjednoduchšia cesta. Vyberiete hodnotu, zaplatíte kartou a poukaz príde elektronicky.",
    buyerNote:
      "Poukaz je vhodný pre manželku, priateľku, mamu alebo kolegyňu z Trnavy a okolia.",
    primaryPhrase: "darčekový poukaz emailom",
    recommendedValue: "50 €",
    reasons: [
      "netreba nič osobne vyzdvihovať",
      "dá sa kúpiť online",
      "obdarovaná osoba si vyberie službu neskôr",
    ],
    situations: [
      "zabudnuté narodeniny",
      "darček v deň oslavy",
      "rýchly darček pre ženu",
      "lokálny darček v Trnave",
    ],
    faqs: [
      {
        question: "Je poukaz vhodný ako darček na poslednú chvíľu?",
        answer:
          "Áno, pretože príde emailom a nemusíte ho vyzdvihovať osobne v salóne.",
      },
      {
        question: "Čo ak neviem, akú službu vybrať?",
        answer:
          "Vyberáte iba hodnotu poukazu. Konkrétnu službu a termín si potom vyberie obdarovaná osoba.",
      },
    ],
  },
]

export function giftCardIntentPageUrl(slug: string) {
  return `${siteConfig.baseUrl}/darcekove-poukazy/${slug}`
}

export function getGiftCardIntentPage(slug: string) {
  return giftCardIntentPages.find((page) => page.slug === slug) ?? null
}
