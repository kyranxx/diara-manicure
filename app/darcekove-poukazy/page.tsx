import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Mail, ShoppingBasket } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { GiftCardPageAnalytics } from "@/components/gift-card-page-analytics"
import { GiftCardTrackedLink } from "@/components/gift-card-tracked-link"
import { giftCardImagePath, giftCardIntentPages } from "@/lib/gift-card-pages"
import { defaultLanguage, translations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

const pageUrl = `${siteConfig.baseUrl}/darcekove-poukazy`

export const metadata: Metadata = {
  title: "Poukaz na nechty Trnava | Darček pre ženu",
  description:
    "Darčekový poukaz na nechty v Trnave pre manželku, priateľku, mamu alebo kolegyňu. Online kúpa cez Bookio a doručenie emailom.",
  keywords: [
    "darčekový poukaz na nechty",
    "poukaz na nechty v Trnave",
    "poukaz na manikúru Trnava",
    "darček pre manželku Trnava",
    "darček pre priateľku Trnava",
    "darček pre mamu Trnava",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Poukaz na nechty Trnava | Darček pre ženu",
    description:
      "Darčekový poukaz na manikúru pre manželku, priateľku, mamu alebo kolegyňu v Trnave.",
    url: pageUrl,
    type: "website",
    locale: "sk_SK",
    images: [
      {
        url: giftCardImagePath,
        width: 1200,
        height: 630,
        alt: "Darčekový poukaz diara manicure.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poukaz na nechty Trnava | Darček pre ženu",
    description:
      "Darčekový poukaz na manikúru pre manželku, priateľku, mamu alebo kolegyňu v Trnave.",
    images: [giftCardImagePath],
  },
}

export default function GiftCardPage() {
  const t = translations[defaultLanguage]

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Darčekové poukazy na manikúru v Trnave",
    description:
      "Informácie o darčekových poukazoch na nechty a manikúru v Trnave. Online kúpa cez Bookio a doručenie emailom.",
    inLanguage: "sk-SK",
    about: {
      "@type": "Thing",
      name: "Darčekové poukazy na manikúru v Trnave",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Je poukaz vhodný ako darček pre manželku alebo priateľku?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Áno, darčekový poukaz na nechty je vhodný ako darček pre manželku, priateľku, mamu, sestru alebo kolegyňu, ktorá býva v Trnave alebo sa vie do salónu v Trnave dostať.",
        },
      },
      {
        "@type": "Question",
        name: "Ako funguje darčekový poukaz na manikúru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Poukaz kúpite online cez Bookio, zaplatíte kartou a príde na email. Obdarovaná osoba ho potom využije pri návšteve štúdia diara manicure. v Trnave.",
        },
      },
      {
        "@type": "Question",
        name: "Dá sa poukaz použiť aj ako poukaz na nechty v Trnave?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Áno, poukaz na nechty v Trnave je možné využiť na služby v ponuke štúdia, napríklad manikúru, gél lak alebo gélové nechty podľa aktuálnej dostupnosti služieb.",
        },
      },
      {
        "@type": "Question",
        name: "Akú hodnotu poukazu vybrať?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ak si nie ste istý, hodnota 50 € je jednoduchá stredná voľba. V Bookio sú dostupné aj hodnoty 30 €, 40 € a 100 €.",
        },
      },
      {
        "@type": "Question",
        name: "Príde darčekový poukaz emailom?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Áno, po online kúpe príde darčekový poukaz emailom. Pri objednávke môžete pridať aj osobné venovanie.",
        },
      },
    ],
  }

  return (
    <>
      <JsonLd
        id="schema-gift-card-page"
        data={pageSchema}
      />
      <JsonLd
        id="schema-gift-card-faq"
        data={faqSchema}
      />
      <GiftCardPageAnalytics />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="bg-beige dark:bg-[#050403]">
          <section className="container mx-auto px-6 py-12 md:py-20">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                Späť na hlavnú stránku
              </Link>

              <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                <div>
                  <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Darček pre ženu v Trnave
                  </p>
                  <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                    Darčekové poukazy na manikúru v Trnave
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                    Hľadáte darček pre manželku, priateľku, mamu, sestru alebo kolegyňu?
                    Poukaz na manikúru je praktický darček pre ženu, ktorá má rada upravené
                    ruky a chvíľu pre seba. Využije ho v štúdiu diara manicure. na
                    Hospodárskej 53 v Trnave.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Ak hľadáte darčekový poukaz na nechty, poukaz na nechty v Trnave
                    alebo rýchly poukaz na manikúru Trnava, vyberte hodnotu, zaplaťte
                    kartou a poukaz príde emailom.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="h-12 rounded-full px-7">
                      <GiftCardTrackedLink source="gift_card_page_hero">
                        <ShoppingBasket className="size-4" />
                        Kúpiť poukaz cez Bookio
                      </GiftCardTrackedLink>
                    </Button>
                    <Button asChild variant="outline" className="h-12 rounded-full px-7">
                      <Link href="/#cennik">Pozrieť služby a cenník</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                  <Image
                    src={giftCardImagePath}
                    alt="Darčekový poukaz na nechty v Trnave od diara manicure."
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-background py-14 dark:bg-[#050403]">
            <div className="container mx-auto px-6">
              <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                <div className="rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card">
                  <Mail className="mb-4 size-5 text-primary" />
                  <h2 className="text-lg font-medium">Doručenie emailom</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Poukaz nemusíte vyzdvihovať osobne. Po kúpe príde emailom.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card">
                  <Check className="mb-4 size-5 text-primary" />
                  <h2 className="text-lg font-medium">Hodnoty podľa rozpočtu</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    V Bookio sú dostupné poukazy v hodnotách 30 €, 40 €, 50 € a 100 €.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card">
                  <ShoppingBasket className="mb-4 size-5 text-primary" />
                  <h2 className="text-lg font-medium">Platba kartou</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Nákup prebieha bezpečne cez oficiálny systém Bookio.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-6 py-14">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                  Rýchly lokálny darček bez hádania
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Pre mužov, ktorí kupujú darček pre manželku alebo priateľku, aj pre
                  každého, kto chce rýchlo vybaviť darček pre mamu v Trnave. Nemusíte
                  vyberať konkrétnu službu ani termín.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "1. Vyberte hodnotu",
                    text: "30 €, 40 €, 50 € alebo 100 € podľa rozpočtu.",
                  },
                  {
                    title: "2. Zaplaťte kartou",
                    text: "Nákup prebieha v oficiálnom systéme Bookio.",
                  },
                  {
                    title: "3. Pošlite email",
                    text: "Poukaz príde emailom a môžete ho rovno darovať.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-primary/10 bg-white/55 p-5 dark:bg-card"
                  >
                    <h3 className="text-base font-medium text-black dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-background py-14 dark:bg-[#050403]">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
                  <div>
                    <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                      Odporúčaná jednoduchá voľba: 50 €
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Ak si nie ste istý, 50 € je praktická stredná voľba. Obdarovaná
                      osoba si potom vyberie službu podľa seba: manikúru, gél lak alebo
                      gélové nechty podľa aktuálnej ponuky.
                    </p>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Najčastejšie darčekové situácie
                    </h3>
                    <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                      {[
                        "darček pre manželku",
                        "darček pre priateľku",
                        "darček pre mamu",
                        "darček pre ženu v Trnave",
                        "darčekový poukaz na nechty",
                        "poukaz na manikúru Trnava",
                      ].map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-primary/10 bg-white px-4 py-2 dark:bg-background"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-6 py-14">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                Pre koho je poukaz vhodný
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Najlepšie funguje ako lokálny darček pre ženu z Trnavy alebo okolia, ktorá si vie
                prísť oddýchnuť na manikúru, gél lak alebo gélové nechty.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Darček pre manželku",
                  "Darček pre priateľku",
                  "Darček pre mamu",
                  "Darček pre kolegyňu",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-primary/10 bg-white/55 p-5 text-sm font-medium text-black dark:bg-card dark:text-white"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-background py-14 dark:bg-[#050403]">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                  Vyberte podľa toho, pre koho kupujete
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  Ak riešite konkrétnu situáciu, tieto krátke stránky pomôžu vybrať
                  hodnotu a vysvetlia, ako poukaz funguje.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {giftCardIntentPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/darcekove-poukazy/${page.slug}`}
                      className="rounded-xl border border-primary/10 bg-white/55 p-5 transition-colors hover:text-primary dark:bg-card"
                    >
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        {page.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {page.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-6 py-14">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                Časté otázky k poukazom
              </h2>

              <div className="mt-8 space-y-4">
                {[
                  {
                    question: "Na čo sa dá poukaz využiť?",
                    answer:
                      "Na služby v ponuke diara manicure., napríklad manikúru, gél lak alebo gélové nechty podľa aktuálneho cenníka.",
                  },
                  {
                    question: "Je poukaz vhodný ako darček na poslednú chvíľu?",
                    answer:
                      "Áno. Keďže príde emailom, je praktický aj vtedy, keď potrebujete darček rýchlo.",
                  },
                  {
                    question: "Kde sa salón nachádza?",
                    answer:
                      "Na adrese Hospodárska 53, 917 01 Trnava. Pri salóne je parkovanie zdarma.",
                  },
                ].map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border border-primary/10 bg-white/55 p-6 dark:bg-card"
                  >
                    <h3 className="text-lg font-medium text-black dark:text-white">{item.question}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-primary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Samotný nákup poukazu prebieha na stránke Bookio.
                </p>
                <Button asChild className="h-12 rounded-full px-7">
                  <GiftCardTrackedLink source="gift_card_page_bottom">
                    <ShoppingBasket className="size-4" />
                    Prejsť na poukazy
                  </GiftCardTrackedLink>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer t={t} />
      </div>
    </>
  )
}
