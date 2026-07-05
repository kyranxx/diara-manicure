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
  title: "Darčekový poukaz Trnava | Nechty a manikúra",
  description:
    "Darčekový poukaz v Trnave na nechty, manikúru, gél lak alebo gélové nechty. Kozmetický poukaz pre ženu kúpite online cez Bookio.",
  keywords: [
    "darčekový poukaz Trnava",
    "darčekové poukážky Trnava",
    "darčekový poukaz na nechty",
    "poukaz na nechty v Trnave",
    "poukaz na manikúru Trnava",
    "kozmetický poukaz Trnava",
    "salón krásy darčekový poukaz Trnava",
    "darček pre ženu Trnava",
    "darček pre ženu Trnava a okolie",
    "darček pre manželku Trnava",
    "darček pre priateľku Trnava",
    "darček pre mamu Trnava",
    "darček pre kolegyňu Trnava",
    "narodeninový darček pre ženu Trnava",
    "darček na meniny pre ženu Trnava",
    "darček na poslednú chvíľu Trnava",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Darčekový poukaz Trnava | Nechty a manikúra",
    description:
      "Darčekový poukaz na nechty, manikúru, gél lak alebo gélové nechty v Trnave.",
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
    title: "Darčekový poukaz Trnava | Nechty a manikúra",
    description:
      "Darčekový poukaz na nechty, manikúru, gél lak alebo gélové nechty v Trnave.",
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
    name: "Darčekový poukaz v Trnave na nechty a manikúru",
    description:
      "Informácie o darčekových poukazoch na nechty, manikúru, gél lak a gélové nechty v Trnave a okolí. Online kúpa cez Bookio a doručenie emailom.",
    inLanguage: "sk-SK",
    about: {
      "@type": "Thing",
      name: "Darčekový poukaz v Trnave na nechty a manikúru",
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
        name: "Je to kozmetický poukaz v Trnave?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Áno, je to lokálny kozmetický poukaz do salónu krásy v Trnave, ktorý sa dá využiť na nechty, manikúru, gél lak alebo gélové nechty podľa aktuálnej ponuky.",
        },
      },
      {
        "@type": "Question",
        name: "Je poukaz vhodný ako narodeninový alebo meninový darček pre ženu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Áno, poukaz je vhodný ako narodeninový darček, darček na meniny alebo darček na poslednú chvíľu pre ženu z Trnavy a okolia.",
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

      <div className="min-h-screen bg-background pb-28 text-foreground">
        <Navbar />
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-white/95 px-4 py-3 shadow-[0_-12px_30px_rgba(0,0,0,0.14)] backdrop-blur dark:bg-[#050403]/95">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-black dark:text-white">Darčekový poukaz od 30 €</p>
              <p className="text-xs text-muted-foreground">Online kúpa cez Bookio, doručenie emailom.</p>
            </div>
            <Button
              asChild
              className="h-12 shrink-0 rounded-full bg-black px-6 text-sm text-white shadow-lg shadow-black/20 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 sm:px-8 sm:text-base"
            >
              <GiftCardTrackedLink source="gift_card_sticky_bar">
                <ShoppingBasket className="size-4" />
                Kúpiť poukaz
              </GiftCardTrackedLink>
            </Button>
          </div>
        </div>

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
                    Darčekový poukaz Trnava
                  </p>
                  <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                    Darčekový poukaz v Trnave na nechty a manikúru
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                    Hľadáte darček pre manželku, priateľku, mamu, sestru alebo kolegyňu?
                    Tento darčekový poukaz v Trnave je praktický kozmetický poukaz pre
                    ženu, ktorá má rada upravené ruky a chvíľu pre seba. Využije ho v
                    štúdiu diara manicure. na Hospodárskej 53 v Trnave.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Ak hľadáte darčekový poukaz na nechty, poukaz na nechty v Trnave,
                    poukaz na manikúru Trnava, salón krásy darčekový poukaz Trnava
                    alebo rýchly darček pre ženu v Trnave a okolí, vyberte hodnotu,
                    zaplaťte kartou a poukaz príde emailom.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      className="h-14 rounded-full bg-black px-8 text-base text-white shadow-xl shadow-black/20 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
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
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Hodí sa aj pre obdarovanú osobu z okolia Trnavy, napríklad z Hlohovca,
                  Serede, Galanty, Piešťan alebo menších obcí, ak jej vyhovuje návšteva
                  salónu v centre Trnavy.
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
                      Najjednoduchšia voľba: poukaz 50 €
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      Ak si nie ste istý, 50 € je praktická stredná voľba. Pokryje alebo
                      výrazne zníži cenu najčastejších služieb a obdarovaná osoba si potom
                      vyberie službu podľa seba: manikúru, gél lak alebo gélové nechty
                      podľa aktuálnej ponuky.
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
                        "darček pre ženu Trnava a okolie",
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
                Kedy sa takýto darček hodí
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Poukaz je vhodný pri narodeninách, meninách, ako darček pre kolegyňu
                alebo keď hľadáte kozmetický poukaz do salónu krásy v Trnave.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Narodeniny",
                    text: "Narodeninový darček pre ženu v Trnave, keď nechcete hádať konkrétnu službu.",
                  },
                  {
                    title: "Meniny",
                    text: "Darček na meniny pre ženu, ktorý príde emailom a dá sa kúpiť online.",
                  },
                  {
                    title: "Kolegyňa",
                    text: "Darček pre kolegyňu v Trnave, ak chcete darovať službu namiesto ďalšej veci.",
                  },
                  {
                    title: "Salón krásy",
                    text: "Kozmetický poukaz do salónu krásy na manikúru, gél lak alebo gélové nechty.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-primary/10 bg-white/55 p-5 dark:bg-card"
                  >
                    <h3 className="text-lg font-medium text-black dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                ))}
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
