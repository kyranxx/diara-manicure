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

// All written Google Maps reviews with at least 40 characters, manually
// verified against the complete 70-review listing on 2026-07-29.
const verifiedReviewText = [
  { author: "VIRA", rating: 5, text: "Veľmi spokojná i príjemná nechtarka, určite budem chodiť tam veľa krát, urobila mne veľmi peknú manikúru ešte lepšiu než som chcela💘" },
  { author: "Dáša Bobeková", rating: 5, text: "S nechtami aj so slečnou manikérkou som veľmi spokojná.Nechty sú krásne a stále držia, precízna práca.Salónik príjemný a útulný..Určite odporúčam všetkým 🥰" },
  { author: "Jana Tarkošová", rating: 5, text: "S pani nechtárkou som opakovane vysoko spokojná, je kvalitná, veľmi precízna, snaží sa veľmi vyhovieť zákazníčke, TOPKA 👍👍👍" },
  { author: "Viktória Košíková", rating: 5, text: "Prvýkrát v živote som absolvovala manikúru a som nadmieru spokojná s výsledkom, doslova sa neviem vynadívať. Pani nechtárku odporúčam všetkými desiatimi, bola veľmi zlatá a ochotná poradiť a vysvetliť. Touto cestou jej ešte raz veľmi pekne ďakujem." },
  { author: "Ingrid Hrivňáková", rating: 5, text: "Veľmi šikovná a príjemná mladá dáma, s úpravou nechtov som bola maximálne spokojná. Úplne super je aj možnosť objednania na skorší ranný, prípadne neskorší večerný termín. Všetkým môžem len odporučiť využiť služby tohto salónu 👍👍👍…" },
  { author: "Lenka Matúšová", rating: 5, text: "S pani nechtárkou som veľmi spokojná, určite som u nej nebola posledný krát. Krásna , precízna práca, milý prístup.  Odporúčam." },
  { author: "Martina Kolková", rating: 5, text: "Jemná francúzska manikúra podľa mojich predstáv. Objednávanie prostredníctvom portálu bookio je veľká výhoda 👍 Odporúčam 💅" },
  { author: "Jana Sivuľková", rating: 4, text: "V tomto salóne som bola prvýkrát, ako sa povie “vyskúšať”. Nemala som veľké očakávania, ale bola som milo prekvapena. Nechtárka si dala záležať na dôkladnej manikúre, čo hodnotím veľmi pozitívne. Milý a ochotný prístup, s výsledkom som spokojná." },
  { author: "Tatiana Sklárčiková", rating: 5, text: "V salone som bola velmi spokojna , velmi prijemny a cisty priestor. Praca pani nechtarky bola profesionalna, s manikurou som velmi spokojna, presne podla mojich predstav, tesim sa na dalsiu navstevu. Vrele odporucam❤️" },
  { author: "Helena Danišová", rating: 5, text: "Dnes som bola prvýkrát, no určite nie naposledy. Precízna práca pani manikérky, citlivý prístup, trpezlivosť, príjemné prostredie - rozhodne odporúčam. A navyše sa mi páči možnosť zarezervovať si termín cez bookio. Maximálna spokojnosť!" },
  { author: "Lenka Talapková", rating: 5, text: "Mala som niekoľko rokov svoju manikerku a teraz som musela zmeniť. Svoju voľbu tohto štúdia neľutujem, tak precízna práca akú mám teraz na nechtoch som teda nezažila. Krásna Basic nude manikúra vyhovujúca dĺžka aj práca. Veľkou výhodou pre mňa je systém objednania sa cez bookio a platba kartou to ma veľmi malo salónov. Určite odporúčam 🧡" },
  { author: "Dominika Jakabovičová", rating: 5, text: "Nechtárku odporúčam 10/10. Nechty sú veľmi pekne,držia a majú presne taký tvar ako mám rada. Navyše som v spoločnosti milej nechtárky, ktorá mi vždy s ochotou vyjde v ústrety s časom. Ďakujem! Treba vyskúšať." },
  { author: "Mária Slivová", rating: 5, text: "Na tejto manikúre a dorábania gélových nechtov nemám čo vytknúť,  naopak maximálna spokojnosť,  vysoká profesionalita, príjemné a veľmi pozitívne a čisté prostredie a hlavne milá a šikovná odborníčka - manikérka" },
  { author: "Jana Pauliny", rating: 5, text: "Príjemný pristup, neskutočná profesionalita, dokonalé dodržiavanie hygieny. Najkrajšia nechty ake som kedy mala. Určite doporučujem. ❤️" },
  { author: "Ema Godálová", rating: 5, text: "Veľmi odporúčam. Práca bola precízna, nechty krásne a presne podľa predstáv. Oceňujem najmä zhovievavosť a trpezlivosť, pani si dala záležať na každom detaile. Odchádzala som maximálne spokojná a určite sa vrátim.😊…" },
  { author: "Dominika Cepková", rating: 5, text: "Manikérka je šikovná, dostala som odporúčanie od kamarátky a veľká spokojnosť👌Prídem opäť." },
  { author: "Nina Škodová", rating: 5, text: "Veľká spokojnosť ❤️ príjemná pani nechtarka, príjemne prostredie 🥰 cítila som sa v tomto štúdiu veľmi dobre a odišla som s krásnymi nechtami, presne podľa mojich predstáv 🥰…" },
  { author: "Helena Gajarská", rating: 5, text: "Nechty vypadajú krásne,kvalitná práca.Veľká spokojnosť,vrelo odporúčam 😉" },
  { author: "Hell Vall", rating: 5, text: "Príjemné ,čisté miesto a veľmi milá a šikovná manikerka ,som veľmi spokojná 🤗" },
  { author: "Melis. kaaa", rating: 5, text: "Milá, sympatická pani s precíznou prácou :) veľmi odprúčam! Mám konečne krásne a uhladené nechty." },
  { author: "Marcela Manakova", rating: 5, text: "Odporúčam, všetko na úrovni, milý prístup a nádherný výsledok." },
  { author: "Marika Kučerová", rating: 5, text: "Milá, šikovná pani manikérka🙂 Odchádzala som s krásnou francúzskou manikúrou, určite sa vrátim znovu 💅" },
  { author: "Eva Ešmírová", rating: 5, text: "S prácou pani manikérky som nadmieru spokojná, na úprave nechtov si dala veľmi záležať, predviedla vysokoprofesionálny výkon." },
  { author: "Zuzana Kanova", rating: 5, text: "Ústretová slečna manikerka, veľmi som spokojná s nechtíkmi, určite prídem znova. Odporúčam ❤️" },
  { author: "Nata Kubínyiová", rating: 5, text: "Veľmi ochotná, precizna a skutočne trpezlivá pani nechtarka. Vybrala som zložitý design a zvládla to na výbornú ❤️" },
  { author: "Ružena Bzdúchová", rating: 5, text: "Jemná a precízna práca, príjemné prostredie môžem len odporučiť všetkými desiatimi 🍀" },
  { author: "Elena Balážová", rating: 5, text: "Veľmi pekná práca, pre mňa dlhšia doba práce, ale vedela som o tom dopredu takže žiadny problém :) ďakujem a odporúčam" },
  { author: "Lucia stracova", rating: 5, text: "Velmi prijemne som sa citila, mily pristup, a aj z mojich okusovanych nechtov, vznikli pekne nechty. Dakujem" },
  { author: "Lucia Pažitná", rating: 5, text: "Skvelá manikúra. Práca precízna, nechtárka je milá a výsledok je krásny a kvalitný. Určite odporúčam a rada sa vrátim." },
  { author: "Iveta Hupková", rating: 5, text: "Veľká spokojnosť, nechty podľa predstáv. Nechtarka odviedla precíznu prácu, veľká vďaka." },
  { author: "Olga Bokorova", rating: 5, text: "S gelovými nechtami som veľmi spokojná, bola to precízna práca." },
  { author: "Iveta Polednáková", rating: 5, text: "Precízna práca, príjemné ceny. Za mňa absolútna spokojnosť. Môžem iba odporúčať." },
  { author: "katarina selicka", rating: 5, text: "Krasny novootvoreny salon😊… Dlho som hladala dobru nechtarku a konecne som ju nasla 🤩. Tesim sa na dalsie nove nechty ktore mi vykuzli uzasna Adka 😊" },
  { author: "Adriana Reptová", rating: 5, text: "Bola som tu prvý krát, zatiaľ som bola spokojná, vedela by som si predstaviť, že by som tam chodila pravidelne" },
  { author: "natalia strasiftakova", rating: 5, text: "Nechtové štúdio určite odporúčam, mám krásne a bezchybne spravené nechty, určite prídem aj nabudúce👍…" },
  { author: "Kristína Bombová", rating: 5, text: "Kvalitná práca a príjemné prostredie. Veľká spokojnosť :)" },
  { author: "Blanka Drinková", rating: 5, text: "Príjemná atmosféra a nádherná manikúra 💅🏻 vrelo odporúčam 🔥💯…" },
  { author: "Dominika Demeterová", rating: 5, text: "Veľká spokojnosť, krásna a precízna manikúra." },
  { author: "Sofis Ondriova", rating: 5, text: "Skvelá práca presne podľa mojich predstav!" },
  { author: "Vanda Hubinová", rating: 5, text: "Veľká spokojnosť, jemná a precízna práca 💅…" },
  { author: "Ivana Blahunkova", rating: 5, text: "Maximálna spokojnosť! Precízna a krásna práca, navyše veľmi milá a príjemná nechtárka. Určite odporúčam a rada prídem niekedy znova. ☺️" },
  { author: "Ema Mazánková", rating: 5, text: "Krásne nechty, milý a profesionálny prístup. Precíznosť v každom kroku tvorenia.\nOdporúčam a určite sa vrátim :)" },
  { author: "Katarína Kadlečíková", rating: 5, text: "Najlepšia a najochotnejsia nechtarka. Precízna práca, detailná manikúra a príjemná dáma. Odporúčam 10/10, už teraz sa teším nabudúce 😊…" },
  { author: "Martina Baranová", rating: 5, text: "Aďka mi urobila úžasný letný look presne podľa predlohy. Som nadmieru spokojná nielen s jej prácou, ale aj s prístupom. Ďakujem a určite sme sa nevideli poslednýkrát" },
  { author: "Monika Arpasova", rating: 5, text: "Dakujem velmi pekne za nadherne prirodzene nechty, odporucam a urcite sa sama vratim👌🏻" },
  { author: "Alena Harbistova", rating: 5, text: "S nechtami som veľmi spokojná , veľmi dobre odvedená práca , určite prídem znova ďakujem🙂" },
  { author: "Gabriela Slaninová", rating: 5, text: "V tomto salóne som bola prvý krát, ale určite nie posledný, cítila som sa veľmi príjemne, pani majiteľka je veľmi zlatá, sympatická\nS nechtami som taktiež spokojná ☺️☺️" },
  { author: "Jaroslav Sliva", rating: 5, text: "Profesionálna, veľmi odborná a precízna práca, dokonalé vypracovanie manikúry aj následne gelových nechtov a to v čistom a príjemnom prostredí, odporúčam kto chce peknú, dokonalú prácu manikérky." },
  { author: "Gabriela Petrovicova", rating: 5, text: "Úžasny pristup, prijemna mlada dama a velmi precizna praca." },
  { author: "Beáta C", rating: 5, text: "Príjemné prostredie, príjemná manikérka so zmyslom pre detail. Som veľmi spokojná 🙂" },
  { author: "jelena zivanovic", rating: 5, text: "Dievča je mladé, veľmi príjemné, nástroje sú sterilizované, salón je mimoriadne čistý, práca je úhľadná a precízna, všetka chvála 🌸❤️" },
] as const

export const verifiedGoogleReviews: PublicGoogleReview[] = verifiedReviewText.map((review) => ({
  ...review,
  authorUri: "",
  authorPhotoUri: "",
  publishTime: "",
  relativeTime: "",
  googleMapsUri: siteConfig.googleReviewsUrl,
}))
