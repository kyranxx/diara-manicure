import { siteConfig } from "@/lib/site-config"

export type PublicGoogleReview = {
  author: string
  authorUri: string
  authorPhotoUri: string
  rating: number
  text: string
  publishTime: string
  relativeTime: string
  googleMapsUri: string
}

// Manually verified against the public Google Maps listing on 2026-07-29.
// Google Places returns only a small selection, so these reviews supplement it.
export const verifiedGoogleReviews: PublicGoogleReview[] = [
  {
    author: "VIRA",
    rating: 5,
    text: "Veľmi spokojná i príjemná nechtarka, určite budem chodiť tam veľa krát, urobila mne veľmi peknú manikúru ešte lepšiu než som chcela💘…",
  },
  {
    author: "Dáša Bobeková",
    rating: 5,
    text: "S nechtami aj so slečnou manikérkou som veľmi spokojná.Nechty sú krásne a stále držia, precízna práca.Salónik príjemný a útulný..Určite odporúčam všetkým 🥰…",
  },
  {
    author: "Jana Tarkošová",
    rating: 5,
    text: "S pani nechtárkou som opakovane vysoko spokojná, je kvalitná, veľmi precízna, snaží sa veľmi vyhovieť zákazníčke, TOPKA 👍👍👍…",
  },
  {
    author: "Viktória Košíková",
    rating: 5,
    text: "Prvýkrát v živote som absolvovala manikúru a som nadmieru spokojná s výsledkom, doslova sa neviem vynadívať. Pani nechtárku odporúčam všetkými desiatimi, bola veľmi zlatá a ochotná poradiť a vysvetliť. Touto cestou jej ešte raz veľmi pekne ďakujem.",
  },
  {
    author: "Ingrid Hrivňáková",
    rating: 5,
    text: "Veľmi šikovná a príjemná mladá dáma, s úpravou nechtov som bola maximálne spokojná. Úplne super je aj možnosť objednania na skorší ranný, prípadne neskorší večerný termín. Všetkým môžem len odporučiť využiť služby tohto salónu 👍👍👍…",
  },
  {
    author: "Lenka Matúšová",
    rating: 5,
    text: "S pani nechtárkou som veľmi spokojná, určite som u nej nebola posledný krát. Krásna , precízna práca, milý prístup. Odporúčam.",
  },
  {
    author: "Martina Kolková",
    rating: 5,
    text: "Jemná francúzska manikúra podľa mojich predstáv. Objednávanie prostredníctvom portálu bookio je veľká výhoda 👍 Odporúčam 💅…",
  },
  {
    author: "Jana Sivuľková",
    rating: 4,
    text: "V tomto salóne som bola prvýkrát, ako sa povie “vyskúšať”. Nemala som veľké očakávania, ale bola som milo prekvapena. Nechtárka si dala záležať na dôkladnej manikúre, čo hodnotím veľmi pozitívne. Milý a ochotný prístup, s výsledkom som spokojná.",
  },
  {
    author: "Tatiana Sklárčiková",
    rating: 5,
    text: "V salone som bola velmi spokojna , velmi prijemny a cisty priestor. Praca pani nechtarky bola profesionalna, s manikurou som velmi spokojna, presne podla mojich predstav, tesim sa na dalsiu navstevu. Vrele odporucam❤️",
  },
  {
    author: "Helena Danišová",
    rating: 5,
    text: "Dnes som bola prvýkrát, no určite nie naposledy. Precízna práca pani manikérky, citlivý prístup, trpezlivosť, príjemné prostredie - rozhodne odporúčam. A navyše sa mi páči možnosť zarezervovať si termín cez bookio. Maximálna spokojnosť!",
  },
].map((review) => ({
  ...review,
  authorUri: "",
  authorPhotoUri: "",
  publishTime: "",
  relativeTime: "",
  googleMapsUri: siteConfig.googleReviewsUrl,
}))
